/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogTopBar } from "../../blog/chrome";
import { LegalFooter } from "../../_pay/legal-footer";
import { eurRate, maibReady, payInfo, toMdl } from "../../_pay/maib";
import { loadAudit, savePart } from "../../_audit/store";
import { AUDIT_EUR, AUDIT_EUR_WAS, reportIdOfOrder } from "../../_audit/price";
import { categoryScores, grade, overallScore, sortedIssues } from "../../_audit/score";
import { CATS, type Audit, type Facts } from "../../_audit/types";
import Unlock from "./unlock";
import { isOwnSite } from "../../_audit/own";
import "../verificare.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Raport de verificare | landings.md", robots: { index: false, follow: false } };

const SITE = process.env.SITE_URL || "https://www.landings.md";
const SEV = { critic: "Grav", important: "Important", minor: "Mic" } as const;
const CAT_NAME = Object.fromEntries(CATS.map((c) => [c.key, c.name])) as Record<string, string>;

function checklist(f: Facts) {
  const yes = (ok: boolean, label: string, note = "") => ({ ok, label, note });
  return [
    yes(f.title.length >= 10 && f.title.length <= 65, "Titlul paginii pentru Google", f.title ? `${f.title.length} caractere` : "lipsește"),
    yes(f.description.length >= 50 && f.description.length <= 170, "Descrierea din Google", f.description ? `${f.description.length} caractere` : "lipsește"),
    yes(f.h1.length === 1, "Un singur titlu principal (H1)", `${f.h1.length} găsite`),
    yes(f.lang !== "", "Limba paginii setată", f.lang || "lipsește"),
    yes(f.canonical !== "", "Adresa principală (canonical)"),
    yes(f.robotsTxt, "Fișierul robots.txt"),
    yes(f.sitemap, "Harta site-ului (sitemap.xml)"),
    yes(f.ogTitle && f.ogImage, "Arată frumos când e trimis pe WhatsApp/Facebook"),
    yes(f.structuredData.length > 0, "Date pentru Google (schema)", f.structuredData.slice(0, 2).join(", ")),
    yes(f.images === 0 || f.imagesNoAlt / f.images < 0.2, "Poze descrise pentru Google (alt)", `${f.imagesNoAlt} din ${f.images} fără`),
    yes(f.brokenLinks.length === 0, "Linkuri care nu merg", `${f.brokenLinks.length} din ${f.checkedLinks} verificate`),
    yes(f.https && f.redirectsToHttps !== false, "Conexiune sigură (HTTPS)"),
    yes(f.sslDaysLeft == null ? f.https : f.sslDaysLeft > 20, "Certificatul SSL", f.sslDaysLeft == null ? "" : `expiră în ${f.sslDaysLeft} zile`),
    yes(f.analytics.length > 0, "Statistici de vizite instalate", f.analytics.join(", ") || "niciuna"),
    yes(f.phoneVisible, "Telefon vizibil pe pagină"),
    yes(f.whatsapp || f.telegram, "Buton WhatsApp sau Telegram"),
    yes(f.forms > 0, "Formular de contact"),
    yes(f.cookieBanner, "Mesaj despre cookie-uri (GDPR)"),
    yes(f.securityHeaders.hsts && f.securityHeaders.xContentType, "Setări de securitate pe server"),
    yes(f.words >= 250, "Destul text pentru Google", `${f.words} cuvinte`),
  ];
}

function Locked({ title, text, rows, mdlLabel }: { title: string; text: string; rows: number; mdlLabel: string }) {
  return (
    <div className="vr-locked">
      <div className="vr-locked-fake" aria-hidden="true">
        {Array.from({ length: rows }, (_, i) => (
          <div className="vr-issue" key={i}>
            <div className="vr-issue-top"><span className="vr-sev important">Important</span><span className="vr-issue-cat">SEO</span></div>
            <h3>Problemă găsită pe site, ascunsă în raportul gratuit</h3>
            <p>Ce înseamnă pentru afacerea ta și cum se repară, explicat pe înțelesul tuturor, pas cu pas.</p>
          </div>
        ))}
      </div>
      <div className="vr-locked-over">
        <div>
          <div className="vr-lock" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" /><path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="2.2" /></svg>
          </div>
          <strong>{title}</strong>
          <p>{text}</p>
          <a className="btn" href="#deblocheaza">Deblochează pentru {mdlLabel}</a>
        </div>
      </div>
    </div>
  );
}

export default async function ReportPage({ params, searchParams }: { params: { id: string }; searchParams: { payId?: string } }) {
  let a: Audit | null = await loadAudit(params.id);
  if (!a || isOwnSite(a.host)) notFound();

  // back from maib: confirm the payment ourselves in case the callback is still on its way
  if (!a.paid && searchParams.payId && maibReady()) {
    try {
      const info = await payInfo(searchParams.payId);
      if (info?.status === "OK" && reportIdOfOrder(info.orderId || "") === a.id) {
        await savePart(a.id, "pay", { paid: true, payId: info.payId });
        a = { ...a, paid: true };
      }
    } catch (e) {
      console.error("[audit] pay check", e);
    }
  }

  const f = a.facts!;
  const s = categoryScores(a);
  const total = overallScore(s);
  const g = grade(total);
  const issues = sortedIssues(a);
  const { rate } = await eurRate();
  const mdl = toMdl(AUDIT_EUR, rate);
  const mdlLabel = `${AUDIT_EUR} €`;
  const link = `${SITE}/verificare/${a.id}`;
  const wa = `https://wa.me/37368327082?text=${encodeURIComponent(`Bună! Am verificat site-ul ${a.host} pe landings.md: ${link}\nVreau să-l reparați.`)}`;
  const date = new Date(a.createdAt).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <BlogTopBar />
      <main className="container vr-main">
        <div className="vr-head">
          <div>
            <p className="vr-kicker">Raport de verificare</p>
            <h1 className="vr-host">{a.host}</h1>
            <p className="vr-date">Verificat pe {date}</p>
            {a.analysis && <p className="vr-verdict">{a.analysis.verdict}</p>}
            {a.paid && <p className="vr-paid">✓ Raport complet deblocat</p>}
          </div>
          <div className={`vr-dial ${g.tone}`} style={{ ["--v" as string]: total ?? 0 }}>
            <div>
              <b>{total ?? "—"}</b>
              <span>din 100 · {g.label}</span>
            </div>
          </div>
        </div>

        <div className="vr-cats">
          {CATS.map((c) => {
            const v = s[c.key];
            const t = grade(v).tone;
            return (
              <div className="vr-cat" key={c.key}>
                <div className="vr-cat-top"><h3>{c.name}</h3><b>{v ?? "—"}</b></div>
                <div className="vr-bar"><i className={t} style={{ width: `${v ?? 0}%` }} /></div>
                <p>{a!.analysis?.catSummary[c.key] || (v == null ? "Nu am putut măsura." : "")}</p>
              </div>
            );
          })}
        </div>

        {(a.desktop?.screenshot || a.mobile?.screenshot) && (
          <section className="vr-sec">
            <h2>Ce vede un client nou</h2>
            {a.analysis && <p className="vr-lead">{a.analysis.firstImpression}</p>}
            <div className="vr-shots">
              {a.desktop?.screenshot && <figure className="vr-shot"><img src={a.desktop.screenshot} alt={`${a.host} pe calculator`} /><figcaption>Pe calculator</figcaption></figure>}
              {a.mobile?.screenshot && <figure className="vr-shot"><img src={a.mobile.screenshot} alt={`${a.host} pe telefon`} /><figcaption>Pe telefon</figcaption></figure>}
            </div>
          </section>
        )}

        {issues.length > 0 && (
          <section className="vr-sec">
            <h2>Ce trebuie reparat</h2>
            <p className="vr-lead">Am găsit {issues.length} probleme. Le-am pus în ordine: întâi cele care te costă clienți acum.{!a.paid && " Soluția pentru fiecare e în raportul complet."}</p>
            <div className="vr-issues">
              {issues.map((i, k) => (
                <article className="vr-issue" key={k}>
                  <div className="vr-issue-top"><span className={`vr-sev ${i.severity}`}>{SEV[i.severity]}</span><span className="vr-issue-cat">{CAT_NAME[i.category]}</span></div>
                  <h3>{i.title}</h3>
                  <p>{i.why}</p>
                  {a!.paid ? (
                    <p><b>Cum se repară:</b> {i.fix}</p>
                  ) : (
                    <a className="vr-fix-locked" href="#deblocheaza">
                      <b>Cum se repară:</b> <span aria-hidden="true">pașii exacți pentru site-ul tău, în ordinea în care merită făcuți</span>
                      <em>Deblochează</em>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {a.google && (
          <section className="vr-sec">
            <h2>Te găsesc clienții în Google?</h2>
            <p className="vr-lead">Am căutat ce scrie un client din Moldova: „{a.google.keyword}”. Poziția e estimată după căutarea de azi.</p>
            {a.paid ? (
              <div className="vr-google">
                <div className="vr-box">
                  <small>Poziția site-ului tău</small>
                  <b>{a.google.position ? `Locul ${a.google.position}` : "Nu apare în primele rezultate"}</b>
                  <p>{a.google.note}</p>
                </div>
                <div className="vr-box">
                  <small>Cine apare în locul tău</small>
                  <ol>{a.google.competitors.map((c, k) => <li key={k}>{c.name} <span style={{ color: "var(--ink-3)" }}>{c.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span></li>)}</ol>
                </div>
              </div>
            ) : (
              <Locked title="Poziția ta și concurenții care te depășesc" text={`Am găsit pe ce loc apare ${a.host} și ${a.google.competitors.length || 3} firme care iau clienții în locul tău.`} rows={1} mdlLabel={mdlLabel} />
            )}
          </section>
        )}

        {(a.mobile || a.desktop) && (
          <section className="vr-sec">
            <h2>Viteză</h2>
            <p className="vr-lead">Măsurat cu Google PageSpeed. Pe telefon contează cel mai mult: acolo sunt majoritatea clienților.</p>
            <div className="vr-nums">
              <div className="vr-box"><small>Telefon</small><b>{a.mobile?.performance ?? "—"}/100</b></div>
              <div className="vr-box"><small>Calculator</small><b>{a.desktop?.performance ?? "—"}/100</b></div>
              <div className="vr-box"><small>Apare conținutul principal (telefon)</small><b>{a.mobile?.lcp ?? "—"}</b></div>
              <div className="vr-box"><small>Răspunsul serverului</small><b>{f.ttfbMs != null ? `${(f.ttfbMs / 1000).toFixed(1)} s` : "—"}</b></div>
            </div>
            {a.mobile?.opportunities.length ? (
              <div className="vr-check" style={{ gridTemplateColumns: "1fr" }}>
                {a.mobile.opportunities.map((o, k) => <div key={k} className="no"><i>!</i>{o.title}<span>până la {o.savings} mai repede</span></div>)}
              </div>
            ) : null}
          </section>
        )}

        <section className="vr-sec">
          <h2>Verificarea tehnică</h2>
          <p className="vr-lead">20 de verificări pentru Google, siguranță și contact.</p>
          <div className="vr-check">
            {checklist(f).map((c, k) => <div key={k} className={c.ok ? "ok" : "no"}><i>{c.ok ? "✓" : "✕"}</i>{c.label}<span>{c.note}</span></div>)}
          </div>
        </section>

        {a.analysis && a.analysis.strengths.length > 0 && (
          <section className="vr-sec">
            <h2>Ce e bine</h2>
            <ul className="vr-list">{a.analysis.strengths.map((x, k) => <li key={k}>{x}</li>)}</ul>
          </section>
        )}

        {!a.paid && (
          <section className="vr-unlock" id="deblocheaza">
            <div>
              <h2>Raportul complet</h2>
              <p>Ai văzut ce nu merge la {a.host}. În raportul complet afli exact cum se repară și cine îți ia clienții în Google.</p>
              <ul>
                <li>Cum se repară fiecare din cele {issues.length || ""} probleme, pas cu pas</li>
                <li>Pe ce loc ești exact în Google</li>
                <li>Firmele care apar înaintea ta și iau clienții</li>
                <li>Link permanent, îl poți trimite oricui</li>
              </ul>
            </div>
            <div className="vr-pay">
              <div className="vr-price"><s>{AUDIT_EUR_WAS} €</s> {AUDIT_EUR} €<span>{mdl} lei, plată unică</span></div>
              <p className="vr-launch">Preț de lansare</p>
              <Unlock id={a.id} mdl={mdl} wa={wa} />
            </div>
          </section>
        )}

        <section className="vr-cta">
          <div>
            <h2>Vrei să-l reparăm noi?</h2>
            <p>Trimite-ne raportul și îți spunem cât durează. Răspundem în aceeași zi.</p>
          </div>
          <div className="vr-cta-btns">
            <a className="btn btn-lg" href={wa} target="_blank" rel="noopener">Scrie-ne pe WhatsApp</a>
            <a className="pill-btn" href="https://t.me/damiqqn" target="_blank" rel="noopener">Telegram</a>
          </div>
        </section>
        {a.errors.length > 0 && <p className="vr-note">Unele verificări nu au mers de data asta ({a.errors.map((e) => e.split(":")[0]).join(", ")}). Restul raportului e complet.</p>}
      </main>
      <LegalFooter />
    </>
  );
}
