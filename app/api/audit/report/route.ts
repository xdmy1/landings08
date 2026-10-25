import { json } from "../../../_audit/http";
import { isPaid } from "../../../_audit/paid";
import { readAudit, readJson } from "../../../_audit/state";
import { buildView } from "../../../_audit/view";

export const dynamic = "force-dynamic";

/* the report as the page shows it: free view, or full view once a maib payment for this report checks out */
export async function POST(req: Request) {
  const body = await readJson(req);
  const a = body && readAudit(body);
  if (!a) return json({ error: "bad_request" }, 400);
  return json({ view: buildView(a, await isPaid(a.id, body.payId)) });
}
