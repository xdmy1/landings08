/* No database: every step returns its result sealed (AES-256-GCM) and the
   visitor's browser keeps it. Only this server can open it, so the paid
   parts travel with the visitor but stay unreadable until they pay. */

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

function key(): Buffer {
  const secret = process.env.AUDIT_SECRET || process.env.ANTHROPIC_API_KEY || "dev-only-secret";
  return createHash("sha256").update(`landings-audit:${secret}`).digest();
}

export function seal(value: unknown): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([c.update(JSON.stringify(value), "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), body]).toString("base64url");
}

export function unseal<T>(token: unknown): T | null {
  if (typeof token !== "string" || token.length < 40 || token.length > 3_000_000) return null;
  try {
    const raw = Buffer.from(token, "base64url");
    const d = createDecipheriv("aes-256-gcm", key(), raw.subarray(0, 12));
    d.setAuthTag(raw.subarray(12, 28));
    return JSON.parse(Buffer.concat([d.update(raw.subarray(28)), d.final()]).toString("utf8")) as T;
  } catch {
    return null;
  }
}
