/* The two Claude calls of an audit:
   - analyse: looks at the screenshots and our measurements like a senior
     designer + SEO + sales consultant, and writes the findings in plain Romanian;
   - googlePosition: searches what a local customer would type and finds
     where the site shows up.
   Model: Claude Sonnet 5.5, with server-side refusal fallbacks switched on. */

import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod/v4";
import type { Analysis, Audit, GooglePos } from "./types";
import { googlePages, serpReady } from "./serp";

/* the model behind the check; AUDIT_MODEL (e.g. claude-opus-5-5) overrides it for one run */
export const MODEL = "claude-sonnet-5-5";
export const model = () => process.env.AUDIT_MODEL || MODEL;
export const BETAS = ["server-side-fallback-2026-07-01"];

export function aiReady(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

let client: Anthropic | null = null;
// a key that isn't scoped to one workspace needs the workspace named on every request
export const ai = () =>
  (client ??= new Anthropic({
    maxRetries: 1,
    timeout: 55_000,
    defaultHeaders: process.env.ANTHROPIC_WORKSPACE_ID ? { "anthropic-workspace-id": process.env.ANTHROPIC_WORKSPACE_ID } : undefined,
  }));

const CAT = z.enum(["viteza", "seo", "design", "vanzare", "mobil", "siguranta"]);

const AnalysisSchema = z.object({
  verdict: z.string(),
  firstImpression: z.string(),
  looksDated: z.boolean(),
  scores: z.object({ design: z.number(), vanzare: z.number(), mobil: z.number() }),
  catSummary: z.object({ viteza: z.string(), seo: z.string(), design: z.string(), vanzare: z.string(), mobil: z.string(), siguranta: z.string() }),
  issues: z.array(
    z.object({
      category: CAT,
      severity: z.enum(["critic", "important", "minor"]),
      title: z.string(),
      why: z.string(),
      fix: z.string(),
    })
  ),
  strengths: z.array(z.string()),
});

const ANALYSE_SYSTEM = `You audit websites of small and mid-sized businesses (Moldova, Romania, the EU) for landings.md, a web studio. You combine three seats: a senior visual designer, a technical SEO, and a sales/conversion consultant.

The reader is the business owner, about 40 years old, not technical. Write everything in Romanian, in short, plain sentences, no jargon (if a term is unavoidable, explain it in five words). Speak to the business: what it costs him (lost calls, lost trust, invisible in Google), not to developers.

You receive our measurements (HTML facts, Google PageSpeed for phone and desktop) and screenshots of the first screen on desktop and on phone. Ground every finding in that evidence. Never invent numbers, visitors, rankings or revenue. If something can't be judged from what you have, leave it out.

Judge the design from the screenshots honestly: does it look current or dated, is it clear within 5 seconds what the business offers and where, is there one obvious next step (call, WhatsApp, form), trust signals (real photos, reviews, logos, address), typography, contrast, image quality, clutter, and how the phone screen reads.

Output:
- verdict: one sentence, the honest overall picture.
- firstImpression: 2-3 sentences, what a new visitor feels in the first 5 seconds.
- looksDated: true if the design looks older than about 2019.
- scores (0-100) for design, vanzare (how well it turns visitors into calls/requests), mobil (how it works on a phone). Be calibrated: 90+ only for genuinely excellent; typical small-business sites land 40-70.
- catSummary: one sentence per category (viteza, seo, design, vanzare, mobil, siguranta) based on the evidence.
- issues: 8-16 concrete problems, most damaging first. severity: critic = loses customers now, important = clear loss, minor = polish. title max 70 characters; why = 1-2 sentences on the business impact; fix = 1 sentence on what to do.
- strengths: 2-5 real things the site does well.`;

export function img(dataUri: string | null | undefined) {
  const m = dataUri?.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
  return m ? ({ type: "image" as const, source: { type: "base64" as const, media_type: m[1] as "image/jpeg" | "image/png" | "image/webp", data: m[2] } }) : null;
}

export async function analyse(a: Audit): Promise<Analysis> {
  const { textSample, ...facts } = a.facts!;
  const evidence = {
    site: a.host,
    facts,
    pageSpeedPhone: a.mobile && { ...a.mobile, screenshot: undefined },
    pageSpeedDesktop: a.desktop && { ...a.desktop, screenshot: undefined },
  };
  const content: Anthropic.Beta.BetaContentBlockParam[] = [];
  const d = img(a.shots?.desktop || a.desktop?.screenshot);
  const m = img(a.shots?.mobile || a.mobile?.screenshot);
  if (d) content.push({ type: "text", text: "Screenshot: first screen on desktop." }, d);
  if (m) content.push({ type: "text", text: "Screenshot: first screen on a phone." }, m);
  content.push({
    type: "text",
    text: `Measurements (JSON):\n${JSON.stringify(evidence)}\n\nVisible text of the page (first 4000 characters):\n${textSample}`,
  });

  const r = await ai().beta.messages.parse({
    model: model(),
    max_tokens: 12000,
    betas: BETAS,
    fallbacks: "default",
    system: ANALYSE_SYSTEM,
    output_config: { effort: "medium", format: betaZodOutputFormat(AnalysisSchema) },
    messages: [{ role: "user", content }],
  });
  if (r.stop_reason === "refusal" || !r.parsed_output) throw new Error(`analyse: ${r.stop_reason}`);
  const out = r.parsed_output;
  const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
  return {
    ...out,
    scores: { design: clamp(out.scores.design), vanzare: clamp(out.scores.vanzare), mobil: clamp(out.scores.mobil) },
    issues: out.issues.slice(0, 16),
    strengths: out.strengths.slice(0, 5),
  };
}

const GoogleSchema = z.object({
  keyword: z.string(),
  position: z.number().nullable(),
  competitors: z.array(z.object({ name: z.string(), url: z.string() })),
  note: z.string(),
  analysis: z.string(),
  actions: z.array(z.string()),
});

const GOOGLE_RULES = `position: the 1-based rank of the site's domain among the organic results; null if it isn't there. Never guess.
competitors: up to 5 businesses that rank above the site (or the top ones if it's absent): short name + URL. Skip directories, marketplaces and social networks when real competitors exist.
note: one plain Romanian sentence for the owner about what the position means.
analysis: 2-3 plain Romanian sentences on why the ones above rank above: what their titles/snippets/pages show that the site lacks (a page dedicated to the phrase, the city in the title, more content, reviews...). Ground it in the results.
actions: 3-4 concrete Romanian steps, most effective first, to move the site up for this phrase.
Return only the JSON.`;

const PICK_SYSTEM = `Pick the single search phrase a local customer is most likely to type into Google to find this kind of business, in the language of the site, with the city when the business is local (e.g. "mobilă la comandă Chișinău"). Reply with the phrase only.`;

async function pickKeyword(brief: string): Promise<string> {
  const r = await ai().beta.messages.create({
    model: model(),
    max_tokens: 400,
    betas: BETAS,
    fallbacks: "default",
    system: PICK_SYSTEM,
    output_config: { effort: "low" },
    messages: [{ role: "user", content: brief }],
  });
  const t = r.content.find((b) => b.type === "text");
  return (t && t.type === "text" ? t.text : "").replace(/["„”]/g, "").trim().split("\n")[0].slice(0, 80);
}

export function briefOf(a: Audit): string {
  const f = a.facts!;
  return `Site: ${a.host}\nTitle: ${f.title}\nDescription: ${f.description}\nH1: ${f.h1.join(" | ")}\nLanguage: ${f.lang}\nText sample: ${f.textSample.slice(0, 1200)}`;
}

const clean = (out: z.infer<typeof GoogleSchema>) => ({
  keyword: out.keyword.slice(0, 120),
  competitors: out.competitors.slice(0, 5),
  note: out.note,
  analysis: out.analysis,
  actions: out.actions.slice(0, 4),
});

/* real Google, pages 1-5 (Serper), then Claude explains the results */
async function viaGoogle(a: Audit): Promise<GooglePos> {
  const brief = briefOf(a);
  const keyword = a.keyword || (await pickKeyword(brief));
  const { rows, position, page } = await googlePages(keyword, a.host);
  const r = await ai().beta.messages.parse({
    model: model(),
    max_tokens: 6000,
    betas: BETAS,
    fallbacks: "default",
    system: `You explain a website's Google position to its owner (Moldova). You get the site and the real Google results for one phrase.\n${GOOGLE_RULES}`,
    output_config: { effort: "low", format: betaZodOutputFormat(GoogleSchema) },
    messages: [{ role: "user", content: `${brief}\n\nPhrase: ${keyword}\nThe site's rank among these results: ${position ?? "not in the first " + rows.length}\n\nGoogle results (Moldova):\n${rows.map((x) => `${x.position}. ${x.title} | ${x.link} | ${x.snippet}`).join("\n")}` }],
  });
  if (r.stop_reason === "refusal" || !r.parsed_output) throw new Error(`google: ${r.stop_reason}`);
  return { ...clean(r.parsed_output), keyword, position, page, source: "google", depth: rows.length };
}

const SEARCH_SYSTEM = `You check where a business website shows up when a potential customer searches for what it sells, from Moldova (Chișinău).
1. If a search phrase is given, use it exactly. Otherwise pick the single phrase a local customer is most likely to type, in the language of the site, with the city when the business is local.
2. Search it with the web_search tool (at most 3 searches; you may try one close variant).
${GOOGLE_RULES}`;

/* no Google key: Claude's own web search, first results only */
async function viaSearch(a: Audit): Promise<GooglePos> {
  const messages: Anthropic.Beta.BetaMessageParam[] = [{ role: "user", content: `${briefOf(a)}\nSearch phrase from the owner: ${a.keyword || "(none, choose one)"}` }];
  for (let turn = 0; turn < 3; turn++) {
    const r = await ai().beta.messages.parse({
      model: model(),
      max_tokens: 6000,
      betas: BETAS,
      fallbacks: "default",
      system: SEARCH_SYSTEM,
      output_config: { effort: "low", format: betaZodOutputFormat(GoogleSchema) },
      // the search tool takes no country code for Moldova, so only the city is set
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 3, user_location: { type: "approximate", city: "Chisinau" } }],
      messages,
    });
    if (r.stop_reason === "pause_turn") {
      // the server-side search loop paused; send the turn back and it resumes
      messages.push({ role: "assistant", content: r.content as Anthropic.Beta.BetaContentBlockParam[] });
      continue;
    }
    if (r.stop_reason === "refusal" || !r.parsed_output) throw new Error(`google: ${r.stop_reason}`);
    const out = r.parsed_output;
    return { ...clean(out), position: out.position && out.position > 0 ? Math.round(out.position) : null, page: null, source: "search", depth: 10 };
  }
  throw new Error("google: paused too long");
}

export async function googlePosition(a: Audit): Promise<GooglePos> {
  return serpReady() ? viaGoogle(a) : viaSearch(a);
}
