"use client";

import { useState } from "react";

const ERR: Record<string, string> = {
  name: "Scrie numele.",
  email: "Adresa de email nu e validă.",
  phone: "Numărul de telefon nu e valid.",
  terms: "Bifează acceptarea termenilor.",
  not_configured: "Plata cu cardul pornește în curând. Până atunci, scrie-ne pe WhatsApp și îți trimitem raportul complet.",
  maib: "Plata nu a putut fi pornită. Încearcă din nou peste un minut.",
  paid: "Raportul e deja deblocat. Reîncarcă pagina.",
  net: "Nu am putut trimite datele. Verifică internetul și încearcă din nou.",
};

export default function Unlock({ id, mdl, wa }: { id: string; mdl: number; wa: string }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", accept: false });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const r = await fetch(`/api/audit/${id}/pay`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const j = await r.json().catch(() => ({}));
      if (j.payUrl) {
        window.location.href = j.payUrl;
        return;
      }
      setErr(ERR[j.error] || ERR.net);
    } catch {
      setErr(ERR.net);
    }
    setBusy(false);
  }

  return (
    <form className="co-form" onSubmit={pay} noValidate>
      <label className="co-field">
        <span>Nume și prenume</span>
        <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" />
      </label>
      <label className="co-field">
        <span>Email (aici îți trimitem chitanța)</span>
        <input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" />
      </label>
      <label className="co-field">
        <span>Telefon</span>
        <input type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} autoComplete="tel" />
      </label>
      <label className="co-check">
        <input type="checkbox" checked={f.accept} onChange={(e) => setF({ ...f, accept: e.target.checked })} />
        <span>
          Am citit și accept <a href="/termeni-si-conditii" target="_blank">Termenii și condițiile</a>
        </span>
      </label>
      {err && (
        <p className="co-err" role="alert">
          {err} {/WhatsApp/.test(err) && <a href={wa} target="_blank" rel="noopener">Deschide WhatsApp</a>}
        </p>
      )}
      <button className="btn btn-lg co-pay" type="submit" disabled={busy}>
        {busy ? "Se deschide plata…" : `Deblochează pentru ${mdl} lei`}
      </button>
      <p className="co-secure">Plata se face pe pagina securizată maib, cu 3-D Secure. Raportul se deblochează imediat după plată.</p>
    </form>
  );
}
