import { NextResponse } from "next/server";
import { adminEmail, langOfOrder, payInfo, sendMail, signatureOk } from "../../../_pay/maib";
import { fmtDateTime, fmtMoney, receiptEmail } from "../../../_pay/receipt";

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

    const adminText = [
      `Plată nouă pe landings.md`,
      ``,
      `Comanda: ${orderId}`,
      `Pachet: ${service}`,
      `Suma: ${amount}`,
      `Data: ${fmtDateTime(new Date(), "ro")}`,
      `Client: ${name}`,
      `Email: ${info?.email || ""}`,
      `Telefon: ${info?.phone || ""}`,
      `maib payId: ${payId}`,
    ].join("\n");
    await sendMail(
      { email: adminEmail() },
      `Plată nouă ${orderId}: ${service}, ${amount}`,
      `<pre style="font:14px/1.6 -apple-system,Segoe UI,Arial,sans-serif">${adminText.replace(/</g, "&lt;")}</pre>`,
      adminText
    );
  } catch (e) {
    console.error("[pay] callback follow-up", e);
  }

  return NextResponse.json({ ok: true });
}
