"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import type { Deep, Mark } from "../../../_audit/types";

/* what the free report promises, shown above the unlock box */
export const PREMIUM = [
  { t: "Tu față de concurenții tăi", d: "Firmele care apar înaintea ta în Google, verificate și puse față în față cu site-ul tău." },
  { t: "Ce vede clientul când îți caută numele", d: "Profilul Google, recenziile și tot ce apare când cineva caută firma ta." },
  { t: "Te recomandă inteligența artificială?", d: "Am întrebat un asistent AI, în 5 feluri, pe cine recomandă pentru ce vinzi." },
  { t: "Textele gata de copiat", d: "Titlul și descrierea pentru Google, titlul principal, întrebări frecvente cu codul pentru Google, descrierea pentru profilul Google." },
  { t: "Planul pe 30 de zile", d: "Ce faci în fiecare săptămână, ce poți face singur și ce face un programator." },
  { t: "Toate paginile site-ului", d: "Până la 25 de pagini verificate una câte una: titluri, descrieri, text, pagini care nu se deschid." },
  { t: "Problemele încercuite pe poze", d: "Pe captura de pe telefon și de pe calculator, fiecare problemă marcată cu roșu." },
  { t: "Cum se repară fiecare problemă", d: "Pașii exacți pentru site-ul tău, în ordinea în care merită făcuți." },
];

export function Teaser() {
  return (
    <section className="vr-sec">
      <h2 className="lbl">Ce mai primești în raportul complet</h2>
      <p className="art-lead">Raportul gratuit îți arată ce nu merge. Cel complet face o analiză nouă, mai adâncă, pornită imediat după plată, și îți spune exact ce să faci.</p>
      <div className="vr-teaser">
        {PREMIUM.map((p, k) => (
          <a className="vr-teaser-item" href="#deblocheaza" key={k}>
            <span className="vr-teaser-n">{k + 1}</span>
            <span>
              <b>{p.t}</b>
              <span>{p.d}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* where a paid section will appear, while its step still runs */
export function DeepPending({ title }: { title: string }) {
  return (
    <section className="vr-sec">
      <h2 className="lbl">{title}</h2>
      <div className="vr-pending" role="status">
        <span className="vr-pending-ic" aria-hidden="true" />
        Se pregătește, durează sub un minut…
      </div>
    </section>
  );
}

/* a screenshot with its problems circled */
export function MarkedShot({ src, alt, caption, marks }: { src: string; alt: string; caption: string; marks?: Mark[] }) {
  return (
    <figure className="vr-shot">
      <div className="vr-marked">
        <img src={src} alt={alt} />
        {marks?.map((m) => (
          <span key={m.n} className="vr-mark" style={{ left: `${m.x}%`, top: `${m.y}%`, width: `${m.w}%`, height: `${m.h}%` }}>
            <i>{m.n}</i>
          </span>
        ))}
      </div>
      <figcaption>
        {caption}
        {marks && marks.length > 0 && (
          <ol className="vr-mark-list">
            {marks.map((m) => (
              <li key={m.n}><i>{m.n}</i>{m.label}</li>
            ))}
          </ol>
        )}
      </figcaption>
    </figure>
  );
}

function CopyBox({ label, value, hint, code }: { label: string; value: string; hint?: string; code?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <div className="vr-copy">
      <div className="vr-copy-top">
        <small>{label}{hint ? ` · ${hint}` : ""}</small>
        <button
          className="pill-btn"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(value).then(() => {
              setDone(true);
              setTimeout(() => setDone(false), 1600);
            });
          }}
        >
          {done ? "Copiat ✓" : "Copiază"}
        </button>
      </div>
      {code ? <pre>{value}</pre> : <p>{value}</p>}
    </div>
  );
}

export function PlanSection({ plan }: { plan: NonNullable<Deep["plan"]> }) {
  return (
    <section className="vr-sec" id="d-plan">
      <h2 className="lbl">Planul pe 30 de zile</h2>
      <p className="art-lead">În ordinea în care aduce cel mai mult. La fiecare pas scrie dacă îl poți face singur.</p>
      <div className="vr-weeks">
        {plan.weeks.map((w) => (
          <div className="vr-week" key={w.week}>
            <div className="vr-week-top"><span>Săptămâna {w.week}</span><b>{w.focus}</b></div>
            {w.steps.map((s, k) => (
              <div className="vr-step-row" key={k}>
                <p>{s.what}</p>
                <div className="vr-step-meta">
                  <span className={`vr-who ${s.who}`}>{s.who === "singur" ? "Poți singur" : "Programator"}</span>
                  <span>{s.time}</span>
                </div>
                <small>{s.impact}</small>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function CopySection({ copy }: { copy: NonNullable<Deep["copy"]> }) {
  return (
    <section className="vr-sec" id="d-copy">
      <h2 className="lbl">Gata de copiat</h2>
      <p className="art-lead">Texte scrise pentru site-ul tău, din ce scrie deja pe el. Le copiezi și le pui în panoul site-ului sau i le dai programatorului.</p>
      <div className="vr-copies">
        <CopyBox label="Titlul pentru Google" hint={`${copy.title.length} caractere`} value={copy.title} />
        <CopyBox label="Descrierea din Google" hint={`${copy.description.length} caractere`} value={copy.description} />
        <CopyBox label="Titlul principal de pe site" value={copy.h1} />
        <CopyBox label="Descrierea pentru profilul Google Business" hint={`${copy.gbp.length} caractere`} value={copy.gbp} />
        <div className="vr-copy">
          <div className="vr-copy-top"><small>Întrebări frecvente pentru site</small></div>
          <dl className="vr-faq">
            {copy.faq.map((f, k) => (
              <div key={k}><dt>{f.q}</dt><dd>{f.a}</dd></div>
            ))}
          </dl>
        </div>
        <CopyBox label="Codul pentru Google cu întrebările (se pune în pagină)" value={copy.faqJsonLd} code />
      </div>
    </section>
  );
}

export function CompetitorsSection({ c }: { c: NonNullable<Deep["competitors"]> }) {
  return (
    <section className="vr-sec" id="d-competitors">
      <h2 className="lbl">Tu față de concurenții tăi</h2>
      <p className="art-lead">{c.summary}</p>
      <div className="vr-table-wrap">
        <table className="vr-table">
          <thead>
            <tr><th></th><th>Tu</th>{c.names.map((n, k) => <th key={k}>{n}</th>)}</tr>
          </thead>
          <tbody>
            {c.rows.map((r, k) => (
              <tr key={k}><td>{r.label}</td><td data-n="Tu"><b>{r.you}</b></td>{r.them.map((t, j) => <td key={j} data-n={c.names[j]}>{t}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="vr-insights">{c.insights.map((x, k) => <li key={k}>{x}</li>)}</ul>
    </section>
  );
}

export function BrandSection({ b }: { b: NonNullable<Deep["brand"]> }) {
  return (
    <section className="vr-sec" id="d-brand">
      <h2 className="lbl">Ce vede clientul când îți caută numele</h2>
      <p className="art-lead">Am căutat „{b.query}”. {b.summary}</p>
      <div className="vr-google">
        <div className="vr-box">
          <small>Profilul Google Business</small>
          <b>{b.profile.found ? (b.profile.rating ? `${b.profile.rating} ★ · ${b.profile.reviews ?? "?"} recenzii` : "Există") : "Nu l-am găsit"}</b>
          <p>{b.profile.note}</p>
        </div>
        <div className="vr-box">
          <small>Ce să faci</small>
          <ol>{b.actions.map((x, k) => <li key={k}>{x}</li>)}</ol>
        </div>
      </div>
      <div className="vr-results">
        {b.results.map((r, k) => (
          <div key={k}><span className="vr-kind">{r.kind}</span><b>{r.title}</b><small>{r.url.replace(/^https?:\/\/(www\.)?/, "")}</small><p>{r.note}</p></div>
        ))}
      </div>
    </section>
  );
}

export function AiSection({ a, host }: { a: NonNullable<Deep["ai"]>; host: string }) {
  const n = a.questions.filter((q) => q.mentioned).length;
  return (
    <section className="vr-sec" id="d-ai">
      <h2 className="lbl">Te recomandă inteligența artificială?</h2>
      <p className="art-lead">
        <b>{host} a fost recomandat în {n} din {a.questions.length} răspunsuri.</b> {a.summary}
      </p>
      <div className="vr-ai">
        {a.questions.map((q, k) => (
          <div className={`vr-ai-q ${q.mentioned ? "yes" : "no"}`} key={k}>
            <span className="vr-ai-ic">{q.mentioned ? "✓" : "✕"}</span>
            <div>
              <b>„{q.q}”</b>
              <p>{q.recommended.length ? `Recomandă: ${q.recommended.map((r) => r.name).join(", ")}` : "Nu a recomandat nicio firmă anume."}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="vr-box" style={{ marginTop: 12 }}>
        <small>Ca să fii recomandat mai des</small>
        <ol>{a.actions.map((x, k) => <li key={k}>{x}</li>)}</ol>
      </div>
      <p className="vr-note">Testat cu un asistent AI care caută pe web. ChatGPT sau Google AI pot răspunde puțin diferit.</p>
    </section>
  );
}

export function PagesSection({ p }: { p: NonNullable<Deep["pages"]> }) {
  return (
    <section className="vr-sec" id="d-pages">
      <h2 className="lbl">Toate paginile site-ului</h2>
      <ul className="vr-insights">{p.summary.map((x, k) => <li key={k}>{x}</li>)}</ul>
      <div className="vr-table-wrap">
        <table className="vr-table vr-pages">
          <thead>
            <tr><th>Pagina</th><th>Titlu</th><th>Descriere</th><th>H1</th><th>Cuvinte</th><th>Răspuns</th></tr>
          </thead>
          <tbody>
            {p.rows.map((r, k) => {
              const bad = r.status === 0 || r.status >= 400;
              return (
                <tr key={k} className={bad ? "bad" : ""}>
                  <td>{r.url.replace(/^https?:\/\/[^/]+/, "") || "/"}{bad && <em> nu se deschide</em>}</td>
                  <td data-n="Titlu" className={!r.title || r.dupTitle || r.titleLen > 65 ? "no" : ""}>{r.title ? `${r.titleLen} car.${r.dupTitle ? ", dublat" : ""}` : "lipsă"}</td>
                  <td data-n="Descriere" className={r.desc ? "" : "no"}>{r.desc ? "da" : "lipsă"}</td>
                  <td data-n="Titluri H1" className={r.h1 === 1 ? "" : "no"}>{r.h1}</td>
                  <td data-n="Cuvinte" className={r.words < 250 ? "no" : ""}>{r.words}</td>
                  <td data-n="Răspuns" className={(r.ms || 0) > 2500 ? "no" : ""}>{r.ms != null ? `${(r.ms / 1000).toFixed(1)} s` : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
