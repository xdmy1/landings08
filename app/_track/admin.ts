/* the admin page's lock (one password, one signed cookie) and the signed
   tokens that open an approved report without a card payment */

import { createHmac, timingSafeEqual } from "crypto";

export const COOKIE = "lmd_admin";

const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const secret = () => `${process.env.AUDIT_SECRET || ""}|${process.env.ADMIN_PASSWORD || ""}`;
const sign = (what: string) => createHmac("sha256", secret()).update(what).digest("hex");

export function token(): string {
  return sign("admin-v1");
}
export function passwordOk(p: string): boolean {
  const want = process.env.ADMIN_PASSWORD || "";
  return Boolean(want) && same(p, want);
}
export function tokenOk(v: string | undefined): boolean {
  return Boolean(v && process.env.ADMIN_PASSWORD) && same(v as string, token());
}

/* a report approved by hand opens with payId "apr-<rid>-<signature>" */
export function approvalPayId(rid: string): string {
  return `apr-${rid}-${sign(`apr:${rid}`).slice(0, 24)}`;
}
export function approvalOk(payId: string, rid: string): boolean {
  return payId.startsWith("apr-") && same(payId, approvalPayId(rid));
}

/* the link in the email that opens a request's report: /r/<id>?k=<key> */
export function linkKey(id: string): string {
  return sign(`link:${id}`).slice(0, 24);
}
export function linkOk(id: string, k: string | null): boolean {
  return Boolean(k) && same(k as string, linkKey(id));
}

/* a few tries per visitor, then a pause */
const tries = new Map<string, { n: number; at: number }>();
export function allowLogin(ip: string): boolean {
  const now = Date.now();
  const t = tries.get(ip);
  if (t && now - t.at < 600000 && t.n >= 8) return false;
  tries.set(ip, { n: t && now - t.at < 600000 ? t.n + 1 : 1, at: now });
  return true;
}
