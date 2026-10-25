import { aiDeep, brandDeep, competitorsDeep, copyAndPlanDeep, marksDeep, pagesDeep } from "../../../../_audit/deep";
import { json } from "../../../../_audit/http";
import { allowDeep } from "../../../../_audit/limits";
import { isPaid } from "../../../../_audit/paid";
import { seal } from "../../../../_audit/seal";
import { readAudit, readJson } from "../../../../_audit/state";
import type { Audit, DeepStep } from "../../../../_audit/types";

export const dynamic = "force-dynamic";
export const maxDuration = 180;

const RUN: Record<DeepStep, (a: Audit) => Promise<unknown>> = {
  competitors: competitorsDeep,
  brand: brandDeep,
  ai: aiDeep,
  copy: copyAndPlanDeep,
  pages: pagesDeep,
  marks: marksDeep,
};

/* one step of the deeper analysis; runs only for a paid report */
export async function POST(req: Request, { params }: { params: { step: string } }) {
  const step = params.step as DeepStep;
  if (!(step in RUN)) return json({ error: "not_found" }, 404);
  const body = await readJson(req);
  const a = body && readAudit(body);
  if (!a) return json({ error: "bad_request" }, 400);
  if (!(await isPaid(a.id, body.payId))) return json({ error: "not_paid" }, 402);
  if (!allowDeep(a.id, step)) return json({ ok: false, error: "limit" }, 429);
  try {
    const value = await RUN[step](a);
    // the sealed part comes back with the report later; the value is shown right away
    return json({ ok: true, part: seal({ id: a.id, value }), value });
  } catch (e) {
    console.error("[audit] deep", step, a.id, e);
    return json({ ok: false });
  }
}
