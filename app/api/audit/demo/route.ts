import { promises as fs } from "fs";
import path from "path";
import { json } from "../../../_audit/http";

export const dynamic = "force-dynamic";

/* local preview only: a saved sample report (.data/demo-sample.json) */
export async function GET() {
  if (process.env.NODE_ENV === "production") return json({ error: "not_found" }, 404);
  try {
    return json(JSON.parse(await fs.readFile(path.join(process.cwd(), ".data", "demo-sample.json"), "utf8")));
  } catch {
    return json({ error: "no_sample" }, 404);
  }
}
