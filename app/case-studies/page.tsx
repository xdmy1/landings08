"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { SiteNav } from '@/components/ui/site-nav'

/* ────────────────────────────────────────────────────────────────
   Case studies, navarro-language skin, landings.md content only.
   Ground #0d0d0d · coral #FF9E7A at word/ring/glow scale · Geist ·
   ribbed page header · arch media · gradient-hairline cells ·
   blur-up reveals that replay, 0.45s. Hovers 0.15-0.2s.
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

/* Plain letter-spaced caps label, no dot. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
      {children}
    </span>
  )
}

/* Lime the final word(s) of a heading, h1/h2 b renders coral via globals.
   Copy stays verbatim; only the rendering adds the accent. */
function LimeTail({ text }: { text: string }) {
  const words = text.split(' ')
  let i = words.length - 1
  while (i > 0 && !/[a-z0-9]/i.test(words[i])) i--
  if (i === 0) return <b>{text}</b>
  return (
    <>
      {words.slice(0, i).join(' ')} <b>{words.slice(i).join(' ')}</b>
    </>
  )
}

/* Big claim line: coral <i> on the leading clause (blockquote i is coral).
   Leads with the first sentence; falls back to the first comma clause. */
function ClaimLime({ text }: { text: string }) {
  const m = text.match(/^(.+?[.!?])\s+\S[\s\S]*$/)
  let lead: string
  if (m) {
    lead = m[1]
  } else {
    const ci = text.indexOf(',')
    lead = ci > 0 ? text.slice(0, ci) : text
  }
  return (
    <>
      <i>{lead}</i>
      {text.slice(lead.length)}
    </>
  )
}

type Stat = { value: number, suffix: string, label: string }
type CaseStudy = {
  tag: string
  title: string
  subtitle: string
  challenge: string
  approach: string
  results: string
  stats: Stat[]
  captions?: string[]
}
type CaseKey = 'davo' | 'interbus' | 'glg' | 'droppack'

const caseConfigs: { key: CaseKey, num: string, domain: string, url?: string, image: string, tall?: string, alt?: string, evidence?: string[] }[] = [
  {
    key: 'davo', num: '01', domain: 'davo.md', url: 'https://davo.md',
    image: '/images/shot-davo.jpg',
    tall: '/images/tall-davo.jpg',
    alt: 'Davo.md, international transport platform with seat-selection bookings, SEO and Meta Ads by landings.md',
    evidence: ['/images/davo-ga.png', '/images/davo-ga2.png', '/images/davo-ahrefs.png'],
  },
  {
    key: 'interbus', num: '02', domain: 'inter-bus.md', url: 'https://inter-bus.md',
    image: '/images/shot-interbus.jpg',
    tall: '/images/tall-interbus.jpg',
    alt: 'Inter-Bus, international parts store with automated invoicing, stock and accounting by landings.md',
  },
  {
    key: 'glg', num: '03', domain: 'scoalaautoglg.com', url: 'https://scoalaautoglg.com',
    image: '/images/shot-glg.jpg',
    tall: '/images/tall-glg.jpg',
  },
  {
    key: 'droppack', num: '04', domain: 'droppack.vercel.app', url: 'https://droppack.vercel.app',
    image: '/images/shot-droppack.jpg',
    alt: 'DropPack, parcel logistics app for Moldova–Europe transport companies, built by landings.md',
  },
]

export default function CaseStudiesPage() {
  const { language } = useLanguage()

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Start a project" },
      hero: { label: "CASE STUDIES", headline: "Real results.\nReal businesses.", sub: "We don't just build websites. We build growth engines and systems that work for you. Here's proof." },
      labels: { challenge: "THE CHALLENGE", approach: "OUR APPROACH", results: "THE RESULTS", visit: "Visit" },
      davo: {
        tag: "TRANSPORT · SITE + SYSTEM + SEO + ADS",
        title: "Davo.md",
        subtitle: "One partner for everything: website, seat-selection bookings, operator panel, SEO and Meta Ads.",
        challenge: "Bookings were taken over the phone and written into notebooks. Passengers couldn't book online or choose their seat, and in a market full of carriers the brand was hard to find on Google.",
        approach: "We built the website and the booking system with a seat map, passengers pick their seat like on a flight. Operators got their own reservation panel. Then we pushed everything up: technical SEO, backlinks and Meta Ads running continuously.",
        results: "Bookings flow in online 24/7, operators work in a single panel, and organic traffic grows week after week.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Backlinks built" },
          { value: 348, suffix: "", label: "Referring domains" },
          { value: 30, suffix: "%", label: "Weekly organic growth" },
        ],
        captions: [
          "Google Analytics: active users +15%, events +48.6%, last 7 days",
          "Sessions by channel: organic +30.4%, direct +63%, SEO and backlinks at work",
          "Ahrefs: Domain Rating 50 · 2.6K backlinks · 348 referring domains",
        ],
      } as CaseStudy,
      interbus: {
        tag: "AUTO PARTS · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "From paper and Excel to an ERP that runs itself, plus an international online store.",
        challenge: "Orders, invoices and stock lived on paper and in Excel. Real profit was only known at the end of the month, and sales depended on phone and email.",
        approach: "We built the international online store and the back office behind it: automated invoicing, stock that updates with every order, profit calculated per product and accounting generated automatically. Everything in one panel.",
        results: "Zero paper. Invoices issue themselves, stock is known to the second, and orders come in from over 50 countries.",
        stats: [
          { value: 100, suffix: "%", label: "Invoices generated automatically" },
          { value: 0, suffix: "", label: "Sheets of paper" },
          { value: 50, suffix: "", label: "Countries served" },
          { value: 24, suffix: "/7", label: "Online orders" },
        ],
      } as CaseStudy,
      glg: {
        tag: "DRIVING SCHOOL · SCHEDULING SYSTEM",
        title: "GLG Driving School",
        subtitle: "Practical lesson scheduling, moved from the notebook into an app.",
        challenge: "Practical lessons were booked through phone calls and a notebook at the front desk. Overlapping slots, lost hours, students forgetting lessons and instructors not knowing their day.",
        approach: "We built the scheduling system: students pick their own free slots, instructors see their calendar in real time, and the office has the full picture, who, when, with whom. Automatic reminders before every lesson.",
        results: "The schedule fills itself, the phone rings less, and lessons never overlap anymore.",
        stats: [
          { value: 100, suffix: "%", label: "Bookings online" },
          { value: 0, suffix: "", label: "Schedule overlaps" },
          { value: 3, suffix: "", label: "Roles: student, instructor, admin" },
          { value: 24, suffix: "/7", label: "Booking available" },
        ],
      } as CaseStudy,
      droppack: {
        tag: "OUR OWN PRODUCT · PARCEL LOGISTICS",
        title: "DropPack",
        subtitle: "Our product for Moldova–Europe parcel carriers. From the paper sheet to the app.",
        challenge: "Parcel carriers run on sheets and notebooks: senders written by hand, drivers called one by one, clients phoning to ask where their parcel is.",
        approach: "We built DropPack as a product: office, drivers and clients on the same page. Parcels are registered in seconds, statuses update live, in office, loaded, in transit, delivering, delivered, and the whole run exports to Excel in one click.",
        results: "One system for the whole run, office, drivers, clients. No sheets, no chaos.",
        stats: [
          { value: 5, suffix: "", label: "Live statuses per parcel" },
          { value: 2, suffix: "", label: "Languages: RO & RU" },
          { value: 1, suffix: "", label: "Click to export to Excel" },
          { value: 0, suffix: "", label: "Sheets of paper" },
        ],
      } as CaseStudy,
      cta: { headline: "Want results like these?", sub: "Tell us about your business. We'll show you what's possible.", button: "Start a project" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldova" },
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Incepe un proiect" },
      hero: { label: "STUDII DE CAZ", headline: "Rezultate reale.\nAfaceri reale.", sub: "Nu construim doar website-uri. Construim motoare de crestere si sisteme care lucreaza pentru tine. Iata dovada." },
      labels: { challenge: "PROVOCAREA", approach: "ABORDAREA NOASTRA", results: "REZULTATELE", visit: "Vezi" },
      davo: {
        tag: "TRANSPORT · SITE + SISTEM + SEO + ADS",
        title: "Davo.md",
        subtitle: "Un singur partener pentru tot: site, rezervari cu alegerea locului, panou operatori, SEO si Meta Ads.",
        challenge: "Rezervarile se faceau la telefon si se notau in caiete. Pasagerii nu puteau rezerva online si nu isi puteau alege locul, iar intr-o piata plina de transportatori, brandul se gasea greu pe Google.",
        approach: "Am construit site-ul si sistemul de rezervari cu harta locurilor, pasagerul isi alege locul ca la avion. Operatorii au primit panoul lor de rezervari. Apoi am dus totul sus: SEO tehnic, backlinkuri si campanii Meta care ruleaza continuu.",
        results: "Rezervarile curg online 24/7, operatorii lucreaza intr-un singur panou, iar traficul organic creste saptamana de saptamana.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Backlinkuri construite" },
          { value: 348, suffix: "", label: "Domenii de referinta" },
          { value: 30, suffix: "%", label: "Crestere organica saptamanala" },
        ],
        captions: [
          "Google Analytics: utilizatori activi +15%, evenimente +48.6%, ultimele 7 zile",
          "Sesiuni pe canale: organic +30.4%, direct +63%, SEO si backlinkurile lucreaza",
          "Ahrefs: Domain Rating 50 · 2.6K backlinkuri · 348 domenii de referinta",
        ],
      } as CaseStudy,
      interbus: {
        tag: "PIESE AUTO · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "De la foi si Excel la un ERP care merge singur, plus magazin online international.",
        challenge: "Comenzile, facturile si stocul se tineau pe hartie si in Excel. Profitul real se afla abia la sfarsit de luna, iar vanzarile depindeau de telefon si e-mail.",
        approach: "Am construit magazinul online international si panoul din spate: facturare automata, stoc actualizat la fiecare comanda, profit calculat pe produs si contabilitate generata automat. Totul intr-un singur panou.",
        results: "Zero foi. Facturile se emit singure, stocul se stie la secunda, iar comenzile vin din peste 50 de tari.",
        stats: [
          { value: 100, suffix: "%", label: "Facturi generate automat" },
          { value: 0, suffix: "", label: "Foi de hartie" },
          { value: 50, suffix: "", label: "Tari deservite" },
          { value: 24, suffix: "/7", label: "Comenzi online" },
        ],
      } as CaseStudy,
      glg: {
        tag: "SCOALA AUTO · SISTEM PROGRAMARI",
        title: "Scoala Auto GLG",
        subtitle: "Programarile la lectii practice, mutate din caiet in aplicatie.",
        challenge: "Programarile la lectiile practice se faceau prin apeluri si un caiet la receptie. Ore suprapuse, timp pierdut, elevi care uitau de lectii si instructori care nu isi stiau ziua.",
        approach: "Am construit sistemul de programari: elevii isi aleg singuri orele libere, instructorii isi vad orarul in timp real, iar administratia are evidenta completa, cine, cand, cu cine. Notificari automate inainte de fiecare lectie.",
        results: "Orarul se umple singur, telefonul suna mai rar, iar lectiile nu se mai suprapun niciodata.",
        stats: [
          { value: 100, suffix: "%", label: "Programari online" },
          { value: 0, suffix: "", label: "Suprapuneri de orar" },
          { value: 3, suffix: "", label: "Roluri: elev, instructor, admin" },
          { value: 24, suffix: "/7", label: "Programare disponibila" },
        ],
      } as CaseStudy,
      droppack: {
        tag: "PRODUS PROPRIU · LOGISTICA COLETE",
        title: "DropPack",
        subtitle: "Produsul nostru pentru transportatorii de colete Moldova–Europa. De la foaie la aplicatie.",
        challenge: "Firmele de transport colete lucreaza pe foi si caiete: expeditori notati de mana, soferi sunati pe rand, clienti care intreaba la telefon unde le e coletul.",
        approach: "Am construit DropPack ca produs: biroul, soferii si clientii pe aceeasi pagina. Coletele se inregistreaza in secunde, statusurile se actualizeaza live, in birou, incarcat, in tranzit, la livrare, livrat, iar toata cursa se exporta in Excel cu un click.",
        results: "Un singur sistem pentru toata cursa, birou, soferi, clienti. Fara foi, fara haos.",
        stats: [
          { value: 5, suffix: "", label: "Statusuri live per colet" },
          { value: 2, suffix: "", label: "Limbi: RO & RU" },
          { value: 1, suffix: "", label: "Click pentru export Excel" },
          { value: 0, suffix: "", label: "Foi de hartie" },
        ],
      } as CaseStudy,
      cta: { headline: "Vrei rezultate ca acestea?", sub: "Spune-ne despre afacerea ta. Iti aratam ce e posibil.", button: "Incepe un proiect" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldova" },
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Projekt starten" },
      hero: { label: "FALLSTUDIEN", headline: "Echte Ergebnisse.\nEchte Unternehmen.", sub: "Wir bauen nicht nur Websites. Wir bauen Wachstumsmotoren und Systeme, die fur Sie arbeiten. Hier der Beweis." },
      labels: { challenge: "DIE HERAUSFORDERUNG", approach: "UNSER ANSATZ", results: "DIE ERGEBNISSE", visit: "Ansehen" },
      davo: {
        tag: "TRANSPORT · SITE + SYSTEM + SEO + ADS",
        title: "Davo.md",
        subtitle: "Ein Partner fur alles: Website, Buchungen mit Sitzplatzwahl, Operator-Panel, SEO und Meta Ads.",
        challenge: "Buchungen liefen ubers Telefon und wurden in Hefte geschrieben. Passagiere konnten weder online buchen noch ihren Sitz wahlen, und bei Google war die Marke kaum zu finden.",
        approach: "Wir haben die Website und das Buchungssystem mit Sitzplan gebaut, Passagiere wahlen ihren Platz wie im Flugzeug. Operatoren bekamen ihr eigenes Panel. Dann ging alles nach oben: technisches SEO, Backlinks und laufende Meta-Kampagnen.",
        results: "Buchungen kommen online rund um die Uhr, Operatoren arbeiten in einem Panel, und der organische Traffic wachst Woche fur Woche.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Aufgebaute Backlinks" },
          { value: 348, suffix: "", label: "Verweisende Domains" },
          { value: 30, suffix: "%", label: "Wochentliches organisches Wachstum" },
        ],
        captions: [
          "Google Analytics: aktive Nutzer +15%, Events +48.6%, letzte 7 Tage",
          "Sitzungen nach Kanal: organisch +30.4%, direkt +63%, SEO und Backlinks wirken",
          "Ahrefs: Domain Rating 50 · 2.6K Backlinks · 348 verweisende Domains",
        ],
      } as CaseStudy,
      interbus: {
        tag: "AUTOTEILE · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "Von Papier und Excel zu einem ERP, das von selbst lauft, plus internationaler Online-Shop.",
        challenge: "Bestellungen, Rechnungen und Lager lebten auf Papier und in Excel. Der echte Gewinn war erst am Monatsende bekannt, Verkaufe hingen an Telefon und E-Mail.",
        approach: "Wir haben den internationalen Shop und das Backoffice dahinter gebaut: automatische Rechnungen, Lager, das sich mit jeder Bestellung aktualisiert, Gewinn pro Produkt und automatisch erzeugte Buchhaltung.",
        results: "Null Papier. Rechnungen erstellen sich selbst, der Lagerbestand ist sekundengenau bekannt, Bestellungen kommen aus uber 50 Landern.",
        stats: [
          { value: 100, suffix: "%", label: "Automatische Rechnungen" },
          { value: 0, suffix: "", label: "Blatter Papier" },
          { value: 50, suffix: "", label: "Belieferte Lander" },
          { value: 24, suffix: "/7", label: "Online-Bestellungen" },
        ],
      } as CaseStudy,
      glg: {
        tag: "FAHRSCHULE · TERMINSYSTEM",
        title: "Fahrschule GLG",
        subtitle: "Fahrstunden-Planung, vom Heft in die App verlegt.",
        challenge: "Fahrstunden wurden uber Anrufe und ein Heft am Empfang gebucht. Uberschneidungen, verlorene Stunden, Schuler, die Stunden vergassen, und Fahrlehrer, die ihren Tag nicht kannten.",
        approach: "Wir haben das Terminsystem gebaut: Schuler wahlen selbst freie Zeiten, Fahrlehrer sehen ihren Kalender in Echtzeit, und das Buro hat den vollen Uberblick, wer, wann, mit wem. Automatische Erinnerungen vor jeder Stunde.",
        results: "Der Stundenplan fullt sich von selbst, das Telefon klingelt seltener, und Stunden uberschneiden sich nie wieder.",
        stats: [
          { value: 100, suffix: "%", label: "Buchungen online" },
          { value: 0, suffix: "", label: "Terminuberschneidungen" },
          { value: 3, suffix: "", label: "Rollen: Schuler, Fahrlehrer, Admin" },
          { value: 24, suffix: "/7", label: "Buchung verfugbar" },
        ],
      } as CaseStudy,
      droppack: {
        tag: "EIGENES PRODUKT · PAKETLOGISTIK",
        title: "DropPack",
        subtitle: "Unser Produkt fur Pakettransporteure Moldawien–Europa. Vom Papierblatt zur App.",
        challenge: "Pakettransporteure arbeiten auf Blattern und in Heften: Absender von Hand notiert, Fahrer einzeln angerufen, Kunden, die telefonisch fragen, wo ihr Paket ist.",
        approach: "Wir haben DropPack als Produkt gebaut: Buro, Fahrer und Kunden auf derselben Seite. Pakete werden in Sekunden registriert, Status aktualisieren sich live, im Buro, geladen, im Transit, in Zustellung, geliefert, und die ganze Fahrt exportiert sich mit einem Klick nach Excel.",
        results: "Ein System fur die ganze Fahrt, Buro, Fahrer, Kunden. Keine Blatter, kein Chaos.",
        stats: [
          { value: 5, suffix: "", label: "Live-Status pro Paket" },
          { value: 2, suffix: "", label: "Sprachen: RO & RU" },
          { value: 1, suffix: "", label: "Klick fur Excel-Export" },
          { value: 0, suffix: "", label: "Blatter Papier" },
        ],
      } as CaseStudy,
      cta: { headline: "Wollen Sie solche Ergebnisse?", sub: "Erzahlen Sie uns von Ihrem Geschaft. Wir zeigen Ihnen, was moglich ist.", button: "Projekt starten" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldawien" },
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Demarrer un projet" },
      hero: { label: "ETUDES DE CAS", headline: "Resultats reels.\nEntreprises reelles.", sub: "Nous ne construisons pas que des sites. Nous construisons des moteurs de croissance et des systemes qui travaillent pour vous. Voici la preuve." },
      labels: { challenge: "LE DEFI", approach: "NOTRE APPROCHE", results: "LES RESULTATS", visit: "Visiter" },
      davo: {
        tag: "TRANSPORT · SITE + SYSTEME + SEO + ADS",
        title: "Davo.md",
        subtitle: "Un seul partenaire pour tout : site, reservations avec choix du siege, panneau operateurs, SEO et Meta Ads.",
        challenge: "Les reservations se faisaient par telephone et se notaient dans des cahiers. Les passagers ne pouvaient ni reserver en ligne ni choisir leur siege, et la marque etait difficile a trouver sur Google.",
        approach: "Nous avons construit le site et le systeme de reservation avec plan des sieges, le passager choisit sa place comme en avion. Les operateurs ont recu leur panneau. Puis nous avons tout fait monter : SEO technique, backlinks et campagnes Meta en continu.",
        results: "Les reservations arrivent en ligne 24/7, les operateurs travaillent dans un seul panneau, et le trafic organique grandit semaine apres semaine.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Backlinks construits" },
          { value: 348, suffix: "", label: "Domaines referents" },
          { value: 30, suffix: "%", label: "Croissance organique hebdo" },
        ],
        captions: [
          "Google Analytics : utilisateurs actifs +15%, evenements +48.6%, 7 derniers jours",
          "Sessions par canal : organique +30.4%, direct +63%, le SEO et les backlinks travaillent",
          "Ahrefs : Domain Rating 50 · 2.6K backlinks · 348 domaines referents",
        ],
      } as CaseStudy,
      interbus: {
        tag: "PIECES AUTO · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "Du papier et d'Excel a un ERP qui tourne tout seul, plus une boutique en ligne internationale.",
        challenge: "Commandes, factures et stock vivaient sur papier et dans Excel. Le vrai profit n'etait connu qu'en fin de mois, et les ventes dependaient du telephone et de l'email.",
        approach: "Nous avons construit la boutique internationale et le back-office derriere : facturation automatique, stock mis a jour a chaque commande, profit par produit et comptabilite generee automatiquement.",
        results: "Zero papier. Les factures s'emettent seules, le stock est connu a la seconde, et les commandes arrivent de plus de 50 pays.",
        stats: [
          { value: 100, suffix: "%", label: "Factures automatiques" },
          { value: 0, suffix: "", label: "Feuilles de papier" },
          { value: 50, suffix: "", label: "Pays servis" },
          { value: 24, suffix: "/7", label: "Commandes en ligne" },
        ],
      } as CaseStudy,
      glg: {
        tag: "AUTO-ECOLE · SYSTEME DE PLANNING",
        title: "Auto-ecole GLG",
        subtitle: "Le planning des lecons pratiques, transfere du cahier a l'application.",
        challenge: "Les lecons pratiques se reservaient par telephone et dans un cahier a l'accueil. Creneaux qui se chevauchent, heures perdues, eleves qui oublient et instructeurs qui ne connaissent pas leur journee.",
        approach: "Nous avons construit le systeme de planning : les eleves choisissent leurs creneaux libres, les instructeurs voient leur calendrier en temps reel, et le bureau a la vue complete, qui, quand, avec qui. Rappels automatiques avant chaque lecon.",
        results: "Le planning se remplit tout seul, le telephone sonne moins, et les lecons ne se chevauchent plus jamais.",
        stats: [
          { value: 100, suffix: "%", label: "Reservations en ligne" },
          { value: 0, suffix: "", label: "Chevauchements d'horaire" },
          { value: 3, suffix: "", label: "Roles : eleve, instructeur, admin" },
          { value: 24, suffix: "/7", label: "Reservation disponible" },
        ],
      } as CaseStudy,
      droppack: {
        tag: "NOTRE PRODUIT · LOGISTIQUE COLIS",
        title: "DropPack",
        subtitle: "Notre produit pour les transporteurs de colis Moldavie–Europe. De la feuille a l'application.",
        challenge: "Les transporteurs de colis travaillent sur feuilles et cahiers : expediteurs notes a la main, chauffeurs appeles un par un, clients qui telephonent pour savoir ou est leur colis.",
        approach: "Nous avons construit DropPack comme produit : bureau, chauffeurs et clients sur la meme page. Les colis s'enregistrent en secondes, les statuts se mettent a jour en direct, au bureau, charge, en transit, en livraison, livre, et toute la course s'exporte vers Excel en un clic.",
        results: "Un seul systeme pour toute la course, bureau, chauffeurs, clients. Sans feuilles, sans chaos.",
        stats: [
          { value: 5, suffix: "", label: "Statuts en direct par colis" },
          { value: 2, suffix: "", label: "Langues : RO & RU" },
          { value: 1, suffix: "", label: "Clic pour exporter vers Excel" },
          { value: 0, suffix: "", label: "Feuilles de papier" },
        ],
      } as CaseStudy,
      cta: { headline: "Vous voulez ces resultats ?", sub: "Parlez-nous de votre activite. On vous montre ce qui est possible.", button: "Demarrer un projet" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldavie" },
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Iniciar proyecto" },
      hero: { label: "CASOS DE ESTUDIO", headline: "Resultados reales.\nNegocios reales.", sub: "No solo construimos sitios web. Construimos motores de crecimiento y sistemas que trabajan para ti. Aqui esta la prueba." },
      labels: { challenge: "EL RETO", approach: "NUESTRO ENFOQUE", results: "LOS RESULTADOS", visit: "Visitar" },
      davo: {
        tag: "TRANSPORTE · SITE + SISTEMA + SEO + ADS",
        title: "Davo.md",
        subtitle: "Un solo socio para todo: web, reservas con eleccion de asiento, panel de operadores, SEO y Meta Ads.",
        challenge: "Las reservas se hacian por telefono y se apuntaban en cuadernos. Los pasajeros no podian reservar online ni elegir su asiento, y la marca era dificil de encontrar en Google.",
        approach: "Construimos la web y el sistema de reservas con mapa de asientos, el pasajero elige su sitio como en un vuelo. Los operadores recibieron su panel. Luego lo subimos todo: SEO tecnico, backlinks y campanas de Meta en continuo.",
        results: "Las reservas llegan online 24/7, los operadores trabajan en un solo panel, y el trafico organico crece semana a semana.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Backlinks construidos" },
          { value: 348, suffix: "", label: "Dominios de referencia" },
          { value: 30, suffix: "%", label: "Crecimiento organico semanal" },
        ],
        captions: [
          "Google Analytics: usuarios activos +15%, eventos +48.6%, ultimos 7 dias",
          "Sesiones por canal: organico +30.4%, directo +63%, el SEO y los backlinks funcionan",
          "Ahrefs: Domain Rating 50 · 2.6K backlinks · 348 dominios de referencia",
        ],
      } as CaseStudy,
      interbus: {
        tag: "PIEZAS AUTO · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "Del papel y Excel a un ERP que funciona solo, mas una tienda online internacional.",
        challenge: "Los pedidos, facturas y stock vivian en papel y Excel. El beneficio real solo se sabia a fin de mes, y las ventas dependian del telefono y el email.",
        approach: "Construimos la tienda internacional y el back office detras: facturacion automatica, stock actualizado con cada pedido, beneficio por producto y contabilidad generada automaticamente.",
        results: "Cero papel. Las facturas se emiten solas, el stock se sabe al segundo, y los pedidos llegan de mas de 50 paises.",
        stats: [
          { value: 100, suffix: "%", label: "Facturas automaticas" },
          { value: 0, suffix: "", label: "Hojas de papel" },
          { value: 50, suffix: "", label: "Paises servidos" },
          { value: 24, suffix: "/7", label: "Pedidos online" },
        ],
      } as CaseStudy,
      glg: {
        tag: "AUTOESCUELA · SISTEMA DE CITAS",
        title: "Autoescuela GLG",
        subtitle: "Las clases practicas, del cuaderno a la aplicacion.",
        challenge: "Las clases practicas se reservaban por telefono y en un cuaderno en recepcion. Horas solapadas, tiempo perdido, alumnos que olvidaban clases e instructores sin saber su dia.",
        approach: "Construimos el sistema de citas: los alumnos eligen sus horas libres, los instructores ven su calendario en tiempo real, y la oficina tiene el control completo, quien, cuando, con quien. Recordatorios automaticos antes de cada clase.",
        results: "El horario se llena solo, el telefono suena menos, y las clases nunca vuelven a solaparse.",
        stats: [
          { value: 100, suffix: "%", label: "Reservas online" },
          { value: 0, suffix: "", label: "Solapamientos de horario" },
          { value: 3, suffix: "", label: "Roles: alumno, instructor, admin" },
          { value: 24, suffix: "/7", label: "Reserva disponible" },
        ],
      } as CaseStudy,
      droppack: {
        tag: "PRODUCTO PROPIO · LOGISTICA DE PAQUETES",
        title: "DropPack",
        subtitle: "Nuestro producto para transportistas de paquetes Moldavia–Europa. De la hoja a la aplicacion.",
        challenge: "Las empresas de paqueteria trabajan con hojas y cuadernos: remitentes anotados a mano, conductores llamados uno a uno, clientes preguntando por telefono donde esta su paquete.",
        approach: "Construimos DropPack como producto: oficina, conductores y clientes en la misma pagina. Los paquetes se registran en segundos, los estados se actualizan en vivo, en oficina, cargado, en transito, en reparto, entregado, y todo el viaje se exporta a Excel con un clic.",
        results: "Un solo sistema para todo el viaje, oficina, conductores, clientes. Sin hojas, sin caos.",
        stats: [
          { value: 5, suffix: "", label: "Estados en vivo por paquete" },
          { value: 2, suffix: "", label: "Idiomas: RO & RU" },
          { value: 1, suffix: "", label: "Clic para exportar a Excel" },
          { value: 0, suffix: "", label: "Hojas de papel" },
        ],
      } as CaseStudy,
      cta: { headline: "Quieres resultados asi?", sub: "Cuentanos sobre tu negocio. Te mostramos lo que es posible.", button: "Iniciar proyecto" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldavia" },
    },
  }

  const t = text[language as keyof typeof text] ?? text.en

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main style={{ background: '#0d0d0d' }}>

      <SiteNav contactHref="/#contact" />

      {/* ════════ HERO, ribbed glass band page header ════════ */}
      <section className="relative overflow-hidden">
        <div className="ribbed relative">
          <div className="relative z-[1] nv-container pb-16 pt-12 md:pb-24 md:pt-16">
            {/* soft coral under-glow behind the headline */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/4 top-0 h-56 w-[560px] -translate-x-1/2 -translate-y-1/2"
              style={{ background: 'radial-gradient(closest-side, #FF9E7A26, transparent)' }}
            />
            <Reveal>
              <SectionLabel>{t.hero.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h1
                className="mt-6 max-w-[900px] font-bold"
                style={{ fontSize: 'clamp(2.625rem, 5.6vw, 4.5rem)', lineHeight: 1.01, letterSpacing: '-0.055em' }}
              >
                {t.hero.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {i === 0 ? <LimeTail text={line} /> : line}
                  </span>
                ))}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p
                className="mt-7 max-w-[640px] font-medium"
                style={{ color: '#b8b8b9', fontSize: '1.125rem', lineHeight: 1.4, letterSpacing: '-0.02em' }}
              >
                {t.hero.sub}
              </p>
            </Reveal>
            {/* study index, gradient-border glass chips, coral number, fast hover */}
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {caseConfigs.map((c) => (
                  <a
                    key={c.key}
                    href={`#${c.key}`}
                    className="chip transition-shadow duration-200 ease-out hover:[box-shadow:0_0_1px_1px_#FF9E7A]"
                  >
                    <span className="chip-inner !px-4 !py-2 text-[13px]">
                      <span className="font-semibold" style={{ color: LIME }}>{c.num}</span>
                      {t[c.key].title}
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {caseConfigs.map((c, ci) => {
        const study = t[c.key]
        return (
          <section key={c.key} id={c.key} className="scroll-mt-24 pt-14 md:pt-16">
            <div className="nv-container">

              {/* coral horizon seam between studies */}
              {ci > 0 && <div className="nv-seam mb-14 md:mb-16" aria-hidden />}

              {/* study header: plain caps eyebrow (coral number, NO dot) +
                  coral claim line + arch media with vignettes */}
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <Reveal>
                    <span className="inline-flex flex-wrap items-center gap-3 text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
                      <span style={{ color: LIME }}>{c.num}</span>
                      <span>{study.tag}</span>
                    </span>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h2 className="mt-5 font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}>
                      {study.title}
                    </h2>
                    <p
                      className="mt-4 max-w-[560px] font-medium"
                      style={{ color: '#b8b8b9', fontSize: '1.0625rem', lineHeight: 1.4, letterSpacing: '-0.02em' }}
                    >
                      {study.subtitle}
                    </p>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <span className="mt-8 block text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
                      {t.labels.results}
                    </span>
                    <blockquote
                      className="mt-4 max-w-[600px] font-medium text-white"
                      style={{ fontSize: 'clamp(1.375rem, 2.3vw, 1.75rem)', lineHeight: 1.3, letterSpacing: '-1.34px' }}
                    >
                      <ClaimLime text={study.results} />
                    </blockquote>
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-white transition-[box-shadow] duration-200 ease-out hover:[box-shadow:0_0_1px_1px_#FF9E7A]"
                        style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        {t.labels.visit} {c.domain}
                        <span
                          aria-hidden
                          className="inline-block -rotate-45 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:rotate-0"
                          style={{ color: LIME }}
                        >
                          &rarr;
                        </span>
                      </a>
                    )}
                  </Reveal>
                </div>

                {/* media: ARCH portrait when a tall capture exists, 16/10 otherwise.
                    nv-card3d depth, coral glow, top + bottom vignettes under the text. */}
                <Reveal delay={0.12} className={`lg:col-span-5 ${ci % 2 === 1 ? 'lg:order-first' : ''}`}>
                  {c.tall ? (
                    <div
                      className="nv-card3d group relative mx-auto overflow-hidden [box-shadow:0_0_60px_-12px_rgba(255,158,122,0.35)]"
                      style={{
                        width: 'min(340px, 78vw)',
                        aspectRatio: '340 / 450',
                        borderRadius: '999px 999px 24px 24px',
                        border: '1px solid rgba(73,73,73,0.6)',
                      }}
                    >
                      <Image
                        src={c.tall}
                        alt={c.alt ?? study.title}
                        fill
                        sizes="340px"
                        className="object-cover object-top transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 z-10 h-24"
                        style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.72), transparent)' }}
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 px-6 pb-5 pt-16"
                        style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.72), transparent)' }}
                      >
                        <span className="text-[14px] font-medium text-white">{c.domain}</span>
                        <span aria-hidden className="inline-block -rotate-45 transition-transform duration-200 ease-out group-hover:rotate-0" style={{ color: LIME }}>
                          &rarr;
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="nv-card3d group relative overflow-hidden rounded-[24px] [box-shadow:0_0_60px_-12px_rgba(255,158,122,0.35)]"
                      style={{ border: '1px solid rgba(73,73,73,0.6)', aspectRatio: '16 / 10' }}
                    >
                      <Image
                        src={c.image}
                        alt={c.alt ?? study.title}
                        fill
                        sizes="(min-width: 1024px) 520px, 92vw"
                        className="object-cover object-top transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 z-10 h-16"
                        style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.72), transparent)' }}
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 px-6 pb-4 pt-12"
                        style={{ background: 'linear-gradient(0deg, rgba(8,8,8,0.72), transparent)' }}
                      >
                        <span className="text-[14px] font-medium text-white">{c.domain}</span>
                        <span aria-hidden className="inline-block -rotate-45 transition-transform duration-200 ease-out group-hover:rotate-0" style={{ color: LIME }}>
                          &rarr;
                        </span>
                      </div>
                    </div>
                  )}
                </Reveal>
              </div>

              {/* challenge / approach, gradient-hairline cells, fast coral ring hover */}
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <Reveal className="h-full">
                  <div className="nv-edge nv-edge--ring h-full">
                    <div className="nv-edge-inner h-full p-7 md:p-8">
                      <span className="text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>{t.labels.challenge}</span>
                      <p className="mt-4 text-[0.9375rem] font-medium leading-relaxed" style={{ color: '#b8b8b9' }}>{study.challenge}</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.06} className="h-full">
                  <div className="nv-edge nv-edge--alt nv-edge--ring h-full">
                    <div className="nv-edge-inner h-full p-7 md:p-8">
                      <span className="text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>{t.labels.approach}</span>
                      <p className="mt-4 text-[0.9375rem] font-medium leading-relaxed" style={{ color: '#b8b8b9' }}>{study.approach}</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* metrics, gradient-hairline cells, coral suffix, fast ring hover */}
              <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
                {study.stats.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.05} className="h-full">
                    <div className="nv-edge nv-edge--ring h-full">
                      <div className="nv-edge-inner flex h-full min-h-[140px] flex-col justify-center p-6 text-center">
                        <span className="font-semibold" style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                          {stat.value}
                          <span style={{ color: LIME }}>{stat.suffix}</span>
                        </span>
                        <span className="mt-3 text-[0.875rem] font-medium" style={{ color: '#909099' }}>{stat.label}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* evidence, real analytics in coral-glow media cards with depth */}
              {c.evidence && study.captions && (
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {c.evidence.map((src, ei) => (
                    <Reveal key={src} delay={ei * 0.06}>
                      <div
                        className="nv-card3d group relative overflow-hidden rounded-[20px] [box-shadow:0_0_50px_-9px_rgba(255,158,122,0.3)]"
                        style={{
                          border: '1px solid rgba(73,73,73,0.6)',
                          aspectRatio: '16 / 10',
                          background: '#0f0f0f',
                        }}
                      >
                        <Image
                          src={src}
                          alt={study.captions?.[ei] ?? ''}
                          fill
                          sizes="(min-width: 1024px) 420px, 92vw"
                          className="object-cover object-left-top transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                        />
                      </div>
                      <p className="mt-3 text-[0.8125rem] font-medium leading-relaxed" style={{ color: '#909099' }}>{study.captions?.[ei]}</p>
                    </Reveal>
                  ))}
                </div>
              )}

            </div>
          </section>
        )
      })}

      {/* ════════ CTA, metallic pill on a hairline card ════════ */}
      <section className="pt-16 md:pt-20">
        <div className="nv-container">
          <div className="nv-seam mb-14 md:mb-16" aria-hidden />
          <Reveal>
            <div className="nv-edge">
              <div className="nv-edge-inner relative p-8 text-center md:p-14">
                {/* soft coral under-glow at the top edge */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 h-40 w-[440px] -translate-x-1/2 -translate-y-1/2"
                  style={{ background: 'radial-gradient(closest-side, #FF9E7A33, transparent)' }}
                />
                <h2 className="font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', letterSpacing: '-2.4px', lineHeight: 1.05 }}>
                  <LimeTail text={t.cta.headline} />
                </h2>
                <p className="mx-auto mt-4 max-w-[480px] text-[1rem] font-medium" style={{ color: '#b8b8b9' }}>{t.cta.sub}</p>
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
      <footer className="pb-16 pt-24 md:pb-24">
        <div className="nv-container">
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)' }}
          />
          <div className="flex flex-col items-start justify-between gap-6 pt-10 md:flex-row md:items-center">
            <div className="flex items-center gap-7">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/images/logowhite.png" alt="landings.md" width={22} height={36} className="h-8 w-auto" />
                <span className="text-[14px] font-medium text-white">landings.md</span>
              </Link>
              <div className="hidden items-center gap-5 text-[13px] font-medium md:flex">
                <Link href="/portfolio" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.portfolio}</Link>
                <Link href="/pricing" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.pricing}</Link>
                <Link href="/solutions" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.solutions}</Link>
                <Link href="/case-studies" className="transition-colors duration-200 hover:!text-white" style={{ color: '#a4a4a4' }}>{t.nav.caseStudies}</Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-[13px] font-medium sm:flex-row sm:items-center sm:gap-5" style={{ color: '#909099' }}>
              <a href="tel:+37368327082" className="transition-colors duration-200 hover:!text-white">+373 683 27 082</a>
              <span>{t.footer.copy}</span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  )
}
