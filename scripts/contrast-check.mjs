/* Contrast audit for every text colour in globals.css.
   Run: node scripts/contrast-check.mjs [minimum]   (default 4.8) */
import { readFileSync } from "node:fs";

const MIN = Number(process.argv[2] ?? 4.8);
const css = readFileSync("app/globals.css", "utf8");

const tokens = Object.fromEntries(
  [...css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)].map((m) => [m[1], m[2]])
);

const hex = (c) => {
  let h = c.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const lum = (c) => {
  const [r, g, b] = hex(c).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const resolve = (v) => {
  const t = /var\(--([\w-]+)\)/.exec(v);
  if (t) return tokens[t[1]];
  const h = /#[0-9a-fA-F]{3,8}/.exec(v);
  return h ? h[0] : null;
};

/* selectors whose text sits on a dark surface instead of the page ground */
const DARK = [".btn", ".mailmenu", ".price-cta", "::selection"];
const PAGE = tokens.bg ?? "#fcfcfa";
const DARKBG = "#0b0b0a";

const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)];
const seen = new Map();
for (const [, sel, body] of rules) {
  const decl = /(?:^|[;\s])color:\s*([^;]+);/.exec(body);
  if (!decl) continue;
  const color = resolve(decl[1]);
  if (!color) continue;
  const selector = sel.trim().replace(/\s+/g, " ");
  if (selector.startsWith("@") || selector.startsWith(":root")) continue;
  const onDark = DARK.some((d) => selector.includes(d));
  const bg = onDark ? DARKBG : PAGE;
  const r = ratio(color, bg);
  const key = `${selector}|${color}`;
  if (!seen.has(key)) seen.set(key, { selector, color, bg, r });
}

const rows = [...seen.values()].sort((a, b) => a.r - b.r);
let fails = 0;
for (const { selector, color, bg, r } of rows) {
  const ok = r >= MIN;
  if (!ok) fails++;
  console.log(`${ok ? "ok  " : "FAIL"} ${r.toFixed(2).padStart(5)}:1  ${color} on ${bg}  ${selector.slice(0, 60)}`);
}
console.log(`\n${rows.length} text colours checked, minimum ${MIN}:1, ${fails} below.`);
process.exit(fails ? 1 : 0);
