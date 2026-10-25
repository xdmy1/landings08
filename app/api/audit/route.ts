import { collectFacts, normaliseUrl, publicHost } from "../../_audit/collect";
import { aiReady } from "../../_audit/ai";
import { allowAudit, newAuditId, saveAudit, storeReady } from "../../_audit/store";
import { clientIp, json, progressView } from "../../_audit/http";
import type { Audit } from "../../_audit/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 1: read the page itself; returns the id the other steps use */
export async function POST(req: Request) {
  let body: { url?: unknown; keyword?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (!aiReady() || !storeReady()) return json({ error: "not_configured" }, 503);

  const u = normaliseUrl(typeof body.url === "string" ? body.url : "");
  if (!u || !(await publicHost(u.hostname))) return json({ error: "url" }, 400);
  const keyword = typeof body.keyword === "string" ? body.keyword.replace(/\s+/g, " ").trim().slice(0, 80) : "";

  const gate = await allowAudit(clientIp(req));
  if (gate !== "ok") return json({ error: gate === "ip" ? "limit_ip" : "limit_site" }, 429);

  const audit: Audit = { id: newAuditId(), createdAt: new Date().toISOString(), url: u.toString(), host: u.hostname, keyword, errors: [], paid: false };
  try {
    audit.facts = await collectFacts(u);
    audit.host = audit.facts.host;
  } catch (e) {
    console.error("[audit] collect", u.toString(), e);
    return json({ error: "unreachable" }, 422);
  }
  await saveAudit(audit);
  return json(progressView(audit));
}
