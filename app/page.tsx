"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SiteNav } from '@/components/ui/site-nav'
import { useLanguage } from '@/hooks/useLanguage'

/* ────────────────────────────────────────────────────────────────
   navarro.ro clone | landings.md content only.
   Ground #0d0d0d · lime #FF9E7A · Geist · blur-up reveals.
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
  { key: 'glg',           name: 'Scoala Auto GLG', url: 'scoalaautoglg.com', accent: '#2f7df6', shot: '/images/tall-glg.jpg' },
  { key: 'davo',          name: 'Davo.md',         url: 'davo.md',           accent: '#2456A6', shot: '/images/tall-davo.jpg' },
  { key: 'interbus',      name: 'Inter-Bus',       url: 'inter-bus.md',      accent: '#D23B33', shot: '/images/tall-interbus.jpg' },
  { key: 'cmiea',         name: 'CMIEA.md',        url: 'cmiea.md',          accent: '#3E7BFA', shot: '/images/tall-cmiea.jpg' },
  { key: 'radx',          name: 'RADX Cooling',    url: 'radx.solutions',    accent: '#E23B3B', shot: '/images/tall-radx.jpg' },
  { key: 'eliteprotocol', name: 'Elite Protocol',  url: 'eliteprotocol.md',  accent: '#C9A227', shot: '/images/tall-eliteprotocol.jpg' },
] as const

const LOGO_ROW = [
  { k: 'davo', h: 'h-5 md:h-6' },
  { k: 'interbus', h: 'h-6 md:h-7' },
  { k: 'cmiea', h: 'h-8 md:h-9' },
  { k: 'radx', h: 'h-5 md:h-6' },
  { k: 'rizzaclassic', h: 'h-7 md:h-8' },
  { k: 'glg', h: 'h-9 md:h-10' },
] as const

/* ── 5-language copy, real facts only, no diacritics ── */
const T = {
  en: {
    hero: {
      headline: 'We build the site\nWe take it to the *top.*\nWe automate the rest',
      sub: 'Custom-coded websites that rank on page one of Google, Meta & Google Ads campaigns, and booking, invoicing and accounting systems that free your business from paperwork.',
      cta: 'Start a project',
      note: 'delivered in 1–4 weeks · reply within 24h',
    },
    badges: ['Hand-written code, zero templates', '+300% avg. organic traffic', '10+ custom systems live', 'DR 50 · 2.6K backlinks', 'Delivered in 1-4 weeks', '5 languages, one team'],
    badgeEm: 'Custom-coded websites from 350 EUR, start to finish',
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
      attribution: 'Davo.md, a landings.md project · real Ahrefs data',
    },
    stats: {
      cells: [
        { v: '24h', l: 'response time' },
        { v: '300%', l: 'average traffic increase' },
        { v: '10+', l: 'custom systems in production' },
        { v: 'DR 50', l: 'davo.md · 2.6K backlinks' },
      ],
      offerLabel: 'The offer',
      offerTitle: 'from 350 EUR',
      offerSub: 'Custom-coded website, design, build, launch.',
      offerNote: 'Delivered in 1-4 weeks.',
      floats: ['SITE', 'SEO', 'ADS', 'SYSTEMS'],
    },
    about: {
      heading: 'Solutions, not just *websites.*',
      headingSub: 'Websites, SEO, ads and business systems, one team, start to finish.',
      aboutTitle: 'About the agency',
      aboutBody: 'landings.md is a web agency in Chisinau. We hand-code every website, no themes, no builders, then rank it on Google and automate the business behind it.',
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
    pill: { l1: 'Have a project in mind?', l2: 'Get a quote, from 350 EUR' },
  },
  ro: {
    hero: {
      headline: 'Construim site-ul\nIl ducem in *top.*\nAutomatizam restul',
      sub: 'Site-uri scrise manual care apar pe prima pagina Google, campanii Meta & Google Ads si sisteme de rezervari, facturare si contabilitate care iti scapa afacerea de foi.',
      cta: 'Incepe un proiect',
      note: 'livrat in 1–4 saptamani · raspuns in 24h',
    },
    badges: ['Cod scris manual, zero template-uri', '+300% trafic organic in medie', '10+ sisteme custom in productie', 'DR 50 · 2.6K backlinks', 'Livrare in 1-4 saptamani', '5 limbi, o singura echipa'],
    badgeEm: 'Site-uri custom-coded de la 350 EUR, de la A la Z',
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
      attribution: 'Davo.md, proiect landings.md · date reale din Ahrefs',
    },
    stats: {
      cells: [
        { v: '24h', l: 'timp de raspuns' },
        { v: '300%', l: 'crestere medie a traficului' },
        { v: '10+', l: 'sisteme custom in productie' },
        { v: 'DR 50', l: 'davo.md · 2.6K backlinks' },
      ],
      offerLabel: 'Oferta',
      offerTitle: 'de la 350 EUR',
      offerSub: 'Site custom-coded, design, constructie, lansare.',
      offerNote: 'Livrat in 1-4 saptamani.',
      floats: ['SITE', 'SEO', 'ADS', 'SISTEME'],
    },
    about: {
      heading: 'Solutii, nu doar *site-uri.*',
      headingSub: 'Site-uri, SEO, ads si sisteme de business, o singura echipa, de la A la Z.',
      aboutTitle: 'Despre agentie',
      aboutBody: 'landings.md e o agentie web din Chisinau. Scriem fiecare site manual, fara teme, fara constructori, apoi il ducem sus pe Google si automatizam business-ul din spate.',
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
    pill: { l1: 'Ai un proiect in minte?', l2: 'Cere oferta, de la 350 EUR' },
  },
  de: {
    hero: {
      headline: 'Wir bauen die Website\nWir bringen sie nach *oben.*\nWir automatisieren den Rest',
      sub: 'Handgeschriebene Websites auf Seite 1 bei Google, Meta & Google Ads Kampagnen und Systeme fur Buchungen, Rechnungen und Buchhaltung, die Ihr Unternehmen vom Papierkram befreien.',
      cta: 'Projekt starten',
      note: 'Lieferung in 1–4 Wochen · Antwort in 24h',
    },
    badges: ['Handgeschriebener Code, null Templates', '+300% organischer Traffic im Schnitt', '10+ Systeme im Einsatz', 'DR 50 · 2.6K Backlinks', 'Lieferung in 1-4 Wochen', '5 Sprachen, ein Team'],
    badgeEm: 'Custom-coded Websites ab 350 EUR, von A bis Z',
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
      attribution: 'Davo.md, ein landings.md Projekt · echte Ahrefs-Daten',
    },
    stats: {
      cells: [
        { v: '24h', l: 'Antwortzeit' },
        { v: '300%', l: 'durchschnittliche Traffic-Steigerung' },
        { v: '10+', l: 'individuelle Systeme im Einsatz' },
        { v: 'DR 50', l: 'davo.md · 2.6K Backlinks' },
      ],
      offerLabel: 'Das Angebot',
      offerTitle: 'ab 350 EUR',
      offerSub: 'Custom-coded Website, Design, Bau, Launch.',
      offerNote: 'Lieferung in 1-4 Wochen.',
      floats: ['SITE', 'SEO', 'ADS', 'SYSTEME'],
    },
    about: {
      heading: 'Losungen, nicht nur *Websites.*',
      headingSub: 'Websites, SEO, Ads und Business-Systeme, ein Team, von A bis Z.',
      aboutTitle: 'Uber die Agentur',
      aboutBody: 'landings.md ist eine Webagentur in Chisinau. Wir schreiben jede Website von Hand, keine Themes, keine Baukasten, bringen sie bei Google nach oben und automatisieren das Geschaft dahinter.',
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
    pill: { l1: 'Ein Projekt im Kopf?', l2: 'Angebot anfordern, ab 350 EUR' },
  },
  fr: {
    hero: {
      headline: 'On construit le site\nOn le fait *monter.*\nOn automatise le reste',
      sub: 'Des sites codes sur mesure qui se classent en premiere page de Google, des campagnes Meta & Google Ads, et des systemes de reservation, facturation et comptabilite qui liberent votre entreprise de la paperasse.',
      cta: 'Demarrer un projet',
      note: 'livre en 1–4 semaines · reponse en 24h',
    },
    badges: ['Code ecrit main, zero templates', '+300% de trafic organique en moyenne', '10+ systemes en production', 'DR 50 · 2.6K backlinks', 'Livraison en 1-4 semaines', '5 langues, une equipe'],
    badgeEm: 'Sites codes sur mesure des 350 EUR, de A a Z',
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
        radx:          { caption: 'Refroidissement · Site',     line: 'Page 1 sur Google, refroidissement industriel' },
        eliteprotocol: { caption: 'Etiquette · Site premium',   line: 'Marque premium, au pixel pres' },
        rizzaclassic:  { caption: 'Restauration · Italie',      line: 'Classiques italiennes, clients internationaux' },
        autohuse:      { caption: 'Housses sur mesure',         line: 'Housses sur mesure, commandees en ligne' },
      },
    },
    proof: {
      label: 'Resultats reels',
      quote: 'davo.md est *#1 sur Google* pour le transport Moldavie–Europe : *DR 50*, 2.6K backlinks et *+300% de trafic organique* apres la refonte.',
      attribution: 'Davo.md, un projet landings.md · donnees reelles Ahrefs',
    },
    stats: {
      cells: [
        { v: '24h', l: 'temps de reponse' },
        { v: '300%', l: 'augmentation moyenne du trafic' },
        { v: '10+', l: 'systemes sur mesure en production' },
        { v: 'DR 50', l: 'davo.md · 2.6K backlinks' },
      ],
      offerLabel: "L'offre",
      offerTitle: 'des 350 EUR',
      offerSub: 'Site code sur mesure, design, construction, lancement.',
      offerNote: 'Livre en 1-4 semaines.',
      floats: ['SITE', 'SEO', 'ADS', 'SYSTEMES'],
    },
    about: {
      heading: 'Des solutions, pas seulement des *sites.*',
      headingSub: 'Sites, SEO, ads et systemes business, une seule equipe, de A a Z.',
      aboutTitle: "L'agence",
      aboutBody: 'landings.md est une agence web a Chisinau. Chaque site est code a la main, pas de themes, pas de builders, puis classe sur Google, avec le business automatise derriere.',
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
    pill: { l1: 'Un projet en tete ?', l2: 'Demandez un devis, des 350 EUR' },
  },
  es: {
    hero: {
      headline: 'Creamos tu web\nLa llevamos *arriba.*\nAutomatizamos el resto',
      sub: 'Webs a medida que aparecen en la primera pagina de Google, campanas de Meta & Google Ads, y sistemas de reservas, facturacion y contabilidad que liberan tu negocio del papeleo.',
      cta: 'Iniciar proyecto',
      note: 'entregado en 1–4 semanas · respuesta en 24h',
    },
    badges: ['Codigo a mano, cero plantillas', '+300% de trafico organico de media', '10+ sistemas en produccion', 'DR 50 · 2.6K backlinks', 'Entrega en 1-4 semanas', '5 idiomas, un equipo'],
    badgeEm: 'Webs a medida desde 350 EUR, de principio a fin',
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
      attribution: 'Davo.md, un proyecto de landings.md · datos reales de Ahrefs',
    },
    stats: {
      cells: [
        { v: '24h', l: 'tiempo de respuesta' },
        { v: '300%', l: 'aumento medio del trafico' },
        { v: '10+', l: 'sistemas a medida en produccion' },
        { v: 'DR 50', l: 'davo.md · 2.6K backlinks' },
      ],
      offerLabel: 'La oferta',
      offerTitle: 'desde 350 EUR',
      offerSub: 'Web a medida, diseno, construccion, lanzamiento.',
      offerNote: 'Entregado en 1-4 semanas.',
      floats: ['SITE', 'SEO', 'ADS', 'SISTEMAS'],
    },
    about: {
      heading: 'Soluciones, no solo *webs.*',
      headingSub: 'Webs, SEO, ads y sistemas de negocio, un solo equipo, de principio a fin.',
      aboutTitle: 'La agencia',
      aboutBody: 'landings.md es una agencia web en Chisinau. Codificamos cada web a mano, sin plantillas, sin builders, la subimos en Google y automatizamos el negocio detras.',
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
    pill: { l1: 'Un proyecto en mente?', l2: 'Pide presupuesto, desde 350 EUR' },
  },
}

/* ──────────────────────────────────────────────────────────────── */

export default function Home() {
  const { language } = useLanguage()
  const t = T[language as keyof typeof T] ?? T.en

  /* 3D tilt for the project stage: the card group leans toward the cursor */
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const onStageMove = (e: React.MouseEvent) => {
    const el = stageRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: -py * 7, ry: px * 9 })
  }
  const onStageLeave = () => setTilt({ rx: 0, ry: 0 })

  return (
    <main className="flex min-h-[100svh] flex-col md:h-[100svh] md:overflow-hidden" style={{ background: '#0d0d0d' }}>
      <SiteNav contactHref="mailto:contact@landings.md" />

      <div className="nv-container grid w-full flex-1 grid-cols-2 gap-3 pb-3 pt-2 md:min-h-0 md:grid-cols-12 md:grid-rows-[repeat(12,minmax(0,1fr))]">

        {/* ── HERO CELL — the loved ribbed graphic lives here ── */}
        <Reveal className="col-span-2 md:col-span-8 md:row-span-7 md:min-h-0">
          <div className="nv-edge h-full">
            <div className="nv-edge-inner relative flex h-full flex-col justify-center overflow-hidden p-7 md:p-10">
              {/* arch glow behind the ribs */}
              <div
                aria-hidden
                className="absolute left-1/2 top-full h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full"
                style={{
                  background: 'conic-gradient(from 30deg, #FF9E7A, #f2d06f, #d23b33, #7a4df0, #FF9E7A)',
                  filter: 'saturate(1.1) blur(90px)',
                  opacity: 0.5,
                }}
              />
              <div
                aria-hidden
                className="absolute left-1/2 bottom-0 h-40 w-[70%] -translate-x-1/2 translate-y-1/2 rounded-full"
                style={{ background: '#fff', filter: 'blur(110px)', opacity: 0.22 }}
              />
              {/* the ribbed sheet */}
              <div className="ribbed absolute inset-0" aria-hidden style={{ borderTop: 'none' }} />

              <div className="relative z-[1]">
                <span className="chip chip--em">
                  <span className="chip-inner !py-2 !text-[13px]">
                    <span className="dot-lime" />
                    {t.badgeEm}
                  </span>
                </span>
                <h1
                  className="mt-5 font-bold"
                  style={{ fontSize: 'clamp(2.1rem, 3.6vw, 3.4rem)', lineHeight: 1.01, letterSpacing: '-0.05em' }}
                >
                  <Marked text={t.hero.headline} />
                </h1>
                <p className="mt-4 max-w-[560px] text-[0.9375rem] font-medium md:text-[1.0625rem]" style={{ color: '#b8b8b9', lineHeight: 1.35 }}>
                  {t.hero.sub}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a href="mailto:contact@landings.md" className="btn-metal">
                    {t.hero.cta}
                    <span className="nv-arr" aria-hidden>&rarr;</span>
                  </a>
                  <span className="text-[0.8125rem] font-medium" style={{ color: '#909099' }}>{t.hero.note}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── DR 50 ring ── */}
        <Reveal delay={0.05} className="col-span-1 md:col-span-4 md:row-span-3 md:min-h-0">
          <div className="nv-edge nv-edge--ring nv-cell h-full">
            <div className="nv-edge-inner flex h-full items-center gap-4 p-5 md:p-6">
              <svg width="58" height="58" viewBox="0 0 96 96" aria-hidden className="shrink-0">
                <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle
                  cx="48" cy="48" r="42" fill="none"
                  stroke="#FF9E7A" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray="264" strokeDashoffset="132"
                  transform="rotate(-90 48 48)"
                  style={{ animation: 'nv-ring-fill 0.6s ease-out both' }}
                />
              </svg>
              <div className="min-w-0">
                <span className="block font-medium" style={{ fontSize: 'clamp(1.6rem, 2vw, 2.1rem)', letterSpacing: '-0.04em', lineHeight: 1, color: '#FF9E7A' }}>{t.stats.cells[3].v}</span>
                <span className="mt-1 block truncate text-[0.8125rem] font-medium" style={{ color: '#909099' }}>{t.stats.cells[3].l}</span>
                <span className="nv-cell-detail mt-1 block text-[11px] font-medium" style={{ color: '#FF9E7A' }}>Ahrefs</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 300% bars ── */}
        <Reveal delay={0.08} className="col-span-1 md:col-span-4 md:row-span-2 md:min-h-0">
          <div className="nv-edge nv-edge--ring nv-cell h-full">
            <div className="nv-edge-inner flex h-full items-center justify-between gap-4 p-5 md:p-6">
              <div className="min-w-0">
                <span className="block font-medium" style={{ fontSize: 'clamp(1.5rem, 1.8vw, 1.9rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.stats.cells[1].v}</span>
                <span className="mt-1 block text-[0.75rem] font-medium leading-tight" style={{ color: '#909099' }}>{t.stats.cells[1].l}</span>
              </div>
              <div className="flex h-10 w-24 shrink-0 items-end gap-1" aria-hidden>
                {[30, 44, 58, 74, 100].map((h, i) => (
                  <span key={i} className="nv-bar flex-1 rounded-sm" style={{ height: `${h}%`, ['--i' as string]: i, background: i === 4 ? '#FF9E7A' : 'rgba(255,255,255,0.14)' }} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 10+ systems nodes ── */}
        <Reveal delay={0.11} className="col-span-1 md:col-span-4 md:row-span-2 md:min-h-0">
          <div className="nv-edge nv-edge--ring nv-cell h-full">
            <div className="nv-edge-inner flex h-full items-center justify-between gap-4 p-5 md:p-6">
              <div className="min-w-0">
                <span className="block font-medium" style={{ fontSize: 'clamp(1.5rem, 1.8vw, 1.9rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.stats.cells[2].v}</span>
                <span className="mt-1 block text-[0.75rem] font-medium leading-tight" style={{ color: '#909099' }}>{t.stats.cells[2].l}</span>
              </div>
              <div className="flex w-24 shrink-0 items-center" aria-hidden>
                <span className="nv-node h-2 w-2 rounded-full" style={{ background: '#FF9E7A' }} />
                <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.14)' }} />
                <span className="nv-node h-2 w-2 rounded-full" style={{ background: '#FF9E7A' }} />
                <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.14)' }} />
                <span className="nv-node h-2 w-2 rounded-full" style={{ background: '#FF9E7A' }} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── PROJECTS — depth stage with floating metal-bezel cards ── */}
        <Reveal delay={0.14} className="col-span-2 md:col-span-4 md:row-span-4 md:min-h-0">
          <div className="nv-edge nv-edge--ring h-full">
            <div
              ref={stageRef}
              onMouseMove={onStageMove}
              onMouseLeave={onStageLeave}
              className="nv-edge-inner nv-stage flex h-full flex-col p-5 md:p-6"
            >
              <div className="relative z-[1] flex items-baseline justify-between gap-3">
                <h2 className="font-semibold" style={{ fontSize: '1.125rem', letterSpacing: '-0.03em' }}>
                  <Marked text={t.work.heading} />
                </h2>
                <a href="/portfolio" className="shrink-0 text-[0.8125rem] font-medium transition-colors duration-150 hover:!text-white" style={{ color: '#FF9E7A' }}>
                  {t.work.view} &rarr;
                </a>
              </div>
              <div
                className="relative z-[1] mt-4 grid min-h-0 flex-1 grid-cols-3 items-stretch gap-4 px-1 pb-3"
                style={{
                  transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: 'transform 0.15s ease-out',
                  transformStyle: 'preserve-3d',
                }}
              >
                {PROJECTS_META.slice(0, 3).map((p, i) => (
                  <a
                    key={p.key}
                    href={`https://${p.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`nv-bob-${i + 1}`}
                    style={{ transform: `translateZ(${(i === 1 ? 26 : 12)}px)` }}
                  >
                    <div className="nv-float-card h-full min-h-[110px]">
                      <div className="nv-float-card-img">
                        <Image src={p.shot} alt={p.name} fill sizes="160px" className="object-cover object-top" />
                        <span
                          className="absolute inset-x-0 bottom-0 px-2 pb-2 pt-6 text-center text-[10px] font-medium text-white"
                          style={{ background: 'linear-gradient(0deg, rgba(6,6,6,0.92), transparent)' }}
                        >
                          {p.name}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── OFERTA ── */}
        <Reveal delay={0.17} className="col-span-1 md:col-span-4 md:row-span-4 md:min-h-0">
          <div className="nv-edge nv-edge--alt nv-cell h-full">
            <div className="nv-edge-inner flex h-full flex-col justify-center p-5 text-center md:p-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>{t.stats.offerLabel}</span>
              <span className="mt-2 font-semibold" style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2.2rem)', letterSpacing: '-0.04em', lineHeight: 1, color: '#FF9E7A' }}>
                {t.stats.offerTitle}
              </span>
              <p className="mx-auto mt-2 max-w-[240px] text-[0.8125rem] font-medium" style={{ color: '#b8b8b9' }}>{t.stats.offerSub}</p>
              <p className="mt-1 text-[0.75rem] font-medium" style={{ color: '#909099' }}>{t.stats.offerNote}</p>
              <a href="mailto:contact@landings.md" className="btn-metal btn-metal--sm mx-auto mt-4">
                {t.hero.cta}
                <span className="nv-arr" aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* ── CONTACT ── */}
        <Reveal delay={0.2} className="col-span-1 md:col-span-4 md:row-span-4 md:min-h-0">
          <div className="nv-edge nv-edge--ring nv-cell h-full">
            <div className="nv-edge-inner flex h-full flex-col justify-center gap-2.5 p-5 md:p-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>{t.contact.label}</span>
              <a href="mailto:contact@landings.md" className="truncate text-[0.9375rem] font-medium text-white transition-colors duration-150 hover:!text-[#FF9E7A]">
                contact@landings.md
              </a>
              <a href="tel:+37368327082" className="text-[0.9375rem] font-medium transition-colors duration-150 hover:!text-[#FF9E7A]" style={{ color: '#b8b8b9' }}>
                +373 683 27 082
              </a>
              <p className="mt-1 inline-flex items-center gap-2 text-[0.75rem] font-medium" style={{ color: '#909099' }}>
                <span className="dot-lime" />
                {t.about.avail}
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── LOGO STRIP ── */}
        <Reveal delay={0.23} className="col-span-2 md:col-span-8 md:row-span-1 md:min-h-0">
          <div className="nv-edge h-full">
            <div className="nv-edge-inner flex h-full flex-wrap items-center justify-around gap-x-6 gap-y-2 px-5 py-2.5">
              {LOGO_ROW.map((l) => (
                <span key={l.k} className="nv-logo">
                  <Image src={`/images/logos/${l.k}.png`} alt={l.k} width={110} height={30} className="h-4 w-auto md:h-5" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── FOOTER MICRO ── */}
        <Reveal delay={0.26} className="col-span-2 md:col-span-4 md:row-span-1 md:min-h-0">
          <div className="nv-edge h-full">
            <div className="nv-edge-inner flex h-full items-center justify-between gap-3 px-5 py-2.5">
              <span className="truncate text-[11px] font-medium" style={{ color: '#909099' }}>{t.footer.copy}</span>
              <a href="https://instagram.com/landings.md" target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium transition-colors duration-150 hover:!text-white" style={{ color: '#a4a4a4' }}>
                Instagram
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
