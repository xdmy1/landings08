"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type StepKey = "read" | "speed" | "google" | "ai";
type State = "wait" | "run" | "done" | "fail";

const STEPS: { key: StepKey; label: string; note: string }[] = [
  { key: "read", label: "Citim site-ul", note: "texte, linkuri, SEO, siguranță" },
  { key: "speed", label: "Măsurăm viteza și facem poze pe telefon și calculator", note: "Google PageSpeed" },
  { key: "google", label: "Căutăm site-ul în Google", note: "ce caută clienții din Moldova" },
  { key: "ai", label: "Analizăm designul și cât de bine vinde", note: "ca un designer și un consultant" },
];

const ERR: Record<string, string> = {
  url: "Adresa nu pare corectă. Scrie-o așa: exemplu.md",
  unreachable: "Nu am putut deschide site-ul. Verifică adresa și încearcă din nou.",
  limit_ip: "Ai făcut deja 5 verificări azi. Revino mâine sau scrie-ne pe WhatsApp.",
  limit_site: "Azi au fost prea multe verificări. Revino mâine sau scrie-ne pe WhatsApp.",
  not_configured: "Verificarea pornește în curând. Până atunci, scrie-ne pe WhatsApp și verificăm noi site-ul.",
  net: "Nu am putut trimite cererea. Verifică internetul și încearcă din nou.",
  own: "Site-ul ăsta e făcut de noi, la landings.md, așa că nu îl evaluăm singuri. Vrei unul la fel? Scrie-ne pe WhatsApp.",
};

const post = async (url: string, body?: unknown) => {
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}) });
  const j = await r.json().catch(() => ({}));
  return { ok: r.ok && j.ok !== false, status: r.status, j } as { ok: boolean; status: number; j: { error?: string; ok?: boolean } };
};

export default function Checker() {
  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [st, setSt] = useState<Record<StepKey, State>>({ read: "wait", speed: "wait", google: "wait", ai: "wait" });
  const [sec, setSec] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  // arriving from the form on the home page: start right away
  const q = useSearchParams();
  const auto = useRef(false);
  useEffect(() => {
    const u = q.get("u");
    if (u && !auto.current) {
      auto.current = true;
      setUrl(u);
      void start(u);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const set = (k: StepKey, v: State) => setSt((s) => ({ ...s, [k]: v }));

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    await start(url);
  }

  async function start(url: string) {
    setErr("");
    if (url.trim().length < 4) return setErr(ERR.url);
    setBusy(true);
    setSt({ read: "run", speed: "wait", google: "wait", ai: "wait" });
    setSec(0);
    timer.current = setInterval(() => setSec((s) => s + 1), 1000);
    try {
      const start = await post("/api/audit", { url });
      const base = (start.j as { base?: string }).base;
      const rid = (start.j as { rid?: string }).rid;
      if (!start.ok || !base || !rid) {
        set("read", "fail");
        setErr(ERR[start.j.error || "net"] || ERR.net);
        setBusy(false);
        if (timer.current) clearInterval(timer.current);
        return;
      }
      set("read", "done");
      set("speed", "run");
      set("google", "run");
      const parts: Record<string, unknown> = { base };
      const google = post("/api/audit/google", { base }).then((r) => {
        const g = (r.j as { google?: string }).google;
        if (g) parts.google = g;
        set("google", r.ok ? "done" : "fail");
      });
      const [speed, shots] = await Promise.all([post("/api/audit/speed", { base }), post("/api/audit/shots", { base })]);
      const sp = (speed.j as { speed?: string }).speed;
      if (sp) parts.speed = sp;
      const sh = (shots.j as { shots?: unknown }).shots;
      if (sh) parts.shots = sh;
      set("speed", speed.ok || shots.ok ? "done" : "fail");
      set("ai", "run");
      const ai = await post("/api/audit/analyze", { base, speed: parts.speed, shots: parts.shots });
      const an = (ai.j as { analysis?: string }).analysis;
      if (an) parts.analysis = an;
      set("ai", ai.ok ? "done" : "fail");
      await google;
      // no database: the sealed report stays in this browser
      try {
        localStorage.setItem(`lmd-audit:${rid}`, JSON.stringify(parts));
      } catch {
        sessionStorage.setItem(`lmd-audit:${rid}`, JSON.stringify(parts));
      }
      window.location.href = `/verificare/raport/${rid}`;
    } catch {
      setErr(ERR.net);
      setBusy(false);
      if (timer.current) clearInterval(timer.current);
    }
  }

  return (
    <>
      <form className="vr-form" onSubmit={run} noValidate>
        <div className="vr-row">
          <input className="vr-input" type="text" inputMode="url" autoComplete="url" placeholder="Adresa site-ului tău, de ex. exemplu.md" value={url} onChange={(e) => setUrl(e.target.value)} disabled={busy} aria-label="Adresa site-ului" />
          <button className="btn" type="submit" disabled={busy}>{busy ? "Se verifică…" : "Verifică gratuit"}</button>
        </div>
        {err && <p className="vr-err" role="alert">{err} {/WhatsApp/.test(err) && <a href="https://wa.me/37368327082" target="_blank" rel="noopener">Deschide WhatsApp</a>}</p>}
        {!busy && !err && <p className="vr-hint">Durează în jur de un minut. Nu trebuie cont.</p>}
      </form>

      {busy || st.read !== "wait" ? (
        <>
          <div className="vr-steps" aria-live="polite">
            {STEPS.map((s) => (
              <div key={s.key} className={`vr-step ${st[s.key]}`}>
                <span className="vr-ic">
                  {st[s.key] === "done" && (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </span>
                <span className="vr-step-text">
                  {s.label}
                  <small>{st[s.key] === "fail" ? "nu a mers, continuăm" : s.note}</small>
                </span>
              </div>
            ))}
          </div>
          {busy && <p className="vr-time">{sec} s · rămâi pe pagină, raportul se deschide singur</p>}
        </>
      ) : (
        <div className="vr-chips">
          {["Viteză", "SEO", "Design", "Vânzare", "Telefon", "Siguranță", "Poziția în Google"].map((c) => <span className="tag" key={c}>{c}</span>)}
        </div>
      )}
    </>
  );
}
