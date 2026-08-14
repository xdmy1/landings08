"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Recipe constants — navarro.ro executed literally                    */
/* ------------------------------------------------------------------ */

const LIME = "#c6ff69";

const HAIRLINE =
  "linear-gradient(140deg,rgba(255,255,255,.15),rgba(31,31,31,.8) 24%,rgba(255,255,255,.13) 80%,transparent)";

const SURFACE = "linear-gradient(120deg,#191919,#0b0b0b)";

const GEIST =
  "'Geist',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif";

/* ------------------------------------------------------------------ */
/* Local helpers                                                       */
/* ------------------------------------------------------------------ */

function Hairline({
  radius = 24,
  className = "",
  innerClassName = "",
  style,
  innerStyle,
  children,
}: {
  radius?: number;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{ padding: 1, borderRadius: radius, background: HAIRLINE, ...style }}
    >
      <div
        className={innerClassName}
        style={{
          borderRadius: "inherit",
          background: SURFACE,
          height: "100%",
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Blur-up scroll reveal: opacity 0 + blur(10px) + y20 -> clear, .8s, replays */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] text-white/50">
      <span className="dot-lime" />
      {children}
    </span>
  );
}

function ArrowNE() {
  return (
    <span
      aria-hidden
      style={{ display: "inline-block", transform: "rotate(-45deg)" }}
      className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
    >
      &rarr;
    </span>
  );
}

/* Floating glass badge chip with gradient border */
function Chip({
  className = "",
  float,
  children,
}: {
  className?: string;
  float: "float-a" | "float-b" | "float-c";
  children: ReactNode;
}) {
  return (
    <div className={`${className} ${float}`}>
      <div style={{ padding: 1, borderRadius: 999, background: HAIRLINE }}>
        <div
          className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white/85"
          style={{
            borderRadius: "inherit",
            background:
              "linear-gradient(120deg,rgba(34,34,34,.72),rgba(12,12,12,.6))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <span className="dot-lime" />
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
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
  "droppack",
  "udc",
];

const SERVICES = [
  {
    n: "01",
    title: "Site-uri custom-coded",
    body: "Zero teme, zero constructori. Cod scris de mana pentru viteza si conversie, livrat in 1-4 saptamani, de la 350 EUR.",
    proof: "Davo.md · Rizza Classic · Auto Huse",
  },
  {
    n: "02",
    title: "SEO & Ads",
    body: "Nu doar prezenta — pozitii. Ducem site-ul in top pe cautarile care aduc bani, apoi il tinem acolo.",
    proof: "300% crestere medie a traficului",
  },
  {
    n: "03",
    title: "Sisteme de business",
    body: "Rezervari, facturare, stoc, ERP. Automatizam partea care iti mananca timpul, direct in site-ul tau.",
    proof: "10+ sisteme custom in productie",
  },
];

const WORK = [
  {
    logo: "/images/logos/davo.png",
    name: "Davo.md",
    caption: "Transport / Rezervari",
    shot: "/images/shot-davo.jpg",
    line: "#1 in Moldova la transport online — rezervari cu alegerea locului",
  },
  {
    logo: "/images/logos/interbus.png",
    name: "Inter-Bus",
    caption: "Piese auto / ERP",
    shot: "/images/shot-interbus.jpg",
    line: "Magazin + ERP propriu: facturare si stoc, automatizate complet",
  },
  {
    logo: "/images/logos/cmiea.png",
    name: "CMIEA.md",
    caption: "Educatie / Platforma",
    shot: "/images/shot-cmiea.jpg",
    line: "Platforma care duce educatia continua in online",
  },
];

const STATS = [
  { v: "50+", l: "site-uri lansate" },
  { v: "300%", l: "crestere medie a traficului" },
  { v: "10+", l: "sisteme custom in productie" },
  { v: "1-4", l: "saptamani pana la lansare" },
];

const STEPS = [
  {
    n: "01",
    title: "Descoperire",
    body: "Intelegem business-ul, nu doar brief-ul. Cifre, clienti, concurenta — inainte de orice pixel.",
  },
  {
    n: "02",
    title: "Constructie",
    body: "Design si cod scrise pentru rezultat. Primul preview in cateva zile, nu in luni.",
  },
  {
    n: "03",
    title: "Crestere",
    body: "SEO, ads si automatizari dupa lansare. Nu disparem dupa livrare — crestem cu tine.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function PreviewB() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: "#0d0d0d",
        color: "rgba(255,255,255,.92)",
        fontFamily: GEIST,
        fontWeight: 500,
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .dot-lime{width:6px;height:6px;border-radius:999px;background:${LIME};box-shadow:0 0 10px rgba(198,255,105,.85),0 0 22px rgba(198,255,105,.35);flex:none;display:inline-block}
        .btn-silver{background:linear-gradient(180deg,#cdcdcd,#7a7a7a 48%,#6d6d6d);color:#000;border-radius:999px;font-weight:600;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 10px 26px rgba(0,0,0,.45);transition:box-shadow .25s ease,transform .25s ease}
        .btn-silver:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 0 0 1px rgba(198,255,105,.75),0 0 24px rgba(198,255,105,.3),0 10px 26px rgba(0,0,0,.45)}
        .btn-silver:active{transform:translateY(1px)}
        .btn-ghost{border:1px solid rgba(255,255,255,.16);border-radius:999px;color:rgba(255,255,255,.85);background:linear-gradient(120deg,rgba(28,28,28,.6),rgba(12,12,12,.4));transition:box-shadow .25s ease,border-color .25s ease}
        .btn-ghost:hover{box-shadow:0 0 0 1px rgba(198,255,105,.45),0 0 18px rgba(198,255,105,.15);border-color:transparent}
        .ring-hover{transition:box-shadow .3s ease}
        .ring-hover:hover{box-shadow:0 0 0 1px rgba(198,255,105,.4),0 0 34px rgba(198,255,105,.12)}
        .view-btn{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:8px 16px;font-size:13px;font-weight:600;color:#fff;background:linear-gradient(120deg,rgba(30,30,30,.65),rgba(10,10,10,.55));backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:box-shadow .25s ease}
        .view-btn:hover{box-shadow:0 0 0 1px rgba(198,255,105,.65),0 0 16px rgba(198,255,105,.22)}
        .nav-link{color:rgba(255,255,255,.62);transition:color .2s ease}
        .nav-link:hover{color:#fff}
        .logo-cell img{opacity:.3;filter:grayscale(1) invert(1) brightness(1.4);transition:opacity .25s ease}
        .logo-cell:hover img{opacity:.8}
        .fluted{
          -webkit-backdrop-filter:blur(30px);
          backdrop-filter:blur(30px);
          border-top:1px solid rgba(255,255,255,.28);
          border-radius:20px;
          background:
            repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0px,rgba(255,255,255,.015) 26px,rgba(255,255,255,.055) 54px,rgba(255,255,255,.015) 80px),
            linear-gradient(180deg,rgba(20,20,20,.5),rgba(9,9,9,.66));
          box-shadow:0 24px 60px rgba(0,0,0,.5);
        }
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        .float-a{animation:floatY 3.7s ease-in-out -1.4s infinite}
        .float-b{animation:floatY 4.6s ease-in-out -2.3s infinite}
        .float-c{animation:floatY 5.3s ease-in-out -0.8s infinite}
        @media (prefers-reduced-motion:reduce){.float-a,.float-b,.float-c{animation:none}}
        html{scroll-behavior:smooth}
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <Hairline radius={999}>
          <nav
            className="flex items-center gap-6 py-2 pl-5 pr-2"
            style={{
              borderRadius: "inherit",
              background:
                "linear-gradient(120deg,rgba(25,25,25,.82),rgba(11,11,11,.82))",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <a href="#top" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logowhite.png" alt="landings.md" className="h-5 w-auto" />
            </a>
            <div className="hidden items-center gap-6 text-[14px] md:flex">
              <a className="nav-link" href="#servicii">Servicii</a>
              <a className="nav-link" href="#lucrari">Lucrari</a>
              <a className="nav-link" href="#proces">Proces</a>
              <a className="nav-link" href="#contact">Contact</a>
            </div>
            <a href="mailto:contact@landings.md" className="btn-silver px-5 py-2 text-[14px]">
              Cere oferta
            </a>
          </nav>
        </Hairline>
      </div>

      {/* ---------------- HERO ---------------- */}
      <header id="top" className="relative overflow-hidden px-4 pt-36 md:pt-44">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Reveal>
            <Eyebrow>Agentie web — Chisinau</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="mx-auto mt-6 max-w-4xl"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.05em",
                fontSize: "clamp(46px,7.4vw,80px)",
                lineHeight: 1.02,
              }}
            >
              Construim site-ul.
              <br />
              Il ducem in{" "}
              <span style={{ color: LIME, textShadow: "0 0 26px rgba(198,255,105,.35)" }}>
                top
              </span>
              .
              <br />
              Automatizam restul.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/55">
              Site-uri custom-coded, SEO care aduce clienti si sisteme care iti
              tin business-ul in miscare. 50+ proiecte lansate pentru companii
              din Moldova.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="mailto:contact@landings.md" className="btn-silver px-7 py-3 text-[15px]">
                Cere oferta
              </a>
              <a href="#lucrari" className="btn-ghost px-7 py-3 text-[15px] font-medium">
                Vezi lucrarile
              </a>
            </div>
          </Reveal>
        </div>

        {/* Large Davo screenshot + floating chips + fluted-glass band */}
        <div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          <Reveal>
            <Hairline radius={30} innerStyle={{ overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/shot-davo.jpg"
                alt="Davo.md — platforma de rezervari transport"
                className="aspect-[16/10] w-full object-cover object-top"
                style={{ borderRadius: "inherit" }}
              />
            </Hairline>
          </Reveal>

          <Chip float="float-a" className="absolute -top-5 left-2 z-20 hidden md:block lg:-left-10">
            Livrare in 1-4 saptamani
          </Chip>
          <Chip float="float-b" className="absolute right-2 top-1/4 z-20 hidden md:block lg:-right-12">
            De la 350 EUR
          </Chip>
          <Chip float="float-c" className="absolute -left-4 top-[52%] z-20 hidden md:block lg:-left-16">
            +300% trafic organic
          </Chip>

          <div className="fluted absolute inset-x-4 -bottom-12 z-10 px-6 py-5 md:inset-x-14 md:px-10 md:py-6">
            <div className="grid grid-cols-1 gap-3 text-left md:grid-cols-3 md:gap-8">
              <div>
                <div className="text-[15px] font-semibold text-white">Davo.md</div>
                <div className="mt-0.5 text-[13px] text-white/55">
                  #1 in Moldova la transport online
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-[15px] font-semibold text-white">Rezervari cu alegerea locului</div>
                <div className="mt-0.5 text-[13px] text-white/55">
                  sistem de booking construit de noi
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-[15px] font-semibold text-white">Site + SEO + sistem</div>
                <div className="mt-0.5 text-[13px] text-white/55">
                  un singur partener, tot pachetul
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-28 md:h-32" />
      </header>

      {/* ---------------- LOGOS ---------------- */}
      <section className="px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-[13px] uppercase tracking-[0.14em] text-white/40">
              Companii care lucreaza cu noi
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {LOGOS.map((l) => (
                <span key={l} className="logo-cell">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/logos/${l}.png`} alt={l} className="h-6 w-auto md:h-7" />
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="servicii" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Ce facem</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-4 max-w-2xl"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.05em",
                fontSize: "clamp(32px,4.4vw,52px)",
                lineHeight: 1.05,
              }}
            >
              Trei lucruri. Facute pana la capat.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09}>
                <Hairline radius={26} className="ring-hover h-full" innerClassName="flex h-full flex-col p-7">
                  <span className="text-[13px] font-semibold text-white/35">{s.n}</span>
                  <h3
                    className="mt-5 text-[22px]"
                    style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/55">
                    {s.body}
                  </p>
                  <div
                    className="mt-6 h-px w-full"
                    style={{
                      background:
                        "linear-gradient(90deg,rgba(255,255,255,.14),transparent)",
                    }}
                  />
                  <p className="mt-4 flex items-center gap-2 text-[13px] font-medium text-white/70">
                    <span className="dot-lime" />
                    {s.proof}
                  </p>
                </Hairline>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WORK ---------------- */}
      <section id="lucrari" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <Eyebrow>Lucrari selectate</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2
                  className="mt-4"
                  style={{
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    fontSize: "clamp(32px,4.4vw,52px)",
                    lineHeight: 1.05,
                  }}
                >
                  Proiecte care vand.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-xs text-[14px] leading-relaxed text-white/45">
                Fiecare proiect de mai jos e live, in productie, si aduce
                clienti in fiecare zi.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {WORK.map((w, i) => (
              <Reveal key={w.name} delay={i * 0.09}>
                <div
                  className="ring-hover"
                  style={{ padding: 1, borderRadius: 28, background: HAIRLINE }}
                >
                  <div
                    className="group relative aspect-[9/16] max-h-[560px] w-full overflow-hidden"
                    style={{ borderRadius: "inherit", background: SURFACE }}
                  >
                    {/* full-bleed screenshot */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.shot}
                      alt={w.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    {/* top caption */}
                    <div
                      className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pb-10 pt-4"
                      style={{
                        background:
                          "linear-gradient(180deg,rgba(8,8,8,.85),rgba(8,8,8,.45) 55%,transparent)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={w.logo}
                        alt={`${w.name} logo`}
                        className="h-5 w-auto"
                        style={{ filter: "grayscale(1) invert(1) brightness(1.5)" }}
                      />
                      <span className="text-[12px] uppercase tracking-[0.12em] text-white/60">
                        {w.caption}
                      </span>
                    </div>
                    {/* bottom superlative + view */}
                    <div
                      className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-5 pb-5 pt-14"
                      style={{
                        background:
                          "linear-gradient(0deg,rgba(6,6,6,.92),rgba(6,6,6,.55) 55%,transparent)",
                      }}
                    >
                      <p className="max-w-[70%] text-[14px] font-semibold leading-snug text-white">
                        {w.line}
                      </p>
                      <a href="#contact" className="view-btn group">
                        Vezi <ArrowNE />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="px-4 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.07}>
                <Hairline radius={24} className="h-full" innerClassName="flex h-full flex-col p-6">
                  <span
                    style={{
                      fontWeight: 700,
                      letterSpacing: "-0.05em",
                      fontSize: "clamp(36px,4vw,52px)",
                      lineHeight: 1,
                    }}
                  >
                    {s.v}
                  </span>
                  <span className="mt-3 flex items-center gap-2 text-[13px] text-white/55">
                    <span className="dot-lime" />
                    {s.l}
                  </span>
                </Hairline>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section id="proces" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Cum lucram</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-4 max-w-3xl"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.05em",
                fontSize: "clamp(32px,4.4vw,52px)",
                lineHeight: 1.05,
              }}
            >
              Nu vindem site-uri. Construim{" "}
              <span style={{ color: LIME, textShadow: "0 0 24px rgba(198,255,105,.3)" }}>
                motoare
              </span>{" "}
              de vanzari.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09}>
                <Hairline radius={26} className="ring-hover h-full" innerClassName="h-full p-7">
                  <span className="text-[13px] font-semibold text-white/35">{s.n}</span>
                  <h3
                    className="mt-5 text-[20px]"
                    style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/55">{s.body}</p>
                </Hairline>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT CTA ---------------- */}
      <section id="contact" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Hairline radius={30} innerClassName="relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-24">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-40 w-[420px] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    "radial-gradient(closest-side,rgba(198,255,105,.14),transparent)",
                }}
              />
              <Eyebrow>Incepem?</Eyebrow>
              <h2
                className="mx-auto mt-5 max-w-2xl"
                style={{
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                  fontSize: "clamp(34px,5vw,58px)",
                  lineHeight: 1.04,
                }}
              >
                Spune-ne ce construim.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-white/55">
                Raspundem in aceeasi zi. Primul preview — in cateva zile, nu in
                saptamani. De la 350 EUR.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a href="mailto:contact@landings.md" className="btn-silver px-7 py-3 text-[15px]">
                  contact@landings.md
                </a>
                <a href="tel:+37368327082" className="btn-ghost px-7 py-3 text-[15px] font-medium">
                  +373 683 27 082
                </a>
              </div>
            </Hairline>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="px-4 pb-10 pt-4">
        <div className="mx-auto max-w-6xl">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent)",
            }}
          />
          <div className="flex flex-col items-center justify-between gap-5 pt-8 md:flex-row">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logowhite.png" alt="landings.md" className="h-5 w-auto" />
            </div>
            <p className="text-center text-[13px] text-white/40">
              Construim site-ul. Il ducem in top. Automatizam restul.
            </p>
            <div className="flex items-center gap-5 text-[13px]">
              <a className="nav-link" href="mailto:contact@landings.md">
                contact@landings.md
              </a>
              <a className="nav-link" href="tel:+37368327082">
                +373 683 27 082
              </a>
            </div>
          </div>
          <p className="pt-6 text-center text-[12px] text-white/25">
            © 2026 landings.md — Chisinau
          </p>
        </div>
      </footer>
    </div>
  );
}
