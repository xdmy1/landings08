"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StickyContactPill } from '@/components/ui/sticky-contact-pill'
import { useLanguage } from '@/hooks/useLanguage'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

function RevealText({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(110%)',
          opacity: visible ? 1 : 0,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function ImageReveal({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.1)
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(1.08)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function SlideIn({ children, className = "", delay = 0, direction = "left" }: { children: React.ReactNode, className?: string, delay?: number, direction?: "left" | "right" }) {
  const { ref, visible } = useInView(0.1)
  const x = direction === "left" ? "-40px" : "40px"
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${x})`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function AnimatedNumber({ value, suffix = "", className = "" }: { value: number, suffix?: string, className?: string }) {
  const { ref, visible } = useInView(0.3)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!visible || value === 0) { if (visible) setDisplay(value); return }
    const duration = 2000
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [visible, value])

  return <span ref={ref} className={className}>{visible ? display : 0}{suffix}</span>
}

function HorizontalLine({ className = "", delay = 0 }: { className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="h-px bg-divider transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

export default function CaseStudiesPage() {
  const { language, setLanguage: handleLanguageChange } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Start a project" },
      hero: { label: "CASE STUDIES", headline: "Real results.\nReal businesses.", sub: "We don't just build websites. We build growth engines. Here's proof." },
      respectauto: {
        label: "01",
        tag: "CAR RENTAL · SEO · GROWTH",
        title: "RespectAuto",
        subtitle: "From invisible on Google to #1 in Moldova for car rental.",
        challenge: "RespectAuto had a basic website that generated zero organic traffic. In a competitive market with established players running Google Ads, they needed to rank organically — without spending on advertising.",
        approach: "We rebuilt the entire website from scratch with SEO as the foundation. Every page was optimised for high-intent keywords. We implemented schema markup, optimised site speed to under 2 seconds, built an internal linking structure, and created content that matched exactly what people search for when renting a car in Moldova.",
        results: "The results speak for themselves.",
        stats: [
          { value: 300, suffix: "%", label: "Organic traffic increase" },
          { value: 5, suffix: "x", label: "More booking requests" },
          { value: 1, suffix: "st", label: "Position on Google" },
          { value: 0, suffix: "€", label: "Spent on ads" },
        ],
        caption1: "Ahrefs: organic traffic explosion after our SEO rebuild",
        caption2: "Referring domains growth — building authority over time",
      },
      cmiea: {
        label: "02",
        tag: "EDUCATION · PLATFORM · SEO",
        title: "CMIEA",
        subtitle: "Educational platform that ranks for every course keyword.",
        challenge: "CMIEA needed a digital platform to replace their paper-based course registration system. They had no online presence and were losing students to competitors who could be found on Google.",
        approach: "We built a complete educational platform with authentication, interactive course pages, and a student dashboard. Every course page was SEO-optimised to rank for specific educational keywords in Moldova. We structured the content with proper headings, FAQ schema, and course schema markup.",
        results: "Organic sign-ups doubled in 3 months with zero ad spend.",
        stats: [
          { value: 797, suffix: "", label: "Clicks in 6 months" },
          { value: 638, suffix: "%", label: "Click growth" },
          { value: 23, suffix: "%", label: "Average CTR" },
          { value: 3, suffix: ".7", label: "Average position" },
        ],
        caption1: "Google Search Console: 797 clicks, up from 108 — 638% growth",
        caption2: "Full HTTPS coverage, zero critical issues, 8 indexed pages",
      },
      cta: { headline: "Want results like these?", sub: "Tell us about your business. We'll show you what's possible.", button: "Start a project" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldova" },
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Incepe un proiect" },
      hero: { label: "STUDII DE CAZ", headline: "Rezultate reale.\nAfaceri reale.", sub: "Nu construim doar website-uri. Construim motoare de crestere. Iata dovada." },
      respectauto: {
        label: "01",
        tag: "INCHIRIERI AUTO · SEO · CRESTERE",
        title: "RespectAuto",
        subtitle: "De la invizibil pe Google la #1 in Moldova pentru inchirieri auto.",
        challenge: "RespectAuto avea un website basic care nu genera trafic organic. Intr-o piata competitiva cu jucatori care rulau Google Ads, aveau nevoie sa apara organic — fara sa cheltuie pe publicitate.",
        approach: "Am reconstruit intregul website de la zero cu SEO ca fundatie. Fiecare pagina a fost optimizata pentru cuvinte cheie cu intentie de cumparare. Am implementat schema markup, am optimizat viteza sub 2 secunde si am creat continut care se potriveste exact cu ce cauta oamenii.",
        results: "Rezultatele vorbesc de la sine.",
        stats: [
          { value: 300, suffix: "%", label: "Crestere trafic organic" },
          { value: 5, suffix: "x", label: "Mai multe cereri de rezervare" },
          { value: 1, suffix: "", label: "Pozitia pe Google" },
          { value: 0, suffix: "€", label: "Cheltuiti pe reclame" },
        ],
        caption1: "Ahrefs: explozie de trafic organic dupa reconstruirea SEO",
        caption2: "Cresterea domeniilor de referinta — construind autoritate in timp",
      },
      cmiea: {
        label: "02",
        tag: "EDUCATIE · PLATFORMA · SEO",
        title: "CMIEA",
        subtitle: "Platforma educationala care se claseaza pentru fiecare cuvant cheie.",
        challenge: "CMIEA avea nevoie de o platforma digitala pentru a inlocui sistemul de inscriere pe hartie. Nu aveau prezenta online si pierdeau studenti in fata competitorilor gasiti pe Google.",
        approach: "Am construit o platforma educationala completa cu autentificare, pagini de cursuri interactive si dashboard pentru studenti. Fiecare pagina de curs a fost optimizata SEO pentru cuvinte cheie educationale specifice din Moldova.",
        results: "Inscrierile organice s-au dublat in 3 luni fara cheltuieli pe reclame.",
        stats: [
          { value: 797, suffix: "", label: "Click-uri in 6 luni" },
          { value: 638, suffix: "%", label: "Crestere click-uri" },
          { value: 23, suffix: "%", label: "CTR mediu" },
          { value: 3, suffix: ".7", label: "Pozitie medie" },
        ],
        caption1: "Google Search Console: 797 click-uri, de la 108 — crestere 638%",
        caption2: "Acoperire HTTPS completa, zero probleme critice, 8 pagini indexate",
      },
      cta: { headline: "Vrei rezultate ca acestea?", sub: "Spune-ne despre afacerea ta. Iti aratam ce e posibil.", button: "Incepe un proiect" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldova" },
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Projekt starten" },
      hero: { label: "FALLSTUDIEN", headline: "Echte Ergebnisse.\nEchte Unternehmen.", sub: "Wir bauen nicht nur Websites. Wir bauen Wachstumsmotoren. Hier der Beweis." },
      respectauto: {
        label: "01",
        tag: "AUTOVERMIETUNG · SEO · WACHSTUM",
        title: "RespectAuto",
        subtitle: "Von unsichtbar bei Google zur Nr. 1 in Moldawien fur Autovermietung.",
        challenge: "RespectAuto hatte eine einfache Website ohne organischen Traffic. In einem wettbewerbsintensiven Markt mussten sie organisch ranken — ohne Werbeausgaben.",
        approach: "Wir haben die gesamte Website von Grund auf mit SEO als Fundament neu aufgebaut. Jede Seite wurde fur hochwertige Keywords optimiert. Schema-Markup, Ladezeit unter 2 Sekunden, interne Verlinkung und passgenauer Content.",
        results: "Die Ergebnisse sprechen fur sich.",
        stats: [
          { value: 300, suffix: "%", label: "Organischer Traffic-Anstieg" },
          { value: 5, suffix: "x", label: "Mehr Buchungsanfragen" },
          { value: 1, suffix: ".", label: "Position bei Google" },
          { value: 0, suffix: "€", label: "Fur Werbung ausgegeben" },
        ],
        caption1: "Ahrefs: organische Traffic-Explosion nach unserem SEO-Rebuild",
        caption2: "Wachstum der Referring Domains — Autoritatsaufbau uber Zeit",
      },
      cmiea: {
        label: "02",
        tag: "BILDUNG · PLATTFORM · SEO",
        title: "CMIEA",
        subtitle: "Bildungsplattform die fur jedes Kurs-Keyword rankt.",
        challenge: "CMIEA brauchte eine digitale Plattform als Ersatz fur papierbasierte Kursanmeldungen. Ohne Online-Prasenz verloren sie Studenten an Wettbewerber.",
        approach: "Wir haben eine komplette Bildungsplattform mit Authentifizierung, interaktiven Kursseiten und Student-Dashboard gebaut. Jede Kursseite wurde fur spezifische Bildungs-Keywords optimiert.",
        results: "Organische Anmeldungen verdoppelt in 3 Monaten ohne Werbeausgaben.",
        stats: [
          { value: 797, suffix: "", label: "Klicks in 6 Monaten" },
          { value: 638, suffix: "%", label: "Klick-Wachstum" },
          { value: 23, suffix: "%", label: "Durchschnittliche CTR" },
          { value: 3, suffix: ".7", label: "Durchschnittliche Position" },
        ],
        caption1: "Google Search Console: 797 Klicks, von 108 — 638% Wachstum",
        caption2: "Vollstandige HTTPS-Abdeckung, keine kritischen Probleme",
      },
      cta: { headline: "Wollen Sie solche Ergebnisse?", sub: "Erzahlen Sie uns von Ihrem Geschaft. Wir zeigen Ihnen, was moglich ist.", button: "Projekt starten" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldawien" },
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Demarrer un projet" },
      hero: { label: "ETUDES DE CAS", headline: "Resultats reels.\nEntreprises reelles.", sub: "Nous ne construisons pas que des sites. Nous construisons des moteurs de croissance. Voici la preuve." },
      respectauto: {
        label: "01",
        tag: "LOCATION AUTO · SEO · CROISSANCE",
        title: "RespectAuto",
        subtitle: "D'invisible sur Google au n.1 en Moldavie pour la location auto.",
        challenge: "RespectAuto avait un site basique sans trafic organique. Dans un marche concurrentiel, ils devaient se positionner organiquement — sans depenser en publicite.",
        approach: "Nous avons reconstruit le site entier avec le SEO comme fondation. Chaque page optimisee pour des mots-cles a haute intention. Schema markup, vitesse sous 2 secondes, maillage interne et contenu adapte.",
        results: "Les resultats parlent d'eux-memes.",
        stats: [
          { value: 300, suffix: "%", label: "Augmentation du trafic organique" },
          { value: 5, suffix: "x", label: "Plus de demandes de reservation" },
          { value: 1, suffix: "ere", label: "Position sur Google" },
          { value: 0, suffix: "€", label: "Depense en publicite" },
        ],
        caption1: "Ahrefs : explosion du trafic organique apres notre refonte SEO",
        caption2: "Croissance des domaines referents — construction d'autorite",
      },
      cmiea: {
        label: "02",
        tag: "EDUCATION · PLATEFORME · SEO",
        title: "CMIEA",
        subtitle: "Plateforme educative classee pour chaque mot-cle de cours.",
        challenge: "CMIEA avait besoin d'une plateforme numerique pour remplacer les inscriptions papier. Sans presence en ligne, ils perdaient des etudiants.",
        approach: "Nous avons construit une plateforme educative complete avec authentification, pages de cours interactives et tableau de bord etudiant. Chaque page optimisee pour des mots-cles educatifs specifiques.",
        results: "Les inscriptions organiques ont double en 3 mois sans depenses publicitaires.",
        stats: [
          { value: 797, suffix: "", label: "Clics en 6 mois" },
          { value: 638, suffix: "%", label: "Croissance des clics" },
          { value: 23, suffix: "%", label: "CTR moyen" },
          { value: 3, suffix: ".7", label: "Position moyenne" },
        ],
        caption1: "Google Search Console : 797 clics, contre 108 — croissance de 638%",
        caption2: "Couverture HTTPS complete, zero probleme critique",
      },
      cta: { headline: "Vous voulez ces resultats ?", sub: "Parlez-nous de votre activite. On vous montre ce qui est possible.", button: "Demarrer un projet" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldavie" },
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Iniciar proyecto" },
      hero: { label: "CASOS DE ESTUDIO", headline: "Resultados reales.\nNegocios reales.", sub: "No solo construimos sitios web. Construimos motores de crecimiento. Aqui esta la prueba." },
      respectauto: {
        label: "01",
        tag: "ALQUILER DE AUTOS · SEO · CRECIMIENTO",
        title: "RespectAuto",
        subtitle: "De invisible en Google al #1 en Moldavia para alquiler de autos.",
        challenge: "RespectAuto tenia un sitio basico sin trafico organico. En un mercado competitivo, necesitaban posicionarse organicamente — sin gastar en publicidad.",
        approach: "Reconstruimos todo el sitio con SEO como base. Cada pagina optimizada para palabras clave de alta intencion. Schema markup, velocidad bajo 2 segundos, enlaces internos y contenido adaptado.",
        results: "Los resultados hablan por si mismos.",
        stats: [
          { value: 300, suffix: "%", label: "Aumento de trafico organico" },
          { value: 5, suffix: "x", label: "Mas solicitudes de reserva" },
          { value: 1, suffix: "er", label: "Posicion en Google" },
          { value: 0, suffix: "€", label: "Gastado en publicidad" },
        ],
        caption1: "Ahrefs: explosion de trafico organico tras nuestra reconstruccion SEO",
        caption2: "Crecimiento de dominios de referencia — construyendo autoridad",
      },
      cmiea: {
        label: "02",
        tag: "EDUCACION · PLATAFORMA · SEO",
        title: "CMIEA",
        subtitle: "Plataforma educativa posicionada para cada palabra clave de curso.",
        challenge: "CMIEA necesitaba una plataforma digital para reemplazar las inscripciones en papel. Sin presencia online, perdian estudiantes ante la competencia.",
        approach: "Construimos una plataforma educativa completa con autenticacion, paginas de cursos interactivas y panel de estudiantes. Cada pagina optimizada para palabras clave educativas especificas.",
        results: "Las inscripciones organicas se duplicaron en 3 meses sin gasto publicitario.",
        stats: [
          { value: 797, suffix: "", label: "Clics en 6 meses" },
          { value: 638, suffix: "%", label: "Crecimiento de clics" },
          { value: 23, suffix: "%", label: "CTR promedio" },
          { value: 3, suffix: ".7", label: "Posicion promedio" },
        ],
        caption1: "Google Search Console: 797 clics, desde 108 — crecimiento del 638%",
        caption2: "Cobertura HTTPS completa, cero problemas criticos",
      },
      cta: { headline: "Quieres resultados asi?", sub: "Cuentanos sobre tu negocio. Te mostramos lo que es posible.", button: "Iniciar proyecto" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldavia" },
    },
  }

  const t = text[language as keyof typeof text]

  return (
    <div className="min-h-screen text-ink grain" style={{ background: '#2A2118' }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-divider" style={{ backgroundColor: 'rgba(42,33,24,0.88)' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">
            <Link href="/" className="flex items-center">
              <Image src="/images/logowhite.png" alt="landings.md" width={22} height={36} className="w-[22px] h-auto" priority />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 text-[13px] text-ink-muted">
                <Link href="/portfolio" className="hover:text-ink transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-ink transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="hover:text-ink transition-colors">{t.nav.solutions}</Link>
                <Link href="/case-studies" className="text-ink">{t.nav.caseStudies}</Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-ink-light hover:text-ink-muted text-[11px] tracking-widest uppercase transition-colors">{language}</button>
                  {langMenuOpen && (<><div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} /><div className="absolute top-full right-0 mt-2 bg-surface border border-divider z-50 min-w-[56px] py-1">{(['en', 'ro', 'de', 'fr', 'es'] as const).map((lang) => (<button key={lang} onClick={() => { handleLanguageChange(lang); setLangMenuOpen(false) }} className={`block w-full text-left px-4 py-1.5 text-[11px] tracking-widest uppercase transition-colors ${language === lang ? "text-amber" : "text-ink-muted hover:text-ink"}`}>{lang}</button>))}</div></>)}
                </div>
                <Link href="mailto:contact@landings.md" className="text-[13px] text-[#1A1410] bg-amber hover:bg-amber-light px-5 py-2 transition-colors duration-300">{t.nav.contact}</Link>
              </div>
            </div>
            <div className="md:hidden flex items-center gap-3">
              <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-ink-light text-[11px] tracking-widest uppercase">{language}</button>
              {langMenuOpen && (<><div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} /><div className="absolute top-16 right-6 bg-surface border border-divider z-50 min-w-[56px] py-1">{(['en', 'ro', 'de', 'fr', 'es'] as const).map((lang) => (<button key={lang} onClick={() => { handleLanguageChange(lang); setLangMenuOpen(false) }} className={`block w-full text-left px-4 py-1.5 text-[11px] tracking-widest uppercase ${language === lang ? "text-amber" : "text-ink-muted"}`}>{lang}</button>))}</div></>)}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-ink-muted hover:text-ink transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />}</svg></button>
            </div>
          </div>
          {mobileMenuOpen && (<div className="md:hidden border-t border-divider py-6 space-y-4"><Link href="/portfolio" className="block text-ink text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.portfolio}</Link><Link href="/pricing" className="block text-ink text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.pricing}</Link><Link href="/solutions" className="block text-ink text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.solutions}</Link><Link href="/case-studies" className="block text-ink text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.caseStudies}</Link><div className="pt-3"><Link href="mailto:contact@landings.md" className="text-amber text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link></div></div>)}
        </div>
      </nav>

      {/* ── BORDERED CONTAINER ── */}
      <div className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 border-x border-divider/40">

        {/* ── HERO ── */}
        <section className="pt-36 md:pt-48 pb-20 md:pb-28 px-6 md:px-12 lg:px-16 relative glow-amber" style={{ background: 'linear-gradient(180deg, #302620 0%, #2A2118 100%)' }}>
          <div className="max-w-3xl">
            <FadeIn>
              <span className="text-ink-light text-[11px] font-mono tracking-[0.2em] uppercase block mb-8">{t.hero.label}</span>
            </FadeIn>
            <RevealText>
              <h1 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] text-ink leading-[1.05] tracking-[-0.02em] whitespace-pre-line">
                {t.hero.headline}
              </h1>
            </RevealText>
            <FadeIn delay={400}>
              <p className="mt-6 text-ink-muted text-[15px] md:text-lg leading-relaxed max-w-xl">
                {t.hero.sub}
              </p>
            </FadeIn>
          </div>
        </section>

        <HorizontalLine />

        {/* ══════════════════════════════════════════════════════
            CASE STUDY 01 — RESPECTAUTO
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24" style={{ background: 'linear-gradient(180deg, #2A2118 0%, #342A20 100%)' }}>

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 mb-14 md:mb-20">
            <SlideIn direction="left">
              <div>
                <span className="text-ink-light/30 font-mono text-[64px] md:text-[80px] leading-none font-serif">{t.respectauto.label}</span>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={200}>
              <div>
                <span className="text-amber text-[10px] font-mono tracking-[0.2em] uppercase block mb-4">{t.respectauto.tag}</span>
                <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-ink leading-[1.1] mb-3">{t.respectauto.title}</h2>
                <p className="text-ink-muted text-lg leading-relaxed">{t.respectauto.subtitle}</p>
              </div>
            </SlideIn>
          </div>

          {/* Main project image */}
          <ImageReveal className="mb-14 md:mb-20">
            <Link href="https://respectauto.md" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="overflow-hidden">
                <Image src="/images/respectauto-mockup.png" alt="RespectAuto car rental website — ranked #1 on Google Moldova" width={1400} height={788} quality={95} className="w-full h-auto group-hover:scale-[1.015] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </div>
            </Link>
          </ImageReveal>

          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-14 md:mb-20">
            <FadeIn>
              <div>
                <span className="text-ink-light text-[10px] font-mono tracking-[0.2em] uppercase block mb-4">THE CHALLENGE</span>
                <p className="text-ink-muted text-[14px] leading-[1.8]">{t.respectauto.challenge}</p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div>
                <span className="text-ink-light text-[10px] font-mono tracking-[0.2em] uppercase block mb-4">OUR APPROACH</span>
                <p className="text-ink-muted text-[14px] leading-[1.8]">{t.respectauto.approach}</p>
              </div>
            </FadeIn>
          </div>

          <HorizontalLine className="mb-14 md:mb-20" />

          {/* Results text */}
          <FadeIn>
            <p className="text-ink-light text-[10px] font-mono tracking-[0.2em] uppercase mb-8">THE RESULTS</p>
          </FadeIn>
          <RevealText className="mb-14 md:mb-20">
            <p className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] text-ink leading-[1.4] max-w-2xl">{t.respectauto.results}</p>
          </RevealText>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-14 md:mb-20" style={{ background: 'rgba(90,74,58,0.3)' }}>
            {t.respectauto.stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="px-6 py-8 md:py-10" style={{ background: '#2E251C' }}>
                  <p className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-amber leading-none mb-2">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-ink-muted text-[11px] font-mono tracking-wide uppercase">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Evidence images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ImageReveal>
              <div className="overflow-hidden border border-divider/40">
                <Image src="/images/case-study-respectauto1.png" alt={t.respectauto.caption1} width={800} height={450} quality={90} className="w-full h-auto" />
              </div>
              <p className="text-ink-light text-[11px] font-mono mt-3 leading-relaxed">{t.respectauto.caption1}</p>
            </ImageReveal>
            <ImageReveal delay={200}>
              <div className="overflow-hidden border border-divider/40">
                <Image src="/images/case-study-respectauto2.png" alt={t.respectauto.caption2} width={800} height={450} quality={90} className="w-full h-auto" />
              </div>
              <p className="text-ink-light text-[11px] font-mono mt-3 leading-relaxed">{t.respectauto.caption2}</p>
            </ImageReveal>
          </div>
        </section>

        <HorizontalLine />

        {/* ══════════════════════════════════════════════════════
            CASE STUDY 02 — CMIEA
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24" style={{ background: 'linear-gradient(180deg, #342A20 0%, #3E3229 50%, #342A20 100%)' }}>

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 mb-14 md:mb-20">
            <SlideIn direction="left">
              <div>
                <span className="text-ink-light/30 font-mono text-[64px] md:text-[80px] leading-none font-serif">{t.cmiea.label}</span>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={200}>
              <div>
                <span className="text-amber text-[10px] font-mono tracking-[0.2em] uppercase block mb-4">{t.cmiea.tag}</span>
                <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-ink leading-[1.1] mb-3">{t.cmiea.title}</h2>
                <p className="text-ink-muted text-lg leading-relaxed">{t.cmiea.subtitle}</p>
              </div>
            </SlideIn>
          </div>

          {/* Main project image */}
          <ImageReveal className="mb-14 md:mb-20">
            <Link href="https://cmiea.md" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="overflow-hidden">
                <Image src="/images/cmiea-mockup.png" alt="CMIEA educational platform — SEO optimised, ranked for every course keyword" width={1400} height={788} quality={95} className="w-full h-auto group-hover:scale-[1.015] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </div>
            </Link>
          </ImageReveal>

          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-14 md:mb-20">
            <FadeIn>
              <div>
                <span className="text-ink-light text-[10px] font-mono tracking-[0.2em] uppercase block mb-4">THE CHALLENGE</span>
                <p className="text-ink-muted text-[14px] leading-[1.8]">{t.cmiea.challenge}</p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div>
                <span className="text-ink-light text-[10px] font-mono tracking-[0.2em] uppercase block mb-4">OUR APPROACH</span>
                <p className="text-ink-muted text-[14px] leading-[1.8]">{t.cmiea.approach}</p>
              </div>
            </FadeIn>
          </div>

          <HorizontalLine className="mb-14 md:mb-20" />

          {/* Results text */}
          <FadeIn>
            <p className="text-ink-light text-[10px] font-mono tracking-[0.2em] uppercase mb-8">THE RESULTS</p>
          </FadeIn>
          <RevealText className="mb-14 md:mb-20">
            <p className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] text-ink leading-[1.4] max-w-2xl">{t.cmiea.results}</p>
          </RevealText>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-14 md:mb-20" style={{ background: 'rgba(90,74,58,0.3)' }}>
            {t.cmiea.stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="px-6 py-8 md:py-10" style={{ background: '#362C22' }}>
                  <p className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-amber leading-none mb-2">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-ink-muted text-[11px] font-mono tracking-wide uppercase">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Evidence images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ImageReveal>
              <div className="overflow-hidden border border-divider/40">
                <Image src="/images/case-study-cmiea1.png" alt={t.cmiea.caption1} width={800} height={450} quality={90} className="w-full h-auto" />
              </div>
              <p className="text-ink-light text-[11px] font-mono mt-3 leading-relaxed">{t.cmiea.caption1}</p>
            </ImageReveal>
            <ImageReveal delay={200}>
              <div className="overflow-hidden border border-divider/40">
                <Image src="/images/case-study-cmiea2.png" alt={t.cmiea.caption2} width={800} height={450} quality={90} className="w-full h-auto" />
              </div>
              <p className="text-ink-light text-[11px] font-mono mt-3 leading-relaxed">{t.cmiea.caption2}</p>
            </ImageReveal>
          </div>
        </section>

        <HorizontalLine />

        {/* ── CTA ── */}
        <section className="px-6 md:px-12 lg:px-16 py-20 md:py-32 relative glow-amber grid-animated" style={{ background: 'linear-gradient(180deg, #2A2118 0%, #342A20 100%)' }}>
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <RevealText>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-ink leading-[1.1] mb-4">{t.cta.headline}</h2>
            </RevealText>
            <FadeIn delay={300}>
              <p className="text-ink-muted text-[15px] leading-relaxed mb-10">{t.cta.sub}</p>
            </FadeIn>
            <FadeIn delay={500}>
              <Link href="mailto:contact@landings.md" className="inline-flex items-center gap-2 bg-amber hover:bg-amber-light text-[#1A1410] px-7 py-3 text-sm transition-colors duration-300 group">
                {t.cta.button}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </FadeIn>
          </div>
        </section>

      </div>
      {/* ── END BORDERED CONTAINER ── */}

      {/* ── FOOTER ── */}
      <FadeIn>
        <footer className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 border-x border-t border-divider/40 px-6 md:px-12 lg:px-16 py-8 pb-28" style={{ background: '#241E18' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center">
                <Image src="/images/logowhite.png" alt="landings.md" width={16} height={26} className="w-4 h-auto opacity-70" />
              </Link>
              <div className="hidden md:flex items-center gap-4 text-[11px] text-ink-muted font-mono">
                <Link href="/portfolio" className="hover:text-ink transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-ink transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="hover:text-ink transition-colors">{t.nav.solutions}</Link>
                <Link href="/case-studies" className="hover:text-ink transition-colors">{t.nav.caseStudies}</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-ink-muted text-[10px] font-mono">{t.footer.copy}</span>
              <Link href="https://instagram.com/landings.md" className="text-ink-muted hover:text-ink transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </Link>
            </div>
          </div>
        </footer>
      </FadeIn>

      <StickyContactPill language={language as 'en' | 'ro' | 'de' | 'fr' | 'es'} />
    </div>
  )
}
