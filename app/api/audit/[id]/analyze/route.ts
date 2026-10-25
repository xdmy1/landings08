import { analyse } from "../../../../_audit/ai";
import { loadAudit, savePart } from "../../../../_audit/store";
import { json } from "../../../../_audit/http";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 3: the AI reads the screenshots and the measurements and writes the findings */
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const a = await loadAudit(params.id);
  if (!a?.facts) return json({ error: "not_found" }, 404);
  if (a.analysis) return json({ ok: true });
  if (a.errors.some((e) => e.startsWith("analysis:"))) return json({ ok: false }); // failed once: don't spend again
  try {
    await savePart(a.id, "analysis", await analyse(a));
    return json({ ok: true });
  } catch (e) {
    console.error("[audit] analyse", a.id, e);
    await savePart(a.id, "analysis", { error: "analysis" });
    return json({ ok: false });
  }
}
