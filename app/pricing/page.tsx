"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { SiteNav } from '@/components/ui/site-nav'

type Lang = 'en' | 'ro' | 'de' | 'fr' | 'es'
type Tier = 'starter' | 'business' | 'ecommerce' | 'custom'

const TOTAL_STEPS = 7
const LANG_ADDON = 50
const BASE_PRICES: Record<Tier, number | null> = { starter: 350, business: 550, ecommerce: 850, custom: null }

const questions = {
  en: [
    { question: "What are you looking for?", options: ["A presentation website", "An online store", "A business system — bookings, invoicing, stock", "Website + marketing (SEO & Ads)"] },
    { question: "What best describes your business?", options: ["Local business", "Online store or brand", "Freelancer or consultant", "Company or startup"] },
    { question: "What should your website do?", options: ["Show who I am and how to reach me", "Let people buy from me directly", "Let people book or request a quote", "All of the above"] },
    { question: "How big should your site be?", options: ["Small — a few pages", "Medium — several sections", "Large — lots of content or products", "Not sure yet"] },
    { question: "Do you need it in multiple languages?", options: ["No, just one", "Yes, 2 languages", "Yes, 3 languages", "4 or more"] },
    { question: "What do you already have ready?", options: ["Logo, photos, and text — all set", "Some things, need help with the rest", "Nothing yet — I need everything", "I have an old website to work from"] },
    { question: "How will people find your site?", options: ["I'll share the link myself", "They should find me on Google", "Both", "Not sure yet"] },
  ],
  ro: [
    { question: "Ce cauti?", options: ["Un site de prezentare", "Un magazin online", "Un sistem pentru afacere — rezervari, facturare, stoc", "Site + promovare (SEO & Ads)"] },
    { question: "Ce descrie cel mai bine afacerea ta?", options: ["Afacere locala", "Magazin online sau brand", "Freelancer sau consultant", "Companie sau startup"] },
    { question: "Ce ar trebui sa faca site-ul tau?", options: ["Sa arate cine sunt si cum ma contactezi", "Sa lase lumea sa cumpere direct", "Sa lase lumea sa faca rezervari", "Toate cele de mai sus"] },
    { question: "Cat de mare ar trebui sa fie?", options: ["Mic — cateva pagini", "Mediu — mai multe sectiuni", "Mare — mult continut sau produse", "Nu sunt sigur inca"] },
    { question: "Ai nevoie de mai multe limbi?", options: ["Nu, doar una", "Da, 2 limbi", "Da, 3 limbi", "4 sau mai multe"] },
    { question: "Ce ai deja pregatit?", options: ["Logo, poze si text — totul e gata", "Cateva lucruri, am nevoie de ajutor cu restul", "Nimic inca — am nevoie de tot", "Am un site vechi de la care pot pleca"] },
    { question: "Cum te vor gasi clientii?", options: ["Le trimit eu linkul", "Ar trebui sa ma gaseasca pe Google", "Ambele", "Nu sunt sigur inca"] },
  ],
  de: [
    { question: "Was suchen Sie?", options: ["Eine Prasentations-Website", "Einen Online-Shop", "Ein Business-System — Buchungen, Rechnungen, Lager", "Website + Marketing (SEO & Ads)"] },
    { question: "Was beschreibt Ihr Geschaft am besten?", options: ["Lokales Geschaft", "Online-Shop oder Marke", "Freelancer oder Berater", "Unternehmen oder Startup"] },
    { question: "Was soll Ihre Website konnen?", options: ["Zeigen wer ich bin und wie man mich erreicht", "Leute direkt kaufen lassen", "Leute buchen oder anfragen lassen", "Alles zusammen"] },
    { question: "Wie gross soll Ihre Seite sein?", options: ["Klein — ein paar Seiten", "Mittel — mehrere Bereiche", "Gross — viel Inhalt oder Produkte", "Noch nicht sicher"] },
    { question: "Brauchen Sie mehrere Sprachen?", options: ["Nein, nur eine", "Ja, 2 Sprachen", "Ja, 3 Sprachen", "4 oder mehr"] },
    { question: "Was haben Sie schon bereit?", options: ["Logo, Fotos und Text — alles fertig", "Einiges, brauche Hilfe mit dem Rest", "Noch nichts — brauche alles", "Ich habe eine alte Website als Grundlage"] },
    { question: "Wie werden Leute Ihre Seite finden?", options: ["Ich teile den Link selbst", "Sie sollen mich bei Google finden", "Beides", "Noch nicht sicher"] },
  ],
  fr: [
    { question: "Que cherchez-vous ?", options: ["Un site vitrine", "Une boutique en ligne", "Un systeme metier — reservations, facturation, stock", "Site + marketing (SEO & Ads)"] },
    { question: "Qu'est-ce qui decrit le mieux votre activite ?", options: ["Commerce local", "Boutique en ligne ou marque", "Freelance ou consultant", "Entreprise ou startup"] },
    { question: "Que doit faire votre site ?", options: ["Montrer qui je suis et comment me contacter", "Permettre d'acheter directement", "Permettre de reserver ou demander un devis", "Tout cela"] },
    { question: "Quelle taille pour votre site ?", options: ["Petit — quelques pages", "Moyen — plusieurs sections", "Grand — beaucoup de contenu ou produits", "Pas encore sur"] },
    { question: "Avez-vous besoin de plusieurs langues ?", options: ["Non, une seule", "Oui, 2 langues", "Oui, 3 langues", "4 ou plus"] },
    { question: "Qu'avez-vous deja de pret ?", options: ["Logo, photos et texte — tout est pret", "Quelques elements, besoin d'aide pour le reste", "Rien encore — j'ai besoin de tout", "J'ai un ancien site comme base"] },
    { question: "Comment les gens trouveront votre site ?", options: ["Je partagerai le lien moi-meme", "Ils devraient me trouver sur Google", "Les deux", "Pas encore sur"] },
  ],
  es: [
    { question: "Que buscas?", options: ["Una web de presentacion", "Una tienda online", "Un sistema de negocio — reservas, facturacion, stock", "Web + marketing (SEO & Ads)"] },
    { question: "Que describe mejor tu negocio?", options: ["Negocio local", "Tienda online o marca", "Freelancer o consultor", "Empresa o startup"] },
    { question: "Que deberia hacer tu sitio web?", options: ["Mostrar quien soy y como contactarme", "Dejar que la gente compre directamente", "Dejar que la gente reserve o pida presupuesto", "Todo lo anterior"] },
    { question: "Que tan grande deberia ser?", options: ["Pequeno — unas pocas paginas", "Mediano — varias secciones", "Grande — mucho contenido o productos", "No estoy seguro aun"] },
    { question: "Necesitas varios idiomas?", options: ["No, solo uno", "Si, 2 idiomas", "Si, 3 idiomas", "4 o mas"] },
    { question: "Que tienes listo ya?", options: ["Logo, fotos y texto — todo listo", "Algunas cosas, necesito ayuda con el resto", "Nada todavia — necesito todo", "Tengo un sitio viejo como base"] },
    { question: "Como encontrara la gente tu sitio?", options: ["Yo compartire el enlace", "Deberian encontrarme en Google", "Ambos", "No estoy seguro aun"] },
  ]
}

const results: Record<Lang, Record<Tier, { name: string, why: string, features: string[], cta: string }> & { label: string }> = {
  en: {
    starter: { name: "Starter", why: "A clean, fast website to get you online.", features: ["Up to 5 pages", "Works perfectly on phones", "Contact form", "Hosting included for 1 year", "Secure connection", "1 month of support"], cta: "Get started" },
    business: { name: "Business", why: "Professional site with everything a growing business needs.", features: ["Up to 10 pages", "Professional custom design", "Booking or quote forms", "Visible on Google searches", "Social media links", "Visitor statistics", "3 months of support"], cta: "Get started" },
    ecommerce: { name: "Online Store", why: "Everything you need to sell online.", features: ["Unlimited products", "Cart and checkout", "Secure online payments", "Stock management", "Order tracking", "Visible on Google searches", "6 months of support"], cta: "Get started" },
    custom: { name: "Custom System", why: "Built exactly around your processes — bookings, appointments, invoicing, stock, accounting, or all of them together.", features: ["Analysis of your business processes", "100% custom design & development", "Bookings / appointments / invoicing / stock", "Admin panel for your team", "Team training included", "Dedicated support"], cta: "Request a quote" },
    label: "YOUR ESTIMATE",
  },
  ro: {
    starter: { name: "Starter", why: "Un site curat si rapid ca sa fii online.", features: ["Pana la 5 pagini", "Functioneaza perfect pe telefon", "Formular de contact", "Hosting inclus 1 an", "Conexiune securizata", "1 luna de suport"], cta: "Incepe acum" },
    business: { name: "Business", why: "Site profesional cu tot ce are nevoie o afacere in crestere.", features: ["Pana la 10 pagini", "Design profesional personalizat", "Formulare de rezervare sau oferta", "Vizibil in cautarile Google", "Linkuri social media", "Statistici vizitatori", "3 luni de suport"], cta: "Incepe acum" },
    ecommerce: { name: "Magazin Online", why: "Tot ce ai nevoie ca sa vinzi online.", features: ["Produse nelimitate", "Cos si checkout", "Plati online securizate", "Gestiune stocuri", "Urmarire comenzi", "Vizibil in cautarile Google", "6 luni de suport"], cta: "Incepe acum" },
    custom: { name: "Sistem Custom", why: "Construit exact pe procesele afacerii tale — rezervari, programari, facturare, stoc, contabilitate sau toate impreuna.", features: ["Analiza proceselor afacerii tale", "Design & dezvoltare 100% custom", "Rezervari / programari / facturare / stoc", "Panou de administrare pentru echipa", "Training pentru echipa inclus", "Suport dedicat"], cta: "Cere oferta" },
    label: "ESTIMAREA TA",
  },
  de: {
    starter: { name: "Starter", why: "Eine saubere, schnelle Website um online zu gehen.", features: ["Bis zu 5 Seiten", "Perfekt auf dem Handy", "Kontaktformular", "Hosting fur 1 Jahr inklusive", "Sichere Verbindung", "1 Monat Support"], cta: "Jetzt starten" },
    business: { name: "Business", why: "Professionelle Seite mit allem was ein wachsendes Unternehmen braucht.", features: ["Bis zu 10 Seiten", "Professionelles individuelles Design", "Buchungs- oder Angebotsformulare", "Sichtbar in Google-Suchen", "Social-Media-Links", "Besucherstatistiken", "3 Monate Support"], cta: "Jetzt starten" },
    ecommerce: { name: "Online-Shop", why: "Alles was Sie brauchen um online zu verkaufen.", features: ["Unbegrenzte Produkte", "Warenkorb und Checkout", "Sichere Online-Zahlungen", "Bestandsverwaltung", "Bestellverfolgung", "Sichtbar in Google-Suchen", "6 Monate Support"], cta: "Jetzt starten" },
    custom: { name: "Individuelles System", why: "Gebaut exakt um Ihre Prozesse — Buchungen, Termine, Rechnungen, Lager, Buchhaltung oder alles zusammen.", features: ["Analyse Ihrer Geschaftsprozesse", "100% individuelles Design & Entwicklung", "Buchungen / Termine / Rechnungen / Lager", "Admin-Panel fur Ihr Team", "Team-Schulung inklusive", "Dedizierter Support"], cta: "Angebot anfordern" },
    label: "IHRE SCHATZUNG",
  },
  fr: {
    starter: { name: "Starter", why: "Un site propre et rapide pour etre en ligne.", features: ["Jusqu'a 5 pages", "Parfait sur mobile", "Formulaire de contact", "Hebergement inclus 1 an", "Connexion securisee", "1 mois de support"], cta: "Commencer" },
    business: { name: "Business", why: "Site professionnel avec tout ce qu'il faut pour grandir.", features: ["Jusqu'a 10 pages", "Design professionnel sur mesure", "Formulaires de reservation ou devis", "Visible sur Google", "Liens reseaux sociaux", "Statistiques visiteurs", "3 mois de support"], cta: "Commencer" },
    ecommerce: { name: "Boutique en Ligne", why: "Tout ce qu'il faut pour vendre en ligne.", features: ["Produits illimites", "Panier et paiement", "Paiements en ligne securises", "Gestion des stocks", "Suivi des commandes", "Visible sur Google", "6 mois de support"], cta: "Commencer" },
    custom: { name: "Systeme Sur Mesure", why: "Construit exactement autour de vos processus — reservations, rendez-vous, facturation, stock, comptabilite, ou tout ensemble.", features: ["Analyse de vos processus", "Design & developpement 100% sur mesure", "Reservations / rendez-vous / facturation / stock", "Panneau d'administration pour votre equipe", "Formation de l'equipe incluse", "Support dedie"], cta: "Demander un devis" },
    label: "VOTRE ESTIMATION",
  },
  es: {
    starter: { name: "Starter", why: "Un sitio limpio y rapido para estar en linea.", features: ["Hasta 5 paginas", "Perfecto en el movil", "Formulario de contacto", "Hosting incluido 1 ano", "Conexion segura", "1 mes de soporte"], cta: "Empezar" },
    business: { name: "Business", why: "Sitio profesional con todo lo que un negocio en crecimiento necesita.", features: ["Hasta 10 paginas", "Diseno profesional personalizado", "Formularios de reserva o presupuesto", "Visible en busquedas de Google", "Enlaces a redes sociales", "Estadisticas de visitantes", "3 meses de soporte"], cta: "Empezar" },
    ecommerce: { name: "Tienda Online", why: "Todo lo que necesitas para vender online.", features: ["Productos ilimitados", "Carrito y pago", "Pagos en linea seguros", "Gestion de inventario", "Seguimiento de pedidos", "Visible en busquedas de Google", "6 meses de soporte"], cta: "Empezar" },
    custom: { name: "Sistema a Medida", why: "Construido exactamente sobre tus procesos — reservas, citas, facturacion, stock, contabilidad o todo junto.", features: ["Analisis de tus procesos", "Diseno y desarrollo 100% a medida", "Reservas / citas / facturacion / stock", "Panel de administracion para tu equipo", "Formacion del equipo incluida", "Soporte dedicado"], cta: "Pedir presupuesto" },
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
  en: "Final price may vary — always negotiable.",
  ro: "Pretul final poate varia — mereu negociabil.",
  de: "Endpreis kann variieren — immer verhandelbar.",
  fr: "Le prix final peut varier — toujours negociable.",
  es: "El precio final puede variar — siempre negociable.",
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

const packagesText: Record<Lang, { heading: string, sub: string, popular: string }> = {
  en: { heading: "Or pick a package directly", sub: "All packages include custom design, 1 year of hosting and SSL. Prices are starting points — always negotiable.", popular: "MOST POPULAR" },
  ro: { heading: "Sau alege direct un pachet", sub: "Toate pachetele includ design custom, hosting 1 an si SSL. Preturile sunt puncte de pornire — mereu negociabile.", popular: "CEL MAI ALES" },
  de: { heading: "Oder wahlen Sie direkt ein Paket", sub: "Alle Pakete enthalten individuelles Design, 1 Jahr Hosting und SSL. Preise sind Startpunkte — immer verhandelbar.", popular: "AM BELIEBTESTEN" },
  fr: { heading: "Ou choisissez directement un forfait", sub: "Tous les forfaits incluent design sur mesure, 1 an d'hebergement et SSL. Les prix sont des points de depart — toujours negociables.", popular: "LE PLUS CHOISI" },
  es: { heading: "O elige directamente un paquete", sub: "Todos los paquetes incluyen diseno a medida, 1 ano de hosting y SSL. Los precios son puntos de partida — siempre negociables.", popular: "EL MAS ELEGIDO" },
}

const growthText: Record<Lang, { title: string, body: string, cta: string }> = {
  en: { title: "Monthly growth — SEO, backlinks, Meta & Google Ads", body: "A monthly subscription tailored to your goals: campaigns, link building, content and reporting. We show you exactly what you get before you pay anything.", cta: "Talk to us" },
  ro: { title: "Crestere lunara — SEO, backlinkuri, Meta & Google Ads", body: "Abonament lunar adaptat obiectivelor tale: campanii, backlinkuri, continut si rapoarte. Iti aratam exact ce primesti inainte sa platesti ceva.", cta: "Discuta cu noi" },
  de: { title: "Monatliches Wachstum — SEO, Backlinks, Meta & Google Ads", body: "Ein monatliches Abo nach Ihren Zielen: Kampagnen, Linkaufbau, Content und Reports. Wir zeigen Ihnen genau, was Sie bekommen, bevor Sie zahlen.", cta: "Sprechen Sie mit uns" },
  fr: { title: "Croissance mensuelle — SEO, backlinks, Meta & Google Ads", body: "Un abonnement mensuel adapte a vos objectifs : campagnes, netlinking, contenu et rapports. On vous montre exactement ce que vous recevez avant de payer.", cta: "Parlons-en" },
  es: { title: "Crecimiento mensual — SEO, backlinks, Meta & Google Ads", body: "Una suscripcion mensual adaptada a tus objetivos: campanas, link building, contenido e informes. Te mostramos exactamente que recibes antes de pagar nada.", cta: "Habla con nosotros" },
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
    if (target >= step) return
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)
    setSelectedFlash(null)
    setSlideDirection('out')
    setTimeout(() => {
      setShowResult(false)
      setStep(target)
      setSlideDirection('in')
    }, 200)
  }, [step])

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
  const pk = packagesText[lang]
  const growth = growthText[lang]
  const tiers: Tier[] = ['starter', 'business', 'ecommerce', 'custom']

  return (
    <div className="min-h-screen text-ink" style={{ background: '#FFFFFF' }}>

      <SiteNav contactHref="/#contact" tone="light" />

      {/* Quiz */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20 pt-6 md:pt-10 pb-16 flex justify-center">
        <div className="max-w-2xl w-full">

          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {(step > 0 || showResult) && (
                  <button
                    onClick={() => showResult ? goToStep(TOTAL_STEPS - 1) : goToStep(step - 1)}
                    className="text-ink-light hover:text-ink transition-colors duration-[400ms] ease-m mr-1"
                    aria-label="Go back"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                  </button>
                )}
                <div className="flex items-center gap-2">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                    const isCompleted = answers[i] !== null && (i < step || showResult)
                    const isCurrent = i === step && !showResult
                    return (
                      <button
                        key={i}
                        onClick={() => isCompleted ? goToStep(i) : undefined}
                        className={`w-1.5 h-1.5 transition-colors duration-[400ms] ease-m ${
                          showResult
                            ? 'bg-ink'
                            : isCompleted
                              ? 'bg-ink cursor-pointer hover:bg-ink/70'
                              : isCurrent
                                ? 'bg-ink/30'
                                : 'bg-[#E8E3E0]'
                        }`}
                        aria-label={`Step ${i + 1}`}
                      />
                    )
                  })}
                </div>
              </div>
              <span className="text-ink-light text-[12px] font-mono tracking-[0.08em]">
                {showResult ? String(TOTAL_STEPS).padStart(2, '0') : String(step + 1).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
              </span>
            </div>
            <div className="w-full h-px bg-[#E8E3E0]">
              <div
                className="h-full bg-ink transition-[width] duration-[400ms] ease-m"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className={`transition-[opacity,transform] duration-[400ms] ease-m ${slideDirection === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>

            {!showResult ? (
              <>
                <h1 className="font-serif font-light text-[clamp(2.125rem,3.4vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-ink text-center mb-12">
                  {q[step].question}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q[step].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      className={`text-left px-6 py-4 border text-[15px] leading-[1.3] transition-colors duration-[400ms] ease-m ${
                        selectedFlash === i || answers[step] === i
                          ? 'border-ink bg-white text-ink'
                          : 'border-[#E8E3E0] bg-white text-ink-muted hover:bg-[#FAF7F5] hover:text-ink'
                      }${q[step].options.length % 2 !== 0 && i === q[step].options.length - 1 ? ' sm:col-span-2' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <span className="inline-block text-[11px] font-bold tracking-[0.04em] uppercase text-ink-light mb-6">
                  {r.label}
                </span>

                <h2 className="font-serif font-light text-[40px] leading-[1.0] tracking-[-0.03em] text-ink mb-4">
                  {result.name}
                </h2>

                <div className="font-sans font-medium text-[40px] leading-[1.05] tracking-[-0.02em] text-ink mb-2">
                  {totalPrice !== null
                    ? `${isMinimum ? `${fromText[lang]} ` : ''}€${totalPrice}`
                    : priceOnRequestText[lang]}
                </div>

                {!isCustom && extraCount > 0 && (
                  <p className="text-ink-light text-[12px] font-mono tracking-[0.08em] mb-4">
                    {langNoteText[lang](extraCount, addon)}
                  </p>
                )}

                {(isCustom || extraCount === 0) && <div className="mb-4" />}

                <p className="text-ink-light text-[12px] mb-8">
                  {isCustom ? customNoteText[lang] : negotiableText[lang]}
                </p>

                <p className="text-ink-muted text-[15px] leading-[1.3] mb-10 max-w-md mx-auto">
                  {result.why}
                </p>

                <div className="text-left max-w-md mx-auto space-y-3 mb-10">
                  {result.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3"
                      style={{ animation: `fadeInUp 400ms cubic-bezier(0.6,0,0.4,1) ${i * 60}ms both` }}
                    >
                      <span className="text-ink-light text-xs mt-0.5">&mdash;</span>
                      <span className="text-ink text-[15px] leading-[1.3]">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={getContactURL()} className="btn-cta btn-cta--on-light">
                  <span className="btn-fill-bg" aria-hidden />
                  <span className="btn-fill-label">{result.cta}
                    <span className="btn-chip" aria-hidden>
                      <svg className="arrow-a" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                      <svg className="arrow-b" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                    </span>
                  </span>
                </Link>

                <div className="mt-6">
                  <button
                    onClick={resetInterview}
                    className="text-ink-light hover:text-ink text-[12px] transition-colors duration-[400ms] ease-m"
                  >
                    {startOverText[lang]}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </section>

      {/* Static packages */}
      <section style={{ background: '#FAF7F5' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif font-light text-[clamp(2rem,3.4vw,2.5rem)] leading-[1.0] tracking-[-0.03em] text-ink mb-3">{pk.heading}</h2>
          <p className="text-ink-muted text-[15px] leading-[1.3] max-w-xl mx-auto">{pk.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => {
            const tr = r[tier]
            const price = BASE_PRICES[tier]
            const isPopular = tier === 'business'
            return (
              <div
                key={tier}
                className={`flex flex-col p-6 ${isPopular ? 'ground-ink text-white' : 'bg-white border border-[#E8E3E0]'}`}
                style={isPopular ? { background: '#251109' } : undefined}
              >
                {isPopular && (
                  <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-white/40 mb-3">{pk.popular}</span>
                )}
                <h3 className={`font-sans font-medium text-[20px] tracking-[-0.01em] mb-1 ${isPopular ? 'text-white' : 'text-ink'}`}>{tr.name}</h3>
                <div className="mb-5">
                  {price !== null ? (
                    <p className={`font-sans font-medium text-[40px] leading-[1.05] tracking-[-0.02em] ${isPopular ? 'text-white' : 'text-ink'}`}>
                      <span className={`text-[13px] font-normal mr-1.5 ${isPopular ? 'text-white/40' : 'text-ink-light'}`}>{fromText[lang]}</span>€{price}
                    </p>
                  ) : (
                    <p className="font-sans font-medium text-[24px] leading-[1.2] tracking-[-0.01em] text-ink">{priceOnRequestText[lang]}</p>
                  )}
                </div>
                <p className={`text-[13px] leading-[1.4] mb-5 ${isPopular ? 'text-white/60' : 'text-ink-muted'}`}>{tr.why}</p>
                <div className={`flex-1 mb-8 border-t ${isPopular ? 'border-[#57433B]' : 'border-[#E8E3E0]'}`}>
                  {tr.features.map((f, fi) => (
                    <div key={fi} className={`py-2.5 border-b text-[15px] leading-[1.3] ${isPopular ? 'border-[#57433B] text-white/60' : 'border-[#E8E3E0] text-ink-muted'}`}>
                      {f}
                    </div>
                  ))}
                </div>
                {isPopular ? (
                  <Link
                    href={`mailto:contact@landings.md?subject=${encodeURIComponent(price !== null ? `${tr.name} (€${price})` : tr.name)}`}
                    className="btn-cta w-full justify-center"
                  >
                    <span className="btn-fill-bg" aria-hidden />
                    <span className="btn-fill-label">{tr.cta}
                      <span className="btn-chip" aria-hidden>
                        <svg className="arrow-a" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                        <svg className="arrow-b" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                      </span>
                    </span>
                  </Link>
                ) : (
                  <Link
                    href={`mailto:contact@landings.md?subject=${encodeURIComponent(price !== null ? `${tr.name} (€${price})` : tr.name)}`}
                    className="block text-center px-5 py-3.5 border border-ink text-ink text-[14px] font-medium transition-colors duration-[400ms] ease-m hover:bg-ink hover:text-white"
                  >
                    {tr.cta}
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Monthly growth strip */}
        <div className="mt-4 bg-white border border-[#E8E3E0] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1">
            <h3 className="font-serif font-light text-[24px] leading-[1.1] tracking-[-0.02em] text-ink mb-2">{growth.title}</h3>
            <p className="text-ink-muted text-[15px] leading-[1.3] max-w-2xl">{growth.body}</p>
          </div>
          <Link
            href={`mailto:contact@landings.md?subject=${encodeURIComponent('SEO & Ads')}`}
            className="btn-cta btn-cta--on-light flex-shrink-0"
          >
            <span className="btn-fill-bg" aria-hidden />
            <span className="btn-fill-label">{growth.cta}
              <span className="btn-chip" aria-hidden>
                <svg className="arrow-a" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                <svg className="arrow-b" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
              </span>
            </span>
          </Link>
        </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
