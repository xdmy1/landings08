import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { maibReady } from "../../../_pay/maib";
import { chargeSub } from "../../../_pay/subflow";
import { listSubs, todayChisinau } from "../../../_pay/subs";
import { COOKIE, tokenOk } from "../../../_track/admin";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/* once a day (vercel.json): charges every subscription whose day has come, and
   retries the ones that failed. Vercel calls it with the CRON_SECRET; the studio
   can also run it from /admin. Local development may pass ?today=YYYY-MM-DD. */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const cron = Boolean(process.env.CRON_SECRET) && auth === `Bearer ${process.env.CRON_SECRET}`;
  if (!cron && !tokenOk(cookies().get(COOKIE)?.value)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!maibReady()) return NextResponse.json({ ok: true, skipped: "maib not configured" });

  const q = new URL(req.url).searchParams.get("today");
  const today = process.env.NODE_ENV !== "production" && q && /^\d{4}-\d{2}-\d{2}$/.test(q) ? q : todayChisinau();
  const due = (await listSubs()).filter((s) => (s.status === "active" || s.status === "past_due") && s.nextChargeAt && s.nextChargeAt <= today);
  const out: { id: string; ok: boolean; payId?: string; error?: string }[] = [];
  for (const s of due) {
    try {
      out.push({ id: s.id, ...(await chargeSub(s, today)) });
    } catch (e) {
      console.error("[subs] charge", s.id, e);
      out.push({ id: s.id, ok: false, error: String(e).slice(0, 200) });
    }
  }
  return NextResponse.json({ ok: true, today, charged: out });
}
