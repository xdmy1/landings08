import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cancelSub } from "../../../../../_pay/subflow";
import { loadSub } from "../../../../../_pay/subs";
import { COOKIE, tokenOk } from "../../../../../_track/admin";

export const dynamic = "force-dynamic";

/* the studio stops a subscription from /admin (the client asked on Telegram, a test, …) */
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const back = NextResponse.redirect(new URL("/admin#abonamente", req.url), 303);
  if (!tokenOk(cookies().get(COOKIE)?.value)) return back;
  const s = await loadSub(params.id);
  if (s) await cancelSub(s, "studio");
  return back;
}
