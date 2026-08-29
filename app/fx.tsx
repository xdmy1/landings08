"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/* giant hero orb (v2): fibonacci dot sphere at native resolution      */
/* ------------------------------------------------------------------ */

export function HeroOrb() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const N = 1700;
    const pts: Array<[number, number, number]> = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = ga * i;
      pts.push([Math.cos(th) * rad, y, Math.sin(th) * rad]);
    }

    let raf = 0;
    let running = false;
    const tilt = 0.35;
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);

    const loop = (t: number) => {
      const time = t / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.44 * (1 + 0.015 * Math.sin(time * 0.6));
      const rot = time * 0.1;
      const cr = Math.cos(rot);
      const sr = Math.sin(rot);
      for (const [x0, y0, z0] of pts) {
        const x1 = x0 * cr + z0 * sr;
        const z1 = -x0 * sr + z0 * cr;
        const y2 = y0 * ct - z1 * st;
        const z2 = y0 * st + z1 * ct;
        const wob = 1 + 0.018 * Math.sin(3 * Math.atan2(y0, x1) + time * 0.8);
        const px = cx + x1 * R * wob;
        const py = cy + y2 * R * wob;
        const depth = (z2 + 1) / 2;
        ctx.beginPath();
        ctx.arc(px, py, 0.6 + depth * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(18, 18, 14, ${0.025 + depth * depth * 0.22})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="hero-orb-canvas" aria-hidden="true" />;
}
