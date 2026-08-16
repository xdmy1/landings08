"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { SiteNav } from '@/components/ui/site-nav'
import { SiteFooter } from '@/components/ui/site-footer'
import {
  Sparkline,
  SegmentMeter,
  Gauge,
  HeatGrid,
  DonutSplit,
  Odometer,
  Orbit,
  WaveLine,
  StackBars,
  Concentric,
} from '@/components/ui/data-viz'

/* ────────────────────────────────────────────────────────────────
   Solutions, systems dashboard shell.
   Ground #0d0d0d · coral #FF9E7A · Space Grotesk (inherited).
   Gradient hairline cards + nv-inset depth everywhere, metal-bezel
   floating screenshots inside nv-well stages, bars/nodes/rings for
   every stat, 3D metal buttons for every link. Copy untouched.
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

/* Plain letter-spaced caps label, no dot */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
      {children}
    </span>
  )
}

/* Section seam hairline */
function Seam() {
  return (
    <div className="nv-container overflow-hidden pt-12 md:pt-16">
      <div className="nv-seam" />
    </div>
  )
}

/* ── Stat visuals ──
   Everything else on this page comes from components/ui/data-viz, one
   distinct visual per card. The node line below is the single survivor,
   kept only for the cross-border package transit card where it is
   literally what the system does. */

/* nodes joined by connectors with travelling coral packets */
function NodeLine({ nodes = 3, className = '' }: { nodes?: number; className?: string }) {
  return (
    <div className={`flex items-center ${className}`} aria-hidden>
      {Array.from({ length: nodes }).map((_, i) => (
        <React.Fragment key={i}>
          <span className="nv-node h-2 w-2 shrink-0 rounded-full" style={{ background: LIME }} />
          {i < nodes - 1 && (
            <span className="relative h-px flex-1" style={{ background: 'rgba(255,255,255,0.14)' }}>
              <span className="nv-packet" style={{ animationDelay: `${-1.1 * i}s` }} />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

/* Deterministic activity map for the header strip: density rises to the
   right, so the grid reads as workload absorbed by the systems. */
const ACTIVITY_COLS = 20
const ACTIVITY_ROWS = 3
const activityLit: number[] = (() => {
  const out: number[] = []
  for (let r = 0; r < ACTIVITY_ROWS; r += 1) {
    for (let c = 0; c < ACTIVITY_COLS; c += 1) {
      const density = 0.16 + (c / (ACTIVITY_COLS - 1)) * 0.74
      if (((c * 7 + r * 4) % 10) / 10 < density) out.push(r * ACTIVITY_COLS + c)
    }
  }
  return out
})()

/* One visual per built system, never the same twice */
function SystemViz({ index }: { index: number }) {
  if (index === 0) return <SegmentMeter total={10} filled={7} className="shrink-0" />
  if (index === 1) return <WaveLine className="shrink-0" />
  return <DonutSplit parts={[0.42, 0.24, 0.12]} className="shrink-0 origin-right scale-[0.72]" />
}

/* Other systems we shipped, compact rows */
const otherSystems = [
  {
    id: 1,
    badge: { en: "LOGISTICS", ro: "LOGISTICA", de: "LOGISTIK", fr: "LOGISTIQUE", es: "LOGISTICA" },
    title: { en: "Package Tracking Platform", ro: "Platforma Urmarire Colete", de: "Paketverfolgungs-Plattform", fr: "Plateforme de Suivi de Colis", es: "Plataforma de Seguimiento de Paquetes" },
    subtitle: { en: "MD, Europe, MD", ro: "MD, Europa, MD", de: "MD, Europa, MD", fr: "MD, Europe, MD", es: "MD, Europa, MD" },
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
    subtitle: { en: "Ages 1, 18", ro: "Varsta 1, 18", de: "Alter 1, 18", fr: "Ages 1, 18", es: "Edades 1, 18" },
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
      en: "A complete client management platform built for auto services. Appointments, service history, invoicing, parts inventory, client communication and analytics, in one dashboard.",
      ro: "O platforma completa de management clienti pentru service-uri auto. Programari, istoric servicii, facturare, inventar piese, comunicare clienti si analize, intr-un singur panou.",
      de: "Eine komplette Kundenmanagement-Plattform fur Autoservices. Termine, Historie, Rechnungen, Inventar, Kommunikation und Analysen, in einem Dashboard.",
      fr: "Une plateforme complete de gestion clients pour services auto. Rendez-vous, historique, facturation, inventaire, communication et analyses, dans un seul tableau de bord.",
      es: "Una plataforma completa de gestion de clientes para servicios automotrices. Citas, historial, facturas, inventario, comunicacion y analisis, en un solo panel."
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
  {
    value: "99.9%",
    label: { en: "Uptime", ro: "Disponibilitate", de: "Verfugbarkeit", fr: "Disponibilite", es: "Disponibilidad" },
    detail: { en: "Monitored around the clock", ro: "Monitorizat non-stop", de: "Rund um die Uhr uberwacht", fr: "Surveille en continu", es: "Monitorizado sin parar" },
  },
  {
    value: "3x",
    label: { en: "Faster Operations", ro: "Operatii Mai Rapide", de: "Schnellere Ablaufe", fr: "Operations Plus Rapides", es: "Operaciones Mas Rapidas" },
    detail: { en: "Same team, fewer clicks", ro: "Aceeasi echipa, mai putine clickuri", de: "Gleiches Team, weniger Klicks", fr: "Meme equipe, moins de clics", es: "Mismo equipo, menos clics" },
  },
  {
    value: "0",
    label: { en: "Paper Needed", ro: "Hartie Necesara", de: "Papier benotigt", fr: "Papier Necessaire", es: "Papel Necesario" },
    detail: { en: "The notebooks are retired", ro: "Caietele au iesit la pensie", de: "Die Hefte sind Geschichte", fr: "Les cahiers sont a la retraite", es: "Los cuadernos se jubilaron" },
  },
  {
    value: "24/7",
    label: { en: "System Access", ro: "Acces Sistem", de: "Systemzugang", fr: "Acces Systeme", es: "Acceso al Sistema" },
    detail: { en: "Any device, anywhere", ro: "Orice dispozitiv, oriunde", de: "Jedes Gerat, uberall", fr: "Tout appareil, partout", es: "Cualquier dispositivo, donde sea" },
  },
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
        description: "Driving school scheduling, seat-selection bookings, operator panels, invoicing, stock, profit tracking and automated accounting, we build real systems for real businesses. Some of them are below.",
        cta: "Discuss your project"
      },
      built: {
        heading: "Already built. In production.",
        subheading: "Three real systems our clients use every single day.",
        visit: "Visit site",
        systems: [
          {
            client: "DAVO.MD, INTERNATIONAL TRANSPORT",
            title: "Bookings with seat selection, like a flight.",
            body: "Passengers pick their seat on the coach map, exactly like at an airline check-in. Operators get their own panel: they see the routes, book clients over the phone and track every seat, no notebooks, no double-bookings.",
            tags: ["Seat map", "Operator panel", "Online bookings", "Payments & tickets"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD, PARTS & E-COMMERCE",
            title: "Invoicing, stock and accounting on autopilot.",
            body: "An international online store plus the back office that runs the business: invoices generated automatically, stock updated in real time, profit calculated per product and accounting that does itself.",
            tags: ["Automated invoicing", "Stock tracking", "Profit per product", "Accounting"],
            url: "https://inter-bus.md"
          },
          {
            client: "GLG DRIVING SCHOOL, EDUCATION",
            title: "Practical lesson scheduling, without the phone calls.",
            body: "Students book their own practical lessons, instructors see their day at a glance, and the office stops juggling calls and notebooks. The schedule fills itself.",
            tags: ["Online scheduling", "Instructor calendar", "Notifications", "Zero phone calls"],
            url: null
          },
        ]
      },
      others: { heading: "Other systems we've built", subheading: "From logistics to personal apps, if it runs on paper, we can automate it." },
      cta: { title: "Ready to get rid of the paperwork?", body: "Tell us how your business runs today. We'll design a custom system that eliminates the notebooks and multiplies your efficiency.", button: "Start your transformation" },
      footer: { copy: "© 2026 All rights reserved." }
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Contact" },
      hero: {
        title1: "Iti scapam afacerea",
        title2: "de foi.",
        description: "Programari la scoala auto, rezervari cu alegerea locului, panouri pentru operatori, facturare, stoc, calcul de profit si contabilitate automata, construim sisteme reale pentru afaceri reale. Cateva dintre ele, mai jos.",
        cta: "Discuta proiectul tau"
      },
      built: {
        heading: "Construite deja. In productie.",
        subheading: "Trei sisteme reale, folosite zilnic de clientii nostri.",
        visit: "Acceseaza site-ul",
        systems: [
          {
            client: "DAVO.MD, TRANSPORT INTERNATIONAL",
            title: "Rezervari cu alegerea locului, ca la avion.",
            body: "Pasagerii isi aleg locul pe harta autocarului, exact ca la check-in-ul unui zbor. Operatorii au panoul lor: vad cursele, rezerva pentru clientii de la telefon si tin evidenta fiecarui loc, fara caiete, fara suprapuneri.",
            tags: ["Harta locurilor", "Panou operatori", "Rezervari online", "Plati & bilete"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD, PIESE & E-COMMERCE",
            title: "Facturare, stoc si contabilitate pe autopilot.",
            body: "Magazin online international plus panoul din spate care conduce afacerea: facturi generate automat, stoc actualizat in timp real, profit calculat pe fiecare produs si contabilitate care se face singura.",
            tags: ["Facturare automata", "Evidenta stoc", "Profit pe produs", "Contabilitate"],
            url: "https://inter-bus.md"
          },
          {
            client: "SCOALA AUTO GLG, EDUCATIE",
            title: "Programari la lectii practice, fara telefoane.",
            body: "Elevii isi programeaza singuri lectiile practice, instructorii isi vad ziua dintr-o privire, iar administratia nu mai jongleaza cu apeluri si caiete. Orarul se umple singur.",
            tags: ["Programari online", "Orar instructori", "Notificari", "Zero apeluri"],
            url: null
          },
        ]
      },
      others: { heading: "Alte sisteme construite", subheading: "De la logistica la aplicatii personale, daca merge pe hartie, putem automatiza." },
      cta: { title: "Gata sa scapi de hartii?", body: "Spune-ne cum functioneaza afacerea ta azi. Proiectam un sistem custom care elimina caietele si iti multiplica eficienta.", button: "Incepe transformarea" },
      footer: { copy: "© 2026 Toate drepturile rezervate." }
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Kontakt" },
      hero: {
        title1: "Wir befreien Ihr Geschaft",
        title2: "vom Papier.",
        description: "Fahrschul-Terminplanung, Buchungen mit Sitzplatzwahl, Operator-Panels, Rechnungen, Lager, Gewinnberechnung und automatische Buchhaltung, wir bauen echte Systeme fur echte Unternehmen. Einige davon unten.",
        cta: "Projekt besprechen"
      },
      built: {
        heading: "Bereits gebaut. Im Einsatz.",
        subheading: "Drei echte Systeme, die unsere Kunden taglich nutzen.",
        visit: "Website besuchen",
        systems: [
          {
            client: "DAVO.MD, INTERNATIONALER TRANSPORT",
            title: "Buchungen mit Sitzplatzwahl, wie im Flugzeug.",
            body: "Passagiere wahlen ihren Sitz auf der Buskarte, genau wie beim Airline-Check-in. Operatoren haben ihr eigenes Panel: Routen sehen, telefonisch buchen, jeden Platz verfolgen, ohne Hefte, ohne Doppelbuchungen.",
            tags: ["Sitzplan", "Operator-Panel", "Online-Buchungen", "Zahlungen & Tickets"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD, TEILE & E-COMMERCE",
            title: "Rechnungen, Lager und Buchhaltung auf Autopilot.",
            body: "Ein internationaler Online-Shop plus das Backoffice, das das Geschaft steuert: automatische Rechnungen, Live-Lager, Gewinn pro Produkt und Buchhaltung, die sich selbst erledigt.",
            tags: ["Automatische Rechnungen", "Lagerverwaltung", "Gewinn pro Produkt", "Buchhaltung"],
            url: "https://inter-bus.md"
          },
          {
            client: "FAHRSCHULE GLG, BILDUNG",
            title: "Fahrstunden-Planung ohne Telefonate.",
            body: "Schuler buchen ihre Fahrstunden selbst, Fahrlehrer sehen ihren Tag auf einen Blick, und das Buro jongliert nicht mehr mit Anrufen und Heften. Der Stundenplan fullt sich von selbst.",
            tags: ["Online-Terminplanung", "Fahrlehrer-Kalender", "Benachrichtigungen", "Null Anrufe"],
            url: null
          },
        ]
      },
      others: { heading: "Weitere gebaute Systeme", subheading: "Von Logistik bis zu personlichen Apps, was auf Papier lauft, konnen wir automatisieren." },
      cta: { title: "Bereit, den Papierkram loszuwerden?", body: "Erzahlen Sie uns, wie Ihr Geschaft heute lauft. Wir entwerfen ein System, das die Hefte eliminiert und Ihre Effizienz vervielfacht.", button: "Transformation starten" },
      footer: { copy: "© 2026 Alle Rechte vorbehalten." }
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Contact" },
      hero: {
        title1: "On libere votre entreprise",
        title2: "du papier.",
        description: "Planning d'auto-ecole, reservations avec choix du siege, panneaux operateurs, facturation, stock, calcul de profit et comptabilite automatique, on construit de vrais systemes pour de vraies entreprises. En voici quelques-uns.",
        cta: "Discuter de votre projet"
      },
      built: {
        heading: "Deja construits. En production.",
        subheading: "Trois systemes reels, utilises chaque jour par nos clients.",
        visit: "Visiter le site",
        systems: [
          {
            client: "DAVO.MD, TRANSPORT INTERNATIONAL",
            title: "Reservations avec choix du siege, comme en avion.",
            body: "Les passagers choisissent leur siege sur le plan du car, exactement comme a l'enregistrement d'un vol. Les operateurs ont leur panneau : ils voient les trajets, reservent par telephone et suivent chaque place, sans cahiers, sans doublons.",
            tags: ["Plan des sieges", "Panneau operateurs", "Reservations en ligne", "Paiements & billets"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD, PIECES & E-COMMERCE",
            title: "Facturation, stock et comptabilite en pilote automatique.",
            body: "Une boutique en ligne internationale plus le back-office qui gere l'entreprise : factures automatiques, stock en temps reel, profit par produit et comptabilite qui se fait toute seule.",
            tags: ["Facturation automatique", "Suivi du stock", "Profit par produit", "Comptabilite"],
            url: "https://inter-bus.md"
          },
          {
            client: "AUTO-ECOLE GLG, EDUCATION",
            title: "Planning des lecons pratiques, sans coups de fil.",
            body: "Les eleves reservent eux-memes leurs lecons, les instructeurs voient leur journee d'un coup d'oeil, et le bureau ne jongle plus avec les appels et les cahiers. Le planning se remplit tout seul.",
            tags: ["Reservation en ligne", "Calendrier instructeurs", "Notifications", "Zero appels"],
            url: null
          },
        ]
      },
      others: { heading: "D'autres systemes construits", subheading: "De la logistique aux apps personnelles, si ca tourne sur papier, on peut l'automatiser." },
      cta: { title: "Pret a vous debarrasser de la paperasse ?", body: "Dites-nous comment votre entreprise fonctionne aujourd'hui. On concoit un systeme sur mesure qui elimine les cahiers et multiplie votre efficacite.", button: "Commencer la transformation" },
      footer: { copy: "© 2026 Tous droits reserves." }
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Contacto" },
      hero: {
        title1: "Liberamos tu negocio",
        title2: "del papel.",
        description: "Agenda de autoescuela, reservas con eleccion de asiento, paneles de operadores, facturacion, stock, calculo de beneficios y contabilidad automatica, construimos sistemas reales para negocios reales. Aqui van algunos.",
        cta: "Discutir tu proyecto"
      },
      built: {
        heading: "Ya construidos. En produccion.",
        subheading: "Tres sistemas reales que nuestros clientes usan cada dia.",
        visit: "Visitar sitio",
        systems: [
          {
            client: "DAVO.MD, TRANSPORTE INTERNACIONAL",
            title: "Reservas con eleccion de asiento, como en un vuelo.",
            body: "Los pasajeros eligen su asiento en el mapa del autobus, igual que en el check-in de un vuelo. Los operadores tienen su panel: ven las rutas, reservan por telefono y controlan cada asiento, sin cuadernos, sin duplicados.",
            tags: ["Mapa de asientos", "Panel de operadores", "Reservas online", "Pagos & billetes"],
            url: "https://davo.md"
          },
          {
            client: "INTER-BUS.MD, PIEZAS & E-COMMERCE",
            title: "Facturacion, stock y contabilidad en piloto automatico.",
            body: "Una tienda online internacional mas el back office que dirige el negocio: facturas automaticas, stock en tiempo real, beneficio por producto y contabilidad que se hace sola.",
            tags: ["Facturacion automatica", "Control de stock", "Beneficio por producto", "Contabilidad"],
            url: "https://inter-bus.md"
          },
          {
            client: "AUTOESCUELA GLG, EDUCACION",
            title: "Agenda de clases practicas, sin llamadas.",
            body: "Los alumnos reservan sus clases practicas, los instructores ven su dia de un vistazo, y la oficina deja de hacer malabares con llamadas y cuadernos. El horario se llena solo.",
            tags: ["Reservas online", "Calendario instructores", "Notificaciones", "Cero llamadas"],
            url: null
          },
        ]
      },
      others: { heading: "Otros sistemas construidos", subheading: "De la logistica a las apps personales, si funciona en papel, podemos automatizarlo." },
      cta: { title: "Listo para deshacerte del papeleo?", body: "Cuentanos como funciona tu negocio hoy. Disenamos un sistema a medida que elimina los cuadernos y multiplica tu eficiencia.", button: "Iniciar la transformacion" },
      footer: { copy: "© 2026 Todos los derechos reservados." }
    }
  }

  const t = text[language as keyof typeof text]
  const lang = language as 'en' | 'ro' | 'de' | 'fr' | 'es'

  /* Real portrait screenshots, dual-vignette overlays carry the text */
  const systemFrames = [
    { domain: "davo.md", src: "/images/tall-davo.jpg" },
    { domain: "inter-bus.md", src: "/images/tall-interbus.jpg" },
    { domain: "scoalaautoglg.com", src: "/images/tall-glg.jpg" },
  ]

  const ctaShots = [
    { src: "/images/tall-autohuse.jpg", alt: "autohuse.md, made-to-order system by landings.md", bob: 'nv-bob-1' },
    { src: "/images/tall-radx.jpg", alt: "radx.solutions, a landings.md project", bob: 'nv-bob-2' },
    { src: "/images/tall-cmiea.jpg", alt: "cmiea.md, a landings.md project", bob: 'nv-bob-3' },
  ]

  return (
    <main style={{ background: '#0d0d0d' }}>

      <SiteNav contactHref="/#contact" />

      {/* ════════ HEADER CARD, copy + live systems bento inside one depth card ════════ */}
      <section className="pt-6 md:pt-8">
        <div className="nv-container">
          <Reveal>
            <div className="nv-edge nv-edge--ring">
              <div className="nv-edge-inner nv-inset relative overflow-hidden p-5 md:p-9">
                {/* ambient warm glow, low and behind everything */}
                <div
                  aria-hidden
                  className="nv-blob-spin pointer-events-none absolute -left-24 top-full h-[420px] w-[560px] -translate-y-1/2 rounded-full"
                  style={{
                    background: 'conic-gradient(from 30deg, #FF9E7A, #f2d06f, #d23b33, #7a4df0, #FF9E7A)',
                    filter: 'saturate(1.1) blur(100px)',
                    opacity: 0.34,
                  }}
                />

                <div className="relative z-[1] grid items-stretch gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
                  {/* ── copy column ── */}
                  <div className="flex flex-col">
                    <Label>{t.nav.solutions}</Label>
                    <h1
                      className="mt-5 max-w-[640px] font-bold"
                      style={{ fontSize: 'clamp(2.25rem, 4.4vw, 3.6rem)', lineHeight: 1.01, letterSpacing: '-0.055em' }}
                    >
                      <span className="block">{t.hero.title1}</span>
                      <b>{t.hero.title2}</b>
                    </h1>
                    <p
                      className="mt-6 max-w-[560px] font-medium"
                      style={{ color: '#b8b8b9', fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)', lineHeight: 1.4 }}
                    >
                      {t.hero.description}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Link href="/#contact" className="btn-metal">
                        <span>{t.hero.cta}</span>
                        <span className="nv-arr" aria-hidden>&rarr;</span>
                      </Link>
                      <Link href="/case-studies" className="btn-metal">
                        <span>{t.nav.caseStudies}</span>
                        <span className="nv-arr" aria-hidden>&rarr;</span>
                      </Link>
                    </div>

                    <div className="flex-1" />

                    {/* workload map: every lit cell is work the systems absorb */}
                    <div className="mt-8 rounded-[22px] p-5 nv-well">
                      <HeatGrid cols={ACTIVITY_COLS} rows={ACTIVITY_ROWS} lit={activityLit} className="w-full" />
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: '#909099' }}>
                          <span className="dot-lime" aria-hidden />
                          LIVE
                        </span>
                        <span className="h-4 w-px shrink-0" style={{ background: 'rgba(255,255,255,0.14)' }} aria-hidden />
                        {['davo.md', 'inter-bus.md', 'scoalaautoglg.com'].map((d) => (
                          <span key={d} className="text-[12px] font-medium" style={{ color: '#e0e0e2' }}>{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── live stat bento, floating cells inside a well ── */}
                  <div className="nv-well rounded-[26px] p-3 md:p-4">
                    <div className="grid h-full grid-cols-2 gap-3 md:gap-4">
                      {/* uptime, a dial: the needle swings to the reading */}
                      <div className="nv-edge nv-edge--ring nv-cell h-full">
                        <div className="nv-edge-inner nv-inset flex h-full min-h-[150px] flex-col justify-between gap-4 p-4 md:p-5">
                          <span className="font-semibold" style={{ fontSize: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1, color: LIME }}>
                            {stats[0].value}
                          </span>
                          <Gauge value={0.999} />
                          <div>
                            <span className="block text-[0.8125rem] font-medium" style={{ color: '#e0e0e2' }}>{stats[0].label[lang]}</span>
                            <span className="nv-cell-detail mt-1 block text-[11px] font-medium leading-tight" style={{ color: LIME }}>{stats[0].detail[lang]}</span>
                          </div>
                        </div>
                      </div>

                      {/* faster operations, a throughput line that draws itself */}
                      <div className="nv-edge nv-edge--ring nv-cell h-full">
                        <div className="nv-edge-inner nv-inset flex h-full min-h-[150px] flex-col justify-between gap-4 p-4 md:p-5">
                          <span className="font-semibold" style={{ fontSize: '1.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
                            {stats[1].value}
                          </span>
                          <Sparkline points={[9, 13, 12, 19, 24, 31, 44]} className="max-w-full" />
                          <div>
                            <span className="block text-[0.8125rem] font-medium" style={{ color: '#e0e0e2' }}>{stats[1].label[lang]}</span>
                            <span className="nv-cell-detail mt-1 block text-[11px] font-medium leading-tight" style={{ color: LIME }}>{stats[1].detail[lang]}</span>
                          </div>
                        </div>
                      </div>

                      {/* zero paper, proportion bars shrinking toward nothing */}
                      <div className="nv-edge nv-edge--ring nv-cell h-full">
                        <div className="nv-edge-inner nv-inset flex h-full min-h-[150px] flex-col justify-between gap-4 p-4 md:p-5">
                          <span className="font-semibold" style={{ fontSize: '1.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
                            {stats[2].value}
                          </span>
                          <StackBars rows={[0.88, 0.4, 0.06]} />
                          <div>
                            <span className="block text-[0.8125rem] font-medium" style={{ color: '#e0e0e2' }}>{stats[2].label[lang]}</span>
                            <span className="nv-cell-detail mt-1 block text-[11px] font-medium leading-tight" style={{ color: LIME }}>{stats[2].detail[lang]}</span>
                          </div>
                        </div>
                      </div>

                      {/* 24/7 access, a satellite that keeps circling the core */}
                      <div className="nv-edge nv-edge--ring nv-cell h-full">
                        <div className="nv-edge-inner nv-inset flex h-full min-h-[150px] flex-col justify-between gap-4 p-4 md:p-5">
                          <span className="font-semibold" style={{ fontSize: '1.75rem', letterSpacing: '-0.04em', lineHeight: 1, color: LIME }}>
                            {stats[3].value}
                          </span>
                          <Orbit />
                          <div>
                            <span className="block text-[0.8125rem] font-medium" style={{ color: '#e0e0e2' }}>{stats[3].label[lang]}</span>
                            <span className="nv-cell-detail mt-1 block text-[11px] font-medium leading-tight" style={{ color: LIME }}>{stats[3].detail[lang]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Seam />

      {/* ════════ BUILT SYSTEMS, wide depth cards, bezel screenshots in wells ════════ */}
      <section className="pt-12 md:pt-16">
        <div className="nv-container">
          <Reveal>
            <h2 className="font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}>
              {t.built.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-4 max-w-[560px] text-[1rem] font-medium" style={{ color: '#b8b8b9' }}>
              {t.built.subheading}
            </p>
          </Reveal>

          <div className="mt-9 space-y-5 md:mt-12 md:space-y-6">
            {t.built.systems.map((sys, i) => {
              const reversed = i % 2 === 1
              const frame = systemFrames[i]
              const href = sys.url ?? '/#contact'
              return (
                <Reveal key={i} delay={0.05}>
                  <div className={`nv-edge nv-edge--ring ${reversed ? 'nv-edge--alt' : ''}`}>
                    <div className="nv-edge-inner nv-inset grid items-center gap-6 p-4 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:p-8">

                      {/* metal-bezel portrait screenshot floating inside a well stage */}
                      <div className={reversed ? 'md:order-2' : 'md:order-1'}>
                        <div className="nv-well nv-stage rounded-[26px] p-4 md:p-6">
                          <a
                            href={href}
                            target={sys.url ? '_blank' : undefined}
                            rel={sys.url ? 'noopener noreferrer' : undefined}
                            className="relative z-[1] mx-auto block w-full max-w-[300px]"
                          >
                            <div className={`nv-bobwrap nv-bob-${i + 1}`}>
                              <div className="nv-float-card">
                                <div className="nv-float-card-img" style={{ aspectRatio: '4 / 5' }}>
                                  <Image
                                    src={frame.src}
                                    alt={`${frame.domain}, business system by landings.md`}
                                    fill
                                    sizes="(min-width: 768px) 300px, 80vw"
                                    className="object-cover object-top"
                                  />
                                  <div
                                    aria-hidden
                                    className="absolute inset-x-0 top-0 z-10 h-16"
                                    style={{ background: 'linear-gradient(180deg, rgba(6,6,6,0.85), transparent)' }}
                                  />
                                  <span
                                    className="absolute inset-x-0 top-0 z-20 block px-3 pt-3 text-[10px] font-medium uppercase leading-tight tracking-[0.12em] text-white"
                                  >
                                    {sys.client}
                                  </span>
                                  <span
                                    className="absolute inset-x-0 bottom-0 z-10 block px-3 pb-2.5 pt-10 text-[12px] font-medium text-white"
                                    style={{ background: 'linear-gradient(0deg, rgba(6,6,6,0.92) 30%, transparent)' }}
                                  >
                                    {frame.domain}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>

                      {/* copy, feature chips, metal button */}
                      <div className={reversed ? 'md:order-1' : 'md:order-2'}>
                        <div className="flex items-center gap-4">
                          <span className="text-[13px] font-semibold tabular-nums" style={{ color: LIME }}>0{i + 1}</span>
                          <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,158,122,0.4), transparent)' }} />
                          <SystemViz index={i} />
                        </div>

                        <h3
                          className="mt-5 font-semibold text-white"
                          style={{ fontSize: 'clamp(1.375rem, 2.4vw, 1.75rem)', lineHeight: 1.15, letterSpacing: '-1.34px' }}
                        >
                          {sys.title}
                        </h3>
                        <p className="mt-4 max-w-[54ch] text-[0.9375rem] font-medium leading-relaxed" style={{ color: '#b8b8b9' }}>
                          {sys.body}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {sys.tags.map((tag) => (
                            <span key={tag} className="chip">
                              <span className="chip-inner !px-3.5 !py-1.5 text-[12px]">{tag}</span>
                            </span>
                          ))}
                        </div>
                        <div className="mt-7">
                          {sys.url ? (
                            <a href={sys.url} target="_blank" rel="noopener noreferrer" className="btn-metal btn-metal--sm">
                              <span>{t.built.visit}</span>
                              <span className="nv-arr" aria-hidden>&rarr;</span>
                            </a>
                          ) : (
                            <Link href="/#contact" className="btn-metal btn-metal--sm">
                              <span>{t.hero.cta}</span>
                              <span className="nv-arr" aria-hidden>&rarr;</span>
                            </Link>
                          )}
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

      <Seam />

      {/* ════════ OTHER SYSTEMS, gradient depth cards with node / bar visuals ════════ */}
      <section className="pt-12 md:pt-16">
        <div className="nv-container">
          <Reveal>
            <h2 className="font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}>
              {t.others.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-4 max-w-[560px] text-[1rem] font-medium" style={{ color: '#b8b8b9' }}>
              {t.others.subheading}
            </p>
          </Reveal>

          <div className="mt-9 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
            {otherSystems.map((study, i) => (
              <Reveal key={study.id} delay={i * 0.06} className="h-full">
                <div className={`nv-edge nv-edge--ring h-full ${i === 1 ? 'nv-edge--alt' : ''}`}>
                  <div className="nv-edge-inner nv-inset flex h-full flex-col p-5 md:p-6">

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] font-semibold tabular-nums" style={{ color: LIME }}>0{i + 1}</span>
                      <span
                        className="text-[10px] font-medium uppercase tracking-[0.12em]"
                        style={{ color: '#909099' }}
                      >
                        {study.badge[lang]}
                      </span>
                    </div>

                    {/* per-card data visual inside its own well, one per card, never repeated */}
                    <div className="nv-well mt-5 flex h-[92px] items-center justify-center rounded-[20px] px-5">
                      {/* packages hopping between depots, the one place a node chain is the system */}
                      {i === 0 && <NodeLine nodes={4} className="w-full" />}
                      {/* the album counts to eighteen */}
                      {i === 1 && (
                        <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.05em]" style={{ color: LIME }}>
                          <Odometer value={18} />
                        </span>
                      )}
                      {/* one dashboard at the center, every module reporting into it */}
                      {i === 2 && <Concentric />}
                    </div>

                    <h3
                      className="mt-5 text-[1.1875rem] font-semibold text-white"
                      style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}
                    >
                      {study.title[lang]}
                    </h3>
                    <span className="mt-1.5 block text-[0.8125rem] font-medium" style={{ color: LIME }}>
                      {study.subtitle[lang]}
                    </span>
                    <p className="mt-4 text-[0.875rem] font-medium leading-relaxed" style={{ color: '#b8b8b9' }}>
                      {study.description[lang]}
                    </p>

                    <div className="flex-1" />

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {study.features[lang].map((feature, fi) => (
                        <span key={fi} className="chip">
                          <span className="chip-inner !px-3 !py-1.5 !text-[11px]">{feature}</span>
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Link href="/#contact" className="btn-metal btn-metal--sm">
                        <span>{t.hero.cta}</span>
                        <span className="nv-arr" aria-hidden>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Seam />

      {/* ════════ CTA CARD, copy + floating bezel shots in a well stage ════════ */}
      <section className="pt-12 md:pt-16">
        <div className="nv-container">
          <Reveal>
            <div className="nv-edge nv-edge--alt nv-edge--ring">
              <div className="nv-edge-inner nv-inset relative overflow-hidden p-5 md:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 h-40 w-[420px] -translate-x-1/2 -translate-y-1/2"
                  style={{ background: 'radial-gradient(closest-side, #FF9E7A33, transparent)' }}
                />
                <div className="relative z-[1] grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
                  <div>
                    <Label>{t.nav.contact}</Label>
                    <h2 className="mt-5 max-w-[520px] font-bold" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}>
                      {t.cta.title}
                    </h2>
                    <p className="mt-5 max-w-[480px] text-[0.9375rem] font-medium leading-relaxed" style={{ color: '#b8b8b9' }}>
                      {t.cta.body}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link href="/#contact" className="btn-metal">
                        <span>{t.cta.button}</span>
                        <span className="nv-arr" aria-hidden>&rarr;</span>
                      </Link>
                      <a href="mailto:contact@landings.md" className="btn-metal">
                        <span>contact@landings.md</span>
                        <span className="nv-arr" aria-hidden>&rarr;</span>
                      </a>
                    </div>
                    {/* direct lines instead of a decorative strip */}
                    <div className="mt-8 rounded-[22px] p-5 nv-well">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                        <a
                          href="tel:+37368327082"
                          className="text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:!text-[#FF9E7A]"
                        >
                          +373 683 27 082
                        </a>
                        <span className="h-4 w-px shrink-0" style={{ background: 'rgba(255,255,255,0.14)' }} aria-hidden />
                        <a
                          href="mailto:contact@landings.md"
                          className="text-[0.9375rem] font-medium transition-colors duration-200 hover:!text-white"
                          style={{ color: '#b8b8b9' }}
                        >
                          contact@landings.md
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="nv-well nv-stage rounded-[26px] p-4 md:p-6">
                    <div className="relative z-[1] grid grid-cols-3 gap-3 md:gap-4">
                      {ctaShots.map((s) => (
                        <div key={s.src} className={s.bob}>
                          <div className="nv-float-card">
                            <div className="nv-float-card-img" style={{ aspectRatio: '3 / 4' }}>
                              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 140px, 28vw" className="object-cover object-top" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <SiteFooter />

    </main>
  )
}
