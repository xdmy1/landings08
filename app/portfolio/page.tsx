"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { SiteNav } from '@/components/ui/site-nav'
import { BrowserFrame } from '@/components/ui/browser-frame'

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

function Rise({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`transition-all duration-[400ms] ease-m ${className}`}
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

/* Curated selection — fewer projects, heavier work.
   chips use universal tech terms readable in all 5 languages. */
const projects = [
  {
    id: 1, title: "Davo.md", domain: "davo.md",
    chips: ["SITE", "BOOKING", "SEO", "META ADS"],
    description: {
      en: "International passenger & parcel transport. Website, booking system with airline-style seat selection, operator panel — plus SEO, backlinks and Meta Ads.",
      ro: "Transport international de pasageri si colete. Site, sistem de rezervari cu alegerea locului ca la avion, panou pentru operatori — plus SEO, backlinkuri si Meta Ads.",
      de: "Internationaler Personen- und Pakettransport. Website, Buchungssystem mit Sitzplatzwahl, Operator-Panel — plus SEO, Backlinks und Meta Ads.",
      fr: "Transport international de passagers et colis. Site, reservations avec choix du siege, panneau operateurs — plus SEO, backlinks et Meta Ads.",
      es: "Transporte internacional de pasajeros y paquetes. Web, reservas con eleccion de asiento, panel de operadores — mas SEO, backlinks y Meta Ads."
    },
    highlight: {
      en: "Site + system + marketing — everything from one team",
      ro: "Site + sistem + promovare — totul de la o singura echipa",
      de: "Site + System + Marketing — alles aus einer Hand",
      fr: "Site + systeme + marketing — tout par une seule equipe",
      es: "Web + sistema + marketing — todo de un solo equipo"
    },
    image: "/images/shot-davo.jpg", url: "https://davo.md", status: "LIVE"
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
      en: "Invoicing, stock & accounting — 100% automated",
      ro: "Facturare, stoc si contabilitate — 100% automate",
      de: "Rechnungen, Lager & Buchhaltung — 100% automatisch",
      fr: "Facturation, stock & comptabilite — 100% automatises",
      es: "Facturacion, stock y contabilidad — 100% automatizados"
    },
    image: "/images/shot-interbus.jpg", url: "https://inter-bus.md", status: "LIVE"
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
      en: "Practical lessons booked online — zero paper schedules",
      ro: "Lectii practice programate online — zero orare pe hartie",
      de: "Fahrstunden online gebucht — null Papierplane",
      fr: "Lecons pratiques reservees en ligne — zero papier",
      es: "Clases practicas reservadas online — cero papel"
    },
    image: "/images/shot-glg.jpg", url: "https://scoalaautoglg.com", status: "LIVE"
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
    image: "/images/shot-eliteprotocol.jpg", url: "https://eliteprotocol.md", status: "LIVE"
  },
  {
    id: 5, title: "RADX Cooling", domain: "radx.solutions",
    chips: ["SITE", "SEO", "LEAD GEN"],
    description: {
      en: "Professional website for an industrial cooling company. First page on Google — the site generates qualified leads every week without paid ads.",
      ro: "Website profesional pentru o companie de racire industriala. Prima pagina pe Google — site-ul genereaza lead-uri calificate saptamanal, fara reclame.",
      de: "Professionelle Website fur industrielle Kuhlung. Seite 1 bei Google — qualifizierte Leads jede Woche, ohne Werbung.",
      fr: "Site professionnel pour le refroidissement industriel. Premiere page Google — des leads qualifies chaque semaine, sans publicite.",
      es: "Web profesional para refrigeracion industrial. Primera pagina en Google — leads calificados cada semana, sin publicidad."
    },
    highlight: {
      en: "Page 1 on Google for industrial cooling",
      ro: "Prima pagina Google pentru racire industriala",
      de: "Seite 1 bei Google fur industrielle Kuhlung",
      fr: "Page 1 sur Google pour le refroidissement industriel",
      es: "Pagina 1 en Google para refrigeracion industrial"
    },
    image: "/images/shot-radx.jpg", url: "https://radx.solutions", status: "LIVE"
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
    image: "/images/shot-rizzaclassic.jpg", url: "https://rizzaclassic.com", status: "LIVE"
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
    image: "/images/shot-autohuse.jpg", url: "https://autohuse.md/", status: "LIVE"
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
      subtitle: "Fewer projects, heavier work. Websites, stores and business systems — all custom coded, no WordPress, no templates.",
      visitSite: "Visit site", private: "Private system",
      cta: { title: "Have a project in mind?", body: "Reach out and we'll respond within hours.", button: "Let's talk" },
      footer: { copy: "© 2026 All rights reserved." }
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Contact" },
      title: "Portofoliu.",
      subtitle: "Mai putine proiecte, lucrari mai grele. Site-uri, magazine si sisteme pentru afaceri — toate scrise manual, fara WordPress, fara template-uri.",
      visitSite: "Acceseaza site-ul", private: "Sistem privat",
      cta: { title: "Ai un proiect in minte?", body: "Contacteaza-ne si iti vom raspunde in cateva ore.", button: "Hai sa vorbim" },
      footer: { copy: "© 2026 Toate drepturile rezervate." }
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Kontakt" },
      title: "Portfolio.",
      subtitle: "Weniger Projekte, gewichtigere Arbeit. Websites, Shops und Business-Systeme — alle individuell entwickelt, kein WordPress, keine Templates.",
      visitSite: "Website besuchen", private: "Privates System",
      cta: { title: "Haben Sie ein Projekt?", body: "Kontaktieren Sie uns, wir antworten innerhalb von Stunden.", button: "Kontaktieren Sie uns" },
      footer: { copy: "© 2026 Alle Rechte vorbehalten." }
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Contact" },
      title: "Portfolio.",
      subtitle: "Moins de projets, plus de poids. Sites, boutiques et systemes metier — tous codes sur mesure, pas de WordPress, pas de templates.",
      visitSite: "Visiter le site", private: "Systeme prive",
      cta: { title: "Vous avez un projet ?", body: "Contactez-nous et nous repondrons en quelques heures.", button: "Parlons-en" },
      footer: { copy: "© 2026 Tous droits reserves." }
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Contacto" },
      title: "Portafolio.",
      subtitle: "Menos proyectos, mas peso. Webs, tiendas y sistemas de negocio — todos codificados a medida, sin WordPress, sin plantillas.",
      visitSite: "Visitar sitio", private: "Sistema privado",
      cta: { title: "Tienes un proyecto?", body: "Contactanos y te responderemos en horas.", button: "Hablemos" },
      footer: { copy: "© 2026 Todos los derechos reservados." }
    }
  }

  const t = text[language as keyof typeof text]
  const lang = language as keyof typeof projects[0]['description']

  return (
    <div className="min-h-screen text-ink" style={{ background: '#FFFFFF' }}>

      <SiteNav contactHref="/#contact" tone="light" />

      {/* Hero */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-14 md:pt-20 pb-10 md:pb-14">
          <Rise>
            <h1 className="font-serif font-light text-[clamp(2.75rem,5.2vw,4.35rem)] leading-[0.9] tracking-[-0.06em] text-ink">{t.title}</h1>
          </Rise>
          <Rise delay={100}>
            <p className="mt-5 text-[17px] leading-[1.3] text-ink-muted max-w-xl">{t.subtitle}</p>
          </Rise>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-16 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border" style={{ borderColor: '#E8E3E0' }}>
            {projects.map((project, index) => {
              const inner = (
                <Rise delay={(index % 2) * 100}>
                  <BrowserFrame domain={project.domain} ground="light">
                    <div className="aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.description.en}`}
                        width={960}
                        height={600}
                        quality={85}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </BrowserFrame>
                  <div className="pt-5">
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {project.chips.map((chip) => (
                          <span key={chip} className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink/30">{chip}</span>
                        ))}
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink/30 flex-shrink-0">
                        {project.status === 'LIVE' ? 'LIVE' : t.private}
                      </span>
                    </div>
                    <h3 className="font-sans font-medium text-[20px] tracking-[-0.01em] text-ink">{project.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.3] text-ink-muted">
                      {project.description[lang] ?? project.description.en}
                    </p>
                    <p className="mt-3 text-[13px] font-medium text-ink">
                      {project.highlight[lang] ?? project.highlight.en}
                    </p>
                    {project.status !== 'PRIVATE' && (
                      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] uppercase text-ink">
                        {project.domain}
                        <svg className="w-3.5 h-3.5 transition-transform duration-[400ms] ease-m group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                      </span>
                    )}
                  </div>
                </Rise>
              )
              return (
                <div key={project.id} className="border-b last:border-b-0 md:odd:border-r" style={{ borderColor: '#E8E3E0' }}>
                  {project.status !== 'PRIVATE' ? (
                    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="group block h-full p-6 transition-colors duration-[400ms] ease-m hover:bg-[#FAF7F5]">
                      {inner}
                    </Link>
                  ) : (
                    <div className="group h-full p-6 transition-colors duration-[400ms] ease-m hover:bg-[#FAF7F5]">{inner}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <div className="max-w-2xl mx-auto ">
            <Rise>
              <h2 className="font-serif font-light text-[clamp(2rem,3.5vw,2.5rem)] leading-[1.0] tracking-[-0.03em] text-ink">{t.cta.title}</h2>
            </Rise>
            <Rise delay={100}>
              <p className="mt-4 text-[15px] leading-[1.3] text-ink-muted">{t.cta.body}</p>
            </Rise>
            <Rise delay={200}>
              <div className="mt-8 flex justify-center">
                <Link href="/#contact" className="btn-cta btn-cta--on-light">
                  <span className="btn-fill-bg" aria-hidden />
                  <span className="btn-fill-label">{t.cta.button}
                    <span className="btn-chip" aria-hidden>
                      <svg className="arrow-a" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                      <svg className="arrow-b" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                    </span>
                  </span>
                </Link>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ background: '#FAF7F5', borderColor: '#E8E3E0' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center">
                <Image src="/images/logowhite.png" alt="landings.md" width={16} height={26} className="w-4 h-auto" style={{ filter: 'brightness(0)' }} />
              </Link>
              <div className="hidden md:flex items-center gap-4 text-[14px] font-medium">
                <Link href="/portfolio" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors duration-[400ms] ease-m">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors duration-[400ms] ease-m">{t.nav.pricing}</Link>
                <Link href="/solutions" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors duration-[400ms] ease-m">{t.nav.solutions}</Link>
                <Link href="/case-studies" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors duration-[400ms] ease-m">{t.nav.caseStudies}</Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[13px] text-ink-muted">
              <Link href="tel:+37368327082" className="hover:text-ink transition-colors duration-[400ms] ease-m">+373 683 27 082</Link>
              <Link href="mailto:contact@landings.md" className="hover:text-ink transition-colors duration-[400ms] ease-m">contact@landings.md</Link>
              <span>{t.footer.copy}</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
