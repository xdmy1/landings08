import { eurRate, sendMail, toMdl, adminEmail } from "../../../_pay/maib";
import { clientIp, json } from "../../../_audit/http";
import { allow, newRid } from "../../../_audit/limits";
import { requestEmails } from "../../../_audit/mail";
import { AUDIT_EUR } from "../../../_audit/price";
import { categoryScores, overallScore } from "../../../_audit/score";
import { readAudit, readJson } from "../../../_audit/state";
import { fromRequest, logEvent, saveRequest, saveRequestParts, type ReportRequest } from "../../../_track/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE = process.env.SITE_URL || "https://www.landings.md";

/* while card payments are off: the visitor asks for the full report, pays through
   MIA, and the studio approves it by hand from the admin page */
export async function POST(req: Request) {
  const body = await readJson(req);
  const a = body && readAudit(body);
  if (!body || !a) return json({ error: "bad_request" }, 400);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 60) : "";
  const phone = typeof body.phone === "string" ? body.phone.replace(/\s+/g, " ").trim().slice(0, 30) : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ error: "email" }, 400);
  if ((await allow("request", clientIp(req))) !== "ok") return json({ error: "limit" }, 429);

  const id = newRid();
  const now = new Date().toISOString();
  const r: ReportRequest = { id, rid: a.id, host: a.host, email, phone, t: now, score: overallScore(categoryScores(a)), status: "nou" };
  try {
    // deep: only when this browser already ran the deeper analysis (a demo, an earlier payment)
    await saveRequestParts(id, { base: body.base, speed: body.speed, shots: body.shots, google: body.google, analysis: body.analysis, ...(body.deep && typeof body.deep === "object" ? { deep: body.deep } : {}) });
    await saveRequest(r);
  } catch (e) {
    console.error("[request] save", id, e);
    return json({ error: "store" }, 500);
  }
  const { rate } = await eurRate();
  const m = requestEmails({ id, host: a.host, email, phone, score: r.score, eur: AUDIT_EUR, mdl: toMdl(AUDIT_EUR, rate), adminUrl: `${SITE}/admin#cereri` });
  await Promise.all([
    sendMail({ email }, m.visitor.subject, m.visitor.html, m.visitor.text).catch(() => false),
    sendMail({ email: adminEmail() }, m.studio.subject, m.studio.html, m.studio.text).catch(() => false),
  ]);
  const who = fromRequest(req);
  if (!who.me) await logEvent({ t: now, k: "request", host: a.host, rid: a.id, req: id, email, score: r.score, sid: who.sid, vid: who.vid, dev: who.dev, br: who.br, os: who.os, app: who.app, country: who.country, city: who.city });
  return json({ ok: true, id });
}
