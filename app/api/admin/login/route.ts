import { NextResponse } from "next/server";
import { clientIp } from "../../../_audit/http";
import { COOKIE, allowLogin, passwordOk, token } from "../../../_track/admin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const back = (q: string) => NextResponse.redirect(new URL(`/admin${q}`, req.url), 303);
  if (!allowLogin(clientIp(req))) return back("?e=2");
  const f = await req.formData().catch(() => null);
  const p = String(f?.get("p") || "");
  if (!passwordOk(p)) return back("?e=1");
  const res = back("");
  const secure = new URL(req.url).protocol === "https:";
  res.cookies.set(COOKIE, token(), { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: 2592000 });
  // the studio's own visits stay out of the numbers
  res.cookies.set("lmd_me", "1", { sameSite: "lax", secure, path: "/", maxAge: 31536000 });
  return res;
}
