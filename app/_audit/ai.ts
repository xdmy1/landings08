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

const MODEL = "claude-sonnet-5-5";
const BETAS = ["server-side-fallback-2026-07-01"];

export function aiReady(): boolean {
  // locally the SDK can also use an `ant auth login` profile
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN) || process.env.NODE_ENV !== "production";
}

let client: Anthropic | null = null;
// a key that isn't scoped to one workspace needs the workspace named on every request
const ai = () =>
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

function img(dataUri: string | null | undefined) {
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
  const d = img(a.desktop?.screenshot);
  const m = img(a.mobile?.screenshot);
  if (d) content.push({ type: "text", text: "Screenshot: first screen on desktop." }, d);
  if (m) content.push({ type: "text", text: "Screenshot: first screen on a phone." }, m);
  content.push({
    type: "text",
    text: `Measurements (JSON):\n${JSON.stringify(evidence)}\n\nVisible text of the page (first 4000 characters):\n${textSample}`,
  });

  const r = await ai().beta.messages.parse({
    model: MODEL,
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
});

const GOOGLE_SYSTEM = `You check where a business website shows up when a potential customer searches for what it sells, from Moldova (Chișinău).

1. If a search phrase is given, use it exactly. Otherwise pick the single phrase a local customer is most likely to type to find this kind of business, in the language of the site, with the city when the business is local (e.g. "mobilă la comandă Chișinău").
2. Search it with the web_search tool (at most 3 searches; you may try one close variant).
3. position = the 1-based rank of the site's domain among the organic results you got for the main phrase; null if it isn't among them. Don't guess.
4. competitors = up to 3 other businesses that rank for it (above the site, or the top ones if the site is absent): short name + URL. Skip directories, marketplaces and social networks when real competitors exist.
5. note = one plain Romanian sentence for the owner about what this means.
Return only the JSON.`;

export async function googlePosition(a: Audit): Promise<GooglePos> {
  const f = a.facts!;
  const brief = `Site: ${a.host}\nTitle: ${f.title}\nDescription: ${f.description}\nH1: ${f.h1.join(" | ")}\nLanguage: ${f.lang}\nText sample: ${f.textSample.slice(0, 1200)}\nSearch phrase from the owner: ${a.keyword || "(none, choose one)"}`;
  const messages: Anthropic.Beta.BetaMessageParam[] = [{ role: "user", content: brief }];
  for (let turn = 0; turn < 3; turn++) {
    const r = await ai().beta.messages.parse({
      model: MODEL,
      max_tokens: 6000,
      betas: BETAS,
      fallbacks: "default",
      system: GOOGLE_SYSTEM,
      output_config: { effort: "low", format: betaZodOutputFormat(GoogleSchema) },
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 3, user_location: { type: "approximate", city: "Chisinau" } }],
      messages,
    });
    if (r.stop_reason === "pause_turn") {
      // the server-side search loop paused; send the turn back and it resumes
      // (the search tool takes no country code for Moldova, so only the city is set)
      messages.push({ role: "assistant", content: r.content as Anthropic.Beta.BetaContentBlockParam[] });
      continue;
    }
    if (r.stop_reason === "refusal" || !r.parsed_output) throw new Error(`google: ${r.stop_reason}`);
    const out = r.parsed_output;
    return {
      keyword: out.keyword.slice(0, 120),
      position: out.position && out.position > 0 ? Math.round(out.position) : null,
      competitors: out.competitors.slice(0, 3),
      note: out.note,
    };
  }
  throw new Error("google: paused too long");
}
