import { promises as fs } from "fs";
import path from "path";
import { json } from "../../../_audit/http";

export const dynamic = "force-dynamic";

/* local preview only: a saved sample report (.data/demo-sample.json, or .data/demo-<s>.json with ?s=) */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") return json({ error: "not_found" }, 404);
  const s = (new URL(req.url).searchParams.get("s") || "sample").replace(/[^a-z0-9-]/gi, "") || "sample";
  try {
    return json(JSON.parse(await fs.readFile(path.join(process.cwd(), ".data", `demo-${s}.json`), "utf8")));
  } catch {
    return json({ error: "no_sample" }, 404);
  }
}
