import { pageSpeed } from "../../../_audit/collect";
import { json } from "../../../_audit/http";
import { once } from "../../../_audit/limits";
import { seal } from "../../../_audit/seal";
import { readBase, readJson } from "../../../_audit/state";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 2a: Google PageSpeed for phone and desktop, in parallel */
export async function POST(req: Request) {
  const base = readBase((await readJson(req))?.base);
  if (!base?.facts) return json({ error: "bad_request" }, 400);
  if (!(await once(base.id, "speed"))) return json({ error: "limit" }, 429);
  const [mobile, desktop] = await Promise.all([pageSpeed(base.facts.finalUrl, "mobile"), pageSpeed(base.facts.finalUrl, "desktop")]);
  if (!mobile && !desktop) return json({ ok: false, speed: seal({ error: "pagespeed" }) });
  return json({ ok: true, speed: seal({ mobile, desktop }) });
}
