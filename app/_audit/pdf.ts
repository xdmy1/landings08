/* The paid report as a PDF: a plain A4 document in the manner of a clean
   invoice (logo, number and dates, the score, thin-ruled tables), printed
   by headless Chrome. */

import { COMPANY } from "../_pay/plans";
import { launch } from "./shots";
import type { Mark } from "./types";
import type { ReportView } from "./view";

const esc = (s: string | null | undefined) => (s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const SEV = { critic: "Grav", important: "Important", minor: "Mic" } as const;
const TONE = { good: "#1f8a4c", mid: "#c98a12", bad: "#b42318" } as const;

export function reportNumber(rid: string): string {
  return `RAP-${rid.slice(0, 6).toUpperCase()}`;
}

/* the FAQ code on one line, so it doesn't fill a printed page */
function compact(code: string): string {
  const m = code.match(/<script[^>]*>([\s\S]*)<\/script>/i);
  try {
    const one = JSON.stringify(JSON.parse(m ? m[1] : code));
    return m ? `<script type="application/ld+json">${one}</script>` : one;
  } catch {
    return code;
  }
}

/* a screenshot with its problems boxed in red, numbered, and the legend under it */
function marked(src: string, marks?: Mark[]): string {
  if (!marks?.length) return `<img src="${src}">`;
  return `<div><div class="marked"><img src="${src}">${marks.map((m) => `<span class="mk" style="left:${m.x}%;top:${m.y}%;width:${m.w}%;height:${m.h}%"><i>${m.n}</i></span>`).join("")}</div><ol class="legend">${marks.map((m) => `<li><i>${m.n}</i>${esc(m.label)}</li>`).join("")}</ol></div>`;
}

/* the paid analysis: competitors, brand search, AI answers, copy and the plan */
function deepHtml(v: ReportView): string {
  const d = v.deep;
  if (!d) return "";
  const c = d.competitors, b = d.brand, a = d.ai, cp = d.copy, pl = d.plan;
  const out: string[] = [];
  if (c) {
    out.push(`<h2>Tu față de concurenții tăi</h2><p class="muted">${esc(c.summary)}</p>
<table class="t"><tr><th></th><th class="you">Tu</th>${c.names.map((n) => `<th>${esc(n)}</th>`).join("")}</tr>
${c.rows.map((r) => `<tr><td class="muted">${esc(r.label)}</td><td class="you"><b>${esc(r.you)}</b></td>${r.them.map((t) => `<td>${esc(t)}</td>`).join("")}</tr>`).join("")}
</table><ul style="margin-top:8px">${c.insights.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`);
  }
  if (b) {
    const p = b.profile;
    out.push(`<h2>Ce vede clientul când îți caută numele</h2><p class="muted">Am căutat „${esc(b.query)}”. ${esc(b.summary)}</p>
<table class="t">
<tr><td style="width:150px" class="muted">Profilul Google Business</td><td><b>${p.found ? (p.rating ? `${p.rating} ★ · ${p.reviews ?? "?"} recenzii` : "Există") : "Nu l-am găsit"}</b> <span class="muted">${esc(p.note)}</span></td></tr>
${b.results.map((r) => `<tr><td class="muted">${esc(r.kind)}</td><td>${esc(r.title)} <span class="muted">${esc(r.url.replace(/^https?:\/\/(www\.)?/, ""))}</span><br><span class="muted">${esc(r.note)}</span></td></tr>`).join("")}
<tr><td class="muted">Ce să faci</td><td><ol>${b.actions.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></td></tr>
</table>`);
  }
  if (a) {
    const n = a.questions.filter((q) => q.mentioned).length;
    out.push(`<h2>Te recomandă inteligența artificială?</h2><p><b>${esc(v.host)} a fost recomandat în ${n} din ${a.questions.length} răspunsuri.</b> <span class="muted">${esc(a.summary)}</span></p>
<table class="t">${a.questions.map((q) => `<tr><td style="width:18px" class="${q.mentioned ? "yes" : "bad"}">${q.mentioned ? "✓" : "✕"}</td><td>„${esc(q.q)}”<br><span class="muted">${q.recommended.length ? `Recomandă: ${esc(q.recommended.map((r) => r.name).join(", "))}` : "Nu a recomandat nicio firmă anume."}</span></td></tr>`).join("")}</table>
<p style="margin-top:8px"><b>Ca să fii recomandat mai des</b></p><ol>${a.actions.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
<p class="muted small">Testat cu un asistent AI care caută pe web. ChatGPT sau Google AI pot răspunde puțin diferit.</p>`);
  }
  if (cp) {
    const box = (label: string, value: string, hint = "") => `<div class="copy"><small>${esc(label)}${hint ? ` · ${esc(hint)}` : ""}</small>${esc(value)}</div>`;
    out.push(`<h2>Gata de copiat</h2>
${box("Titlul pentru Google", cp.title, `${cp.title.length} caractere`)}
${box("Descrierea din Google", cp.description, `${cp.description.length} caractere`)}
${box("Titlul principal de pe site", cp.h1)}
${box("Descrierea pentru profilul Google Business", cp.gbp, `${cp.gbp.length} caractere`)}
<div class="copy"><small>Întrebări frecvente pentru site</small>${cp.faq.map((f) => `<p style="margin-top:5px"><b>${esc(f.q)}</b><br><span class="muted">${esc(f.a)}</span></p>`).join("")}</div>
<div class="copy"><small>Codul pentru Google cu întrebările (se pune în pagină)</small><pre>${esc(compact(cp.faqJsonLd))}</pre></div>`);
  }
  if (pl) {
    out.push(`<h2>Planul pe 30 de zile</h2><div class="weeks">${pl.weeks.map((w) => `<div class="week"><span class="muted small">Săptămâna ${w.week}</span><h3>${esc(w.focus)}</h3>${w.steps.map((s) => `<div>${esc(s.what)}<br><span class="tag ${s.who}">${s.who === "singur" ? "Poți singur" : "Programator"}</span> <span class="muted small">${esc(s.time)} · ${esc(s.impact)}</span></div>`).join("")}</div>`).join("")}</div>`);
  }
  return out.join("\n");
}

function html(v: ReportView, origin: string): string {
  const date = new Date(v.createdAt).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
  const tone = (t: string) => TONE[t as keyof typeof TONE] || TONE.mid;
  const g = v.google;
  const d = v.deep;
  return `<!doctype html><html lang="ro"><head><meta charset="utf-8">
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=block" rel="stylesheet">
<style>
@page { size: A4; margin: 16mm 15mm 20mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: "Switzer", -apple-system, Helvetica, Arial, sans-serif; color: #0f0f0e; font-size: 10.5pt; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.brand { display: flex; align-items: center; gap: 9px; font-size: 13pt; font-weight: 500; letter-spacing: -0.02em; }
.brand img { height: 22px; }
h1 { font-size: 24pt; font-weight: 500; letter-spacing: -0.035em; margin-top: 26px; }
.meta { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 18px; }
.meta table td { padding: 2px 0; vertical-align: top; }
.meta table td:first-child { color: #6b6b64; width: 118px; }
.from { color: #50504a; font-size: 9.5pt; line-height: 1.55; }
.from b { color: #0f0f0e; font-weight: 600; }
.paid { display: inline-block; padding: 1px 8px; border-radius: 99px; background: #e7f5ec; color: #135c32; font-weight: 600; font-size: 9pt; }
.score { display: flex; align-items: center; gap: 22px; margin-top: 26px; padding: 18px 20px; border: 1px solid #e6e5df; border-radius: 12px; }
.score .n { font-size: 40pt; font-weight: 500; letter-spacing: -0.05em; line-height: 1; white-space: nowrap; }
.score .n small { font-size: 13pt; color: #6b6b64; letter-spacing: 0; }
.score .lbl { font-weight: 600; font-size: 11pt; }
.score p { color: #50504a; margin-top: 3px; }
h2 { font-size: 13.5pt; font-weight: 600; letter-spacing: -0.015em; margin: 26px 0 8px; break-after: avoid; }
table.t { width: 100%; border-collapse: collapse; }
table.t th { text-align: left; font-size: 8.5pt; font-weight: 600; color: #6b6b64; text-transform: uppercase; letter-spacing: 0.04em; padding: 6px 8px 6px 0; border-bottom: 1px solid #0f0f0e; }
table.t td { padding: 8px 8px 8px 0; border-bottom: 1px solid #e6e5df; vertical-align: top; }
table.t tr { break-inside: avoid; }
.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.bar { width: 70px; height: 4px; border-radius: 4px; background: #ecebe5; margin-top: 6px; }
.bar i { display: block; height: 100%; border-radius: 4px; }
.sev { display: inline-block; font-size: 8pt; font-weight: 600; padding: 1px 7px; border-radius: 99px; white-space: nowrap; }
.sev.critic { background: #fde8e6; color: #9b1c12; } .sev.important { background: #fdf2dc; color: #8a5a00; } .sev.minor { background: #eef0f2; color: #4a5562; }
.muted { color: #6b6b64; }
.fix { color: #134a2a; }
.shots { display: grid; grid-template-columns: 3fr 1fr; gap: 10px; margin-top: 10px; break-inside: avoid; }
.shots img { width: 100%; border: 1px solid #e6e5df; border-radius: 8px; display: block; }
.check { display: grid; grid-template-columns: 1fr 1fr; column-gap: 22px; }
.check div { display: flex; gap: 8px; padding: 5px 0; border-bottom: 1px solid #e6e5df; break-inside: avoid; }
.check i { font-style: normal; font-weight: 700; width: 12px; }
.check .ok i { color: #1f8a4c; } .check .no i { color: #b42318; }
.check span { margin-left: auto; color: #6b6b64; font-size: 9pt; }
ol, ul { padding-left: 18px; } li { margin: 3px 0; }
.marked { position: relative; }
.marked img { width: 100%; border: 1px solid #e6e5df; border-radius: 8px; display: block; }
.mk { position: absolute; border: 2px solid #e0261b; border-radius: 5px; }
.mk i, .legend i { display: inline-grid; place-items: center; width: 15px; height: 15px; border-radius: 50%; background: #e0261b; color: #fff; font-style: normal; font-size: 7.5pt; font-weight: 700; }
.mk i { position: absolute; top: -8px; left: -8px; }
.legend { list-style: none; padding: 0; margin-top: 6px; font-size: 9pt; color: #50504a; }
.legend li { display: flex; gap: 6px; align-items: flex-start; margin: 3px 0; }
.you { background: #f6f6f1; }
.yes { color: #1f8a4c; font-weight: 700; } .bad { color: #b42318; font-weight: 700; }
.copy { border: 1px solid #e6e5df; border-radius: 8px; padding: 8px 10px; margin-top: 6px; break-inside: avoid; }
.copy small { display: block; color: #6b6b64; font-size: 8.5pt; }
.copy pre { font-size: 7.5pt; white-space: pre-wrap; word-break: break-word; background: #f4f3ee; padding: 6px 8px; border-radius: 6px; margin-top: 4px; }
.weeks { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.week { border: 1px solid #e6e5df; border-radius: 8px; padding: 8px 10px; break-inside: avoid; }
.week h3 { font-size: 10.5pt; font-weight: 600; }
.week div { border-top: 1px solid #e6e5df; padding-top: 5px; margin-top: 5px; }
.tag { display: inline-block; font-size: 7.5pt; font-weight: 600; padding: 0 6px; border-radius: 99px; background: #eef0f2; color: #4a5562; }
.tag.singur { background: #e7f5ec; color: #135c32; }
.small { font-size: 9pt; }
.end { margin-top: 30px; padding-top: 12px; border-top: 1px solid #e6e5df; color: #6b6b64; font-size: 9pt; }
</style></head><body>
<div class="brand"><img src="${origin}/images/logo-mark.webp" alt="">landings.md</div>
<h1>Raport de verificare</h1>
<div class="meta">
  <table>
    <tr><td>Nr. raport</td><td>${reportNumber(v.rid)}</td></tr>
    <tr><td>Data</td><td>${esc(date)}</td></tr>
    <tr><td>Site verificat</td><td><b>${esc(v.host)}</b></td></tr>
    <tr><td>Status</td><td><span class="paid">Plătit · raport complet</span></td></tr>
  </table>
  <div class="from"><b>${esc(COMPANY.brand)}</b><br>Studio web din Chișinău<br>${esc(COMPANY.email)} · ${esc(COMPANY.phone)}<br>IDNO ${esc(COMPANY.idno)}, ${esc(COMPANY.address)}</div>
</div>

<div class="score">
  <div class="n" style="color:${tone(v.tone)}">${v.total ?? "—"}<small> / 100</small></div>
  <div><div class="lbl">${esc(v.label)}</div><p>${esc(v.verdict)}</p></div>
</div>

<h2>Notele pe categorii</h2>
<table class="t"><tr><th>Categorie</th><th>Pe scurt</th><th class="num">Notă</th></tr>
${v.cats.map((c) => `<tr><td><b>${esc(c.name)}</b><div class="bar"><i style="width:${c.score ?? 0}%;background:${tone(c.tone)}"></i></div></td><td>${esc(c.summary)}</td><td class="num"><b>${c.score ?? "—"}</b></td></tr>`).join("")}
</table>

${v.shots.desktop || v.shots.mobile ? `<h2>Ce vede un client nou</h2><p class="muted">${esc(v.firstImpression)}</p><div class="shots">${v.shots.desktop ? marked(v.shots.desktop, d?.marks?.desktop) : "<div></div>"}${v.shots.mobile ? marked(v.shots.mobile, d?.marks?.mobile) : ""}</div>` : ""}

<h2>Ce trebuie reparat (${v.issues.length})</h2>
<table class="t"><tr><th style="width:22px">#</th><th style="width:76px">Gravitate</th><th>Problema și de ce contează</th><th style="width:38%">Cum se repară</th></tr>
${v.issues.map((i, k) => `<tr><td class="muted">${k + 1}</td><td><span class="sev ${i.severity}">${SEV[i.severity]}</span><div class="muted" style="font-size:8.5pt;margin-top:3px">${esc(i.category)}</div></td><td><b>${esc(i.title)}</b><br><span class="muted">${esc(i.why)}</span></td><td class="fix">${esc(i.fix)}</td></tr>`).join("")}
</table>

${g ? `<h2>Poziția în Google</h2>
<table class="t">
<tr><td style="width:150px" class="muted">Căutarea</td><td>„${esc(g.keyword)}” ${g.source === "google" ? `<span class="muted">· Google Moldova, primele ${g.depth} rezultate</span>` : `<span class="muted">· poziție estimată</span>`}</td></tr>
<tr><td class="muted">Poziția site-ului</td><td><b>${g.position ? `Locul ${g.position}${g.page ? `, pagina ${g.page}` : ""}` : `Nu apare în primele ${g.depth} rezultate`}</b></td></tr>
<tr><td class="muted">Apar înaintea ta</td><td>${g.competitors.map((c) => `${esc(c.name)} <span class="muted">${esc(c.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</span>`).join("<br>")}</td></tr>
${g.analysis ? `<tr><td class="muted">De ce sunt mai sus</td><td>${esc(g.analysis)}</td></tr>` : ""}
${g.actions.length ? `<tr><td class="muted">Ce să faci</td><td><ol>${g.actions.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></td></tr>` : ""}
</table>` : ""}

${deepHtml(v)}

${v.speed ? `<h2>Viteză</h2>
<table class="t"><tr><th>Măsurătoare</th><th class="num">Valoare</th></tr>
<tr><td>Nota Google PageSpeed pe telefon</td><td class="num"><b>${v.speed.mobile ?? "—"}/100</b></td></tr>
<tr><td>Nota Google PageSpeed pe calculator</td><td class="num"><b>${v.speed.desktop ?? "—"}/100</b></td></tr>
<tr><td>Apare conținutul principal (telefon)</td><td class="num">${esc(v.speed.lcp) || "—"}</td></tr>
<tr><td>Răspunsul serverului</td><td class="num">${esc(v.speed.ttfb) || "—"}</td></tr>
${v.speed.opportunities.map((o) => `<tr><td class="muted">${esc(o.title)}</td><td class="num muted">până la ${esc(o.savings)}</td></tr>`).join("")}
</table>` : ""}

${d?.pages ? `<h2>Toate paginile site-ului</h2><ul class="small">${d.pages.summary.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
<table class="t small"><tr><th>Pagina</th><th>Titlu</th><th>Descriere</th><th class="num">H1</th><th class="num">Cuvinte</th><th class="num">Răspuns</th></tr>
${d.pages.rows.map((r) => `<tr><td style="word-break:break-all">${esc(r.url.replace(/^https?:\/\/[^/]+/, "") || "/")}${r.status === 0 || r.status >= 400 ? ' <span class="bad">nu se deschide</span>' : ""}</td><td class="${!r.title || r.dupTitle || r.titleLen > 65 ? "bad" : ""}">${r.title ? `${r.titleLen} car.${r.dupTitle ? ", dublat" : ""}` : "lipsă"}</td><td class="${r.desc ? "" : "bad"}">${r.desc ? "da" : "lipsă"}</td><td class="num ${r.h1 === 1 ? "" : "bad"}">${r.h1}</td><td class="num ${r.words < 250 ? "bad" : ""}">${r.words}</td><td class="num">${r.ms != null ? `${(r.ms / 1000).toFixed(1)} s` : "—"}</td></tr>`).join("")}
</table>` : ""}

<h2>Verificarea tehnică</h2>
<div class="check">${v.checklist.map((c) => `<div class="${c.ok ? "ok" : "no"}"><i>${c.ok ? "✓" : "✕"}</i>${esc(c.label)}<span>${esc(c.note)}</span></div>`).join("")}</div>

${v.strengths.length ? `<h2>Ce e bine</h2><ul>${v.strengths.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}

<div class="end">Raport generat automat pe ${esc(date)} din datele publice ale site-ului (Google PageSpeed, căutare, analiza paginii). Vrei să-l reparăm noi? Scrie-ne: ${esc(COMPANY.email)} · ${esc(COMPANY.phone)} · landings.md</div>
</body></html>`;
}

export async function reportPdf(v: ReportView, origin: string): Promise<Buffer> {
  const browser = await launch();
  try {
    const page = await browser.newPage();
    await page.setContent(html(v, origin), { waitUntil: "load", timeout: 25000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 400)); // the logo and fonts are in by now
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="width:100%;padding:0 15mm;font:8px Helvetica,Arial,sans-serif;color:#8a8a83;display:flex;justify-content:space-between"><span>landings.md · ${reportNumber(v.rid)} · ${esc(v.host)}</span><span>Pagina <span class="pageNumber"></span> din <span class="totalPages"></span></span></div>`,
      margin: { top: "16mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close().catch(() => undefined);
  }
}
