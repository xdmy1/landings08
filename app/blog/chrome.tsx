"use client";

import { useEffect, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { HeroOrb } from "../fx";

const LANGS = ["ro", "en", "de", "fr", "es", "ru"] as const;
type Lang = (typeof LANGS)[number];

type Chrome = {
  cta: string;
  ctaShort: string;
  bandTitle: string;
  bandText: string;
  finalTitle: string;
  finalSub: string;
  allPosts: string;
  otherPosts: string;
  nfTitle: string;
  nfSub: string;
  nfHome: string;
};

const C: Record<Lang, Chrome> = {
  ro: {
    cta: "Cere o ofertă",
    ctaShort: "Cere ofertă",
    bandTitle: "Vrei un site care aduce clienți?",
    bandText: "Site-uri, aplicații și SEO. Prețuri de la 350 EUR.",
    finalTitle: "Hai să vorbim.",
    finalSub: "Scrie-ne despre proiectul tău. Răspundem în cel mult 24 de ore.",
    allPosts: "Toate articolele",
    otherPosts: "Alte articole",
    nfTitle: "Pagina nu există.",
    nfSub: "Linkul e greșit sau pagina a fost mutată.",
    nfHome: "Înapoi acasă",
  },
  en: {
    cta: "Request a quote",
    ctaShort: "Get a quote",
    bandTitle: "Want a website that brings clients?",
    bandText: "Websites, apps and SEO. Prices from 350 EUR.",
    finalTitle: "Let's talk.",
    finalSub: "Tell us about your project. We reply within 24 hours.",
    allPosts: "All articles",
    otherPosts: "More articles",
    nfTitle: "This page doesn't exist.",
    nfSub: "The link is wrong or the page was moved.",
    nfHome: "Back home",
  },
  de: {
    cta: "Angebot anfragen",
    ctaShort: "Angebot",
    bandTitle: "Willst du eine Website, die Kunden bringt?",
    bandText: "Websites, Apps und SEO. Preise ab 350 EUR.",
    finalTitle: "Reden wir.",
    finalSub: "Erzahl uns von deinem Projekt. Antwort innerhalb von 24 Stunden.",
    allPosts: "Alle Artikel",
    otherPosts: "Weitere Artikel",
    nfTitle: "Diese Seite gibt es nicht.",
    nfSub: "Der Link ist falsch oder die Seite wurde verschoben.",
    nfHome: "Zur Startseite",
  },
  fr: {
    cta: "Demander un devis",
    ctaShort: "Devis",
    bandTitle: "Envie d'un site qui apporte des clients?",
    bandText: "Sites, applications et SEO. A partir de 350 EUR.",
    finalTitle: "Parlons-en.",
    finalSub: "Parlez-nous de votre projet. Reponse sous 24 heures.",
    allPosts: "Tous les articles",
    otherPosts: "D'autres articles",
    nfTitle: "Cette page n'existe pas.",
    nfSub: "Le lien est errone ou la page a ete deplacee.",
    nfHome: "Retour a l'accueil",
  },
  es: {
    cta: "Pedir presupuesto",
    ctaShort: "Presupuesto",
    bandTitle: "Quieres una web que traiga clientes?",
    bandText: "Webs, aplicaciones y SEO. Desde 350 EUR.",
    finalTitle: "Hablemos.",
    finalSub: "Cuentanos tu proyecto. Respondemos en 24 horas.",
    allPosts: "Todos los articulos",
    otherPosts: "Mas articulos",
    nfTitle: "Esta pagina no existe.",
    nfSub: "El enlace es incorrecto o la pagina se movio.",
    nfHome: "Volver al inicio",
  },
  ru: {
    cta: "Запросить предложение",
    ctaShort: "Заявка",
    bandTitle: "Хотите сайт, который приносит клиентов?",
    bandText: "Сайты, приложения и SEO. Цены от 350 EUR.",
    finalTitle: "Давайте поговорим.",
    finalSub: "Напишите нам о вашем проекте. Отвечаем в течение 24 часов.",
    allPosts: "Все статьи",
    otherPosts: "Ещё статьи",
    nfTitle: "Такой страницы нет.",
    nfSub: "Ссылка неверна или страница была перемещена.",
    nfHome: "На главную",
  },
};

function useChrome() {
  const [lang, setLang] = useState<Lang>("ro");
  useEffect(() => {
    const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const p of prefs) {
      const code = (p || "").toLowerCase().slice(0, 2);
      if ((LANGS as readonly string[]).includes(code)) {
        setLang(code as Lang);
        return;
      }
    }
  }, []);
  return C[lang];
}

function useFx() {
  const [fx, setFx] = useState(false);
  useEffect(() => {
    try {
      setFx(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {
      setFx(false);
    }
  }, []);
  return fx;
}

/* adds .in to every .rv as it enters the viewport (same reveal system as home) */
export function BlogReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function BlogTopBar() {
  const t = useChrome();
  return (
    <header className="top-bar">
      <div className="container">
        <div className="top-bar-in top-bar-cta">
          <a className="wordmark" href="/" aria-label="landings.md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-mark.webp" alt="landings.md" width={57} height={96} />
          </a>
          <a className="btn btn-sm" href="/#contact">
            <span className="cta-long">{t.cta}</span>
            <span className="cta-short">{t.ctaShort}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function BlogOrb() {
  const fx = useFx();
  return <div className="blog-orb" aria-hidden="true">{fx && <HeroOrb />}</div>;
}

/* mid-article CTA band, always pointing back to the main site */
export function CtaBand() {
  const t = useChrome();
  return (
    <aside className="cta-band rv">
      <div>
        <p className="cta-band-t fu">{t.bandTitle}</p>
        <p className="cta-band-s fu">{t.bandText}</p>
      </div>
      <a className="btn fu" href="/#contact">
        {t.cta}
      </a>
    </aside>
  );
}

/* end-of-article contact block, same language as the visitor's device */
export function CtaFinal() {
  const t = useChrome();
  const fx = useFx();
  return (
    <div className="blog-cta-final rv">
      <div className="contact-orb fu">{fx && <ThinkingOrb state="connecting" size={64} theme="light" aria-label={t.finalTitle} />}</div>
      <h2 className="blog-cta-title fu">{t.finalTitle}</h2>
      <p className="contact-sub fu">{t.finalSub}</p>
      <div className="fu">
        <a className="btn btn-lg" href="mailto:contact@landings.md">
          contact@landings.md
        </a>
      </div>
      <div className="contact-links fu">
        <a className="pill-btn" href="https://wa.me/37368327082" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a className="pill-btn" href="https://t.me/damiqqn" target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
        <a className="pill-btn" href="/">
          landings.md
        </a>
      </div>
    </div>
  );
}

/* the 404 view, same design language as everything else */
export function NotFoundView() {
  const t = useChrome();
  const fx = useFx();
  return (
    <>
      <BlogReveal />
      <BlogTopBar />
      <main className="blog-hero nf-hero">
        <div className="blog-orb" aria-hidden="true">{fx && <HeroOrb />}</div>
        <div className="container blog-hero-in nf-in rv">
          <p className="nf-code">
            <span className="rl">
              <span className="rl-i">404</span>
            </span>
          </p>
          <h1 className="nf-title fu">{t.nfTitle}</h1>
          <p className="contact-sub fu">{t.nfSub}</p>
          <div className="nf-actions fu">
            <a className="btn" href="/">
              {t.nfHome}
            </a>
            <a className="pill-btn" href="mailto:contact@landings.md">
              contact@landings.md
            </a>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="container footer-in">
          <span>&copy; {new Date().getFullYear()} landings.md</span>
          <span>Chișinău, Moldova</span>
        </div>
      </footer>
    </>
  );
}

export function OtherPostsLabel() {
  const t = useChrome();
  return <>{t.otherPosts}</>;
}

export function AllPostsLabel() {
  const t = useChrome();
  return <>{t.allPosts}</>;
}
