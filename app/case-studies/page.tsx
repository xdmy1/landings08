"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StickyContactPill } from '@/components/ui/sticky-contact-pill'
import { useLanguage } from '@/hooks/useLanguage'
import { SiteNav } from '@/components/ui/site-nav'
import { BrowserFrame } from '@/components/ui/browser-frame'
import { ScheduleCalendarMock } from '@/components/ui/system-mocks'

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

function ImageReveal({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.1)
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(1.03)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function AnimatedNumber({ value, suffix = "", className = "" }: { value: number, suffix?: string, className?: string }) {
  const { ref, visible } = useInView(0.3)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!visible || value === 0) { if (visible) setDisplay(value); return }
    const duration = 2000
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [visible, value])

  return <span ref={ref} className={className}>{visible ? display : 0}{suffix}</span>
}

function HorizontalLine({ className = "", delay = 0 }: { className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="h-px bg-divider transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
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
type CaseKey = 'davo' | 'interbus' | 'glg' | 'droppack' | 'respectauto'

const caseConfigs: { key: CaseKey, num: string, domain: string, url?: string, image?: string, alt?: string, evidence?: string[] }[] = [
  {
    key: 'davo', num: '01', domain: 'davo.md', url: 'https://davo.md',
    image: '/images/shot-davo.jpg',
    alt: 'Davo.md — international transport platform with seat-selection bookings, SEO and Meta Ads by landings.md',
    evidence: ['/images/davo-ga.png', '/images/davo-ga2.png', '/images/davo-ahrefs.png'],
  },
  {
    key: 'interbus', num: '02', domain: 'inter-bus.md', url: 'https://inter-bus.md',
    image: '/images/shot-interbus.jpg',
    alt: 'Inter-Bus — international parts store with automated invoicing, stock and accounting by landings.md',
  },
  {
    key: 'glg', num: '03', domain: 'Scoala Auto GLG — programari',
  },
  {
    key: 'droppack', num: '04', domain: 'droppack.vercel.app', url: 'https://droppack.vercel.app',
    image: '/images/shot-droppack.jpg',
    alt: 'DropPack — parcel logistics app for Moldova–Europe transport companies, built by landings.md',
  },
  {
    key: 'respectauto', num: '05', domain: 'respectauto.md', url: 'https://respectauto.md',
    image: '/images/shot-respectauto.jpg',
    alt: 'RespectAuto car rental website — ranked #1 on Google Moldova',
    evidence: ['/images/case-study-respectauto1.png', '/images/case-study-respectauto2.png'],
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
        approach: "We built the website and the booking system with a seat map — passengers pick their seat like on a flight. Operators got their own reservation panel. Then we pushed everything up: technical SEO, backlinks and Meta Ads running continuously.",
        results: "Bookings flow in online 24/7, operators work in a single panel, and organic traffic grows week after week.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Backlinks built" },
          { value: 348, suffix: "", label: "Referring domains" },
          { value: 30, suffix: "%", label: "Weekly organic growth" },
        ],
        captions: [
          "Google Analytics: active users +15%, events +48.6% — last 7 days",
          "Sessions by channel: organic +30.4%, direct +63% — SEO and backlinks at work",
          "Ahrefs: Domain Rating 50 · 2.6K backlinks · 348 referring domains",
        ],
      } as CaseStudy,
      interbus: {
        tag: "AUTO PARTS · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "From paper and Excel to an ERP that runs itself — plus an international online store.",
        challenge: "Orders, invoices and stock lived on paper and in Excel. Real profit was only known at the end of the month, and sales depended on phone and email.",
        approach: "We built the international online store and the back office behind it: automated invoicing, stock that updates with every order, profit calculated per product and accounting generated automatically. Everything in one panel.",
        results: "Zero paper. Invoices issue themselves, stock is known to the second, and orders come in from over 50 countries.",
        stats: [
          { value: 100, suffix: "%", label: "Invoices generated automatically" },
          { value: 0, suffix: "", label: "Sheets of paper" },
          { value: 50, suffix: "+", label: "Countries served" },
          { value: 24, suffix: "/7", label: "Online orders" },
        ],
      } as CaseStudy,
      glg: {
        tag: "DRIVING SCHOOL · SCHEDULING SYSTEM",
        title: "GLG Driving School",
        subtitle: "Practical lesson scheduling, moved from the notebook into an app.",
        challenge: "Practical lessons were booked through phone calls and a notebook at the front desk. Overlapping slots, lost hours, students forgetting lessons and instructors not knowing their day.",
        approach: "We built the scheduling system: students pick their own free slots, instructors see their calendar in real time, and the office has the full picture — who, when, with whom. Automatic reminders before every lesson.",
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
        approach: "We built DropPack as a product: office, drivers and clients on the same page. Parcels are registered in seconds, statuses update live — in office, loaded, in transit, delivering, delivered — and the whole run exports to Excel in one click.",
        results: "One system for the whole run — office, drivers, clients. No sheets, no chaos.",
        stats: [
          { value: 5, suffix: "", label: "Live statuses per parcel" },
          { value: 2, suffix: "", label: "Languages: RO & RU" },
          { value: 1, suffix: "", label: "Click to export to Excel" },
          { value: 0, suffix: "", label: "Sheets of paper" },
        ],
      } as CaseStudy,
      respectauto: {
        tag: "CAR RENTAL · SEO · GROWTH",
        title: "RespectAuto",
        subtitle: "From invisible on Google to #1 in Moldova for car rental.",
        challenge: "RespectAuto had a basic website that generated zero organic traffic. In a competitive market with established players running Google Ads, they needed to rank organically — without spending on advertising.",
        approach: "We rebuilt the entire website from scratch with SEO as the foundation. Every page optimised for high-intent keywords: schema markup, speed under 2 seconds, internal linking, and content matching exactly what people search for.",
        results: "The results speak for themselves.",
        stats: [
          { value: 300, suffix: "%", label: "Organic traffic increase" },
          { value: 5, suffix: "x", label: "More booking requests" },
          { value: 1, suffix: "st", label: "Position on Google" },
          { value: 0, suffix: "€", label: "Spent on ads" },
        ],
        captions: [
          "Ahrefs: organic traffic explosion after our SEO rebuild",
          "Referring domains growth — building authority over time",
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
        approach: "Am construit site-ul si sistemul de rezervari cu harta locurilor — pasagerul isi alege locul ca la avion. Operatorii au primit panoul lor de rezervari. Apoi am dus totul sus: SEO tehnic, backlinkuri si campanii Meta care ruleaza continuu.",
        results: "Rezervarile curg online 24/7, operatorii lucreaza intr-un singur panou, iar traficul organic creste saptamana de saptamana.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Backlinkuri construite" },
          { value: 348, suffix: "", label: "Domenii de referinta" },
          { value: 30, suffix: "%", label: "Crestere organica saptamanala" },
        ],
        captions: [
          "Google Analytics: utilizatori activi +15%, evenimente +48.6% — ultimele 7 zile",
          "Sesiuni pe canale: organic +30.4%, direct +63% — SEO si backlinkurile lucreaza",
          "Ahrefs: Domain Rating 50 · 2.6K backlinkuri · 348 domenii de referinta",
        ],
      } as CaseStudy,
      interbus: {
        tag: "PIESE AUTO · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "De la foi si Excel la un ERP care merge singur — plus magazin online international.",
        challenge: "Comenzile, facturile si stocul se tineau pe hartie si in Excel. Profitul real se afla abia la sfarsit de luna, iar vanzarile depindeau de telefon si e-mail.",
        approach: "Am construit magazinul online international si panoul din spate: facturare automata, stoc actualizat la fiecare comanda, profit calculat pe produs si contabilitate generata automat. Totul intr-un singur panou.",
        results: "Zero foi. Facturile se emit singure, stocul se stie la secunda, iar comenzile vin din peste 50 de tari.",
        stats: [
          { value: 100, suffix: "%", label: "Facturi generate automat" },
          { value: 0, suffix: "", label: "Foi de hartie" },
          { value: 50, suffix: "+", label: "Tari deservite" },
          { value: 24, suffix: "/7", label: "Comenzi online" },
        ],
      } as CaseStudy,
      glg: {
        tag: "SCOALA AUTO · SISTEM PROGRAMARI",
        title: "Scoala Auto GLG",
        subtitle: "Programarile la lectii practice, mutate din caiet in aplicatie.",
        challenge: "Programarile la lectiile practice se faceau prin apeluri si un caiet la receptie. Ore suprapuse, timp pierdut, elevi care uitau de lectii si instructori care nu isi stiau ziua.",
        approach: "Am construit sistemul de programari: elevii isi aleg singuri orele libere, instructorii isi vad orarul in timp real, iar administratia are evidenta completa — cine, cand, cu cine. Notificari automate inainte de fiecare lectie.",
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
        approach: "Am construit DropPack ca produs: biroul, soferii si clientii pe aceeasi pagina. Coletele se inregistreaza in secunde, statusurile se actualizeaza live — in birou, incarcat, in tranzit, la livrare, livrat — iar toata cursa se exporta in Excel cu un click.",
        results: "Un singur sistem pentru toata cursa — birou, soferi, clienti. Fara foi, fara haos.",
        stats: [
          { value: 5, suffix: "", label: "Statusuri live per colet" },
          { value: 2, suffix: "", label: "Limbi: RO & RU" },
          { value: 1, suffix: "", label: "Click pentru export Excel" },
          { value: 0, suffix: "", label: "Foi de hartie" },
        ],
      } as CaseStudy,
      respectauto: {
        tag: "INCHIRIERI AUTO · SEO · CRESTERE",
        title: "RespectAuto",
        subtitle: "De la invizibil pe Google la #1 in Moldova pentru inchirieri auto.",
        challenge: "RespectAuto avea un website basic care nu genera trafic organic. Intr-o piata competitiva cu jucatori care rulau Google Ads, aveau nevoie sa apara organic — fara sa cheltuie pe publicitate.",
        approach: "Am reconstruit intregul website de la zero cu SEO ca fundatie. Fiecare pagina optimizata pentru cuvinte cheie cu intentie de cumparare: schema markup, viteza sub 2 secunde, legaturi interne si continut care se potriveste exact cu ce cauta oamenii.",
        results: "Rezultatele vorbesc de la sine.",
        stats: [
          { value: 300, suffix: "%", label: "Crestere trafic organic" },
          { value: 5, suffix: "x", label: "Mai multe cereri de rezervare" },
          { value: 1, suffix: "", label: "Pozitia pe Google" },
          { value: 0, suffix: "€", label: "Cheltuiti pe reclame" },
        ],
        captions: [
          "Ahrefs: explozie de trafic organic dupa reconstruirea SEO",
          "Cresterea domeniilor de referinta — construind autoritate in timp",
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
        approach: "Wir haben die Website und das Buchungssystem mit Sitzplan gebaut — Passagiere wahlen ihren Platz wie im Flugzeug. Operatoren bekamen ihr eigenes Panel. Dann ging alles nach oben: technisches SEO, Backlinks und laufende Meta-Kampagnen.",
        results: "Buchungen kommen online rund um die Uhr, Operatoren arbeiten in einem Panel, und der organische Traffic wachst Woche fur Woche.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Aufgebaute Backlinks" },
          { value: 348, suffix: "", label: "Verweisende Domains" },
          { value: 30, suffix: "%", label: "Wochentliches organisches Wachstum" },
        ],
        captions: [
          "Google Analytics: aktive Nutzer +15%, Events +48.6% — letzte 7 Tage",
          "Sitzungen nach Kanal: organisch +30.4%, direkt +63% — SEO und Backlinks wirken",
          "Ahrefs: Domain Rating 50 · 2.6K Backlinks · 348 verweisende Domains",
        ],
      } as CaseStudy,
      interbus: {
        tag: "AUTOTEILE · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "Von Papier und Excel zu einem ERP, das von selbst lauft — plus internationaler Online-Shop.",
        challenge: "Bestellungen, Rechnungen und Lager lebten auf Papier und in Excel. Der echte Gewinn war erst am Monatsende bekannt, Verkaufe hingen an Telefon und E-Mail.",
        approach: "Wir haben den internationalen Shop und das Backoffice dahinter gebaut: automatische Rechnungen, Lager, das sich mit jeder Bestellung aktualisiert, Gewinn pro Produkt und automatisch erzeugte Buchhaltung.",
        results: "Null Papier. Rechnungen erstellen sich selbst, der Lagerbestand ist sekundengenau bekannt, Bestellungen kommen aus uber 50 Landern.",
        stats: [
          { value: 100, suffix: "%", label: "Automatische Rechnungen" },
          { value: 0, suffix: "", label: "Blatter Papier" },
          { value: 50, suffix: "+", label: "Belieferte Lander" },
          { value: 24, suffix: "/7", label: "Online-Bestellungen" },
        ],
      } as CaseStudy,
      glg: {
        tag: "FAHRSCHULE · TERMINSYSTEM",
        title: "Fahrschule GLG",
        subtitle: "Fahrstunden-Planung, vom Heft in die App verlegt.",
        challenge: "Fahrstunden wurden uber Anrufe und ein Heft am Empfang gebucht. Uberschneidungen, verlorene Stunden, Schuler, die Stunden vergassen, und Fahrlehrer, die ihren Tag nicht kannten.",
        approach: "Wir haben das Terminsystem gebaut: Schuler wahlen selbst freie Zeiten, Fahrlehrer sehen ihren Kalender in Echtzeit, und das Buro hat den vollen Uberblick — wer, wann, mit wem. Automatische Erinnerungen vor jeder Stunde.",
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
        approach: "Wir haben DropPack als Produkt gebaut: Buro, Fahrer und Kunden auf derselben Seite. Pakete werden in Sekunden registriert, Status aktualisieren sich live — im Buro, geladen, im Transit, in Zustellung, geliefert — und die ganze Fahrt exportiert sich mit einem Klick nach Excel.",
        results: "Ein System fur die ganze Fahrt — Buro, Fahrer, Kunden. Keine Blatter, kein Chaos.",
        stats: [
          { value: 5, suffix: "", label: "Live-Status pro Paket" },
          { value: 2, suffix: "", label: "Sprachen: RO & RU" },
          { value: 1, suffix: "", label: "Klick fur Excel-Export" },
          { value: 0, suffix: "", label: "Blatter Papier" },
        ],
      } as CaseStudy,
      respectauto: {
        tag: "AUTOVERMIETUNG · SEO · WACHSTUM",
        title: "RespectAuto",
        subtitle: "Von unsichtbar bei Google zur Nr. 1 in Moldawien fur Autovermietung.",
        challenge: "RespectAuto hatte eine einfache Website ohne organischen Traffic. In einem wettbewerbsintensiven Markt mussten sie organisch ranken — ohne Werbeausgaben.",
        approach: "Wir haben die gesamte Website von Grund auf mit SEO als Fundament neu aufgebaut. Jede Seite fur hochwertige Keywords optimiert: Schema-Markup, Ladezeit unter 2 Sekunden, interne Verlinkung und passgenauer Content.",
        results: "Die Ergebnisse sprechen fur sich.",
        stats: [
          { value: 300, suffix: "%", label: "Organischer Traffic-Anstieg" },
          { value: 5, suffix: "x", label: "Mehr Buchungsanfragen" },
          { value: 1, suffix: ".", label: "Position bei Google" },
          { value: 0, suffix: "€", label: "Fur Werbung ausgegeben" },
        ],
        captions: [
          "Ahrefs: organische Traffic-Explosion nach unserem SEO-Rebuild",
          "Wachstum der Referring Domains — Autoritatsaufbau uber Zeit",
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
        approach: "Nous avons construit le site et le systeme de reservation avec plan des sieges — le passager choisit sa place comme en avion. Les operateurs ont recu leur panneau. Puis nous avons tout fait monter : SEO technique, backlinks et campagnes Meta en continu.",
        results: "Les reservations arrivent en ligne 24/7, les operateurs travaillent dans un seul panneau, et le trafic organique grandit semaine apres semaine.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Backlinks construits" },
          { value: 348, suffix: "", label: "Domaines referents" },
          { value: 30, suffix: "%", label: "Croissance organique hebdo" },
        ],
        captions: [
          "Google Analytics : utilisateurs actifs +15%, evenements +48.6% — 7 derniers jours",
          "Sessions par canal : organique +30.4%, direct +63% — le SEO et les backlinks travaillent",
          "Ahrefs : Domain Rating 50 · 2.6K backlinks · 348 domaines referents",
        ],
      } as CaseStudy,
      interbus: {
        tag: "PIECES AUTO · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "Du papier et d'Excel a un ERP qui tourne tout seul — plus une boutique en ligne internationale.",
        challenge: "Commandes, factures et stock vivaient sur papier et dans Excel. Le vrai profit n'etait connu qu'en fin de mois, et les ventes dependaient du telephone et de l'email.",
        approach: "Nous avons construit la boutique internationale et le back-office derriere : facturation automatique, stock mis a jour a chaque commande, profit par produit et comptabilite generee automatiquement.",
        results: "Zero papier. Les factures s'emettent seules, le stock est connu a la seconde, et les commandes arrivent de plus de 50 pays.",
        stats: [
          { value: 100, suffix: "%", label: "Factures automatiques" },
          { value: 0, suffix: "", label: "Feuilles de papier" },
          { value: 50, suffix: "+", label: "Pays servis" },
          { value: 24, suffix: "/7", label: "Commandes en ligne" },
        ],
      } as CaseStudy,
      glg: {
        tag: "AUTO-ECOLE · SYSTEME DE PLANNING",
        title: "Auto-ecole GLG",
        subtitle: "Le planning des lecons pratiques, transfere du cahier a l'application.",
        challenge: "Les lecons pratiques se reservaient par telephone et dans un cahier a l'accueil. Creneaux qui se chevauchent, heures perdues, eleves qui oublient et instructeurs qui ne connaissent pas leur journee.",
        approach: "Nous avons construit le systeme de planning : les eleves choisissent leurs creneaux libres, les instructeurs voient leur calendrier en temps reel, et le bureau a la vue complete — qui, quand, avec qui. Rappels automatiques avant chaque lecon.",
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
        approach: "Nous avons construit DropPack comme produit : bureau, chauffeurs et clients sur la meme page. Les colis s'enregistrent en secondes, les statuts se mettent a jour en direct — au bureau, charge, en transit, en livraison, livre — et toute la course s'exporte vers Excel en un clic.",
        results: "Un seul systeme pour toute la course — bureau, chauffeurs, clients. Sans feuilles, sans chaos.",
        stats: [
          { value: 5, suffix: "", label: "Statuts en direct par colis" },
          { value: 2, suffix: "", label: "Langues : RO & RU" },
          { value: 1, suffix: "", label: "Clic pour exporter vers Excel" },
          { value: 0, suffix: "", label: "Feuilles de papier" },
        ],
      } as CaseStudy,
      respectauto: {
        tag: "LOCATION AUTO · SEO · CROISSANCE",
        title: "RespectAuto",
        subtitle: "D'invisible sur Google au n.1 en Moldavie pour la location auto.",
        challenge: "RespectAuto avait un site basique sans trafic organique. Dans un marche concurrentiel, ils devaient se positionner organiquement — sans depenser en publicite.",
        approach: "Nous avons reconstruit le site entier avec le SEO comme fondation. Chaque page optimisee pour des mots-cles a haute intention : schema markup, vitesse sous 2 secondes, maillage interne et contenu adapte.",
        results: "Les resultats parlent d'eux-memes.",
        stats: [
          { value: 300, suffix: "%", label: "Augmentation du trafic organique" },
          { value: 5, suffix: "x", label: "Plus de demandes de reservation" },
          { value: 1, suffix: "ere", label: "Position sur Google" },
          { value: 0, suffix: "€", label: "Depense en publicite" },
        ],
        captions: [
          "Ahrefs : explosion du trafic organique apres notre refonte SEO",
          "Croissance des domaines referents — construction d'autorite",
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
        approach: "Construimos la web y el sistema de reservas con mapa de asientos — el pasajero elige su sitio como en un vuelo. Los operadores recibieron su panel. Luego lo subimos todo: SEO tecnico, backlinks y campanas de Meta en continuo.",
        results: "Las reservas llegan online 24/7, los operadores trabajan en un solo panel, y el trafico organico crece semana a semana.",
        stats: [
          { value: 50, suffix: "", label: "Domain Rating (Ahrefs)" },
          { value: 2600, suffix: "+", label: "Backlinks construidos" },
          { value: 348, suffix: "", label: "Dominios de referencia" },
          { value: 30, suffix: "%", label: "Crecimiento organico semanal" },
        ],
        captions: [
          "Google Analytics: usuarios activos +15%, eventos +48.6% — ultimos 7 dias",
          "Sesiones por canal: organico +30.4%, directo +63% — el SEO y los backlinks funcionan",
          "Ahrefs: Domain Rating 50 · 2.6K backlinks · 348 dominios de referencia",
        ],
      } as CaseStudy,
      interbus: {
        tag: "PIEZAS AUTO · E-COMMERCE + ERP",
        title: "Inter-Bus",
        subtitle: "Del papel y Excel a un ERP que funciona solo — mas una tienda online internacional.",
        challenge: "Los pedidos, facturas y stock vivian en papel y Excel. El beneficio real solo se sabia a fin de mes, y las ventas dependian del telefono y el email.",
        approach: "Construimos la tienda internacional y el back office detras: facturacion automatica, stock actualizado con cada pedido, beneficio por producto y contabilidad generada automaticamente.",
        results: "Cero papel. Las facturas se emiten solas, el stock se sabe al segundo, y los pedidos llegan de mas de 50 paises.",
        stats: [
          { value: 100, suffix: "%", label: "Facturas automaticas" },
          { value: 0, suffix: "", label: "Hojas de papel" },
          { value: 50, suffix: "+", label: "Paises servidos" },
          { value: 24, suffix: "/7", label: "Pedidos online" },
        ],
      } as CaseStudy,
      glg: {
        tag: "AUTOESCUELA · SISTEMA DE CITAS",
        title: "Autoescuela GLG",
        subtitle: "Las clases practicas, del cuaderno a la aplicacion.",
        challenge: "Las clases practicas se reservaban por telefono y en un cuaderno en recepcion. Horas solapadas, tiempo perdido, alumnos que olvidaban clases e instructores sin saber su dia.",
        approach: "Construimos el sistema de citas: los alumnos eligen sus horas libres, los instructores ven su calendario en tiempo real, y la oficina tiene el control completo — quien, cuando, con quien. Recordatorios automaticos antes de cada clase.",
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
        approach: "Construimos DropPack como producto: oficina, conductores y clientes en la misma pagina. Los paquetes se registran en segundos, los estados se actualizan en vivo — en oficina, cargado, en transito, en reparto, entregado — y todo el viaje se exporta a Excel con un clic.",
        results: "Un solo sistema para todo el viaje — oficina, conductores, clientes. Sin hojas, sin caos.",
        stats: [
          { value: 5, suffix: "", label: "Estados en vivo por paquete" },
          { value: 2, suffix: "", label: "Idiomas: RO & RU" },
          { value: 1, suffix: "", label: "Clic para exportar a Excel" },
          { value: 0, suffix: "", label: "Hojas de papel" },
        ],
      } as CaseStudy,
      respectauto: {
        tag: "ALQUILER DE AUTOS · SEO · CRECIMIENTO",
        title: "RespectAuto",
        subtitle: "De invisible en Google al #1 en Moldavia para alquiler de autos.",
        challenge: "RespectAuto tenia un sitio basico sin trafico organico. En un mercado competitivo, necesitaban posicionarse organicamente — sin gastar en publicidad.",
        approach: "Reconstruimos todo el sitio con SEO como base. Cada pagina optimizada para palabras clave de alta intencion: schema markup, velocidad bajo 2 segundos, enlaces internos y contenido adaptado.",
        results: "Los resultados hablan por si mismos.",
        stats: [
          { value: 300, suffix: "%", label: "Aumento de trafico organico" },
          { value: 5, suffix: "x", label: "Mas solicitudes de reserva" },
          { value: 1, suffix: "er", label: "Posicion en Google" },
          { value: 0, suffix: "€", label: "Gastado en publicidad" },
        ],
        captions: [
          "Ahrefs: explosion de trafico organico tras nuestra reconstruccion SEO",
          "Crecimiento de dominios de referencia — construyendo autoridad",
        ],
      } as CaseStudy,
      cta: { headline: "Quieres resultados asi?", sub: "Cuentanos sobre tu negocio. Te mostramos lo que es posible.", button: "Iniciar proyecto" },
      footer: { copy: "© 2026 landings.md · Chisinau, Moldavia" },
    },
  }

  const t = text[language as keyof typeof text]

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  const backgrounds = [
    'linear-gradient(180deg, #2A2118 0%, #342A20 100%)',
    'linear-gradient(180deg, #342A20 0%, #2C2218 100%)',
    'linear-gradient(180deg, #2C2218 0%, #362C20 100%)',
    'linear-gradient(180deg, #362C20 0%, #2A2118 100%)',
    'linear-gradient(180deg, #2A2118 0%, #342A20 100%)',
  ]

  return (
    <div className="min-h-screen text-ink grain" style={{ background: '#2A2118' }}>

      <SiteNav contactHref="/#contact" />

      {/* ── BORDERED CONTAINER ── */}
      <div className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 relative line-sides">

        {/* ── HERO ── */}
        <section className="pt-36 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 lg:px-16 relative glow-amber" style={{ background: 'linear-gradient(180deg, #302620 0%, #2A2118 100%)' }}>
          <div className="max-w-3xl">
            <FadeIn>
              <span className="text-ink-light text-[11px] font-mono tracking-[0.2em] uppercase block mb-8">{t.hero.label}</span>
            </FadeIn>
            <RevealText>
              <h1 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] text-ink leading-[1.05] tracking-[-0.02em] whitespace-pre-line">
                {t.hero.headline}
              </h1>
            </RevealText>
            <FadeIn delay={400}>
              <p className="mt-6 text-ink-muted text-[15px] md:text-lg leading-relaxed max-w-xl">
                {t.hero.sub}
              </p>
            </FadeIn>
          </div>
        </section>

        <HorizontalLine />

        {caseConfigs.map((c, ci) => {
          const study = t[c.key]
          const reversed = ci % 2 === 1
          return (
            <React.Fragment key={c.key}>
              <section className="px-6 md:px-12 lg:px-16 py-14 md:py-20" style={{ background: backgrounds[ci] }}>

                {/* Header */}
                <div className="flex items-baseline gap-4 md:gap-6 mb-8 md:mb-12">
                  <span className="text-ink-light/25 font-serif text-[34px] md:text-[46px] leading-none flex-shrink-0">{c.num}</span>
                  <div className="min-w-0">
                    <span className="text-amber text-[10px] font-mono tracking-[0.2em] uppercase block mb-2">{study.tag}</span>
                    <h2 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] text-ink leading-[1.1] mb-2">{study.title}</h2>
                    <p className="text-ink-muted text-[15px] leading-relaxed max-w-2xl">{study.subtitle}</p>
                  </div>
                </div>

                {/* Visual + story */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-8 md:mb-12">
                  <ImageReveal className={reversed ? 'lg:order-2' : ''}>
                    {c.image ? (
                      c.url ? (
                        <Link href={c.url} target="_blank" rel="noopener noreferrer" className="group block">
                          <BrowserFrame domain={c.domain} className="group-hover:border-amber/40 transition-colors duration-500">
                            <div className="aspect-[16/10] overflow-hidden">
                              <Image src={c.image} alt={c.alt ?? study.title} width={1100} height={688} quality={88} className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            </div>
                          </BrowserFrame>
                        </Link>
                      ) : (
                        <BrowserFrame domain={c.domain}>
                          <div className="aspect-[16/10] overflow-hidden">
                            <Image src={c.image} alt={c.alt ?? study.title} width={1100} height={688} quality={88} className="w-full h-full object-cover object-top" />
                          </div>
                        </BrowserFrame>
                      )
                    ) : (
                      <BrowserFrame domain={c.domain}>
                        <ScheduleCalendarMock />
                      </BrowserFrame>
                    )}
                  </ImageReveal>

                  <div className={reversed ? 'lg:order-1' : ''}>
                    <div className="space-y-6">
                      <FadeIn>
                        <div>
                          <span className="text-ink-light text-[10px] font-mono tracking-[0.2em] uppercase block mb-2.5">{t.labels.challenge}</span>
                          <p className="text-ink-muted text-[13px] md:text-[14px] leading-[1.75]">{study.challenge}</p>
                        </div>
                      </FadeIn>
                      <FadeIn delay={120}>
                        <div>
                          <span className="text-ink-light text-[10px] font-mono tracking-[0.2em] uppercase block mb-2.5">{t.labels.approach}</span>
                          <p className="text-ink-muted text-[13px] md:text-[14px] leading-[1.75]">{study.approach}</p>
                        </div>
                      </FadeIn>
                      <FadeIn delay={240}>
                        <p className="font-serif text-[16px] md:text-[18px] text-ink leading-[1.5] border-l-2 border-amber/70 pl-4">
                          {study.results}
                        </p>
                      </FadeIn>
                      {c.url && (
                        <FadeIn delay={320}>
                          <Link href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber hover:text-amber-light text-[11px] font-mono tracking-wide transition-colors group">
                            {t.labels.visit} {c.domain}
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                          </Link>
                        </FadeIn>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(90,74,58,0.3)' }}>
                  {study.stats.map((stat, i) => (
                    <FadeIn key={i} delay={i * 120} className="h-full">
                      <div className="px-5 py-4 md:py-5 h-full" style={{ background: '#2E251C' }}>
                        <p className="font-serif text-[clamp(1.25rem,2vw,1.75rem)] text-amber leading-none mb-1.5">
                          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="text-ink-muted text-[10px] font-mono tracking-wide uppercase leading-snug">{stat.label}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                {/* Evidence strip */}
                {c.evidence && study.captions && (
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${c.evidence.length === 3 ? 'lg:grid-cols-3' : ''} gap-4 md:gap-5 mt-8`}>
                    {c.evidence.map((src, ei) => (
                      <ImageReveal key={ei} delay={ei * 150}>
                        <div className="border border-divider/40 aspect-[16/9] flex items-center justify-center p-3" style={{ background: '#211A13' }}>
                          <Image src={src} alt={study.captions?.[ei] ?? ""} width={720} height={405} quality={88} className="max-w-full max-h-full w-auto h-auto object-contain" />
                        </div>
                        <p className="text-ink-light text-[10px] font-mono mt-2.5 leading-relaxed">{study.captions?.[ei]}</p>
                      </ImageReveal>
                    ))}
                  </div>
                )}
              </section>

              <HorizontalLine />
            </React.Fragment>
          )
        })}

        {/* ── CTA ── */}
        <section className="px-6 md:px-12 lg:px-16 py-20 md:py-32 relative glow-amber grid-animated" style={{ background: 'linear-gradient(180deg, #2A2118 0%, #342A20 100%)' }}>
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <RevealText>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-ink leading-[1.1] mb-4">{t.cta.headline}</h2>
            </RevealText>
            <FadeIn delay={300}>
              <p className="text-ink-muted text-[15px] leading-relaxed mb-10">{t.cta.sub}</p>
            </FadeIn>
            <FadeIn delay={500}>
              <Link href="mailto:contact@landings.md" className="inline-flex items-center gap-2 bg-amber hover:bg-amber-light text-[#1A1410] px-7 py-3 text-sm transition-colors duration-300 group">
                {t.cta.button}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="line-top px-6 md:px-12 lg:px-16 py-8 pb-28" style={{ background: 'linear-gradient(180deg, #241E18 0%, #1C1710 100%)' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center">
                <Image src="/images/logowhite.png" alt="landings.md" width={16} height={26} className="w-4 h-auto opacity-70" />
              </Link>
              <div className="hidden md:flex items-center gap-4 text-[11px] text-ink-muted font-mono">
                <Link href="/portfolio" className="hover:text-ink transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-ink transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="hover:text-ink transition-colors">{t.nav.solutions}</Link>
                <Link href="/case-studies" className="hover:text-ink transition-colors">{t.nav.caseStudies}</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="tel:+37368327082" className="text-ink-muted hover:text-ink text-[11px] font-mono transition-colors">+373 683 27 082</Link>
              <span className="text-ink-muted text-[10px] font-mono">{t.footer.copy}</span>
            </div>
          </div>
        </footer>

      </div>

      <StickyContactPill language={language as 'en' | 'ro' | 'de' | 'fr' | 'es'} />
    </div>
  )
}
