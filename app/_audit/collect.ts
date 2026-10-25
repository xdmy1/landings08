/* Everything we can measure without AI: the page itself, its SEO basics,
   SSL, broken links, and Google PageSpeed for phone and desktop. */

import { lookup } from "dns/promises";
import { connect } from "tls";
import { isIP } from "net";
import { parse, type HTMLElement } from "node-html-parser";
import type { Facts, Vitals } from "./types";

const UA = "Mozilla/5.0 (compatible; landings.md-checker/1.0; +https://landings.md/verificare)";

/* ---------- the address: normalise, and refuse anything that isn't a public website ---------- */

export function normaliseUrl(raw: string): URL | null {
  let s = (raw || "").trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  try {
    const u = new URL(s);
    if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".") || u.username || u.password) return null;
    u.hash = "";
    return u;
  } catch {
    return null;
  }
}

function privateIp(ip: string): boolean {
  if (isIP(ip) === 6) {
    const v = ip.toLowerCase();
    if (v === "::1" || v === "::" || v.startsWith("fe80") || v.startsWith("fc") || v.startsWith("fd")) return true;
    const m = v.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    return m ? privateIp(m[1]) : false;
  }
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
}

export async function publicHost(host: string): Promise<boolean> {
  if (isIP(host)) return !privateIp(host);
  if (/^(localhost|.*\.local|.*\.internal)$/i.test(host)) return false;
  try {
    const all = await lookup(host, { all: true });
    return all.length > 0 && all.every((a) => !privateIp(a.address));
  } catch {
    return false;
  }
}

/* fetch that re-checks every redirect hop, so a public site can't bounce us inward */
async function safeFetch(url: string, init: RequestInit & { timeoutMs?: number } = {}, hops = 5): Promise<{ res: Response; finalUrl: string }> {
  let current = url;
  for (let i = 0; i <= hops; i++) {
    const u = new URL(current);
    if (!(await publicHost(u.hostname))) throw new Error("blocked_host");
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), init.timeoutMs ?? 12000);
    const r = await fetch(current, { ...init, redirect: "manual", signal: ctl.signal, headers: { "User-Agent": UA, "Accept-Language": "ro,ru;q=0.8,en;q=0.6", ...(init.headers || {}) } }).finally(() => clearTimeout(t));
    if (r.status >= 300 && r.status < 400 && r.headers.get("location")) {
      current = new URL(r.headers.get("location")!, current).toString();
      continue;
    }
    return { res: r, finalUrl: current };
  }
  throw new Error("too_many_redirects");
}

function sslDaysLeft(host: string): Promise<number | null> {
  return new Promise((resolve) => {
    const s = connect({ host, port: 443, servername: host, timeout: 6000 }, () => {
      const cert = s.getPeerCertificate();
      s.end();
      resolve(cert?.valid_to ? Math.floor((new Date(cert.valid_to).getTime() - Date.now()) / 86400000) : null);
    });
    s.on("error", () => resolve(null));
    s.on("timeout", () => {
      s.destroy();
      resolve(null);
    });
  });
}

const text = (el: HTMLElement | null | undefined) => (el?.text || "").replace(/\s+/g, " ").trim();
const attr = (root: HTMLElement, sel: string, a: string) => root.querySelector(sel)?.getAttribute(a)?.trim() || "";

export async function collectFacts(u: URL): Promise<Facts> {
  const t0 = Date.now();
  const { res, finalUrl } = await safeFetch(u.toString(), { timeoutMs: 15000 });
  const ttfbMs = Date.now() - t0;
  const html = (await res.text()).slice(0, 2_500_000);
  const final = new URL(finalUrl);
  const root = parse(html, { comment: false, blockTextElements: { script: true, style: false, noscript: false } });

  const scripts = root.querySelectorAll("script").map((s) => (s.getAttribute("src") || "") + " " + s.text.slice(0, 400)).join(" ");
  const body = root.querySelector("body");
  const bodyText = text(body);
  const anchors = root.querySelectorAll("a[href]").map((a) => a.getAttribute("href") || "");
  const internal: string[] = [];
  let external = 0;
  for (const h of anchors) {
    if (/^(mailto:|tel:|javascript:|#)/i.test(h)) continue;
    try {
      const abs = new URL(h, final);
      if (abs.hostname.replace(/^www\./, "") === final.hostname.replace(/^www\./, "")) internal.push(abs.toString().split("#")[0]);
      else external++;
    } catch {
      /* ignore malformed links */
    }
  }

  // broken links: check a sample of distinct internal pages
  const sample = Array.from(new Set(internal)).filter((l) => l !== final.toString()).slice(0, 12);
  const checks = await Promise.all(
    sample.map(async (l) => {
      try {
        const { res: r } = await safeFetch(l, { method: "HEAD", timeoutMs: 7000 }, 3);
        const st = r.status === 405 || r.status === 501 ? (await safeFetch(l, { timeoutMs: 7000 }, 3)).res.status : r.status;
        return { url: l, status: st };
      } catch {
        return { url: l, status: 0 };
      }
    })
  );

  const [robotsTxt, sitemap, sslDays, httpRedirect] = await Promise.all([
    safeFetch(`${final.origin}/robots.txt`, { timeoutMs: 6000 }, 2).then((r) => r.res.ok).catch(() => false),
    safeFetch(`${final.origin}/sitemap.xml`, { timeoutMs: 6000 }, 2).then((r) => r.res.ok).catch(() => false),
    final.protocol === "https:" ? sslDaysLeft(final.hostname) : Promise.resolve(null),
    safeFetch(`http://${final.hostname}/`, { method: "HEAD", timeoutMs: 6000 }, 3).then((r) => r.finalUrl.startsWith("https://")).catch(() => null),
  ]);

  const imgs = root.querySelectorAll("img");
  const ld = root.querySelectorAll('script[type="application/ld+json"]').flatMap((s) => {
    try {
      const j = JSON.parse(s.text);
      const arr = Array.isArray(j) ? j : j["@graph"] || [j];
      return (arr as { "@type"?: string | string[] }[]).map((x) => String(x["@type"] || "")).filter(Boolean);
    } catch {
      return [];
    }
  });
  const analytics = [
    /googletagmanager\.com|gtag\(/.test(scripts) && "Google Analytics / Tag Manager",
    /connect\.facebook\.net|fbq\(/.test(scripts) && "Meta Pixel",
    /mc\.yandex\.ru|ym\(/.test(scripts) && "Yandex Metrica",
    /clarity\.ms/.test(scripts) && "Microsoft Clarity",
    /hotjar/.test(scripts) && "Hotjar",
  ].filter(Boolean) as string[];

  return {
    url: u.toString(),
    finalUrl: final.toString(),
    host: final.hostname,
    status: res.status,
    https: final.protocol === "https:",
    redirectsToHttps: httpRedirect,
    ttfbMs,
    htmlKb: Math.round(html.length / 1024),
    title: text(root.querySelector("title")).slice(0, 200),
    description: attr(root, 'meta[name="description"]', "content").slice(0, 400),
    h1: root.querySelectorAll("h1").map(text).filter(Boolean).slice(0, 5),
    h2: root.querySelectorAll("h2").map(text).filter(Boolean).slice(0, 12),
    lang: root.querySelector("html")?.getAttribute("lang") || "",
    canonical: attr(root, 'link[rel="canonical"]', "href"),
    viewport: Boolean(root.querySelector('meta[name="viewport"]')),
    robotsMeta: attr(root, 'meta[name="robots"]', "content"),
    ogTitle: Boolean(root.querySelector('meta[property="og:title"]')),
    ogImage: Boolean(root.querySelector('meta[property="og:image"]')),
    favicon: Boolean(root.querySelector('link[rel~="icon"]')),
    structuredData: Array.from(new Set(ld)).slice(0, 10),
    hreflang: root.querySelectorAll('link[rel="alternate"][hreflang]').length,
    images: imgs.length,
    imagesNoAlt: imgs.filter((i) => !(i.getAttribute("alt") || "").trim()).length,
    links: { internal: internal.length, external },
    brokenLinks: checks.filter((c) => c.status === 0 || c.status >= 400),
    checkedLinks: checks.length,
    phoneVisible: /tel:/i.test(html) || /(\+373|\b0[67]\d)[\s-]?\d{2,3}[\s-]?\d{2,3}[\s-]?\d{2,3}/.test(bodyText),
    whatsapp: /wa\.me|api\.whatsapp\.com|whatsapp:/i.test(html),
    telegram: /t\.me\//i.test(html),
    email: /mailto:/i.test(html),
    forms: root.querySelectorAll("form").length,
    analytics,
    cookieBanner: /cookie/i.test(bodyText) && /(accept|accep|consim|согла|принят)/i.test(bodyText),
    robotsTxt,
    sitemap,
    sslDaysLeft: sslDays,
    securityHeaders: {
      hsts: res.headers.has("strict-transport-security"),
      csp: res.headers.has("content-security-policy"),
      xFrame: res.headers.has("x-frame-options"),
      xContentType: res.headers.has("x-content-type-options"),
    },
    words: bodyText ? bodyText.split(" ").length : 0,
    textSample: bodyText.slice(0, 4000),
  };
}

/* ---------- Google PageSpeed (Lighthouse) ---------- */

type Lh = {
  lighthouseResult?: {
    categories?: Record<string, { score: number | null }>;
    audits?: Record<string, { title?: string; displayValue?: string; numericValue?: number; score?: number | null; details?: { type?: string; data?: string; overallSavingsMs?: number } }>;
  };
};

export async function pageSpeed(url: string, strategy: "mobile" | "desktop"): Promise<Vitals | null> {
  const q = new URLSearchParams({ url, strategy, locale: "ro" });
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) q.append("category", c);
  if (process.env.PAGESPEED_API_KEY) q.set("key", process.env.PAGESPEED_API_KEY);
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 45000);
  try {
    const r = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`, { signal: ctl.signal, cache: "no-store" });
    if (!r.ok) return null;
    const j = (await r.json()) as Lh;
    const lh = j.lighthouseResult;
    if (!lh) return null;
    const cat = (k: string) => (lh.categories?.[k]?.score == null ? null : Math.round((lh.categories[k].score as number) * 100));
    const a = lh.audits || {};
    const dv = (k: string) => a[k]?.displayValue?.replace(/ /g, " ") || null;
    const opportunities = Object.values(a)
      .filter((x) => x.details?.type === "opportunity" && (x.details.overallSavingsMs || 0) > 300 && (x.score ?? 1) < 0.9)
      .sort((x, y) => (y.details?.overallSavingsMs || 0) - (x.details?.overallSavingsMs || 0))
      .slice(0, 6)
      .map((x) => ({ title: x.title || "", savings: `${((x.details?.overallSavingsMs || 0) / 1000).toFixed(1)} s` }));
    return {
      performance: cat("performance"),
      seo: cat("seo"),
      accessibility: cat("accessibility"),
      bestPractices: cat("best-practices"),
      lcp: dv("largest-contentful-paint"),
      cls: dv("cumulative-layout-shift"),
      tbt: dv("total-blocking-time"),
      fcp: dv("first-contentful-paint"),
      speedIndex: dv("speed-index"),
      lcpMs: a["largest-contentful-paint"]?.numericValue ?? null,
      opportunities,
      screenshot: a["final-screenshot"]?.details?.data || null,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}
