/* The visitor's browser carries the sealed parts of an audit between requests. */

import { unseal } from "./seal";
import { cleanShots } from "./shots";
import type { Analysis, Audit, Deep, GooglePos, Vitals } from "./types";

export type Base = Pick<Audit, "id" | "createdAt" | "url" | "host" | "keyword" | "facts">;
type Speed = { mobile?: Vitals | null; desktop?: Vitals | null; error?: string };
type Err = { error: string };

export function readBase(token: unknown): Base | null {
  const b = unseal<Base>(token);
  return b?.id && b.facts ? b : null;
}

/* the paid parts; each carries the report id, so parts of another report don't mix in */
function readDeep(v: unknown, id: string): Deep | undefined {
  if (!v || typeof v !== "object") return undefined;
  const o = v as Record<string, unknown>;
  const get = <T>(k: string) => {
    const p = unseal<{ id: string; value?: T }>(o[k]);
    return p && p.id === id ? p.value : undefined;
  };
  const cp = get<{ copy: Deep["copy"]; plan: Deep["plan"] }>("copy");
  const deep: Deep = {
    competitors: get("competitors"),
    brand: get("brand"),
    ai: get("ai"),
    copy: cp?.copy,
    plan: cp?.plan,
    pages: get("pages"),
    marks: get("marks"),
  };
  return Object.values(deep).some(Boolean) ? deep : undefined;
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
    deep: readDeep(body.deep, base.id),
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
