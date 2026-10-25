import { maibReady, payInfo } from "../../../_pay/maib";
import { json } from "../../../_audit/http";
import { reportIdOfOrder } from "../../../_audit/price";
import { readAudit, readJson } from "../../../_audit/state";
import { buildView } from "../../../_audit/view";

export const dynamic = "force-dynamic";

/* the report as the page shows it: free view, or full view once a maib payment for this report checks out */
export async function POST(req: Request) {
  const body = await readJson(req);
  const a = body && readAudit(body);
  if (!a) return json({ error: "bad_request" }, 400);
  let paid = false;
  const payId = typeof body.payId === "string" ? body.payId : "";
  if (payId && maibReady()) {
    try {
      const info = await payInfo(payId);
      paid = info?.status === "OK" && reportIdOfOrder(info.orderId || "") === a.id;
    } catch (e) {
      console.error("[audit] pay check", a.id, e);
    }
  }
  return json({ view: buildView(a, paid) });
}
