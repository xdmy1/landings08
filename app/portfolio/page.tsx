"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { SiteNav } from '@/components/ui/site-nav'

/* ────────────────────────────────────────────────────────────────
   navarro-clone inner page, portfolio grid.
   Ground #0d0d0d · lime #FF9E7A · Geist · blur-up reveals.
   Ribbed header band, arch motif, portrait tall-* cards with
   dual vignettes and nv-card3d depth.
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

/* Curated selection, fewer projects, heavier work.
   chips use universal tech terms readable in all 5 languages. */
const projects = [
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

export default function PortfolioPage() {
  const { language } = useLanguage()

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Contact" },
      title: "Portfolio.",
      subtitle: "Fewer projects, heavier work. Websites, stores and business systems, all custom coded, no WordPress, no templates.",
      visitSite: "Visit site", private: "Private system",
      cta: { title: "Have a project in mind?", body: "Reach out and we'll respond within hours.", button: "Let's talk" },
      footer: { copy: "© 2026 All rights reserved." }
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Contact" },
      title: "Portofoliu.",
      subtitle: "Mai putine proiecte, lucrari mai grele. Site-uri, magazine si sisteme pentru afaceri, toate scrise manual, fara WordPress, fara template-uri.",
      visitSite: "Acceseaza site-ul", private: "Sistem privat",
      cta: { title: "Ai un proiect in minte?", body: "Contacteaza-ne si iti vom raspunde in cateva ore.", button: "Hai sa vorbim" },
      footer: { copy: "© 2026 Toate drepturile rezervate." }
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Kontakt" },
      title: "Portfolio.",
      subtitle: "Weniger Projekte, gewichtigere Arbeit. Websites, Shops und Business-Systeme, alle individuell entwickelt, kein WordPress, keine Templates.",
      visitSite: "Website besuchen", private: "Privates System",
      cta: { title: "Haben Sie ein Projekt?", body: "Kontaktieren Sie uns, wir antworten innerhalb von Stunden.", button: "Kontaktieren Sie uns" },
      footer: { copy: "© 2026 Alle Rechte vorbehalten." }
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Contact" },
      title: "Portfolio.",
      subtitle: "Moins de projets, plus de poids. Sites, boutiques et systemes metier, tous codes sur mesure, pas de WordPress, pas de templates.",
      visitSite: "Visiter le site", private: "Systeme prive",
      cta: { title: "Vous avez un projet ?", body: "Contactez-nous et nous repondrons en quelques heures.", button: "Parlons-en" },
      footer: { copy: "© 2026 Tous droits reserves." }
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Contacto" },
      title: "Portafolio.",
      subtitle: "Menos proyectos, mas peso. Webs, tiendas y sistemas de negocio, todos codificados a medida, sin WordPress, sin plantillas.",
      visitSite: "Visitar sitio", private: "Sistema privado",
      cta: { title: "Tienes un proyecto?", body: "Contactanos y te responderemos en horas.", button: "Hablemos" },
      footer: { copy: "© 2026 Todos los derechos reservados." }
    }
  }

  const t = text[language as keyof typeof text]
  const lang = language as keyof typeof projects[0]['description']

  return (
    <main className="min-h-screen" style={{ background: '#0d0d0d', color: '#fff' }}>

      <SiteNav contactHref="/#contact" />

      {/* ════════ HEADER, ribbed glass band + arch motif ════════ */}
      <section className="relative overflow-hidden">
        <div className="ribbed">
          <div className="nv-container relative z-[1]">
            <div className="flex flex-col gap-10 pb-12 pt-14 md:flex-row md:items-end md:justify-between md:pb-16 md:pt-20">
              <div className="max-w-[640px]">
                <Reveal>
                  <h1
                    className="font-bold"
                    style={{ fontSize: 'clamp(2.625rem, 5.5vw, 4.25rem)', lineHeight: 1.01, letterSpacing: '-0.05em' }}
                  >
                    {t.title.endsWith('.') ? (<>{t.title.slice(0, -1)}<b>.</b></>) : t.title}
                  </h1>
                </Reveal>
                <Reveal delay={0.08}>
                  <p
                    className="mt-5 max-w-[560px] font-medium"
                    style={{ fontSize: '1.0625rem', lineHeight: 1.4, letterSpacing: '-0.02em', color: '#b8b8b9' }}
                  >
                    {t.subtitle}
                  </p>
                </Reveal>
              </div>

              {/* arch-cropped screenshot, coral under-glow */}
              <Reveal delay={0.14} className="hidden flex-none md:block">
                <div className="relative mr-3">
                  <div
                    aria-hidden
                    className="absolute -inset-10 rounded-full"
                    style={{ background: 'radial-gradient(closest-side, rgba(255,158,122,0.30), transparent)', filter: 'blur(28px)' }}
                  />
                  <div
                    className="relative overflow-hidden"
                    style={{ width: 190, aspectRatio: '430 / 560', borderRadius: '999px 999px 24px 24px', border: '1px solid rgba(73,73,73,0.6)' }}
                  >
                    <Image
                      src="/images/tall-cmiea.jpg"
                      alt="CMIEA.md, proiect landings.md"
                      fill
                      sizes="190px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PROJECT GRID, portrait tall-* cards, nv-edge + nv-card3d ════════ */}
      <section className="pt-8 md:pt-12">
        <div className="nv-container">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {projects.map((project, index) => {
              const card = (
                <div className={`nv-edge nv-card3d h-full ${index % 2 === 1 ? 'nv-edge--alt' : ''}`}>
                  <div className="nv-edge-inner flex h-full flex-col">
                    {/* portrait screenshot, dual vignettes, captions top / superlative + view bottom */}
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: '3 / 4', borderBottom: '1px solid rgba(73,73,73,0.6)' }}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title}, ${project.description.en}`}
                        fill
                        sizes="(min-width: 1280px) 320px, (min-width: 640px) 50vw, 100vw"
                        quality={85}
                        className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                        style={{ objectPosition: project.status === 'PRIVATE' ? 'left top' : 'top' }}
                      />
                      {/* top vignette: client + domain caption */}
                      <div
                        className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 px-5 pb-10 pt-4"
                        style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.72), rgba(8,8,8,0.28) 55%, transparent)' }}
                      >
                        <span className="text-[14px] font-medium text-white">{project.title}</span>
                        <span className="pt-0.5 text-right text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: '#a4a4a4' }}>
                          {project.domain}
                        </span>
                      </div>
                      {/* bottom vignette: superlative + view */}
                      <div
                        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 px-5 pb-5 pt-14"
                        style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.72), rgba(8,8,8,0.28) 55%, transparent)' }}
                      >
                        <p className="max-w-[62%] text-[13px] font-medium leading-snug text-white" style={{ letterSpacing: '-0.01em' }}>
                          {project.highlight[lang] ?? project.highlight.en}
                        </p>
                        {project.status !== 'PRIVATE' ? (
                          <span
                            className="inline-flex flex-none items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-medium text-white transition-[box-shadow] duration-200 ease-out group-hover:[box-shadow:0_0_1px_1px_#FF9E7A]"
                            style={{
                              border: '1px solid rgba(255,255,255,0.2)',
                              background: 'linear-gradient(120deg, rgba(30,30,30,0.65), rgba(10,10,10,0.55))',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                            }}
                          >
                            {t.visitSite}
                            <span aria-hidden style={{ display: 'inline-block', transform: 'rotate(-45deg)', color: LIME }}>&rarr;</span>
                          </span>
                        ) : (
                          <span
                            className="inline-flex flex-none items-center rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-[box-shadow] duration-200 ease-out group-hover:[box-shadow:0_0_1px_1px_rgba(255,255,255,0.35)]"
                            style={{
                              border: '1px solid rgba(255,255,255,0.14)',
                              background: 'linear-gradient(120deg, rgba(30,30,30,0.65), rgba(10,10,10,0.55))',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              color: '#b8b8b9',
                            }}
                          >
                            {t.private}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* body: chips + status, description */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {project.chips.map((chip) => (
                            <span key={chip} className="chip">
                              <span className="chip-inner !px-2.5 !py-1 !text-[10px] uppercase tracking-[0.08em]" style={{ color: '#a4a4a4' }}>
                                {chip}
                              </span>
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex flex-shrink-0 items-center gap-2 pt-1 text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: '#909099' }}>
                          {project.status === 'LIVE' && <span className="dot-lime" style={{ width: 5, height: 5 }} />}
                          {project.status === 'LIVE' ? 'LIVE' : t.private}
                        </span>
                      </div>
                      <p className="mt-4 text-[0.875rem] font-medium leading-[1.45]" style={{ color: '#b8b8b9', letterSpacing: '-0.01em' }}>
                        {project.description[lang] ?? project.description.en}
                      </p>
                    </div>
                  </div>
                </div>
              )
              return (
                <Reveal key={project.id} delay={(index % 4) * 0.06} className="h-full">
                  {project.status !== 'PRIVATE' ? (
                    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                      {card}
                    </Link>
                  ) : (
                    <div className="group h-full">{card}</div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════ STATS STRIP, real numbers, coral seam handoff ════════ */}
      <section className="pt-16 md:pt-24">
        <div className="nv-container">
          <div className="nv-seam" />
          <div className="grid grid-cols-2 gap-5 pt-10 md:grid-cols-4 md:pt-14">
            {stats.map((s, i) => (
              <Reveal key={s.value} delay={i * 0.06} className="h-full">
                <div className={`nv-edge nv-edge--ring h-full ${i % 2 === 1 ? 'nv-edge--alt' : ''}`}>
                  <div className="nv-edge-inner flex h-full flex-col justify-between gap-6 p-6">
                    <span
                      className="font-medium text-white"
                      style={{ fontSize: '2.75rem', lineHeight: 1, letterSpacing: '-0.04em', color: s.value === 'DR 50' ? LIME : undefined }}
                    >
                      {s.value}
                    </span>
                    <span className="text-[13px] font-medium" style={{ color: '#909099' }}>
                      {s.label[lang] ?? s.label.en}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA CLOSE, graphite metal pill ════════ */}
      <section className="pt-16 md:pt-24">
        <div className="nv-container">
          <Reveal>
            <div className="nv-edge">
              <div className="nv-edge-inner relative p-8 text-center md:p-14">
                {/* soft lime under-glow at the top edge */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 h-40 w-[440px] -translate-x-1/2 -translate-y-1/2"
                  style={{ background: 'radial-gradient(closest-side, #FF9E7A33, transparent)' }}
                />
                <h2
                  className="font-bold"
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}
                >
                  {t.cta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-[440px] text-[1rem] font-medium leading-relaxed" style={{ color: '#b8b8b9' }}>
                  {t.cta.body}
                </p>
                <div className="mt-8 flex justify-center">
                  <Link href="/#contact" className="btn-metal">
                    {t.cta.button}
                    <span className="nv-arr" aria-hidden>&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="mt-20 pb-16 md:mt-28">
        <div className="nv-container">
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)' }}
          />
          <div className="flex flex-col items-start justify-between gap-6 pt-10 md:flex-row md:items-center">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/images/logowhite.png" alt="landings.md" width={22} height={36} className="h-8 w-auto" />
                <span className="text-[14px] font-medium text-white">landings.md</span>
              </Link>
              <div className="hidden items-center gap-4 text-[13px] font-medium md:flex">
                <Link href="/portfolio" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.portfolio}</Link>
                <Link href="/pricing" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.pricing}</Link>
                <Link href="/solutions" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.solutions}</Link>
                <Link href="/case-studies" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.caseStudies}</Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-[13px] font-medium sm:flex-row sm:items-center sm:gap-5">
              <Link href="tel:+37368327082" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>+373 683 27 082</Link>
              <Link href="mailto:contact@landings.md" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>contact@landings.md</Link>
              <span style={{ color: '#909099' }}>{t.footer.copy}</span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  )
}
