import { NextResponse } from "next/server";
import { cancelSub } from "../../../_pay/subflow";
import { cancelKeyOk, loadSub } from "../../../_pay/subs";

export const dynamic = "force-dynamic";

/* the button on the cancel page (a POST, so a mail scanner opening the link cancels nothing) */
export async function POST(req: Request) {
  const f = await req.formData().catch(() => null);
  const id = String(f?.get("id") || "");
  const k = String(f?.get("k") || "");
  const back = (q: string) => NextResponse.redirect(new URL(`/abonament/anulare?id=${encodeURIComponent(id)}&k=${encodeURIComponent(k)}${q}`, req.url), 303);
  if (!cancelKeyOk(id, k)) return back("");
  const s = await loadSub(id);
  if (!s) return back("");
  await cancelSub(s, "client");
  return back("&done=1");
}
