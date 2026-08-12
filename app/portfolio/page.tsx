"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StickyContactPill } from '@/components/ui/sticky-contact-pill'
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
    <div className="min-h-screen text-ink" style={{ background: '#0D0D0D' }}>

      <SiteNav contactHref="/#contact" />

      <div className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 relative line-sides">

        {/* Hero */}
        <section className="pt-36 md:pt-48 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 relative glow-amber" style={{ background: 'linear-gradient(160deg, #131313 0%, #181818 35%, #0D0D0D 100%)' }}>
          <RevealText>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] text-ink">{t.title}</h1>
          </RevealText>
          <FadeIn delay={200}>
            <p className="mt-4 text-ink-muted text-sm tracking-wide max-w-xl leading-relaxed">{t.subtitle}</p>
          </FadeIn>
        </section>

        {/* Projects Grid */}
        <section className="line-top px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-20 md:pb-28" style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #161616 50%, #101010 100%)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-y-16">
            {projects.map((project, index) => {
              const inner = (
                <>
                  <BrowserFrame domain={project.domain} className="group-hover:border-amber/40 transition-colors duration-500">
                    <div className="aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.description.en}`}
                        width={960}
                        height={600}
                        quality={85}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-[900ms] ease-smooth"
                      />
                    </div>
                  </BrowserFrame>
                  <div className="pt-5">
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.chips.map((chip) => (
                          <span key={chip} className="text-[9px] font-mono tracking-[0.12em] uppercase text-ink-light border border-divider/60 px-2 py-0.5">{chip}</span>
                        ))}
                      </div>
                      <span className={`text-[9px] font-mono tracking-[0.15em] uppercase flex items-center gap-1.5 flex-shrink-0 ${project.status === 'LIVE' ? 'text-amber/90' : 'text-ink-light'}`}>
                        <span className={`w-1 h-1 rounded-full ${project.status === 'LIVE' ? 'bg-amber/90' : 'bg-ink-light'}`} />
                        {project.status === 'LIVE' ? 'LIVE' : t.private}
                      </span>
                    </div>
                    <h3 className="text-ink font-serif text-xl md:text-2xl group-hover:text-amber transition-colors duration-300">{project.title}</h3>
                    <p className="text-ink-muted text-[13px] leading-relaxed mt-2">
                      {project.description[lang] ?? project.description.en}
                    </p>
                    <p className="text-amber/90 text-[11px] font-mono tracking-wide mt-3">
                      {project.highlight[lang] ?? project.highlight.en}
                    </p>
                  </div>
                </>
              )
              return (
                <FadeIn key={project.id} delay={(index % 2) * 100}>
                  {project.status !== 'PRIVATE' ? (
                    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="group block">
                      {inner}
                    </Link>
                  ) : (
                    <div className="group">{inner}</div>
                  )}
                </FadeIn>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="line-top px-6 md:px-12 lg:px-16 py-20 md:py-28 relative glow-amber" style={{ background: 'radial-gradient(ellipse 90% 130% at 50% 100%, #1B1B1B 0%, #131313 40%, #0D0D0D 85%)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <RevealText>
              <h2 className="font-serif italic text-[clamp(1.8rem,3.5vw,3rem)] text-ink mb-4">{t.cta.title}</h2>
            </RevealText>
            <FadeIn delay={200}>
              <p className="text-ink-muted mb-8">{t.cta.body}</p>
            </FadeIn>
            <FadeIn delay={350}>
              <Link href="mailto:contact@landings.md" className="inline-flex items-center gap-3 text-amber hover:text-amber-light text-sm tracking-wide transition-colors group">
                {t.cta.button}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="line-top px-6 md:px-12 lg:px-16 py-8 pb-28" style={{ background: 'linear-gradient(180deg, #101010 0%, #0A0A0A 100%)' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Link href="/" className="flex items-center"><Image src="/images/logowhite.png" alt="landings.md" width={22} height={36} className="w-[22px] h-auto" /></Link>
              <div className="flex items-center gap-6 text-sm text-ink-muted">
                <Link href="/portfolio" className="hover:text-ink transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-ink transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="hover:text-ink transition-colors">{t.nav.solutions}</Link>
                <Link href="/case-studies" className="hover:text-ink transition-colors">{t.nav.caseStudies}</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="tel:+37368327082" className="text-ink-muted hover:text-ink text-xs tracking-wide transition-colors">+373 683 27 082</Link>
              <span className="text-ink-muted text-xs tracking-wide">{t.footer.copy}</span>
              <div className="flex items-center gap-3">
                <Link href="mailto:contact@landings.md" className="text-ink-muted hover:text-ink transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.093L2.25 6.75" /></svg></Link>
              </div>
            </div>
          </div>
        </footer>

      </div>

      <StickyContactPill language={language as 'en' | 'ro' | 'de' | 'fr' | 'es'} />
    </div>
  )
}
