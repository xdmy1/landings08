/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { COOKIE, linkKey, tokenOk } from "../_track/admin";
import { dayOf, fmtTime, lastDays, listRequests, loadDay } from "../_track/store";
import { stats, type Row, type SrcRow } from "../_track/stats";
import "./admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin | landings.md", robots: { index: false, follow: false } };

const RANGES: Record<string, { n: number; label: string }> = { "1": { n: 1, label: "Azi" }, "7": { n: 7, label: "7 zile" }, "30": { n: 30, label: "30 de zile" }, "90": { n: 90, label: "90 de zile" } };
const SECTION: Record<string, string> = { proiecte: "Proiecte", servicii: "Servicii", "servicii-legate": "Servicii legate", mentenanta: "Mentenanță", contact: "Contact", intrebari: "Întrebări", despre: "Despre", cazuri: "Cazuri", rezultate: "Rezultate", verificare: "Verificare" };
const DAYS = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"];

const fmtDur = (s: number) => (!s ? "—" : s >= 3600 ? `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m` : s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);
const fmtDay = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return `${DAYS[new Date(Date.UTC(y, m - 1, day)).getUTCDay()]} ${day}.${String(m).padStart(2, "0")}`;
};
const tone = (n: number | null) => (n === null ? "" : n >= 80 ? "good" : n >= 60 ? "mid" : "bad");
const pct = (n: number) => `${n}%`;

function Login({ error }: { error: string }) {
  return (
    <main className="ad-login">
      <img src="/images/logo-mark.webp" alt="landings.md" width={57} height={96} />
      <h1>Analitici</h1>
      <form method="post" action="/api/admin/login">
        <input type="password" name="p" placeholder="Parola" autoFocus autoComplete="current-password" aria-label="Parola" />
        {error === "1" && <p className="err">Parola nu e bună.</p>}
        {error === "2" && <p className="err">Prea multe încercări. Revino peste 10 minute.</p>}
        <button className="btn btn-lg" type="submit">
          Intră
        </button>
      </form>
    </main>
  );
}

/* a plain table; `num` = the columns that hold numbers (right-aligned);
   `cards` = on a phone each row becomes a block with label + value; `wide` = the columns that stack there */
function Table({ head, rows, num = [], wide = [], cards = false, empty = "Nimic încă." }: { head: string[]; rows: React.ReactNode[][]; num?: number[]; wide?: number[]; cards?: boolean; empty?: string }) {
  return (
    <div className={cards ? "pn-wrap pn-cards" : "pn-wrap"}>
      <table>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} className={num.includes(i) ? "n" : undefined}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j} className={[num.includes(j) ? "n" : "", wide.includes(j) ? "w" : ""].filter(Boolean).join(" ") || undefined} data-l={head[j]}>
                    {c}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={head.length} className="empty">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const rowsOf = (list: Row[], max = 12) => list.slice(0, max).map((r) => [r.k || "—", r.n]);
const srcTable = (list: SrcRow[], head: string, empty?: string) => (
  <Table
    head={[head, "Sesiuni", "Timp", "Plecați", "Verificări", "Chat", "Cereri", "Au făcut ceva"]}
    num={[1, 2, 3, 4, 5, 6, 7]}
    cards
    rows={list.slice(0, 20).map((r) => [r.k, r.n, fmtDur(r.dur), pct(r.bounce), r.checks, r.chats, r.requests, pct(r.conv)])}
    empty={empty}
  />
);

export default async function AdminPage({ searchParams }: { searchParams: { r?: string; e?: string; ok?: string; err?: string } }) {
  if (!tokenOk(cookies().get(COOKIE)?.value)) return <Login error={searchParams.e || ""} />;
  const rk = RANGES[searchParams.r || ""] ? (searchParams.r as string) : "7";
  const today = dayOf(new Date());
  const days = lastDays(RANGES[rk].n);
  const [events, requests] = await Promise.all([Promise.all(days.map((d) => loadDay(d, today))).then((x) => x.flat()), listRequests()]);
  const st = stats(events);
  const hourMax = Math.max(1, ...st.byHour);
  const hourRows = (from: number) =>
    st.byHour.slice(from, from + 12).map((n, i) => [
      `${String(from + i).padStart(2, "0")}:00`,
      <span key="b" className="ad-barcell">
        <i style={{ width: `${Math.round((n / hourMax) * 100)}%` }} />
        {n}
      </span>,
    ]);

  return (
    <main className="pn">
      <div className="ad-top">
        <h1>Analitici</h1>
        <nav className="ad-range" aria-label="Perioada">
          {Object.entries(RANGES).map(([k, r]) => (
            <a key={k} href={`/admin?r=${k}`} className={k === rk ? "on" : undefined}>
              {r.label}
            </a>
          ))}
        </nav>
        <a className="ad-out" href="/api/admin/logout">
          Ieși
        </a>
      </div>
      {searchParams.ok && <p className="ad-flash ok">Raportul a fost trimis pe email și e deschis pentru client.</p>}
      {searchParams.err === "email" && <p className="ad-flash bad">Raportul e aprobat și deschis, dar emailul nu a plecat. Apasă „Retrimite”.</p>}
      {(searchParams.err === "lipsa" || searchParams.err === "date") && <p className="ad-flash bad">Nu am găsit datele cererii.</p>}
      {searchParams.err === "server" && <p className="ad-flash bad">Aprobarea nu a mers. Încearcă din nou; dacă se repetă, spune-mi.</p>}

      <div className="ad-tiles">
        <div className="ad-tile"><b>{st.visitors}</b><span>vizitatori</span></div>
        <div className="ad-tile"><b>{st.sessions.length}</b><span>vizite (sesiuni)</span></div>
        <div className="ad-tile"><b>{pct(st.returning)}</b><span>s-au mai întors</span></div>
        <div className="ad-tile"><b>{st.views}</b><span>pagini deschise</span></div>
        <div className="ad-tile"><b>{fmtDur(st.avgDur)}</b><span>timp mediu pe vizită{st.medDur ? `, median ${fmtDur(st.medDur)}` : ""}</span></div>
        <div className="ad-tile"><b>{pct(st.bounce)}</b><span>au plecat sub 10 s fără să facă nimic</span></div>
        <div className="ad-tile"><b>{st.checks.length}</b><span>site-uri verificate</span></div>
        <div className="ad-tile"><b>{st.avgScore ?? "—"}</b><span>scor mediu la verificări</span></div>
        <div className="ad-tile"><b>{st.reportsOpened}</b><span>rapoarte deschise</span></div>
        <div className="ad-tile"><b>{st.requests}</b><span>cereri de raport complet</span></div>
        <div className="ad-tile"><b>{st.chats}</b><span>apăsări pe WhatsApp sau Telegram</span></div>
        <div className="ad-tile"><b>{st.clicks}</b><span>apăsări în total pe butoanele importante</span></div>
      </div>

      <h2 id="cereri">Cereri de raport complet</h2>
      <Table
        head={["Când", "Site", "Scor", "Client", "Stare", "Acțiuni"]}
        num={[2]}
        wide={[3, 5]}
        cards
        rows={requests.slice(0, 60).map((r) => [
          fmtTime(r.t),
          r.host,
          r.score === null ? "—" : <span className={`sc ${tone(r.score)}`}>{r.score}</span>,
          <span key="c">
            {r.email}
            {r.phone && <span className="dim"><br />{r.phone}</span>}
            <span className="dim"><br />cod {r.id.slice(0, 6).toUpperCase()}</span>
          </span>,
          r.status === "aprobat" ? (
            <span key="s">
              <span className="sc good">trimis</span>
              <span className="dim"><br />{r.approvedAt ? fmtTime(r.approvedAt) : ""}{r.error ? ", emailul nu a plecat" : ""}</span>
            </span>
          ) : (
            <span key="s" className="sc mid">așteaptă plata</span>
          ),
          <span key="a" className="ad-actions">
            <a className="pill-btn btn-sm" href={`/r/${r.id}?k=${linkKey(r.id)}`} target="_blank" rel="noopener">
              Vezi raportul
            </a>
            <form method="post" action={`/api/admin/req/${r.id}/approve`}>
              <button className="btn btn-sm" type="submit">
                {r.status === "aprobat" ? "Retrimite" : "Aprobă și trimite"}
              </button>
            </form>
          </span>,
        ])}
        empty="Nicio cerere încă. Apar aici când cineva lasă emailul pe pagina raportului."
      />

      <h2>Pe zile</h2>
      <Table head={["Ziua", "Sesiuni", "Vizitatori", "Verificări", "Cereri", "Chat"]} num={[1, 2, 3, 4, 5]} cards rows={st.byDay.map((d) => [fmtDay(d.day), d.sessions, d.visitors, d.checks, d.requests, d.chats])} />

      <h2>Pe ore (Chișinău)</h2>
      <div className="ad-two">
        <Table head={["Ora", "Sesiuni"]} rows={hourRows(0)} />
        <Table head={["Ora", "Sesiuni"]} rows={hourRows(12)} />
      </div>

      <h2>De unde vin</h2>
      {srcTable(st.bySrc, "Sursa")}
      <h2>Campanii (utm_campaign · utm_content)</h2>
      {srcTable(st.byCmp, "Campania", "Nicio vizită cu utm_campaign în link.")}

      <h2>Site-uri verificate</h2>
      <Table
        head={["Când", "Site", "Scor", "Sursa", "De unde", "Raportul", "Apoi"]}
        num={[2]}
        wide={[6]}
        cards
        rows={st.checks.slice(0, 80).map((c) => [
          fmtTime(c.t),
          c.host,
          c.score === null ? <span className="dim">—</span> : <span className={`sc ${tone(c.score)}`}>{c.score}</span>,
          c.src,
          <span key="w" className="dim">{[c.city || c.country, c.dev].filter(Boolean).join(", ")}</span>,
          c.opened ? `deschis, ${fmtDur(c.reportDur)}` : <span className="dim">nedeschis</span>,
          [c.requested ? "a cerut raportul" : "", ...c.clicks].filter(Boolean).join(", ") || <span className="dim">nimic</span>,
        ])}
        empty="Nicio verificare în perioada asta."
      />

      <div className="ad-two">
        <div>
          <h2>Ce apasă</h2>
          <Table head={["Buton", "Apăsări"]} num={[1]} rows={rowsOf(st.byClick, 20)} />
        </div>
        <div>
          <h2>Pagini</h2>
          <Table head={["Pagina", "Afișări", "Timp", "Scroll", "Ieșiri"]} num={[1, 2, 3, 4]} cards rows={st.byPath.slice(0, 16).map((p) => [p.k, p.n, fmtDur(p.dur), p.scroll ? pct(p.scroll) : "—", p.exits])} />
        </div>
      </div>

      <div className="ad-two">
        <div>
          <h2>Secțiuni văzute pe pagina de acasă</h2>
          <Table head={["Secțiunea", "Vizite"]} num={[1]} rows={st.bySeen.map((r) => [SECTION[r.k] || r.k, r.n])} />
        </div>
        <div>
          <h2>Prima pagină</h2>
          <Table head={["Intrare", "Vizite"]} num={[1]} rows={rowsOf(st.byEntry, 8)} />
          <h2>Ultima pagină</h2>
          <Table head={["Ieșire", "Vizite"]} num={[1]} rows={rowsOf(st.byExit, 8)} />
        </div>
      </div>

      <div className="ad-two">
        <div>
          <h2>Dispozitive</h2>
          <Table head={["Dispozitiv", "Vizite"]} num={[1]} rows={rowsOf(st.byDev)} />
          <h2>Browsere</h2>
          <Table head={["Browser", "Vizite"]} num={[1]} rows={rowsOf(st.byBr, 8)} />
          <h2>În ce aplicație s-a deschis</h2>
          <Table head={["Aplicația", "Vizite"]} num={[1]} rows={rowsOf(st.byApp, 8)} />
        </div>
        <div>
          <h2>Sisteme</h2>
          <Table head={["Sistem", "Vizite"]} num={[1]} rows={rowsOf(st.byOs, 8)} />
          <h2>Lățimea ecranului</h2>
          <Table head={["Ecran", "Vizite"]} num={[1]} rows={rowsOf(st.byScreen, 8)} />
        </div>
      </div>

      <div className="ad-two">
        <div>
          <h2>Țări</h2>
          <Table head={["Țara", "Vizite"]} num={[1]} rows={rowsOf(st.byCountry, 10)} />
          <h2>Orașe</h2>
          <Table head={["Orașul", "Vizite"]} num={[1]} rows={rowsOf(st.byCity, 12)} />
        </div>
        <div>
          <h2>Limba în care au văzut site-ul</h2>
          <Table head={["Limba", "Vizite"]} num={[1]} rows={rowsOf(st.byLang)} />
          <h2>Limba browserului</h2>
          <Table head={["Limba", "Vizite"]} num={[1]} rows={rowsOf(st.byBlang, 10)} />
        </div>
      </div>

      <h2>Ultimele vizite</h2>
      <Table
        head={["Când", "Sursa", "De unde", "Drumul prin site", "Timp", "Scroll", "A făcut"]}
        num={[4, 5]}
        wide={[3, 6]}
        cards
        rows={st.sessions.slice(0, 80).map((s) => [
          <span key="t">
            {fmtTime(s.t)}
            {s.ret && <span className="dim"><br />revenit</span>}
          </span>,
          s.src + (s.cmp ? ` · ${s.cmp}` : ""),
          <span key="w" className="dim">{[s.city || s.country, s.dev, s.app || s.br].filter(Boolean).join(", ")}</span>,
          <span key="p" className="dim">{s.pages.map((p) => `${p.path}${p.rid ? "/…" : ""} ${fmtDur(p.dur)}`).join(" → ") || "—"}</span>,
          fmtDur(s.dur),
          s.scroll ? pct(s.scroll) : "—",
          <span key="d">{[...s.checks.map((c) => `a verificat ${c.host}${c.score !== null ? ` (${c.score})` : ""}`), ...s.requests.map((e) => `a cerut raportul (${e})`), ...s.clicks].join(", ") || <span className="dim">nimic</span>}</span>,
        ])}
        empty="Nicio vizită în perioada asta."
      />

      <p className="ad-note">
        Orele sunt pe Chișinău. O vizită = un tab; după 30 de minute de pauză începe alta. Timpul e numărat doar cât pagina e pe ecran. Vizitele tale nu se numără din browserul în care ai intrat aici. Reclamele din Meta apar ca „Meta (reclamă)” după fbclid chiar și fără UTM; ca să vezi și campania, pune pe link{" "}
        <code>?utm_source=facebook&amp;utm_medium=cpc&amp;utm_campaign=numele-campaniei&amp;utm_content=reclama-1</code>.
      </p>
    </main>
  );
}
