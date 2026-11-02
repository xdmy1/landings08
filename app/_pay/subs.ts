/* Monthly maintenance subscriptions: the first payment saves the card at maib
   (savecard-recurring), then a daily job charges it on the same day each month
   (execute-recurring) until the client cancels from the link in a receipt, or
   the studio stops it from /admin. No accounts: the cancel link is signed.
   Kept as small JSON files in the private Blob store (the site has no database);
   local development and Vercel previews use their own prefix, so test cards
   never land next to real ones. */

import { createHmac, timingSafeEqual } from "crypto";
import { get, list, put } from "@vercel/blob";
import type { PayLang, PlanId } from "./plans";

export type SubStatus = "pending" | "active" | "past_due" | "cancelled" | "stopped";
export type Charge = { orderId: string; payId: string; amount: number; at: string; ok: boolean; note?: string };
export type Sub = {
  id: string; // the order id of the first payment (LMD-…)
  plan: PlanId;
  lang: PayLang;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: SubStatus;
  createdAt: string;
  billerId?: string;
  billerExpiry?: string;
  card?: string;
  startedAt?: string; // YYYY-MM-DD, Chișinău
  anchorDay?: number; // the day of the month it renews on
  nextChargeAt?: string; // YYYY-MM-DD, Chișinău
  lastChargeAt?: string;
  failures: number;
  lastError?: string;
  charges: Charge[];
  cancelledAt?: string;
  cancelledBy?: "client" | "studio" | "system";
};

const PREFIX = process.env.VERCEL_ENV === "production" ? "subs/" : process.env.VERCEL_ENV === "preview" ? "preview/subs/" : "dev/subs/";
const OPT = { access: "private" as const, contentType: "application/json", addRandomSuffix: false, allowOverwrite: true };

export const subsReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

async function readJson<T>(pathname: string): Promise<T | null> {
  try {
    const r = await get(pathname, { access: "private", useCache: false });
    if (!r) return null;
    return JSON.parse(await new Response(r.stream).text()) as T;
  } catch {
    return null;
  }
}

const safeId = (id: string) => /^[A-Z0-9-]{8,36}$/.test(id);

export async function loadSub(id: string): Promise<Sub | null> {
  return safeId(id) ? readJson<Sub>(`${PREFIX}${id}.json`) : null;
}

export async function saveSub(s: Sub): Promise<void> {
  await put(`${PREFIX}${s.id}.json`, JSON.stringify(s), OPT);
}

export async function listSubs(): Promise<Sub[]> {
  if (!subsReady()) return [];
  const paths: string[] = [];
  let cursor: string | undefined;
  do {
    const r = await list({ prefix: PREFIX, limit: 1000, cursor });
    paths.push(...r.blobs.map((b) => b.pathname).filter((p) => p.endsWith(".json") && !p.includes("/orders/")));
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  const subs = (await Promise.all(paths.map((p) => readJson<Sub>(p)))).filter((s): s is Sub => Boolean(s));
  return subs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/* a monthly charge's order id points back to its subscription, so a late maib
   callback for it is recognised (the charge itself is handled when it is made) */
export async function markChargeOrder(orderId: string, subId: string): Promise<void> {
  await put(`${PREFIX}orders/${orderId}.json`, JSON.stringify({ subId }), OPT);
}
export async function isChargeOrder(orderId: string): Promise<boolean> {
  return safeId(orderId) && Boolean(await readJson<{ subId: string }>(`${PREFIX}orders/${orderId}.json`));
}

/* ---- dates, by Chișinău time ---- */

export function todayChisinau(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Chisinau", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

/* the same day next month; the 31st becomes the last day of a shorter month */
export function addMonth(ymd: string, anchorDay: number): string {
  const [y, m] = ymd.split("-").map(Number);
  const ny = m === 12 ? y + 1 : y;
  const nm = m === 12 ? 1 : m + 1;
  const last = new Date(Date.UTC(ny, nm, 0)).getUTCDate();
  return `${ny}-${String(nm).padStart(2, "0")}-${String(Math.min(anchorDay, last)).padStart(2, "0")}`;
}

export function fmtDay(ymd: string, lang: PayLang): string {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Intl.DateTimeFormat({ ro: "ro-RO", ru: "ru-RU", en: "en-GB" }[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}

/* card kept at maib for up to five years (the card's own expiry wins when sooner) */
export function billerExpiry(d = new Date()): string {
  return `${String(d.getUTCMonth() + 1).padStart(2, "0")}${String((d.getUTCFullYear() + 5) % 100).padStart(2, "0")}`;
}

/* ---- the signed cancel link ---- */

const secret = () => process.env.AUDIT_SECRET || process.env.ANTHROPIC_API_KEY || "dev-only-secret";
export function cancelKey(id: string): string {
  return createHmac("sha256", `sub-cancel|${secret()}`).update(id).digest("hex").slice(0, 32);
}
export function cancelKeyOk(id: string, k: string | null | undefined): boolean {
  if (!k) return false;
  const a = Buffer.from(k);
  const b = Buffer.from(cancelKey(id));
  return a.length === b.length && timingSafeEqual(a, b);
}
export function cancelUrl(site: string, id: string): string {
  return `${site}/abonament/anulare?id=${encodeURIComponent(id)}&k=${cancelKey(id)}`;
}
