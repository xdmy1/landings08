import { googlePosition } from "../../../../_audit/ai";
import { loadAudit, savePart } from "../../../../_audit/store";
import { json } from "../../../../_audit/http";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 2b: where the site shows up for what a local customer would search */
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const a = await loadAudit(params.id);
  if (!a?.facts) return json({ error: "not_found" }, 404);
  if (a.google) return json({ ok: true });
  if (a.errors.some((e) => e.startsWith("google:"))) return json({ ok: false }); // failed once: don't spend again
  try {
    await savePart(a.id, "google", await googlePosition(a));
    return json({ ok: true });
  } catch (e) {
    console.error("[audit] google", a.id, e);
    await savePart(a.id, "google", { error: "google" });
    return json({ ok: false });
  }
}
