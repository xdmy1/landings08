import { cookies } from "next/headers";
import { json } from "../../../../_audit/http";
import { COOKIE, approvalPayId, linkOk, tokenOk } from "../../../../_track/admin";
import { loadRequest, loadRequestParts } from "../../../../_track/store";

export const dynamic = "force-dynamic";

/* a request's report, for the browser that opens it: the studio (cookie) at any
   time, the client (the key from the email) once it is approved */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const admin = tokenOk(cookies().get(COOKIE)?.value);
  const k = new URL(req.url).searchParams.get("k");
  const r = await loadRequest(id);
  if (!r) return json({ error: "not_found" }, 404);
  if (!admin && !(linkOk(id, k) && r.status === "aprobat")) return json({ error: "forbidden" }, 403);
  const parts = await loadRequestParts(id);
  if (!parts) return json({ error: "not_found" }, 404);
  const { deep, ...rest } = parts;
  return json({ rid: r.rid, host: r.host, parts: rest, deep: deep || null, payId: approvalPayId(r.rid) });
}
