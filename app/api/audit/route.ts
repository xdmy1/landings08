import { collectFacts, normaliseUrl, publicHost } from "../../_audit/collect";
import { aiReady } from "../../_audit/ai";
import { allow, newRid } from "../../_audit/limits";
import { clientIp, json } from "../../_audit/http";
import { isOwnSite } from "../../_audit/own";
import { seal } from "../../_audit/seal";
import { readJson, type Base } from "../../_audit/state";
import { fromRequest, logEvent } from "../../_track/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 1: read the page itself; returns the sealed base the other steps need */
export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return json({ error: "bad_request" }, 400);
  if (!aiReady()) return json({ error: "not_configured" }, 503);

  const u = normaliseUrl(typeof body.url === "string" ? body.url : "");
  if (!u || !(await publicHost(u.hostname))) return json({ error: "url" }, 400);
  if (isOwnSite(u.hostname)) return json({ error: "own" }, 409);
  const keyword = typeof body.keyword === "string" ? body.keyword.replace(/\s+/g, " ").trim().slice(0, 80) : "";

  const gate = allow("start", clientIp(req));
  if (gate !== "ok") return json({ error: gate === "ip" ? "limit_ip" : "limit_site" }, 429);

  try {
    const facts = await collectFacts(u);
    if (isOwnSite(facts.host)) return json({ error: "own" }, 409); // reached one of ours through a redirect
    const base: Base = { id: newRid(), createdAt: new Date().toISOString(), url: u.toString(), host: facts.host, keyword, facts };
    const who = fromRequest(req);
    if (!who.me && !who.bot) await logEvent({ t: base.createdAt, k: "check", host: base.host, rid: base.id, path: "/verificare", sid: who.sid, vid: who.vid, dev: who.dev, br: who.br, os: who.os, app: who.app, country: who.country, city: who.city });
    return json({ rid: base.id, host: base.host, base: seal(base) });
  } catch (e) {
    console.error("[audit] collect", u.toString(), e);
    return json({ error: "unreachable" }, 422);
  }
}
