"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
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

type Lang = 'en' | 'ro' | 'de' | 'fr' | 'es'
type Tier = 'starter' | 'business' | 'ecommerce' | 'custom'

const TOTAL_STEPS = 7
const LANG_ADDON = 50
const BASE_PRICES: Record<Tier, number | null> = { starter: 350, business: 550, ecommerce: 850, custom: null }

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

/* "*word.*" markers become coral <b> (h1 b is coral via globals); \n becomes a line break */
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
      {children}
    </span>
  )
}

const headerText: Record<Lang, { label: string, heading: string, sub: string }> = {
  en: { label: 'Pricing', heading: 'Simple, honest *pricing.*', sub: 'Answer 7 quick questions and get a concrete estimate, or pick a package directly. Every price is a starting point, always negotiable.' },
  ro: { label: 'Preturi', heading: 'Preturi simple si *corecte.*', sub: 'Raspunde la 7 intrebari scurte si primesti o estimare concreta, sau alege direct un pachet. Fiecare pret e un punct de pornire, mereu negociabil.' },
  de: { label: 'Preise', heading: 'Einfache, ehrliche *Preise.*', sub: 'Beantworten Sie 7 kurze Fragen und erhalten Sie eine konkrete Schatzung, oder wahlen Sie direkt ein Paket. Jeder Preis ist ein Startpunkt, immer verhandelbar.' },
  fr: { label: 'Tarifs', heading: 'Des prix simples et *justes.*', sub: 'Repondez a 7 questions rapides et recevez une estimation concrete, ou choisissez directement un forfait. Chaque prix est un point de depart, toujours negociable.' },
  es: { label: 'Precios', heading: 'Precios simples y *justos.*', sub: 'Responde 7 preguntas rapidas y recibe una estimacion concreta, o elige directamente un paquete. Cada precio es un punto de partida, siempre negociable.' },
}

const packagesLabelText: Record<Lang, string> = {
  en: 'Packages', ro: 'Pachete', de: 'Pakete', fr: 'Forfaits', es: 'Paquetes',
}

const questions = {
  en: [
    { question: "What are you looking for?", options: ["A presentation website", "An online store", "A business system, bookings, invoicing, stock", "Website + marketing (SEO & Ads)"] },
    { question: "What best describes your business?", options: ["Local business", "Online store or brand", "Freelancer or consultant", "Company or startup"] },
    { question: "What should your website do?", options: ["Show who I am and how to reach me", "Let people buy from me directly", "Let people book or request a quote", "All of the above"] },
    { question: "How big should your site be?", options: ["Small, a few pages", "Medium, several sections", "Large, lots of content or products", "Not sure yet"] },
    { question: "Do you need it in multiple languages?", options: ["No, just one", "Yes, 2 languages", "Yes, 3 languages", "4 or more"] },
    { question: "What do you already have ready?", options: ["Logo, photos, and text, all set", "Some things, need help with the rest", "Nothing yet, I need everything", "I have an old website to work from"] },
    { question: "How will people find your site?", options: ["I'll share the link myself", "They should find me on Google", "Both", "Not sure yet"] },
  ],
  ro: [
    { question: "Ce cauti?", options: ["Un site de prezentare", "Un magazin online", "Un sistem pentru afacere, rezervari, facturare, stoc", "Site + promovare (SEO & Ads)"] },
    { question: "Ce descrie cel mai bine afacerea ta?", options: ["Afacere locala", "Magazin online sau brand", "Freelancer sau consultant", "Companie sau startup"] },
    { question: "Ce ar trebui sa faca site-ul tau?", options: ["Sa arate cine sunt si cum ma contactezi", "Sa lase lumea sa cumpere direct", "Sa lase lumea sa faca rezervari", "Toate cele de mai sus"] },
    { question: "Cat de mare ar trebui sa fie?", options: ["Mic, cateva pagini", "Mediu, mai multe sectiuni", "Mare, mult continut sau produse", "Nu sunt sigur inca"] },
    { question: "Ai nevoie de mai multe limbi?", options: ["Nu, doar una", "Da, 2 limbi", "Da, 3 limbi", "4 sau mai multe"] },
    { question: "Ce ai deja pregatit?", options: ["Logo, poze si text, totul e gata", "Cateva lucruri, am nevoie de ajutor cu restul", "Nimic inca, am nevoie de tot", "Am un site vechi de la care pot pleca"] },
    { question: "Cum te vor gasi clientii?", options: ["Le trimit eu linkul", "Ar trebui sa ma gaseasca pe Google", "Ambele", "Nu sunt sigur inca"] },
  ],
  de: [
    { question: "Was suchen Sie?", options: ["Eine Prasentations-Website", "Einen Online-Shop", "Ein Business-System, Buchungen, Rechnungen, Lager", "Website + Marketing (SEO & Ads)"] },
    { question: "Was beschreibt Ihr Geschaft am besten?", options: ["Lokales Geschaft", "Online-Shop oder Marke", "Freelancer oder Berater", "Unternehmen oder Startup"] },
    { question: "Was soll Ihre Website konnen?", options: ["Zeigen wer ich bin und wie man mich erreicht", "Leute direkt kaufen lassen", "Leute buchen oder anfragen lassen", "Alles zusammen"] },
    { question: "Wie gross soll Ihre Seite sein?", options: ["Klein, ein paar Seiten", "Mittel, mehrere Bereiche", "Gross, viel Inhalt oder Produkte", "Noch nicht sicher"] },
    { question: "Brauchen Sie mehrere Sprachen?", options: ["Nein, nur eine", "Ja, 2 Sprachen", "Ja, 3 Sprachen", "4 oder mehr"] },
    { question: "Was haben Sie schon bereit?", options: ["Logo, Fotos und Text, alles fertig", "Einiges, brauche Hilfe mit dem Rest", "Noch nichts, brauche alles", "Ich habe eine alte Website als Grundlage"] },
    { question: "Wie werden Leute Ihre Seite finden?", options: ["Ich teile den Link selbst", "Sie sollen mich bei Google finden", "Beides", "Noch nicht sicher"] },
  ],
  fr: [
    { question: "Que cherchez-vous ?", options: ["Un site vitrine", "Une boutique en ligne", "Un systeme metier, reservations, facturation, stock", "Site + marketing (SEO & Ads)"] },
    { question: "Qu'est-ce qui decrit le mieux votre activite ?", options: ["Commerce local", "Boutique en ligne ou marque", "Freelance ou consultant", "Entreprise ou startup"] },
    { question: "Que doit faire votre site ?", options: ["Montrer qui je suis et comment me contacter", "Permettre d'acheter directement", "Permettre de reserver ou demander un devis", "Tout cela"] },
    { question: "Quelle taille pour votre site ?", options: ["Petit, quelques pages", "Moyen, plusieurs sections", "Grand, beaucoup de contenu ou produits", "Pas encore sur"] },
    { question: "Avez-vous besoin de plusieurs langues ?", options: ["Non, une seule", "Oui, 2 langues", "Oui, 3 langues", "4 ou plus"] },
    { question: "Qu'avez-vous deja de pret ?", options: ["Logo, photos et texte, tout est pret", "Quelques elements, besoin d'aide pour le reste", "Rien encore, j'ai besoin de tout", "J'ai un ancien site comme base"] },
    { question: "Comment les gens trouveront votre site ?", options: ["Je partagerai le lien moi-meme", "Ils devraient me trouver sur Google", "Les deux", "Pas encore sur"] },
  ],
  es: [
    { question: "Que buscas?", options: ["Una web de presentacion", "Una tienda online", "Un sistema de negocio, reservas, facturacion, stock", "Web + marketing (SEO & Ads)"] },
    { question: "Que describe mejor tu negocio?", options: ["Negocio local", "Tienda online o marca", "Freelancer o consultor", "Empresa o startup"] },
    { question: "Que deberia hacer tu sitio web?", options: ["Mostrar quien soy y como contactarme", "Dejar que la gente compre directamente", "Dejar que la gente reserve o pida presupuesto", "Todo lo anterior"] },
    { question: "Que tan grande deberia ser?", options: ["Pequeno, unas pocas paginas", "Mediano, varias secciones", "Grande, mucho contenido o productos", "No estoy seguro aun"] },
    { question: "Necesitas varios idiomas?", options: ["No, solo uno", "Si, 2 idiomas", "Si, 3 idiomas", "4 o mas"] },
    { question: "Que tienes listo ya?", options: ["Logo, fotos y texto, todo listo", "Algunas cosas, necesito ayuda con el resto", "Nada todavia, necesito todo", "Tengo un sitio viejo como base"] },
    { question: "Como encontrara la gente tu sitio?", options: ["Yo compartire el enlace", "Deberian encontrarme en Google", "Ambos", "No estoy seguro aun"] },
  ]
}

const results: Record<Lang, Record<Tier, { name: string, why: string, features: string[], cta: string }> & { label: string }> = {
  en: {
    starter: { name: "Starter", why: "A clean, fast website to get you online.", features: ["Up to 5 pages", "Works perfectly on phones", "Contact form", "Hosting included for 1 year", "Secure connection", "1 month of support"], cta: "Get started" },
    business: { name: "Business", why: "Professional site with everything a growing business needs.", features: ["Up to 10 pages", "Professional custom design", "Booking or quote forms", "Visible on Google searches", "Social media links", "Visitor statistics", "3 months of support"], cta: "Get started" },
    ecommerce: { name: "Online Store", why: "Everything you need to sell online.", features: ["Unlimited products", "Cart and checkout", "Secure online payments", "Stock management", "Order tracking", "Visible on Google searches", "6 months of support"], cta: "Get started" },
    custom: { name: "Custom System", why: "Built exactly around your processes, bookings, appointments, invoicing, stock, accounting, or all of them together.", features: ["Analysis of your business processes", "100% custom design & development", "Bookings / appointments / invoicing / stock", "Admin panel for your team", "Team training included", "Dedicated support"], cta: "Request a quote" },
    label: "YOUR ESTIMATE",
  },
  ro: {
    starter: { name: "Starter", why: "Un site curat si rapid ca sa fii online.", features: ["Pana la 5 pagini", "Functioneaza perfect pe telefon", "Formular de contact", "Hosting inclus 1 an", "Conexiune securizata", "1 luna de suport"], cta: "Incepe acum" },
    business: { name: "Business", why: "Site profesional cu tot ce are nevoie o afacere in crestere.", features: ["Pana la 10 pagini", "Design profesional personalizat", "Formulare de rezervare sau oferta", "Vizibil in cautarile Google", "Linkuri social media", "Statistici vizitatori", "3 luni de suport"], cta: "Incepe acum" },
    ecommerce: { name: "Magazin Online", why: "Tot ce ai nevoie ca sa vinzi online.", features: ["Produse nelimitate", "Cos si checkout", "Plati online securizate", "Gestiune stocuri", "Urmarire comenzi", "Vizibil in cautarile Google", "6 luni de suport"], cta: "Incepe acum" },
    custom: { name: "Sistem Custom", why: "Construit exact pe procesele afacerii tale, rezervari, programari, facturare, stoc, contabilitate sau toate impreuna.", features: ["Analiza proceselor afacerii tale", "Design & dezvoltare 100% custom", "Rezervari / programari / facturare / stoc", "Panou de administrare pentru echipa", "Training pentru echipa inclus", "Suport dedicat"], cta: "Cere oferta" },
    label: "ESTIMAREA TA",
  },
  de: {
    starter: { name: "Starter", why: "Eine saubere, schnelle Website um online zu gehen.", features: ["Bis zu 5 Seiten", "Perfekt auf dem Handy", "Kontaktformular", "Hosting fur 1 Jahr inklusive", "Sichere Verbindung", "1 Monat Support"], cta: "Jetzt starten" },
    business: { name: "Business", why: "Professionelle Seite mit allem was ein wachsendes Unternehmen braucht.", features: ["Bis zu 10 Seiten", "Professionelles individuelles Design", "Buchungs- oder Angebotsformulare", "Sichtbar in Google-Suchen", "Social-Media-Links", "Besucherstatistiken", "3 Monate Support"], cta: "Jetzt starten" },
    ecommerce: { name: "Online-Shop", why: "Alles was Sie brauchen um online zu verkaufen.", features: ["Unbegrenzte Produkte", "Warenkorb und Checkout", "Sichere Online-Zahlungen", "Bestandsverwaltung", "Bestellverfolgung", "Sichtbar in Google-Suchen", "6 Monate Support"], cta: "Jetzt starten" },
    custom: { name: "Individuelles System", why: "Gebaut exakt um Ihre Prozesse, Buchungen, Termine, Rechnungen, Lager, Buchhaltung oder alles zusammen.", features: ["Analyse Ihrer Geschaftsprozesse", "100% individuelles Design & Entwicklung", "Buchungen / Termine / Rechnungen / Lager", "Admin-Panel fur Ihr Team", "Team-Schulung inklusive", "Dedizierter Support"], cta: "Angebot anfordern" },
    label: "IHRE SCHATZUNG",
  },
  fr: {
    starter: { name: "Starter", why: "Un site propre et rapide pour etre en ligne.", features: ["Jusqu'a 5 pages", "Parfait sur mobile", "Formulaire de contact", "Hebergement inclus 1 an", "Connexion securisee", "1 mois de support"], cta: "Commencer" },
    business: { name: "Business", why: "Site professionnel avec tout ce qu'il faut pour grandir.", features: ["Jusqu'a 10 pages", "Design professionnel sur mesure", "Formulaires de reservation ou devis", "Visible sur Google", "Liens reseaux sociaux", "Statistiques visiteurs", "3 mois de support"], cta: "Commencer" },
    ecommerce: { name: "Boutique en Ligne", why: "Tout ce qu'il faut pour vendre en ligne.", features: ["Produits illimites", "Panier et paiement", "Paiements en ligne securises", "Gestion des stocks", "Suivi des commandes", "Visible sur Google", "6 mois de support"], cta: "Commencer" },
    custom: { name: "Systeme Sur Mesure", why: "Construit exactement autour de vos processus, reservations, rendez-vous, facturation, stock, comptabilite, ou tout ensemble.", features: ["Analyse de vos processus", "Design & developpement 100% sur mesure", "Reservations / rendez-vous / facturation / stock", "Panneau d'administration pour votre equipe", "Formation de l'equipe incluse", "Support dedie"], cta: "Demander un devis" },
    label: "VOTRE ESTIMATION",
  },
  es: {
    starter: { name: "Starter", why: "Un sitio limpio y rapido para estar en linea.", features: ["Hasta 5 paginas", "Perfecto en el movil", "Formulario de contacto", "Hosting incluido 1 ano", "Conexion segura", "1 mes de soporte"], cta: "Empezar" },
    business: { name: "Business", why: "Sitio profesional con todo lo que un negocio en crecimiento necesita.", features: ["Hasta 10 paginas", "Diseno profesional personalizado", "Formularios de reserva o presupuesto", "Visible en busquedas de Google", "Enlaces a redes sociales", "Estadisticas de visitantes", "3 meses de soporte"], cta: "Empezar" },
    ecommerce: { name: "Tienda Online", why: "Todo lo que necesitas para vender online.", features: ["Productos ilimitados", "Carrito y pago", "Pagos en linea seguros", "Gestion de inventario", "Seguimiento de pedidos", "Visible en busquedas de Google", "6 meses de soporte"], cta: "Empezar" },
    custom: { name: "Sistema a Medida", why: "Construido exactamente sobre tus procesos, reservas, citas, facturacion, stock, contabilidad o todo junto.", features: ["Analisis de tus procesos", "Diseno y desarrollo 100% a medida", "Reservas / citas / facturacion / stock", "Panel de administracion para tu equipo", "Formacion del equipo incluida", "Soporte dedicado"], cta: "Pedir presupuesto" },
    label: "TU ESTIMACION",
  }
}

const langNoteText: Record<Lang, (count: number, amount: number) => string> = {
  en: (n, a) => `+€${a} for ${n} extra language${n > 1 ? 's' : ''}`,
  ro: (n, a) => `+€${a} pentru ${n} ${n > 1 ? 'limbi in plus' : 'limba in plus'}`,
  de: (n, a) => `+€${a} fur ${n} zusatzliche Sprache${n > 1 ? 'n' : ''}`,
  fr: (n, a) => `+€${a} pour ${n} langue${n > 1 ? 's' : ''} supplementaire${n > 1 ? 's' : ''}`,
  es: (n, a) => `+€${a} por ${n} idioma${n > 1 ? 's' : ''} extra`,
}

const fromText: Record<Lang, string> = {
  en: "from", ro: "de la", de: "ab", fr: "a partir de", es: "desde"
}

const negotiableText: Record<Lang, string> = {
  en: "Final price may vary, always negotiable.",
  ro: "Pretul final poate varia, mereu negociabil.",
  de: "Endpreis kann variieren, immer verhandelbar.",
  fr: "Le prix final peut varier, toujours negociable.",
  es: "El precio final puede variar, siempre negociable.",
}

const priceOnRequestText: Record<Lang, string> = {
  en: "Custom quote", ro: "Pret la oferta", de: "Preis auf Anfrage", fr: "Sur devis", es: "Precio a medida"
}

const customNoteText: Record<Lang, string> = {
  en: "Depends on complexity. We reply within 24h with a concrete estimate.",
  ro: "Depinde de complexitate. Revenim in 24h cu o estimare concreta.",
  de: "Abhangig von der Komplexitat. Antwort in 24h mit konkreter Schatzung.",
  fr: "Selon la complexite. Reponse sous 24h avec une estimation concrete.",
  es: "Depende de la complejidad. Respondemos en 24h con una estimacion concreta.",
}

/* delivery window per tier, shown under the estimate ring */
const deliveryPlan: Record<Tier, { range: string, cells: number }> = {
  starter: { range: '5-7', cells: 7 },
  business: { range: '10-14', cells: 14 },
  ecommerce: { range: '14-21', cells: 18 },
  custom: { range: '21+', cells: 20 },
}

const deliveryText: Record<Lang, { label: string, unit: string }> = {
  en: { label: 'Estimated delivery', unit: 'working days' },
  ro: { label: 'Livrare estimata', unit: 'zile lucratoare' },
  de: { label: 'Geschatzte Lieferung', unit: 'Werktage' },
  fr: { label: 'Livraison estimee', unit: 'jours ouvres' },
  es: { label: 'Entrega estimada', unit: 'dias laborables' },
}

const breakdownText: Record<Lang, { base: string, langs: string, total: string }> = {
  en: { base: 'Base package', langs: 'Extra languages', total: 'Total estimate' },
  ro: { base: 'Pachet de baza', langs: 'Limbi in plus', total: 'Total estimat' },
  de: { base: 'Basispaket', langs: 'Zusatzliche Sprachen', total: 'Gesamtschatzung' },
  fr: { base: 'Forfait de base', langs: 'Langues supplementaires', total: 'Estimation totale' },
  es: { base: 'Paquete base', langs: 'Idiomas extra', total: 'Estimacion total' },
}

const packagesText: Record<Lang, { heading: string, sub: string, popular: string }> = {
  en: { heading: "Or pick a package directly", sub: "All packages include custom design, 1 year of hosting and SSL. Prices are starting points, always negotiable.", popular: "MOST POPULAR" },
  ro: { heading: "Sau alege direct un pachet", sub: "Toate pachetele includ design custom, hosting 1 an si SSL. Preturile sunt puncte de pornire, mereu negociabile.", popular: "CEL MAI ALES" },
  de: { heading: "Oder wahlen Sie direkt ein Paket", sub: "Alle Pakete enthalten individuelles Design, 1 Jahr Hosting und SSL. Preise sind Startpunkte, immer verhandelbar.", popular: "AM BELIEBTESTEN" },
  fr: { heading: "Ou choisissez directement un forfait", sub: "Tous les forfaits incluent design sur mesure, 1 an d'hebergement et SSL. Les prix sont des points de depart, toujours negociables.", popular: "LE PLUS CHOISI" },
  es: { heading: "O elige directamente un paquete", sub: "Todos los paquetes incluyen diseno a medida, 1 ano de hosting y SSL. Los precios son puntos de partida, siempre negociables.", popular: "EL MAS ELEGIDO" },
}

const growthText: Record<Lang, { title: string, body: string, cta: string }> = {
  en: { title: "Monthly growth, SEO, backlinks, Meta & Google Ads", body: "A monthly subscription tailored to your goals: campaigns, link building, content and reporting. We show you exactly what you get before you pay anything.", cta: "Talk to us" },
  ro: { title: "Crestere lunara, SEO, backlinkuri, Meta & Google Ads", body: "Abonament lunar adaptat obiectivelor tale: campanii, backlinkuri, continut si rapoarte. Iti aratam exact ce primesti inainte sa platesti ceva.", cta: "Discuta cu noi" },
  de: { title: "Monatliches Wachstum, SEO, Backlinks, Meta & Google Ads", body: "Ein monatliches Abo nach Ihren Zielen: Kampagnen, Linkaufbau, Content und Reports. Wir zeigen Ihnen genau, was Sie bekommen, bevor Sie zahlen.", cta: "Sprechen Sie mit uns" },
  fr: { title: "Croissance mensuelle, SEO, backlinks, Meta & Google Ads", body: "Un abonnement mensuel adapte a vos objectifs : campagnes, netlinking, contenu et rapports. On vous montre exactement ce que vous recevez avant de payer.", cta: "Parlons-en" },
  es: { title: "Crecimiento mensual, SEO, backlinks, Meta & Google Ads", body: "Una suscripcion mensual adaptada a tus objetivos: campanas, link building, contenido e informes. Te mostramos exactamente que recibes antes de pagar nada.", cta: "Habla con nosotros" },
}

// q0: intent            (0=presentation site, 1=online store, 2=business system, 3=site+marketing)
// q1: business type     (0=local, 1=online store, 2=freelancer, 3=company)
// q2: purpose           (0=informational, 1=sell online, 2=bookings, 3=all)
// q3: size              (0=small, 1=medium, 2=large, 3=not sure)
// q4: languages         (0=one, 1=two, 2=three, 3=four+)
// q5: readiness         (0=all set, 1=some things, 2=nothing, 3=old site)
// q6: discovery         (0=share link, 1=google, 2=both, 3=not sure)
function getRecommendation(answers: (number | null)[]): Tier {
  const [intent, business, purpose, size, , readiness, discovery] = answers

  // Explicit intent shortcuts
  if (intent === 2) return 'custom'
  if (intent === 1) return 'ecommerce'

  // Sell online → ecommerce
  if (purpose === 1) return 'ecommerce'
  if (purpose === 3) return 'ecommerce'

  // Online store business type + not purely informational → ecommerce
  if (business === 1 && purpose !== 0) return 'ecommerce'

  // Large site or need everything from scratch → business
  if (size === 2) return 'business'
  if (readiness === 2 && size !== 0) return 'business'

  // Company/startup → business
  if (business === 3) return 'business'

  // Need Google visibility → business
  if (discovery === 1 || discovery === 2) return 'business'

  // Old site as base + bookings → business
  if (readiness === 3 && purpose === 2) return 'business'

  // Small informational site + all set or sharing link → starter
  if (size === 0 && purpose === 0) return 'starter'

  // Freelancer + informational + small/medium → starter
  if (business === 2 && purpose === 0 && (size === 0 || size === 1)) return 'starter'

  // Has everything ready + small site → starter
  if (readiness === 0 && size === 0) return 'starter'

  // Everything else → business
  return 'business'
}

function getLangAddon(langAnswer: number | null): { extraCount: number, addon: number, isMinimum: boolean } {
  const extras = [0, 1, 2, 3]
  const count = extras[langAnswer ?? 0] ?? 0
  return {
    extraCount: count,
    addon: count * LANG_ADDON,
    isMinimum: langAnswer === 3,
  }
}

export default function PricingPage() {
  const { language } = useLanguage()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL_STEPS).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'in' | 'out'>('in')
  const [selectedFlash, setSelectedFlash] = useState<number | null>(null)
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lang = language as Lang
  const q = questions[lang]
  const r = results[lang]

  const advanceToStep = useCallback((target: number) => {
    setSlideDirection('out')
    setTimeout(() => {
      if (target >= TOTAL_STEPS) {
        setShowResult(true)
      } else {
        setStep(target)
      }
      setSlideDirection('in')
    }, 200)
  }, [])

  const selectAnswer = useCallback((optionIndex: number) => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)

    setAnswers(prev => {
      const next = [...prev]
      next[step] = optionIndex
      return next
    })
    setSelectedFlash(optionIndex)

    autoAdvanceRef.current = setTimeout(() => {
      setSelectedFlash(null)
      advanceToStep(step + 1)
    }, 400)
  }, [step, advanceToStep])

  const goToStep = useCallback((target: number) => {
    if (target >= step && !showResult) return
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)
    setSelectedFlash(null)
    setSlideDirection('out')
    setTimeout(() => {
      setShowResult(false)
      setStep(target)
      setSlideDirection('in')
    }, 200)
  }, [step, showResult])

  const resetInterview = useCallback(() => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)
    setSlideDirection('out')
    setTimeout(() => {
      setStep(0)
      setAnswers(Array(TOTAL_STEPS).fill(null))
      setShowResult(false)
      setSelectedFlash(null)
      setSlideDirection('in')
    }, 200)
  }, [])

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)
    }
  }, [])

  const recommendation = getRecommendation(answers)
  const result = r[recommendation]
  const isCustom = recommendation === 'custom'
  const { extraCount, addon, isMinimum } = getLangAddon(answers[4])
  const basePrice = BASE_PRICES[recommendation]
  const totalPrice = basePrice !== null ? basePrice + addon : null

  const getContactURL = () => {
    const subject = totalPrice !== null ? `${result.name} (€${totalPrice})` : result.name
    return `mailto:contact@landings.md?subject=${encodeURIComponent(subject)}`
  }

  const startOverText: Record<Lang, string> = { en: "Start over", ro: "Reincepe", de: "Neu starten", fr: "Recommencer", es: "Empezar de nuevo" }


  const progressPercent = showResult ? 100 : (step / TOTAL_STEPS) * 100
  const hdr = headerText[lang]
  const pk = packagesText[lang]
  const growth = growthText[lang]
  const tiers: Tier[] = ['starter', 'business', 'ecommerce', 'custom']
  const tierIndex = tiers.indexOf(recommendation)
  /* the result ring visualises where the recommended tier sits in the range */
  const ringOffset = Math.round(264 - 264 * ((tierIndex + 1) / tiers.length))
  const delivery = deliveryPlan[recommendation]
  const dl = deliveryText[lang]
  const bd = breakdownText[lang]

  /* every package tier wears its own visual, never the same one twice */
  const tierVisual: Record<'starter' | 'business' | 'ecommerce', React.ReactNode> = {
    starter: <Gauge value={0.58} className="shrink-0" />,
    business: <Concentric className="shrink-0" />,
    ecommerce: <DonutSplit parts={[0.46, 0.32, 0.22]} className="shrink-0" />,
  }

  return (
    <main className="min-h-screen text-white" style={{ background: '#0d0d0d' }}>

      <SiteNav contactHref="/#contact" />

      {/* ════════ HEADER BENTO : hero cell + three live stat cells ════════ */}
      <section className="nv-container pb-8 pt-3 md:pb-12 md:pt-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-3">

          {/* hero cell */}
          <Reveal className="min-w-0 md:col-span-8 md:row-span-3">
            <div className="nv-edge h-full">
              <div className="nv-edge-inner nv-inset--soft relative flex h-full flex-col overflow-hidden p-6 md:p-10">
                <div
                  aria-hidden
                  className="nv-blob-spin absolute left-1/2 top-full h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full"
                  style={{
                    background: 'conic-gradient(from 30deg, #FF9E7A, #f2d06f, #d23b33, #7a4df0, #FF9E7A)',
                    filter: 'saturate(1.1) blur(90px)',
                    opacity: 0.45,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute left-1/2 bottom-0 h-40 w-[70%] -translate-x-1/2 translate-y-1/2 rounded-full"
                  style={{ background: '#fff', filter: 'blur(110px)', opacity: 0.18 }}
                />
                <div className="ribbed ribbed--flat" aria-hidden style={{ position: 'absolute', inset: 0, borderTop: 'none' }} />

                <div className="relative z-[1] flex h-full flex-col justify-center">
                  <Label>{hdr.label}</Label>
                  <h1
                    className="mt-4 font-bold"
                    style={{ fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', lineHeight: 1.02, letterSpacing: '-0.055em' }}
                  >
                    <Marked text={hdr.heading} />
                  </h1>
                  <p
                    className="mt-4 max-w-[620px] font-medium"
                    style={{ color: '#b8b8b9', fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', lineHeight: 1.4, letterSpacing: '-0.02em' }}
                  >
                    {hdr.sub}
                  </p>
                  <span className="chip chip--em mt-6 max-w-full self-start">
                    <span className="chip-inner max-w-full justify-center !whitespace-normal px-4 !py-2 text-center !text-[12px] leading-snug md:!whitespace-nowrap md:!text-[13px]">
                      {negotiableText[lang]}
                    </span>
                  </span>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a href="#wizard" className="btn-metal">
                      <span>{r.starter.cta}</span>
                      <span className="nv-arr" aria-hidden>&rarr;</span>
                    </a>
                    <a href="#packages" className="btn-metal">
                      <span>{packagesLabelText[lang]}</span>
                      <span className="nv-arr" aria-hidden>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* package range, proportion bars comparing the three tiers */}
          <Reveal delay={0.05} className="min-w-0 md:col-span-4">
            <div className="nv-edge nv-edge--ring nv-cell h-full">
              <div className="nv-edge-inner nv-inset flex h-full items-center justify-between gap-4 p-5 md:p-6">
                <div className="min-w-0">
                  <span className="block text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
                    {packagesLabelText[lang]}
                  </span>
                  <span
                    className="mt-2 block whitespace-nowrap font-semibold"
                    style={{ fontSize: 'clamp(1.5rem, 2vw, 1.9rem)', letterSpacing: '-0.04em', lineHeight: 1, color: LIME }}
                  >
                    <span className="mr-1.5 text-[12px] font-medium" style={{ color: '#909099', letterSpacing: 0 }}>{fromText[lang]}</span>
                    €350
                  </span>
                  <span className="mt-1.5 block whitespace-nowrap text-[11px] font-medium" style={{ color: '#b8b8b9' }}>€350 · €550 · €850</span>
                </div>
                <div className="w-24 shrink-0">
                  <StackBars rows={[0.41, 0.65, 1]} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* languages, one charged segment per language */}
          <Reveal delay={0.08} className="min-w-0 md:col-span-4">
            <div className="nv-edge nv-edge--ring nv-cell h-full">
              <div className="nv-edge-inner nv-inset flex h-full items-center justify-between gap-4 p-5 md:p-6">
                <div className="min-w-0">
                  <span
                    className="block whitespace-nowrap font-semibold"
                    style={{ fontSize: 'clamp(0.9375rem, 1.3vw, 1.125rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    EN · RO · DE · FR · ES
                  </span>
                  <span className="mt-2 block text-[12px] font-medium" style={{ color: '#909099' }}>
                    {langNoteText[lang](1, LANG_ADDON)}
                  </span>
                </div>
                <SegmentMeter total={5} filled={5} className="shrink-0" />
              </div>
            </div>
          </Reveal>

          {/* 24h reply, a single orbit sweep, one day, one lap */}
          <Reveal delay={0.11} className="min-w-0 md:col-span-4">
            <div className="nv-edge nv-edge--ring nv-cell h-full">
              <div className="nv-edge-inner nv-inset flex h-full items-center gap-4 p-5 md:p-6">
                <Orbit className="shrink-0" />
                <div className="min-w-0">
                  <span
                    className="block font-semibold"
                    style={{ fontSize: 'clamp(1.25rem, 1.6vw, 1.6rem)', letterSpacing: '-0.04em', lineHeight: 1, color: LIME }}
                  >
                    24h
                  </span>
                  <span className="mt-1.5 block text-[11px] font-medium leading-tight" style={{ color: '#909099' }}>
                    {customNoteText[lang]}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* coral horizon seam into the wizard */}
      <div className="nv-container">
        <div className="nv-seam" />
      </div>

      {/* ════════ WIZARD, one deep well with a bar-row progress meter ════════ */}
      <section id="wizard">
        <div className="nv-container flex justify-center pb-14 pt-10 md:pb-20 md:pt-14">
          <Reveal className="w-full max-w-4xl">
            <div className="nv-edge">
              <div className="nv-edge-inner nv-well relative p-5 md:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 h-36 w-[420px] -translate-x-1/2 -translate-y-1/2"
                  style={{ background: 'radial-gradient(closest-side, rgba(255,158,122,0.20), transparent)' }}
                />

                {/* Progress: bar row that fills coral as steps complete */}
                <div className="relative mb-9">
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <div className="flex flex-1 items-end gap-3">
                      {(step > 0 || showResult) && (
                        <button
                          onClick={() => showResult ? goToStep(TOTAL_STEPS - 1) : goToStep(step - 1)}
                          className="mb-0.5 text-[#909099] transition-colors duration-150 ease-out hover:text-white"
                          aria-label="Go back"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M12 5l-7 7 7 7" />
                          </svg>
                        </button>
                      )}
                      <div className="flex h-8 flex-1 items-end gap-1.5 md:max-w-[420px]">
                        {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                          const isCompleted = answers[i] !== null && (i < step || showResult)
                          const isCurrent = i === step && !showResult
                          const done = showResult || isCompleted
                          return (
                            <button
                              key={i}
                              onClick={() => isCompleted ? goToStep(i) : undefined}
                              className="nv-bar flex-1 rounded-[3px]"
                              style={{
                                height: `${44 + i * 9}%`,
                                ['--i' as string]: i,
                                background: done ? LIME : isCurrent ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.1)',
                                boxShadow: done ? '0 0 10px rgba(255,158,122,0.45)' : undefined,
                                cursor: isCompleted ? 'pointer' : 'default',
                                transition: 'background 0.18s ease-out, box-shadow 0.18s ease-out',
                              } as React.CSSProperties}
                              aria-label={`Step ${i + 1}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                    <span className="shrink-0 text-[12px] font-medium tabular-nums tracking-[0.14em]" style={{ color: '#909099' }}>
                      {showResult ? String(TOTAL_STEPS).padStart(2, '0') : String(step + 1).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/10">
                    <div
                      className="h-full transition-[width] duration-300 ease-out"
                      style={{ width: `${progressPercent}%`, background: LIME, boxShadow: '0 0 8px rgba(255, 158, 122, 0.5)' }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`relative transition-[opacity,transform] duration-200 ease-out ${slideDirection === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>

                  {!showResult ? (
                    <>
                      <h2
                        className="mb-8 text-center font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.05] text-white md:mb-10"
                        style={{ letterSpacing: '-0.05em' }}
                      >
                        {q[step].question}
                      </h2>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {q[step].options.map((option, i) => {
                          const isSelected = selectedFlash === i || answers[step] === i
                          return (
                            <button
                              key={i}
                              onClick={() => selectAnswer(i)}
                              className={`nv-edge nv-edge--ring group text-left transition-[transform,box-shadow] duration-[180ms] ease-out hover:-translate-y-[2px]${q[step].options.length % 2 !== 0 && i === q[step].options.length - 1 ? ' sm:col-span-2' : ''}`}
                              style={isSelected ? { boxShadow: '0 0 1px 1px #FF9E7A, 0 12px 34px -12px rgba(255, 158, 122, 0.35)' } : undefined}
                            >
                              <span
                                className={`nv-edge-inner nv-inset flex h-full items-center gap-3 px-5 py-4 text-[15px] font-medium leading-[1.3] transition-colors duration-150 ease-out ${
                                  isSelected ? 'text-white' : 'text-[#b8b8b9] group-hover:text-white'
                                }`}
                                style={isSelected ? { background: '#241512' } : undefined}
                              >
                                <span
                                  aria-hidden
                                  className="flex-none text-[11px] font-semibold tabular-nums tracking-[0.1em] transition-colors duration-150 ease-out"
                                  style={{ color: isSelected ? LIME : '#6a6a72' }}
                                >
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="min-w-0 flex-1">{option}</span>
                                <span
                                  aria-hidden
                                  className={`flex-none rotate-[-45deg] transition-[opacity,transform] duration-[180ms] ease-out ${
                                    isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                                  }`}
                                  style={{ color: LIME }}
                                >
                                  &rarr;
                                </span>
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,300px)_1fr]">

                      {/* the estimate: counted number inside a tier ring */}
                      <div className="nv-edge nv-edge--ring">
                        <div className="nv-edge-inner nv-inset flex flex-col items-center p-6 text-center">
                          <span className="text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
                            {r.label}
                          </span>

                          <div className="relative mt-5 h-[152px] w-[152px]">
                            <svg width="152" height="152" viewBox="0 0 96 96" aria-hidden>
                              <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                              <circle
                                cx="48" cy="48" r="42" fill="none"
                                stroke={LIME} strokeWidth="6" strokeLinecap="round"
                                strokeDasharray="264" strokeDashoffset={ringOffset}
                                transform="rotate(-90 48 48)"
                                className="nv-ring-main"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                              {totalPrice !== null ? (
                                <>
                                  {isMinimum && (
                                    <span className="text-[11px] font-medium" style={{ color: '#909099' }}>{fromText[lang]}</span>
                                  )}
                                  <span
                                    className="font-semibold tabular-nums"
                                    style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.4rem)', letterSpacing: '-0.05em', lineHeight: 1, color: LIME }}
                                  >
                                    <Odometer key={totalPrice} value={totalPrice} prefix="€" />
                                  </span>
                                </>
                              ) : (
                                <span
                                  className="font-semibold"
                                  style={{ fontSize: '1.0625rem', letterSpacing: '-0.03em', lineHeight: 1.15, color: LIME }}
                                >
                                  {priceOnRequestText[lang]}
                                </span>
                              )}
                              <span className="mt-2 text-[11px] font-medium tabular-nums" style={{ color: '#909099' }}>
                                {String(tierIndex + 1).padStart(2, '0')} / {String(tiers.length).padStart(2, '0')}
                              </span>
                            </div>
                          </div>

                          {/* what the estimate is made of, only when there is something to break down */}
                          {!isCustom && basePrice !== null && totalPrice !== null && extraCount > 0 && (
                            <div className="mt-6 w-full border-t border-white/[0.07] pt-5 text-left">
                              <div className="flex items-baseline justify-between gap-3 text-[12px] font-medium">
                                <span style={{ color: '#909099' }}>{bd.base}</span>
                                <span className="tabular-nums" style={{ color: '#e0e0e2' }}>€{basePrice}</span>
                              </div>
                              <div className="mt-2 flex items-baseline justify-between gap-3 text-[12px] font-medium">
                                <span style={{ color: '#909099' }}>{bd.langs} ({extraCount})</span>
                                <span className="tabular-nums" style={{ color: '#e0e0e2' }}>+€{addon}</span>
                              </div>
                              <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-white/[0.07] pt-3 text-[12px] font-semibold">
                                <span style={{ color: '#b8b8b9' }}>{bd.total}</span>
                                <span className="tabular-nums" style={{ color: LIME }}>€{totalPrice}</span>
                              </div>
                            </div>
                          )}

                          {/* estimated delivery, one lit cell per working day */}
                          <div className="mt-6 w-full border-t border-white/[0.07] pt-5 text-left">
                            <span className="block text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: '#909099' }}>
                              {dl.label}
                            </span>
                            <p className="mt-1.5 text-[13px] font-medium leading-[1.3]">
                              <span className="font-semibold tabular-nums" style={{ color: LIME, letterSpacing: '-0.02em' }}>{delivery.range}</span>
                              <span style={{ color: '#909099' }}> {dl.unit}</span>
                            </p>
                            <HeatGrid
                              cols={10}
                              rows={2}
                              lit={Array.from({ length: delivery.cells }, (_, i) => i)}
                              className="mt-3 w-full"
                            />
                          </div>

                          <p className="mt-5 text-[12px] font-medium leading-[1.35]" style={{ color: '#909099' }}>
                            {isCustom ? customNoteText[lang] : negotiableText[lang]}
                          </p>
                        </div>
                      </div>

                      {/* what you get */}
                      <div className="nv-edge h-full">
                        <div className="nv-edge-inner nv-inset flex h-full flex-col p-6 md:p-8">
                          <div className="flex items-start justify-between gap-4">
                            <h2 className="font-bold text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.0] text-white" style={{ letterSpacing: '-0.06em' }}>
                              {result.name}
                            </h2>
                            <span className="mt-1 shrink-0 text-[11px] font-medium tabular-nums tracking-[0.14em]" style={{ color: '#909099' }}>
                              {String(tierIndex + 1).padStart(2, '0')} / {String(tiers.length).padStart(2, '0')}
                            </span>
                          </div>

                          <p className="mt-3 text-[15px] font-medium leading-[1.4]" style={{ color: '#b8b8b9' }}>
                            {result.why}
                          </p>

                          <div className="mt-6 border-t border-white/[0.07]">
                            {result.features.map((feature, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-3 border-b border-white/[0.07] py-2.5"
                                style={{ animation: `fadeInUp 300ms ease-out ${i * 45}ms both` }}
                              >
                                <svg
                                  aria-hidden
                                  className="mt-[3px] h-4 w-4 flex-none"
                                  fill="none"
                                  stroke={LIME}
                                  strokeWidth={2.2}
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[14px] font-medium leading-[1.3]" style={{ color: '#e0e0e2' }}>{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex-1" />

                          <div className="mt-7 flex flex-wrap items-center gap-4">
                            <Link href={getContactURL()} className="btn-metal">
                              <span>{result.cta}</span>
                              <span className="nv-arr" aria-hidden>&rarr;</span>
                            </Link>
                            <button
                              onClick={resetInterview}
                              className="text-[12px] font-medium transition-colors duration-150 ease-out hover:text-white"
                              style={{ color: '#909099' }}
                            >
                              {startOverText[lang]}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* coral horizon seam between wizard and packages */}
      <div className="nv-container">
        <div className="nv-seam" />
      </div>

      {/* ════════ PACKAGES, gradient depth cards in a bento ════════ */}
      <section id="packages">
        <div className="nv-container py-14 md:py-20">
          <Reveal>
            <div className="mb-10 text-center md:mb-14">
              <Label>{packagesLabelText[lang]}</Label>
              <h2 className="mx-auto mt-4 mb-4 font-bold text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05] text-white" style={{ letterSpacing: '-0.055em' }}>
                {pk.heading}
              </h2>
              <p className="mx-auto max-w-xl text-[15px] font-medium leading-[1.4]" style={{ color: '#909099' }}>{pk.sub}</p>
            </div>
          </Reveal>

          {/* three priced tiers */}
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
            {(['starter', 'business', 'ecommerce'] as Tier[]).map((tier, ti) => {
              const tr = r[tier]
              const price = BASE_PRICES[tier]
              const isPopular = tier === 'business'
              const mailHref = `mailto:contact@landings.md?subject=${encodeURIComponent(price !== null ? `${tr.name} (€${price})` : tr.name)}`

              const inner = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {isPopular ? (
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: LIME }}>
                          {pk.popular}
                        </span>
                      ) : (
                        <span className="block text-[11px] font-medium tabular-nums tracking-[0.14em]" style={{ color: '#909099' }}>
                          {String(ti + 1).padStart(2, '0')} / {String(tiers.length).padStart(2, '0')}
                        </span>
                      )}
                      <h3 className="mt-2 text-[20px] font-medium text-white" style={{ letterSpacing: '-0.02em' }}>{tr.name}</h3>
                    </div>
                    {tierVisual[tier as 'starter' | 'business' | 'ecommerce']}
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-[2.5rem] leading-[1.05] text-white" style={{ letterSpacing: '-0.04em' }}>
                      <span className="mr-1.5 text-[13px] font-normal" style={{ color: '#909099', letterSpacing: 0 }}>{fromText[lang]}</span>
                      €{price}
                    </p>
                  </div>

                  <p className="mt-4 text-[13px] font-medium leading-[1.4]" style={{ color: '#909099' }}>{tr.why}</p>

                  <div className={`mt-5 flex-1 border-t ${isPopular ? 'border-white/10' : 'border-white/[0.07]'}`}>
                    {tr.features.map((f, fi) => (
                      <div key={fi} className={`border-b py-2.5 text-[14px] font-medium leading-[1.3] ${isPopular ? 'border-white/10' : 'border-white/[0.07]'}`} style={{ color: '#b8b8b9' }}>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="mb-6 mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[12px] font-medium">
                    <span style={{ color: '#909099' }}>{dl.label}</span>
                    <span style={{ color: '#e0e0e2' }}>
                      <span className="tabular-nums">{deliveryPlan[tier].range}</span> {dl.unit}
                    </span>
                  </div>

                  <Link href={mailHref} className="btn-metal w-full">
                    <span>{tr.cta}</span>
                    <span className="nv-arr" aria-hidden>&rarr;</span>
                  </Link>
                </>
              )

              return (
                <Reveal key={tier} delay={ti * 0.06} className="h-full">
                  {isPopular ? (
                    /* featured tier: warm tinted glass, coral border, coral under-glow */
                    <div
                      className="nv-card3d flex h-full flex-col rounded-[30px] border-2 p-6 md:p-7"
                      style={{
                        background: '#241512',
                        borderColor: '#6d3f2e',
                        boxShadow: '0 14px 44px -8px rgba(255, 158, 122, 0.30)',
                      }}
                    >
                      {inner}
                    </div>
                  ) : (
                    <div className="nv-edge nv-edge--ring nv-card3d h-full">
                      <div className="nv-edge-inner nv-inset flex h-full flex-col p-6 md:p-7">
                        {inner}
                      </div>
                    </div>
                  )}
                </Reveal>
              )
            })}
          </div>

          {/* the custom system, a wide depth card */}
          <Reveal delay={0.18}>
            <div className="nv-edge nv-edge--alt nv-edge--ring mt-4">
              <div className="nv-edge-inner nv-inset flex flex-col gap-7 p-6 md:flex-row md:items-stretch md:gap-10 md:p-9">
                <div className="flex min-w-0 flex-col md:w-[300px] md:flex-none">
                  <span className="block text-[11px] font-medium tabular-nums tracking-[0.14em]" style={{ color: '#909099' }}>
                    {String(tiers.length).padStart(2, '0')} / {String(tiers.length).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-[22px] font-medium text-white" style={{ letterSpacing: '-0.03em' }}>{r.custom.name}</h3>
                  <p className="mt-3 font-semibold text-[1.5rem] leading-[1.15] text-white" style={{ letterSpacing: '-0.04em' }}>
                    {priceOnRequestText[lang]}
                  </p>
                  {/* a live system in motion, not another node chain */}
                  <WaveLine className="mt-4" />
                  <p className="mt-4 text-[13px] font-medium leading-[1.4]" style={{ color: '#909099' }}>{r.custom.why}</p>
                  <div className="flex-1" />
                  <Link
                    href={`mailto:contact@landings.md?subject=${encodeURIComponent(r.custom.name)}`}
                    className="btn-metal mt-6 self-start"
                  >
                    <span>{r.custom.cta}</span>
                    <span className="nv-arr" aria-hidden>&rarr;</span>
                  </Link>
                </div>

                <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                  {r.custom.features.map((f, fi) => (
                    <div key={fi} className="nv-edge h-full">
                      <div className="nv-edge-inner nv-inset flex h-full items-center justify-center gap-3 p-5 text-center md:p-6">
                        <svg
                          aria-hidden
                          className="h-4 w-4 flex-none"
                          fill="none"
                          stroke={LIME}
                          strokeWidth={2.2}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[13px] font-medium leading-[1.35]" style={{ color: '#e0e0e2' }}>{f}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Monthly growth strip */}
          <Reveal delay={0.24}>
            <div className="nv-edge nv-edge--ring mt-4">
              <div className="nv-edge-inner nv-inset flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-10 md:p-9">
                <Sparkline points={[6, 9, 8, 14, 12, 19, 26, 24, 35, 46]} className="hidden shrink-0 md:block" />
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-[clamp(1.25rem,2.2vw,1.5rem)] font-semibold leading-[1.15] text-white" style={{ letterSpacing: '-0.04em' }}>{growth.title}</h3>
                  <p className="max-w-2xl text-[15px] font-medium leading-[1.4]" style={{ color: '#909099' }}>{growth.body}</p>
                </div>
                <Link
                  href={`mailto:contact@landings.md?subject=${encodeURIComponent('SEO & Ads')}`}
                  className="btn-metal flex-shrink-0 self-start md:self-auto"
                >
                  <span>{growth.cta}</span>
                  <span className="nv-arr" aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01s !important; }
        }
      `}</style>
      <SiteFooter />

    </main>
  )
}
