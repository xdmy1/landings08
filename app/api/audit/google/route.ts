import { googlePosition } from "../../../_audit/ai";
import { once } from "../../../_audit/limits";
import { json } from "../../../_audit/http";
import { seal } from "../../../_audit/seal";
import { readAudit, readJson } from "../../../_audit/state";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 2b: where the site shows up for what a local customer would search */
export async function POST(req: Request) {
  const body = await readJson(req);
  const a = body && readAudit({ base: body.base });
  if (!a) return json({ error: "bad_request" }, 400);
  if (!(await once(a.id, "google"))) return json({ error: "limit" }, 429);
  try {
    return json({ ok: true, google: seal(await googlePosition(a)) });
  } catch (e) {
    console.error("[audit] google", a.id, e);
    return json({ ok: false, google: seal({ error: "google" }) });
  }
}
