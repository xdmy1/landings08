"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SiteNav } from '@/components/ui/site-nav'
import { useLanguage } from '@/hooks/useLanguage'

/* ────────────────────────────────────────────────────────────────
   navarro.ro clone — landings.md content only.
   Ground #0d0d0d · lime #c6ff69 · Geist · blur-up reveals.
   ──────────────────────────────────────────────────────────────── */

const LIME = '#c6ff69'

/* Blur-up reveal — IntersectionObserver at 0.1 that REPLAYS:
   the .nv-hidden class returns when the block scrolls away. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`nv-reveal ${shown ? '' : 'nv-hidden'} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

/* "*word.*" markers → lime <b> (h1 b is lime via globals); \n → line break */
function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i} className="block">
          {line.split(/\*(.*?)\*/g).map((part, j) =>
            j % 2 === 1 ? <b key={j}>{part}</b> : <React.Fragment key={j}>{part}</React.Fragment>
          )}
        </span>
      ))}
    </>
  )
}

/* Same markers → lime <i> spans, for the real-claim quote */
function MarkedQuote({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*(.*?)\*/g).map((part, j) =>
        j % 2 === 1 ? <i key={j}>{part}</i> : <React.Fragment key={j}>{part}</React.Fragment>
      )}
    </>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
      <span className="dot-lime" />
      {children}
    </span>
  )
}

/* ── Fixed data: projects, accents, logos ── */
const PROJECTS_META = [
  { key: 'davo',     name: 'Davo.md',           url: 'davo.md',          accent: '#2456A6', shot: '/images/shot-davo.jpg',     logo: '/images/logos/davo.png' },
  { key: 'interbus', name: 'Inter-Bus',         url: 'inter-bus.md',     accent: '#D23B33', shot: '/images/shot-interbus.jpg', logo: '/images/logos/interbus.png' },
  { key: 'cmiea',    name: 'CMIEA.md',          url: 'cmiea.md',         accent: '#3E7BFA', shot: '/images/shot-cmiea.jpg',    logo: '/images/logos/cmiea.png' },
  { key: 'glg',      name: 'Scoala Auto GLG',   url: 'scoalaautoglg.com', accent: '#2f7df6', shot: '/images/shot-glg.jpg',      logo: '/images/logos/glg.png' },
] as const

const LOGO_ROW = ['davo', 'interbus', 'cmiea', 'glg', 'radx', 'rizzaclassic', 'autohuse', 'udc', 'eurogard', 'droppack'] as const

/* ── 5-language copy — real facts only, no diacritics ── */
const T = {
  en: {
    hero: {
      headline: 'We build the site\nWe take it to the *top.*\nWe automate the rest',
      sub: 'Custom-coded websites that rank on page one of Google, Meta & Google Ads campaigns, and booking, invoicing and accounting systems that free your business from paperwork.',
      cta: 'Start a project',
      note: 'delivered in 1–4 weeks · reply within 24h',
    },
    badges: ['50+ websites launched', '+300% avg. organic traffic', '10+ custom systems live', 'DR 50 · 2.6K backlinks', 'Delivered in 1-4 weeks', '5 languages, one team'],
    badgeEm: 'Custom-coded websites from 350 EUR — start to finish',
    logos: 'Trusted by businesses across Moldova and Europe',
    work: {
      label: 'Selected work',
      heading: 'Projects that *sell.*',
      view: 'View',
      projects: {
        davo:     { caption: 'Transport · Booking system',    line: '#1 in Moldova for online transport bookings' },
        interbus: { caption: 'Auto parts · Store + ERP',      line: 'Store + ERP running the whole business' },
        cmiea:    { caption: 'Education · Platform',          line: "The municipality's education platform" },
        glg:      { caption: 'Driving school · Bookings',     line: '15,000+ graduates, online scheduling' },
      },
    },
    proof: {
      label: 'Real results',
      quote: 'davo.md ranks *#1 on Google* for Moldova–Europe transport: *DR 50*, 2.6K backlinks and *+300% organic traffic* after relaunch.',
      attribution: 'Davo.md — a landings.md project · real Ahrefs data',
    },
    stats: {
      cells: [
        { v: '50+', l: 'websites launched' },
        { v: '300%', l: 'average traffic increase' },
        { v: '10+', l: 'custom systems in production' },
        { v: 'DR 50', l: 'davo.md · 2.6K backlinks' },
      ],
      offerLabel: 'The offer',
      offerTitle: 'from 350 EUR',
      offerSub: 'Custom-coded website — design, build, launch.',
      offerNote: 'Delivered in 1-4 weeks.',
      floats: ['SITE', 'SEO', 'ADS', 'SYSTEMS'],
    },
    about: {
      heading: 'Solutions, not just *websites.*',
      headingSub: 'Websites, SEO, ads and business systems — one team, start to finish.',
      aboutTitle: 'About the agency',
      aboutBody: 'landings.md is a web agency in Chisinau. We hand-code every website — no themes, no builders — then rank it on Google and automate the business behind it. 50+ projects live across Moldova and Europe.',
      stackLabel: 'The stack',
      stack: ['Next.js', 'React', 'Tailwind', 'Hand-written code'],
      langsLabel: '5 languages',
      langsNote: 'Every website we ship speaks up to 5 languages.',
      processLabel: 'Short process',
      steps: [
        { n: '01', t: 'Analysis', b: 'market & keywords' },
        { n: '02', t: 'Build', b: 'site + system, hand-coded' },
        { n: '03', t: 'Growth', b: 'SEO, ads, ongoing optimisation' },
      ],
      contactLabel: 'Contact',
    },
    contact: {
      label: 'Contact',
      heading: 'Ready to get more *clients?*',
      sub: "Tell us about your business. We'll show you how to rank on Google, what to automate, and what it would cost.",
      form: { name: 'Name', email: 'Email', message: 'Tell us about your business...', send: 'Send message' },
    },
    footer: { tagline: 'We build the site. We take it to the top. We automate the rest.', copy: '© 2026 landings.md · Chisinau, Moldova' },
    pill: { l1: 'Have a project in mind?', l2: 'Get a quote — from 350 EUR' },
  },
  ro: {
    hero: {
      headline: 'Construim site-ul\nIl ducem in *top.*\nAutomatizam restul',
      sub: 'Site-uri scrise manual care apar pe prima pagina Google, campanii Meta & Google Ads si sisteme de rezervari, facturare si contabilitate care iti scapa afacerea de foi.',
      cta: 'Incepe un proiect',
      note: 'livrat in 1–4 saptamani · raspuns in 24h',
    },
    badges: ['50+ site-uri lansate', '+300% trafic organic in medie', '10+ sisteme custom in productie', 'DR 50 · 2.6K backlinks', 'Livrare in 1-4 saptamani', '5 limbi, o singura echipa'],
    badgeEm: 'Site-uri custom-coded de la 350 EUR — de la A la Z',
    logos: 'De incredere pentru afaceri din Moldova si Europa',
    work: {
      label: 'Lucrari selectate',
      heading: 'Proiecte care *vand.*',
      view: 'Vezi',
      projects: {
        davo:     { caption: 'Transport · Rezervari',        line: '#1 in Moldova la transport online' },
        interbus: { caption: 'Piese auto · Magazin + ERP',   line: 'Magazin + ERP care conduce toata afacerea' },
        cmiea:    { caption: 'Educatie · Platforma',         line: 'Platforma de educatie a municipiului' },
        glg:      { caption: 'Scoala auto · Programari',     line: '15.000+ absolventi, programari online' },
      },
    },
    proof: {
      label: 'Rezultate reale',
      quote: 'davo.md e *#1 pe Google* la transport Moldova–Europa: *DR 50*, 2.6K backlinks si *+300% trafic organic* dupa relansare.',
      attribution: 'Davo.md — proiect landings.md · date reale din Ahrefs',
    },
    stats: {
      cells: [
        { v: '50+', l: 'site-uri lansate' },
        { v: '300%', l: 'crestere medie a traficului' },
        { v: '10+', l: 'sisteme custom in productie' },
        { v: 'DR 50', l: 'davo.md · 2.6K backlinks' },
      ],
      offerLabel: 'Oferta',
      offerTitle: 'de la 350 EUR',
      offerSub: 'Site custom-coded — design, constructie, lansare.',
      offerNote: 'Livrat in 1-4 saptamani.',
      floats: ['SITE', 'SEO', 'ADS', 'SISTEME'],
    },
    about: {
      heading: 'Solutii, nu doar *site-uri.*',
      headingSub: 'Site-uri, SEO, ads si sisteme de business — o singura echipa, de la A la Z.',
      aboutTitle: 'Despre agentie',
      aboutBody: 'landings.md e o agentie web din Chisinau. Scriem fiecare site manual — fara teme, fara constructori — apoi il ducem sus pe Google si automatizam business-ul din spate. 50+ proiecte live in Moldova si Europa.',
      stackLabel: 'Stack-ul',
      stack: ['Next.js', 'React', 'Tailwind', 'Cod scris manual'],
      langsLabel: '5 limbi',
      langsNote: 'Fiecare site livrat vorbeste pana la 5 limbi.',
      processLabel: 'Proces scurt',
      steps: [
        { n: '01', t: 'Analiza', b: 'piata si cuvintele cheie' },
        { n: '02', t: 'Constructie', b: 'site + sistem, cod scris manual' },
        { n: '03', t: 'Crestere', b: 'SEO, ads, optimizare continua' },
      ],
      contactLabel: 'Contact',
    },
    contact: {
      label: 'Contact',
      heading: 'Pregatit sa atragi mai multi *clienti?*',
      sub: 'Spune-ne despre afacerea ta. Iti aratam cum sa apari pe Google, ce merita automatizat si cat ar costa.',
      form: { name: 'Nume', email: 'Email', message: 'Spune-ne despre afacerea ta...', send: 'Trimite mesaj' },
    },
    footer: { tagline: 'Construim site-ul. Il ducem in top. Automatizam restul.', copy: '© 2026 landings.md · Chisinau, Moldova' },
    pill: { l1: 'Ai un proiect in minte?', l2: 'Cere oferta — de la 350 EUR' },
  },
  de: {
    hero: {
      headline: 'Wir bauen die Website\nWir bringen sie nach *oben.*\nWir automatisieren den Rest',
      sub: 'Handgeschriebene Websites auf Seite 1 bei Google, Meta & Google Ads Kampagnen und Systeme fur Buchungen, Rechnungen und Buchhaltung — die Ihr Unternehmen vom Papierkram befreien.',
      cta: 'Projekt starten',
      note: 'Lieferung in 1–4 Wochen · Antwort in 24h',
    },
    badges: ['50+ Websites gestartet', '+300% organischer Traffic im Schnitt', '10+ Systeme im Einsatz', 'DR 50 · 2.6K Backlinks', 'Lieferung in 1-4 Wochen', '5 Sprachen, ein Team'],
    badgeEm: 'Custom-coded Websites ab 350 EUR — von A bis Z',
    logos: 'Vertraut von Unternehmen in Moldawien und Europa',
    work: {
      label: 'Ausgewahlte Arbeiten',
      heading: 'Projekte, die *verkaufen.*',
      view: 'Ansehen',
      projects: {
        davo:     { caption: 'Transport · Buchungssystem',   line: '#1 in Moldau fur Online-Transport' },
        interbus: { caption: 'Autoteile · Shop + ERP',       line: 'Shop + ERP fur das ganze Geschaft' },
        cmiea:    { caption: 'Bildung · Plattform',          line: 'Die Bildungsplattform der Stadt' },
        glg:      { caption: 'Fahrschule · Termine',         line: '15.000+ Absolventen, Online-Termine' },
      },
    },
    proof: {
      label: 'Echte Ergebnisse',
      quote: 'davo.md steht *#1 bei Google* fur Transport Moldau–Europa: *DR 50*, 2.6K Backlinks und *+300% organischer Traffic* nach dem Relaunch.',
      attribution: 'Davo.md — ein landings.md Projekt · echte Ahrefs-Daten',
    },
    stats: {
      cells: [
        { v: '50+', l: 'Websites gestartet' },
        { v: '300%', l: 'durchschnittliche Traffic-Steigerung' },
        { v: '10+', l: 'individuelle Systeme im Einsatz' },
        { v: 'DR 50', l: 'davo.md · 2.6K Backlinks' },
      ],
      offerLabel: 'Das Angebot',
      offerTitle: 'ab 350 EUR',
      offerSub: 'Custom-coded Website — Design, Bau, Launch.',
      offerNote: 'Lieferung in 1-4 Wochen.',
      floats: ['SITE', 'SEO', 'ADS', 'SYSTEME'],
    },
    about: {
      heading: 'Losungen, nicht nur *Websites.*',
      headingSub: 'Websites, SEO, Ads und Business-Systeme — ein Team, von A bis Z.',
      aboutTitle: 'Uber die Agentur',
      aboutBody: 'landings.md ist eine Webagentur in Chisinau. Wir schreiben jede Website von Hand — keine Themes, keine Baukasten — bringen sie bei Google nach oben und automatisieren das Geschaft dahinter. 50+ Projekte live in Moldawien und Europa.',
      stackLabel: 'Der Stack',
      stack: ['Next.js', 'React', 'Tailwind', 'Handgeschriebener Code'],
      langsLabel: '5 Sprachen',
      langsNote: 'Jede gelieferte Website spricht bis zu 5 Sprachen.',
      processLabel: 'Kurzer Prozess',
      steps: [
        { n: '01', t: 'Analyse', b: 'Markt & Keywords' },
        { n: '02', t: 'Bau', b: 'Site + System, handgeschrieben' },
        { n: '03', t: 'Wachstum', b: 'SEO, Ads, laufende Optimierung' },
      ],
      contactLabel: 'Kontakt',
    },
    contact: {
      label: 'Kontakt',
      heading: 'Bereit fur mehr *Kunden?*',
      sub: 'Erzahlen Sie uns von Ihrem Geschaft. Wir zeigen Ihnen, wie Sie bei Google ranken, was sich automatisieren lasst und was es kostet.',
      form: { name: 'Name', email: 'E-Mail', message: 'Erzahlen Sie uns von Ihrem Geschaft...', send: 'Nachricht senden' },
    },
    footer: { tagline: 'Wir bauen die Website. Wir bringen sie nach oben. Wir automatisieren den Rest.', copy: '© 2026 landings.md · Chisinau, Moldawien' },
    pill: { l1: 'Ein Projekt im Kopf?', l2: 'Angebot anfordern — ab 350 EUR' },
  },
  fr: {
    hero: {
      headline: 'On construit le site\nOn le fait *monter.*\nOn automatise le reste',
      sub: 'Des sites codes sur mesure qui se classent en premiere page de Google, des campagnes Meta & Google Ads, et des systemes de reservation, facturation et comptabilite qui liberent votre entreprise de la paperasse.',
      cta: 'Demarrer un projet',
      note: 'livre en 1–4 semaines · reponse en 24h',
    },
    badges: ['50+ sites lances', '+300% de trafic organique en moyenne', '10+ systemes en production', 'DR 50 · 2.6K backlinks', 'Livraison en 1-4 semaines', '5 langues, une equipe'],
    badgeEm: 'Sites codes sur mesure des 350 EUR — de A a Z',
    logos: "La confiance d'entreprises en Moldavie et en Europe",
    work: {
      label: 'Travaux selectionnes',
      heading: 'Des projets qui *vendent.*',
      view: 'Voir',
      projects: {
        davo:     { caption: 'Transport · Reservations',     line: '#1 en Moldavie pour le transport en ligne' },
        interbus: { caption: 'Pieces auto · Boutique + ERP', line: "Boutique + ERP qui gere toute l'entreprise" },
        cmiea:    { caption: 'Education · Plateforme',       line: 'La plateforme educative de la municipalite' },
        glg:      { caption: 'Auto-ecole · Rendez-vous',     line: '15 000+ diplomes, rendez-vous en ligne' },
      },
    },
    proof: {
      label: 'Resultats reels',
      quote: 'davo.md est *#1 sur Google* pour le transport Moldavie–Europe : *DR 50*, 2.6K backlinks et *+300% de trafic organique* apres la refonte.',
      attribution: 'Davo.md — un projet landings.md · donnees reelles Ahrefs',
    },
    stats: {
      cells: [
        { v: '50+', l: 'sites lances' },
        { v: '300%', l: 'augmentation moyenne du trafic' },
        { v: '10+', l: 'systemes sur mesure en production' },
        { v: 'DR 50', l: 'davo.md · 2.6K backlinks' },
      ],
      offerLabel: "L'offre",
      offerTitle: 'des 350 EUR',
      offerSub: 'Site code sur mesure — design, construction, lancement.',
      offerNote: 'Livre en 1-4 semaines.',
      floats: ['SITE', 'SEO', 'ADS', 'SYSTEMES'],
    },
    about: {
      heading: 'Des solutions, pas seulement des *sites.*',
      headingSub: 'Sites, SEO, ads et systemes business — une seule equipe, de A a Z.',
      aboutTitle: "L'agence",
      aboutBody: 'landings.md est une agence web a Chisinau. Chaque site est code a la main — pas de themes, pas de builders — puis classe sur Google, avec le business automatise derriere. 50+ projets en ligne en Moldavie et en Europe.',
      stackLabel: 'Le stack',
      stack: ['Next.js', 'React', 'Tailwind', 'Code ecrit main'],
      langsLabel: '5 langues',
      langsNote: "Chaque site livre parle jusqu'a 5 langues.",
      processLabel: 'Processus court',
      steps: [
        { n: '01', t: 'Analyse', b: 'marche & mots-cles' },
        { n: '02', t: 'Construction', b: 'site + systeme, code main' },
        { n: '03', t: 'Croissance', b: 'SEO, ads, optimisation continue' },
      ],
      contactLabel: 'Contact',
    },
    contact: {
      label: 'Contact',
      heading: 'Pret a attirer plus de *clients ?*',
      sub: 'Parlez-nous de votre activite. On vous montre comment apparaitre sur Google, quoi automatiser et combien ca couterait.',
      form: { name: 'Nom', email: 'Email', message: 'Parlez-nous de votre activite...', send: 'Envoyer' },
    },
    footer: { tagline: 'On construit le site. On le fait monter. On automatise le reste.', copy: '© 2026 landings.md · Chisinau, Moldavie' },
    pill: { l1: 'Un projet en tete ?', l2: 'Demandez un devis — des 350 EUR' },
  },
  es: {
    hero: {
      headline: 'Creamos tu web\nLa llevamos *arriba.*\nAutomatizamos el resto',
      sub: 'Webs a medida que aparecen en la primera pagina de Google, campanas de Meta & Google Ads, y sistemas de reservas, facturacion y contabilidad que liberan tu negocio del papeleo.',
      cta: 'Iniciar proyecto',
      note: 'entregado en 1–4 semanas · respuesta en 24h',
    },
    badges: ['50+ webs lanzadas', '+300% de trafico organico de media', '10+ sistemas en produccion', 'DR 50 · 2.6K backlinks', 'Entrega en 1-4 semanas', '5 idiomas, un equipo'],
    badgeEm: 'Webs a medida desde 350 EUR — de principio a fin',
    logos: 'Confianza de empresas en Moldavia y Europa',
    work: {
      label: 'Trabajos seleccionados',
      heading: 'Proyectos que *venden.*',
      view: 'Ver',
      projects: {
        davo:     { caption: 'Transporte · Reservas',        line: '#1 en Moldavia en transporte online' },
        interbus: { caption: 'Repuestos · Tienda + ERP',     line: 'Tienda + ERP que dirige todo el negocio' },
        cmiea:    { caption: 'Educacion · Plataforma',       line: 'La plataforma educativa del municipio' },
        glg:      { caption: 'Autoescuela · Citas',          line: '15.000+ graduados, citas online' },
      },
    },
    proof: {
      label: 'Resultados reales',
      quote: 'davo.md es *#1 en Google* en transporte Moldavia–Europa: *DR 50*, 2.6K backlinks y *+300% de trafico organico* tras el relanzamiento.',
      attribution: 'Davo.md — un proyecto de landings.md · datos reales de Ahrefs',
    },
    stats: {
      cells: [
        { v: '50+', l: 'webs lanzadas' },
        { v: '300%', l: 'aumento medio del trafico' },
        { v: '10+', l: 'sistemas a medida en produccion' },
        { v: 'DR 50', l: 'davo.md · 2.6K backlinks' },
      ],
      offerLabel: 'La oferta',
      offerTitle: 'desde 350 EUR',
      offerSub: 'Web a medida — diseno, construccion, lanzamiento.',
      offerNote: 'Entregado en 1-4 semanas.',
      floats: ['SITE', 'SEO', 'ADS', 'SISTEMAS'],
    },
    about: {
      heading: 'Soluciones, no solo *webs.*',
      headingSub: 'Webs, SEO, ads y sistemas de negocio — un solo equipo, de principio a fin.',
      aboutTitle: 'La agencia',
      aboutBody: 'landings.md es una agencia web en Chisinau. Codificamos cada web a mano — sin plantillas, sin builders — la subimos en Google y automatizamos el negocio detras. 50+ proyectos en Moldavia y Europa.',
      stackLabel: 'El stack',
      stack: ['Next.js', 'React', 'Tailwind', 'Codigo a mano'],
      langsLabel: '5 idiomas',
      langsNote: 'Cada web entregada habla hasta 5 idiomas.',
      processLabel: 'Proceso corto',
      steps: [
        { n: '01', t: 'Analisis', b: 'mercado y palabras clave' },
        { n: '02', t: 'Construccion', b: 'web + sistema, codigo a mano' },
        { n: '03', t: 'Crecimiento', b: 'SEO, ads, optimizacion continua' },
      ],
      contactLabel: 'Contacto',
    },
    contact: {
      label: 'Contacto',
      heading: 'Listo para mas *clientes?*',
      sub: 'Cuentanos sobre tu negocio. Te mostramos como posicionarte en Google, que automatizar y cuanto costaria.',
      form: { name: 'Nombre', email: 'Email', message: 'Cuentanos sobre tu negocio...', send: 'Enviar mensaje' },
    },
    footer: { tagline: 'Creamos tu web. La llevamos arriba. Automatizamos el resto.', copy: '© 2026 landings.md · Chisinau, Moldavia' },
    pill: { l1: 'Un proyecto en mente?', l2: 'Pide presupuesto — desde 350 EUR' },
  },
}

/* ──────────────────────────────────────────────────────────────── */

export default function Home() {
  const { language } = useLanguage()
  const t = T[language as keyof typeof T] ?? T.en

  /* slider */
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const step = () => {
    const el = trackRef.current
    const first = el?.firstElementChild as HTMLElement | null
    return first ? first.offsetWidth + 24 : 1
  }
  const onTrackScroll = () => {
    const el = trackRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / step())
    setActive(Math.min(PROJECTS_META.length - 1, Math.max(0, idx)))
  }
  const goTo = (i: number) => {
    const clamped = Math.min(PROJECTS_META.length - 1, Math.max(0, i))
    trackRef.current?.scrollTo({ left: clamped * step(), behavior: 'smooth' })
  }

  /* mailto form */
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Proiect nou — ${form.name || 'landings.md'}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name} · ${form.email}`)
    window.location.href = `mailto:contact@landings.md?subject=${subject}&body=${body}`
  }

  return (
    <main style={{ background: '#0d0d0d' }}>
      <SiteNav contactHref="#contact" />

      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden">
        {/* badges cloud — 2x3 real-fact chips + 1 emphasized, drifting */}
        <div className="nv-container pt-8 md:pt-12">
          <Reveal>
            <div className="mx-auto flex max-w-[860px] flex-wrap items-center justify-center gap-3">
              {t.badges.map((b, i) => (
                <div key={b} className={`nv-float-${(i % 4) + 1}`}>
                  <span className="chip">
                    <span className="chip-inner">
                      <span className="dot-lime" />
                      {b}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-4 flex justify-center">
              <div className="nv-float-2">
                <span className="chip chip--em">
                  <span className="chip-inner">
                    <span className="dot-lime" />
                    {t.badgeEm}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* client logo row — 30% → 80% */}
          <Reveal delay={0.14}>
            <div className="mx-auto mt-12 flex max-w-[900px] flex-wrap items-center justify-center gap-x-10 gap-y-6 md:mt-14">
              {LOGO_ROW.map((l) => (
                <span key={l} className="nv-logo">
                  <Image src={`/images/logos/${l}.png`} alt={l} width={110} height={28} className="h-6 w-auto md:h-7" />
                </span>
              ))}
            </div>
            <p className="sr-only">{t.logos}</p>
          </Reveal>
        </div>

        {/* 460px circle — the product replaces the portrait */}
        <div className="relative z-0 mt-12 flex justify-center md:mt-16">
          <div className="relative" style={{ width: 'min(460px, 84vw)', aspectRatio: '1 / 1' }}>
            {/* saturated blob */}
            <div
              aria-hidden
              className="absolute -inset-14 rounded-full"
              style={{
                background: 'conic-gradient(from 40deg, #2456A6, #c6ff69, #D23B33, #3E7BFA, #2456A6)',
                filter: 'saturate(1.1) blur(70px)',
                opacity: 0.45,
              }}
            />
            {/* white ellipse blur */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: '120%', height: 300, background: '#fff', filter: 'blur(140px)', opacity: 0.16 }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-full" style={{ border: '1px solid rgba(73,73,73,0.6)' }}>
              <Image
                src="/images/shot-davo.jpg"
                alt="Davo.md — platforma de rezervari construita de landings.md"
                fill
                sizes="460px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>

        {/* fluted glass band — overlaps the circle bottom; H1 sits ON the glass */}
        <div className="fluted relative z-10 -mt-40 md:-mt-48">
          <div className="relative z-[1] nv-container">
            <div className="mx-auto max-w-[1040px] pb-14 pt-16 text-center md:pb-20 md:pt-24">
              <Reveal>
                <h1
                  className="mx-auto max-w-[900px] font-bold"
                  style={{
                    fontSize: 'clamp(2.625rem, 6.2vw, 5rem)',
                    lineHeight: 1.01,
                    letterSpacing: '-0.058em',
                  }}
                >
                  <Marked text={t.hero.headline} />
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p
                  className="mx-auto mt-7 max-w-[900px] font-medium"
                  style={{
                    color: '#e0e0e2',
                    fontSize: 'clamp(1.125rem, 2.4vw, 2.0625rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.045em',
                  }}
                >
                  {t.hero.sub}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <a href="mailto:contact@landings.md" className="btn-metal mt-9 inline-flex">
                  {t.hero.cta}
                  <span className="nv-arr" aria-hidden>&rarr;</span>
                </a>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-5 text-[0.875rem] font-medium" style={{ color: '#909099' }}>
                  {t.hero.note}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PROJECTS SLIDER ════════ */}
      <section className="pt-16 md:pt-24">
        <div className="nv-container">
          <Reveal>
            <Label>{t.work.label}</Label>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-4 font-bold"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}
            >
              <Marked text={t.work.heading} />
            </h2>
          </Reveal>

          {/* track — scroll-snap, portrait cards 408x710 */}
          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="nv-scroll mt-10 flex gap-6 overflow-x-auto pb-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {PROJECTS_META.map((p, i) => {
              const pt = t.work.projects[p.key]
              return (
                <Reveal key={p.key} delay={i * 0.07} className="flex-none" >
                  <article
                    className="group relative overflow-hidden"
                    style={{
                      width: 'min(408px, 80vw)',
                      aspectRatio: '408 / 710',
                      borderRadius: 36,
                      border: '1px solid rgba(73,73,73,0.6)',
                      background: 'linear-gradient(120deg,#191919 0%,#0b0b0b 90%)',
                      scrollSnapAlign: 'start',
                    }}
                  >
                    {/* full-bleed screenshot */}
                    <Image
                      src={p.shot}
                      alt={p.name}
                      fill
                      sizes="408px"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    {/* top overlay: client + service caption */}
                    <div
                      className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 px-6 pb-12 pt-5"
                      style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.85), rgba(8,8,8,0.4) 55%, transparent)' }}
                    >
                      <span className="text-[15px] font-medium text-white">{p.name}</span>
                      <span className="text-right text-[12px] font-medium uppercase tracking-[0.1em]" style={{ color: '#a4a4a4' }}>
                        {pt.caption}
                      </span>
                    </div>
                    {/* bottom overlay: superlative + view */}
                    <div
                      className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-6 pb-6 pt-16"
                      style={{ background: 'linear-gradient(0deg, rgba(6,6,6,0.92), rgba(6,6,6,0.5) 55%, transparent)' }}
                    >
                      <p className="max-w-[68%] text-[0.9375rem] font-medium leading-snug text-white">{pt.line}</p>
                      <a
                        href={`https://${p.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-none items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-white transition-[box-shadow] duration-300 ease-in-out hover:[box-shadow:0_0_1px_1px_#c6ff69]"
                        style={{
                          border: '1px solid rgba(255,255,255,0.2)',
                          background: 'linear-gradient(120deg, rgba(30,30,30,0.65), rgba(10,10,10,0.55))',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                        }}
                      >
                        {t.work.view}
                        <span aria-hidden style={{ display: 'inline-block', transform: 'rotate(-45deg)', color: LIME }}>&rarr;</span>
                      </a>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>

          {/* pagination bullets (per-project accent) + gradient-ring prev/next */}
          <Reveal delay={0.1}>
            <div className="mt-6 flex items-center justify-between">
              <div className="nv-edge nv-edge--pill">
                <div className="nv-edge-inner flex items-center gap-2 px-4 py-3">
                  {PROJECTS_META.map((p, i) => (
                    <button
                      key={p.key}
                      onClick={() => goTo(i)}
                      aria-label={`Slide ${i + 1} — ${p.name}`}
                      style={{
                        width: active === i ? 22 : 10,
                        height: 10,
                        borderRadius: 999,
                        background: active === i ? p.accent : 'rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease-in-out',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="nv-edge nv-edge--pill">
                  <button onClick={() => goTo(active - 1)} className="nv-navbtn" aria-label="Previous project">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div className="nv-edge nv-edge--pill">
                  <button onClick={() => goTo(active + 1)} className="nv-navbtn" aria-label="Next project">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ PROOF — real claim + real analytics ════════ */}
      <section className="pt-20 md:pt-28">
        <div className="nv-container">
          <Reveal>
            <div className="nv-edge">
              <div className="nv-edge-inner grid items-center gap-8 p-7 md:grid-cols-[1.05fr_1fr] md:gap-12 md:p-12">
                <div>
                  <Label>{t.proof.label}</Label>
                  <blockquote
                    className="mt-6 font-medium text-white"
                    style={{ fontSize: 'clamp(1.375rem, 2.4vw, 1.75rem)', lineHeight: 1.3, letterSpacing: '-1.34px' }}
                  >
                    <MarkedQuote text={t.proof.quote} />
                  </blockquote>
                  <p className="mt-6 text-[0.875rem] font-medium" style={{ color: '#909099' }}>
                    {t.proof.attribution}
                  </p>
                </div>
                <div
                  className="relative overflow-hidden rounded-[20px]"
                  style={{
                    border: '1px solid rgba(73,73,73,0.6)',
                    boxShadow: '0 0 50px -9px rgba(198,255,105,0.3)',
                    aspectRatio: '16 / 10',
                  }}
                >
                  <Image
                    src="/images/davo-ahrefs.png"
                    alt="Ahrefs — davo.md: DR 50, 2.6K backlinks"
                    fill
                    sizes="(min-width: 768px) 600px, 90vw"
                    className="object-cover object-left-top"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ STATS BENTO — .7fr 1fr .8fr, center offer spans 2 rows ════════ */}
      <section className="pt-20 md:pt-28">
        <div className="nv-container">
          <div className="nv-bento-stats">
            {/* col 1 row 1 */}
            <Reveal className="h-full">
              <div className="nv-edge nv-edge--ring h-full">
                <div className="nv-edge-inner flex h-full flex-col justify-center p-7 text-center">
                  <span className="font-semibold" style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.stats.cells[0].v}</span>
                  <span className="mt-3 text-[0.875rem] font-medium" style={{ color: '#909099' }}>{t.stats.cells[0].l}</span>
                </div>
              </div>
            </Reveal>

            {/* center offer card — spans both rows */}
            <Reveal delay={0.06} className="nv-bento-center h-full">
              <div className="nv-edge nv-edge--alt h-full">
                <div className="nv-edge-inner flex h-full flex-col p-7 text-center md:p-9">
                  <span className="text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
                    {t.stats.offerLabel}
                  </span>
                  <h3 className="mt-3 font-bold" style={{ fontSize: '2.5rem', letterSpacing: '-2.4px', lineHeight: 1 }}>
                    <b>{t.stats.offerTitle}</b>
                  </h3>
                  <p className="mx-auto mt-3 max-w-[300px] text-[0.9375rem] font-medium" style={{ color: '#b8b8b9' }}>
                    {t.stats.offerSub}
                  </p>

                  {/* screenshot + 4 floating lime labels */}
                  <div className="relative mx-auto mt-7 w-full max-w-[380px] flex-1">
                    <div
                      className="relative mx-auto overflow-hidden rounded-[20px]"
                      style={{ border: '1px solid rgba(73,73,73,0.6)', aspectRatio: '16 / 12', maxHeight: 320 }}
                    >
                      <Image
                        src="/images/shot-eliteprotocol.jpg"
                        alt="Site custom-coded — landings.md"
                        fill
                        sizes="380px"
                        className="object-cover object-top"
                      />
                    </div>
                    {t.stats.floats.map((f, i) => (
                      <span
                        key={f}
                        className={`nv-float-${i + 1} absolute rounded-full px-3 py-1.5 text-[12px] font-semibold`}
                        style={{
                          background: LIME,
                          color: '#0d0d0d',
                          boxShadow: '0 6px 18px rgba(0,0,0,0.45)',
                          ...( [
                            { top: '-4%', left: '-3%' },
                            { top: '18%', right: '-5%' },
                            { bottom: '22%', left: '-6%' },
                            { bottom: '-4%', right: '-2%' },
                          ][i] as React.CSSProperties),
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 text-[0.875rem] font-medium" style={{ color: '#909099' }}>{t.stats.offerNote}</p>
                  <a href="mailto:contact@landings.md" className="btn-metal btn-metal--sm mx-auto mt-4">
                    {t.hero.cta}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* col 3 row 1 */}
            <Reveal delay={0.1} className="h-full">
              <div className="nv-edge nv-edge--ring h-full">
                <div className="nv-edge-inner flex h-full flex-col justify-center p-7 text-center">
                  <span className="font-semibold" style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.stats.cells[1].v}</span>
                  <span className="mt-3 text-[0.875rem] font-medium" style={{ color: '#909099' }}>{t.stats.cells[1].l}</span>
                </div>
              </div>
            </Reveal>

            {/* col 1 row 2 */}
            <Reveal delay={0.14} className="h-full">
              <div className="nv-edge nv-edge--ring h-full">
                <div className="nv-edge-inner flex h-full flex-col justify-center p-7 text-center">
                  <span className="font-semibold" style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.stats.cells[2].v}</span>
                  <span className="mt-3 text-[0.875rem] font-medium" style={{ color: '#909099' }}>{t.stats.cells[2].l}</span>
                </div>
              </div>
            </Reveal>

            {/* col 3 row 2 */}
            <Reveal delay={0.18} className="h-full">
              <div className="nv-edge nv-edge--ring h-full">
                <div className="nv-edge-inner flex h-full flex-col justify-center p-7 text-center">
                  <span className="font-semibold" style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1, color: LIME }}>{t.stats.cells[3].v}</span>
                  <span className="mt-3 text-[0.875rem] font-medium" style={{ color: '#909099' }}>{t.stats.cells[3].l}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ ABOUT BENTO — named areas ════════ */}
      <section className="pt-20 md:pt-28">
        <div className="nv-container">
          <div className="nv-bento-about">
            {/* div1 — despre agentie (tall left) */}
            <Reveal className="nv-a1 h-full">
              <div className="nv-edge h-full">
                <div className="nv-edge-inner flex h-full min-h-[300px] flex-col p-7 md:p-8">
                  <Image src="/images/logowhite.png" alt="landings.md" width={34} height={56} className="h-12 w-auto self-start opacity-90" />
                  <h3 className="mt-8 text-[1.375rem] font-semibold" style={{ letterSpacing: '-0.03em' }}>{t.about.aboutTitle}</h3>
                  <p className="mt-4 flex-1 text-[0.9375rem] font-medium leading-relaxed" style={{ color: '#b8b8b9' }}>
                    {t.about.aboutBody}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* div3 — heading + stack (top right, wide) */}
            <Reveal delay={0.06} className="nv-a3 h-full">
              <div className="nv-edge nv-edge--alt h-full">
                <div className="nv-edge-inner flex h-full min-h-[220px] flex-col justify-center p-7 text-center md:p-9">
                  <h2 className="font-bold" style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}>
                    <Marked text={t.about.heading} />
                  </h2>
                  <p className="mx-auto mt-4 max-w-[480px] text-[0.9375rem] font-medium" style={{ color: '#b8b8b9' }}>
                    {t.about.headingSub}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    {t.about.stack.map((s) => (
                      <span key={s} className="chip">
                        <span className="chip-inner !px-3.5 !py-1.5 text-[12px]">{s}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* div4 — 5 limbi (short wide) */}
            <Reveal delay={0.1} className="nv-a4 h-full">
              <div className="nv-edge nv-edge--ring h-full">
                <div className="nv-edge-inner flex h-full min-h-[110px] flex-wrap items-center justify-between gap-4 px-7 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[1.25rem] font-semibold" style={{ color: LIME, letterSpacing: '-0.02em' }}>{t.about.langsLabel}</span>
                    <span className="hidden text-[0.875rem] font-medium sm:block" style={{ color: '#909099' }}>{t.about.langsNote}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {['EN', 'RO', 'DE', 'FR', 'ES'].map((l) => (
                      <span
                        key={l}
                        className="rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em]"
                        style={{ border: '1px solid rgba(255,255,255,0.16)', color: '#e0e0e2' }}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* div5 — proces scurt (bottom wide) */}
            <Reveal delay={0.14} className="nv-a5 h-full">
              <div className="nv-edge h-full">
                <div className="nv-edge-inner flex h-full min-h-[180px] flex-col p-7 md:p-8">
                  <Label>{t.about.processLabel}</Label>
                  <div className="mt-6 grid flex-1 gap-6 sm:grid-cols-3">
                    {t.about.steps.map((s) => (
                      <div key={s.n}>
                        <span className="text-[13px] font-semibold" style={{ color: LIME }}>{s.n}</span>
                        <p className="mt-2 text-[1rem] font-semibold" style={{ letterSpacing: '-0.02em' }}>{s.t}</p>
                        <p className="mt-1 text-[0.875rem] font-medium" style={{ color: '#909099' }}>{s.b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* div2 — contact mini (bottom left) */}
            <Reveal delay={0.18} className="nv-a2 h-full">
              <div className="nv-edge nv-edge--ring h-full">
                <div className="nv-edge-inner flex h-full min-h-[150px] flex-col justify-center gap-2 p-7">
                  <Label>{t.about.contactLabel}</Label>
                  <a href="mailto:contact@landings.md" className="mt-2 text-[1rem] font-medium text-white transition-colors duration-300 hover:!text-[#c6ff69]">
                    contact@landings.md
                  </a>
                  <a href="tel:+37368327082" className="text-[1rem] font-medium transition-colors duration-300 hover:!text-[#c6ff69]" style={{ color: '#b8b8b9' }}>
                    +373 683 27 082
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section id="contact" className="pt-20 md:pt-28">
        <div className="nv-container">
          <Reveal>
            <div className="nv-edge">
              <div className="nv-edge-inner relative p-7 md:p-12">
                {/* soft lime under-glow at the top edge */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 h-40 w-[440px] -translate-x-1/2 -translate-y-1/2"
                  style={{ background: 'radial-gradient(closest-side, #c6ff6933, transparent)' }}
                />
                <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
                  <div>
                    <Label>{t.contact.label}</Label>
                    <h2
                      className="mt-5 font-bold"
                      style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}
                    >
                      <Marked text={t.contact.heading} />
                    </h2>
                    <p className="mt-5 max-w-[440px] text-[1rem] font-medium leading-relaxed" style={{ color: '#b8b8b9' }}>
                      {t.contact.sub}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <a href="mailto:contact@landings.md" className="btn-metal">
                        contact@landings.md
                        <span className="nv-arr" aria-hidden>&rarr;</span>
                      </a>
                      <a
                        href="tel:+37368327082"
                        className="inline-flex items-center rounded-full px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-[box-shadow] duration-300 ease-in-out hover:[box-shadow:0_0_1px_1px_#c6ff69]"
                        style={{ border: '1px solid rgba(255,255,255,0.16)' }}
                      >
                        +373 683 27 082
                      </a>
                    </div>
                  </div>

                  {/* simple mailto form */}
                  <form onSubmit={submitForm} className="flex flex-col gap-5">
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.contact.form.name}
                      className="bg-transparent pb-3 text-[1rem] font-medium text-white outline-none transition-colors duration-300 placeholder:text-[#909099] focus:border-[#c6ff69]"
                      style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', borderRadius: 0, boxShadow: 'none' }}
                    />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t.contact.form.email}
                      className="bg-transparent pb-3 text-[1rem] font-medium text-white outline-none transition-colors duration-300 placeholder:text-[#909099] focus:border-[#c6ff69]"
                      style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', borderRadius: 0, boxShadow: 'none' }}
                    />
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contact.form.message}
                      className="resize-none bg-transparent pb-3 text-[1rem] font-medium text-white outline-none transition-colors duration-300 placeholder:text-[#909099] focus:border-[#c6ff69]"
                      style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', borderRadius: 0, boxShadow: 'none' }}
                    />
                    <button type="submit" className="btn-metal self-start">
                      {t.contact.form.send}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FOOTER — breathes above the fixed pill ════════ */}
      <footer style={{ margin: '100px 0 200px' }}>
        <div className="nv-container">
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)' }}
          />
          <div className="flex flex-col items-center justify-between gap-6 pt-10 md:flex-row">
            <div className="flex items-center gap-3">
              <Image src="/images/logowhite.png" alt="landings.md" width={22} height={36} className="h-8 w-auto" />
              <span className="text-[14px] font-medium text-white">landings.md</span>
            </div>
            <p className="text-center text-[13px] font-medium" style={{ color: '#909099' }}>
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-5 text-[13px] font-medium">
              <a href="mailto:contact@landings.md" className="transition-colors duration-300 hover:!text-white" style={{ color: '#a4a4a4' }}>
                contact@landings.md
              </a>
              <a href="https://instagram.com/landings.md" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:!text-white" style={{ color: '#a4a4a4' }}>
                Instagram
              </a>
            </div>
          </div>
          <p className="pt-8 text-center text-[12px] font-medium" style={{ color: '#909099' }}>
            {t.footer.copy}
          </p>
        </div>
      </footer>

      {/* ════════ FIXED LIME FLOATING CTA PILL ════════ */}
      <a href="#contact" className="nv-pill">
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.pill.l1}</span>
          <span className="truncate text-[14px] font-semibold text-white">{t.pill.l2}</span>
        </span>
        <span className="nv-pill-arrow" aria-hidden>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
          </svg>
        </span>
      </a>
    </main>
  )
}
