import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { aiDeep, brandDeep, competitorsDeep, copyAndPlanDeep, marksDeep, pagesDeep } from "../../../../../_audit/deep";
import { reportEmail } from "../../../../../_audit/mail";
import { paidReceipt } from "../../../../../_audit/paid";
import { reportPdf } from "../../../../../_audit/pdf";
import { seal } from "../../../../../_audit/seal";
import { readAudit } from "../../../../../_audit/state";
import type { Audit, DeepStep } from "../../../../../_audit/types";
import { buildView } from "../../../../../_audit/view";
import { sendMail } from "../../../../../_pay/maib";
import { COOKIE, approvalPayId, linkKey, tokenOk } from "../../../../../_track/admin";
import { loadRequest, loadRequestParts, logEvent, saveRequest, saveRequestParts } from "../../../../../_track/store";

export const dynamic = "force-dynamic";
export const maxDuration = 180;

const SITE = process.env.SITE_URL || "https://www.landings.md";
const RUN: Record<DeepStep, (a: Audit) => Promise<unknown>> = { competitors: competitorsDeep, brand: brandDeep, ai: aiDeep, copy: copyAndPlanDeep, pages: pagesDeep, marks: marksDeep };

/* the studio saw the MIA payment: run the deeper analysis, make the PDF, email it, open the link */
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const back = (q: string) => NextResponse.redirect(new URL(`/admin${q}#cereri`, req.url), 303);
  if (!tokenOk(cookies().get(COOKIE)?.value)) return back("");
  const id = params.id;
  try {
    return await approve(req, id, back);
  } catch (e) {
    console.error("[approve]", id, e);
    return back("?err=server");
  }
}

async function approve(req: Request, id: string, back: (q: string) => NextResponse) {
  const r = await loadRequest(id);
  const parts = await loadRequestParts(id);
  if (!r || !parts) return back("?err=lipsa");
  const a = readAudit(parts);
  if (!a) return back("?err=date");

  const deep = ((parts.deep as Record<string, string>) || {}) as Record<string, string>;
  const missing = (Object.keys(RUN) as DeepStep[]).filter((k) => !deep[k]);
  if (missing.length) {
    const results = await Promise.allSettled(missing.map((k) => RUN[k](a)));
    results.forEach((res, i) => {
      if (res.status === "fulfilled" && res.value) deep[missing[i]] = seal({ id: a.id, value: res.value });
      else console.error("[approve] deep", missing[i], res.status === "rejected" ? res.reason : "empty");
    });
    await saveRequestParts(id, { ...parts, deep });
  }
  const full = readAudit({ ...parts, deep }) || a;
  const receipt = await paidReceipt(a.id, approvalPayId(a.id));
  const view = buildView(full, true, receipt);
  let pdf: Buffer | null = null;
  try {
    pdf = await reportPdf(view, new URL(req.url).origin);
  } catch (e) {
    console.error("[approve] pdf", id, e);
  }
  const link = `${SITE}/r/${id}?k=${linkKey(id)}`;
  const m = reportEmail(view, `MIA-${id.slice(0, 6).toUpperCase()}`, link);
  const ok = await sendMail({ email: r.email }, m.subject, m.html, m.text, pdf ? [{ name: `raport-${r.host.replace(/^www\./, "")}.pdf`, content: pdf.toString("base64") }] : undefined).catch(() => false);
  const now = new Date().toISOString();
  await saveRequest({ ...r, status: "aprobat", approvedAt: now, sentTo: ok ? r.email : r.sentTo, error: ok ? undefined : "email" });
  await logEvent({ t: now, k: "approve", host: r.host, rid: r.rid, req: id, email: r.email });
  return back(ok ? "?ok=1" : "?err=email");
}
