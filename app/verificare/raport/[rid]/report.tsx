"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DEEP_STEPS, type Deep, type DeepStep } from "../../../_audit/types";
import type { ReportView } from "../../../_audit/view";
import { AiSection, BrandSection, CompetitorsSection, CopySection, DeepPending, MarkedShot, PagesSection, PlanSection, Teaser } from "./deep-sections";

const WA = "37368327082";
const SEV = { critic: "Grav", important: "Important", minor: "Mic" } as const;
const PAY_MARKS = [
  { n: "maib", h: 15 },
  { n: "visa", h: 11 },
  { n: "mastercard", h: 19 },
  { n: "applepay", h: 19 },
  { n: "googlepay", h: 16 },
];

type Props = { rid: string; eur: number; was: number; mdl: number };
type StepState = "run" | "done" | "fail";

/* the paid sections as the finished list names them, and where each one is */
const DEEP_DONE: Record<DeepStep, { label: string; to: string }> = {
  competitors: { label: "Tu față de concurenții tăi", to: "d-competitors" },
  brand: { label: "Ce vede clientul când îți caută numele", to: "d-brand" },
  ai: { label: "Te recomandă inteligența artificială?", to: "d-ai" },
  copy: { label: "Textele gata de copiat și planul pe 30 de zile", to: "d-copy" },
  pages: { label: "Toate paginile site-ului", to: "d-pages" },
  marks: { label: "Problemele încercuite pe poze", to: "d-marks" },
};

function read(key: string): string | null {
  try {
    return localStorage.getItem(key) ?? sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function readParts(rid: string): Record<string, string> {
  try {
    return JSON.parse(read(`lmd-deep:${rid}`) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

function has(d: Deep, k: DeepStep): boolean {
  return k === "copy" ? !!(d.copy && d.plan) : !!d[k];
}

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* after payment: the deeper analysis runs step by step, then the list becomes a table of contents */
function DeepProgress({ steps, onRetry }: { steps: Partial<Record<DeepStep, StepState>>; onRetry: () => void }) {
  const states = DEEP_STEPS.map((s) => steps[s.key]);
  const running = states.includes("run");
  const failed = states.includes("fail");
  return (
    <section className="vr-deep">
      <h2>{running ? "Pregătim analiza completă" : "Ce conține analiza completă"}</h2>
      <p>{running ? "Durează cam un minut. Fiecare parte apare mai jos când e gata. Rămâi pe pagină până se termină." : "Apasă pe o parte ca să mergi direct la ea."}</p>
      <div className="vr-steps" aria-live="polite">
        {DEEP_STEPS.map((s) => {
          const st = steps[s.key] || "run";
          const text = (
            <span className="vr-step-text">
              {st === "done" ? DEEP_DONE[s.key].label : s.label}
              {st === "fail" && <small>nu a mers de data asta</small>}
            </span>
          );
          return st === "done" ? (
            <a key={s.key} className="vr-step done" href={`#${DEEP_DONE[s.key].to}`}>
              <span className="vr-ic"><Tick /></span>
              {text}
              <span className="vr-step-go" aria-hidden="true">↓</span>
            </a>
          ) : (
            <div key={s.key} className={`vr-step ${st}`}>
              <span className="vr-ic" />
              {text}
            </div>
          );
        })}
      </div>
      {failed && !running && (
        <button className="pill-btn vr-retry" type="button" onClick={onRetry}>Încearcă din nou ce nu a mers</button>
      )}
    </section>
  );
}

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

function Locked({ title, text, eur }: { title: string; text: string; eur: number }) {
  return (
    <div className="vr-locked">
      <div className="vr-locked-fake" aria-hidden="true">
        {[0, 1].map((i) => (
          <div className="vr-issue" key={i}>
            <div className="vr-issue-top"><span className="vr-sev important">Important</span></div>
            <h3>Informație ascunsă în raportul gratuit</h3>
            <p>Ce înseamnă pentru afacerea ta și ce să faci, explicat pe înțelesul tuturor, pas cu pas.</p>
          </div>
        ))}
      </div>
      <div className="vr-locked-over">
        <div>
          <div className="vr-lock"><LockIcon /></div>
          <strong>{title}</strong>
          <p>{text}</p>
          <a className="btn" href="#deblocheaza">Deblochează pentru {eur} €</a>
        </div>
      </div>
    </div>
  );
}

function Pay({ base, eur, mdl }: { base: string; eur: number; mdl: number }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function go(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setErr("Scrie o adresă de email validă.");
    setBusy(true);
    try {
      const r = await fetch("/api/audit/pay", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ base, email }) });
      const j = await r.json().catch(() => ({}));
      if (j.payUrl) {
        window.location.href = j.payUrl;
        return;
      }
      setErr(
        j.error === "not_configured"
          ? "Plata cu cardul pornește în curând. Până atunci, scrie-ne pe WhatsApp și îți trimitem raportul complet."
          : j.error === "email"
            ? "Scrie o adresă de email validă."
            : "Plata nu a putut fi pornită. Încearcă din nou peste un minut."
      );
    } catch {
      setErr("Nu am putut porni plata. Verifică internetul și încearcă din nou.");
    }
    setBusy(false);
  }
  return (
    <form className="vr-pay" onSubmit={go} noValidate>
      <div className="vr-price-row">
        <div className="vr-price"><s>{eur === 5 ? 25 : eur * 5} €</s>{eur} €</div>
      </div>
      <p className="vr-price-sub">Plată unică, {mdl} lei. Raportul se deschide imediat.</p>
      <label className="vr-email">
        <span>Emailul tău, pentru chitanță</span>
        <input type="email" inputMode="email" autoComplete="email" placeholder="nume@firma.md" value={email} onChange={(e) => setEmail(e.target.value)} disabled={busy} />
      </label>
      <button className="btn vr-paybtn" type="submit" disabled={busy}>{busy ? "Se deschide plata…" : `Plătește ${eur} € cu cardul`}</button>
      {err && <p className="vr-pay-err" role="alert">{err} {/WhatsApp/.test(err) && <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener">Deschide WhatsApp</a>}</p>}
      <div className="vr-marks">{PAY_MARKS.map((m) => <img key={m.n} src={`/images/pay/${m.n}.svg`} alt={m.n} style={{ height: m.h }} />)}</div>
      <p className="vr-fine">Plata se face pe pagina securizată maib, cu 3-D Secure. Apăsând „Plătește”, accepți <a href="/termeni-si-conditii" target="_blank">Termenii și condițiile</a>.</p>
    </form>
  );
}

export default function Report({ rid, eur, was, mdl }: Props) {
  void was;
  const q = useSearchParams();
  const [parts, setParts] = useState<Record<string, unknown> | null | undefined>(undefined);
  const [view, setView] = useState<ReportView | null>(null);
  const [failed, setFailed] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [deep, setDeep] = useState<Deep>({});
  const [steps, setSteps] = useState<Partial<Record<DeepStep, StepState>>>({});
  const started = useRef(false);
  const payIdNow = q.get("payId") || "";

  /* each step runs on its own, so one slow or failed part doesn't hold up the others */
  const runDeep = useCallback(
    (keys: DeepStep[]) => {
      if (!parts || !keys.length) return;
      const payId = payIdNow || read(`lmd-paid:${rid}`) || "";
      setSteps((st) => ({ ...st, ...Object.fromEntries(keys.map((k) => [k, "run"])) }));
      for (const k of keys) {
        // only the marks need the screenshots; the other steps go without the heavy images
        const body = k === "marks" ? { ...parts, payId } : { ...parts, shots: undefined, payId };
        fetch(`/api/audit/deep/${k}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
          .then((r) => r.json())
          .then((j: { ok?: boolean; part?: string; value?: unknown }) => {
            if (!j.ok || !j.part || !j.value) throw new Error(k);
            const saved = readParts(rid);
            saved[k] = j.part;
            try {
              localStorage.setItem(`lmd-deep:${rid}`, JSON.stringify(saved));
            } catch {
              /* private mode: shown for this visit only */
            }
            setDeep((d) => (k === "copy" ? { ...d, ...(j.value as Pick<Deep, "copy" | "plan">) } : { ...d, [k]: j.value }));
            setSteps((st) => ({ ...st, [k]: "done" }));
          })
          .catch(() => setSteps((st) => ({ ...st, [k]: "fail" })));
      }
    },
    [parts, payIdNow, rid]
  );

  async function downloadPdf() {
    if (!parts || pdfBusy) return;
    setPdfBusy(true);
    try {
      const payId = payIdNow || read(`lmd-paid:${rid}`) || "";
      const r = await fetch("/api/audit/pdf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...parts, payId, deep: readParts(rid) }) });
      if (!r.ok) throw new Error(String(r.status));
      const url = URL.createObjectURL(await r.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = (r.headers.get("Content-Disposition") || "").match(/filename="([^"]+)"/)?.[1] || "raport.pdf";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch {
      alert("Nu am putut face PDF-ul. Încearcă din nou.");
    }
    setPdfBusy(false);
  }

  useEffect(() => {
    const raw = read(`lmd-audit:${rid}`);
    const p = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
    setParts(p);
    if (!p) return;
    const payId = q.get("payId") || read(`lmd-paid:${rid}`) || "";
    fetch("/api/audit/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...p, payId, deep: readParts(rid) }) })
      .then((r) => r.json())
      .then((j: { view?: ReportView }) => {
        if (!j.view) return setFailed(true);
        setView(j.view);
        if (j.view.paid && payId) {
          try {
            localStorage.setItem(`lmd-paid:${rid}`, payId);
          } catch {
            /* private mode: stays unlocked for this visit */
          }
        }
      })
      .catch(() => setFailed(true));
  }, [rid, q]);

  /* once the payment checks out: show the parts already made, run the rest */
  useEffect(() => {
    if (!view?.paid || started.current) return;
    started.current = true;
    const have = view.deep || {};
    setDeep(have);
    setSteps(Object.fromEntries(DEEP_STEPS.filter((s) => has(have, s.key)).map((s) => [s.key, "done"])));
    runDeep(DEEP_STEPS.filter((s) => !has(have, s.key)).map((s) => s.key));
  }, [view, runDeep]);

  if (parts === null || failed) {
    return (
      <div className="vr-empty">
        <h1 className="vr-h1">Raportul nu e pe acest dispozitiv</h1>
        <p className="vr-sub">Rapoartele rămân în browserul în care au fost făcute. Fă o verificare nouă, durează un minut.</p>
        <a className="btn btn-lg" href="/verificare">Verifică un site</a>
      </div>
    );
  }
  if (!view) return <p className="vr-loading">Se încarcă raportul…</p>;

  const v = view;
  const date = new Date(v.createdAt).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
  const waText = encodeURIComponent(`Bună! Am verificat site-ul ${v.host} pe landings.md și a luat ${v.total ?? "?"}/100. Vreau să-l reparați.`);
  const failedChecks = v.checklist.filter((c) => !c.ok).length;
  const paidPart = (k: DeepStep, title: string, show: () => React.ReactNode) =>
    v.paid ? (has(deep, k) ? show() : steps[k] === "run" ? <DeepPending title={title} /> : null) : null;
  const marks = v.paid ? deep.marks : undefined;

  return (
    <>
      {v.paid && payIdNow && (
        <div className="vr-success" role="status">
          <span className="vr-success-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <div>
            <strong>Plata a reușit. Mulțumim!</strong>
            <p>Raportul complet e deblocat mai jos. Chitanța ți-a fost trimisă pe email.</p>
          </div>
          <button className="btn" type="button" onClick={downloadPdf} disabled={pdfBusy}>{pdfBusy ? "Se pregătește…" : "Descarcă PDF"}</button>
        </div>
      )}
      <div className="vr-head">
        <div>
          <p className="vr-meta">Raport de verificare · {date}</p>
          <h1 className="art-h1 vr-host">{v.host}</h1>
          {v.verdict && <p className="art-lead">{v.verdict}</p>}
          {v.paid && (
            <div className="vr-paid-row">
              <span className="vr-paid">✓ Raport complet deblocat</span>
              <button className="pill-btn" type="button" onClick={downloadPdf} disabled={pdfBusy}>{pdfBusy ? "Se pregătește PDF-ul…" : "Descarcă raportul PDF"}</button>
            </div>
          )}
        </div>
        <div className="vr-score">
          <div className={`vr-dial ${v.tone}`} style={{ ["--v" as string]: v.total ?? 0 }}>
            <b>{v.total ?? "—"}</b>
          </div>
          <div className="vr-score-txt">
            <small>Nota site-ului</small>
            <strong className={v.tone}>{v.label}</strong>
            <span>din 100 de puncte</span>
          </div>
        </div>
      </div>

      {v.paid && <DeepProgress steps={steps} onRetry={() => runDeep(DEEP_STEPS.filter((s) => steps[s.key] === "fail").map((s) => s.key))} />}

      <div className="vr-cats">
        {v.cats.map((c) => (
          <div className="vr-cat" key={c.key}>
            <div className="vr-cat-top"><h3>{c.name}</h3><b>{c.score ?? "—"}</b></div>
            <div className="vr-bar"><i className={c.tone} style={{ width: `${c.score ?? 0}%` }} /></div>
            <p>{c.summary}</p>
          </div>
        ))}
      </div>

      {(v.shots.desktop || v.shots.mobile) && (
        <section className="vr-sec" id="d-marks">
          <h2 className="lbl">Ce vede un client nou</h2>
          {v.firstImpression && <p className="art-lead">{v.firstImpression}</p>}
          {marks && <p className="vr-note">Cu roșu: problemele pe care le vede clientul de cum intră. Numerele sunt explicate sub fiecare poză.</p>}
          <div className="vr-shots">
            {v.shots.desktop && <MarkedShot src={v.shots.desktop} alt={`${v.host} pe calculator`} caption="Pe calculator" marks={marks?.desktop} />}
            {v.shots.mobile && <MarkedShot src={v.shots.mobile} alt={`${v.host} pe telefon`} caption="Pe telefon" marks={marks?.mobile} />}
          </div>
        </section>
      )}

      {v.issues.length > 0 && (
        <section className="vr-sec">
          <h2 className="lbl">Ce trebuie reparat</h2>
          <p className="art-lead">Am găsit {v.issues.length} probleme, în ordinea în care te costă clienți.{!v.paid && " Soluția pentru fiecare e în raportul complet."}</p>
          <div className="vr-issues">
            {v.issues.map((i, k) => (
              <article className="vr-issue" key={k}>
                <div className="vr-issue-top"><span className={`vr-sev ${i.severity}`}>{SEV[i.severity]}</span><span className="vr-issue-cat">{i.category}</span></div>
                <h3>{i.title}</h3>
                <p>{i.why}</p>
                {i.fix ? (
                  <p className="vr-fix"><b>Cum se repară:</b> {i.fix}</p>
                ) : (
                  <a className="vr-fix-locked" href="#deblocheaza">
                    <b>Cum se repară:</b> <span aria-hidden="true">pașii exacți pentru site-ul tău, în ordinea în care merită făcuți</span>
                    <em><LockIcon /> Deblochează</em>
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {v.google && (
        <section className="vr-sec">
          <h2 className="lbl">Te găsesc clienții în Google?</h2>
          <p className="art-lead">
            Am căutat ce scrie un client din Moldova: „{v.google.keyword}”.{" "}
            {v.google.source === "google" ? `Am verificat Google pagină cu pagină, primele ${v.google.depth} rezultate.` : "Poziția e estimată după căutarea de azi."}
          </p>
          {v.paid ? (
            <>
              <div className="vr-google">
                <div className="vr-box">
                  <small>Poziția site-ului tău</small>
                  <b>{v.google.position ? `Locul ${v.google.position}${v.google.page ? `, pagina ${v.google.page}` : ""}` : `Nu apare în primele ${v.google.depth} rezultate`}</b>
                  {v.google.note && <p>{v.google.note}</p>}
                </div>
                <div className="vr-box">
                  <small>Cine apare înaintea ta</small>
                  <ol>{v.google.competitors.map((c, k) => <li key={k}>{c.name} <span className="vr-muted">{c.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span></li>)}</ol>
                </div>
              </div>
              {v.google.analysis && (
                <div className="vr-box vr-gwhy">
                  <small>De ce sunt ei mai sus</small>
                  <p>{v.google.analysis}</p>
                  {v.google.actions.length > 0 && <ol>{v.google.actions.map((x, k) => <li key={k}>{x}</li>)}</ol>}
                </div>
              )}
            </>
          ) : (
            <Locked title="Locul tău în Google și cine îți ia clienții" text={`Pe ce loc și pe ce pagină apare ${v.host}, ${v.google.competitorsCount || "firmele"} concurenți care apar înaintea ta, de ce și ce să faci ca să urci.`} eur={eur} />
          )}
        </section>
      )}

      {paidPart("competitors", "Tu față de concurenții tăi", () => <CompetitorsSection c={deep.competitors!} />)}
      {paidPart("brand", "Ce vede clientul când îți caută numele", () => <BrandSection b={deep.brand!} />)}
      {paidPart("ai", "Te recomandă inteligența artificială?", () => <AiSection a={deep.ai!} host={v.host} />)}
      {paidPart("copy", "Gata de copiat", () => (
        <>
          <CopySection copy={deep.copy!} />
          <PlanSection plan={deep.plan!} />
        </>
      ))}

      {v.speed && (
        <section className="vr-sec">
          <h2 className="lbl">Viteză</h2>
          <p className="art-lead">Măsurat cu Google PageSpeed. Pe telefon contează cel mai mult: acolo sunt majoritatea clienților.</p>
          <div className="vr-nums">
            <div className="vr-box"><small>Telefon</small><b>{v.speed.mobile ?? "—"}/100</b></div>
            <div className="vr-box"><small>Calculator</small><b>{v.speed.desktop ?? "—"}/100</b></div>
            <div className="vr-box"><small>Apare conținutul principal (telefon)</small><b>{v.speed.lcp ?? "—"}</b></div>
            <div className="vr-box"><small>Răspunsul serverului</small><b>{v.speed.ttfb ?? "—"}</b></div>
          </div>
          {v.speed.opportunities.length > 0 && (
            <div className="vr-check vr-one">
              {v.speed.opportunities.map((o, k) => <div key={k} className="no"><i>!</i>{o.title}<span>până la {o.savings} mai repede</span></div>)}
            </div>
          )}
        </section>
      )}

      {paidPart("pages", "Toate paginile site-ului", () => <PagesSection p={deep.pages!} />)}

      <section className="vr-sec">
        <h2 className="lbl">Verificarea tehnică</h2>
        <p className="art-lead">20 de verificări pentru Google, siguranță și contact. {failedChecks ? `${failedChecks} au picat.` : "Toate au trecut."}</p>
        <div className="vr-check">
          {v.checklist.map((c, k) => <div key={k} className={c.ok ? "ok" : "no"}><i>{c.ok ? "✓" : "✕"}</i>{c.label}<span>{c.note}</span></div>)}
        </div>
      </section>

      {v.strengths.length > 0 && (
        <section className="vr-sec">
          <h2 className="lbl">Ce e bine</h2>
          <ul className="vr-list">{v.strengths.map((x, k) => <li key={k}>{x}</li>)}</ul>
        </section>
      )}

      {!v.paid && <Teaser />}

      {!v.paid && parts && (
        <section className="vr-unlock" id="deblocheaza">
          <div>
            <h2>Afli exact cum repari și cine îți ia clienții.</h2>
            <ul>
              <li>Cum se repară fiecare din cele {v.issues.length} probleme, pas cu pas</li>
              <li>Locul tău în Google și concurenții de dinaintea ta</li>
              <li>Dacă te recomandă inteligența artificială</li>
              <li>Textele gata scrise și planul pe 30 de zile</li>
              <li>Raportul întreg și în PDF</li>
            </ul>
          </div>
          <Pay base={String(parts.base)} eur={eur} mdl={mdl} />
        </section>
      )}

      <section className="vr-cta">
        <div className="vr-cta-text">
          <div className="vr-cta-who">
            <img src="/images/founder.webp" alt="" />
            <span>Damian B. · răspunde azi</span>
          </div>
          <h2>Vrei să-l reparăm noi?</h2>
          <p>Scrie-ne și îți spunem ce facem întâi și cât durează.</p>
        </div>
        <div className="vr-cta-btns">
          <a className="btn" href={`https://wa.me/${WA}?text=${waText}`} target="_blank" rel="noopener">Scrie-ne pe WhatsApp</a>
          <a className="pill-btn" href="https://t.me/damiqqn" target="_blank" rel="noopener">Telegram</a>
        </div>
      </section>
      {v.errors.length > 0 && <p className="vr-note">Unele verificări nu au mers de data asta. Restul raportului e complet.</p>}
    </>
  );
}
