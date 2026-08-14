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

/* RISE — the element-level reveal verb: opacity + 30px rise, one easing */
function Rise({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`transition-[transform,opacity] duration-[400ms] ease-m ${className}`}
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

const ArrowUpRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
)

/* Other systems we shipped — compact rows */
const otherSystems = [
  {
    id: 1,
    badge: { en: "LOGISTICS", ro: "LOGISTICA", de: "LOGISTIK", fr: "LOGISTIQUE", es: "LOGISTICA" },
    title: { en: "Package Tracking Platform", ro: "Platforma Urmarire Colete", de: "Paketverfolgungs-Plattform", fr: "Plateforme de Suivi de Colis", es: "Plataforma de Seguimiento de Paquetes" },
    subtitle: { en: "MD — Europe — MD", ro: "MD — Europa — MD", de: "MD — Europa — MD", fr: "MD — Europe — MD", es: "MD — Europa — MD" },
    description: {
      en: "A logistics application managing packages between Moldova and Europe. Real-time tracking, automated status updates, admin panel, driver assignments and full delivery history.",
      ro: "O aplicatie logistica pentru gestionarea coletelor intre Moldova si Europa. Urmarire in timp real, statusuri automate, panou admin, atribuire soferi si istoric complet al livrarilor.",
      de: "Eine Logistikanwendung fur Pakete zwischen Moldawien und Europa. Echtzeit-Verfolgung, automatische Statusaktualisierungen, Admin-Panel, Fahrerzuweisung und vollstandiger Lieferverlauf.",
      fr: "Une application logistique gerant les colis entre la Moldavie et l'Europe. Suivi en temps reel, statuts automatiques, panneau d'administration, affectation des chauffeurs et historique complet.",
      es: "Una aplicacion logistica que gestiona paquetes entre Moldavia y Europa. Seguimiento en tiempo real, estados automaticos, panel de administracion, asignacion de conductores e historial completo."
    },
    features: {
      en: ["Real-time GPS tracking", "Admin management panel", "Automated notifications", "Route optimization", "Driver assignments", "Delivery analytics"],
      ro: ["Urmarire GPS in timp real", "Panou administrare", "Notificari automate", "Optimizare rute", "Atribuire soferi", "Analiza livrari"],
      de: ["Echtzeit-GPS-Verfolgung", "Admin-Panel", "Automatische Benachrichtigungen", "Routenoptimierung", "Fahrerzuweisung", "Lieferanalysen"],
      fr: ["Suivi GPS en temps reel", "Panneau d'administration", "Notifications automatiques", "Optimisation des itineraires", "Affectation des chauffeurs", "Analyses de livraison"],
      es: ["Seguimiento GPS en tiempo real", "Panel de administracion", "Notificaciones automaticas", "Optimizacion de rutas", "Asignacion de conductores", "Analisis de entregas"]
    }
  },
  {
    id: 2,
    badge: { en: "FAMILY APP", ro: "APLICATIE FAMILIALA", de: "FAMILIEN-APP", fr: "APP FAMILIALE", es: "APP FAMILIAR" },
    title: { en: "Growing Memories Album", ro: "Album Amintiri in Crestere", de: "Wachsende Erinnerungen Album", fr: "Album de Souvenirs Grandissants", es: "Album de Recuerdos Crecientes" },
    subtitle: { en: "Ages 1 — 18", ro: "Varsta 1 — 18", de: "Alter 1 — 18", fr: "Ages 1 — 18", es: "Edades 1 — 18" },
    description: {
      en: "A unique digital family album where parents document their child's journey from age 1 to 18. On their 18th birthday, the child receives access to the complete album.",
      ro: "Un album digital unic unde parintii documenteaza calatoria copilului de la 1 la 18 ani. La 18 ani, copilul primeste acces la albumul complet.",
      de: "Ein einzigartiges digitales Familienalbum, in dem Eltern die Reise ihres Kindes von 1 bis 18 dokumentieren. Mit 18 erhalt das Kind Zugang zum kompletten Album.",
      fr: "Un album familial numerique unique ou les parents documentent le parcours de leur enfant de 1 a 18 ans. A 18 ans, l'enfant recoit l'acces a l'album complet.",
      es: "Un album digital familiar unico donde los padres documentan el viaje de su hijo desde 1 hasta 18 anos. A los 18, el hijo recibe acceso al album completo."
    },
    features: {
      en: ["Milestone tracking", "Photo & video uploads", "Time-locked reveal at 18", "Parent collaboration", "Secure cloud storage", "Beautiful timeline view"],
      ro: ["Urmarire momente cheie", "Upload foto & video", "Dezvaluire la 18 ani", "Colaborare parinti", "Stocare cloud securizata", "Vizualizare cronologica"],
      de: ["Meilenstein-Verfolgung", "Foto- & Video-Uploads", "Zeitgesperrte Enthullung mit 18", "Eltern-Zusammenarbeit", "Sichere Cloud-Speicherung", "Schone Zeitleisten-Ansicht"],
      fr: ["Suivi des jalons", "Upload photos & videos", "Revelation a 18 ans", "Collaboration parentale", "Stockage cloud securise", "Belle vue chronologique"],
      es: ["Seguimiento de hitos", "Subida de fotos y videos", "Revelacion a los 18", "Colaboracion de padres", "Almacenamiento cloud seguro", "Vista de linea de tiempo"]
    }
  },
  {
    id: 3,
    badge: { en: "CRM SYSTEM", ro: "SISTEM CRM", de: "CRM-SYSTEM", fr: "SYSTEME CRM", es: "SISTEMA CRM" },
    title: { en: "Auto Service CRM", ro: "CRM Service Auto", de: "Auto-Service CRM", fr: "CRM Service Auto", es: "CRM Servicio Automotriz" },
    subtitle: { en: "Complete Business Management", ro: "Management Complet Afacere", de: "Komplettes Geschaftsmanagement", fr: "Gestion Complete d'Entreprise", es: "Gestion Empresarial Completa" },
    description: {
      en: "A complete client management platform built for auto services. Appointments, service history, invoicing, parts inventory, client communication and analytics — in one dashboard.",
      ro: "O platforma completa de management clienti pentru service-uri auto. Programari, istoric servicii, facturare, inventar piese, comunicare clienti si analize — intr-un singur panou.",
      de: "Eine komplette Kundenmanagement-Plattform fur Autoservices. Termine, Historie, Rechnungen, Inventar, Kommunikation und Analysen — in einem Dashboard.",
      fr: "Une plateforme complete de gestion clients pour services auto. Rendez-vous, historique, facturation, inventaire, communication et analyses — dans un seul tableau de bord.",
      es: "Una plataforma completa de gestion de clientes para servicios automotrices. Citas, historial, facturas, inventario, comunicacion y analisis — en un solo panel."
    },
    features: {
      en: ["Appointment scheduling", "Service history", "Invoice generation", "Parts inventory", "Client portal", "Performance analytics"],
      ro: ["Programari", "Istoric servicii", "Generare facturi", "Inventar piese", "Portal clienti", "Analize performanta"],
      de: ["Terminplanung", "Service-Historie", "Rechnungserstellung", "Teileinventar", "Kundenportal", "Leistungsanalysen"],
      fr: ["Planification", "Historique des services", "Generation de factures", "Inventaire des pieces", "Portail client", "Analyses de performance"],
      es: ["Programacion de citas", "Historial de servicios", "Generacion de facturas", "Inventario de piezas", "Portal de clientes", "Analisis de rendimiento"]
    }
  }
]

const stats = [
  { value: "99.9%", label: { en: "Uptime", ro: "Disponibilitate", de: "Verfugbarkeit", fr: "Disponibilite", es: "Disponibilidad" } },
  { value: "3x", label: { en: "Faster Operations", ro: "Operatii Mai Rapide", de: "Schnellere Ablaufe", fr: "Operations Plus Rapides", es: "Operaciones Mas Rapidas" } },
  { value: "0", label: { en: "Paper Needed", ro: "Hartie Necesara", de: "Papier benotigt", fr: "Papier Necessaire", es: "Papel Necesario" } },
  { value: "24/7", label: { en: "System Access", ro: "Acces Sistem", de: "Systemzugang", fr: "Acces Systeme", es: "Acceso al Sistema" } },
]

export default function SolutionsPage() {
  const { language } = useLanguage()

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Contact" },
      hero: {
        title1: "We free your business",
        title2: "from paper.",
        description: "Driving school scheduling, seat-selection bookings, operator panels, invoicing, stock, profit tracking and automated accounting — we build real systems for real businesses. Some of them are below.",
        cta: "Discuss your project"
      },
      built: {
        heading: "Already built. In production.",
        subheading: "Three real systems our clients use every single day.",
        visit: "Visit site",
        systems: [
          {
            client: "DAVO.MD — INTERNATIONAL TRANSPORT",
            title: "Bookings with seat selection, like a flight.",
            body: "Passengers pick their seat on the coach map, exactly like at an airline check-in. Operators get their own panel: they see the routes, book clients over the phone and track every seat — no notebooks, no double-bookings.",
            tags: ["Seat map", "Operator panel", "Online bookings", "Payments & tickets"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD — PARTS & E-COMMERCE",
            title: "Invoicing, stock and accounting on autopilot.",
            body: "An international online store plus the back office that runs the business: invoices generated automatically, stock updated in real time, profit calculated per product and accounting that does itself.",
            tags: ["Automated invoicing", "Stock tracking", "Profit per product", "Accounting"],
            url: "https://inter-bus.md"
          },
          {
            client: "GLG DRIVING SCHOOL — EDUCATION",
            title: "Practical lesson scheduling, without the phone calls.",
            body: "Students book their own practical lessons, instructors see their day at a glance, and the office stops juggling calls and notebooks. The schedule fills itself.",
            tags: ["Online scheduling", "Instructor calendar", "Notifications", "Zero phone calls"],
            url: null
          },
        ]
      },
      others: { heading: "Other systems we've built", subheading: "From logistics to personal apps — if it runs on paper, we can automate it." },
      cta: { title: "Ready to get rid of the paperwork?", body: "Tell us how your business runs today. We'll design a custom system that eliminates the notebooks and multiplies your efficiency.", button: "Start your transformation" },
      footer: { copy: "© 2026 All rights reserved." }
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Contact" },
      hero: {
        title1: "Iti scapam afacerea",
        title2: "de foi.",
        description: "Programari la scoala auto, rezervari cu alegerea locului, panouri pentru operatori, facturare, stoc, calcul de profit si contabilitate automata — construim sisteme reale pentru afaceri reale. Cateva dintre ele, mai jos.",
        cta: "Discuta proiectul tau"
      },
      built: {
        heading: "Construite deja. In productie.",
        subheading: "Trei sisteme reale, folosite zilnic de clientii nostri.",
        visit: "Acceseaza site-ul",
        systems: [
          {
            client: "DAVO.MD — TRANSPORT INTERNATIONAL",
            title: "Rezervari cu alegerea locului, ca la avion.",
            body: "Pasagerii isi aleg locul pe harta autocarului, exact ca la check-in-ul unui zbor. Operatorii au panoul lor: vad cursele, rezerva pentru clientii de la telefon si tin evidenta fiecarui loc — fara caiete, fara suprapuneri.",
            tags: ["Harta locurilor", "Panou operatori", "Rezervari online", "Plati & bilete"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD — PIESE & E-COMMERCE",
            title: "Facturare, stoc si contabilitate pe autopilot.",
            body: "Magazin online international plus panoul din spate care conduce afacerea: facturi generate automat, stoc actualizat in timp real, profit calculat pe fiecare produs si contabilitate care se face singura.",
            tags: ["Facturare automata", "Evidenta stoc", "Profit pe produs", "Contabilitate"],
            url: "https://inter-bus.md"
          },
          {
            client: "SCOALA AUTO GLG — EDUCATIE",
            title: "Programari la lectii practice, fara telefoane.",
            body: "Elevii isi programeaza singuri lectiile practice, instructorii isi vad ziua dintr-o privire, iar administratia nu mai jongleaza cu apeluri si caiete. Orarul se umple singur.",
            tags: ["Programari online", "Orar instructori", "Notificari", "Zero apeluri"],
            url: null
          },
        ]
      },
      others: { heading: "Alte sisteme construite", subheading: "De la logistica la aplicatii personale — daca merge pe hartie, putem automatiza." },
      cta: { title: "Gata sa scapi de hartii?", body: "Spune-ne cum functioneaza afacerea ta azi. Proiectam un sistem custom care elimina caietele si iti multiplica eficienta.", button: "Incepe transformarea" },
      footer: { copy: "© 2026 Toate drepturile rezervate." }
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Kontakt" },
      hero: {
        title1: "Wir befreien Ihr Geschaft",
        title2: "vom Papier.",
        description: "Fahrschul-Terminplanung, Buchungen mit Sitzplatzwahl, Operator-Panels, Rechnungen, Lager, Gewinnberechnung und automatische Buchhaltung — wir bauen echte Systeme fur echte Unternehmen. Einige davon unten.",
        cta: "Projekt besprechen"
      },
      built: {
        heading: "Bereits gebaut. Im Einsatz.",
        subheading: "Drei echte Systeme, die unsere Kunden taglich nutzen.",
        visit: "Website besuchen",
        systems: [
          {
            client: "DAVO.MD — INTERNATIONALER TRANSPORT",
            title: "Buchungen mit Sitzplatzwahl, wie im Flugzeug.",
            body: "Passagiere wahlen ihren Sitz auf der Buskarte, genau wie beim Airline-Check-in. Operatoren haben ihr eigenes Panel: Routen sehen, telefonisch buchen, jeden Platz verfolgen — ohne Hefte, ohne Doppelbuchungen.",
            tags: ["Sitzplan", "Operator-Panel", "Online-Buchungen", "Zahlungen & Tickets"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD — TEILE & E-COMMERCE",
            title: "Rechnungen, Lager und Buchhaltung auf Autopilot.",
            body: "Ein internationaler Online-Shop plus das Backoffice, das das Geschaft steuert: automatische Rechnungen, Live-Lager, Gewinn pro Produkt und Buchhaltung, die sich selbst erledigt.",
            tags: ["Automatische Rechnungen", "Lagerverwaltung", "Gewinn pro Produkt", "Buchhaltung"],
            url: "https://inter-bus.md"
          },
          {
            client: "FAHRSCHULE GLG — BILDUNG",
            title: "Fahrstunden-Planung ohne Telefonate.",
            body: "Schuler buchen ihre Fahrstunden selbst, Fahrlehrer sehen ihren Tag auf einen Blick, und das Buro jongliert nicht mehr mit Anrufen und Heften. Der Stundenplan fullt sich von selbst.",
            tags: ["Online-Terminplanung", "Fahrlehrer-Kalender", "Benachrichtigungen", "Null Anrufe"],
            url: null
          },
        ]
      },
      others: { heading: "Weitere gebaute Systeme", subheading: "Von Logistik bis zu personlichen Apps — was auf Papier lauft, konnen wir automatisieren." },
      cta: { title: "Bereit, den Papierkram loszuwerden?", body: "Erzahlen Sie uns, wie Ihr Geschaft heute lauft. Wir entwerfen ein System, das die Hefte eliminiert und Ihre Effizienz vervielfacht.", button: "Transformation starten" },
      footer: { copy: "© 2026 Alle Rechte vorbehalten." }
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Contact" },
      hero: {
        title1: "On libere votre entreprise",
        title2: "du papier.",
        description: "Planning d'auto-ecole, reservations avec choix du siege, panneaux operateurs, facturation, stock, calcul de profit et comptabilite automatique — on construit de vrais systemes pour de vraies entreprises. En voici quelques-uns.",
        cta: "Discuter de votre projet"
      },
      built: {
        heading: "Deja construits. En production.",
        subheading: "Trois systemes reels, utilises chaque jour par nos clients.",
        visit: "Visiter le site",
        systems: [
          {
            client: "DAVO.MD — TRANSPORT INTERNATIONAL",
            title: "Reservations avec choix du siege, comme en avion.",
            body: "Les passagers choisissent leur siege sur le plan du car, exactement comme a l'enregistrement d'un vol. Les operateurs ont leur panneau : ils voient les trajets, reservent par telephone et suivent chaque place — sans cahiers, sans doublons.",
            tags: ["Plan des sieges", "Panneau operateurs", "Reservations en ligne", "Paiements & billets"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD — PIECES & E-COMMERCE",
            title: "Facturation, stock et comptabilite en pilote automatique.",
            body: "Une boutique en ligne internationale plus le back-office qui gere l'entreprise : factures automatiques, stock en temps reel, profit par produit et comptabilite qui se fait toute seule.",
            tags: ["Facturation automatique", "Suivi du stock", "Profit par produit", "Comptabilite"],
            url: "https://inter-bus.md"
          },
          {
            client: "AUTO-ECOLE GLG — EDUCATION",
            title: "Planning des lecons pratiques, sans coups de fil.",
            body: "Les eleves reservent eux-memes leurs lecons, les instructeurs voient leur journee d'un coup d'oeil, et le bureau ne jongle plus avec les appels et les cahiers. Le planning se remplit tout seul.",
            tags: ["Reservation en ligne", "Calendrier instructeurs", "Notifications", "Zero appels"],
            url: null
          },
        ]
      },
      others: { heading: "D'autres systemes construits", subheading: "De la logistique aux apps personnelles — si ca tourne sur papier, on peut l'automatiser." },
      cta: { title: "Pret a vous debarrasser de la paperasse ?", body: "Dites-nous comment votre entreprise fonctionne aujourd'hui. On concoit un systeme sur mesure qui elimine les cahiers et multiplie votre efficacite.", button: "Commencer la transformation" },
      footer: { copy: "© 2026 Tous droits reserves." }
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Contacto" },
      hero: {
        title1: "Liberamos tu negocio",
        title2: "del papel.",
        description: "Agenda de autoescuela, reservas con eleccion de asiento, paneles de operadores, facturacion, stock, calculo de beneficios y contabilidad automatica — construimos sistemas reales para negocios reales. Aqui van algunos.",
        cta: "Discutir tu proyecto"
      },
      built: {
        heading: "Ya construidos. En produccion.",
        subheading: "Tres sistemas reales que nuestros clientes usan cada dia.",
        visit: "Visitar sitio",
        systems: [
          {
            client: "DAVO.MD — TRANSPORTE INTERNACIONAL",
            title: "Reservas con eleccion de asiento, como en un vuelo.",
            body: "Los pasajeros eligen su asiento en el mapa del autobus, igual que en el check-in de un vuelo. Los operadores tienen su panel: ven las rutas, reservan por telefono y controlan cada asiento — sin cuadernos, sin duplicados.",
            tags: ["Mapa de asientos", "Panel de operadores", "Reservas online", "Pagos & billetes"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD — PIEZAS & E-COMMERCE",
            title: "Facturacion, stock y contabilidad en piloto automatico.",
            body: "Una tienda online internacional mas el back office que dirige el negocio: facturas automaticas, stock en tiempo real, beneficio por producto y contabilidad que se hace sola.",
            tags: ["Facturacion automatica", "Control de stock", "Beneficio por producto", "Contabilidad"],
            url: "https://inter-bus.md"
          },
          {
            client: "AUTOESCUELA GLG — EDUCACION",
            title: "Agenda de clases practicas, sin llamadas.",
            body: "Los alumnos reservan sus clases practicas, los instructores ven su dia de un vistazo, y la oficina deja de hacer malabares con llamadas y cuadernos. El horario se llena solo.",
            tags: ["Reservas online", "Calendario instructores", "Notificaciones", "Cero llamadas"],
            url: null
          },
        ]
      },
      others: { heading: "Otros sistemas construidos", subheading: "De la logistica a las apps personales — si funciona en papel, podemos automatizarlo." },
      cta: { title: "Listo para deshacerte del papeleo?", body: "Cuentanos como funciona tu negocio hoy. Disenamos un sistema a medida que elimina los cuadernos y multiplica tu eficiencia.", button: "Iniciar la transformacion" },
      footer: { copy: "© 2026 Todos los derechos reservados." }
    }
  }

  const t = text[language as keyof typeof text]
  const lang = language as 'en' | 'ro' | 'de' | 'fr' | 'es'

  /* Real screenshots replace the old CSS mocks */
  const systemFrames = [
    { domain: "davo.md", src: "/images/shot-davo.jpg" },
    { domain: "inter-bus.md", src: "/images/shot-interbus.jpg" },
    { domain: "scoalaautoglg.com", src: "/images/shot-glg.jpg" },
  ]

  return (
    <div className="min-h-screen text-ink" style={{ background: '#FFFFFF' }}>

      <SiteNav contactHref="/#contact" tone="light" />

      {/* ── HERO on paper ── */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-14 md:pt-20 pb-16 md:pb-20">
          <Rise>
            <h1 className="font-serif font-light text-[clamp(2.75rem,5.2vw,4.35rem)] leading-[0.9] tracking-[-0.06em] text-ink">
              {t.hero.title1}<br />{t.hero.title2}
            </h1>
          </Rise>
          <Rise delay={100}>
            <p className="mt-8 text-[17px] leading-[1.3] text-ink-muted max-w-2xl">
              {t.hero.description}
            </p>
          </Rise>
          <Rise delay={200}>
            <div className="mt-9">
              <Link href="/#contact" className="btn-cta btn-cta--on-light">
                <span className="btn-fill-bg" aria-hidden />
                <span className="btn-fill-label">
                  {t.hero.cta}
                  <span className="btn-chip" aria-hidden>
                    <ArrowUpRight className="arrow-a" />
                    <ArrowUpRight className="arrow-b" />
                  </span>
                </span>
              </Link>
            </div>
          </Rise>

          {/* Stats row — bordered cells */}
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E8E3E0] mt-14 md:mt-16">
            {stats.map((stat, i) => (
              <Rise key={i} delay={i * 80} className={`p-7 ${i % 2 === 0 ? 'border-r border-[#E8E3E0]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-[#E8E3E0]' : ''} ${i < 3 ? 'md:border-r md:border-[#E8E3E0]' : ''}`}>
                <p className="font-sans font-medium text-[34px] md:text-[40px] leading-[1.05] tracking-[-0.02em] text-ink">{stat.value}</p>
                <p className="text-[11px] font-bold tracking-[0.04em] uppercase text-ink-light mt-4">{stat.label[lang]}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT SYSTEMS on paper-2 — real screenshots ── */}
      <section className="border-t border-[#E8E3E0]" style={{ background: '#FAF7F5' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <Rise>
            <h2 className="font-serif font-light text-[32px] md:text-[40px] leading-[1.0] tracking-[-0.03em] text-ink mb-3">{t.built.heading}</h2>
            <p className="text-[17px] leading-[1.3] text-ink-muted mb-14">{t.built.subheading}</p>
          </Rise>

          <div className="space-y-16 md:space-y-20">
            {t.built.systems.map((sys, i) => {
              const reversed = i % 2 === 1
              return (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <Rise delay={80} className={`order-1 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <BrowserFrame domain={systemFrames[i].domain} ground="light">
                      <div className="aspect-[16/10] overflow-hidden">
                        <Image src={systemFrames[i].src} alt={`${systemFrames[i].domain} — business system by landings.md`} width={960} height={600} quality={85} className="w-full h-full object-cover object-top" />
                      </div>
                    </BrowserFrame>
                  </Rise>
                  <Rise delay={160} className={`order-2 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-ink-light">{sys.client}</span>
                      <h3 className="font-serif font-light text-[26px] md:text-[32px] leading-[1.05] tracking-[-0.03em] text-ink mt-3 mb-4">{sys.title}</h3>
                      <p className="text-[15px] leading-[1.5] text-ink-muted mb-5 max-w-[52ch]">{sys.body}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-6">
                        {sys.tags.map((tag) => (
                          <span key={tag} className="text-[11px] font-bold tracking-[0.04em] uppercase text-ink-light">{tag}</span>
                        ))}
                      </div>
                      {sys.url && (
                        <Link href={sys.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-[12px] font-mono text-ink-light hover:text-ink transition-colors duration-[400ms] ease-m">
                          {t.built.visit}
                          <span className="inline-block -rotate-45 group-hover:rotate-0 transition-transform duration-[400ms] ease-m"><ArrowUpRight className="w-3 h-3" /></span>
                        </Link>
                      )}
                    </div>
                  </Rise>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── OTHER SYSTEMS — ink band, numbered rows ── */}
      <section className="ground-ink text-white" style={{ background: '#251109' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-14 md:pt-16">
          <Rise>
            <h2 className="font-serif font-light text-[32px] md:text-[40px] leading-[1.0] tracking-[-0.03em] text-white mb-3">{t.others.heading}</h2>
            <p className="text-[15px] leading-[1.3] text-white/60 pb-10">{t.others.subheading}</p>
          </Rise>
        </div>
        <div className="border-t border-[#57433B]">
          {otherSystems.map((study, i) => (
            <div key={study.id} className="group border-b border-[#57433B] transition-colors duration-[400ms] ease-m hover:bg-white">
              <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8 md:py-12 grid grid-cols-[2.5rem_1fr_auto] lg:grid-cols-[5rem_1.2fr_1fr_auto] gap-4 lg:gap-8 items-start">
                <span className="text-[11px] font-bold tracking-[0.04em] pt-2 md:pt-4 text-white/30 group-hover:text-ink/30 transition-colors duration-[400ms] ease-m">0{i + 1}</span>
                <div>
                  <h3 className="font-serif font-light text-[28px] md:text-[40px] leading-[1.0] tracking-[-0.03em] text-white group-hover:text-ink transition-colors duration-[400ms] ease-m">{study.title[lang]}</h3>
                  <span className="mt-3 block text-[10px] font-mono tracking-[0.08em] uppercase text-white/40 group-hover:text-ink/30 transition-colors duration-[400ms] ease-m">{study.badge[lang]} · {study.subtitle[lang]}</span>
                </div>
                <p className="hidden lg:block text-[15px] leading-[1.3] text-white/60 group-hover:text-ink-light max-w-[40ch] pt-1.5 transition-colors duration-[400ms] ease-m">{study.description[lang]}</p>
                <span className="pt-1.5 text-white group-hover:text-ink transition-[color,transform] duration-[400ms] ease-m group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPEC / FEATURE LISTS on paper ── */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-[#E8E3E0] gap-10 md:gap-0">
            {otherSystems.map((study, i) => (
              <Rise key={study.id} delay={i * 80} className={i === 0 ? 'md:pr-10' : i === 2 ? 'md:pl-10' : 'md:px-10'}>
                <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-ink-light">0{i + 1} — {study.badge[lang]}</span>
                <h3 className="font-sans font-medium text-[20px] leading-[1.2] tracking-[-0.01em] text-ink mt-3 mb-1">{study.title[lang]}</h3>
                <p className="lg:hidden text-[15px] leading-[1.5] text-ink-muted mt-2">{study.description[lang]}</p>
                <ul className="mt-5">
                  {study.features[lang].map((feature, fi) => (
                    <li key={fi} className="border-t border-[#E8E3E0] py-2.5 text-[15px] leading-[1.3] text-ink-muted">{feature}</li>
                  ))}
                </ul>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA on paper-2 ── */}
      <section className="border-t border-[#E8E3E0]" style={{ background: '#FAF7F5' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <div className="max-w-2xl">
            <Rise>
              <h2 className="font-serif font-light text-[32px] md:text-[40px] leading-[1.0] tracking-[-0.03em] text-ink mb-5">{t.cta.title}</h2>
            </Rise>
            <Rise delay={100}>
              <p className="text-[15px] leading-[1.5] text-ink-muted mb-9">{t.cta.body}</p>
            </Rise>
            <Rise delay={200}>
              <Link href="/#contact" className="btn-cta btn-cta--on-light">
                <span className="btn-fill-bg" aria-hidden />
                <span className="btn-fill-label">
                  {t.cta.button}
                  <span className="btn-chip" aria-hidden>
                    <ArrowUpRight className="arrow-a" />
                    <ArrowUpRight className="arrow-b" />
                  </span>
                </span>
              </Link>
            </Rise>
          </div>
        </div>
      </section>

      {/* ── FOOTER on paper ── */}
      <footer className="border-t border-[#E8E3E0]" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center">
                <Image src="/images/logowhite.png" alt="landings.md" width={16} height={26} className="w-4 h-auto" style={{ filter: 'brightness(0)' }} />
              </Link>
              <div className="flex flex-wrap items-center gap-4 text-[14px] font-medium">
                <Link href="/portfolio" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors">{t.nav.solutions}</Link>
                <Link href="/case-studies" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors">{t.nav.caseStudies}</Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[13px] text-ink-muted">
              <Link href="tel:+37368327082" className="hover:text-ink transition-colors">+373 683 27 082</Link>
              <Link href="mailto:contact@landings.md" className="hover:text-ink transition-colors">contact@landings.md</Link>
              <span>{t.footer.copy}</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
