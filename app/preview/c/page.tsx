"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/* ------------------------------------------------------------------ */
/*  Tokens — Apple keynote language                                    */
/* ------------------------------------------------------------------ */

const INK = "#1d1d1f";
const SUB = "#6e6e73";
const BLUE = "#0071e3";
const BAND = "#f5f5f7";
const HAIRLINE = "#d2d2d7";
const FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const SHADOW_XL =
  "0 50px 100px -20px rgba(0,0,0,0.25), 0 30px 60px -30px rgba(0,0,0,0.3)";
const SHADOW_LG = "0 40px 80px -24px rgba(0,0,0,0.25)";
const SPRING = { type: "spring" as const, bounce: 0, duration: 0.9 };

/* ------------------------------------------------------------------ */
/*  Local helpers                                                      */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
  y = 26,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}

function Chevron() {
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      aria-hidden="true"
      className="inline-block translate-y-[1px]"
    >
      <path
        d="M1.5 1.5 7 7l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/images/logowhite.png"
        alt=""
        width={16}
        height={27}
        className="h-auto w-[13px]"
        style={{ filter: "brightness(0)" }}
      />
      <span
        className="text-[15px] font-semibold tracking-[-0.01em]"
        style={{ color: INK }}
      >
        landings.md
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav — translucent chrome                                           */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Servicii", href: "#servicii" },
  { label: "Lucrari", href: "#lucrari" },
  { label: "Rezultate", href: "#rezultate" },
  { label: "Proces", href: "#proces" },
];

function Nav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-6">
        <a href="#top" aria-label="landings.md">
          <Wordmark />
        </a>
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] opacity-80 transition-opacity duration-200 hover:opacity-100"
              style={{ color: INK }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:contact@landings.md"
          className="rounded-full bg-[#0071e3] px-4 py-[6px] text-[12px] font-medium text-white transition-colors duration-200 hover:bg-[#0077ed]"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const HERO_LINES = ["Construim site-ul.", "Il ducem in top.", "Automatizam restul."];

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="px-6 pb-4 pt-[132px] text-center md:pt-[176px]">
      <h1
        className="mx-auto max-w-[1000px] font-bold"
        style={{
          fontSize: "clamp(46px, 8vw, 92px)",
          lineHeight: 1.05,
          letterSpacing: "-0.028em",
          color: INK,
        }}
      >
        {HERO_LINES.map((line, i) => (
          <motion.span
            key={line}
            className="block"
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, duration: 1, delay: 0.05 + i * 0.1 }}
            style={
              i === 2
                ? {
                    backgroundImage: "linear-gradient(90deg, #0071e3, #00a2ff)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }
                : undefined
            }
          >
            {line}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="mx-auto mt-7 max-w-[620px] text-[19px] leading-[1.5] md:text-[21px]"
        style={{ color: SUB }}
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, duration: 1, delay: 0.4 }}
      >
        Site-uri scrise de la zero, SEO care aduce clienti si sisteme care iti
        conduc afacerea. De la 350 EUR. Livrare in 1&#8211;4 saptamani.
      </motion.p>

      <motion.div
        className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, duration: 1, delay: 0.5 }}
      >
        <a
          href="mailto:contact@landings.md"
          className="rounded-full bg-[#0071e3] px-6 py-3 text-[17px] font-medium text-white transition-colors duration-200 hover:bg-[#0077ed]"
        >
          Incepe un proiect
        </a>
        <a
          href="#lucrari"
          className="inline-flex items-center gap-1.5 text-[17px] text-[#0066cc] transition-opacity duration-200 hover:underline"
        >
          Vezi lucrarile <Chevron />
        </a>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky showcase — Davo scales 0.9 → 1, captions crossfade          */
/* ------------------------------------------------------------------ */

type CaptionRange = [number, number, number, number];

const CAPTIONS: {
  eyebrow: string;
  title: string;
  range: CaptionRange;
  last?: boolean;
}[] = [
  {
    eyebrow: "Davo Group · Transport international",
    title: "Rezervari online, cu alegerea locului.",
    range: [0.02, 0.1, 0.3, 0.38],
  },
  {
    eyebrow: "SEO din prima zi",
    title: "Gasit pe Google inaintea concurentei.",
    range: [0.38, 0.46, 0.62, 0.7],
  },
  {
    eyebrow: "Rezultatul",
    title: "In medie, 300% mai mult trafic organic.",
    range: [0.7, 0.78, 0.9, 1],
    last: true,
  },
];

function ShowcaseCaption({
  p,
  eyebrow,
  title,
  range,
  last,
}: {
  p: MotionValue<number>;
  eyebrow: string;
  title: string;
  range: CaptionRange;
  last?: boolean;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(p, range, [0, 1, 1, last ? 1 : 0]);
  const y = useTransform(p, [range[0], range[1]], [14, 0]);
  return (
    <motion.div
      style={{ opacity, y: reduce ? 0 : y }}
      className="absolute inset-0 flex flex-col items-center justify-end px-6 text-center"
    >
      <p className="text-[14px] font-semibold md:text-[15px]" style={{ color: BLUE }}>
        {eyebrow}
      </p>
      <h2
        className="mt-2 font-semibold"
        style={{
          fontSize: "clamp(26px, 4vw, 44px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: INK,
        }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  const scale = useSpring(rawScale, { stiffness: 140, damping: 28, mass: 0.6 });

  return (
    <section ref={ref} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="relative h-[128px] w-full md:h-[148px]">
          {CAPTIONS.map((c) => (
            <ShowcaseCaption key={c.eyebrow} p={scrollYProgress} {...c} />
          ))}
        </div>
        <motion.div
          className="mt-8 w-[90%] max-w-[1040px] md:mt-12"
          style={{ scale: reduce ? 1 : scale }}
        >
          <Image
            src="/images/shot-davo.jpg"
            alt="Davo.md — platforma de rezervari cu alegerea locului"
            width={1920}
            height={1200}
            priority
            className="h-auto w-full rounded-[18px] md:rounded-[24px]"
            style={{ boxShadow: SHADOW_XL }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Client logos                                                       */
/* ------------------------------------------------------------------ */

const LOGOS: { file: string; alt: string; h: number }[] = [
  { file: "davo", alt: "Davo Group", h: 20 },
  { file: "interbus", alt: "Inter-Bus", h: 30 },
  { file: "cmiea", alt: "CMIEA", h: 38 },
  { file: "glg", alt: "Scoala Auto GLG", h: 36 },
  { file: "radx", alt: "RADX", h: 20 },
  { file: "eurogard", alt: "EuroGard", h: 40 },
  { file: "rizzaclassic", alt: "Rizza Classic", h: 22 },
  { file: "autohuse", alt: "Auto Huse", h: 38 },
];

function Logos() {
  return (
    <section className="px-6 py-[110px]" style={{ background: BAND }}>
      <Reveal>
        <p
          className="mx-auto max-w-[520px] text-center text-[19px] font-semibold tracking-[-0.01em] md:text-[21px]"
          style={{ color: INK }}
        >
          Peste 50 de afaceri isi cresc vanzarile cu site-uri construite de noi.
        </p>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="mx-auto mt-14 flex max-w-[880px] flex-wrap items-center justify-center gap-x-14 gap-y-10">
          {LOGOS.map((l) => (
            <Image
              key={l.file}
              src={`/images/logos/${l.file}.png`}
              alt={l.alt}
              width={200}
              height={80}
              className="w-auto opacity-[0.35] transition-opacity duration-300 hover:opacity-60"
              style={{ height: l.h, filter: "brightness(0)" }}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    title: "Site-uri custom",
    body: "Scrise de la zero, fara sabloane si fara constructori. Rapide, sigure si in intregime ale tale.",
    stat: "De la 350 EUR",
  },
  {
    title: "SEO si publicitate",
    body: "Optimizare tehnica, continut si campanii Google si Meta. Clientii te gasesc pe tine, nu concurenta.",
    stat: "300% crestere medie",
  },
  {
    title: "Sisteme de business",
    body: "Rezervari, facturare, stoc, ERP. Automatizam munca repetitiva, ca echipa ta sa se ocupe de vanzari.",
    stat: "10+ sisteme in productie",
  },
];

function Services() {
  return (
    <section id="servicii" className="scroll-mt-16 px-6 py-[150px]">
      <Reveal>
        <h2
          className="mx-auto max-w-[760px] text-center font-bold"
          style={{
            fontSize: "clamp(38px, 5.5vw, 60px)",
            letterSpacing: "-0.022em",
            lineHeight: 1.08,
            color: INK,
          }}
        >
          Trei directii. Un singur partener.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p
          className="mx-auto mt-5 max-w-[560px] text-center text-[19px] leading-[1.5]"
          style={{ color: SUB }}
        >
          Tot ce iti trebuie ca sa cresti online — proiectat, construit si
          administrat de aceeasi echipa.
        </p>
      </Reveal>
      <div className="mx-auto mt-16 grid max-w-[1100px] gap-5 md:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.09}>
            <div
              className="h-full rounded-[24px] p-9 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.18)] md:p-10"
              style={{ background: BAND }}
            >
              <h3
                className="text-[24px] font-semibold"
                style={{ letterSpacing: "-0.015em", color: INK }}
              >
                {s.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.55]" style={{ color: SUB }}>
                {s.body}
              </p>
              <p className="mt-8 text-[17px] font-semibold" style={{ color: BLUE }}>
                {s.stat}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Selected work                                                      */
/* ------------------------------------------------------------------ */

const WORK = [
  {
    shot: "/images/shot-interbus.jpg",
    eyebrow: "Inter-Bus · Piese auto",
    title: "Magazin si ERP, in acelasi sistem.",
    body: "Catalog de piese cu cautare dupa cod, plus un ERP care tine facturarea si stocul la zi — automat, fara hartii.",
  },
  {
    shot: "/images/shot-cmiea.jpg",
    eyebrow: "CMIEA · Educatie",
    title: "O platforma pentru invatare.",
    body: "Cursuri, evenimente si inscrieri online, pe o platforma construita de la zero pentru mii de cursanti.",
  },
  {
    shot: "/images/shot-glg.jpg",
    eyebrow: "Scoala Auto GLG",
    title: "Programari la lectii, fara telefoane.",
    body: "Elevii vad locurile libere si isi rezerva singuri lectiile. Calendarul instructorilor se completeaza singur.",
  },
];

function Work() {
  const reduce = useReducedMotion();
  return (
    <section
      id="lucrari"
      className="scroll-mt-16 px-6 py-[150px]"
      style={{ background: BAND }}
    >
      <Reveal>
        <h2
          className="text-center font-bold"
          style={{
            fontSize: "clamp(38px, 5.5vw, 60px)",
            letterSpacing: "-0.022em",
            lineHeight: 1.08,
            color: INK,
          }}
        >
          Lucrari selectate.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p
          className="mx-auto mt-5 max-w-[520px] text-center text-[19px] leading-[1.5]"
          style={{ color: SUB }}
        >
          Fiecare proiect, construit in jurul felului in care lucreaza clientul.
        </p>
      </Reveal>

      <div className="mx-auto mt-24 max-w-[1120px] space-y-[120px]">
        {WORK.map((w, i) => (
          <Reveal key={w.title} y={34}>
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
              <div
                className={`md:col-span-4 ${
                  i % 2 === 1 ? "md:order-2 md:text-right" : ""
                }`}
              >
                <p className="text-[15px] font-semibold" style={{ color: BLUE }}>
                  {w.eyebrow}
                </p>
                <h3
                  className="mt-2 font-semibold"
                  style={{
                    fontSize: "clamp(28px, 3.4vw, 38px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.12,
                    color: INK,
                  }}
                >
                  {w.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.55]" style={{ color: SUB }}>
                  {w.body}
                </p>
              </div>
              <motion.div
                className={`md:col-span-8 ${i % 2 === 1 ? "md:order-1" : ""}`}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              >
                <Image
                  src={w.shot}
                  alt={w.title}
                  width={1920}
                  height={1200}
                  className="h-auto w-full rounded-[18px]"
                  style={{ boxShadow: SHADOW_LG }}
                />
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats — hue-tinted numerals on white                               */
/* ------------------------------------------------------------------ */

const STATS = [
  {
    value: "50+",
    label: "site-uri lansate",
    gradient: "linear-gradient(135deg, #0071e3, #00c2ff)",
  },
  {
    value: "300%",
    label: "crestere medie a traficului",
    gradient: "linear-gradient(135deg, #0aa06e, #5ce286)",
  },
  {
    value: "10+",
    label: "sisteme custom in productie",
    gradient: "linear-gradient(135deg, #7d55ff, #bf5af2)",
  },
];

function Stats() {
  return (
    <section id="rezultate" className="scroll-mt-16 px-6 py-[150px]">
      <Reveal>
        <h2
          className="text-center font-bold"
          style={{
            fontSize: "clamp(38px, 5.5vw, 60px)",
            letterSpacing: "-0.022em",
            lineHeight: 1.08,
            color: INK,
          }}
        >
          Rezultate care se vad.
        </h2>
      </Reveal>
      <div className="mx-auto mt-20 grid max-w-[1000px] gap-16 md:grid-cols-3 md:gap-10">
        {STATS.map((s, i) => (
          <Reveal key={s.value} delay={i * 0.1} className="text-center">
            <p
              className="font-bold"
              style={{
                fontSize: "clamp(72px, 9vw, 110px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                backgroundImage: s.gradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {s.value}
            </p>
            <p className="mt-3 text-[17px]" style={{ color: SUB }}>
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Process / statement                                                */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    n: "01",
    title: "Discutam",
    body: "O discutie scurta despre afacerea ta, obiective si termene.",
  },
  {
    n: "02",
    title: "Construim",
    body: "Design si cod, cu demo-uri pe parcurs si feedback rapid.",
  },
  {
    n: "03",
    title: "Lansam",
    body: "Publicam, masuram si optimizam. Site-ul incepe sa lucreze.",
  },
];

function Process() {
  return (
    <section
      id="proces"
      className="scroll-mt-16 px-6 py-[150px]"
      style={{ background: BAND }}
    >
      <Reveal>
        <h2
          className="mx-auto max-w-[760px] text-center font-bold"
          style={{
            fontSize: "clamp(38px, 5.5vw, 60px)",
            letterSpacing: "-0.022em",
            lineHeight: 1.08,
            color: INK,
          }}
        >
          Fara sabloane. Fara surprize.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p
          className="mx-auto mt-6 max-w-[640px] text-center text-[19px] leading-[1.5] md:text-[21px]"
          style={{ color: SUB }}
        >
          Fiecare proiect este scris de la zero si livrat in 1&#8211;4
          saptamani. Vezi progresul pe tot parcursul, iar la final totul iti
          apartine.
        </p>
      </Reveal>
      <div className="mx-auto mt-20 grid max-w-[1000px] gap-12 text-center md:grid-cols-3 md:gap-10">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <p className="text-[15px] font-semibold" style={{ color: BLUE }}>
              {s.n}
            </p>
            <h3
              className="mt-2 text-[21px] font-semibold"
              style={{ letterSpacing: "-0.01em", color: INK }}
            >
              {s.title}
            </h3>
            <p
              className="mx-auto mt-2 max-w-[280px] text-[15px] leading-[1.55]"
              style={{ color: SUB }}
            >
              {s.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact CTA                                                        */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 px-6 py-[160px] text-center">
      <Reveal>
        <p className="text-[15px] font-semibold" style={{ color: BLUE }}>
          Contact
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className="mx-auto mt-3 max-w-[820px] font-bold"
          style={{
            fontSize: "clamp(40px, 6.5vw, 72px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            color: INK,
          }}
        >
          Sa construim ceva impreuna.
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <p
          className="mx-auto mt-6 max-w-[540px] text-[19px] leading-[1.5]"
          style={{ color: SUB }}
        >
          Scrie-ne cateva randuri despre proiectul tau — revenim cu un plan si
          un pret.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a
            href="mailto:contact@landings.md"
            className="rounded-full bg-[#0071e3] px-6 py-3 text-[17px] font-medium text-white transition-colors duration-200 hover:bg-[#0077ed]"
          >
            Scrie-ne
          </a>
          <a
            href="tel:+37368327082"
            className="inline-flex items-center gap-1.5 text-[17px] text-[#0066cc] hover:underline"
          >
            +373 683 27 082 <Chevron />
          </a>
        </div>
        <p className="mt-8 text-[14px]" style={{ color: SUB }}>
          contact@landings.md &middot; Chisinau, Moldova
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer
      className="px-6 py-10"
      style={{ background: BAND, borderTop: `1px solid ${HAIRLINE}` }}
    >
      <div className="mx-auto max-w-[1024px]">
        <p className="max-w-[720px] text-[12px] leading-[1.6]" style={{ color: SUB }}>
          landings.md — site-uri custom, SEO si sisteme de business pentru
          companii din Moldova si Europa. De la 350 EUR, livrare in 1&#8211;4
          saptamani.
        </p>
        <div
          className="my-5"
          style={{ borderTop: `1px solid ${HAIRLINE}` }}
          aria-hidden="true"
        />
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-[12px]" style={{ color: SUB }}>
            &copy; 2026 landings.md. Toate drepturile rezervate.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="mailto:contact@landings.md"
              className="text-[12px] hover:underline"
              style={{ color: "#424245" }}
            >
              contact@landings.md
            </a>
            <a
              href="tel:+37368327082"
              className="text-[12px] hover:underline"
              style={{ color: "#424245" }}
            >
              +373 683 27 082
            </a>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[12px] hover:underline"
                style={{ color: "#424245" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PreviewC() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: "#ffffff", color: INK, fontFamily: FONT }}
    >
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Logos />
        <Services />
        <Work />
        <Stats />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
