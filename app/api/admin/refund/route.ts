import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { maibReady, payInfo, refund } from "../../../_pay/maib";
import { COOKIE, tokenOk } from "../../../_track/admin";

export const dynamic = "force-dynamic";

/* money back for one payment, from the admin page: the Pay ID comes from the studio's order email */
export async function POST(req: Request) {
  const back = (q: Record<string, string>) => NextResponse.redirect(new URL(`/admin?${new URLSearchParams(q)}#rambursare`, req.url), 303);
  if (!tokenOk(cookies().get(COOKIE)?.value)) return back({});
  if (!maibReady()) return back({ rf: "err", rm: "maib nu e configurat" });
  const f = await req.formData().catch(() => null);
  const payId = String(f?.get("payId") || "").trim().toLowerCase();
  const raw = String(f?.get("amount") || "").trim().replace(",", ".");
  const amount = raw ? Math.round(parseFloat(raw) * 100) / 100 : undefined;
  if (!/^[0-9a-f-]{36}$/.test(payId)) return back({ rf: "err", rm: "Pay ID nu arată bine" });
  if (amount !== undefined && !(amount > 0)) return back({ rf: "err", rm: "suma nu e bună" });
  try {
    const info = await payInfo(payId);
    if (!info) return back({ rf: "err", rm: "maib nu cunoaște plata asta" });
    if (amount && info.amount && amount > info.amount) return back({ rf: "err", rm: `suma e mai mare decât plata (${info.amount} ${info.currency || "MDL"})` });
    const r = await refund(payId, amount);
    console.log("[pay] refund", info.orderId, payId, r.result?.status, r.result?.refundAmount ?? amount ?? info.amount, r.error || "");
    if (r.result?.status === "REVERSED") return back({ rf: "err", rm: "plata a fost deja rambursată" });
    if (!r.ok) return back({ rf: "err", rm: r.error || "maib a refuzat" });
    return back({ rf: "ok", ro: info.orderId || "", rs: String(r.result?.refundAmount ?? amount ?? info.amount ?? ""), rc: info.currency || "MDL" });
  } catch (e) {
    console.log("[pay] refund failed", payId, (e as Error).message);
    return back({ rf: "err", rm: "maib nu răspunde, încearcă din nou" });
  }
}
