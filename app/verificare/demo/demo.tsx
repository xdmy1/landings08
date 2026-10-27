"use client";

import { useEffect } from "react";

export default function Demo() {
  useEffect(() => {
    const v = new URLSearchParams(location.search).get("v");
    const view = v === "free" ? "free" : "demo";
    // ?s=landings opens .data/demo-landings.json instead of the sample
    const s = (new URLSearchParams(location.search).get("s") || "sample").replace(/[^a-z0-9-]/gi, "") || "sample";
    fetch(`/api/audit/demo?s=${s}`)
      .then((r) => r.json())
      .then(({ deep, ...parts }) => {
        const rid = s === "sample" ? "demosample01" : `demo${s}`.slice(0, 12);
        localStorage.setItem(`lmd-audit:${rid}`, JSON.stringify(parts));
        localStorage.removeItem(`lmd-paid:${rid}`);
        // ?v=run leaves the paid analysis out, so it runs for real as after a payment
        if (deep && v !== "run") localStorage.setItem(`lmd-deep:${rid}`, JSON.stringify(deep));
        else localStorage.removeItem(`lmd-deep:${rid}`);
        location.replace(`/verificare/raport/${rid}?payId=${view}`);
      });
  }, []);
  return <p style={{ padding: 120, fontFamily: "Switzer, sans-serif" }}>Se încarcă raportul de probă…</p>;
}
