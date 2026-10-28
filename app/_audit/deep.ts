/* The deeper analysis a visitor gets after paying: six steps, each one
   request, all grounded in what we fetch or search, never invented. */

import type Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod/v4";
import { parse } from "node-html-parser";
import { BETAS, ai, briefOf, img, model } from "./ai";
import { collectFacts, normaliseUrl, pageSpeed, safeFetch, text } from "./collect";
import type { Audit, Deep, Facts, Vitals } from "./types";

const CITY_SEARCH = { type: "approximate" as const, city: "Chisinau" }; // the search tool takes no country code for Moldova
const sameSite = (url: string, host: string) => {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    const t = host.replace(/^www\./, "");
    return h === t || h.endsWith("." + t);
  } catch {
    return false;
  }
};
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/* structured call with optional web search; resumes a paused server-side search loop */
async function ask<T>(system: string, user: Anthropic.Beta.BetaContentBlockParam[] | string, schema: z.ZodType<T>, opts: { search?: number; effort?: "low" | "medium" | "high"; maxTokens?: number } = {}): Promise<T> {
  const messages: Anthropic.Beta.BetaMessageParam[] = [{ role: "user", content: user }];
  for (let turn = 0; turn < 4; turn++) {
    const r = await ai().beta.messages.parse({
      model: model(),
      max_tokens: opts.maxTokens ?? 8000,
      betas: BETAS,
      fallbacks: "default",
      system,
      output_config: { effort: opts.effort ?? "medium", format: betaZodOutputFormat(schema) },
      ...(opts.search ? { tools: [{ type: "web_search_20260209" as const, name: "web_search" as const, max_uses: opts.search, user_location: CITY_SEARCH }] } : {}),
      messages,
    });
    if (r.stop_reason === "pause_turn") {
      messages.push({ role: "assistant", content: r.content as Anthropic.Beta.BetaContentBlockParam[] });
      continue;
    }
    if (r.stop_reason === "refusal" || !r.parsed_output) throw new Error(`deep: ${r.stop_reason}`);
    return r.parsed_output as T;
  }
  throw new Error("deep: paused too long");
}

/* phase one of a search step: Claude searches and writes up what it found, with the
   result titles and URLs appended; retried once if it answered without searching */
async function research(system: string, user: string, maxUses: number): Promise<string> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const messages: Anthropic.Beta.BetaMessageParam[] = [{ role: "user", content: attempt ? `${user}\n\nUse the web_search tool before answering.` : user }];
    let searched = 0;
    let out = "";
    for (let turn = 0; turn < 4; turn++) {
      const r = await ai().beta.messages.create({
        model: model(),
        max_tokens: 6000,
        betas: BETAS,
        fallbacks: "default",
        system,
        output_config: { effort: "medium" },
        tools: [{ type: "web_search_20260209", name: "web_search", max_uses: maxUses, user_location: CITY_SEARCH }],
        messages,
      });
      for (const b of r.content) {
        if (b.type === "server_tool_use") searched++;
        if (b.type === "text") out += b.text + "\n";
        if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
          out += b.content.map((x) => ("url" in x ? `- ${"title" in x ? x.title : ""} | ${x.url}` : "")).filter(Boolean).join("\n") + "\n";
        }
      }
      if (r.stop_reason !== "pause_turn") break;
      messages.push({ role: "assistant", content: r.content as Anthropic.Beta.BetaContentBlockParam[] });
    }
    if (searched > 0) return out.slice(0, 20000);
  }
  throw new Error("research: no search");
}

const RO = "Write every text field in plain Romanian for a non-technical business owner (about 40). Short sentences, no jargon. Ground everything in the evidence; never invent numbers, reviews or rankings. Never mention how the research was done (searches, tools, failed searches); write only about what a customer would see.";

/* ---------- 1. you vs. the competitors that rank above ---------- */

export async function competitorsDeep(a: Audit): Promise<Deep["competitors"]> {
  const comps = (a.google?.competitors || []).filter((c) => normaliseUrl(c.url) && !sameSite(c.url, a.host)).slice(0, 3);
  if (!comps.length) throw new Error("no competitors");
  const data = await Promise.all(
    comps.map(async (c) => {
      const u = normaliseUrl(c.url)!;
      const [facts, speed] = await Promise.all([collectFacts(u).catch(() => null), pageSpeed(u.toString(), "mobile").catch(() => null)]);
      return { name: c.name, url: u.toString(), facts, speed };
    })
  );
  const kw = fold(a.google?.keyword || "").split(/\s+/).filter((w) => w.length > 3);
  const hasKw = (f: Facts | null) => (f ? (kw.length && kw.every((w) => fold(f.title + " " + f.h1.join(" ")).includes(w)) ? "da" : "nu") : "—");
  const row = (label: string, pick: (f: Facts | null, v: Vitals | null | undefined, url: string) => string) => ({
    label,
    you: pick(a.facts || null, a.mobile, a.facts?.finalUrl || a.url),
    them: data.map((d) => pick(d.facts, d.speed, d.url)),
  });
  const rows = [
    row("Nota Google pe telefon", (_f, v) => (v?.performance != null ? `${v.performance}/100` : "—")),
    row("Se încarcă pe telefon", (_f, v) => v?.lcp || "—"),
    row("Text pe pagină", (f) => (f ? `${f.words} cuvinte` : "—")),
    row("Căutarea în titlu", (f) => hasKw(f)),
    row("Pagina din Google", (_f, _v, url) => {
      try {
        const p = new URL(url).pathname;
        return p === "/" || p === "" ? "prima pagină" : "pagină dedicată";
      } catch {
        return "—";
      }
    }),
    row("Telefon la vedere", (f) => (f ? (f.phoneVisible ? "da" : "nu") : "—")),
    row("WhatsApp / Telegram", (f) => (f ? (f.whatsapp || f.telegram ? "da" : "nu") : "—")),
    row("Date pentru Google (schema)", (f) => (f ? (f.structuredData.length ? f.structuredData.slice(0, 2).join(", ") : "nu") : "—")),
    row("Statistici de vizite", (f) => (f ? (f.analytics.length ? "da" : "nu") : "—")),
  ];
  const evidence = { phrase: a.google?.keyword, you: { url: a.facts?.finalUrl, title: a.facts?.title, h1: a.facts?.h1, description: a.facts?.description, text: a.facts?.textSample.slice(0, 1500) }, them: data.map((d) => ({ name: d.name, url: d.url, title: d.facts?.title, h1: d.facts?.h1, description: d.facts?.description, text: d.facts?.textSample.slice(0, 1500) })), table: rows };
  const out = await ask(
    `You compare a business website with the competitors that outrank it in Google for one search phrase. ${RO}\nsummary: 2 sentences on why they are ahead. insights: 4-6 concrete things they do that this site doesn't (or does worse), each one sentence, naming the competitor.`,
    JSON.stringify(evidence),
    z.object({ summary: z.string(), insights: z.array(z.string()) }),
    { effort: "medium" }
  );
  return { names: data.map((d) => d.name), urls: data.map((d) => d.url), rows, insights: out.insights.slice(0, 6), summary: out.summary };
}

/* ---------- 2. what a customer sees when searching the business name ---------- */

const BrandSchema = z.object({
  query: z.string(),
  profile: z.object({ found: z.boolean(), rating: z.number().nullable(), reviews: z.number().nullable(), note: z.string() }),
  results: z.array(z.object({ title: z.string(), url: z.string(), kind: z.string(), note: z.string() })),
  summary: z.string(),
  actions: z.array(z.string()),
});

export async function brandDeep(a: Audit): Promise<Deep["brand"]> {
  const found = await research(
    `You check what a potential customer in Moldova sees when they search a business's name in Google. Work out the business name from the site, then search it with the city first (for example "Art House Chișinău"), and once more as the name alone or a close variant. Report, in order, what comes up: the business's own site, its Google Business Profile (rating and number of reviews only if the results show them), social pages, review sites, news, and other businesses with a similar name. Include URLs.`,
    briefOf(a),
    3
  );
  const out = await ask(
    `From the search findings below, fill the fields. ${RO}
query = the exact words searched in Google (for example: Art House Chișinău). results: up to 8 notable results in order; kind = one of "site-ul tău", "profil Google", "rețea socială", "recenzii", "concurent", "nume asemănător", "altceva"; note = one short sentence. profile: found/rating/reviews only if the findings show them (null when unknown). summary: 2 sentences. actions: 3 concrete steps.`,
    `Site: ${a.host}\n\nFindings:\n${found}`,
    BrandSchema,
    { effort: "low" }
  );
  return { ...out, results: out.results.slice(0, 8), actions: out.actions.slice(0, 4) };
}

/* ---------- 3. does AI recommend this business? ---------- */

const QuestionsSchema = z.object({ questions: z.array(z.string()) });
const VerdictSchema = z.object({ summary: z.string(), actions: z.array(z.string()) });

export async function aiDeep(a: Audit): Promise<Deep["ai"]> {
  const qs = await ask(
    "Write 5 different questions a local customer would ask an AI assistant to find this kind of business (in the site's language, with the city when the business is local), varied in wording and need. Don't name the business.",
    briefOf(a),
    QuestionsSchema,
    { effort: "low" }
  );
  const brand = fold(a.facts?.title.split(/[|\-–—:]/)[0] || "").trim();
  const answers = await Promise.all(
    qs.questions.slice(0, 5).map(async (q) => {
      const text = await research(
        "You are a helpful AI assistant. A customer asks you for a recommendation. Search the web, then recommend the 3-5 best options for them. End your answer with one line per recommendation, exactly: RECOMANDARE: <name> | <website URL>",
        q,
        2
      ).catch(() => "");
      const recommended = text
        .split("\n")
        .map((l) => l.match(/RECOMANDARE:\s*(.+?)\s*\|\s*(\S+)/))
        .filter((m): m is RegExpMatchArray => Boolean(m))
        .map((m) => ({ name: m[1].slice(0, 80), url: m[2] }))
        .filter((r, k, all) => all.findIndex((x) => fold(x.name) === fold(r.name)) === k)
        .slice(0, 5);
      return { q, recommended, mentioned: recommended.some((r) => sameSite(r.url, a.host) || (brand.length > 3 && fold(r.name).includes(brand))) };
    })
  );
  const verdict = await ask(
    `A business's site and how AI assistants answered 5 customer questions are below. ${RO} summary: 2 sentences on which kinds of questions it is recommended for and which not (the page already shows the count, don't repeat it). actions: 3 concrete steps to be recommended more often.`,
    `Site: ${a.host}\n${JSON.stringify(answers)}`,
    VerdictSchema,
    { effort: "low" }
  );
  return { questions: answers, summary: verdict.summary, actions: verdict.actions.slice(0, 4) };
}

/* ---------- 4 + 5. copy to paste, and the 30-day plan ---------- */

const CopySchema = z.object({
  title: z.string(),
  description: z.string(),
  h1: z.string(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })),
  gbp: z.string(),
  weeks: z.array(
    z.object({
      week: z.number(),
      focus: z.string(),
      steps: z.array(z.object({ what: z.string(), who: z.enum(["singur", "programator"]), time: z.string(), impact: z.string() })),
    })
  ),
});

export async function copyAndPlanDeep(a: Audit): Promise<{ copy: Deep["copy"]; plan: Deep["plan"] }> {
  const f = a.facts!;
  const evidence = {
    site: a.host,
    title: f.title,
    description: f.description,
    h1: f.h1,
    h2: f.h2,
    language: f.lang,
    text: f.textSample.slice(0, 3000),
    searchPhrase: a.google?.keyword,
    googlePosition: a.google?.position,
    competitorsAbove: a.google?.competitors,
    problems: a.analysis?.issues,
    pageSpeedPhone: a.mobile?.performance,
  };
  const out = await ask(
    `You are a senior copywriter and SEO for small businesses in Moldova. Using only facts from the site (services, city, guarantees, numbers it states), write ready-to-paste copy in the site's language (Romanian unless the site is in another language), and a 30-day action plan in plain Romanian.
- title: the page title for Google, max 60 characters, with the search phrase and the city.
- description: the Google description, 140-155 characters, with a clear reason to click and a call to action.
- h1: the main headline for the first screen, max 8 words, benefit first.
- faq: 5 questions customers really ask about this business, each answer 1-3 sentences, only with facts from the site (no invented prices, terms or guarantees).
- gbp: a Google Business Profile description, 600-750 characters.
- weeks: 4 weeks, each with a focus and 2-4 steps ordered by impact, built from the problems found; who = "singur" if a non-technical owner can do it in an admin panel or account, otherwise "programator"; time like "30 de minute" or "1-2 zile"; impact one short sentence.`,
    JSON.stringify(evidence),
    CopySchema,
    { effort: "medium", maxTokens: 12000 }
  );
  const faq = out.faq.slice(0, 6);
  const faqJsonLd = JSON.stringify(
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) },
    null,
    2
  );
  return {
    copy: { title: out.title, description: out.description, h1: out.h1, faq, faqJsonLd: `<script type="application/ld+json">\n${faqJsonLd}\n</script>`, gbp: out.gbp },
    plan: { weeks: out.weeks.slice(0, 4).map((w, i) => ({ week: i + 1, focus: w.focus, steps: w.steps.slice(0, 4) })) },
  };
}

/* ---------- 6. every page, not just the first one ---------- */

export async function pagesDeep(a: Audit): Promise<Deep["pages"]> {
  const start = new URL(a.facts!.finalUrl);
  const urls = new Set<string>();
  // the sitemap first (following one level of sitemap index), then links from the home page
  try {
    const sm = await safeFetch(`${start.origin}/sitemap.xml`, { timeoutMs: 8000 }, 2);
    let xml = await sm.res.text();
    const child = xml.includes("<sitemapindex") ? xml.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1] : null;
    if (child) xml = await (await safeFetch(child, { timeoutMs: 8000 }, 2)).res.text();
    for (const loc of xml.match(/<loc>\s*[^<\s]+\s*<\/loc>/g) || []) urls.add(loc.replace(/<\/?loc>/g, "").trim());
  } catch {
    /* no sitemap */
  }
  if (urls.size < 5) {
    const home = parse(await (await safeFetch(start.toString(), { timeoutMs: 10000 })).res.text());
    for (const el of home.querySelectorAll("a[href]")) {
      try {
        const u = new URL(el.getAttribute("href") || "", start);
        if (sameSite(u.toString(), start.hostname) && !/\.(jpg|jpeg|png|webp|pdf|zip)$/i.test(u.pathname)) urls.add(u.origin + u.pathname);
      } catch {
        /* skip */
      }
    }
  }
  const list = Array.from(urls).filter((u) => sameSite(u, start.hostname)).slice(0, 25);
  const rows: NonNullable<Deep["pages"]>["rows"] = [];
  for (let i = 0; i < list.length; i += 6) {
    const batch = await Promise.all(
      list.slice(i, i + 6).map(async (u) => {
        const t0 = Date.now();
        try {
          const { res } = await safeFetch(u, { timeoutMs: 10000 }, 3);
          const ms = Date.now() - t0;
          const root = parse((await res.text()).slice(0, 1_500_000));
          const title = text(root.querySelector("title"));
          const words = text(root.querySelector("body")).split(" ").filter(Boolean).length;
          return { url: u, status: res.status, title, titleLen: title.length, desc: Boolean(root.querySelector('meta[name="description"]')?.getAttribute("content")), h1: root.querySelectorAll("h1").length, words, ms, noindex: /noindex/i.test(root.querySelector('meta[name="robots"]')?.getAttribute("content") || ""), dupTitle: false };
        } catch {
          return { url: u, status: 0, title: "", titleLen: 0, desc: false, h1: 0, words: 0, ms: null, noindex: false, dupTitle: false };
        }
      })
    );
    rows.push(...batch);
  }
  const seen = new Map<string, number>();
  rows.forEach((r) => r.title && seen.set(r.title, (seen.get(r.title) || 0) + 1));
  rows.forEach((r) => (r.dupTitle = Boolean(r.title) && (seen.get(r.title) || 0) > 1));
  const n = (f: (r: (typeof rows)[number]) => boolean) => rows.filter(f).length;
  const summary = [
    `Am citit ${rows.length} pagini din ${urls.size} găsite.`,
    n((r) => r.status === 0 || r.status >= 400) && `${n((r) => r.status === 0 || r.status >= 400)} pagini nu se deschid.`,
    n((r) => !r.title) && `${n((r) => !r.title)} pagini nu au titlu pentru Google.`,
    n((r) => r.dupTitle) && `${n((r) => r.dupTitle)} pagini au același titlu ca altele, iar Google nu știe pe care s-o arate.`,
    n((r) => !r.desc) && `${n((r) => !r.desc)} pagini nu au descriere pentru Google.`,
    n((r) => r.h1 !== 1 && r.status < 400) && `${n((r) => r.h1 !== 1 && r.status < 400)} pagini nu au exact un titlu principal (H1).`,
    n((r) => r.words < 250 && r.status < 400) && `${n((r) => r.words < 250 && r.status < 400)} pagini au prea puțin text (sub 250 de cuvinte).`,
    n((r) => (r.ms || 0) > 2500) && `${n((r) => (r.ms || 0) > 2500)} pagini răspund greu (peste 2,5 secunde).`,
    n((r) => r.noindex) && `${n((r) => r.noindex)} pagini sunt ascunse de Google (noindex).`,
  ].filter(Boolean) as string[];
  return { found: urls.size, rows, summary };
}

/* ---------- 7. the screenshots with the problems circled ---------- */

const MarkSchema = z.object({
  desktop: z.array(z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number(), label: z.string() })),
  mobile: z.array(z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number(), label: z.string() })),
});

export async function marksDeep(a: Audit): Promise<Deep["marks"]> {
  const d = img(a.shots?.desktop || a.desktop?.screenshot);
  const m = img(a.shots?.mobile || a.mobile?.screenshot);
  if (!d && !m) throw new Error("no screenshots");
  const content: Anthropic.Beta.BetaContentBlockParam[] = [];
  if (d) content.push({ type: "text", text: "Image 1: desktop, first screen." }, d);
  if (m) content.push({ type: "text", text: "Image 2: phone, first screen." }, m);
  content.push({ type: "text", text: `Problems found on this site:\n${(a.analysis?.issues || []).map((i, k) => `${k + 1}. ${i.title}`).join("\n")}` });
  const out = await ask(
    `You mark visible problems on website screenshots for the owner. For each image, pick up to 5 problems that are VISIBLE in that image (from the list, or other clearly visible ones: a banner covering content, a hidden or weak call-to-action, unreadable text, clutter, a dark or poor photo...). For each, give a tight box around the exact area as percentages of the image width/height (x, y = top-left corner, w, h = size; all 0-100), and a short Romanian label (max 8 words). Only mark what you can actually see; boxes must not cover the whole image.`,
    content,
    MarkSchema,
    { effort: "medium" }
  );
  const clamp = (v: number) => Math.max(0, Math.min(100, v));
  const fix = (list: z.infer<typeof MarkSchema>["desktop"]) =>
    list.slice(0, 5).filter((b) => b.w > 2 && b.h > 2 && b.w < 98).map((b, k) => ({ x: clamp(b.x), y: clamp(b.y), w: clamp(Math.min(b.w, 100 - b.x)), h: clamp(Math.min(b.h, 100 - b.y)), n: k + 1, label: b.label.slice(0, 60) }));
  return { desktop: d ? fix(out.desktop) : [], mobile: m ? fix(out.mobile) : [] };
}
