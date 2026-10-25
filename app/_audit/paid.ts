import { maibReady, payInfo } from "../_pay/maib";
import { reportIdOfOrder } from "./price";

/* a report is paid when maib confirms a successful payment whose order carries its id */
export async function isPaid(rid: string, payId: unknown): Promise<boolean> {
  // local previews only (never in production): payId "free" shows the free report,
  // payId "demo" or AUDIT_DEMO_PAID=1 in .env.local shows the paid one
  if (process.env.NODE_ENV !== "production") {
    if (payId === "free") return false;
    if (payId === "demo" || process.env.AUDIT_DEMO_PAID === "1") return true;
  }
  if (typeof payId !== "string" || !payId || !maibReady()) return false;
  try {
    const info = await payInfo(payId);
    return info?.status === "OK" && reportIdOfOrder(info.orderId || "") === rid;
  } catch (e) {
    console.error("[audit] pay check", rid, e);
    return false;
  }
}
