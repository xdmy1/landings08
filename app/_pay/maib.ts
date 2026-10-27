/* Server-side helpers for maib e-commerce (docs.maibmerchants.md/e-commerce),
   the BNM exchange rate and the confirmation email (Brevo).

   Environment (set in Vercel → Settings → Environment Variables):
     MAIB_PROJECT_ID, MAIB_PROJECT_SECRET, MAIB_SIGNATURE_KEY   from maibmerchants (Test or Production project)
     BREVO_API_KEY                                               transactional email key from Brevo
     MAIL_FROM     sender address on landings.md (default contact@landings.md)
     MAIL_ADMIN    where a copy of every paid order goes (default contact@landings.md)
*/

import { createHash, timingSafeEqual } from "crypto";
import { COMPANY } from "./plans";

const API = "https://api.maibmerchants.md/v1";

export function maibReady(): boolean {
  return Boolean(process.env.MAIB_PROJECT_ID && process.env.MAIB_PROJECT_SECRET && process.env.MAIB_SIGNATURE_KEY);
}

/* ---------- BNM official rate ---------- */

export type Rate = { rate: number; date: string };

function bnmDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getUTCDate())}.${p(d.getUTCMonth() + 1)}.${d.getUTCFullYear()}`;
}

export async function eurRate(): Promise<Rate> {
  const date = bnmDate(new Date());
  try {
    const r = await fetch(`https://www.bnm.md/en/official_exchange_rates?get_xml=1&date=${date}`, {
      next: { revalidate: 3600 },
    });
    const xml = await r.text();
    const block = xml.match(/<CharCode>EUR<\/CharCode>[\s\S]*?<Value>([\d.]+)<\/Value>/);
    const day = xml.match(/<ValCurs Date="([\d.]+)"/);
    const rate = block ? parseFloat(block[1]) : NaN;
    if (rate > 5 && rate < 100) return { rate, date: day ? day[1] : date };
  } catch {
    /* fall through to the fallback rate */
  }
  const fb = parseFloat(process.env.EUR_MDL_FALLBACK || "20.2");
  return { rate: fb, date };
}

/* whole lei, so the amount on the card statement is a clean number */
export function toMdl(eur: number, rate: number): number {
  return Math.round(eur * rate);
}

/* ---------- maib API ---------- */

type MaibErr = { errorCode: string; errorMessage: string };
type MaibRes<T> = { ok: boolean; result?: T; errors?: MaibErr[] };

async function token(): Promise<string> {
  const r = await fetch(`${API}/generate-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId: process.env.MAIB_PROJECT_ID, projectSecret: process.env.MAIB_PROJECT_SECRET }),
    cache: "no-store",
  });
  const j = (await r.json()) as MaibRes<{ accessToken: string }>;
  if (!j.ok || !j.result) throw new Error(`maib token: ${j.errors?.[0]?.errorMessage || r.status}`);
  return j.result.accessToken;
}

export type PayRequest = {
  amount: number;
  currency: "MDL";
  clientIp: string;
  language: "ro" | "ru" | "en";
  description: string;
  clientName?: string;
  email?: string;
  phone?: string;
  orderId: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  callbackUrl: string;
  okUrl: string;
  failUrl: string;
};

export async function createPay(body: PayRequest): Promise<{ payId: string; payUrl: string }> {
  const t = await token();
  const r = await fetch(`${API}/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const j = (await r.json()) as MaibRes<{ payId: string; payUrl: string }>;
  if (!j.ok || !j.result) throw new Error(`maib pay: ${j.errors?.[0]?.errorMessage || r.status}`);
  return j.result;
}

export type PayInfo = {
  payId: string;
  orderId?: string;
  status?: string;
  statusCode?: string;
  statusMessage?: string;
  cardNumber?: string;
  amount?: number;
  currency?: string;
  description?: string;
  clientName?: string;
  email?: string;
  phone?: string;
  items?: { id: string; name: string; price: number; quantity: number }[];
};

export async function payInfo(payId: string): Promise<PayInfo | null> {
  if (!/^[0-9a-f-]{36}$/i.test(payId)) return null;
  const t = await token();
  const r = await fetch(`${API}/pay-info/${payId}`, {
    headers: { Authorization: `Bearer ${t}` },
    cache: "no-store",
  });
  const j = (await r.json()) as MaibRes<PayInfo>;
  return j.ok && j.result ? j.result : null;
}

/* callback signature: values of `result` sorted by key, joined with ":",
   signature key appended, SHA-256 (raw bytes), Base64 */
export function signatureOk(result: Record<string, unknown>, signature: string): boolean {
  const key = process.env.MAIB_SIGNATURE_KEY;
  if (!key || !signature) return false;
  const keys = Object.keys(result).sort();
  const parts = keys.map((k) => {
    const v = result[k];
    return v === null || v === undefined ? "" : String(v);
  });
  parts.push(key);
  const expected = createHash("sha256").update(parts.join(":"), "utf8").digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

/* ---------- order ids ---------- */

export function newOrderId(lang: string): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  const day = `${String(d.getUTCFullYear()).slice(2)}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}`;
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let rnd = "";
  for (let i = 0; i < 5; i++) rnd += abc[Math.floor(Math.random() * abc.length)];
  return `LMD-${day}-${rnd}-${lang.toUpperCase()}`;
}

/* the language travels inside the order id, so the callback can answer in it */
export function langOfOrder(orderId: string | undefined): "ro" | "ru" | "en" {
  const tail = (orderId || "").split("-").pop()?.toLowerCase();
  return tail === "ru" || tail === "en" ? tail : "ro";
}

/* ---------- email (Brevo transactional API) ---------- */

export async function sendMail(to: { email: string; name?: string }, subject: string, html: string, text: string, attachments?: { name: string; content: string }[]) {
  const key = process.env.BREVO_API_KEY;
  if (!key) {
    console.warn("[pay] BREVO_API_KEY missing, email not sent:", subject);
    return false;
  }
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": key, accept: "application/json" },
    body: JSON.stringify({
      sender: { name: COMPANY.brand, email: process.env.MAIL_FROM || COMPANY.email },
      replyTo: { email: COMPANY.email, name: COMPANY.brand },
      to: [to],
      subject,
      htmlContent: html,
      textContent: text,
      ...(attachments?.length ? { attachment: attachments } : {}),
    }),
    cache: "no-store",
  });
  if (!r.ok) console.error("[pay] brevo", r.status, await r.text());
  return r.ok;
}

export function adminEmail(): string {
  return process.env.MAIL_ADMIN || COMPANY.email;
}
