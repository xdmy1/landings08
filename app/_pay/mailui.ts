/* The look of every email we send: the site's off-white card, the black mark,
   and the two-layer glass buttons and tags, rebuilt with what mail apps
   render (tables, inline styles, gradients with a solid colour behind them).
   Mobile first: narrow margins, rows stacked, never two thin columns. */

import { COMPANY } from "./plans";

export const SITE = "https://www.landings.md";
const INK = "#0f0f0e";
const INK2 = "#45453f";
const INK3 = "#7a7a73";
const LINE = "#e6e6e1";

export const esc = (s: string | number | null | undefined) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

type Tone = "black" | "light" | "green" | "red" | "amber";

/* body gradient, edge, text colour and reflection strength per tone, from the site's glass skin */
const SKIN: Record<Tone, { bg: string; solid: string; edge: string; color: string; shadow: string; ref: number; glow: string }> = {
  black: { bg: "#3d3d39 0%,#1d1d1a 42%,#0f0f0e 62%,#27271f 84%,#4a4a44 100%", solid: "#151513", edge: "#000", color: "#fcfcfa", shadow: "0 -1px 0 rgba(0,0,0,.6)", ref: 0.42, glow: "rgba(11,11,10,.75)" },
  light: { bg: "#e8e8e2 0%,#d8d8d0 38%,#c6c6bd 58%,#cfcfc7 70%,#e6e6e0 86%,#fafaf7 100%", solid: "#dcdcd5", edge: "#6f6f69", color: INK, shadow: "0 1px 1px rgba(255,255,255,.85)", ref: 0.95, glow: "rgba(20,20,15,.4)" },
  green: { bg: "#2a9257 0%,#15703c 46%,#0d5730 62%,#15703c 84%,#33a063 100%", solid: "#15703c", edge: "#0d5a2e", color: "#fff", shadow: "0 1px 1px rgba(0,40,15,.6)", ref: 0.45, glow: "rgba(31,138,76,.6)" },
  red: { bg: "#c9433a 0%,#a8241b 42%,#861810 62%,#9c261c 82%,#c2554b 100%", solid: "#a8241b", edge: "#7e140c", color: "#fff", shadow: "0 1px 1px rgba(50,0,0,.6)", ref: 0.45, glow: "rgba(160,30,20,.6)" },
  amber: { bg: "#f6cd6a 0%,#e8b13a 42%,#d29a1c 62%,#e0ab34 82%,#f7d47c 100%", solid: "#e8b13a", edge: "#845400", color: "#3a2300", shadow: "0 1px 0 rgba(255,255,255,.45)", ref: 0.85, glow: "rgba(160,110,10,.55)" },
};

/* a glass capsule: the body, and inside it the reflection fading out below the middle */
function capsule(tone: Tone, inner: string, pad: string, size: number, weight = 600, extra = "") {
  const s = SKIN[tone];
  return `<span style="display:inline-block;border-radius:999px;border:1.5px solid ${s.edge};background-color:${s.solid};background-image:linear-gradient(180deg,${s.bg});box-shadow:inset 0 -8px 10px -8px rgba(255,255,255,.55),0 1px 1.5px rgba(0,0,0,.2),0 10px 18px -12px ${s.glow};padding:2px;${extra}"><span style="display:block;border-radius:999px;background-image:linear-gradient(180deg,rgba(255,255,255,${s.ref}) 0%,rgba(255,255,255,${(s.ref * 0.6).toFixed(2)}) 30%,rgba(255,255,255,${(s.ref * 0.15).toFixed(2)}) 56%,rgba(255,255,255,0) 68%);padding:${pad};color:${s.color};text-shadow:${s.shadow};font-size:${size}px;line-height:1.2;font-weight:${weight};white-space:nowrap">${inner}</span></span>`;
}

export function button(href: string, label: string, tone: Tone = "black") {
  return `<a href="${esc(href)}" style="text-decoration:none;display:inline-block">${capsule(tone, esc(label), "13px 26px", 16)}</a>`;
}

export function tag(label: string, tone: Tone) {
  return capsule(tone, esc(label).toUpperCase(), "4px 11px", 11, 700, "letter-spacing:.06em;vertical-align:middle");
}

/* the round glass badge with a tick, as on the site's success note */
export function tick(tone: Tone = "green") {
  const s = SKIN[tone];
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate"><tr><td align="center" valign="middle" width="44" height="44" style="width:44px;height:44px;border-radius:50%;border:1px solid ${s.edge};background-color:${s.solid};background-image:linear-gradient(180deg,${s.bg});box-shadow:inset 0 -6px 7px -5px rgba(255,255,255,.5),0 3px 8px ${s.glow};color:${s.color};font-size:22px;font-weight:700;line-height:44px;text-shadow:${s.shadow}">&#10003;</td></tr></table>`;
}

/* label over value, one under the other, so nothing is squeezed on a phone */
export function rows(list: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:16px;background:#fff;border-collapse:separate">
${list
  .map(
    ([k, v], i) =>
      `<tr><td style="padding:12px 16px;${i ? `border-top:1px solid ${LINE};` : ""}"><div style="font-size:13px;color:${INK3}">${esc(k)}</div><div style="font-size:16px;line-height:1.45;color:${INK};margin-top:2px;word-break:break-word">${esc(v)}</div></td></tr>`
  )
  .join("\n")}
</table>`;
}

export const h2 = (t: string) => `<div style="font-size:17px;font-weight:600;letter-spacing:-.01em;color:${INK};margin:26px 0 10px">${esc(t)}</div>`;
export const p = (t: string, color = INK2) => `<div style="font-size:15px;line-height:1.6;color:${color};margin-top:10px">${t}</div>`;

/* the whole email: header with the mark, the card, the legal line */
export function shell(o: { preheader: string; title: string; sub?: string; badge?: string; body: string }) {
  return `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap" rel="stylesheet">
<style>@media (min-width:620px){.card{padding:36px 40px !important}.outer{padding:32px 16px !important}}</style></head>
<body style="margin:0;padding:0;background:#efefea;-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(o.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efefea"><tr><td class="outer" align="center" style="padding:14px 8px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;font-family:Switzer,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK}">
<tr><td style="padding:8px 8px 14px"><a href="${SITE}" style="text-decoration:none;color:${INK}"><img src="${SITE}/email/mark.png" width="18" height="30" alt="" style="vertical-align:middle;border:0"><span style="font-size:18px;font-weight:600;letter-spacing:-.02em;vertical-align:middle;margin-left:9px">landings.md</span></a></td></tr>
<tr><td class="card" style="background:#fcfcfa;border:1px solid ${LINE};border-radius:22px;padding:24px 20px">
${o.badge ? `<div style="margin-bottom:16px">${o.badge}</div>` : ""}
<div style="font-size:26px;line-height:1.15;font-weight:500;letter-spacing:-.03em;color:${INK}">${esc(o.title)}</div>
${o.sub ? `<div style="font-size:15px;color:${INK3};margin-top:6px">${esc(o.sub)}</div>` : ""}
${o.body}
</td></tr>
<tr><td style="padding:16px 8px 8px;font-size:12px;line-height:1.6;color:#8a8a83">IDNO ${COMPANY.idno} · ${esc(COMPANY.address)}<br><a href="mailto:${COMPANY.email}" style="color:#8a8a83">${COMPANY.email}</a> · <span style="white-space:nowrap">${esc(COMPANY.phone)}</span> · <a href="${SITE}" style="color:#8a8a83">landings.md</a></td></tr>
</table></td></tr></table></body></html>`;
}

export const WA = "https://wa.me/37368327082";
