"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { SiteNav } from '@/components/ui/site-nav'

/* ────────────────────────────────────────────────────────────────
   Portfolio, rebuilt on the home-page language.
   Ground #0d0d0d · coral #FF9E7A · Space Grotesk (inherited).
   Gradient hairline cards + nv-inset depth everywhere, metal-bezel
   float cards for every screenshot, bars / ring / nodes for the
   real numbers, 3D metal buttons for every action.
   ──────────────────────────────────────────────────────────────── */

const LIME = '#FF9E7A'

/* Blur-up reveal, IntersectionObserver at 0.1 that REPLAYS:
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

/* "*word.*" markers → coral <b> (h1/h2/h3 b is coral via globals); \n → line break */
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

/* Curated selection, fewer projects, heavier work.
   chips use universal tech terms readable in all 5 languages. */
const projects = [
  {
    id: 10, title: "StarterPlus", domain: "starterplus.md",
    chips: ["SITE", "RO / RU", "LOCAL"],
    description: {
      en: "Auto electrician in Chisinau: starter and alternator repair with new, used and reconditioned stock, 12-month written warranty. A bilingual RO/RU site built to make the phone ring.",
      ro: "Electrician auto in Chisinau: reparatia starterelor si generatoarelor, stoc de piese noi, uzate si reconditionate, garantie scrisa pana la 12 luni. Site bilingv RO/RU construit sa aduca apeluri.",
      de: "Autoelektriker in Chisinau: Reparatur von Anlassern und Lichtmaschinen, Lager mit neuen und aufbereiteten Teilen, 12 Monate schriftliche Garantie. Zweisprachige RO/RU-Website, gebaut fur Anrufe.",
      fr: "Electricien auto a Chisinau : reparation de demarreurs et alternateurs, stock neuf et reconditionne, garantie ecrite de 12 mois. Site bilingue RO/RU concu pour faire sonner le telephone.",
      es: "Electricista de autos en Chisinau: reparacion de motores de arranque y alternadores, stock nuevo y reacondicionado, garantia escrita de 12 meses. Web bilingue RO/RU hecha para generar llamadas."
    },
    highlight: {
      en: "Fresh launch: a local site built around one action, the call",
      ro: "Lansare noua: un site local construit in jurul unei actiuni, apelul",
      de: "Neuer Launch: eine lokale Site, gebaut um eine Aktion, den Anruf",
      fr: "Lancement recent : un site local construit autour d'une action, l'appel",
      es: "Lanzamiento nuevo: una web local construida alrededor de una accion, la llamada"
    },
    image: "/images/tall-starterplus.jpg", url: "https://starterplus.md", status: "LIVE"
  },
  {
    id: 1, title: "Davo.md", domain: "davo.md",
    chips: ["SITE", "BOOKING", "SEO", "META ADS"],
    description: {
      en: "International passenger & parcel transport. Website, booking system with airline-style seat selection, operator panel, plus SEO, backlinks and Meta Ads.",
      ro: "Transport international de pasageri si colete. Site, sistem de rezervari cu alegerea locului ca la avion, panou pentru operatori, plus SEO, backlinkuri si Meta Ads.",
      de: "Internationaler Personen- und Pakettransport. Website, Buchungssystem mit Sitzplatzwahl, Operator-Panel, plus SEO, Backlinks und Meta Ads.",
      fr: "Transport international de passagers et colis. Site, reservations avec choix du siege, panneau operateurs, plus SEO, backlinks et Meta Ads.",
      es: "Transporte internacional de pasajeros y paquetes. Web, reservas con eleccion de asiento, panel de operadores, mas SEO, backlinks y Meta Ads."
    },
    highlight: {
      en: "Site + system + marketing, everything from one team",
      ro: "Site + sistem + promovare, totul de la o singura echipa",
      de: "Site + System + Marketing, alles aus einer Hand",
      fr: "Site + systeme + marketing, tout par une seule equipe",
      es: "Web + sistema + marketing, todo de un solo equipo"
    },
    image: "/images/tall-davo.jpg", url: "https://davo.md", status: "LIVE"
  },
  {
    id: 2, title: "Inter-Bus", domain: "inter-bus.md",
    chips: ["E-COMMERCE", "ERP", "FACTURI", "STOC"],
    description: {
      en: "International bus parts store with a full back office: automated invoicing, live stock tracking, profit per product and hands-free accounting.",
      ro: "Magazin international de piese cu panou complet in spate: facturare automata, evidenta stocului in timp real, profit pe produs si contabilitate automata.",
      de: "Internationaler Teileshop mit komplettem Backoffice: automatische Rechnungen, Live-Lager, Gewinn pro Produkt und automatische Buchhaltung.",
      fr: "Boutique internationale de pieces avec back-office complet : facturation automatique, stock en direct, profit par produit et comptabilite automatique.",
      es: "Tienda internacional de piezas con back office completo: facturacion automatica, stock en vivo, beneficio por producto y contabilidad automatica."
    },
    highlight: {
      en: "Invoicing, stock & accounting, 100% automated",
      ro: "Facturare, stoc si contabilitate, 100% automate",
      de: "Rechnungen, Lager & Buchhaltung, 100% automatisch",
      fr: "Facturation, stock & comptabilite, 100% automatises",
      es: "Facturacion, stock y contabilidad, 100% automatizados"
    },
    image: "/images/tall-interbus.jpg", url: "https://inter-bus.md", status: "LIVE"
  },
  {
    id: 9, title: "Scoala Auto GLG", domain: "scoalaautoglg.com",
    chips: ["SITE", "PROGRAMARI", "SISTEM"],
    description: {
      en: "Driving school in Chisinau with 4 centers and 15,000+ graduates. Website plus a scheduling system where students book practical lessons online and instructors manage their whole day from one panel.",
      ro: "Scoala auto din Chisinau cu 4 centre si 15.000+ absolventi. Site plus un sistem de programari in care elevii isi rezerva lectiile practice online, iar instructorii isi administreaza ziua dintr-un singur panou.",
      de: "Fahrschule in Chisinau mit 4 Zentren und 15.000+ Absolventen. Website plus Terminsystem: Schuler buchen Fahrstunden online, Fahrlehrer verwalten ihren Tag in einem Panel.",
      fr: "Auto-ecole a Chisinau avec 4 centres et 15 000+ diplomes. Site plus un systeme de planification : les eleves reservent leurs lecons en ligne, les instructeurs gerent leur journee depuis un panneau.",
      es: "Autoescuela en Chisinau con 4 centros y mas de 15.000 graduados. Web mas un sistema de citas: los alumnos reservan sus clases practicas online y los instructores gestionan su dia desde un panel."
    },
    highlight: {
      en: "Practical lessons booked online, zero paper schedules",
      ro: "Lectii practice programate online, zero orare pe hartie",
      de: "Fahrstunden online gebucht, null Papierplane",
      fr: "Lecons pratiques reservees en ligne, zero papier",
      es: "Clases practicas reservadas online, cero papel"
    },
    image: "/images/tall-glg.jpg", url: "https://scoalaautoglg.com", status: "LIVE"
  },
  {
    id: 3, title: "Elite Protocol", domain: "eliteprotocol.md",
    chips: ["SITE", "BRANDING", "3 LIMBI"],
    description: {
      en: "Private institute of etiquette, image & presence. A dark-gold premium website that matches the brand's positioning down to the last pixel.",
      ro: "Institut privat de eticheta, imagine si prezenta. Un site premium in negru si auriu, aliniat pozitionarii brandului pana la ultimul pixel.",
      de: "Privates Institut fur Etikette, Image & Prasenz. Eine Premium-Website in Schwarz-Gold, exakt auf die Marke abgestimmt.",
      fr: "Institut prive d'etiquette, image & presence. Un site premium noir et or, aligne sur le positionnement de la marque au pixel pres.",
      es: "Instituto privado de etiqueta, imagen y presencia. Una web premium en negro y dorado, alineada con la marca hasta el ultimo pixel."
    },
    highlight: {
      en: "Premium design for a premium brand",
      ro: "Design premium pentru un brand premium",
      de: "Premium-Design fur eine Premium-Marke",
      fr: "Design premium pour une marque premium",
      es: "Diseno premium para una marca premium"
    },
    image: "/images/tall-eliteprotocol.jpg", url: "https://eliteprotocol.md", status: "LIVE"
  },
  {
    id: 5, title: "RADX Cooling", domain: "radx.solutions",
    chips: ["SITE", "SEO", "LEAD GEN"],
    description: {
      en: "Professional website for an industrial cooling company. First page on Google, the site generates qualified leads every week without paid ads.",
      ro: "Website profesional pentru o companie de racire industriala. Prima pagina pe Google, site-ul genereaza lead-uri calificate saptamanal, fara reclame.",
      de: "Professionelle Website fur industrielle Kuhlung. Seite 1 bei Google, qualifizierte Leads jede Woche, ohne Werbung.",
      fr: "Site professionnel pour le refroidissement industriel. Premiere page Google, des leads qualifies chaque semaine, sans publicite.",
      es: "Web profesional para refrigeracion industrial. Primera pagina en Google, leads calificados cada semana, sin publicidad."
    },
    highlight: {
      en: "Page 1 on Google for industrial cooling",
      ro: "Prima pagina Google pentru racire industriala",
      de: "Seite 1 bei Google fur industrielle Kuhlung",
      fr: "Page 1 sur Google pour le refroidissement industriel",
      es: "Pagina 1 en Google para refrigeracion industrial"
    },
    image: "/images/tall-radx.jpg", url: "https://radx.solutions", status: "LIVE"
  },
  {
    id: 6, title: "Rizza Classic", domain: "rizzaclassic.com",
    chips: ["SITE", "GALERIE", "IT / EN"],
    description: {
      en: "Italian workshop restoring classic cars. An elegant website for an international clientele that values craft.",
      ro: "Atelier italian de restaurare a masinilor clasice. Un site elegant pentru o clientela internationala care apreciaza mestesugul.",
      de: "Italienische Werkstatt fur die Restaurierung klassischer Autos. Eine elegante Website fur internationale Kundschaft.",
      fr: "Atelier italien de restauration de voitures classiques. Un site elegant pour une clientele internationale.",
      es: "Taller italiano de restauracion de coches clasicos. Una web elegante para una clientela internacional."
    },
    highlight: {
      en: "Italian brand, international clients",
      ro: "Brand italian, clienti internationali",
      de: "Italienische Marke, internationale Kunden",
      fr: "Marque italienne, clients internationaux",
      es: "Marca italiana, clientes internacionales"
    },
    image: "/images/tall-rizzaclassic.jpg", url: "https://rizzaclassic.com", status: "LIVE"
  },
  {
    id: 7, title: "Auto Huse", domain: "autohuse.md",
    chips: ["SITE", "COMENZI", "STOC LIVE"],
    description: {
      en: "Custom car seat covers made to order. Website with online orders, gallery of finished work and live stock.",
      ro: "Huse auto la comanda. Website cu comenzi online, galerie de lucrari finalizate si stoc live.",
      de: "Autositzbezuge nach Mass. Website mit Online-Bestellungen, Galerie und Live-Lagerbestand.",
      fr: "Housses de sieges auto sur mesure. Site avec commandes en ligne, galerie et stock en direct.",
      es: "Fundas de asientos a medida. Web con pedidos online, galeria y stock en vivo."
    },
    highlight: {
      en: "Online orders for made-to-order covers",
      ro: "Comenzi online pentru huse la comanda",
      de: "Online-Bestellungen fur Massanfertigungen",
      fr: "Commandes en ligne sur mesure",
      es: "Pedidos online a medida"
    },
    image: "/images/tall-autohuse.jpg", url: "https://autohuse.md/", status: "LIVE"
  },
  {
    id: 8, title: "CRM Service Auto", domain: "crm · panou privat",
    chips: ["CRM", "PROGRAMARI", "FACTURI"],
    description: {
      en: "Complete client management platform for an auto service: appointments, service history, invoicing, parts inventory and performance analytics.",
      ro: "Platforma completa de management clienti pentru un service auto: programari, istoric servicii, facturare, inventar piese si analize de performanta.",
      de: "Komplette Kundenmanagement-Plattform fur einen Autoservice: Termine, Historie, Rechnungen, Inventar und Analysen.",
      fr: "Plateforme complete de gestion clients pour un service auto : rendez-vous, historique, factures, inventaire et analyses.",
      es: "Plataforma completa de gestion de clientes para un servicio automotriz: citas, historial, facturas, inventario y analisis."
    },
    highlight: {
      en: "Appointments, invoices & history in one panel",
      ro: "Programari, facturi si istoric intr-un singur panou",
      de: "Termine, Rechnungen & Historie in einem Panel",
      fr: "Rendez-vous, factures & historique dans un panneau",
      es: "Citas, facturas e historial en un panel"
    },
    image: "/images/CRM.png", url: "#", status: "PRIVATE"
  },
]

/* Stats strip, real numbers only (Ahrefs-backed where noted) */
const stats = [
  {
    value: "+300%",
    label: { en: "Avg. organic traffic growth", ro: "Crestere medie trafic organic", de: "Organisches Traffic-Wachstum", fr: "Croissance du trafic organique", es: "Crecimiento de trafico organico" }
  },
  {
    value: "10+",
    label: { en: "Custom systems live", ro: "Sisteme custom active", de: "Eigene Systeme im Einsatz", fr: "Systemes sur mesure actifs", es: "Sistemas a medida activos" }
  },
  {
    value: "DR 50",
    label: { en: "2.6K backlinks, davo.md (Ahrefs)", ro: "2.6K backlinkuri, davo.md (Ahrefs)", de: "2.6K Backlinks, davo.md (Ahrefs)", fr: "2.6K backlinks, davo.md (Ahrefs)", es: "2.6K backlinks, davo.md (Ahrefs)" }
  },
  {
    value: "1-4",
    label: { en: "Weeks to delivery", ro: "Saptamani pana la livrare", de: "Wochen bis zur Lieferung", fr: "Semaines jusqu'a la livraison", es: "Semanas hasta la entrega" }
  },
]

/* client logo strip, same curated set as the home marquee */
const MARQUEE_LOGOS = [
  { k: 'davo', h: 'h-4 md:h-5' },
  { k: 'interbus', h: 'h-5 md:h-6' },
  { k: 'cmiea', h: 'h-6 md:h-7' },
  { k: 'glg', h: 'h-7 md:h-8' },
  { k: 'radx', h: 'h-4 md:h-5' },
  { k: 'rizzaclassic', h: 'h-5 md:h-6' },
  { k: 'eurogard', h: 'h-6 md:h-7' },
] as const

export default function PortfolioPage() {
  const { language } = useLanguage()

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  /* counters: traffic 300, DR 50, backlinks 2.6K, all entrance-only */
  const [traffic, setTraffic] = useState(0)
  const [dr, setDr] = useState(0)
  const [links, setLinks] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTraffic(300); setDr(50); setLinks(26)
      return
    }
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1300, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setTraffic(Math.round(e * 300))
      setDr(Math.round(e * 50))
      setLinks(Math.round(e * 26))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Contact" },
      title: "Portfolio.",
      headline: "Portfolio.\nProjects that *sell.*",
      kicker: "Selected work",
      trusted: "Trusted by businesses across Moldova and Europe",
      subtitle: "Fewer projects, heavier work. Websites, stores and business systems, all custom coded, no WordPress, no templates.",
      visitSite: "Visit site", private: "Private system", view: "View", newest: "Newest",
      cta: { title: "Have a project in mind?", titleMarked: "Have a project in *mind?*", body: "Reach out and we'll respond within hours.", button: "Let's talk" },
      footer: { copy: "© 2026 All rights reserved." }
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Contact" },
      title: "Portofoliu.",
      headline: "Portofoliu.\nProiecte care *vand.*",
      kicker: "Lucrari selectate",
      trusted: "De incredere pentru afaceri din Moldova si Europa",
      subtitle: "Mai putine proiecte, lucrari mai grele. Site-uri, magazine si sisteme pentru afaceri, toate scrise manual, fara WordPress, fara template-uri.",
      visitSite: "Acceseaza site-ul", private: "Sistem privat", view: "Vezi", newest: "Cel mai nou",
      cta: { title: "Ai un proiect in minte?", titleMarked: "Ai un proiect in *minte?*", body: "Contacteaza-ne si iti vom raspunde in cateva ore.", button: "Hai sa vorbim" },
      footer: { copy: "© 2026 Toate drepturile rezervate." }
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Kontakt" },
      title: "Portfolio.",
      headline: "Portfolio.\nProjekte, die *verkaufen.*",
      kicker: "Ausgewahlte Arbeiten",
      trusted: "Vertraut von Unternehmen in Moldawien und Europa",
      subtitle: "Weniger Projekte, gewichtigere Arbeit. Websites, Shops und Business-Systeme, alle individuell entwickelt, kein WordPress, keine Templates.",
      visitSite: "Website besuchen", private: "Privates System", view: "Ansehen", newest: "Neuestes",
      cta: { title: "Haben Sie ein Projekt?", titleMarked: "Haben Sie ein *Projekt?*", body: "Kontaktieren Sie uns, wir antworten innerhalb von Stunden.", button: "Kontaktieren Sie uns" },
      footer: { copy: "© 2026 Alle Rechte vorbehalten." }
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Contact" },
      title: "Portfolio.",
      headline: "Portfolio.\nDes projets qui *vendent.*",
      kicker: "Travaux selectionnes",
      trusted: "La confiance d'entreprises en Moldavie et en Europe",
      subtitle: "Moins de projets, plus de poids. Sites, boutiques et systemes metier, tous codes sur mesure, pas de WordPress, pas de templates.",
      visitSite: "Visiter le site", private: "Systeme prive", view: "Voir", newest: "Le plus recent",
      cta: { title: "Vous avez un projet ?", titleMarked: "Vous avez un *projet ?*", body: "Contactez-nous et nous repondrons en quelques heures.", button: "Parlons-en" },
      footer: { copy: "© 2026 Tous droits reserves." }
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Contacto" },
      title: "Portafolio.",
      headline: "Portafolio.\nProyectos que *venden.*",
      kicker: "Trabajos seleccionados",
      trusted: "Confianza de empresas en Moldavia y Europa",
      subtitle: "Menos proyectos, mas peso. Webs, tiendas y sistemas de negocio, todos codificados a medida, sin WordPress, sin plantillas.",
      visitSite: "Visitar sitio", private: "Sistema privado", view: "Ver", newest: "Lo mas nuevo",
      cta: { title: "Tienes un proyecto?", titleMarked: "Tienes un *proyecto?*", body: "Contactanos y te responderemos en horas.", button: "Hablemos" },
      footer: { copy: "© 2026 Todos los derechos reservados." }
    }
  }

  const t = text[language as keyof typeof text] ?? text.en
  const lang = language as keyof typeof projects[0]['description']

  /* the four header stats, each with its own entrance-only visual */
  const statCells = [
    {
      value: `+${traffic}%`,
      label: stats[0].label[lang] ?? stats[0].label.en,
      note: 'Google Analytics · organic',
      visual: (
        <div className="flex h-9 w-20 shrink-0 items-end gap-1" aria-hidden>
          {[30, 44, 58, 74, 100].map((h, i) => (
            <span
              key={i}
              className="nv-bar flex-1 rounded-sm"
              style={{ height: `${h}%`, ['--i' as string]: i, background: i === 4 ? LIME : 'rgba(255,255,255,0.14)' }}
            />
          ))}
        </div>
      ),
    },
    {
      value: stats[1].value,
      label: stats[1].label[lang] ?? stats[1].label.en,
      note: 'Booking · ERP · CRM · Facturare',
      visual: (
        <div className="flex w-20 shrink-0 items-center" aria-hidden>
          <span className="nv-node h-2 w-2 rounded-full" style={{ background: LIME }} />
          <span className="relative h-px flex-1" style={{ background: 'rgba(255,255,255,0.14)' }}>
            <span className="nv-packet" />
          </span>
          <span className="nv-node h-2 w-2 rounded-full" style={{ background: LIME }} />
          <span className="relative h-px flex-1" style={{ background: 'rgba(255,255,255,0.14)' }}>
            <span className="nv-packet" style={{ animationDelay: '-1.2s' }} />
          </span>
          <span className="nv-node h-2 w-2 rounded-full" style={{ background: LIME }} />
        </div>
      ),
    },
    {
      value: `DR ${dr}`,
      label: stats[2].label[lang] ?? stats[2].label.en,
      note: `${(links / 10).toFixed(1)}K backlinks · Ahrefs`,
      coral: true,
      visual: (
        <svg width="46" height="46" viewBox="0 0 96 96" aria-hidden className="shrink-0">
          <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="9" />
          <circle
            cx="48" cy="48" r="42" fill="none"
            stroke={LIME} strokeWidth="9" strokeLinecap="round"
            strokeDasharray="264" strokeDashoffset="132"
            transform="rotate(-90 48 48)"
            className="nv-ring-main"
          />
        </svg>
      ),
    },
    {
      value: stats[3].value,
      label: stats[3].label[lang] ?? stats[3].label.en,
      note: 'W1 · W2 · W3 · W4',
      visual: (
        <div className="flex h-9 w-20 shrink-0 items-end gap-1.5" aria-hidden>
          {[38, 62, 84, 100].map((h, i) => (
            <span
              key={i}
              className="nv-bar flex-1 rounded-sm"
              style={{ height: `${h}%`, ['--i' as string]: i, background: i === 3 ? LIME : 'rgba(255,255,255,0.14)' }}
            />
          ))}
        </div>
      ),
    },
  ]

  return (
    <main className="min-h-screen" style={{ background: '#0d0d0d', color: '#fff' }}>

      <SiteNav contactHref="/#contact" />

      {/* ════════ HEADER CARD, gradient hairline + inset depth ════════ */}
      <section className="pt-4 md:pt-6">
        <div className="nv-container">
          <Reveal>
            <div className="nv-edge nv-edge--ring">
              <div className="nv-edge-inner nv-inset relative overflow-hidden p-5 md:p-9">
                {/* ribbed sheet + coral horizon glow, same material as home */}
                <div className="ribbed ribbed--flat" aria-hidden style={{ position: 'absolute', inset: 0, borderTop: 'none' }} />
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-full h-[320px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: 'radial-gradient(closest-side, rgba(255,158,122,0.34), transparent)', filter: 'blur(60px)' }}
                />

                <div className="relative z-[1]">
                  <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-10">
                    <div className="min-w-0 max-w-[680px]">
                      <span className="chip chip--em inline-block">
                        <span className="chip-inner !py-2 !text-[12px] uppercase tracking-[0.14em] md:!text-[13px]">
                          {t.kicker}
                        </span>
                      </span>
                      <h1
                        className="mt-4 font-bold"
                        style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.5rem)', lineHeight: 1.02, letterSpacing: '-0.05em' }}
                      >
                        <Marked text={t.headline} />
                      </h1>
                      <p
                        className="mt-4 max-w-[560px] font-medium"
                        style={{ fontSize: '1.0625rem', lineHeight: 1.4, letterSpacing: '-0.02em', color: '#b8b8b9' }}
                      >
                        {t.subtitle}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link href="/#contact" className="btn-metal">
                          {t.cta.button}
                          <span className="nv-arr" aria-hidden>&rarr;</span>
                        </Link>
                        <Link href="/pricing" className="btn-metal btn-metal--sm">
                          {t.nav.pricing}
                          <span className="nv-arr" aria-hidden>&rarr;</span>
                        </Link>
                      </div>
                    </div>

                    {/* floating metal-bezel screenshot in its own well */}
                    <div className="hidden flex-none md:block">
                      <div className="nv-well rounded-[26px] p-4">
                        <div className="relative w-[190px]">
                          <div className="nv-bobwrap nv-bob-2">
                            <div className="nv-float-card">
                              <div className="nv-float-card-img" style={{ aspectRatio: '430 / 560', height: 'auto' }}>
                                <Image
                                  src="/images/tall-cmiea.jpg"
                                  alt="CMIEA.md, proiect landings.md"
                                  fill
                                  sizes="190px"
                                  className="object-cover object-top"
                                  priority
                                />
                                <span
                                  className="absolute inset-x-0 bottom-0 px-2 pb-2 pt-10 text-center text-[10px] font-medium leading-tight text-white"
                                  style={{ background: 'linear-gradient(0deg, rgba(6,6,6,0.96) 32%, transparent)' }}
                                >
                                  cmiea.md
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* stat row: bars, nodes, ring, timeline, all inside a deep well */}
                  <div className="nv-well mt-7 rounded-[26px] p-3 md:mt-9 md:p-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {statCells.map((s, i) => (
                        <div key={i} className={`nv-edge nv-edge--ring nv-cell ${i % 2 === 1 ? 'nv-edge--alt' : ''}`}>
                          <div className="nv-edge-inner nv-inset flex h-full items-center justify-between gap-3 p-4">
                            <div className="min-w-0">
                              <span
                                className="block whitespace-nowrap font-medium"
                                style={{ fontSize: 'clamp(1.5rem, 2vw, 1.95rem)', lineHeight: 1, letterSpacing: '-0.04em', color: s.coral ? LIME : '#fff' }}
                              >
                                {s.value}
                              </span>
                              <span className="mt-1.5 block text-[0.75rem] font-medium leading-tight" style={{ color: '#909099' }}>
                                {s.label}
                              </span>
                              <span className="mt-1 block truncate text-[10px] font-medium" style={{ color: LIME }}>
                                {s.note}
                              </span>
                            </div>
                            {s.visual}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ════════ CLIENT MARQUEE ════════ */}
          <Reveal delay={0.06} className="mt-3">
            <div className="nv-edge">
              <div className="nv-edge-inner nv-inset flex flex-col items-center gap-2 overflow-hidden px-3 py-3 md:flex-row md:gap-6 md:py-2.5">
                <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
                  {t.trusted}
                </span>
                <div className="nv-marquee w-full min-w-0">
                  <div className="nv-marquee-track">
                    {[0, 1, 2, 3].map((half) => (
                      <div key={half} className="flex items-center gap-10 pr-10" aria-hidden={half !== 0}>
                        {MARQUEE_LOGOS.map((l) => (
                          <span key={`${half}-${l.k}`} className="nv-logo shrink-0">
                            <Image
                              src={`/images/logos/${l.k}.png`}
                              alt={half === 0 ? l.k : ''}
                              width={120}
                              height={36}
                              className={`w-auto ${l.h}`}
                              style={{ filter: 'brightness(0) invert(1)' }}
                            />
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ PROJECT GRID, gradient hairline cards + metal-bezel shots ════════ */}
      <section className="pt-10 md:pt-14">
        <div className="nv-container">
          <div className="nv-seam" />
          <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2 xl:grid-cols-3 md:pt-10">
            {projects.map((project, index) => {
              const isPrivate = project.status === 'PRIVATE'
              return (
                <Reveal key={project.id} delay={(index % 3) * 0.06} className="h-full">
                  <div className="group h-full">
                    <div
                      className={`nv-edge nv-edge--ring h-full transition-[transform,box-shadow] duration-200 ease-out group-hover:-translate-y-1.5 ${index % 2 === 1 ? 'nv-edge--alt' : ''}`}
                    >
                      <div className="nv-edge-inner nv-inset flex h-full flex-col p-4 md:p-5">

                        {/* stage well: the screenshot floats inside it, never bare */}
                        <div className="nv-well nv-stage rounded-[22px] p-3">
                          <div className="relative">
                            <div className="nv-float-card transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:scale-[1.015]">
                              <div className="nv-float-card-img" style={{ aspectRatio: '4 / 5', height: 'auto' }}>
                                <Image
                                  src={project.image}
                                  alt={`${project.title}, ${project.description.en}`}
                                  fill
                                  sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
                                  quality={85}
                                  className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                                  style={{ objectPosition: isPrivate ? 'left top' : 'top' }}
                                />
                                {/* top vignette: client + domain */}
                                <div
                                  className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 px-4 pb-10 pt-3"
                                  style={{ background: 'linear-gradient(180deg, rgba(6,6,6,0.9), rgba(6,6,6,0.32) 60%, transparent)' }}
                                >
                                  <span className="text-[13px] font-medium text-white">{project.title}</span>
                                  <span className="pt-0.5 text-right text-[10px] font-medium uppercase tracking-[0.1em]" style={{ color: '#a4a4a4' }}>
                                    {project.domain}
                                  </span>
                                </div>
                                {/* bottom vignette: the real claim, upright, coral-free */}
                                <div
                                  className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-14"
                                  style={{ background: 'linear-gradient(0deg, rgba(6,6,6,0.94) 30%, rgba(6,6,6,0.3) 70%, transparent)' }}
                                >
                                  <p className="text-[12.5px] font-medium leading-snug text-white" style={{ letterSpacing: '-0.01em' }}>
                                    {project.highlight[lang] ?? project.highlight.en}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* body: chips, description */}
                        <div className="flex flex-1 flex-col pt-4">
                          <div className="flex flex-wrap gap-1.5">
                            {project.chips.map((chip) => (
                              <span key={chip} className="chip">
                                <span className="chip-inner !px-2.5 !py-1 !text-[10px] uppercase tracking-[0.08em]" style={{ color: '#a4a4a4' }}>
                                  {chip}
                                </span>
                              </span>
                            ))}
                            {index === 0 && (
                              <span className="chip chip--em">
                                <span className="chip-inner !px-2.5 !py-1 !text-[10px] uppercase tracking-[0.08em]">
                                  {t.newest}
                                </span>
                              </span>
                            )}
                          </div>
                          <p className="mt-3 text-[0.875rem] font-medium leading-[1.45]" style={{ color: '#b8b8b9', letterSpacing: '-0.01em' }}>
                            {project.description[lang] ?? project.description.en}
                          </p>
                          <div className="flex-1" />

                          {/* action row: live status + 3D metal button */}
                          <div className="mt-5 flex items-center justify-between gap-3">
                            {!isPrivate ? (
                              <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: '#909099' }}>
                                <span className="dot-lime" aria-hidden />
                                LIVE
                              </span>
                            ) : (
                              <span aria-hidden />
                            )}
                            {!isPrivate ? (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${t.visitSite}: ${project.title}`}
                                className="btn-metal btn-metal--sm"
                              >
                                {t.view}
                                <span
                                  className="nv-arr group-hover:!w-[1em] group-hover:!opacity-100 group-hover:!translate-x-0 group-hover:!rotate-0"
                                  aria-hidden
                                >
                                  &rarr;
                                </span>
                              </a>
                            ) : (
                              <span className="chip">
                                <span className="chip-inner !px-3.5 !py-1.5 !text-[11px]" style={{ color: '#909099' }}>
                                  {t.private}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════ CTA CLOSE, full-width gradient card ════════ */}
      <section className="pt-12 md:pt-16">
        <div className="nv-container">
          <div className="nv-seam" />
          <Reveal className="pt-8 md:pt-12">
            <div className="nv-edge nv-edge--ring nv-edge--alt">
              <div className="nv-edge-inner nv-inset relative overflow-hidden p-7 text-center md:p-14">
                <div className="ribbed ribbed--flat" aria-hidden style={{ position: 'absolute', inset: 0, borderTop: 'none' }} />
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 h-40 w-[440px] -translate-x-1/2 -translate-y-1/2"
                  style={{ background: 'radial-gradient(closest-side, #FF9E7A55, transparent)' }}
                />
                <div className="relative z-[1]">
                  <h2
                    className="font-bold"
                    style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', letterSpacing: '-0.05em', lineHeight: 1.05 }}
                  >
                    <Marked text={t.cta.titleMarked} />
                  </h2>
                  <p className="mx-auto mt-4 max-w-[460px] text-[1rem] font-medium leading-relaxed" style={{ color: '#b8b8b9' }}>
                    {t.cta.body}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <Link href="/#contact" className="btn-metal">
                      {t.cta.button}
                      <span className="nv-arr" aria-hidden>&rarr;</span>
                    </Link>
                    <a href="mailto:contact@landings.md" className="btn-metal btn-metal--sm">
                      contact@landings.md
                      <span className="nv-arr" aria-hidden>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FOOTER, one more hairline card ════════ */}
      <footer className="pb-10 pt-10 md:pb-14 md:pt-14">
        <div className="nv-container">
          <Reveal>
            <div className="nv-edge">
              <div className="nv-edge-inner nv-inset flex flex-col items-start justify-between gap-5 px-5 py-4 md:flex-row md:items-center">
                <div className="flex flex-wrap items-center gap-5">
                  <Link href="/" className="flex items-center gap-3">
                    <Image src="/images/logowhite.png" alt="landings.md" width={22} height={36} className="h-7 w-auto" />
                    <span className="text-[14px] font-medium text-white">landings.md</span>
                  </Link>
                  <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium">
                    <Link href="/portfolio" className="transition-colors duration-150 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.portfolio}</Link>
                    <Link href="/pricing" className="transition-colors duration-150 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.pricing}</Link>
                    <Link href="/solutions" className="transition-colors duration-150 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.solutions}</Link>
                    <Link href="/case-studies" className="transition-colors duration-150 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.caseStudies}</Link>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[13px] font-medium sm:flex-row sm:items-center sm:gap-5">
                  <Link href="tel:+37368327082" className="transition-colors duration-150 hover:!text-white" style={{ color: '#a4a4a4' }}>+373 683 27 082</Link>
                  <Link href="mailto:contact@landings.md" className="transition-colors duration-150 hover:!text-white" style={{ color: '#a4a4a4' }}>contact@landings.md</Link>
                  <span style={{ color: '#909099' }}>{t.footer.copy}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </footer>

    </main>
  )
}
