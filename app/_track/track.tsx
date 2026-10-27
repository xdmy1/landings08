"use client";

/* The site's own visit log: a beacon when a page opens, short "still here"
   beacons while it is read (time in front of them, how far down, which
   sections came into view), one when it is left, one per button that matters.
   No cookie banner needed: random ids only, no personal data. */

import { useEffect } from "react";

const rnd = () => Math.random().toString(36).slice(2, 12);

function cookie(name: string, value: string, maxAge?: number) {
  document.cookie = `${name}=${value}; path=/; SameSite=Lax${maxAge ? `; max-age=${maxAge}` : ""}${location.protocol === "https:" ? "; Secure" : ""}`;
}

/* which links count as a step toward a client */
function label(a: HTMLElement): string {
  const t = a.dataset.track;
  if (t) return t;
  const href = a.getAttribute("href") || "";
  if (!href) return "";
  if (/wa\.me|whatsapp/i.test(href)) return "WhatsApp";
  if (/t\.me\//i.test(href)) return "Telegram";
  if (/instagram\.com/i.test(href)) return "Instagram";
  if (/^mailto:/i.test(href)) return "Email";
  if (/^tel:/i.test(href)) return "Telefon";
  if (href === "#contact" || href === "/#contact") return "Cere o ofertă";
  if (/^\/verificare\/?$/.test(href)) return "Verifică site-ul";
  if (/^\/plata\/([a-z]+)/.test(href)) return `Plata: ${href.split("/")[2]}`;
  if (/^https?:\/\//.test(href) && !href.includes(location.host)) {
    try {
      return `Proiect: ${new URL(href).host.replace(/^www\./, "")}`;
    } catch {
      return "";
    }
  }
  return "";
}

declare global {
  interface Window {
    __lmdPv?: string;
  }
}

export default function Track() {
  useEffect(() => {
    try {
      if (
        location.pathname.startsWith("/admin") ||
        location.pathname.startsWith("/r/")
      )
        return;
      if (document.cookie.includes("lmd_me=1")) return; // the studio's own visits
      if (
        /bot|crawl|spider|headless|lighthouse|pagespeed/i.test(
          navigator.userAgent,
        )
      )
        return;
      /* React mounts twice in development: one page load = one view, whatever the mounts */
      const first = !window.__lmdPv;
      const pv = window.__lmdPv || rnd();
      window.__lmdPv = pv;
      const had = localStorage.getItem("lmd_v");
      const vid = had || rnd();
      if (!had) localStorage.setItem("lmd_v", vid);
      let sid = sessionStorage.getItem("lmd_s");
      if (!sid) {
        sid = rnd();
        sessionStorage.setItem("lmd_s", sid);
      }
      cookie("lmd_v", vid, 31536000);
      cookie("lmd_s", sid);
      const q = new URLSearchParams(location.search);
      let ref = "";
      try {
        ref = document.referrer ? new URL(document.referrer).host : "";
      } catch {
        ref = "";
      }
      if (ref === location.host) ref = "";
      const base = {
        sid,
        vid,
        pv,
        path: location.pathname,
        lang: document.documentElement.lang || "",
      };
      const send = (k: string, extra: Record<string, unknown> = {}) => {
        const body = JSON.stringify({ k, ...base, ...extra });
        if (!navigator.sendBeacon || !navigator.sendBeacon("/api/t", body))
          fetch("/api/t", { method: "POST", body, keepalive: true }).catch(
            () => {},
          );
      };
      if (first)
        send("view", {
          ref,
          src: q.get("utm_source") || "",
          med: q.get("utm_medium") || "",
          cmp: q.get("utm_campaign") || "",
          cnt: q.get("utm_content") || "",
          trm: q.get("utm_term") || "",
          ad: q.has("fbclid")
            ? "meta"
            : q.has("gclid")
              ? "google"
              : q.has("ttclid")
                ? "tiktok"
                : "",
          ret: Boolean(had),
          blang: (navigator.language || "").slice(0, 5),
          sw: screen.width || 0,
        });

      /* time in front of them: only while the tab is visible */
      let shown =
        document.visibilityState === "visible" ? performance.now() : 0;
      let total = 0;
      let deepest = 0;
      const seen = new Set<string>();
      let left = false;
      const secs = () =>
        Math.round((total + (shown ? performance.now() - shown : 0)) / 1000);
      const onScroll = () => {
        const h = document.documentElement.scrollHeight;
        deepest =
          h <= innerHeight + 8
            ? 100
            : Math.max(
                deepest,
                Math.min(100, Math.round(((scrollY + innerHeight) / h) * 100)),
              );
      };
      const io = new IntersectionObserver(
        (es) =>
          es.forEach(
            (e) => e.isIntersecting && e.target.id && seen.add(e.target.id),
          ),
        { threshold: 0.3 },
      );
      document
        .querySelectorAll("section[id], main [id]")
        .forEach((el) => io.observe(el));
      const snapshot = () => ({
        dur: secs(),
        scroll: deepest,
        seen: Array.from(seen).slice(0, 24),
      });
      const ping = () => {
        if (!left && document.visibilityState === "visible")
          send("ping", snapshot());
      };
      const onVis = () => {
        if (document.visibilityState === "visible") shown = performance.now();
        else {
          if (shown) total += performance.now() - shown;
          shown = 0;
          if (!left) send("ping", snapshot());
        }
      };
      const leave = () => {
        if (left) return;
        left = true;
        if (shown) total += performance.now() - shown;
        shown = 0;
        send("leave", snapshot());
      };
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement | null)?.closest<HTMLElement>(
          "a, button",
        );
        if (!a) return;
        const to = label(a);
        if (to) send("click", { to });
      };
      onScroll();
      addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVis);
      addEventListener("pagehide", leave);
      document.addEventListener("click", onClick, true);
      /* heartbeats: often at first (most visits are short), then every minute */
      const timers = [
        4000, 8000, 12000, 18000, 25000, 35000, 45000, 60000, 90000, 120000,
      ].map((ms) => setTimeout(ping, ms));
      const every = setInterval(ping, 60000);
      return () => {
        removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVis);
        removeEventListener("pagehide", leave);
        document.removeEventListener("click", onClick, true);
        timers.forEach(clearTimeout);
        clearInterval(every);
        io.disconnect();
      };
    } catch {
      /* private mode or an old browser: the visit just isn't counted */
    }
  }, []);
  return null;
}
