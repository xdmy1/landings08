"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StickyContactPill } from '@/components/ui/sticky-contact-pill'
import { SiteNav } from '@/components/ui/site-nav'
import { AnimatedStatGrid } from '@/components/ui/animated-stat-grid'
import { LogoGrid } from '@/components/ui/logo-grid'
import { HeroSpotlight } from '@/components/ui/hero-fx'
import { ScrubText, Magnetic } from '@/components/ui/scroll-fx'
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

/* Fade up — standard but with longer, smoother timing */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        filter: visible ? 'blur(0px)' : 'blur(10px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
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
        filter: visible ? 'blur(0px)' : 'blur(10px)',
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

/* Per-character cinematic reveal for the hero headline — each letter
   rises 30px and fades in, words kept intact so lines never rewrap.
   Words wrapped in *asterisks* render in the accent color. */
function CharsReveal({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.15)
  const words = text.split(' ')
  let charIndex = 0
  return (
    <span ref={ref as React.RefObject<HTMLDivElement>} className={className} aria-label={text}>
      {words.map((raw, wi) => {
        const accented = raw.startsWith('*')
        const word = raw.replace(/\*/g, '')
        return (
          <span key={wi} aria-hidden className={`inline-block whitespace-nowrap mr-[0.24em] last:mr-0 ${accented ? 'text-amber' : ''}`}>
            {word.split('').map((c, ci) => {
              const d = delay + charIndex++ * 12
              return (
                <span
                  key={ci}
                  className="inline-block transition-[transform,opacity] duration-[500ms] ease-[cubic-bezier(0.6,0,0.4,1)]"
                  style={{
                    transform: visible ? 'translateY(0)' : 'translateY(30px)',
                    opacity: visible ? 1 : 0.001,
                    transitionDelay: `${d}ms`,
                  }}
                >
                  {c}
                </span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}

/* Hero content drifts up and fades slightly as you scroll away */
function useHeroParallax() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        el.style.transform = `translateY(${Math.min(y * 0.16, 110)}px)`
        el.style.opacity = String(Math.max(1 - y / 620, 0))
        raf = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return ref
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
            filter: visible ? 'blur(0px)' : 'blur(10px)',
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
  const { language } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)
  const heroRef = useHeroParallax()

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Start a project" },
      hero: { headline: "We build the site. We take it to the *top.* We automate the rest.", sub: "Custom-coded websites that rank on page one of Google, Meta & Google Ads campaigns, and booking, invoicing and accounting systems that free your business from paperwork.", cta: "Start a project", note: "delivered in 1–4 weeks · reply within 24h" },
      logos: "Trusted by businesses across Moldova and Europe",
      services: {
        label: "WHAT WE DO",
        items: [
          { title: "Websites & SEO", body: "Hand-coded, fast websites built to rank on the first page of Google and turn visitors into paying clients.", href: "/portfolio", link: "See the work" },
          { title: "Marketing & Ads", body: "Meta and Google campaigns, backlinks and optimised content. We don't just build your site — we push it to the top and keep it there.", href: "/case-studies", link: "See the results" },
          { title: "Systems & Automation", body: "Seat-selection bookings, appointments, invoicing, stock and automated accounting. Zero notebooks, zero paper, zero Excel.", href: "/solutions", link: "See the solutions" },
        ]
      },
      work: {
        label: "SELECTED WORK",
        viewAll: "All projects",
        projects: [
          { name: "Davo.md", desc: "International passenger and parcel transport. Website, booking system with airline-style seat selection, operator panel — plus SEO, backlinks and Meta Ads. Everything from one team.", tag: "END-TO-END", tagColor: "text-amber", category: "SITE · SYSTEM · SEO · ADS" },
          { name: "Inter-Bus", desc: "International bus parts store with a panel that runs the whole business: automated invoicing, live stock, profit per product and hands-free accounting.", tag: "ZERO PAPER", tagColor: "text-amber", category: "E-COMMERCE · ERP" },
          { name: "CMIEA.md", desc: "Municipal adult-education platform: accounts and login, searchable course catalog, online enrollment, events and clubs — plus a panel where the team publishes courses and tracks registrations. No paper lists left.", tag: "ONLINE ENROLLMENT", tagColor: "text-amber", category: "PLATFORM · LOGIN · COURSES" }
        ]
      },
      numbers: [
        { value: "50+", label: "Websites launched" },
        { value: "300%", label: "Average traffic increase" },
        { value: "10+", label: "Custom systems in production" },
        { value: "0", label: "Paper left after automation" }
      ],
      statement: "We don't just build websites. We rank them on Google, run the campaigns and automate the bookings, invoices and accounting behind them. You run the business — the systems work for you.",
      process: {
        label: "HOW WE WORK",
        steps: [
          { num: "01", title: "Analyse", body: "Your market, competitors and keywords — and the processes eating your hours. We find where you lose clients and where you lose time." },
          { num: "02", title: "Build & optimise", body: "A fast website with SEO baked into every page — or a system that automates your busywork. Usually both." },
          { num: "03", title: "Promote & grow", body: "SEO, backlinks, Meta & Google campaigns. We monitor rankings, traffic and conversions — and keep optimising." }
        ]
      },
      contact: { label: "CONTACT", heading: "Ready to get more clients?", sub: "Tell us about your business. We'll show you how to rank on Google, what to automate, and what it would cost." },
      form: { name: "Name", email: "Email", message: "Tell us about your business...", send: "Send message", sent: "Sent. We'll reply within 24 hours." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldova" }
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Incepe un proiect" },
      hero: { headline: "Construim site-ul. Il ducem in *top.* Automatizam restul.", sub: "Site-uri scrise manual care apar pe prima pagina Google, campanii Meta & Google Ads si sisteme de rezervari, facturare si contabilitate care iti scapa afacerea de foi.", cta: "Incepe un proiect", note: "livrat in 1–4 saptamani · raspuns in 24h" },
      logos: "De incredere pentru afaceri din Moldova si Europa",
      services: {
        label: "CE FACEM",
        items: [
          { title: "Site-uri & SEO", body: "Site-uri rapide, scrise manual, construite sa apara pe prima pagina Google si sa transforme vizitatorii in clienti.", href: "/portfolio", link: "Vezi lucrarile" },
          { title: "Promovare & Ads", body: "Campanii Meta si Google, backlinkuri si continut optimizat. Nu doar construim site-ul — il ducem sus si il tinem acolo.", href: "/case-studies", link: "Vezi rezultatele" },
          { title: "Sisteme & Automatizari", body: "Rezervari cu alegerea locului, programari, facturare, stoc si contabilitate automata. Zero caiete, zero foi, zero Excel.", href: "/solutions", link: "Vezi solutiile" },
        ]
      },
      work: {
        label: "LUCRARI SELECTATE",
        viewAll: "Toate proiectele",
        projects: [
          { name: "Davo.md", desc: "Transport international de pasageri si colete. Site, sistem de rezervari cu alegerea locului ca la avion, panou pentru operatori — plus SEO, backlinkuri si Meta Ads. Totul de la o singura echipa.", tag: "DE LA A LA Z", tagColor: "text-amber", category: "SITE · SISTEM · SEO · ADS" },
          { name: "Inter-Bus", desc: "Magazin international de piese cu un panou care conduce toata afacerea: facturare automata, stoc in timp real, profit pe fiecare produs si contabilitate care se face singura.", tag: "ZERO FOI", tagColor: "text-amber", category: "MAGAZIN ONLINE · ERP" },
          { name: "CMIEA.md", desc: "Platforma municipala de educatie pentru adulti: conturi si login, catalog de cursuri cu filtre, inscrieri online, evenimente si cluburi — plus un panou din care echipa publica cursurile si vede inscrierile. Zero liste pe hartie.", tag: "INSCRIERI ONLINE", tagColor: "text-amber", category: "PLATFORMA · LOGIN · CURSURI" }
        ]
      },
      numbers: [
        { value: "50+", label: "Site-uri lansate" },
        { value: "300%", label: "Crestere medie a traficului" },
        { value: "10+", label: "Sisteme custom in productie" },
        { value: "0", label: "Foi de hartie dupa automatizare" }
      ],
      statement: "Nu construim doar site-uri. Le ducem in top pe Google, rulam campaniile si automatizam rezervarile, facturile si contabilitatea din spate. Tu conduci afacerea — sistemele lucreaza pentru tine.",
      process: {
        label: "CUM LUCRAM",
        steps: [
          { num: "01", title: "Analizam", body: "Piata, competitorii, cuvintele cheie — si procesele care iti mananca orele. Gasim unde pierzi clienti si unde pierzi timp." },
          { num: "02", title: "Construim si optimizam", body: "Un site rapid cu SEO in fiecare pagina — sau un sistem care iti automatizeaza munca de rutina. De obicei, ambele." },
          { num: "03", title: "Promovam si crestem", body: "SEO, backlinkuri, campanii Meta si Google. Monitorizam pozitiile, traficul si conversiile — si continuam sa optimizam." }
        ]
      },
      contact: { label: "CONTACT", heading: "Pregatit sa atragi mai multi clienti?", sub: "Spune-ne despre afacerea ta. Iti aratam cum sa apari pe Google, ce merita automatizat si cat ar costa." },
      form: { name: "Nume", email: "Email", message: "Spune-ne despre afacerea ta...", send: "Trimite mesaj", sent: "Trimis. Revenim in 24 de ore." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldova" }
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Projekt starten" },
      hero: { headline: "Wir bauen die Website. Wir bringen sie nach *oben.* Wir automatisieren den Rest.", sub: "Handgeschriebene Websites auf Seite 1 bei Google, Meta & Google Ads Kampagnen und Systeme fur Buchungen, Rechnungen und Buchhaltung — die Ihr Unternehmen vom Papierkram befreien.", cta: "Projekt starten", note: "Lieferung in 1–4 Wochen · Antwort in 24h" },
      logos: "Vertraut von Unternehmen in Moldawien und Europa",
      services: {
        label: "WAS WIR TUN",
        items: [
          { title: "Websites & SEO", body: "Schnelle, handgeschriebene Websites, gebaut um auf Seite 1 zu ranken und Besucher in Kunden zu verwandeln.", href: "/portfolio", link: "Arbeiten ansehen" },
          { title: "Marketing & Ads", body: "Meta- und Google-Kampagnen, Backlinks und optimierte Inhalte. Wir bauen nicht nur die Website — wir bringen sie nach oben und halten sie dort.", href: "/case-studies", link: "Ergebnisse ansehen" },
          { title: "Systeme & Automatisierung", body: "Buchungen mit Sitzplatzwahl, Termine, Rechnungen, Lager und automatische Buchhaltung. Null Hefte, null Papier, null Excel.", href: "/solutions", link: "Losungen ansehen" },
        ]
      },
      work: {
        label: "AUSGEWAHLTE ARBEITEN",
        viewAll: "Alle Projekte",
        projects: [
          { name: "Davo.md", desc: "Internationaler Personen- und Pakettransport. Website, Buchungssystem mit Sitzplatzwahl wie im Flugzeug, Operator-Panel — plus SEO, Backlinks und Meta Ads. Alles aus einer Hand.", tag: "KOMPLETTPAKET", tagColor: "text-amber", category: "SITE · SYSTEM · SEO · ADS" },
          { name: "Inter-Bus", desc: "Internationaler Teileshop mit einem Panel, das das ganze Geschaft steuert: automatische Rechnungen, Live-Lager, Gewinn pro Produkt und Buchhaltung von selbst.", tag: "NULL PAPIER", tagColor: "text-amber", category: "E-COMMERCE · ERP" },
          { name: "CMIEA.md", desc: "Kommunale Plattform fur Erwachsenenbildung: Konten und Login, durchsuchbarer Kurskatalog, Online-Anmeldung, Veranstaltungen und Clubs — plus ein Panel, in dem das Team Kurse veroffentlicht und Anmeldungen verfolgt. Keine Papierlisten mehr.", tag: "ONLINE-ANMELDUNG", tagColor: "text-amber", category: "PLATTFORM · LOGIN · KURSE" }
        ]
      },
      numbers: [
        { value: "50+", label: "Websites gestartet" },
        { value: "300%", label: "Durchschnittliche Traffic-Steigerung" },
        { value: "10+", label: "Individuelle Systeme im Einsatz" },
        { value: "0", label: "Papier nach der Automatisierung" }
      ],
      statement: "Wir bauen nicht nur Websites. Wir bringen sie bei Google nach oben, fahren die Kampagnen und automatisieren Buchungen, Rechnungen und Buchhaltung dahinter. Sie fuhren das Geschaft — die Systeme arbeiten fur Sie.",
      process: {
        label: "WIE WIR ARBEITEN",
        steps: [
          { num: "01", title: "Analysieren", body: "Ihr Markt, Ihre Wettbewerber, Ihre Keywords — und die Prozesse, die Ihre Stunden fressen. Wir finden, wo Sie Kunden und Zeit verlieren." },
          { num: "02", title: "Bauen & optimieren", body: "Eine schnelle Website mit SEO in jeder Seite — oder ein System, das Ihre Routinearbeit automatisiert. Meistens beides." },
          { num: "03", title: "Bewerben & wachsen", body: "SEO, Backlinks, Meta- & Google-Kampagnen. Wir uberwachen Rankings, Traffic und Conversions — und optimieren weiter." }
        ]
      },
      contact: { label: "KONTAKT", heading: "Bereit fur mehr Kunden?", sub: "Erzahlen Sie uns von Ihrem Geschaft. Wir zeigen Ihnen, wie Sie bei Google ranken, was sich automatisieren lasst und was es kostet." },
      form: { name: "Name", email: "E-Mail", message: "Erzahlen Sie uns von Ihrem Geschaft...", send: "Nachricht senden", sent: "Gesendet. Antwort in 24 Stunden." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldawien" }
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Demarrer un projet" },
      hero: { headline: "On construit le site. On le fait *monter.* On automatise le reste.", sub: "Des sites codes sur mesure qui se classent en premiere page de Google, des campagnes Meta & Google Ads, et des systemes de reservation, facturation et comptabilite qui liberent votre entreprise de la paperasse.", cta: "Demarrer un projet", note: "livre en 1–4 semaines · reponse en 24h" },
      logos: "La confiance d'entreprises en Moldavie et en Europe",
      services: {
        label: "CE QU'ON FAIT",
        items: [
          { title: "Sites & SEO", body: "Des sites rapides, codes a la main, concus pour la premiere page de Google et pour transformer les visiteurs en clients.", href: "/portfolio", link: "Voir les projets" },
          { title: "Marketing & Ads", body: "Campagnes Meta et Google, backlinks et contenu optimise. On ne fait pas que construire votre site — on le fait monter et on l'y maintient.", href: "/case-studies", link: "Voir les resultats" },
          { title: "Systemes & Automatisation", body: "Reservations avec choix du siege, rendez-vous, facturation, stock et comptabilite automatique. Zero cahiers, zero papier, zero Excel.", href: "/solutions", link: "Voir les solutions" },
        ]
      },
      work: {
        label: "TRAVAUX SELECTIONNES",
        viewAll: "Tous les projets",
        projects: [
          { name: "Davo.md", desc: "Transport international de passagers et colis. Site, systeme de reservation avec choix du siege comme en avion, panneau operateurs — plus SEO, backlinks et Meta Ads. Tout par une seule equipe.", tag: "DE A A Z", tagColor: "text-amber", category: "SITE · SYSTEME · SEO · ADS" },
          { name: "Inter-Bus", desc: "Boutique internationale de pieces avec un panneau qui gere toute l'entreprise : facturation automatique, stock en direct, profit par produit et comptabilite sans effort.", tag: "ZERO PAPIER", tagColor: "text-amber", category: "E-COMMERCE · ERP" },
          { name: "CMIEA.md", desc: "Plateforme municipale de formation pour adultes : comptes et connexion, catalogue de cours avec filtres, inscriptions en ligne, evenements et clubs — plus un panneau ou l'equipe publie les cours et suit les inscriptions. Fini les listes papier.", tag: "INSCRIPTIONS EN LIGNE", tagColor: "text-amber", category: "PLATEFORME · LOGIN · COURS" }
        ]
      },
      numbers: [
        { value: "50+", label: "Sites lances" },
        { value: "300%", label: "Augmentation moyenne du trafic" },
        { value: "10+", label: "Systemes sur mesure en production" },
        { value: "0", label: "Papier apres l'automatisation" }
      ],
      statement: "On ne construit pas que des sites. On les fait monter sur Google, on gere les campagnes et on automatise les reservations, les factures et la comptabilite derriere. Vous dirigez l'entreprise — les systemes travaillent pour vous.",
      process: {
        label: "COMMENT ON TRAVAILLE",
        steps: [
          { num: "01", title: "Analyser", body: "Votre marche, vos concurrents, vos mots-cles — et les processus qui mangent vos heures. On trouve ou vous perdez des clients et du temps." },
          { num: "02", title: "Construire & optimiser", body: "Un site rapide avec le SEO dans chaque page — ou un systeme qui automatise votre routine. Souvent les deux." },
          { num: "03", title: "Promouvoir & grandir", body: "SEO, backlinks, campagnes Meta & Google. On surveille les positions, le trafic et les conversions — et on continue d'optimiser." }
        ]
      },
      contact: { label: "CONTACT", heading: "Pret a attirer plus de clients ?", sub: "Parlez-nous de votre activite. On vous montre comment apparaitre sur Google, quoi automatiser et combien ca couterait." },
      form: { name: "Nom", email: "Email", message: "Parlez-nous de votre activite...", send: "Envoyer", sent: "Envoye. Reponse sous 24 heures." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldavie" }
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Iniciar proyecto" },
      hero: { headline: "Creamos tu web. La llevamos *arriba.* Automatizamos el resto.", sub: "Webs a medida que aparecen en la primera pagina de Google, campanas de Meta & Google Ads, y sistemas de reservas, facturacion y contabilidad que liberan tu negocio del papeleo.", cta: "Iniciar proyecto", note: "entregado en 1–4 semanas · respuesta en 24h" },
      logos: "Confianza de empresas en Moldavia y Europa",
      services: {
        label: "QUE HACEMOS",
        items: [
          { title: "Webs & SEO", body: "Sitios rapidos, codificados a mano, disenados para la primera pagina de Google y para convertir visitantes en clientes.", href: "/portfolio", link: "Ver los proyectos" },
          { title: "Marketing & Ads", body: "Campanas de Meta y Google, backlinks y contenido optimizado. No solo creamos tu web — la subimos y la mantenemos arriba.", href: "/case-studies", link: "Ver los resultados" },
          { title: "Sistemas & Automatizacion", body: "Reservas con eleccion de asiento, citas, facturacion, stock y contabilidad automatica. Cero cuadernos, cero papel, cero Excel.", href: "/solutions", link: "Ver las soluciones" },
        ]
      },
      work: {
        label: "TRABAJOS SELECCIONADOS",
        viewAll: "Todos los proyectos",
        projects: [
          { name: "Davo.md", desc: "Transporte internacional de pasajeros y paquetes. Web, sistema de reservas con eleccion de asiento como en un vuelo, panel de operadores — mas SEO, backlinks y Meta Ads. Todo de un solo equipo.", tag: "TODO EN UNO", tagColor: "text-amber", category: "SITE · SISTEMA · SEO · ADS" },
          { name: "Inter-Bus", desc: "Tienda internacional de piezas con un panel que dirige todo el negocio: facturacion automatica, stock en vivo, beneficio por producto y contabilidad sin esfuerzo.", tag: "CERO PAPEL", tagColor: "text-amber", category: "E-COMMERCE · ERP" },
          { name: "CMIEA.md", desc: "Plataforma municipal de formacion para adultos: cuentas y acceso, catalogo de cursos con filtros, inscripciones online, eventos y clubes — mas un panel donde el equipo publica los cursos y gestiona las inscripciones. Cero listas en papel.", tag: "INSCRIPCIONES ONLINE", tagColor: "text-amber", category: "PLATAFORMA · LOGIN · CURSOS" }
        ]
      },
      numbers: [
        { value: "50+", label: "Webs lanzadas" },
        { value: "300%", label: "Aumento medio del trafico" },
        { value: "10+", label: "Sistemas a medida en produccion" },
        { value: "0", label: "Papel tras la automatizacion" }
      ],
      statement: "No solo creamos webs. Las subimos en Google, gestionamos las campanas y automatizamos las reservas, facturas y contabilidad que hay detras. Tu diriges el negocio — los sistemas trabajan para ti.",
      process: {
        label: "COMO TRABAJAMOS",
        steps: [
          { num: "01", title: "Analizamos", body: "Tu mercado, competidores y palabras clave — y los procesos que se comen tus horas. Encontramos donde pierdes clientes y tiempo." },
          { num: "02", title: "Construimos y optimizamos", body: "Una web rapida con SEO en cada pagina — o un sistema que automatiza tu rutina. Normalmente, ambos." },
          { num: "03", title: "Promocionamos y crecemos", body: "SEO, backlinks, campanas de Meta y Google. Monitoreamos posiciones, trafico y conversiones — y seguimos optimizando." }
        ]
      },
      contact: { label: "CONTACTO", heading: "Listo para mas clientes?", sub: "Cuentanos sobre tu negocio. Te mostramos como posicionarte en Google, que automatizar y cuanto costaria." },
      form: { name: "Nombre", email: "Email", message: "Cuentanos sobre tu negocio...", send: "Enviar mensaje", sent: "Enviado. Respuesta en 24 horas." },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldavia" }
    }
  }

  const t = text[language as keyof typeof text]

  const projects = [
    { ...t.work.projects[0], src: "/images/shot-davo.jpg", href: "https://davo.md", domain: "davo.md" },
    { ...t.work.projects[1], src: "/images/shot-interbus.jpg", href: "https://inter-bus.md", domain: "inter-bus.md" },
    { ...t.work.projects[2], src: "/images/shot-cmiea.jpg", href: "http://cmiea.md", domain: "cmiea.md" },
  ]

  const serviceIcons = [
    <path key="web" strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
    <path key="ads" strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />,
    <path key="sys" strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />,
  ]

  return (
    <div className="min-h-screen text-ink" style={{ background: '#0D0D0D' }}>

      <SiteNav contactHref="#contact" />

      {/* ── BORDERED CONTAINER ── */}
      <div id="layout-container" className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 relative line-sides">

        {/* ── HERO ── */}
        <section className="pt-32 md:pt-44 pb-16 md:pb-24 px-6 md:px-12 lg:px-16 relative glow-amber overflow-hidden" style={{ background: 'radial-gradient(ellipse 110% 80% at 50% -5%, #1B1B1B 0%, #131313 40%, #0D0D0D 78%)' }}>
          <HeroSpotlight />
          <div ref={heroRef} className="text-center max-w-4xl mx-auto relative z-10 will-change-transform">
            <h1 className="font-serif font-bold text-[clamp(2.4rem,5.6vw,4.8rem)] text-ink leading-[1.04] tracking-[-0.04em] text-balance">
              <CharsReveal text={t.hero.headline} delay={150} />
            </h1>
            <FadeIn delay={500}>
              <p className="mt-6 text-ink-muted text-[15px] md:text-base leading-relaxed max-w-xl mx-auto">
                {t.hero.sub}
              </p>
            </FadeIn>
            <FadeIn delay={700}>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Magnetic>
                  <Link href="#contact" className="btn-fill inline-flex items-center bg-amber text-[#0A0A0A] px-8 py-3.5 text-sm font-medium active:scale-[0.97] transition-transform group">
                    <span className="btn-fill-bg" aria-hidden />
                    <span className="btn-fill-label flex items-center gap-2">
                      {t.hero.cta}
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </Link>
                </Magnetic>
                <span className="text-ink-light text-[11px] tracking-wide font-mono">{t.hero.note}</span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── TRUSTED BY ── */}
        <section className="line-top" style={{ background: '#0D0D0D' }}>
          <FadeIn>
            <p className="text-center text-ink-light text-[10px] font-semibold tracking-[0.14em] uppercase pt-9 md:pt-11 pb-7 px-6">{t.logos}</p>
          </FadeIn>
          <LogoGrid />
        </section>

        {/* ── NUMBERS ── */}
        <section className="line-top" style={{ background: '#111111' }}>
          <AnimatedStatGrid className="grid grid-cols-2 md:grid-cols-4" stagger={150}>
            {t.numbers.map((n, i) => (
              <div key={i} className="px-6 md:px-8 py-8 md:py-10">
                <p className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-ink leading-none">
                  <AnimatedNumber value={n.value} />
                </p>
                <p className="text-ink-muted text-[12px] mt-2 font-mono tracking-wide uppercase">{n.label}</p>
              </div>
            ))}
          </AnimatedStatGrid>
        </section>

        {/* ── SERVICES ── */}
        <section className="line-top px-6 md:px-12 lg:px-16 py-14 md:py-20" style={{ background: '#0D0D0D' }}>
          <FadeIn>
            <span className="text-ink-light text-[11px] font-semibold tracking-[0.1em] uppercase block mb-10 md:mb-14">{t.services.label}</span>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12" stagger={180}>
            {t.services.items.map((s, i) => (
              <div key={i} className="group/svc flex flex-col">
                <div className="w-10 h-10 border border-divider/60 flex items-center justify-center mb-5 group-hover/svc:border-amber/50 transition-colors duration-500">
                  <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>{serviceIcons[i]}</svg>
                </div>
                <h3 className="font-serif text-lg md:text-xl text-ink mb-3">{s.title}</h3>
                <p className="text-ink-muted text-[13px] leading-relaxed mb-5 flex-1">{s.body}</p>
                <Link href={s.href} className="inline-flex items-center gap-1.5 text-amber hover:text-amber-light text-[12px] font-mono tracking-wide transition-colors group/link">
                  {s.link}
                  <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
                </Link>
              </div>
            ))}
          </StaggerGroup>
        </section>

        {/* ── WORK ── */}
        <section className="line-top px-6 md:px-12 lg:px-16 py-14 md:py-20" style={{ background: '#101010' }}>
          <FadeIn>
            <div className="flex items-center justify-between mb-12 md:mb-16">
              <span className="text-ink-light text-[11px] font-semibold tracking-[0.1em] uppercase">{t.work.label}</span>
              <Link href="/portfolio" className="text-ink-muted hover:text-ink text-[12px] font-mono transition-colors group inline-flex items-center gap-1">{t.work.viewAll} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span></Link>
            </div>
          </FadeIn>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6" stagger={140}>
            {projects.map((project, i) => (
              <Link key={i} href={project.href} target="_blank" rel="noopener noreferrer" className="group block h-full border border-white/[0.08] hover:border-white/[0.16] transition-colors duration-500 bg-[#131313]">
                <div className="aspect-[16/10] overflow-hidden border-b border-white/[0.08]">
                  <Image src={project.src} alt={`${project.name} — website, SEO and business systems by landings.md`} width={960} height={600} quality={85} className="w-full h-full object-cover object-top brightness-[0.96] group-hover:brightness-100 group-hover:scale-[1.03] transition-[transform,filter] duration-700 ease-smooth" />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                    <span className="text-[9px] font-mono tracking-[0.1em] uppercase text-ink-light">{project.category}</span>
                    <span className={`text-[9px] font-mono tracking-[0.1em] uppercase ${project.tagColor}`}>· {project.tag}</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-[22px] text-ink group-hover:text-amber transition-colors duration-300 mb-2">{project.name}</h3>
                  <p className="text-ink-muted text-[13px] leading-relaxed line-clamp-3">{project.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-ink-light group-hover:text-amber text-[11px] font-mono tracking-wide transition-colors duration-300">
                    {project.domain} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </StaggerGroup>
        </section>

        {/* ── STATEMENT ── */}
        <section className="line-top px-6 md:px-12 lg:px-16 py-16 md:py-24 relative glow-amber" style={{ background: '#0D0D0D' }}>
          <ScrubText
            text={t.statement}
            className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] text-ink leading-[1.4] tracking-[-0.01em] max-w-2xl"
          />
        </section>

        {/* ── PROCESS ── */}
        <section className="line-top px-6 md:px-12 lg:px-16 py-14 md:py-20" style={{ background: '#101010' }}>
          <FadeIn>
            <span className="text-ink-light text-[11px] font-semibold tracking-[0.1em] uppercase block mb-10 md:mb-14">{t.process.label}</span>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/[0.08]" stagger={200}>
            {t.process.steps.map((step, i) => (
              <div key={i} className={`relative ${i === 0 ? 'md:pr-10' : i === 2 ? 'md:pl-10' : 'md:px-10'}`}>
                <span className="font-serif text-[2.6rem] leading-none text-ink/[0.13] block mb-4 select-none">{step.num}</span>
                <h3 className="font-serif text-lg text-ink mb-3">{step.title}</h3>
                <p className="text-ink-muted text-[13px] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </StaggerGroup>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="line-top px-6 md:px-12 lg:px-16 py-14 md:py-24 relative grid-animated" style={{ background: '#0E0E0E' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <SlideIn direction="left">
              <span className="text-ink-light text-[11px] font-semibold tracking-[0.1em] uppercase block mb-4">{t.contact.label}</span>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.75rem)] text-ink leading-[1.1] mb-4">{t.contact.heading}</h2>
              <p className="text-ink-muted text-[14px] leading-relaxed">{t.contact.sub}</p>
              <p className="mt-6 text-ink-light text-[12px] font-mono">contact@landings.md</p>
              <Link href="tel:+37368327082" className="mt-1.5 inline-block text-ink-light hover:text-amber text-[12px] font-mono transition-colors">+373 683 27 082</Link>
            </SlideIn>
            <SlideIn direction="right" delay={200}>
              {formSent ? (
                <div className="flex items-center h-full"><p className="text-ink font-serif text-lg">{t.form.sent}</p></div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); const s = encodeURIComponent(`New project from ${formData.name}`); const b = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`); window.location.href = `mailto:contact@landings.md?subject=${s}&body=${b}`; setFormSent(true) }}>
                  <input type="text" required placeholder={t.form.name} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-divider/50 px-0 py-4 text-[14px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-amber/40 transition-colors duration-500 font-mono" />
                  <input type="email" required placeholder={t.form.email} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-divider/50 px-0 py-4 text-[14px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-amber/40 transition-colors duration-500 font-mono" />
                  <textarea required rows={3} placeholder={t.form.message} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-transparent border-b border-divider/50 px-0 py-4 text-[14px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-amber/40 transition-colors duration-500 resize-none font-mono" />
                  <div className="pt-6">
                    <button type="submit" className="btn-fill bg-amber text-[#0A0A0A] px-7 py-3 text-[13px] font-medium active:scale-[0.98] transition-transform">
                      <span className="btn-fill-bg" aria-hidden />
                      <span className="btn-fill-label">{t.form.send}</span>
                    </button>
                  </div>
                </form>
              )}
            </SlideIn>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="line-top px-6 md:px-12 lg:px-16 py-8 pb-28" style={{ background: '#0A0A0A' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center">
                <Image src="/images/logowhite.png" alt="landings.md — website design agency" width={16} height={26} className="w-4 h-auto opacity-70" />
              </Link>
              <div className="hidden md:flex items-center gap-4 text-[11px] text-ink-muted font-mono">
                <Link href="/portfolio" className="hover:text-ink transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-ink transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="hover:text-ink transition-colors">{t.nav.solutions}</Link>
                <Link href="/case-studies" className="hover:text-ink transition-colors">{t.nav.caseStudies}</Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Link href="tel:+37368327082" className="text-ink-muted hover:text-ink text-[11px] font-mono transition-colors">+373 683 27 082</Link>
              <Link href="mailto:contact@landings.md" className="text-ink-muted hover:text-ink text-[11px] font-mono transition-colors">contact@landings.md</Link>
              <span className="text-ink-muted text-[10px] font-mono">{t.footer.copy}</span>
            </div>
          </div>
          <p className="mt-4 text-ink-light text-[9px] font-mono tracking-wide leading-relaxed max-w-2xl">
            Websites, SEO, Meta & Google Ads and custom business systems for small businesses across Europe. Hand-coded websites that rank on Google — plus booking, invoicing, stock and automated accounting systems that replace paperwork. In English, Romanian, German, French, and Spanish. Chisinau, Moldova.
          </p>
        </footer>

      </div>
      {/* ── END BORDERED CONTAINER ── */}

      <StickyContactPill language={language as 'en' | 'ro' | 'de' | 'fr' | 'es'} />
    </div>
  )
}
