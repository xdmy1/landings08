/* The email that carries the paid report: the score, the worst problems with
   their fix, what the attached PDF holds, and a way to ask us to fix it. */

import { button, esc, h2, p, rows, shell, tag, WA } from "../_pay/mailui";
import type { ReportView } from "./view";

const TONE = { good: "#1f8a4c", mid: "#a16f0a", bad: "#b42318" } as const;
const BAR = { good: "#1f8a4c", mid: "#d29a1c", bad: "#b42318" } as const;
const SEV_TAG = { critic: ["Grav", "red"], important: ["Important", "amber"], minor: ["Mic", "light"] } as const;

export function reportEmail(v: ReportView, orderId: string, url?: string) {
  const score = v.total ?? 0;
  const top = v.issues.slice(0, 3);
  const n = v.issues.length;
  const inside = [
    `Cum se repară fiecare din cele ${n} probleme`,
    "Locul în Google și concurenții de dinaintea ta",
    "Tu față de concurenți, pus într-un tabel",
    "Ce vede clientul când caută numele firmei",
    "Dacă te recomandă inteligența artificială",
    "Textele gata de copiat",
    "Planul pe 30 de zile",
    "Toate paginile site-ului",
    "Problemele încercuite pe poze",
  ];
  const wa = `${WA}?text=${encodeURIComponent(`Bună! Am raportul pentru ${v.host} și vreau să-l reparați.`)}`;

  const scoreCard = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px"><tr><td style="padding:14px 0;border-top:1px solid #e6e6e1;border-bottom:1px solid #e6e6e1">
<div><span style="font-size:52px;line-height:1;font-weight:500;letter-spacing:-.05em;color:${TONE[v.tone]}">${score}</span><span style="font-size:16px;color:#7a7a73"> / 100</span><span style="font-size:18px;font-weight:600;color:${TONE[v.tone]};margin-left:12px">${esc(v.label)}</span></div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;border-collapse:separate"><tr>
<td width="${Math.max(score, 2)}%" style="height:8px;border-radius:99px 0 0 99px;background:${BAR[v.tone]};font-size:0;line-height:0">&nbsp;</td>
<td style="height:8px;border-radius:0 99px 99px 0;background:#ecebe5;font-size:0;line-height:0">&nbsp;</td>
</tr></table>
${v.verdict ? `<div style="font-size:15px;line-height:1.55;color:#45453f;margin-top:12px">${esc(v.verdict)}</div>` : ""}
</td></tr></table>`;

  const issues = top
    .map((i) => {
      const [label, tone] = SEV_TAG[i.severity];
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style=""><tr><td style="padding:14px 0;border-top:1px solid #e6e6e1">
<div>${tag(label, tone)}<span style="font-size:13px;color:#7a7a73;margin-left:8px;vertical-align:middle">${esc(i.category)}</span></div>
<div style="font-size:17px;line-height:1.35;font-weight:600;letter-spacing:-.01em;margin-top:10px">${esc(i.title)}</div>
<div style="font-size:15px;line-height:1.55;color:#45453f;margin-top:6px">${esc(i.why)}</div>
${i.fix ? `<div style="font-size:15px;line-height:1.55;color:#134a2a;background:#eef6f0;border-radius:12px;padding:10px 12px;margin-top:10px"><b>Cum se repară:</b> ${esc(i.fix)}</div>` : ""}
</td></tr></table>`;
    })
    .join("\n");

  const list = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${inside
    .map((x) => `<tr><td style="padding:8px 0;border-top:1px solid #e6e6e1;font-size:15px;line-height:1.45"><span style="color:#1f8a4c;font-weight:700;margin-right:8px">&#10003;</span>${esc(x)}</td></tr>`)
    .join("")}</table>`;

  const html = shell({
    preheader: `Nota ${score}/100 · ${n} probleme și cum se repară · PDF atașat`,
    title: `Raportul complet pentru ${v.host}`,
    sub: `${orderId} · PDF atașat`,
    body: `${p("Bună ziua! Raportul plătit e gata. Vi l-am atașat în PDF, ca să-l aveți pe orice telefon sau calculator.")}
${scoreCard}
${h2("Cele mai grave probleme")}
${issues}
${h2("În PDF găsiți")}
${list}
${url ? `<div style="margin-top:26px">${button(url, "Vezi raportul online", "black")}</div>` : ""}
<div style="margin-top:${url ? 12 : 26}px">${button(wa, "Vreau să-l reparați voi", url ? "light" : "black")}</div>
${p("Sau răspundeți la acest email. Vă spunem ce facem întâi și cât durează.", "#7a7a73")}`,
  });

  const text = [
    `Raportul complet pentru ${v.host} e atașat în PDF.`,
    `Nota: ${score}/100, ${v.label}.`,
    "",
    ...top.map((i, k) => `${k + 1}. ${i.title}\n   Cum se repară: ${i.fix || ""}`),
    "",
    ...(url ? [`Vezi raportul online: ${url}`] : []),
    `Vreau să-l reparați voi: ${wa}`,
  ].join("\n");

  return { subject: `Raportul complet pentru ${v.host} · landings.md`, html, text };
}

const TG = "https://t.me/damiqqn";
const MIA_PHONE = "+373 68 327 082";

/* a report asked for while card payments are off: what the client gets, what the studio gets */
export function requestEmails(o: { id: string; host: string; email: string; phone: string; score: number | null; eur: number; mdl: number; adminUrl: string }) {
  const code = o.id.slice(0, 6).toUpperCase();
  const paid = encodeURIComponent(`Am plătit prin MIA pentru raportul ${o.host} (${o.eur} €). Codul cererii: ${code}.`);
  const steps = `<ol style="margin:14px 0 0;padding-left:20px;font-size:15px;line-height:1.6;color:#45453f">
<li>Plătește <b>${o.eur} € (${o.mdl} lei)</b> prin MIA, la numărul <b>${MIA_PHONE}</b>, din aplicația băncii tale.</li>
<li style="margin-top:6px">Scrie-ne că ai plătit, cu codul <b>${code}</b>. Raportul vine pe acest email, cu PDF.</li>
</ol>`;
  const visitor = {
    subject: `Cererea ${code} pentru raportul ${o.host} · landings.md`,
    html: shell({
      preheader: `Mai ai doi pași: plata prin MIA și un mesaj cu codul ${code}`,
      title: `Am primit cererea pentru ${o.host}`,
      sub: `Codul cererii: ${code}`,
      body: `${p("Plata cu cardul e sistată temporar, așa că raportul complet se deblochează manual, în aceeași zi.")}
${steps}
<div style="margin-top:22px">${button(`${WA}?text=${paid}`, "Am plătit, scriu pe WhatsApp", "black")}</div>
<div style="margin-top:10px">${button(`${TG}?text=${paid}`, "Am plătit, scriu pe Telegram", "light")}</div>
${p("MIA: plată instant la număr de telefon, din aplicația oricărei bănci din Moldova.", "#7a7a73")}`,
    }),
    text: [`Am primit cererea pentru raportul ${o.host}. Codul: ${code}.`, "", `1. Plătește ${o.eur} € (${o.mdl} lei) prin MIA la ${MIA_PHONE}.`, `2. Scrie-ne că ai plătit, cu codul ${code}: ${WA}`, "", "Raportul vine pe acest email, cu PDF."].join("\n"),
  };
  const list: [string, string][] = [
    ["Site", o.host],
    ["Scor", o.score === null ? "—" : `${o.score}/100`],
    ["Email", o.email],
    ["Telefon", o.phone || "—"],
    ["Cod", code],
    ["Suma", `${o.eur} € (${o.mdl} lei) prin MIA`],
  ];
  const studio = {
    subject: `Cerere de raport ${code}: ${o.host}`,
    html: shell({
      preheader: `${o.host} · ${o.email}`,
      title: "Cerere de raport nouă",
      sub: `Așteaptă plata prin MIA, apoi aprob-o din panou`,
      body: `<div style="margin-top:18px">${rows(list)}</div>
<div style="margin-top:22px">${button(o.adminUrl, "Deschide panoul", "black")}</div>`,
    }),
    text: [`Cerere de raport nouă (${code})`, ...list.map(([k, v]) => `${k}: ${v}`), "", o.adminUrl].join("\n"),
  };
  return { visitor, studio };
}
