/* turns the raw events into what the admin page shows */

import { dayOf, hourOf, type Ev } from "./store";

export type Page = { path: string; rid: string; t: string; dur: number; scroll: number; seen: string[] };
export type Session = {
  sid: string;
  vid: string;
  t: string;
  end: string;
  src: string;
  cmp: string;
  cnt: string;
  country: string;
  city: string;
  dev: string;
  br: string;
  os: string;
  app: string;
  lang: string;
  blang: string;
  sw: number;
  ret: boolean;
  pages: Page[];
  dur: number;
  scroll: number;
  checks: { host: string; score: number | null; rid: string; ip: string }[];
  clicks: string[];
  requests: string[];
};
export type Check = { t: string; host: string; score: number | null; src: string; country: string; city: string; dev: string; ip: string; opened: boolean; reportDur: number; requested: boolean; clicks: string[] };
export type Row = { k: string; n: number };
export type SrcRow = Row & { dur: number; bounce: number; checks: number; chats: number; requests: number; conv: number };
export type PathRow = Row & { dur: number; scroll: number; exits: number };
export type Stats = {
  sessions: Session[];
  visitors: number;
  returning: number;
  views: number;
  avgDur: number;
  medDur: number;
  bounce: number;
  checks: Check[];
  avgScore: number | null;
  reportsOpened: number;
  requests: number;
  chats: number;
  clicks: number;
  byDay: { day: string; sessions: number; visitors: number; checks: number; requests: number; chats: number }[];
  byHour: number[];
  bySrc: SrcRow[];
  byCmp: SrcRow[];
  byCountry: Row[];
  byCity: Row[];
  byDev: Row[];
  byBr: Row[];
  byOs: Row[];
  byApp: Row[];
  byLang: Row[];
  byBlang: Row[];
  byScreen: Row[];
  byPath: PathRow[];
  bySeen: Row[];
  byEntry: Row[];
  byExit: Row[];
  byClick: Row[];
};

const GAP = 30 * 60 * 1000; // a pause longer than this starts a new session
const CHAT = /WhatsApp|Telegram/i;

/* where a visit came from, in words */
export function sourceOf(e: Ev): string {
  const s = (e.src || "").toLowerCase();
  if (s) {
    if (/^(ig|instagram)$/.test(s)) return "Meta (Instagram)";
    if (/^(fb|facebook|meta|an|msg|messenger)$/.test(s)) return "Meta (Facebook)";
    if (/google/.test(s)) return "Google Ads";
    if (/tiktok/.test(s)) return "TikTok Ads";
    return s[0].toUpperCase() + s.slice(1);
  }
  if (e.ad === "meta") return "Meta (reclamă)";
  if (e.ad === "google") return "Google Ads";
  if (e.ad === "tiktok") return "TikTok Ads";
  const r = (e.ref || "").toLowerCase().replace(/^www\./, "");
  if (!r) {
    if (e.app === "Instagram") return "Instagram (în aplicație)";
    if (e.app === "Facebook") return "Facebook (în aplicație)";
    if (e.app === "Telegram") return "Telegram (în aplicație)";
    if (e.app === "WhatsApp") return "WhatsApp (în aplicație)";
    if (e.app === "TikTok") return "TikTok (în aplicație)";
    if (e.app === "Viber") return "Viber (în aplicație)";
    return "Direct";
  }
  if (/facebook\.com|fb\.com|messenger\.com/.test(r)) return "Meta (Facebook)";
  if (/instagram\.com/.test(r)) return "Meta (Instagram)";
  if (/google\./.test(r)) return "Google";
  if (/bing\.com/.test(r)) return "Bing";
  if (/^t\.co$|twitter|x\.com/.test(r)) return "X";
  if (/t\.me|telegram/.test(r)) return "Telegram";
  if (/linkedin/.test(r)) return "LinkedIn";
  if (/tiktok/.test(r)) return "TikTok";
  if (/youtube|youtu\.be/.test(r)) return "YouTube";
  return r;
}

const normPath = (p: string): { path: string; rid: string } => {
  const m = p.match(/^\/verificare\/raport\/([a-z0-9]+)/);
  return m ? { path: "/verificare/raport", rid: m[1] } : { path: p || "/", rid: "" };
};

function group<T>(items: T[], key: (x: T) => string): Row[] {
  const m = new Map<string, number>();
  for (const x of items) {
    const k = key(x);
    if (k) m.set(k, (m.get(k) || 0) + 1);
  }
  return Array.from(m, ([k, n]) => ({ k, n })).sort((a, b) => b.n - a.n);
}

const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0);

function srcRows(sessions: Session[], key: (s: Session) => string): SrcRow[] {
  const m = new Map<string, Session[]>();
  for (const s of sessions) {
    const k = key(s);
    if (!k) continue;
    m.set(k, [...(m.get(k) || []), s]);
  }
  return Array.from(m, ([k, list]) => {
    const durs = list.map((s) => s.dur).filter((d) => d > 0);
    const chats = list.reduce((n, s) => n + s.clicks.filter((c) => CHAT.test(c)).length, 0);
    const checks = list.reduce((n, s) => n + s.checks.length, 0);
    const requests = list.reduce((n, s) => n + s.requests.length, 0);
    const converted = list.filter((s) => s.checks.length || s.requests.length || s.clicks.some((c) => CHAT.test(c))).length;
    const bounced = list.filter((s) => s.pages.length <= 1 && s.dur < 10 && !s.clicks.length && !s.checks.length).length;
    return { k, n: list.length, dur: avg(durs), bounce: Math.round((bounced / list.length) * 100), checks, chats, requests, conv: Math.round((converted / list.length) * 100) };
  }).sort((a, b) => b.n - a.n);
}

export function stats(evs: Ev[]): Stats {
  /* sessions: one per tab, split again after a pause of 30 minutes */
  const byKey = new Map<string, Ev[]>();
  for (const e of evs) {
    const k = e.sid || e.vid || "";
    if (!k) continue;
    byKey.set(k, [...(byKey.get(k) || []), e]);
  }
  const sessions: Session[] = [];
  const pagesByRid = new Map<string, Page[]>();
  for (const [key, list] of Array.from(byKey)) {
    list.sort((a, b) => a.t.localeCompare(b.t));
    let s: Session | null = null;
    let lastT = 0;
    const pages = new Map<string, Page>();
    for (const e of list) {
      const t = Date.parse(e.t);
      if (!s || t - lastT > GAP) {
        s = { sid: key + (s ? `#${sessions.length}` : ""), vid: e.vid || "", t: e.t, end: e.t, src: "", cmp: "", cnt: "", country: e.country || "", city: e.city || "", dev: e.dev || "", br: e.br || "", os: e.os || "", app: e.app || "", lang: "", blang: "", sw: 0, ret: false, pages: [], dur: 0, scroll: 0, checks: [], clicks: [], requests: [] };
        sessions.push(s);
        pages.clear();
      }
      lastT = t;
      s.end = e.t;
      if (!s.country && e.country) s.country = e.country;
      if (!s.city && e.city) s.city = e.city;
      if (!s.br && e.br) s.br = e.br;
      if (!s.os && e.os) s.os = e.os;
      if (!s.app && e.app) s.app = e.app;
      if (e.k === "view") {
        if (!s.src) {
          s.src = sourceOf(e);
          s.cmp = e.cmp || "";
          s.cnt = e.cnt || "";
          s.ret = Boolean(e.ret);
          s.blang = e.blang || "";
          s.sw = e.sw || 0;
        }
        if (!s.lang && e.lang) s.lang = e.lang;
        const { path, rid } = normPath(e.path || "/");
        const pg: Page = { path, rid, t: e.t, dur: 0, scroll: 0, seen: [] };
        s.pages.push(pg);
        if (e.pv) pages.set(e.pv, pg);
        if (rid) pagesByRid.set(rid, [...(pagesByRid.get(rid) || []), pg]);
      }
      if (e.k === "ping" || e.k === "leave") {
        const pg = (e.pv && pages.get(e.pv)) || s.pages[s.pages.length - 1];
        if (pg) {
          pg.dur = Math.max(pg.dur, e.dur || 0);
          pg.scroll = Math.max(pg.scroll, e.scroll || 0);
          for (const id of e.seen || []) if (!pg.seen.includes(id)) pg.seen.push(id);
        }
      }
      if (e.k === "click" && e.to) s.clicks.push(e.to);
      if (e.k === "check" && e.host) s.checks.push({ host: e.host, score: null, rid: e.rid || "", ip: e.ip || "" });
      if (e.k === "done" && e.host) {
        const c = s.checks.find((x) => x.host === e.host && x.score === null) || s.checks.find((x) => x.host === e.host);
        if (c) c.score = e.score ?? null;
      }
      if (e.k === "request" && e.email) s.requests.push(e.email);
    }
  }
  for (const s of sessions) {
    s.dur = s.pages.reduce((n, p) => n + p.dur, 0);
    s.scroll = Math.max(0, ...s.pages.map((p) => p.scroll));
    if (!s.src) s.src = "Direct";
  }
  const real = sessions.filter((s) => s.pages.length || s.checks.length).sort((a, b) => b.t.localeCompare(a.t));

  const durs = real.map((s) => s.dur).filter((d) => d > 0).sort((a, b) => a - b);
  const bounced = real.filter((s) => s.pages.length <= 1 && s.dur < 10 && !s.clicks.length && !s.checks.length).length;

  /* every check, with what happened after it */
  const requests = evs.filter((e) => e.k === "request");
  const checks: Check[] = [];
  for (const s of real) {
    for (const c of s.checks) {
      const rp = c.rid ? pagesByRid.get(c.rid) || [] : [];
      const when = evs.find((e) => e.k === "check" && e.host === c.host && (e.sid || e.vid) === s.sid.split("#")[0])?.t || s.t;
      checks.push({ t: when, host: c.host, score: c.score, src: s.src, country: s.country, city: s.city, dev: s.dev, ip: c.ip, opened: rp.length > 0, reportDur: rp.reduce((n, p) => n + p.dur, 0), requested: requests.some((r) => r.rid === c.rid), clicks: s.clicks.filter((x) => /Raport|WhatsApp|Telegram/i.test(x)) });
    }
  }
  checks.sort((a, b) => b.t.localeCompare(a.t));
  const scores = checks.map((c) => c.score).filter((x): x is number => typeof x === "number");

  const days = new Map<string, { day: string; sessions: number; visitors: Set<string>; checks: number; requests: number; chats: number }>();
  const dayRow = (d: string) => {
    let r = days.get(d);
    if (!r) {
      r = { day: d, sessions: 0, visitors: new Set(), checks: 0, requests: 0, chats: 0 };
      days.set(d, r);
    }
    return r;
  };
  for (const s of real) {
    const r = dayRow(dayOf(s.t));
    r.sessions++;
    r.visitors.add(s.vid || s.sid);
    r.checks += s.checks.length;
    r.requests += s.requests.length;
    r.chats += s.clicks.filter((c) => CHAT.test(c)).length;
  }
  const byHour = new Array(24).fill(0) as number[];
  for (const s of real) byHour[hourOf(s.t)]++;

  const allPages = real.flatMap((s) => s.pages);
  const byPath: PathRow[] = group(allPages, (p) => p.path).map((r) => {
    const mine = allPages.filter((p) => p.path === r.k);
    return { ...r, dur: avg(mine.filter((p) => p.dur > 0).map((p) => p.dur)), scroll: avg(mine.filter((p) => p.scroll > 0).map((p) => p.scroll)), exits: real.filter((s) => s.pages.length && s.pages[s.pages.length - 1].path === r.k).length };
  });
  const homeSessions = real.filter((s) => s.pages.some((p) => p.path === "/"));
  const bySeen = group(
    homeSessions.flatMap((s) => Array.from(new Set(s.pages.filter((p) => p.path === "/").flatMap((p) => p.seen)))),
    (id) => id
  ).filter((r) => r.k !== "top");
  const screen = (w: number) => (!w ? "" : w <= 360 ? "≤ 360 px" : w <= 414 ? "361–414 px" : w <= 768 ? "415–768 px" : w <= 1280 ? "769–1280 px" : "> 1280 px");

  return {
    sessions: real,
    visitors: new Set(real.map((s) => s.vid || s.sid)).size,
    returning: real.length ? Math.round((real.filter((s) => s.ret).length / real.length) * 100) : 0,
    views: allPages.length,
    avgDur: avg(durs),
    medDur: durs.length ? durs[Math.floor(durs.length / 2)] : 0,
    bounce: real.length ? Math.round((bounced / real.length) * 100) : 0,
    checks,
    avgScore: scores.length ? avg(scores) : null,
    reportsOpened: real.filter((s) => s.pages.some((p) => p.path === "/verificare/raport")).length,
    requests: requests.length,
    chats: real.reduce((n, s) => n + s.clicks.filter((c) => CHAT.test(c)).length, 0),
    clicks: evs.filter((e) => e.k === "click").length,
    byDay: Array.from(days.values())
      .map((r) => ({ day: r.day, sessions: r.sessions, visitors: r.visitors.size, checks: r.checks, requests: r.requests, chats: r.chats }))
      .sort((a, b) => b.day.localeCompare(a.day)),
    byHour,
    bySrc: srcRows(real, (s) => s.src),
    byCmp: srcRows(real, (s) => (s.cmp ? s.cmp + (s.cnt ? ` · ${s.cnt}` : "") : "")),
    byCountry: group(real, (s) => s.country),
    byCity: group(real, (s) => (s.city ? `${s.city}${s.country ? `, ${s.country}` : ""}` : "")),
    byDev: group(real, (s) => s.dev),
    byBr: group(real, (s) => s.br),
    byOs: group(real, (s) => s.os),
    byApp: group(real, (s) => s.app || "browser obișnuit"),
    byLang: group(real, (s) => s.lang.toUpperCase()),
    byBlang: group(real, (s) => s.blang.toLowerCase()),
    byScreen: group(real, (s) => screen(s.sw)),
    byPath,
    bySeen,
    byEntry: group(real.filter((s) => s.pages.length), (s) => s.pages[0].path),
    byExit: group(real.filter((s) => s.pages.length), (s) => s.pages[s.pages.length - 1].path),
    byClick: group(evs.filter((e) => e.k === "click"), (e) => e.to || ""),
  };
}
