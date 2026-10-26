import { json } from "../../../_audit/http";
import { paidReceipt } from "../../../_audit/paid";
import { readAudit, readJson } from "../../../_audit/state";
import { buildView } from "../../../_audit/view";

export const dynamic = "force-dynamic";

/* the report as the page shows it: free view, or full view once a maib payment for this report checks out */
export async function POST(req: Request) {
  const body = await readJson(req);
  const a = body && readAudit(body);
  if (!a) return json({ error: "bad_request" }, 400);
  const receipt = await paidReceipt(a.id, body.payId);
  return json({ view: buildView(a, receipt !== null, receipt) });
}
