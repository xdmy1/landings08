import { NextResponse } from "next/server";
import { COMPANY, PLANS, isPayLang, isPlanId, planTitle } from "../../_pay/plans";
import { createPay, eurRate, maibReady, newOrderId, toMdl } from "../../_pay/maib";

export const dynamic = "force-dynamic";

const SITE = process.env.SITE_URL || "https://www.landings.md";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { plan: planId, lang } = body;
  const name = clean(body.name, 80);
  const company = clean(body.company, 60);
  const email = clean(body.email, 40).toLowerCase();
  const phone = clean(body.phone, 40);

  if (!isPlanId(planId) || !isPayLang(lang)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  if (body.accept !== true) return NextResponse.json({ error: "terms" }, { status: 400 });
  if (name.length < 2) return NextResponse.json({ error: "name" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: "email" }, { status: 400 });
  if (phone.replace(/\D/g, "").length < 6) return NextResponse.json({ error: "phone" }, { status: 400 });

  if (!maibReady()) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const plan = PLANS[planId];
  const { rate } = await eurRate();
  const amount = toMdl(plan.eur, rate);
  const title = planTitle(plan, lang);
  const orderId = newOrderId(lang);

  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "";
  const clientIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(fwd) ? fwd : "127.0.0.1";

  try {
    const { payUrl } = await createPay({
      amount,
      currency: "MDL",
      clientIp,
      language: lang,
      description: `${COMPANY.brand}: ${title}`.slice(0, 124),
      clientName: (company ? `${name}, ${company}` : name).slice(0, 128),
      email,
      phone,
      orderId,
      items: [{ id: plan.id, name: title.slice(0, 128), price: amount, quantity: 1 }],
      callbackUrl: `${SITE}/api/plata/callback`,
      okUrl: `${SITE}/plata/rezultat`,
      failUrl: `${SITE}/plata/rezultat`,
    });
    return NextResponse.json({ payUrl });
  } catch (e) {
    console.error("[pay] create", e);
    return NextResponse.json({ error: "maib" }, { status: 502 });
  }
}
