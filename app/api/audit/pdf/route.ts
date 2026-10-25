import { json } from "../../../_audit/http";
import { isPaid } from "../../../_audit/paid";
import { reportNumber, reportPdf } from "../../../_audit/pdf";
import { readAudit, readJson } from "../../../_audit/state";
import { buildView } from "../../../_audit/view";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* the full report as a PDF, only for a paid report */
export async function POST(req: Request) {
  const body = await readJson(req);
  const a = body && readAudit(body);
  if (!a) return json({ error: "bad_request" }, 400);
  if (!(await isPaid(a.id, body.payId))) return json({ error: "not_paid" }, 402);
  try {
    const pdf = await reportPdf(buildView(a, true), new URL(req.url).origin);
    const name = `raport-${a.host.replace(/^www\./, "").replace(/[^a-z0-9.-]/gi, "")}-${reportNumber(a.id)}.pdf`;
    return new Response(new Uint8Array(pdf), { headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${name}"`, "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[audit] pdf", a.id, e);
    return json({ error: "pdf" }, 500);
  }
}
