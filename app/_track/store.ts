/* Visits, clicks, checks and report requests, kept as small JSON files in a
   private Vercel Blob store (the site has no database). One file per event;
   a past day is packed into one file the first time the admin page reads it. */

import { get, list, put } from "@vercel/blob";

export type EvKind = "view" | "ping" | "leave" | "click" | "check" | "done" | "request" | "approve";
export type Ev = {
  t: string; // when, ISO
  k: EvKind;
  sid?: string; // one tab = one session
  vid?: string; // one browser = one visitor
  pv?: string; // one page load
  path?: string;
  ref?: string; // referrer host, "" when none
  src?: string; // utm_source
  med?: string; // utm_medium
  cmp?: string; // utm_campaign
  cnt?: string; // utm_content
  trm?: string; // utm_term
  ad?: string; // "meta" | "google" | "tiktok" when the link carried an ad click id
  ret?: boolean; // seen this browser before
  lang?: string; // the site's language
  blang?: string; // the browser's language
  sw?: number; // screen width
  dev?: string; // telefon | tabletă | calculator
  br?: string; // browser
  os?: string;
  app?: string; // in-app browser: Instagram, Facebook, Telegram…
  country?: string;
  city?: string;
  dur?: number; // seconds the page was in front of them (ping, leave)
  scroll?: number; // how far down they got, % (ping, leave)
  seen?: string[]; // ids of the sections that came into view (ping, leave)
  to?: string; // what they pressed (click)
  host?: string; // the site they checked (check, done, request, approve)
  rid?: string; // the report id
  score?: number | null; // its score (done, request)
  email?: string; // (request, approve)
  req?: string; // request id (request, approve)
};

export type ReportRequest = {
  id: string;
  rid: string;
  host: string;
  email: string;
  phone: string;
  t: string;
  score: number | null;
  status: "nou" | "aprobat";
  approvedAt?: string;
  sentTo?: string;
  error?: string;
};

const TZ = "Europe/Chisinau";
const ready = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
/* local development reads the live store but never writes into it (TRACK_DEV=1 in .env.local allows it) */
const canWrite = () => ready() && (process.env.NODE_ENV === "production" || process.env.TRACK_DEV === "1");
const OPT = { access: "private" as const, contentType: "application/json", addRandomSuffix: false, allowOverwrite: true };

/* the day a moment belongs to, by Chișinău time */
export function dayOf(iso: string | Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
}
export function hourOf(iso: string): number {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", hour12: false }).format(new Date(iso)));
}
export function lastDays(n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(dayOf(new Date(Date.now() - i * 86400000)));
  return out;
}
export function fmtTime(iso: string): string {
  return new Date(iso).toLocaleString("ro-RO", { timeZone: TZ, day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).replace(",", "");
}

/* what a user agent tells: the browser, the system, the app it runs inside */
export function uaInfo(ua: string): { dev: string; br: string; os: string; app: string; bot: boolean } {
  const app = /Instagram/i.test(ua) ? "Instagram" : /FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(ua) ? "Facebook" : /Telegram/i.test(ua) ? "Telegram" : /WhatsApp/i.test(ua) ? "WhatsApp" : /TikTok|musical_ly|Bytedance/i.test(ua) ? "TikTok" : /Viber/i.test(ua) ? "Viber" : "";
  const os = /iPhone|iPad|iPod/i.test(ua) ? "iOS" : /Android/i.test(ua) ? "Android" : /Windows/i.test(ua) ? "Windows" : /Mac OS X|Macintosh/i.test(ua) ? "macOS" : /CrOS/i.test(ua) ? "ChromeOS" : /Linux/i.test(ua) ? "Linux" : "";
  const br = /Edg\//.test(ua) ? "Edge" : /OPR\/|Opera/.test(ua) ? "Opera" : /SamsungBrowser/.test(ua) ? "Samsung" : /YaBrowser/.test(ua) ? "Yandex" : /Firefox\/|FxiOS/.test(ua) ? "Firefox" : /CriOS|Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "";
  const dev = /iPad|Tablet/i.test(ua) ? "tabletă" : /Mobi|Android|iPhone/i.test(ua) ? "telefon" : "calculator";
  const bot = /bot|crawl|spider|headless|lighthouse|pagespeed|preview|curl|python|wget|facebookexternalhit|slurp/i.test(ua);
  return { dev, br, os, app, bot };
}

/* who is behind a request, from the tracker's cookies and Vercel's headers */
export function fromRequest(req: Request): Pick<Ev, "sid" | "vid" | "dev" | "br" | "os" | "app" | "country" | "city"> & { me: boolean; bot: boolean } {
  const jar: Record<string, string> = {};
  for (const c of (req.headers.get("cookie") || "").split(";")) {
    const i = c.indexOf("=");
    if (i > 0) {
      try {
        jar[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim());
      } catch {
        /* a cookie we don't read */
      }
    }
  }
  const u = uaInfo(req.headers.get("user-agent") || "");
  let city = "";
  try {
    city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "");
  } catch {
    city = "";
  }
  return {
    sid: (jar.lmd_s || "").slice(0, 20),
    vid: (jar.lmd_v || "").slice(0, 20),
    dev: u.dev,
    br: u.br,
    os: u.os,
    app: u.app,
    country: (req.headers.get("x-vercel-ip-country") || "").slice(0, 2),
    city: city.slice(0, 40),
    me: jar.lmd_me === "1",
    bot: u.bot,
  };
}

export async function logEvent(ev: Ev): Promise<void> {
  if (!canWrite()) return;
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  try {
    await put(`ev/${dayOf(ev.t)}/${id}.json`, JSON.stringify(ev), OPT);
  } catch (e) {
    console.error("[track] put", e);
  }
}

async function readJson<T>(pathname: string): Promise<T | null> {
  try {
    const r = await get(pathname, { access: "private", useCache: false });
    if (!r) return null;
    return JSON.parse(await new Response(r.stream).text()) as T;
  } catch {
    return null;
  }
}

async function listAll(prefix: string): Promise<string[]> {
  const out: string[] = [];
  let cursor: string | undefined;
  do {
    const r = await list({ prefix, limit: 1000, cursor });
    out.push(...r.blobs.map((b) => b.pathname));
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  return out;
}

async function readMany<T>(paths: string[]): Promise<T[]> {
  const out: T[] = [];
  for (let i = 0; i < paths.length; i += 40) {
    const part = await Promise.all(paths.slice(i, i + 40).map((p) => readJson<T>(p)));
    for (const e of part) if (e) out.push(e);
  }
  return out;
}

/* one day's events: the packed file when there is one, otherwise every event file */
export async function loadDay(day: string, today: string): Promise<Ev[]> {
  if (!ready()) return [];
  if (day < today) {
    const packed = await readJson<Ev[]>(`day/${day}.json`);
    if (packed) return packed;
  }
  const paths = await listAll(`ev/${day}/`);
  const evs = await readMany<Ev>(paths);
  evs.sort((a, b) => a.t.localeCompare(b.t));
  if (day < today && paths.length && canWrite()) {
    try {
      await put(`day/${day}.json`, JSON.stringify(evs), OPT);
    } catch (e) {
      console.error("[track] pack", day, e);
    }
  }
  return evs;
}

/* ---- report requests: the small record and, apart, the heavy sealed parts ---- */

export async function saveRequest(r: ReportRequest): Promise<void> {
  if (!canWrite()) throw new Error("store is read-only in development");
  await put(`req/${r.id}.json`, JSON.stringify(r), OPT);
}
export async function saveRequestParts(id: string, parts: Record<string, unknown>): Promise<void> {
  if (!canWrite()) throw new Error("store is read-only in development");
  await put(`reqparts/${id}.json`, JSON.stringify(parts), OPT);
}
export async function loadRequest(id: string): Promise<ReportRequest | null> {
  return /^[a-z0-9]{12}$/.test(id) ? readJson<ReportRequest>(`req/${id}.json`) : null;
}
export async function loadRequestParts(id: string): Promise<Record<string, unknown> | null> {
  return /^[a-z0-9]{12}$/.test(id) ? readJson<Record<string, unknown>>(`reqparts/${id}.json`) : null;
}
export async function listRequests(): Promise<ReportRequest[]> {
  if (!ready()) return [];
  const all = await readMany<ReportRequest>(await listAll("req/"));
  return all.sort((a, b) => b.t.localeCompare(a.t));
}
