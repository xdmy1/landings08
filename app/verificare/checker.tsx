"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type StepKey = "read" | "speed" | "google" | "ai";
type State = "wait" | "run" | "done" | "fail";

const STEPS: { key: StepKey; label: string; note: string }[] = [
  { key: "read", label: "Citim site-ul", note: "texte, linkuri, SEO, siguranță" },
  { key: "speed", label: "Măsurăm viteza pe telefon și calculator", note: "Google PageSpeed" },
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
};

const post = async (url: string, body?: unknown) => {
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}) });
  const j = await r.json().catch(() => ({}));
  return { ok: r.ok && j.ok !== false, status: r.status, j } as { ok: boolean; status: number; j: { id?: string; error?: string; ok?: boolean } };
};

export default function Checker() {
  const [url, setUrl] = useState("");
  const [kw, setKw] = useState("");
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
      void start(u, "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const set = (k: StepKey, v: State) => setSt((s) => ({ ...s, [k]: v }));

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    await start(url, kw);
  }

  async function start(url: string, kw: string) {
    setErr("");
    if (url.trim().length < 4) return setErr(ERR.url);
    setBusy(true);
    setSt({ read: "run", speed: "wait", google: "wait", ai: "wait" });
    setSec(0);
    timer.current = setInterval(() => setSec((s) => s + 1), 1000);
    try {
      const start = await post("/api/audit", { url, keyword: kw });
      if (!start.ok || !start.j.id) {
        set("read", "fail");
        setErr(ERR[start.j.error || "net"] || ERR.net);
        setBusy(false);
        if (timer.current) clearInterval(timer.current);
        return;
      }
      const id = start.j.id;
      set("read", "done");
      set("speed", "run");
      set("google", "run");
      const google = post(`/api/audit/${id}/google`).then((r) => set("google", r.ok ? "done" : "fail"));
      const speed = await post(`/api/audit/${id}/speed`);
      set("speed", speed.ok ? "done" : "fail");
      set("ai", "run");
      const ai = await post(`/api/audit/${id}/analyze`);
      set("ai", ai.ok ? "done" : "fail");
      await google;
      window.location.href = `/verificare/${id}`;
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
        <input className="vr-input sm" type="text" placeholder="Ce caută clienții tăi în Google? (opțional, de ex. mobilă la comandă Chișinău)" value={kw} onChange={(e) => setKw(e.target.value)} disabled={busy} aria-label="Ce caută clienții în Google" />
        {err && <p className="vr-err" role="alert">{err} {/WhatsApp/.test(err) && <a href="https://wa.me/37368327082" target="_blank" rel="noopener">Deschide WhatsApp</a>}</p>}
        {!busy && !err && <p className="vr-hint">Durează în jur de un minut. Nu trebuie cont.</p>}
      </form>

      {busy || st.read !== "wait" ? (
        <>
          <div className="vr-steps" aria-live="polite">
            {STEPS.map((s) => (
              <div key={s.key} className={`vr-step ${st[s.key]}`}>
                <span className="vr-ic">{st[s.key] === "done" ? "✓" : ""}</span>
                {s.label}
                <small>{st[s.key] === "fail" ? "nu a mers, continuăm" : s.note}</small>
              </div>
            ))}
          </div>
          {busy && <p className="vr-time">{sec} s · rămâi pe pagină, raportul se deschide singur</p>}
        </>
      ) : (
        <div className="vr-chips">
          {["Viteză", "SEO", "Design", "Vânzare", "Telefon", "Siguranță", "Poziția în Google"].map((c) => <span key={c}>{c}</span>)}
        </div>
      )}
    </>
  );
}
