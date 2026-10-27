import { maibReady, payInfo } from "../_pay/maib";
import { COMPANY } from "../_pay/plans";
import { fmtDateTime, fmtMoney } from "../_pay/receipt";
import { AUDIT_EUR, reportIdOfOrder } from "./price";
import { eurRate, toMdl } from "../_pay/maib";
import { approvalOk } from "../_track/admin";

/* what the report page shows after paying, as maib asks of the page the client returns to */
export type Receipt = { orderId: string; merchant: string; site: string; service: string; amount: string; date: string; card: string };

const sample = (rid: string): Receipt => ({
  orderId: `RAP-${rid}-DEMO-RO`,
  merchant: COMPANY.legalName,
  site: "landings.md",
  service: "Raport complet de verificare",
  amount: fmtMoney(101, "MDL"),
  date: fmtDateTime(new Date(), "ro"),
  card: "4111 11** **** 1111",
});

/* a report is paid when maib confirms a successful payment whose order carries its id */
export async function paidReceipt(rid: string, payId: unknown): Promise<Receipt | null> {
  // local previews only (never in production): payId "free" shows the free report,
  // payId "demo" or AUDIT_DEMO_PAID=1 in .env.local shows the paid one
  if (process.env.NODE_ENV !== "production") {
    if (payId === "free") return null;
    if (payId === "demo" || process.env.AUDIT_DEMO_PAID === "1") return sample(rid);
  }
  if (typeof payId !== "string" || !payId) return null;
  // approved by the studio after a MIA transfer (see /admin)
  if (payId.startsWith("apr-")) {
    if (!approvalOk(payId, rid)) return null;
    const { rate } = await eurRate();
    return { orderId: `MIA-${rid.slice(0, 6).toUpperCase()}`, merchant: COMPANY.legalName, site: "landings.md", service: "Raport complet de verificare", amount: fmtMoney(toMdl(AUDIT_EUR, rate), "MDL"), date: fmtDateTime(new Date(), "ro"), card: "MIA, transfer la telefon" };
  }
  if (!maibReady()) return null;
  try {
    const info = await payInfo(payId);
    if (info?.status !== "OK" || reportIdOfOrder(info.orderId || "") !== rid) return null;
    return {
      orderId: info.orderId || "",
      merchant: COMPANY.legalName,
      site: "landings.md",
      service: info.items?.[0]?.name || info.description || "Raport complet de verificare",
      amount: fmtMoney(info.amount, info.currency),
      date: fmtDateTime(new Date(), "ro"),
      card: info.cardNumber || "",
    };
  } catch (e) {
    console.error("[audit] pay check", rid, e);
    return null;
  }
}

export async function isPaid(rid: string, payId: unknown): Promise<boolean> {
  return (await paidReceipt(rid, payId)) !== null;
}
