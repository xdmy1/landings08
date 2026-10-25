/* The visitor's browser carries the sealed parts of an audit between requests. */

import { unseal } from "./seal";
import { cleanShots } from "./shots";
import type { Analysis, Audit, GooglePos, Vitals } from "./types";

export type Base = Pick<Audit, "id" | "createdAt" | "url" | "host" | "keyword" | "facts">;
type Speed = { mobile?: Vitals | null; desktop?: Vitals | null; error?: string };
type Err = { error: string };

export function readBase(token: unknown): Base | null {
  const b = unseal<Base>(token);
  return b?.id && b.facts ? b : null;
}

export function readAudit(body: Record<string, unknown>): Audit | null {
  const base = readBase(body.base);
  if (!base) return null;
  const speed = unseal<Speed>(body.speed);
  const google = unseal<GooglePos | Err>(body.google);
  const analysis = unseal<Analysis | Err>(body.analysis);
  const errors: string[] = [];
  if (speed?.error) errors.push("speed");
  if (google && "error" in google) errors.push("google");
  if (analysis && "error" in analysis) errors.push("analysis");
  return {
    ...base,
    errors,
    paid: false,
    shots: cleanShots(body.shots),
    mobile: speed?.mobile || undefined,
    desktop: speed?.desktop || undefined,
    google: google && !("error" in google) ? google : undefined,
    analysis: analysis && !("error" in analysis) ? analysis : undefined,
  };
}

export async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const j = await req.json();
    return j && typeof j === "object" ? (j as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
