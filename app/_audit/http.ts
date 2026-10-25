/* small helpers shared by the audit API routes */

import { NextResponse } from "next/server";

export const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "";
  return fwd || "local";
}

/* a public-safe view of an audit, for the progress screen */
export function progressView(a: { id: string; host: string; facts?: unknown; mobile?: unknown; desktop?: unknown; analysis?: unknown; google?: unknown; errors: string[] }) {
  return {
    id: a.id,
    host: a.host,
    collected: Boolean(a.facts),
    speed: Boolean(a.mobile || a.desktop),
    analysed: Boolean(a.analysis),
    google: Boolean(a.google),
    errors: a.errors,
  };
}
