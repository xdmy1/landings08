/* Counts keyword usage across the keyword landing pages.
   Run: node scripts/seo-check.mjs [slug] */
import { readdirSync, readFileSync } from "node:fs";

const DIR = "app/_seo/pages";
const norm = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[țţ]/gi, "t").replace(/[șş]/gi, "s").toLowerCase();

/* only the copy the visitor actually reads: drop slug/kw/href/domain/key lines */
const copyOf = (src) =>
  src
    .split("\n")
    .filter((l) => !/^\s*(slug|kw|kwAlt|href|domain|key|related|projectOrder):/.test(l))
    .join("\n")
    .replace(/^import[^\n]*\n/gm, "");

const count = (hay, needle) => {
  const n = norm(needle);
  if (!n) return 0;
  let i = 0, c = 0;
  while ((i = hay.indexOf(n, i)) !== -1) { c++; i += n.length; }
  return c;
};

const only = process.argv[2];
let bad = 0;
for (const f of readdirSync(DIR).filter((f) => f.endsWith(".ts")).sort()) {
  if (only && !f.includes(only)) continue;
  const src = readFileSync(`${DIR}/${f}`, "utf8");
  const kw = /kw:\s*"([^"]+)"/.exec(src)?.[1] ?? "";
  const alts = [...(/kwAlt:\s*\[([^\]]*)\]/.exec(src)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const body = norm(copyOf(src));
  const exact = count(body, kw);
  const total = exact + alts.reduce((s, a) => s + count(body, a), 0);
  const words = body.split(/\s+/).length;
  const emdash = (src.match(/—|–/g) || []).length;
  const ok = exact >= 12 && total >= 20 && emdash === 0;
  if (!ok) bad++;
  console.log(
    `${ok ? "ok  " : "FAIL"} ${f.replace(".ts", "").padEnd(36)} kw="${kw}" exact=${String(exact).padStart(2)} total=${String(total).padStart(2)} words=${words} density=${((total / words) * 100).toFixed(1)}%${emdash ? ` EM-DASH=${emdash}` : ""}`
  );
}
process.exit(bad ? 1 : 0);
