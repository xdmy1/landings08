import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE, tokenOk } from "../../../_track/admin";
import { ban, unban } from "../../../_track/bans";

export const dynamic = "force-dynamic";

/* block or unblock one IP address, from the admin page */
export async function POST(req: Request) {
  const back = NextResponse.redirect(new URL("/admin#ban", req.url), 303);
  if (!tokenOk(cookies().get(COOKIE)?.value)) return back;
  const f = await req.formData().catch(() => null);
  const ip = String(f?.get("ip") || "").trim().slice(0, 45);
  const action = String(f?.get("action") || "ban");
  if (!/^[0-9a-f.:]+$/i.test(ip)) return back;
  if (action === "unban") await unban(ip);
  else await ban(ip, String(f?.get("note") || ""));
  return back;
}
