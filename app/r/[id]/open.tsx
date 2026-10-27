"use client";

import { useEffect, useState } from "react";

/* puts an approved report into this browser and opens it, as after a card payment */
export default function Open({ id }: { id: string }) {
  const [err, setErr] = useState(false);
  useEffect(() => {
    const k = new URLSearchParams(location.search).get("k") || "";
    fetch(`/api/admin/req/${id}?k=${encodeURIComponent(k)}`)
      .then((r) => r.json())
      .then((j: { rid?: string; parts?: unknown; deep?: unknown; payId?: string }) => {
        if (!j.rid || !j.parts || !j.payId) return setErr(true);
        localStorage.setItem(`lmd-audit:${j.rid}`, JSON.stringify(j.parts));
        if (j.deep) localStorage.setItem(`lmd-deep:${j.rid}`, JSON.stringify(j.deep));
        else localStorage.removeItem(`lmd-deep:${j.rid}`);
        localStorage.setItem(`lmd-paid:${j.rid}`, j.payId);
        location.replace(`/verificare/raport/${j.rid}?payId=${encodeURIComponent(j.payId)}`);
      })
      .catch(() => setErr(true));
  }, [id]);
  return <p style={{ padding: "120px 24px", fontFamily: "Switzer, sans-serif", fontSize: 17 }}>{err ? "Linkul nu mai e valabil sau raportul nu e încă aprobat. Scrie-ne pe WhatsApp și îl deschidem." : "Se deschide raportul…"}</p>;
}
