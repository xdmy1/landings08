"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
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

/* Clip-path text reveal — luxury upward wipe */
function RevealText({ children, className = "", delay = 0, as: Tag = "div" }: { children: React.ReactNode, className?: string, delay?: number, as?: "div" | "h1" | "h2" | "h3" | "p" | "span" }) {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Tag
        className="transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(110%)',
          opacity: visible ? 1 : 0,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </Tag>
    </div>
  )
}

/* Fade up — standard but with longer, smoother timing */
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

/* Scale reveal — image zooms from slightly scaled up while fading in */
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

/* Horizontal slide reveal — slides in from left or right */
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

/* Animated counter for number stats */
function AnimatedNumber({ value, className = "" }: { value: string, className?: string }) {
  const { ref, visible } = useInView(0.3)
  const [display, setDisplay] = useState("0")
  const numericPart = parseInt(value.replace(/[^0-9]/g, '')) || 0
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!visible || numericPart === 0) {
      if (visible) setDisplay(value)
      return
    }
    let start = 0
    const duration = 2000
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = Math.round(eased * numericPart)
      setDisplay(`${current}${suffix}`)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [visible, numericPart, suffix, value])

  return (
    <span ref={ref} className={className}>
      {visible ? display : `0${suffix}`}
    </span>
  )
}

/* Stagger container — wraps children to cascade animation */
function StaggerGroup({ children, className = "", stagger = 120 }: { children: React.ReactNode, className?: string, stagger?: number }) {
  const { ref, visible } = useInView(0.05)
  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <div
          className="transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: `${i * stagger}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const { language, setLanguage: handleLanguageChange } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true)
      else setScrolled(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Start a project" },
      hero: { headline: "Get found on Google. Get more clients.", sub: "We build SEO-optimised websites that rank on the first page, drive real traffic, and turn visitors into paying clients. Custom-coded, no templates.", cta: "Start a project", note: "delivered in 1–4 weeks · reply within 24h" },
      logos: "Trusted by businesses across Moldova and Europe",
      work: {
        label: "SELECTED WORK",
        viewAll: "All projects",
        projects: [
          { name: "RespectAuto", desc: "From invisible on Google to #1 in Moldova for car rental. 300% more organic traffic, 5x more booking requests — all from SEO and a fast, optimised website.", tag: "+300% TRAFFIC", tagColor: "text-green-400", category: "SEO · TRAFFIC · CLIENTS" },
          { name: "RADX Cooling", desc: "First page on Google for industrial cooling in Moldova. The website now generates qualified leads every week without paid ads.", tag: "PAGE 1", tagColor: "text-amber", category: "SEO · LEAD GEN" },
          { name: "CMIEA", desc: "Educational platform that ranks for every course keyword. Organic sign-ups doubled in 3 months with zero ad spend.", tag: "2x SIGN-UPS", tagColor: "text-blue-400", category: "SEO · PLATFORM" }
        ]
      },
      numbers: [
        { value: "50+", label: "Websites ranked on Google" },
        { value: "300%", label: "Average traffic increase" },
        { value: "1", label: "Page on Google — where you need to be" },
        { value: "0", label: "Ad spend needed after SEO" }
      ],
      statement: "Your competitors are already on Google. If your website doesn't show up when people search for what you sell — you're losing clients every single day.",
      process: {
        label: "HOW WE GET YOU CLIENTS",
        steps: [
          { num: "01", title: "SEO audit", body: "We analyse your market, competitors, and keywords. We find exactly what your clients are searching for and how to rank for it." },
          { num: "02", title: "Build & optimise", body: "We build a fast, clean website with SEO baked into every page — structure, meta tags, speed, schema markup. Everything Google rewards." },
          { num: "03", title: "Launch & grow", body: "Your site goes live, gets indexed, and starts climbing. We monitor rankings, traffic, and conversions — and keep optimising." }
        ]
      },
      contact: { label: "CONTACT", heading: "Ready to get more clients?", sub: "Tell us about your business. We'll show you how to rank on Google and get the traffic you deserve." },
      form: { name: "Name", email: "Email", message: "Tell us about your business...", send: "Send message", sent: "Sent. We'll reply within 24 hours." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldova" }
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Incepe un proiect" },
      hero: { headline: "Apari pe Google. Atragi mai multi clienti.", sub: "Construim website-uri optimizate SEO care apar pe prima pagina, aduc trafic real si transforma vizitatorii in clienti. Cod scris manual, fara template-uri.", cta: "Incepe un proiect", note: "livrat in 1–4 saptamani · raspuns in 24h" },
      logos: "De incredere pentru afaceri din Moldova si Europa",
      work: {
        label: "LUCRARI SELECTATE",
        viewAll: "Toate proiectele",
        projects: [
          { name: "RespectAuto", desc: "De la invizibil pe Google la #1 in Moldova pentru inchirieri auto. +300% trafic organic, de 5x mai multe cereri de rezervare — totul din SEO si un site rapid.", tag: "+300% TRAFIC", tagColor: "text-green-400", category: "SEO · TRAFIC · CLIENTI" },
          { name: "RADX Cooling", desc: "Prima pagina pe Google pentru racire industriala in Moldova. Site-ul genereaza lead-uri calificate saptamanal fara reclame platite.", tag: "PAGINA 1", tagColor: "text-amber", category: "SEO · LEAD GEN" },
          { name: "CMIEA", desc: "Platforma educationala care se claseaza pentru fiecare cuvant cheie. Inscrierile organice s-au dublat in 3 luni fara cheltuieli pe reclame.", tag: "2x INSCRIERI", tagColor: "text-blue-400", category: "SEO · PLATFORMA" }
        ]
      },
      numbers: [
        { value: "50+", label: "Website-uri clasate pe Google" },
        { value: "300%", label: "Crestere medie a traficului" },
        { value: "1", label: "Pagina pe Google — unde trebuie sa fii" },
        { value: "0", label: "Cheltuieli pe reclame dupa SEO" }
      ],
      statement: "Competitorii tai sunt deja pe Google. Daca site-ul tau nu apare cand oamenii cauta ce vinzi — pierzi clienti in fiecare zi.",
      process: {
        label: "CUM ITI ADUCEM CLIENTI",
        steps: [
          { num: "01", title: "Audit SEO", body: "Analizam piata, competitorii si cuvintele cheie. Gasim exact ce cauta clientii tai si cum sa apari primul." },
          { num: "02", title: "Construim si optimizam", body: "Construim un site rapid si curat cu SEO in fiecare pagina — structura, meta tags, viteza, schema markup. Tot ce Google recompenseaza." },
          { num: "03", title: "Lansam si crestem", body: "Site-ul merge live, se indexeaza si incepe sa urce. Monitorizam pozitiile, traficul si conversiile — si continuam sa optimizam." }
        ]
      },
      contact: { label: "CONTACT", heading: "Pregatit sa atragi mai multi clienti?", sub: "Spune-ne despre afacerea ta. Iti aratam cum sa apari pe Google si sa primesti traficul pe care il meriti." },
      form: { name: "Nume", email: "Email", message: "Spune-ne despre afacerea ta...", send: "Trimite mesaj", sent: "Trimis. Revenim in 24 de ore." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldova" }
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Projekt starten" },
      hero: { headline: "Bei Google gefunden werden. Mehr Kunden gewinnen.", sub: "Wir bauen SEO-optimierte Websites, die auf Seite 1 ranken, echten Traffic bringen und Besucher in zahlende Kunden verwandeln. Handgeschriebener Code, keine Templates.", cta: "Projekt starten", note: "Lieferung in 1–4 Wochen · Antwort in 24h" },
      logos: "Vertraut von Unternehmen in Moldawien und Europa",
      work: {
        label: "AUSGEWAHLTE ARBEITEN",
        viewAll: "Alle Projekte",
        projects: [
          { name: "RespectAuto", desc: "Von unsichtbar bei Google zur Nr. 1 in Moldawien fur Autovermietung. 300% mehr organischer Traffic, 5x mehr Buchungsanfragen — alles durch SEO.", tag: "+300% TRAFFIC", tagColor: "text-green-400", category: "SEO · TRAFFIC · KUNDEN" },
          { name: "RADX Cooling", desc: "Seite 1 bei Google fur industrielle Kuhlung in Moldawien. Die Website generiert jede Woche qualifizierte Leads ohne bezahlte Werbung.", tag: "SEITE 1", tagColor: "text-amber", category: "SEO · LEAD GEN" },
          { name: "CMIEA", desc: "Bildungsplattform die fur jedes Kurs-Keyword rankt. Organische Anmeldungen verdoppelt in 3 Monaten ohne Werbeausgaben.", tag: "2x ANMELDUNGEN", tagColor: "text-blue-400", category: "SEO · PLATTFORM" }
        ]
      },
      numbers: [
        { value: "50+", label: "Websites bei Google gerankt" },
        { value: "300%", label: "Durchschnittliche Traffic-Steigerung" },
        { value: "1", label: "Seite bei Google — wo Sie sein mussen" },
        { value: "0", label: "Werbeausgaben nach SEO notig" }
      ],
      statement: "Ihre Konkurrenten sind bereits bei Google. Wenn Ihre Website nicht erscheint, wenn Menschen nach Ihrem Angebot suchen — verlieren Sie jeden Tag Kunden.",
      process: {
        label: "WIE WIR IHNEN KUNDEN BRINGEN",
        steps: [
          { num: "01", title: "SEO-Audit", body: "Wir analysieren Ihren Markt, Wettbewerber und Keywords. Wir finden genau, wonach Ihre Kunden suchen und wie Sie dafur ranken." },
          { num: "02", title: "Bauen & optimieren", body: "Wir bauen eine schnelle Website mit SEO in jeder Seite — Struktur, Meta-Tags, Geschwindigkeit, Schema-Markup. Alles was Google belohnt." },
          { num: "03", title: "Launchen & wachsen", body: "Ihre Seite geht live, wird indexiert und steigt. Wir uberwachen Rankings, Traffic und Conversions — und optimieren weiter." }
        ]
      },
      contact: { label: "KONTAKT", heading: "Bereit fur mehr Kunden?", sub: "Erzahlen Sie uns von Ihrem Geschaft. Wir zeigen Ihnen, wie Sie bei Google ranken und den Traffic bekommen, den Sie verdienen." },
      form: { name: "Name", email: "E-Mail", message: "Erzahlen Sie uns von Ihrem Geschaft...", send: "Nachricht senden", sent: "Gesendet. Antwort in 24 Stunden." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldawien" }
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Demarrer un projet" },
      hero: { headline: "Apparaissez sur Google. Attirez plus de clients.", sub: "Nous construisons des sites optimises SEO qui apparaissent en premiere page, generent du vrai trafic et transforment les visiteurs en clients. Code sur mesure, pas de templates.", cta: "Demarrer un projet", note: "livre en 1–4 semaines · reponse en 24h" },
      logos: "Des entreprises en Moldavie et en Europe nous font confiance",
      work: {
        label: "TRAVAUX SELECTIONNES",
        viewAll: "Tous les projets",
        projects: [
          { name: "RespectAuto", desc: "D'invisible sur Google au n°1 en Moldavie pour la location auto. +300% de trafic organique, 5x plus de reservations — tout grace au SEO.", tag: "+300% TRAFIC", tagColor: "text-green-400", category: "SEO · TRAFIC · CLIENTS" },
          { name: "RADX Cooling", desc: "Premiere page Google pour le refroidissement industriel en Moldavie. Le site genere des leads qualifies chaque semaine sans publicite.", tag: "PAGE 1", tagColor: "text-amber", category: "SEO · LEAD GEN" },
          { name: "CMIEA", desc: "Plateforme educative classee pour chaque mot-cle de cours. Les inscriptions organiques ont double en 3 mois sans depenses publicitaires.", tag: "2x INSCRIPTIONS", tagColor: "text-blue-400", category: "SEO · PLATEFORME" }
        ]
      },
      numbers: [
        { value: "50+", label: "Sites classes sur Google" },
        { value: "300%", label: "Augmentation moyenne du trafic" },
        { value: "1", label: "Page sur Google — la ou il faut etre" },
        { value: "0", label: "Depenses pub necessaires apres SEO" }
      ],
      statement: "Vos concurrents sont deja sur Google. Si votre site n'apparait pas quand les gens cherchent ce que vous vendez — vous perdez des clients chaque jour.",
      process: {
        label: "COMMENT ON VOUS AMENE DES CLIENTS",
        steps: [
          { num: "01", title: "Audit SEO", body: "On analyse votre marche, vos concurrents et vos mots-cles. On trouve exactement ce que vos clients cherchent et comment vous positionner." },
          { num: "02", title: "On construit et optimise", body: "On cree un site rapide avec le SEO integre dans chaque page — structure, meta tags, vitesse, schema markup. Tout ce que Google recompense." },
          { num: "03", title: "On lance et on croit", body: "Votre site est en ligne, indexe et commence a monter. On surveille les positions, le trafic et les conversions — et on continue d'optimiser." }
        ]
      },
      contact: { label: "CONTACT", heading: "Pret a attirer plus de clients ?", sub: "Parlez-nous de votre activite. On vous montre comment apparaitre sur Google et obtenir le trafic que vous meritez." },
      form: { name: "Nom", email: "Email", message: "Parlez-nous de votre activite...", send: "Envoyer", sent: "Envoye. Reponse sous 24 heures." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldavie" }
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Iniciar proyecto" },
      hero: { headline: "Aparece en Google. Consigue mas clientes.", sub: "Creamos sitios web optimizados para SEO que aparecen en la primera pagina, generan trafico real y convierten visitantes en clientes. Codigo a medida, sin plantillas.", cta: "Iniciar proyecto", note: "entregado en 1–4 semanas · respuesta en 24h" },
      logos: "Confianza de empresas en Moldavia y Europa",
      work: {
        label: "TRABAJOS SELECCIONADOS",
        viewAll: "Todos los proyectos",
        projects: [
          { name: "RespectAuto", desc: "De invisible en Google al #1 en Moldavia para alquiler de autos. +300% trafico organico, 5x mas solicitudes de reserva — todo con SEO y un sitio rapido.", tag: "+300% TRAFICO", tagColor: "text-green-400", category: "SEO · TRAFICO · CLIENTES" },
          { name: "RADX Cooling", desc: "Primera pagina en Google para refrigeracion industrial en Moldavia. El sitio genera leads calificados cada semana sin publicidad pagada.", tag: "PAGINA 1", tagColor: "text-amber", category: "SEO · LEAD GEN" },
          { name: "CMIEA", desc: "Plataforma educativa que posiciona para cada palabra clave de curso. Las inscripciones organicas se duplicaron en 3 meses sin gasto en publicidad.", tag: "2x INSCRIPCIONES", tagColor: "text-blue-400", category: "SEO · PLATAFORMA" }
        ]
      },
      numbers: [
        { value: "50+", label: "Sitios posicionados en Google" },
        { value: "300%", label: "Aumento promedio de trafico" },
        { value: "1", label: "Pagina en Google — donde debes estar" },
        { value: "0", label: "Gasto en publicidad tras SEO" }
      ],
      statement: "Tus competidores ya estan en Google. Si tu sitio no aparece cuando la gente busca lo que vendes — estas perdiendo clientes cada dia.",
      process: {
        label: "COMO TE CONSEGUIMOS CLIENTES",
        steps: [
          { num: "01", title: "Auditoria SEO", body: "Analizamos tu mercado, competidores y palabras clave. Encontramos exactamente lo que buscan tus clientes y como posicionarte." },
          { num: "02", title: "Construimos y optimizamos", body: "Creamos un sitio rapido con SEO en cada pagina — estructura, meta tags, velocidad, schema markup. Todo lo que Google premia." },
          { num: "03", title: "Lanzamos y crecemos", body: "Tu sitio se publica, se indexa y comienza a subir. Monitoreamos rankings, trafico y conversiones — y seguimos optimizando." }
        ]
      },
      contact: { label: "CONTACTO", heading: "Listo para mas clientes?", sub: "Cuentanos sobre tu negocio. Te mostramos como posicionarte en Google y conseguir el trafico que mereces." },
      form: { name: "Nombre", email: "Email", message: "Cuentanos sobre tu negocio...", send: "Enviar mensaje", sent: "Enviado. Respuesta en 24 horas." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldavia" }
    }
  }

  const t = text[language as keyof typeof text]

  const projects = [
    { ...t.work.projects[0], src: "/images/respectauto (1).png", href: "https://respectauto.md" },
    { ...t.work.projects[1], src: "/images/radx.png", href: "https://radx.solutions" },
    { ...t.work.projects[2], src: "/images/cmiea (1).png", href: "https://cmiea.md" },
  ]

  return (
    <div className="min-h-screen text-ink grain" style={{ background: '#2A2118' }}>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth ${scrolled ? 'backdrop-blur-md' : 'bg-transparent'}`} style={scrolled ? { backgroundColor: 'rgba(42,33,24,0.88)' } : {}}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">
            <Link href="/" className="flex items-center">
              <Image src="/images/logowhite.png" alt="landings.md — affordable website design for small business" width={22} height={36} className="w-[22px] h-auto" priority />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 text-[13px] text-ink-muted">
                <Link href="/portfolio" className="hover:text-ink transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-ink transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="hover:text-ink transition-colors">{t.nav.solutions}</Link>
                <Link href="/case-studies" className="hover:text-ink transition-colors">{t.nav.caseStudies}</Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-ink-light hover:text-ink-muted text-[11px] tracking-widest uppercase transition-colors">{language}</button>
                  {langMenuOpen && (<><div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} /><div className="absolute top-full right-0 mt-2 bg-surface border border-divider z-50 min-w-[56px] py-1">{(['en', 'ro', 'de', 'fr', 'es'] as const).map((lang) => (<button key={lang} onClick={() => { handleLanguageChange(lang); setLangMenuOpen(false) }} className={`block w-full text-left px-4 py-1.5 text-[11px] tracking-widest uppercase transition-colors ${language === lang ? "text-amber" : "text-ink-muted hover:text-ink"}`}>{lang}</button>))}</div></>)}
                </div>
                <Link href="#contact" className="text-[13px] text-[#1A1410] bg-amber hover:bg-amber-light px-5 py-2 transition-colors duration-300">{t.nav.contact}</Link>
              </div>
            </div>
            <div className="md:hidden flex items-center gap-3">
              <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-ink-light text-[11px] tracking-widest uppercase">{language}</button>
              {langMenuOpen && (<><div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} /><div className="absolute top-16 right-6 bg-surface border border-divider z-50 min-w-[56px] py-1">{(['en', 'ro', 'de', 'fr', 'es'] as const).map((lang) => (<button key={lang} onClick={() => { handleLanguageChange(lang); setLangMenuOpen(false) }} className={`block w-full text-left px-4 py-1.5 text-[11px] tracking-widest uppercase ${language === lang ? "text-amber" : "text-ink-muted"}`}>{lang}</button>))}</div></>)}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-ink-muted hover:text-ink transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />}</svg></button>
            </div>
          </div>
          {mobileMenuOpen && (<div className="md:hidden border-t border-divider py-6 space-y-4"><Link href="/portfolio" className="block text-ink text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.portfolio}</Link><Link href="/pricing" className="block text-ink text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.pricing}</Link><Link href="/solutions" className="block text-ink text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.solutions}</Link><Link href="/case-studies" className="block text-ink text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.caseStudies}</Link><div className="pt-3"><Link href="#contact" className="text-amber text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link></div></div>)}
        </div>
      </nav>

      {/* ── BORDERED CONTAINER ── */}
      <div className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 border-x border-divider/40">

        {/* ── HERO ── */}
        <section className="pt-32 md:pt-44 pb-16 md:pb-24 px-6 md:px-12 lg:px-16 relative glow-amber" style={{ background: 'linear-gradient(180deg, #302620 0%, #2A2118 100%)' }}>
          <div className="text-center max-w-3xl mx-auto">
            <RevealText delay={200}>
              <h1 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] text-ink leading-[1.1] tracking-[-0.02em] text-balance">
                {t.hero.headline}
              </h1>
            </RevealText>
            <FadeIn delay={500}>
              <p className="mt-6 text-ink-muted text-[15px] md:text-base leading-relaxed max-w-xl mx-auto">
                {t.hero.sub}
              </p>
            </FadeIn>
            <FadeIn delay={700}>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Link href="#contact" className="inline-flex items-center gap-2 bg-amber hover:bg-amber-light text-[#1A1410] px-7 py-3 text-sm transition-colors duration-300 group">
                  {t.hero.cta}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <span className="text-ink-light text-[11px] tracking-wide font-mono">{t.hero.note}</span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FEATURED IMAGE ── */}
        <section className="border-t border-divider/40 px-6 md:px-12 lg:px-16 py-10 md:py-14" style={{ background: 'linear-gradient(180deg, #2A2118 0%, #342A20 100%)' }}>
          <ImageReveal>
            <Link href="https://respectauto.md" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="overflow-hidden rounded-sm">
                <Image src="/images/respectauto (1).png" alt="RespectAuto car rental website — professional web design for local business, ranked #1 on Google" width={1400} height={788} quality={95} className="w-full h-auto group-hover:scale-[1.015] transition-transform duration-[900ms] ease-smooth" priority />
              </div>
            </Link>
          </ImageReveal>
        </section>

        {/* ── NUMBERS ── */}
        <section className="border-t border-divider/40" style={{ background: '#342A20' }}>
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4" stagger={150}>
            {t.numbers.map((n, i) => (
              <div key={i} className={`px-6 md:px-8 py-8 md:py-10 ${i < t.numbers.length - 1 ? 'border-r border-divider/40' : ''} ${i < 2 ? 'border-b md:border-b-0 border-divider/40' : ''}`}>
                <p className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-ink leading-none">
                  <AnimatedNumber value={n.value} />
                </p>
                <p className="text-ink-muted text-[12px] mt-2 font-mono tracking-wide uppercase">{n.label}</p>
              </div>
            ))}
          </StaggerGroup>
        </section>

        {/* ── WORK ── */}
        <section className="border-t border-divider/40 px-6 md:px-12 lg:px-16 py-14 md:py-20" style={{ background: 'linear-gradient(180deg, #342A20 0%, #2A2118 100%)' }}>
          <FadeIn>
            <div className="flex items-center justify-between mb-10 md:mb-14">
              <span className="text-ink-light text-[11px] font-mono tracking-[0.15em] uppercase">{t.work.label}</span>
              <Link href="/portfolio" className="text-ink-muted hover:text-ink text-[12px] font-mono transition-colors group inline-flex items-center gap-1">{t.work.viewAll} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span></Link>
            </div>
          </FadeIn>

          <div className="space-y-0">
            {projects.map((project, i) => (
              <div key={i}>
                <Link href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className={`grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-10 py-8 md:py-10 ${i < projects.length - 1 ? 'border-b border-divider/30' : ''}`}>
                    <SlideIn direction="left" delay={i * 150} className="order-2 md:order-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-mono tracking-[0.1em] uppercase text-ink-light">{project.category}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-divider/30 rounded-sm font-mono">·</span>
                        <span className={`text-[10px] font-mono tracking-[0.1em] uppercase ${project.tagColor}`}>{project.tag}</span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl text-ink group-hover:text-amber transition-colors duration-300 mb-2">{project.name}</h3>
                      <p className="text-ink-muted text-[13px] leading-relaxed">{project.desc}</p>
                    </SlideIn>
                    <ImageReveal delay={i * 150 + 100} className="order-1 md:order-2 rounded-sm aspect-[16/10]">
                      <Image src={project.src} alt={`${project.name} — small business website design by landings.md`} width={800} height={500} quality={90} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-smooth" />
                    </ImageReveal>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATEMENT ── */}
        <section className="border-t border-divider/40 px-6 md:px-12 lg:px-16 py-16 md:py-24 relative glow-amber" style={{ background: 'linear-gradient(180deg, #2A2118 0%, #3E3229 100%)' }}>
          <RevealText>
            <p className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] text-ink leading-[1.4] tracking-[-0.01em] max-w-2xl">
              {t.statement}
            </p>
          </RevealText>
        </section>

        {/* ── PROCESS ── */}
        <section className="border-t border-divider/40 px-6 md:px-12 lg:px-16 py-14 md:py-20" style={{ background: 'linear-gradient(180deg, #3E3229 0%, #2A2118 100%)' }}>
          <FadeIn>
            <span className="text-ink-light text-[11px] font-mono tracking-[0.15em] uppercase block mb-10 md:mb-14">{t.process.label}</span>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" stagger={200}>
            {t.process.steps.map((step, i) => (
              <div key={i} className="relative">
                <span className="text-ink-light/30 font-mono text-[11px] tracking-widest absolute -top-0.5 right-0">{step.num}</span>
                <h3 className="font-serif text-lg text-ink mb-3">{step.title}</h3>
                <p className="text-ink-muted text-[13px] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </StaggerGroup>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="border-t border-divider/40 px-6 md:px-12 lg:px-16 py-14 md:py-24 relative grid-animated" style={{ background: 'linear-gradient(180deg, #2A2118 0%, #342A20 100%)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <SlideIn direction="left">
              <span className="text-ink-light text-[11px] font-mono tracking-[0.15em] uppercase block mb-4">{t.contact.label}</span>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-ink leading-[1.1] mb-4">{t.contact.heading}</h2>
              <p className="text-ink-muted text-[14px] leading-relaxed">{t.contact.sub}</p>
              <p className="mt-6 text-ink-light text-[12px] font-mono">contact@landings.md</p>
            </SlideIn>
            <SlideIn direction="right" delay={200}>
              {formSent ? (
                <div className="flex items-center h-full"><p className="text-ink font-serif text-lg">{t.form.sent}</p></div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); const s = encodeURIComponent(`New project from ${formData.name}`); const b = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`); window.location.href = `mailto:contact@landings.md?subject=${s}&body=${b}`; setFormSent(true) }}>
                  <input type="text" required placeholder={t.form.name} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-divider/50 px-0 py-4 text-[14px] text-ink placeholder:text-ink-light/40 focus:outline-none focus:border-amber/40 transition-colors duration-500 font-mono" />
                  <input type="email" required placeholder={t.form.email} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-divider/50 px-0 py-4 text-[14px] text-ink placeholder:text-ink-light/40 focus:outline-none focus:border-amber/40 transition-colors duration-500 font-mono" />
                  <textarea required rows={3} placeholder={t.form.message} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-transparent border-b border-divider/50 px-0 py-4 text-[14px] text-ink placeholder:text-ink-light/40 focus:outline-none focus:border-amber/40 transition-colors duration-500 resize-none font-mono" />
                  <div className="pt-6">
                    <button type="submit" className="bg-amber hover:bg-amber-light text-[#1A1410] px-7 py-3 text-[13px] transition-colors duration-300">{t.form.send}</button>
                  </div>
                </form>
              )}
            </SlideIn>
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
                <Image src="/images/logowhite.png" alt="landings.md — website design agency" width={16} height={26} className="w-4 h-auto opacity-50" />
              </Link>
              <div className="hidden md:flex items-center gap-4 text-[11px] text-ink-light/40 font-mono">
                <Link href="/portfolio" className="hover:text-ink-muted transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-ink-muted transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="hover:text-ink-muted transition-colors">{t.nav.solutions}</Link>
                <Link href="/case-studies" className="hover:text-ink-muted transition-colors">{t.nav.caseStudies}</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-ink-light/30 text-[10px] font-mono">{t.footer.copy}</span>
              <Link href="https://instagram.com/landings.md" className="text-ink-light/30 hover:text-ink-light transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </Link>
            </div>
          </div>
          <p className="mt-4 text-ink-light/20 text-[9px] font-mono tracking-wide leading-relaxed max-w-2xl">
            Affordable website design for small businesses across Europe. Custom websites from €350 — responsive, SEO-optimised, no templates. Web design services in English, Romanian, German, French, and Spanish. Chisinau, Moldova.
          </p>
        </footer>
      </FadeIn>

      <StickyContactPill language={language as 'en' | 'ro' | 'de' | 'fr' | 'es'} />
    </div>
  )
}
