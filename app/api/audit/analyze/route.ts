import { analyse } from "../../../_audit/ai";
import { allow } from "../../../_audit/limits";
import { clientIp, json } from "../../../_audit/http";
import { seal } from "../../../_audit/seal";
import { readAudit, readJson } from "../../../_audit/state";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 3: reads the screenshots and the measurements and writes the findings */
export async function POST(req: Request) {
  const body = await readJson(req);
  const a = body && readAudit({ base: body.base, speed: body.speed, shots: body.shots });
  if (!a) return json({ error: "bad_request" }, 400);
  if (allow("ai", clientIp(req)) !== "ok") return json({ error: "limit" }, 429);
  try {
    return json({ ok: true, analysis: seal(await analyse(a)) });
  } catch (e) {
    console.error("[audit] analyse", a.id, e);
    return json({ ok: false, analysis: seal({ error: "analysis" }) });
  }
}
