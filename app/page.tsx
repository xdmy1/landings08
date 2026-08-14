"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SiteNav } from '@/components/ui/site-nav'
import { LogoStrip } from '@/components/ui/logo-grid'
import { BrowserFrame } from '@/components/ui/browser-frame'
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

/* Per-character rise for display headings. Lines split on \n; words in
   *asterisks* set in italic (the serif accent voice — never a color). */
function CharsReveal({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.15)
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  let charIndex = 0
  const shown = visible || reduced
  return (
    <span ref={ref as React.RefObject<HTMLDivElement>} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {text.split('\n').map((line, li) => (
        <span key={li} aria-hidden className="block">
          {line.split(' ').map((raw, wi) => {
            const accented = raw.startsWith('*')
            const word = raw.replace(/\*/g, '')
            return (
              <span key={wi} className={`inline-block whitespace-nowrap mr-[0.24em] last:mr-0 ${accented ? 'italic' : ''}`}>
                {word.split('').map((ch, ci) => {
                  const d = delay + charIndex++ * 12
                  return (
                    <span
                      key={ci}
                      className="inline-block transition-[transform,opacity] duration-[400ms] ease-m"
                      style={{
                        transform: shown ? 'translateY(0)' : 'translateY(30px)',
                        opacity: shown ? 1 : 0.001,
                        transitionDelay: reduced ? '0ms' : `${d}ms`,
                      }}
                    >
                      {ch}
                    </span>
                  )
                })}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

/* Per-word rise for the statement: dim ink to solid ink, 6px, enter once */
function WordsRise({ text, className = "" }: { text: string, className?: string }) {
  const { ref, visible } = useInView(0.2)
  const words = text.split(' ')
  return (
    <p ref={ref as React.RefObject<HTMLParagraphElement>} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block mr-[0.28em] last:mr-0 transition-[transform,opacity,color] duration-[400ms] ease-m"
          style={{
            color: visible ? '#251109' : 'rgba(37,17,9,0.18)',
            transform: visible ? 'translateY(0)' : 'translateY(6px)',
            transitionDelay: `${i * 20}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </p>
  )
}

const ArrowUpRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
)

export default function HomePage() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Start a project" },
      hero: { headline: "We build the site\nWe take it to the *top.*\nWe automate the rest", sub: "Custom-coded websites that rank on page one of Google, Meta & Google Ads campaigns, and booking, invoicing and accounting systems that free your business from paperwork.", cta: "Start a project", note: "delivered in 1–4 weeks · reply within 24h" },
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
      hero: { headline: "Construim site-ul\nIl ducem in *top.*\nAutomatizam restul", sub: "Site-uri scrise manual care apar pe prima pagina Google, campanii Meta & Google Ads si sisteme de rezervari, facturare si contabilitate care iti scapa afacerea de foi.", cta: "Incepe un proiect", note: "livrat in 1–4 saptamani · raspuns in 24h" },
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
      hero: { headline: "Wir bauen die Website\nWir bringen sie nach *oben.*\nWir automatisieren den Rest", sub: "Handgeschriebene Websites auf Seite 1 bei Google, Meta & Google Ads Kampagnen und Systeme fur Buchungen, Rechnungen und Buchhaltung — die Ihr Unternehmen vom Papierkram befreien.", cta: "Projekt starten", note: "Lieferung in 1–4 Wochen · Antwort in 24h" },
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
      hero: { headline: "On construit le site\nOn le fait *monter.*\nOn automatise le reste", sub: "Des sites codes sur mesure qui se classent en premiere page de Google, des campagnes Meta & Google Ads, et des systemes de reservation, facturation et comptabilite qui liberent votre entreprise de la paperasse.", cta: "Demarrer un projet", note: "livre en 1–4 semaines · reponse en 24h" },
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
      hero: { headline: "Creamos tu web\nLa llevamos *arriba.*\nAutomatizamos el resto", sub: "Webs a medida que aparecen en la primera pagina de Google, campanas de Meta & Google Ads, y sistemas de reservas, facturacion y contabilidad que liberan tu negocio del papeleo.", cta: "Iniciar proyecto", note: "entregado en 1–4 semanas · respuesta en 24h" },
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

  return (
    <div className="min-h-screen">

      {/* ── S1+S2: ANNOUNCE + NAV + HERO on ink ── */}
      <div className="ground-ink text-white" style={{ background: '#251109' }}>
        <SiteNav contactHref="#contact" tone="dark" />

        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-10 md:pt-16 pb-14 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <h1 className="font-serif font-light text-[clamp(2.6rem,4.9vw,4.1rem)] leading-[0.9] tracking-[-0.06em] text-white">
                <CharsReveal text={t.hero.headline} delay={150} />
              </h1>
              <Rise delay={400}>
                <p className="mt-8 text-[17px] leading-[1.3] text-white/60 max-w-md">{t.hero.sub}</p>
              </Rise>
              <Rise delay={500}>
                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Link href="#contact" className="btn-cta">
                    <span className="btn-fill-bg" aria-hidden />
                    <span className="btn-fill-label">
                      {t.hero.cta}
                      <span className="btn-chip" aria-hidden>
                        <ArrowUpRight className="arrow-a" />
                        <ArrowUpRight className="arrow-b" />
                      </span>
                    </span>
                  </Link>
                  <span className="text-[11px] font-mono tracking-[0.08em] uppercase text-white/40">{t.hero.note}</span>
                </div>
              </Rise>
            </div>
            <Rise delay={300} className="lg:col-span-5">
              <BrowserFrame domain="davo.md" ground="ink">
                <div className="aspect-[16/10] overflow-hidden">
                  <Image src="/images/shot-davo.jpg" alt="davo.md — site and booking system by landings.md" width={960} height={600} quality={85} className="w-full h-full object-cover object-top" priority />
                </div>
              </BrowserFrame>
            </Rise>
          </div>
        </section>

        {/* ── S3: LOGO STRIP on ink ── */}
        <section className="border-t border-[#57433B]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-14 pb-7">
            <Rise>
              <p className="text-[11px] font-bold tracking-[0.04em] uppercase text-white/40 mb-7">{t.logos}</p>
              <LogoStrip />
            </Rise>
          </div>
        </section>
      </div>

      {/* ── S4: STATS on paper ── */}
      <section className="text-ink" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E8E3E0]">
            {t.numbers.map((n, i) => (
              <Rise key={i} delay={i * 80} className={`p-7 ${i % 2 === 0 ? 'border-r border-[#E8E3E0]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-[#E8E3E0]' : ''} ${i < 3 ? 'md:border-r md:border-[#E8E3E0]' : ''}`}>
                <p className="font-sans font-medium text-[40px] leading-[1.05] tracking-[-0.02em] text-ink">{n.value}</p>
                <p className="text-[11px] font-bold tracking-[0.04em] uppercase text-ink-light mt-4">{n.label}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: SERVICE ROWS on ink — the dark return ── */}
      <section className="ground-ink text-white" style={{ background: '#251109' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-14 md:pt-16">
          <Rise>
            <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-white/40 block pb-8">{t.services.label}</span>
          </Rise>
        </div>
        <div className="border-t border-[#57433B]">
          {t.services.items.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className="group block border-b border-[#57433B] transition-colors duration-[400ms] ease-m hover:bg-white"
            >
              <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8 md:py-12 grid grid-cols-[2.5rem_1fr_auto] lg:grid-cols-[5rem_1.2fr_1fr_auto] gap-4 lg:gap-8 items-start">
                <span className="text-[11px] font-bold tracking-[0.04em] pt-2 md:pt-4 text-white/30 group-hover:text-ink/30 transition-colors duration-[400ms] ease-m">0{i + 1}</span>
                <h3 className="font-serif font-light text-[28px] md:text-[40px] leading-[1.0] tracking-[-0.03em] text-white group-hover:text-ink transition-colors duration-[400ms] ease-m">{s.title}</h3>
                <p className="hidden lg:block text-[15px] leading-[1.3] text-white/60 group-hover:text-ink-light max-w-[36ch] pt-1.5 transition-colors duration-[400ms] ease-m">{s.body}</p>
                <span className="pt-1.5 text-white group-hover:text-ink transition-[color,transform] duration-[400ms] ease-m group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── S6: SELECTED WORK on paper ── */}
      <section className="text-ink" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <Rise>
            <div className="flex items-center justify-between mb-10">
              <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-ink-light">{t.work.label}</span>
              <Link href="/portfolio" className="text-[14px] font-medium text-ink hover:underline underline-offset-4">{t.work.viewAll} &rarr;</Link>
            </div>
          </Rise>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E8E3E0]">
            {projects.map((project, i) => (
              <Link
                key={i}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-6 transition-colors duration-[400ms] ease-m hover:bg-[#FAF7F5] ${i < 2 ? 'md:border-r md:border-[#E8E3E0]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-[#E8E3E0]' : ''}`}
              >
                <BrowserFrame domain={project.domain} ground="light">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Image src={project.src} alt={`${project.name} — website, SEO and business systems by landings.md`} width={960} height={600} quality={85} className="w-full h-full object-cover object-top" />
                  </div>
                </BrowserFrame>
                <div className="pt-5">
                  <div className="flex flex-wrap items-center gap-x-2 mb-2.5">
                    <span className="text-[10px] font-mono tracking-[0.08em] uppercase text-ink/30">{project.category}</span>
                    <span className="text-[10px] font-mono tracking-[0.08em] uppercase text-ink/30">· {project.tag}</span>
                  </div>
                  <h3 className="font-sans font-medium text-[20px] leading-[1.2] tracking-[-0.01em] text-ink mb-2">{project.name}</h3>
                  <p className="text-[14px] leading-[1.5] text-ink-light line-clamp-2">{project.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-mono text-ink-light group-hover:text-ink transition-colors duration-[400ms] ease-m">
                    {project.domain}
                    <span className="inline-block -rotate-45 group-hover:rotate-0 transition-transform duration-[400ms] ease-m"><ArrowUpRight className="w-3 h-3" /></span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: STATEMENT on paper-2 ── */}
      <section className="border-y border-[#E8E3E0]" style={{ background: '#FAF7F5' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <WordsRise
            text={t.statement}
            className="font-serif font-light text-[26px] md:text-[32px] leading-[1.15] tracking-[-0.03em] max-w-3xl"
          />
        </div>
      </section>

      {/* ── S8: PROCESS on paper ── */}
      <section className="text-ink" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <Rise>
            <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-ink-light block mb-12">{t.process.label}</span>
          </Rise>
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-[#E8E3E0] gap-10 md:gap-0">
            {t.process.steps.map((step, i) => (
              <Rise key={i} delay={i * 80} className={i === 0 ? 'md:pr-10' : i === 2 ? 'md:pl-10' : 'md:px-10'}>
                <span className="font-serif font-light text-[96px] leading-none block -mb-[0.32em] select-none" style={{ color: 'rgba(37,17,9,0.08)' }}>{step.num}</span>
                <h3 className="font-serif font-light text-[24px] tracking-[-0.03em] text-ink mb-3 relative">{step.title}</h3>
                <p className="text-[15px] leading-[1.6] text-ink-muted max-w-[30ch]">{step.body}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── S9+S10: CONTACT FLOOD + FOOTER — the saved punchline ── */}
      <section id="contact" style={{ background: '#E8825A' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 md:pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pb-20 md:pb-28">
            <div>
              <Rise>
                <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-ink block mb-5">{t.contact.label}</span>
              </Rise>
              <h2 className="font-serif font-light text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.0] tracking-[-0.03em] text-ink mb-6">
                <CharsReveal text={t.contact.heading} />
              </h2>
              <Rise delay={200}>
                <p className="text-[15px] leading-[1.4] max-w-md" style={{ color: 'rgba(37,17,9,0.7)' }}>{t.contact.sub}</p>
                <p className="mt-7 text-[14px] font-medium text-ink">contact@landings.md</p>
                <Link href="tel:+37368327082" className="mt-1 inline-block text-[14px] font-medium text-ink/70 hover:text-ink transition-colors duration-[400ms] ease-m">+373 683 27 082</Link>
              </Rise>
            </div>
            <Rise delay={150}>
              {formSent ? (
                <div className="flex items-center h-full"><p className="text-ink text-[17px] font-medium">{t.form.sent}</p></div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); const s = encodeURIComponent(`New project from ${formData.name}`); const b = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`); window.location.href = `mailto:contact@landings.md?subject=${s}&body=${b}`; setFormSent(true) }}>
                  <input type="text" required placeholder={t.form.name} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b px-0 py-4 text-[15px] text-ink placeholder:text-ink/60 focus:outline-none transition-colors duration-[400ms] ease-m" style={{ borderColor: 'rgba(37,17,9,0.3)' }} onFocus={(e) => e.currentTarget.style.borderColor = '#251109'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(37,17,9,0.3)'} />
                  <input type="email" required placeholder={t.form.email} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b px-0 py-4 text-[15px] text-ink placeholder:text-ink/60 focus:outline-none transition-colors duration-[400ms] ease-m" style={{ borderColor: 'rgba(37,17,9,0.3)' }} onFocus={(e) => e.currentTarget.style.borderColor = '#251109'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(37,17,9,0.3)'} />
                  <textarea required rows={3} placeholder={t.form.message} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-transparent border-b px-0 py-4 text-[15px] text-ink placeholder:text-ink/60 focus:outline-none transition-colors duration-[400ms] ease-m resize-none" style={{ borderColor: 'rgba(37,17,9,0.3)' }} onFocus={(e) => e.currentTarget.style.borderColor = '#251109'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(37,17,9,0.3)'} />
                  <div className="pt-8">
                    <button type="submit" className="btn-cta btn-cta--ink">
                      <span className="btn-fill-bg" aria-hidden />
                      <span className="btn-fill-label">
                        {t.form.send}
                        <span className="btn-chip" aria-hidden>
                          <ArrowUpRight className="arrow-a" />
                          <ArrowUpRight className="arrow-b" />
                        </span>
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </Rise>
          </div>

          {/* footer lives inside the flood */}
          <footer className="border-t py-10" style={{ borderColor: '#C96540' }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center">
                  <Image src="/images/logowhite.png" alt="landings.md" width={16} height={26} className="w-4 h-auto" style={{ filter: 'brightness(0)' }} />
                </Link>
                <div className="hidden md:flex items-center gap-4 text-[14px] font-medium">
                  <Link href="/portfolio" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors">{t.nav.portfolio}</Link>
                  <Link href="/pricing" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors">{t.nav.pricing}</Link>
                  <Link href="/solutions" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors">{t.nav.solutions}</Link>
                  <Link href="/case-studies" className="text-ink/70 hover:text-ink hover:underline underline-offset-4 transition-colors">{t.nav.caseStudies}</Link>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[13px]" style={{ color: 'rgba(37,17,9,0.7)' }}>
                <Link href="tel:+37368327082" className="hover:text-ink transition-colors">+373 683 27 082</Link>
                <Link href="mailto:contact@landings.md" className="hover:text-ink transition-colors">contact@landings.md</Link>
                <span>{t.footer.copy}</span>
              </div>
            </div>
            <p className="mt-5 text-[11px] leading-relaxed max-w-2xl" style={{ color: 'rgba(37,17,9,0.5)' }}>
              Websites, SEO, Meta & Google Ads and custom business systems for small businesses across Europe. Hand-coded websites that rank on Google — plus booking, invoicing, stock and automated accounting systems that replace paperwork. In English, Romanian, German, French, and Spanish. Chisinau, Moldova.
            </p>
          </footer>
        </div>
      </section>

    </div>
  )
}
