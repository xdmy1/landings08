import { COMPANY } from "../../../_pay/plans";
import { createPay, eurRate, maibReady, toMdl } from "../../../_pay/maib";
import { clientIp, json } from "../../../_audit/http";
import { AUDIT_EUR } from "../../../_audit/price";
import { readBase, readJson } from "../../../_audit/state";

export const dynamic = "force-dynamic";

const SITE = process.env.SITE_URL || "https://www.landings.md";

/* unlock the full report: one card payment through maib, only an email asked */
export async function POST(req: Request) {
  const body = await readJson(req);
  const base = readBase(body?.base);
  if (!body || !base) return json({ error: "bad_request" }, 400);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 40) : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ error: "email" }, 400);
  if (!maibReady()) return json({ error: "not_configured" }, 503);

  const { rate } = await eurRate();
  const amount = toMdl(AUDIT_EUR, rate);
  const rnd = Math.random().toString(36).slice(2, 5).toUpperCase();
  const ip = clientIp(req);
  const title = `Raport complet de verificare pentru ${base.host}`.slice(0, 128);
  try {
    const { payUrl } = await createPay({
      amount,
      currency: "MDL",
      clientIp: /^\d{1,3}(\.\d{1,3}){3}$/.test(ip) ? ip : "127.0.0.1",
      language: "ro",
      description: `${COMPANY.brand}: ${title}`.slice(0, 124),
      email,
      orderId: `RAP-${base.id}-${rnd}-RO`, // the report id inside proves which report was paid
      items: [{ id: "raport", name: title, price: amount, quantity: 1 }],
      callbackUrl: `${SITE}/api/plata/callback`,
      okUrl: `${SITE}/verificare/raport/${base.id}`,
      failUrl: `${SITE}/verificare/raport/${base.id}`,
    });
    return json({ payUrl });
  } catch (e) {
    console.error("[audit] pay", base.id, e);
    return json({ error: "maib" }, 502);
  }
}
