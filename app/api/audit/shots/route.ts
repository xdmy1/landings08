import { json } from "../../../_audit/http";
import { once } from "../../../_audit/limits";
import { screenshots } from "../../../_audit/shots";
import { readBase, readJson } from "../../../_audit/state";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 2c: sharp screenshots, desktop and phone (not secret, returned as they are) */
export async function POST(req: Request) {
  const base = readBase((await readJson(req))?.base);
  if (!base?.facts) return json({ error: "bad_request" }, 400);
  if (!(await once(base.id, "shots"))) return json({ error: "limit" }, 429);
  try {
    const shots = await screenshots(base.facts.finalUrl);
    return json({ ok: Boolean(shots.desktop || shots.mobile), shots });
  } catch (e) {
    console.error("[audit] shots", base.id, e);
    return json({ ok: false });
  }
}
