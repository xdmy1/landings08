/* Lists every number and currency figure used in the keyword pages, so a human
   can check each one against reality. Run: node scripts/seo-audit.mjs */
import { readdirSync, readFileSync } from "node:fs";

const DIR = "app/_seo/pages";
const APPROVED = [
  "50", "2.6K", "348", "13%", "98%", "60+", "60", "7", "350", "550", "850", "3$", "24",
  "2", "4", "1", "0", "350 EUR", "550 EUR", "850 EUR", "50 EUR", "0 EUR", "24h",
];
for (const f of readdirSync(DIR).filter((f) => f.endsWith(".ts")).sort()) {
  const src = readFileSync(`${DIR}/${f}`, "utf8");
  const hits = new Set();
  for (const m of src.matchAll(/(?<![\w.])([0-9]+(?:[.,][0-9]+)*\s*(?:%|K|\+|EUR|\$|x|ori)?)/g)) hits.add(m[1].trim().replace(/[.,]$/, ""));
  const odd = [...hits].filter((h) => !APPROVED.includes(h));
  console.log(`\n${f.replace(".ts", "")}`);
  console.log(`  numbers: ${[...hits].join(", ") || "none"}`);
  if (odd.length) console.log(`  CHECK:   ${odd.join(", ")}`);
}
