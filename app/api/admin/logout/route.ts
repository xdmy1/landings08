import { NextResponse } from "next/server";
import { COOKIE } from "../../../_track/admin";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
