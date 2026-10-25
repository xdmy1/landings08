import { NextResponse } from "next/server";
import { adminEmail, langOfOrder, payInfo, sendMail, signatureOk } from "../../../_pay/maib";
import { fmtDateTime, fmtMoney, receiptEmail, studioEmail } from "../../../_pay/receipt";

export const dynamic = "force-dynamic";

/* maib posts the final transaction result here: { result: {...}, signature }.
   Answering 200 stops its retries, so we answer 200 for every authentic call. */
export async function POST(req: Request) {
  let data: { result?: Record<string, unknown>; signature?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const result = data.result;
  if (!result || typeof data.signature !== "string" || !signatureOk(result, data.signature)) {
    console.warn("[pay] callback with a bad signature");
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payId = String(result.payId || "");
  const orderId = String(result.orderId || "");
  const status = String(result.status || "");
  console.log("[pay] callback", orderId, payId, status, result.statusCode);

  if (status !== "OK") return NextResponse.json({ ok: true });

  try {
    const info = await payInfo(payId);
    const lang = langOfOrder(orderId);
    const item = info?.items?.[0];
    const when = fmtDateTime(new Date(), lang);
    const amount = fmtMoney(info?.amount ?? Number(result.amount), info?.currency || String(result.currency || "MDL"));
    const service = item?.name || info?.description || "";
    const name = info?.clientName || "";

    if (info?.email) {
      const m = receiptEmail(lang, {
        orderId,
        name,
        service,
        qty: item?.quantity || 1,
        amount,
        date: when,
        card: info.cardNumber || String(result.cardNumber || ""),
      }, orderId.startsWith("RAP-") ? "report" : "plan");
      await sendMail({ email: info.email, name }, m.subject, m.html, m.text);
    }

    const st = studioEmail({ orderId, service, amount, date: fmtDateTime(new Date(), "ro"), name, email: info?.email || "", phone: info?.phone || "", payId });
    await sendMail({ email: adminEmail() }, st.subject, st.html, st.text);
  } catch (e) {
    console.error("[pay] callback follow-up", e);
  }

  return NextResponse.json({ ok: true });
}
