import { pageSpeed } from "../../../../_audit/collect";
import { loadAudit, savePart } from "../../../../_audit/store";
import { json } from "../../../../_audit/http";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* step 2a: Google PageSpeed for phone and desktop, in parallel */
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const a = await loadAudit(params.id);
  if (!a?.facts) return json({ error: "not_found" }, 404);
  if (a.mobile || a.desktop) return json({ ok: true });
  const [mobile, desktop] = await Promise.all([pageSpeed(a.facts.finalUrl, "mobile"), pageSpeed(a.facts.finalUrl, "desktop")]);
  if (!mobile && !desktop) {
    await savePart(a.id, "speed", { error: "pagespeed" });
    return json({ ok: false });
  }
  await savePart(a.id, "speed", { mobile, desktop });
  return json({ ok: true });
}
