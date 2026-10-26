/* What the report page shows. Built on the server, so the locked parts
   (how to fix each problem, the Google details) only leave it after payment. */

import { categoryScores, grade, overallScore, sortedIssues } from "./score";
import type { Receipt } from "./paid";
import { CATS, type Audit, type CatKey, type Deep, type Facts, type Severity } from "./types";

export type ReportView = {
  rid: string;
  host: string;
  createdAt: string;
  paid: boolean;
  total: number | null;
  tone: "bad" | "mid" | "good";
  label: string;
  verdict: string;
  firstImpression: string;
  cats: { key: CatKey; name: string; score: number | null; tone: string; summary: string }[];
  shots: { desktop: string | null; mobile: string | null };
  issues: { category: string; severity: Severity; title: string; why: string; fix: string | null }[];
  google: null | {
    keyword: string;
    source: "google" | "search";
    depth: number;
    found: boolean | null; // null while locked
    position: number | null;
    page: number | null;
    competitors: { name: string; url: string }[];
    competitorsCount: number;
    note: string | null;
    analysis: string | null;
    actions: string[];
  };
  speed: null | {
    mobile: number | null;
    desktop: number | null;
    lcp: string | null;
    ttfb: string | null;
    opportunities: { title: string; savings: string }[];
  };
  checklist: { ok: boolean; label: string; note: string }[];
  strengths: string[];
  errors: string[];
  deep: Deep | null; // only on a paid report
  receipt: Receipt | null; // the payment details, only on a paid report
};

const CAT_NAME = Object.fromEntries(CATS.map((c) => [c.key, c.name])) as Record<CatKey, string>;

export function checklist(f: Facts) {
  const yes = (ok: boolean, label: string, note = "") => ({ ok, label, note });
  return [
    yes(f.title.length >= 10 && f.title.length <= 65, "Titlul paginii pentru Google", f.title ? `${f.title.length} caractere` : "lipsește"),
    yes(f.description.length >= 50 && f.description.length <= 170, "Descrierea din Google", f.description ? `${f.description.length} caractere` : "lipsește"),
    yes(f.h1.length === 1, "Un singur titlu principal (H1)", `${f.h1.length} găsite`),
    yes(f.lang !== "", "Limba paginii setată", f.lang || "lipsește"),
    yes(f.canonical !== "", "Adresa principală (canonical)"),
    yes(f.robotsTxt, "Fișierul robots.txt"),
    yes(f.sitemap, "Harta site-ului (sitemap.xml)"),
    yes(f.ogTitle && f.ogImage, "Arată frumos când e trimis pe WhatsApp/Facebook"),
    yes(f.structuredData.length > 0, "Date pentru Google (schema)", f.structuredData.slice(0, 2).join(", ")),
    yes(f.images === 0 || f.imagesNoAlt / f.images < 0.2, "Poze descrise pentru Google (alt)", `${f.imagesNoAlt} din ${f.images} fără`),
    yes(f.brokenLinks.length === 0, "Linkuri care nu merg", `${f.brokenLinks.length} din ${f.checkedLinks} verificate`),
    yes(f.https && f.redirectsToHttps !== false, "Conexiune sigură (HTTPS)"),
    yes(f.sslDaysLeft == null ? f.https : f.sslDaysLeft > 20, "Certificatul SSL", f.sslDaysLeft == null ? "" : `expiră în ${f.sslDaysLeft} zile`),
    yes(f.analytics.length > 0, "Statistici de vizite instalate", f.analytics.join(", ") || "niciuna"),
    yes(f.phoneVisible, "Telefon vizibil pe pagină"),
    yes(f.whatsapp || f.telegram, "Buton WhatsApp sau Telegram"),
    yes(f.forms > 0, "Formular de contact"),
    yes(f.cookieBanner, "Mesaj despre cookie-uri (GDPR)"),
    yes(f.securityHeaders.hsts && f.securityHeaders.xContentType, "Setări de securitate pe server"),
    yes(f.words >= 250, "Destul text pentru Google", `${f.words} cuvinte`),
  ];
}

export function buildView(a: Audit, paid: boolean, receipt: Receipt | null = null): ReportView {
  const s = categoryScores(a);
  const total = overallScore(s);
  const g = grade(total);
  const f = a.facts!;
  const gp = a.google;
  return {
    rid: a.id,
    host: a.host,
    createdAt: a.createdAt,
    paid,
    total,
    tone: g.tone,
    label: g.label,
    verdict: a.analysis?.verdict || "",
    firstImpression: a.analysis?.firstImpression || "",
    cats: CATS.map((c) => ({ key: c.key, name: c.name, score: s[c.key], tone: grade(s[c.key]).tone, summary: a.analysis?.catSummary[c.key] || (s[c.key] == null ? "Nu am putut măsura." : "") })),
    shots: { desktop: a.shots?.desktop || a.desktop?.screenshot || null, mobile: a.shots?.mobile || a.mobile?.screenshot || null },
    issues: sortedIssues(a).map((i) => ({ category: CAT_NAME[i.category], severity: i.severity, title: i.title, why: i.why, fix: paid ? i.fix : null })),
    google: gp
      ? {
          keyword: gp.keyword,
          source: gp.source,
          depth: gp.depth,
          found: paid ? gp.position != null : null,
          position: paid ? gp.position : null,
          page: paid ? gp.page : null,
          competitors: paid ? gp.competitors : [],
          competitorsCount: gp.competitors.length,
          note: paid ? gp.note : null,
          analysis: paid ? gp.analysis : null,
          actions: paid ? gp.actions : [],
        }
      : null,
    speed:
      a.mobile || a.desktop
        ? {
            mobile: a.mobile?.performance ?? null,
            desktop: a.desktop?.performance ?? null,
            lcp: a.mobile?.lcp ?? null,
            ttfb: f.ttfbMs != null ? `${(f.ttfbMs / 1000).toFixed(1)} s` : null,
            opportunities: a.mobile?.opportunities || [],
          }
        : null,
    checklist: checklist(f),
    strengths: a.analysis?.strengths || [],
    errors: a.errors,
    deep: paid ? a.deep || {} : null,
    receipt: paid ? receipt : null,
  };
}
