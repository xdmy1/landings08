"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SiteNav } from '@/components/ui/site-nav'
import { useLanguage } from '@/hooks/useLanguage'

/* ────────────────────────────────────────────────────────────────
   navarro.ro clone — landings.md content only.
   Ground #0d0d0d · lime #FF9E7A · Geist · blur-up reveals.
   ──────────────────────────────────────────────────────────────── */

const LIME = '#FF9E7A'

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
    <span className="inline-flex items-center text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
      {children}
    </span>
  )
}

/* ── Fixed data: projects, accents, logos ── */
const PROJECTS_META = [
  { key: 'davo',          name: 'Davo.md',         url: 'davo.md',           accent: '#2456A6', shot: '/images/tall-davo.jpg' },
  { key: 'interbus',      name: 'Inter-Bus',       url: 'inter-bus.md',      accent: '#D23B33', shot: '/images/tall-interbus.jpg' },
  { key: 'cmiea',         name: 'CMIEA.md',        url: 'cmiea.md',          accent: '#3E7BFA', shot: '/images/tall-cmiea.jpg' },
  { key: 'glg',           name: 'Scoala Auto GLG', url: 'scoalaautoglg.com', accent: '#2f7df6', shot: '/images/tall-glg.jpg' },
  { key: 'radx',          name: 'RADX Cooling',    url: 'radx.solutions',    accent: '#E23B3B', shot: '/images/tall-radx.jpg' },
  { key: 'eliteprotocol', name: 'Elite Protocol',  url: 'eliteprotocol.md',  accent: '#C9A227', shot: '/images/tall-eliteprotocol.jpg' },
  { key: 'rizzaclassic',  name: 'Rizza Classic',   url: 'rizzaclassic.com',  accent: '#B98F5A', shot: '/images/tall-rizzaclassic.jpg' },
  { key: 'autohuse',      name: 'Auto Huse',       url: 'autohuse.md',       accent: '#F08A24', shot: '/images/tall-autohuse.jpg' },
] as const

const LOGO_ROW = [
  { k: 'davo', h: 'h-5 md:h-6' },
  { k: 'interbus', h: 'h-6 md:h-7' },
  { k: 'cmiea', h: 'h-8 md:h-9' },
  { k: 'radx', h: 'h-5 md:h-6' },
  { k: 'rizzaclassic', h: 'h-7 md:h-8' },
  { k: 'glg', h: 'h-9 md:h-10' },
] as const

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
        radx:          { caption: 'Industrial cooling · Site',  line: 'Page 1 on Google for industrial cooling' },
        eliteprotocol: { caption: 'Etiquette · Premium site',   line: 'A premium brand, matched pixel for pixel' },
        rizzaclassic:  { caption: 'Restoration · Italy',        line: 'Italian classics, international clients' },
        autohuse:      { caption: 'Custom covers · Orders',     line: 'Made-to-order covers, ordered online' },
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
      avail: 'Available for new projects',
    },
    contact: {
      label: 'Contact',
      heading: 'Ready to get more *clients?*',
      sub: "Tell us about your business. We'll show you how to rank on Google, what to automate, and what it would cost.",
      form: { name: 'Name', email: 'Email', message: 'Tell us about your business...', send: 'Send message' },
    },
    footer: { tagline: 'We build the site. We take it to the top. We automate the rest.', copy: '© 2026 landings.md · Chisinau, Moldova', nav: ['Portfolio', 'Pricing', 'Solutions', 'Case Studies'], pages: 'Pages', reach: 'Contact' },
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
        radx:          { caption: 'Racire industriala · Site',  line: 'Prima pagina Google la racire industriala' },
        eliteprotocol: { caption: 'Eticheta · Site premium',    line: 'Brand premium, aliniat pixel cu pixel' },
        rizzaclassic:  { caption: 'Restaurari · Italia',        line: 'Clasice italiene, clienti internationali' },
        autohuse:      { caption: 'Huse la comanda · Comenzi',  line: 'Huse la comanda, comandate online' },
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
      avail: 'Disponibil pentru proiecte noi',
    },
    contact: {
      label: 'Contact',
      heading: 'Pregatit sa atragi mai multi *clienti?*',
      sub: 'Spune-ne despre afacerea ta. Iti aratam cum sa apari pe Google, ce merita automatizat si cat ar costa.',
      form: { name: 'Nume', email: 'Email', message: 'Spune-ne despre afacerea ta...', send: 'Trimite mesaj' },
    },
    footer: { tagline: 'Construim site-ul. Il ducem in top. Automatizam restul.', copy: '© 2026 landings.md · Chisinau, Moldova', nav: ['Portofoliu', 'Preturi', 'Solutii', 'Studii de Caz'], pages: 'Pagini', reach: 'Contact' },
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
        radx:          { caption: 'Industriekuhlung · Site',    line: 'Seite 1 bei Google fur Industriekuhlung' },
        eliteprotocol: { caption: 'Etikette · Premium-Site',    line: 'Premium-Marke, Pixel fur Pixel' },
        rizzaclassic:  { caption: 'Restaurierung · Italien',    line: 'Italienische Klassiker, internationale Kunden' },
        autohuse:      { caption: 'Massbezuge · Bestellungen',  line: 'Massanfertigungen, online bestellt' },
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
      avail: 'Verfugbar fur neue Projekte',
    },
    contact: {
      label: 'Kontakt',
      heading: 'Bereit fur mehr *Kunden?*',
      sub: 'Erzahlen Sie uns von Ihrem Geschaft. Wir zeigen Ihnen, wie Sie bei Google ranken, was sich automatisieren lasst und was es kostet.',
      form: { name: 'Name', email: 'E-Mail', message: 'Erzahlen Sie uns von Ihrem Geschaft...', send: 'Nachricht senden' },
    },
    footer: { tagline: 'Wir bauen die Website. Wir bringen sie nach oben. Wir automatisieren den Rest.', copy: '© 2026 landings.md · Chisinau, Moldawien', nav: ['Portfolio', 'Preise', 'Losungen', 'Fallstudien'], pages: 'Seiten', reach: 'Kontakt' },
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
        radx:          { caption: 'Refroidissement · Site',     line: 'Page 1 sur Google — refroidissement industriel' },
        eliteprotocol: { caption: 'Etiquette · Site premium',   line: 'Marque premium, au pixel pres' },
        rizzaclassic:  { caption: 'Restauration · Italie',      line: 'Classiques italiennes, clients internationaux' },
        autohuse:      { caption: 'Housses sur mesure',         line: 'Housses sur mesure, commandees en ligne' },
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
      avail: 'Disponible pour de nouveaux projets',
    },
    contact: {
      label: 'Contact',
      heading: 'Pret a attirer plus de *clients ?*',
      sub: 'Parlez-nous de votre activite. On vous montre comment apparaitre sur Google, quoi automatiser et combien ca couterait.',
      form: { name: 'Nom', email: 'Email', message: 'Parlez-nous de votre activite...', send: 'Envoyer' },
    },
    footer: { tagline: 'On construit le site. On le fait monter. On automatise le reste.', copy: '© 2026 landings.md · Chisinau, Moldavie', nav: ['Portfolio', 'Tarifs', 'Solutions', 'Etudes de Cas'], pages: 'Pages', reach: 'Contact' },
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
        radx:          { caption: 'Refrigeracion · Web',        line: 'Pagina 1 en Google en refrigeracion industrial' },
        eliteprotocol: { caption: 'Etiqueta · Web premium',     line: 'Marca premium, pixel a pixel' },
        rizzaclassic:  { caption: 'Restauracion · Italia',      line: 'Clasicos italianos, clientes internacionales' },
        autohuse:      { caption: 'Fundas a medida · Pedidos',  line: 'Fundas a medida, pedidas online' },
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
      avail: 'Disponible para nuevos proyectos',
    },
    contact: {
      label: 'Contacto',
      heading: 'Listo para mas *clientes?*',
      sub: 'Cuentanos sobre tu negocio. Te mostramos como posicionarte en Google, que automatizar y cuanto costaria.',
      form: { name: 'Nombre', email: 'Email', message: 'Cuentanos sobre tu negocio...', send: 'Enviar mensaje' },
    },
    footer: { tagline: 'Creamos tu web. La llevamos arriba. Automatizamos el resto.', copy: '© 2026 landings.md · Chisinau, Moldavia', nav: ['Portafolio', 'Precios', 'Soluciones', 'Casos de Estudio'], pages: 'Paginas', reach: 'Contacto' },
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

      {/* ════════ HERO — his rhythm, our moves: arch + diagonal ribbed glass ════════ */}
      <section className="relative overflow-hidden">
        {/* badges cloud — static real-fact chips */}
        <div className="nv-container pt-8 md:pt-12">
          <Reveal>
            <div className="mx-auto flex max-w-[860px] flex-wrap items-center justify-center gap-3">
              {t.badges.map((b) => (
                <span key={b} className="chip">
                  <span className="chip-inner">
                    <span className="dot-lime" />
                    {b}
                  </span>
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-4 flex justify-center">
              <span className="chip chip--em">
                <span className="chip-inner">
                  <span className="dot-lime" />
                  {t.badgeEm}
                </span>
              </span>
            </div>
          </Reveal>

          {/* client logo row — 30% → 80% */}
          <Reveal delay={0.14}>
            <div className="mx-auto mt-12 flex max-w-[900px] flex-wrap items-center justify-center gap-x-10 gap-y-6 md:mt-14">
              {LOGO_ROW.map((l) => (
                <span key={l.k} className="nv-logo">
                  <Image src={`/images/logos/${l.k}.png`} alt={l.k} width={140} height={40} className={`w-auto ${l.h}`} />
                </span>
              ))}
            </div>
            <p className="sr-only">{t.logos}</p>
          </Reveal>
        </div>

        {/* the ARCH — our shape, holding the real product */}
        <div className="relative z-0 mt-12 flex justify-center md:mt-16">
          <div className="relative" style={{ width: 'min(430px, 80vw)', aspectRatio: '430 / 560' }}>
            {/* warm saturated blob */}
            <div
              aria-hidden
              className="absolute -inset-16 rounded-full"
              style={{
                background: 'conic-gradient(from 30deg, #FF9E7A, #f2d06f, #d23b33, #7a4df0, #FF9E7A)',
                filter: 'saturate(1.1) blur(80px)',
                opacity: 0.4,
              }}
            />
            {/* white ellipse blur */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: '130%', height: 300, background: '#fff', filter: 'blur(140px)', opacity: 0.14 }}
            />
            <div
              className="relative h-full w-full overflow-hidden"
              style={{ borderRadius: '999px 999px 28px 28px', border: '1px solid rgba(73,73,73,0.6)' }}
            >
              <Image
                src="/images/tall-davo.jpg"
                alt="Davo.md — platforma de rezervari construita de landings.md"
                fill
                sizes="430px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>

        {/* diagonal ribbed glass band — H1 sits on it */}
        <div className="ribbed relative z-10 -mt-44 md:-mt-52">
          <div className="relative z-[1] nv-container">
            <div className="mx-auto max-w-[1040px] pb-14 pt-20 text-center md:pb-20 md:pt-28">
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
              className="mt-4 font-semibold"
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
                      style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.72), rgba(8,8,8,0.28) 55%, transparent)' }}
                    >
                      <span className="text-[15px] font-medium text-white">{p.name}</span>
                      <span className="text-right text-[12px] font-medium uppercase tracking-[0.1em]" style={{ color: '#a4a4a4' }}>
                        {pt.caption}
                      </span>
                    </div>
                    {/* bottom overlay: superlative + view */}
                    <div
                      className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-6 pb-6 pt-16"
                      style={{ background: 'linear-gradient(0deg, rgba(6,6,6,0.88), rgba(6,6,6,0.42) 55%, transparent)' }}
                    >
                      <p className="max-w-[68%] text-[0.9375rem] font-medium leading-snug text-white">{pt.line}</p>
                      <a
                        href={`https://${p.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-none items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-white transition-[box-shadow] duration-300 ease-in-out hover:[box-shadow:0_0_1px_1px_#FF9E7A]"
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
                        background: active === i ? '#FF9E7A' : 'rgba(255,255,255,0.2)',
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
                  className="overflow-hidden rounded-[20px] bg-white p-3 md:p-4"
                  style={{
                    border: '1px solid rgba(73,73,73,0.6)',
                    boxShadow: '0 0 50px -9px rgba(255,158,122,0.3)',
                  }}
                >
                  <Image
                    src="/images/davo-ahrefs.png"
                    alt="Ahrefs — davo.md: DR 50, 2.6K backlinks"
                    width={2102}
                    height={512}
                    sizes="(min-width: 768px) 600px, 90vw"
                    className="h-auto w-full"
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
                <div className="nv-edge-inner flex h-full flex-col justify-center p-7">
                  <span className="font-medium" style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.stats.cells[0].v}</span>
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
                  <h3 className="mt-3 font-semibold" style={{ fontSize: '2.5rem', letterSpacing: '-2.4px', lineHeight: 1 }}>
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
                        src="/images/tall-davo.jpg"
                        alt="Site custom-coded — landings.md"
                        fill
                        sizes="380px"
                        className="object-cover object-top"
                      />
                    </div>
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
                <div className="nv-edge-inner flex h-full flex-col justify-center p-7">
                  <span className="font-medium" style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.stats.cells[1].v}</span>
                  <span className="mt-3 text-[0.875rem] font-medium" style={{ color: '#909099' }}>{t.stats.cells[1].l}</span>
                </div>
              </div>
            </Reveal>

            {/* col 1 row 2 */}
            <Reveal delay={0.14} className="h-full">
              <div className="nv-edge nv-edge--ring h-full">
                <div className="nv-edge-inner flex h-full flex-col justify-center p-7">
                  <span className="font-medium" style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.stats.cells[2].v}</span>
                  <span className="mt-3 text-[0.875rem] font-medium" style={{ color: '#909099' }}>{t.stats.cells[2].l}</span>
                </div>
              </div>
            </Reveal>

            {/* col 3 row 2 */}
            <Reveal delay={0.18} className="h-full">
              <div className="nv-edge nv-edge--ring h-full">
                <div className="nv-edge-inner flex h-full flex-col justify-center p-7">
                  <span className="font-medium" style={{ fontSize: '2.75rem', letterSpacing: '-0.04em', lineHeight: 1, color: LIME }}>{t.stats.cells[3].v}</span>
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
                  <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    {t.stats.cells.slice(0, 3).map((c) => (
                      <div key={c.v}>
                        <p className="text-[1.25rem] font-medium" style={{ letterSpacing: '-0.02em' }}>{c.v}</p>
                        <p className="mt-0.5 text-[11px] font-medium leading-tight" style={{ color: '#909099' }}>{c.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* div3 — heading + stack (top right, wide) */}
            <Reveal delay={0.06} className="nv-a3 h-full">
              <div className="nv-edge nv-edge--alt h-full">
                <div className="nv-edge-inner flex h-full min-h-[220px] flex-col justify-center p-7 text-center md:p-9">
                  <h2 className="font-semibold" style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}>
                    <Marked text={t.about.heading} />
                  </h2>
                  <p className="mx-auto mt-4 max-w-[480px] text-[0.9375rem] font-medium" style={{ color: '#b8b8b9' }}>
                    {t.about.headingSub}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    {[...t.about.stack, 'SEO', 'Meta Ads', 'Google Ads', 'ERP'].map((s) => (
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
                  <a href="mailto:contact@landings.md" className="mt-2 text-[1rem] font-medium text-white transition-colors duration-300 hover:!text-[#FF9E7A]">
                    contact@landings.md
                  </a>
                  <a href="tel:+37368327082" className="text-[1rem] font-medium transition-colors duration-300 hover:!text-[#FF9E7A]" style={{ color: '#b8b8b9' }}>
                    +373 683 27 082
                  </a>
                  <p className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium" style={{ color: '#909099' }}>
                    <span className="dot-lime" />
                    {t.about.avail}
                  </p>
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
                  style={{ background: 'radial-gradient(closest-side, #FF9E7A33, transparent)' }}
                />
                <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
                  <div>
                    <Label>{t.contact.label}</Label>
                    <h2
                      className="mt-5 font-semibold"
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
                        className="inline-flex items-center rounded-full px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-[box-shadow] duration-300 ease-in-out hover:[box-shadow:0_0_1px_1px_#FF9E7A]"
                        style={{ border: '1px solid rgba(255,255,255,0.16)' }}
                      >
                        +373 683 27 082
                      </a>
                    </div>
                  </div>

                  {/* cinematic mailto form — staggered reveals, sweeping lime underlines */}
                  <form onSubmit={submitForm} className="flex flex-col gap-6">
                    <Reveal delay={0.1}>
                      <div className="nv-field">
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={t.contact.form.name}
                          className="w-full bg-transparent pb-3 text-[1rem] font-medium text-white outline-none placeholder:text-[#909099]"
                          style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', borderRadius: 0, boxShadow: 'none' }}
                        />
                      </div>
                    </Reveal>
                    <Reveal delay={0.18}>
                      <div className="nv-field">
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={t.contact.form.email}
                          className="w-full bg-transparent pb-3 text-[1rem] font-medium text-white outline-none placeholder:text-[#909099]"
                          style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', borderRadius: 0, boxShadow: 'none' }}
                        />
                      </div>
                    </Reveal>
                    <Reveal delay={0.26}>
                      <div className="nv-field">
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder={t.contact.form.message}
                          className="w-full resize-none bg-transparent pb-3 text-[1rem] font-medium text-white outline-none placeholder:text-[#909099]"
                          style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', borderRadius: 0, boxShadow: 'none' }}
                        />
                      </div>
                    </Reveal>
                    <Reveal delay={0.34}>
                      <button type="submit" className="btn-metal self-start">
                        {t.contact.form.send}
                        <span className="nv-arr" aria-hidden>&rarr;</span>
                      </button>
                    </Reveal>
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
          <div className="grid gap-12 pt-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
            {/* brand block */}
            <div>
              <div className="flex items-center gap-3">
                <Image src="/images/logowhite.png" alt="landings.md" width={26} height={44} className="h-10 w-auto" />
                <span className="text-[1.125rem] font-semibold text-white" style={{ letterSpacing: '-0.02em' }}>landings.md</span>
              </div>
              <p className="mt-5 max-w-[340px] text-[0.9375rem] font-medium leading-relaxed" style={{ color: '#909099' }}>
                {t.footer.tagline}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium" style={{ color: '#b8b8b9' }}>
                <span className="dot-lime" />
                {t.about.avail}
              </p>
            </div>
            {/* pages */}
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>{t.footer.pages}</p>
              <div className="mt-5 flex flex-col gap-3 text-[0.9375rem] font-medium">
                {(['/portfolio', '/pricing', '/solutions', '/case-studies'] as const).map((href, i) => (
                  <a key={href} href={href} className="self-start transition-colors duration-300 hover:!text-white" style={{ color: '#a4a4a4' }}>
                    {t.footer.nav[i]}
                  </a>
                ))}
              </div>
            </div>
            {/* contact */}
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>{t.footer.reach}</p>
              <div className="mt-5 flex flex-col gap-3 text-[0.9375rem] font-medium">
                <a href="mailto:contact@landings.md" className="self-start transition-colors duration-300 hover:!text-white" style={{ color: '#a4a4a4' }}>
                  contact@landings.md
                </a>
                <a href="tel:+37368327082" className="self-start transition-colors duration-300 hover:!text-white" style={{ color: '#a4a4a4' }}>
                  +373 683 27 082
                </a>
                <a href="https://instagram.com/landings.md" target="_blank" rel="noopener noreferrer" className="self-start transition-colors duration-300 hover:!text-white" style={{ color: '#a4a4a4' }}>
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div
            className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-7 md:flex-row"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="text-[12px] font-medium" style={{ color: '#909099' }}>{t.footer.copy}</p>
            <p className="text-[12px] font-medium" style={{ color: '#6b6b73' }}>Next.js · React · Tailwind</p>
          </div>
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
