"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/* ------------------------------------------------------------------ */
/* tokens                                                              */
/* ------------------------------------------------------------------ */

const GROUND = "#FCFCFC";
const INK = "#131316";
const MUTED = "#6E6E76";
const FAINT = "#9A9AA2";
const BORDER = "#EAEAEE";
const ACCENT = "#3D4FE1";
const ACCENT_SOFT = "#EDEFFD";
const SHADOW_SM =
  "0 1px 2px rgba(19,19,22,0.05), 0 6px 20px rgba(19,19,22,0.05)";
const SHADOW_LG =
  "0 2px 4px rgba(19,19,22,0.06), 0 18px 44px rgba(19,19,22,0.10)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* small helpers                                                       */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Caption({ label, name }: { label: string; name: string }) {
  return (
    <p className="mt-3 text-center text-[13px]" style={{ color: FAINT }}>
      {label} —{" "}
      <span className="font-semibold" style={{ color: INK }}>
        {name}
      </span>
    </p>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p
        className="text-[12px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: ACCENT }}
      >
        {eyebrow}
      </p>
      <h2
        className="mt-2 text-3xl font-bold leading-[1.1] tracking-[-0.03em] md:text-4xl"
        style={{ color: INK }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTED }}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

/** Number that springs from 0 when it scrolls into view. */
function CountUp({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 16 });
  const text = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);
  return (
    <span ref={ref} className={className}>
      <motion.span>{text}</motion.span>
    </span>
  );
}

/** Number that rolls smoothly toward its new value on every change. */
function RollingNumber({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 240, damping: 28 });
  const text = useTransform(spring, (v) =>
    Math.round(v).toLocaleString("ro-RO")
  );
  useEffect(() => {
    mv.set(value);
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

/* ------------------------------------------------------------------ */
/* object 1 — seat picker (davo.md style booking demo)                 */
/* ------------------------------------------------------------------ */

const OCCUPIED = new Set(["1B", "2C", "3A", "4D", "5B", "6A"]);
const SEAT_PRICE = 180;
const SEAT_COLS = "ABCD";

function SeatPicker() {
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const total = selected.length * SEAT_PRICE;

  const toggle = (id: string) => {
    if (confirmed) return;
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  };

  const confirm = () => {
    if (selected.length === 0 || confirmed) return;
    setConfirmed(true);
    window.setTimeout(() => {
      setConfirmed(false);
      setSelected([]);
    }, 1700);
  };

  return (
    <div
      className="rounded-2xl border bg-white p-5"
      style={{ borderColor: BORDER, boxShadow: SHADOW_LG }}
    >
      {/* route header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className="text-[15px] font-semibold tracking-[-0.01em]"
            style={{ color: INK }}
          >
            Chisinau → Iasi
          </p>
          <p className="mt-0.5 text-[12px]" style={{ color: MUTED }}>
            vineri, 18:30 · Mercedes Sprinter
          </p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[12px] font-semibold"
          style={{ background: ACCENT_SOFT, color: ACCENT }}
        >
          {SEAT_PRICE} MDL / loc
        </span>
      </div>

      {/* driver strip */}
      <div
        className="mt-4 flex h-7 items-center gap-2 rounded-lg px-3"
        style={{ background: "#F4F4F6" }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke={FAINT}
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 14.5V21M4.5 9.5l5.3 1.8M19.5 9.5l-5.3 1.8" />
        </svg>
        <span
          className="text-[10px] font-medium uppercase tracking-[0.14em]"
          style={{ color: FAINT }}
        >
          sofer
        </span>
      </div>

      {/* seat grid */}
      <div className="mt-4 flex flex-col gap-2">
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <div key={r} className="flex justify-center gap-2">
            {[0, 1, 2, 3].map((c) => {
              const id = `${r + 1}${SEAT_COLS[c]}`;
              const isOcc = OCCUPIED.has(id);
              const isSel = selected.includes(id);
              return (
                <Fragment key={id}>
                  {c === 2 && <div className="w-5" aria-hidden />}
                  <motion.button
                    type="button"
                    disabled={isOcc}
                    onClick={() => toggle(id)}
                    aria-label={`Loc ${id}${isOcc ? " (ocupat)" : ""}`}
                    whileHover={isOcc ? undefined : { scale: 1.1, y: -2 }}
                    whileTap={isOcc ? undefined : { scale: 0.88 }}
                    animate={{
                      backgroundColor: isSel
                        ? ACCENT
                        : isOcc
                        ? "#ECECEF"
                        : "#FFFFFF",
                      color: isSel ? "#FFFFFF" : isOcc ? "#B9B9C1" : "#3A3A41",
                      borderColor: isSel ? ACCENT : BORDER,
                      boxShadow: isSel
                        ? "0 6px 16px rgba(61,79,225,0.35)"
                        : "0 1px 2px rgba(19,19,22,0.07)",
                    }}
                    transition={{ type: "spring", stiffness: 520, damping: 30 }}
                    className="flex h-9 w-9 select-none items-center justify-center rounded-[10px] border text-[11px] font-semibold disabled:cursor-not-allowed"
                  >
                    {id}
                  </motion.button>
                </Fragment>
              );
            })}
          </div>
        ))}
      </div>

      {/* legend */}
      <div className="mt-4 flex items-center justify-center gap-4">
        {[
          { bg: "#FFFFFF", border: BORDER, label: "liber" },
          { bg: ACCENT, border: ACCENT, label: "ales" },
          { bg: "#ECECEF", border: "#ECECEF", label: "ocupat" },
        ].map((l) => (
          <span
            key={l.label}
            className="flex items-center gap-1.5 text-[11px]"
            style={{ color: MUTED }}
          >
            <span
              className="h-3 w-3 rounded-[4px] border"
              style={{ background: l.bg, borderColor: l.border }}
            />
            {l.label}
          </span>
        ))}
      </div>

      {/* total + confirm */}
      <div
        className="mt-4 flex items-center justify-between gap-3 border-t pt-4"
        style={{ borderColor: BORDER }}
      >
        <div>
          <p className="text-[11px]" style={{ color: FAINT }}>
            {selected.length === 1
              ? "1 loc selectat"
              : `${selected.length} locuri selectate`}
          </p>
          <p
            className="text-[19px] font-bold tabular-nums tracking-[-0.02em]"
            style={{ color: INK }}
          >
            <RollingNumber value={total} /> MDL
          </p>
        </div>
        <motion.button
          type="button"
          onClick={confirm}
          disabled={selected.length === 0 && !confirmed}
          whileHover={selected.length > 0 ? { scale: 1.03 } : undefined}
          whileTap={selected.length > 0 ? { scale: 0.96 } : undefined}
          animate={{
            backgroundColor: confirmed
              ? "#16A34A"
              : selected.length > 0
              ? ACCENT
              : "#C9CBD4",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className="relative h-10 min-w-[124px] overflow-hidden rounded-full px-5 text-[13px] font-semibold text-white disabled:cursor-not-allowed"
          style={{
            boxShadow:
              selected.length > 0 || confirmed
                ? "0 8px 20px rgba(61,79,225,0.30)"
                : "none",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {confirmed ? (
              <motion.span
                key="ok"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="flex items-center justify-center gap-1.5"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Rezervat
              </motion.span>
            ) : (
              <motion.span
                key="go"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="block"
              >
                Confirma
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* object 2 — ERP invoice feed (inter-bus style)                       */
/* ------------------------------------------------------------------ */

type InvStatus = "Achitat" | "In asteptare";
type Invoice = {
  id: number;
  nr: string;
  client: string;
  suma: number;
  status: InvStatus;
};

const INVOICE_POOL: { client: string; suma: number; status: InvStatus }[] = [
  { client: "AutoService Prim", suma: 4820, status: "Achitat" },
  { client: "MotorTech SRL", suma: 1260, status: "In asteptare" },
  { client: "Garaj 47", suma: 3480, status: "Achitat" },
  { client: "TransComert", suma: 890, status: "Achitat" },
  { client: "AutoMar SRL", suma: 2150, status: "In asteptare" },
  { client: "Piese Vest", suma: 5600, status: "Achitat" },
  { client: "MoldTrans Grup", suma: 1975, status: "Achitat" },
];

function StatusChip({ status }: { status: InvStatus }) {
  const paid = status === "Achitat";
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{
        background: paid ? "#E7F6EC" : "#FCF3E1",
        color: paid ? "#15803D" : "#A16207",
      }}
    >
      {status}
    </span>
  );
}

function InvoiceCard() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const nextIdx = useRef(4);
  const [rows, setRows] = useState<Invoice[]>(() =>
    INVOICE_POOL.slice(0, 4).map((c, i) => ({
      id: i,
      nr: `INV-${2841 + i}`,
      ...c,
    }))
  );

  useEffect(() => {
    if (!inView || reduced) return;
    const t = window.setInterval(() => {
      setRows((prev) => {
        const i = nextIdx.current;
        nextIdx.current += 1;
        const c = INVOICE_POOL[i % INVOICE_POOL.length];
        return [{ id: i, nr: `INV-${2841 + i}`, ...c }, ...prev].slice(0, 4);
      });
    }, 2600);
    return () => window.clearInterval(t);
  }, [inView, reduced]);

  const total = rows.reduce((s, r) => s + r.suma, 0);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col rounded-2xl border bg-white p-5"
      style={{ borderColor: BORDER, boxShadow: SHADOW_SM }}
    >
      <div className="flex items-center justify-between">
        <p
          className="text-[14px] font-semibold tracking-[-0.01em]"
          style={{ color: INK }}
        >
          Facturi recente
        </p>
        <span className="flex items-center gap-2 text-[11px]" style={{ color: MUTED }}>
          <span className="relative flex h-2 w-2">
            {!reduced && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "#22C55E" }}
                animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span
              className="relative h-2 w-2 rounded-full"
              style={{ background: "#22C55E" }}
            />
          </span>
          live
        </span>
      </div>

      <div className="mt-3 flex-1 [&>div:last-child]:border-0">
        <AnimatePresence mode="popLayout" initial={false}>
          {rows.map((r) => (
            <motion.div
              layout
              key={r.id}
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="flex items-center gap-3 border-b py-2.5"
              style={{ borderColor: BORDER }}
            >
              <span
                className="w-[68px] shrink-0 text-[12px] tabular-nums"
                style={{ color: FAINT }}
              >
                {r.nr}
              </span>
              <span
                className="flex-1 truncate text-[13px] font-medium"
                style={{ color: INK }}
              >
                {r.client}
              </span>
              <span
                className="text-[13px] font-semibold tabular-nums"
                style={{ color: INK }}
              >
                {r.suma.toLocaleString("ro-RO")} MDL
              </span>
              <StatusChip status={r.status} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div
        className="mt-3 flex items-center justify-between border-t pt-3"
        style={{ borderColor: BORDER }}
      >
        <span className="text-[12px]" style={{ color: MUTED }}>
          Stoc sincronizat · 1.240 articole
        </span>
        <span
          className="text-[13px] font-bold tabular-nums"
          style={{ color: INK }}
        >
          <RollingNumber value={total} /> MDL
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* object 3 — stats module                                             */
/* ------------------------------------------------------------------ */

const BARS = [18, 24, 21, 30, 36, 32, 44, 50, 58, 66, 78, 92];

function StatsCard() {
  return (
    <div
      className="flex h-full flex-col rounded-2xl border bg-white p-5"
      style={{ borderColor: BORDER, boxShadow: SHADOW_SM }}
    >
      <div className="flex items-center justify-between">
        <p
          className="text-[14px] font-semibold tracking-[-0.01em]"
          style={{ color: INK }}
        >
          Trafic organic
        </p>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
          style={{ background: "#E7F6EC", color: "#15803D" }}
        >
          ultimele 12 luni
        </span>
      </div>

      <p
        className="mt-3 text-4xl font-bold tabular-nums tracking-[-0.03em]"
        style={{ color: INK }}
      >
        <CountUp to={300} suffix="%" />
      </p>
      <p className="mt-1 text-[12px]" style={{ color: MUTED }}>
        crestere medie a traficului
      </p>

      <div className="mt-4 flex h-16 items-end gap-1.5">
        {BARS.map((v, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: EASE }}
            className="flex-1 rounded-t-[4px] origin-bottom"
            style={{
              height: `${v}%`,
              background: i === BARS.length - 1 ? ACCENT : ACCENT_SOFT,
            }}
          />
        ))}
      </div>

      <div
        className="mt-auto grid grid-cols-2 gap-3 border-t pt-4"
        style={{ borderColor: BORDER }}
      >
        <div>
          <p
            className="text-xl font-bold tabular-nums tracking-[-0.02em]"
            style={{ color: INK }}
          >
            <CountUp to={50} suffix="+" />
          </p>
          <p className="text-[11px]" style={{ color: MUTED }}>
            site-uri lansate
          </p>
        </div>
        <div>
          <p
            className="text-xl font-bold tabular-nums tracking-[-0.02em]"
            style={{ color: INK }}
          >
            <CountUp to={10} suffix="+" />
          </p>
          <p className="text-[11px]" style={{ color: MUTED }}>
            sisteme in productie
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* object 4 — screenshot cards in browser frames                       */
/* ------------------------------------------------------------------ */

function ShotCard({
  src,
  url,
  alt,
}: {
  src: string;
  url: string;
  alt: string;
}) {
  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        whileHover={{ y: -6, rotateX: 1.6, rotateY: -1.6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="overflow-hidden rounded-[14px] border bg-white"
        style={{ borderColor: BORDER, boxShadow: SHADOW_SM }}
      >
        <div
          className="flex items-center gap-2 border-b px-3.5 py-2.5"
          style={{ borderColor: BORDER, background: "#FAFAFB" }}
        >
          <span className="flex gap-1.5">
            {["#E9E9EC", "#E9E9EC", "#E9E9EC"].map((c, i) => (
              <span
                key={i}
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: c }}
              />
            ))}
          </span>
          <span
            className="ml-1 flex-1 truncate rounded-md px-2.5 py-1 text-center text-[11px] font-medium"
            style={{ background: "#F1F1F3", color: MUTED }}
          >
            {url}
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* decorative chip filter row                                          */
/* ------------------------------------------------------------------ */

const CHIPS = ["Toate", "Site-uri", "Rezervari", "ERP", "SEO & Ads", "Motion"];

function ChipRow() {
  const [active, setActive] = useState(CHIPS[0]);
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {CHIPS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setActive(c)}
          className="relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200"
          style={{
            border: `1px solid ${active === c ? "transparent" : BORDER}`,
          }}
        >
          {active === c && (
            <motion.span
              layoutId="chip-bg"
              className="absolute inset-0 rounded-full"
              style={{ background: INK }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
          <span
            className="relative z-10 transition-colors duration-200"
            style={{ color: active === c ? "#FFFFFF" : MUTED }}
          >
            {c}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* services                                                            */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    title: "Site-uri custom-codate",
    desc: "Scrise de la zero, fara sabloane si fara WordPress. Rapide, sigure si gandite sa vanda, nu doar sa arate bine.",
    meta: "de la 350 EUR · livrare 1-4 saptamani",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
      </svg>
    ),
  },
  {
    title: "SEO & Ads",
    desc: "Optimizare tehnica, continut si campanii Meta & Google Ads. Clientii nostri cresc in medie cu 300% in trafic.",
    meta: "+300% trafic mediu",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
      </svg>
    ),
  },
  {
    title: "Sisteme de business",
    desc: "Rezervari cu alegerea locului, facturare, stoc si ERP. 10+ sisteme custom care ruleaza azi in productie.",
    meta: "rezervari · facturare · stoc",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

const LOGOS = [
  "davo",
  "interbus",
  "cmiea",
  "glg",
  "radx",
  "eurogard",
  "rizzaclassic",
  "autohuse",
];

const STEPS = [
  { n: "01", t: "Discutie", d: "Intelegem afacerea si obiectivele tale." },
  { n: "02", t: "Design", d: "Propunere vizuala concreta, in cateva zile." },
  { n: "03", t: "Cod", d: "Scris de la zero: curat, rapid, al tau." },
  { n: "04", t: "Lansare", d: "Live in 1-4 saptamani, cu SEO din prima zi." },
];

export default function PreviewA() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: GROUND,
        color: INK,
        fontFamily:
          "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* fonts + page-local css */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`html { scroll-behavior: smooth; } ::selection { background: ${ACCENT}; color: #fff; }`}</style>

      {/* nav */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: BORDER, background: "rgba(252,252,252,0.8)" }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center">
            <Image
              src="/images/logowhite.png"
              alt="landings.md"
              width={130}
              height={28}
              className="h-5 w-auto"
              style={{ filter: "brightness(0)" }}
              priority
            />
          </a>
          <nav
            className="hidden items-center gap-7 text-[13px] font-medium md:flex"
            style={{ color: MUTED }}
          >
            <a href="#lucrari" className="transition-colors hover:text-[#131316]">
              Lucrari
            </a>
            <a href="#servicii" className="transition-colors hover:text-[#131316]">
              Servicii
            </a>
            <a href="#proces" className="transition-colors hover:text-[#131316]">
              Proces
            </a>
            <a href="#contact" className="transition-colors hover:text-[#131316]">
              Contact
            </a>
          </nav>
          <motion.a
            href="mailto:contact@landings.md?subject=Solicitare oferta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-white"
            style={{ background: INK }}
          >
            Solicita oferta
          </motion.a>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[620px]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(19,19,22,0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black 30%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 30%, transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex justify-center"
          >
            <span
              className="flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-[12px] font-medium"
              style={{ borderColor: BORDER, color: MUTED, boxShadow: SHADOW_SM }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#22C55E" }}
              />
              Disponibili pentru proiecte noi
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mx-auto mt-6 max-w-3xl text-center text-4xl font-bold leading-[1.06] tracking-[-0.035em] md:text-6xl"
          >
            <span style={{ color: INK }}>Construim site-ul. Il ducem in top.</span>{" "}
            <span style={{ color: "#A5A5AD" }}>Automatizam restul.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed md:text-base"
            style={{ color: MUTED }}
          >
            Agentie din Chisinau. Site-uri custom-codate, SEO si campanii de
            ads, sisteme de rezervari, facturare si ERP — pentru afaceri care
            vor rezultate, nu doar o prezenta online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[12px] font-medium"
            style={{ color: FAINT }}
          >
            <span>de la 350 EUR</span>
            <span aria-hidden>·</span>
            <span>livrare 1-4 saptamani</span>
            <span aria-hidden>·</span>
            <span>50+ proiecte lansate</span>
          </motion.div>

          {/* centerpiece: seat picker */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              delay: 0.3,
            }}
            className="relative mx-auto mt-12 w-full max-w-[400px]"
          >
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(61,79,225,0.10), transparent)",
              }}
            />
            <SeatPicker />
            <Caption
              label="demo interactiv · sistem rezervari cu alegerea locului"
              name="davo.md"
            />
          </motion.div>
        </div>
      </section>

      {/* client logos */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        <Reveal>
          <p
            className="text-center text-[12px] font-medium uppercase tracking-[0.16em]"
            style={{ color: FAINT }}
          >
            Alaturi de 50+ afaceri din Moldova si Europa
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {LOGOS.map((l) => (
              <Image
                key={l}
                src={`/images/logos/${l}.png`}
                alt={l}
                width={120}
                height={32}
                className="h-6 w-auto object-contain opacity-40 transition-opacity duration-200 hover:opacity-80"
                style={{ filter: "brightness(0)" }}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* gallery */}
      <section id="lucrari" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
        <SectionHead
          eyebrow="Lucrari selectate"
          title="O galerie de obiecte construite cu grija"
          sub="Site-ul, sistemul din spate si cifrele care il sustin — fiecare piesa e cod scris de noi, in productie la clienti reali."
        />

        <Reveal delay={0.1} className="mt-8">
          <ChipRow />
        </Reveal>

        {/* screenshots row */}
        <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">
          <Reveal>
            <ShotCard
              src="/images/shot-davo.jpg"
              url="davo.md"
              alt="Site Davo — transport si rezervari"
            />
            <Caption label="transport & rezervari online" name="davo.md" />
          </Reveal>
          <Reveal delay={0.08}>
            <ShotCard
              src="/images/shot-cmiea.jpg"
              url="cmiea.md"
              alt="Platforma educationala CMIEA"
            />
            <Caption label="platforma de educatie" name="cmiea.md" />
          </Reveal>
          <Reveal delay={0.16}>
            <ShotCard
              src="/images/shot-glg.jpg"
              url="glg.md"
              alt="Site Scoala Auto GLG — programari lectii"
            />
            <Caption label="programari lectii" name="scoala auto glg" />
          </Reveal>
        </div>

        {/* interactive modules row */}
        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <InvoiceCard />
            <Caption label="ERP facturare & stoc" name="inter-bus.md" />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-2">
            <StatsCard />
            <Caption label="rezultate masurate" name="google analytics" />
          </Reveal>
        </div>
      </section>

      {/* services */}
      <section
        id="servicii"
        className="scroll-mt-20 border-t py-24"
        style={{ borderColor: BORDER, background: "#FFFFFF" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            eyebrow="Servicii"
            title="Trei lucruri, facute foarte bine"
            sub="Nu vindem pachete umflate. Construim exact ce ii trebuie afacerii tale ca sa creasca."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="flex h-full flex-col rounded-2xl border p-6"
                  style={{
                    borderColor: BORDER,
                    background: GROUND,
                    boxShadow: SHADOW_SM,
                  }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: ACCENT_SOFT, color: ACCENT }}
                  >
                    {s.icon}
                  </span>
                  <h3
                    className="mt-4 text-[17px] font-semibold tracking-[-0.01em]"
                    style={{ color: INK }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 flex-1 text-[14px] leading-relaxed"
                    style={{ color: MUTED }}
                  >
                    {s.desc}
                  </p>
                  <p
                    className="mt-4 border-t pt-3 text-[12px] font-medium"
                    style={{ borderColor: BORDER, color: FAINT }}
                  >
                    {s.meta}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* statement + process */}
      <section
        id="proces"
        className="scroll-mt-20 border-t py-24"
        style={{ borderColor: BORDER }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
              <span style={{ color: INK }}>Fara sabloane.</span>{" "}
              <span style={{ color: "#A5A5AD" }}>Fara compromisuri.</span>
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed"
              style={{ color: MUTED }}
            >
              Fiecare proiect e scris de la zero si dus pana la capat: design,
              cod, SEO si sistemele care iti tin afacerea in miscare.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div
                  className="h-full rounded-2xl border bg-white p-5"
                  style={{ borderColor: BORDER, boxShadow: SHADOW_SM }}
                >
                  <p
                    className="text-[12px] font-bold tabular-nums"
                    style={{ color: ACCENT }}
                  >
                    {step.n}
                  </p>
                  <p
                    className="mt-2 text-[15px] font-semibold"
                    style={{ color: INK }}
                  >
                    {step.t}
                  </p>
                  <p
                    className="mt-1.5 text-[13px] leading-relaxed"
                    style={{ color: MUTED }}
                  >
                    {step.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* contact CTA */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border bg-white px-6 py-16 text-center md:py-20"
            style={{ borderColor: BORDER, boxShadow: SHADOW_LG }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(19,19,22,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                maskImage:
                  "radial-gradient(closest-side at 50% 0%, black, transparent)",
                WebkitMaskImage:
                  "radial-gradient(closest-side at 50% 0%, black, transparent)",
              }}
            />
            <div className="relative">
              <h2
                className="mx-auto max-w-xl text-3xl font-bold leading-[1.1] tracking-[-0.03em] md:text-4xl"
                style={{ color: INK }}
              >
                Construim si pentru tine.
              </h2>
              <p
                className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed"
                style={{ color: MUTED }}
              >
                Scrie-ne ce vinzi si iti raspundem in aceeasi zi cu o propunere
                concreta — cu tot cu pret si termen.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  href="mailto:contact@landings.md?subject=Solicitare oferta"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  className="rounded-full px-6 py-3 text-[14px] font-semibold text-white"
                  style={{
                    background: INK,
                    boxShadow: "0 10px 24px rgba(19,19,22,0.20)",
                  }}
                >
                  contact@landings.md
                </motion.a>
                <motion.a
                  href="tel:+37368327082"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  className="rounded-full border bg-white px-6 py-3 text-[14px] font-semibold"
                  style={{ borderColor: BORDER, color: INK }}
                >
                  +373 683 27 082
                </motion.a>
              </div>
              <p className="mt-6 text-[12px] font-medium" style={{ color: FAINT }}>
                de la 350 EUR · livrare 1-4 saptamani · Chisinau, Moldova
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* footer */}
      <footer className="border-t" style={{ borderColor: BORDER }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logowhite.png"
              alt="landings.md"
              width={110}
              height={24}
              className="h-4 w-auto"
              style={{ filter: "brightness(0)", opacity: 0.8 }}
            />
            <span className="text-[12px]" style={{ color: FAINT }}>
              © 2026 landings.md
            </span>
          </div>
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium"
            style={{ color: MUTED }}
          >
            <a
              href="mailto:contact@landings.md"
              className="transition-colors hover:text-[#131316]"
            >
              contact@landings.md
            </a>
            <a
              href="tel:+37368327082"
              className="transition-colors hover:text-[#131316]"
            >
              +373 683 27 082
            </a>
            <span style={{ color: FAINT }}>Chisinau, Moldova</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
