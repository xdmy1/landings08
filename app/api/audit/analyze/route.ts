import { analyse } from "../../../_audit/ai";
import { allow } from "../../../_audit/limits";
import { clientIp, json } from "../../../_audit/http";
import { seal } from "../../../_audit/seal";
import { readAudit, readJson } from "../../../_audit/state";
import { categoryScores, overallScore } from "../../../_audit/score";
import { fromRequest, logEvent } from "../../../_track/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 3: reads the screenshots and the measurements and writes the findings */
export async function POST(req: Request) {
  const body = await readJson(req);
  const a = body && readAudit({ base: body.base, speed: body.speed, shots: body.shots });
  if (!a) return json({ error: "bad_request" }, 400);
  if (allow("ai", clientIp(req)) !== "ok") return json({ error: "limit" }, 429);
  try {
    const analysis = await analyse(a);
    const who = fromRequest(req);
    if (!who.me && !who.bot) await logEvent({ t: new Date().toISOString(), k: "done", host: a.host, rid: a.id, score: overallScore(categoryScores({ ...a, analysis })), sid: who.sid, vid: who.vid, dev: who.dev, br: who.br, os: who.os, app: who.app, country: who.country, city: who.city });
    return json({ ok: true, analysis: seal(analysis) });
  } catch (e) {
    console.error("[audit] analyse", a.id, e);
    return json({ ok: false, analysis: seal({ error: "analysis" }) });
  }
}
