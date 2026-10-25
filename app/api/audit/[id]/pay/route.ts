import { COMPANY } from "../../../../_pay/plans";
import { createPay, eurRate, maibReady, toMdl } from "../../../../_pay/maib";
import { loadAudit } from "../../../../_audit/store";
import { clientIp, json } from "../../../../_audit/http";
import { AUDIT_EUR } from "../../../../_audit/price";

export const dynamic = "force-dynamic";

const SITE = process.env.SITE_URL || "https://www.landings.md";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

/* unlock the full report: one card payment through maib */
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const a = await loadAudit(params.id);
  if (!a) return json({ error: "not_found" }, 404);
  if (a.paid) return json({ error: "paid" }, 409);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  const name = clean(body.name, 80);
  const email = clean(body.email, 40).toLowerCase();
  const phone = clean(body.phone, 40);
  if (body.accept !== true) return json({ error: "terms" }, 400);
  if (name.length < 2) return json({ error: "name" }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ error: "email" }, 400);
  if (phone.replace(/\D/g, "").length < 6) return json({ error: "phone" }, 400);
  if (!maibReady()) return json({ error: "not_configured" }, 503);

  const { rate } = await eurRate();
  const amount = toMdl(AUDIT_EUR, rate);
  const rnd = Math.random().toString(36).slice(2, 5).toUpperCase();
  const orderId = `RAP-${a.id}-${rnd}-RO`; // the callback finds the report by the id inside
  const ip = clientIp(req);
  const title = `Raport complet de verificare pentru ${a.host}`.slice(0, 128);

  try {
    const { payUrl } = await createPay({
      amount,
      currency: "MDL",
      clientIp: /^\d{1,3}(\.\d{1,3}){3}$/.test(ip) ? ip : "127.0.0.1",
      language: "ro",
      description: `${COMPANY.brand}: ${title}`.slice(0, 124),
      clientName: name,
      email,
      phone,
      orderId,
      items: [{ id: "raport", name: title, price: amount, quantity: 1 }],
      callbackUrl: `${SITE}/api/plata/callback`,
      okUrl: `${SITE}/verificare/${a.id}`,
      failUrl: `${SITE}/verificare/${a.id}`,
    });
    return json({ payUrl });
  } catch (e) {
    console.error("[audit] pay", a.id, e);
    return json({ error: "maib" }, 502);
  }
}
