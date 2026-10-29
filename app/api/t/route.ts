import { fromRequest, logEvent, type Ev, type EvKind } from "../../_track/store";
import { isBanned } from "../../_track/bans";

export const dynamic = "force-dynamic";

const KINDS: EvKind[] = ["view", "ping", "leave", "click"];
const s = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
const n = (v: unknown, max: number) => (typeof v === "number" && Number.isFinite(v) ? Math.max(0, Math.min(max, Math.round(v))) : undefined);
const done = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

/* the tracker's beacon: one small event per page view, heartbeat, leave or click */
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(await req.text());
  } catch {
    return done();
  }
  if (!b || !KINDS.includes(b.k as EvKind)) return done();
  const who = fromRequest(req);
  if (who.me || who.bot || (await isBanned(who.ip))) return done();
  const ev: Ev = {
    t: new Date().toISOString(),
    k: b.k as EvKind,
    sid: s(b.sid, 20) || who.sid,
    vid: s(b.vid, 20) || who.vid,
    pv: s(b.pv, 20),
    path: s(b.path, 120),
    lang: s(b.lang, 5),
    dev: who.dev,
    br: who.br,
    os: who.os,
    app: who.app,
    country: who.country,
    city: who.city,
  };
  if (ev.k === "view") {
    ev.ref = s(b.ref, 80);
    ev.src = s(b.src, 40);
    ev.med = s(b.med, 40);
    ev.cmp = s(b.cmp, 60);
    ev.cnt = s(b.cnt, 60);
    ev.trm = s(b.trm, 60);
    ev.ad = s(b.ad, 10);
    ev.ret = b.ret === true;
    ev.blang = s(b.blang, 5);
    ev.sw = n(b.sw, 10000);
  }
  if (ev.k === "ping" || ev.k === "leave") {
    ev.dur = n(b.dur, 14400);
    ev.scroll = n(b.scroll, 100);
    ev.seen = Array.isArray(b.seen) ? b.seen.filter((x): x is string => typeof x === "string").map((x) => x.slice(0, 30)).slice(0, 24) : [];
  }
  if (ev.k === "click") ev.to = s(b.to, 60);
  await logEvent(ev);
  return done();
}
