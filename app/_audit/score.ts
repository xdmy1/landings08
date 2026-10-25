/* Scores: speed, SEO and safety come from measurements; design, sales and
   phone from the AI's reading of the screenshots (phone also uses Lighthouse).
   Also decides what the free report shows and what stays locked. */

import type { Audit, CatKey, Issue } from "./types";

const avg = (xs: (number | null | undefined)[]) => {
  const v = xs.filter((x): x is number => typeof x === "number");
  return v.length ? Math.round(v.reduce((s, x) => s + x, 0) / v.length) : null;
};

export function categoryScores(a: Audit): Record<CatKey, number | null> {
  const f = a.facts;
  const perf = a.mobile?.performance != null || a.desktop?.performance != null ? Math.round((a.mobile?.performance ?? a.desktop!.performance!) * 0.6 + (a.desktop?.performance ?? a.mobile!.performance!) * 0.4) : null;

  let seo: number | null = null;
  if (f) {
    const checks = [
      f.title.length >= 10 && f.title.length <= 65,
      f.description.length >= 50 && f.description.length <= 170,
      f.h1.length === 1,
      f.lang !== "",
      f.canonical !== "",
      f.viewport,
      f.robotsTxt,
      f.sitemap,
      f.ogTitle && f.ogImage,
      f.structuredData.length > 0,
      f.images === 0 || f.imagesNoAlt / f.images < 0.2,
      f.brokenLinks.length === 0,
      f.words >= 250,
      !/noindex/i.test(f.robotsMeta),
    ];
    const own = Math.round((checks.filter(Boolean).length / checks.length) * 100);
    seo = avg([own, a.mobile?.seo, own]);
  }

  let siguranta: number | null = null;
  if (f) {
    const h = f.securityHeaders;
    const pts = [
      f.https ? 30 : 0,
      f.redirectsToHttps === false ? 0 : 15,
      f.sslDaysLeft == null ? (f.https ? 10 : 0) : f.sslDaysLeft > 20 ? 20 : 5,
      h.hsts ? 10 : 0,
      h.xContentType ? 5 : 0,
      h.xFrame || h.csp ? 10 : 0,
      f.status < 400 ? 10 : 0,
    ];
    siguranta = Math.min(100, pts.reduce((s, x) => s + x, 0));
  }

  return {
    viteza: perf,
    seo,
    design: a.analysis?.scores.design ?? null,
    vanzare: a.analysis?.scores.vanzare ?? null,
    mobil: a.analysis ? avg([a.analysis.scores.mobil, a.analysis.scores.mobil, a.mobile?.accessibility, a.mobile?.performance]) : null,
    siguranta,
  };
}

const WEIGHT: Record<CatKey, number> = { viteza: 1.2, seo: 1.2, design: 1.3, vanzare: 1.3, mobil: 1.2, siguranta: 0.8 };

export function overallScore(s: Record<CatKey, number | null>): number | null {
  let sum = 0;
  let w = 0;
  for (const k of Object.keys(s) as CatKey[]) {
    if (s[k] == null) continue;
    sum += (s[k] as number) * WEIGHT[k];
    w += WEIGHT[k];
  }
  return w ? Math.round(sum / w) : null;
}

export function grade(n: number | null): { label: string; tone: "bad" | "mid" | "good" } {
  if (n == null) return { label: "—", tone: "mid" };
  if (n >= 80) return { label: "Bun", tone: "good" };
  if (n >= 55) return { label: "Mediu", tone: "mid" };
  return { label: "Slab", tone: "bad" };
}

const RANK = { critic: 0, important: 1, minor: 2 } as const;

export function sortedIssues(a: Audit): Issue[] {
  return [...(a.analysis?.issues || [])].sort((x, y) => RANK[x.severity] - RANK[y.severity]);
}
