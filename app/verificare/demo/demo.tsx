"use client";

import { useEffect } from "react";

export default function Demo() {
  useEffect(() => {
    const view = new URLSearchParams(location.search).get("v") === "free" ? "free" : "demo";
    fetch("/api/audit/demo")
      .then((r) => r.json())
      .then((parts) => {
        const rid = "demosample01";
        localStorage.setItem(`lmd-audit:${rid}`, JSON.stringify(parts));
        localStorage.removeItem(`lmd-paid:${rid}`);
        location.replace(`/verificare/raport/${rid}?payId=${view}`);
      });
  }, []);
  return <p style={{ padding: 120, fontFamily: "Switzer, sans-serif" }}>Se încarcă raportul de probă…</p>;
}
