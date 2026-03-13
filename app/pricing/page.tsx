"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { SiteNav } from '@/components/ui/site-nav'

type Lang = 'en' | 'ro' | 'de' | 'fr' | 'es'
type Tier = 'starter' | 'business' | 'ecommerce'

const TOTAL_STEPS = 6
const LANG_ADDON = 50
const BASE_PRICES: Record<Tier, number> = { starter: 350, business: 550, ecommerce: 850 }

const questions = {
  en: [
    { question: "What best describes your business?", options: ["Local business", "Online store or brand", "Freelancer or consultant", "Company or startup"] },
    { question: "What should your website do?", options: ["Show who I am and how to reach me", "Let people buy from me directly", "Let people book or request a quote", "All of the above"] },
    { question: "How big should your site be?", options: ["Small — a few pages", "Medium — several sections", "Large — lots of content or products", "Not sure yet"] },
    { question: "Do you need it in multiple languages?", options: ["No, just one", "Yes, 2 languages", "Yes, 3 languages", "4 or more"] },
    { question: "What do you already have ready?", options: ["Logo, photos, and text — all set", "Some things, need help with the rest", "Nothing yet — I need everything", "I have an old website to work from"] },
    { question: "How will people find your site?", options: ["I'll share the link myself", "They should find me on Google", "Both", "Not sure yet"] },
  ],
  ro: [
    { question: "Ce descrie cel mai bine afacerea ta?", options: ["Afacere locala", "Magazin online sau brand", "Freelancer sau consultant", "Companie sau startup"] },
    { question: "Ce ar trebui sa faca site-ul tau?", options: ["Sa arate cine sunt si cum ma contactezi", "Sa lase lumea sa cumpere direct", "Sa lase lumea sa faca rezervari", "Toate cele de mai sus"] },
    { question: "Cat de mare ar trebui sa fie?", options: ["Mic — cateva pagini", "Mediu — mai multe sectiuni", "Mare — mult continut sau produse", "Nu sunt sigur inca"] },
    { question: "Ai nevoie de mai multe limbi?", options: ["Nu, doar una", "Da, 2 limbi", "Da, 3 limbi", "4 sau mai multe"] },
    { question: "Ce ai deja pregatit?", options: ["Logo, poze si text — totul e gata", "Cateva lucruri, am nevoie de ajutor cu restul", "Nimic inca — am nevoie de tot", "Am un site vechi de la care pot pleca"] },
    { question: "Cum te vor gasi clientii?", options: ["Le trimit eu linkul", "Ar trebui sa ma gaseasca pe Google", "Ambele", "Nu sunt sigur inca"] },
  ],
  de: [
    { question: "Was beschreibt Ihr Geschaft am besten?", options: ["Lokales Geschaft", "Online-Shop oder Marke", "Freelancer oder Berater", "Unternehmen oder Startup"] },
    { question: "Was soll Ihre Website konnen?", options: ["Zeigen wer ich bin und wie man mich erreicht", "Leute direkt kaufen lassen", "Leute buchen oder anfragen lassen", "Alles zusammen"] },
    { question: "Wie gross soll Ihre Seite sein?", options: ["Klein — ein paar Seiten", "Mittel — mehrere Bereiche", "Gross — viel Inhalt oder Produkte", "Noch nicht sicher"] },
    { question: "Brauchen Sie mehrere Sprachen?", options: ["Nein, nur eine", "Ja, 2 Sprachen", "Ja, 3 Sprachen", "4 oder mehr"] },
    { question: "Was haben Sie schon bereit?", options: ["Logo, Fotos und Text — alles fertig", "Einiges, brauche Hilfe mit dem Rest", "Noch nichts — brauche alles", "Ich habe eine alte Website als Grundlage"] },
    { question: "Wie werden Leute Ihre Seite finden?", options: ["Ich teile den Link selbst", "Sie sollen mich bei Google finden", "Beides", "Noch nicht sicher"] },
  ],
  fr: [
    { question: "Qu'est-ce qui decrit le mieux votre activite ?", options: ["Commerce local", "Boutique en ligne ou marque", "Freelance ou consultant", "Entreprise ou startup"] },
    { question: "Que doit faire votre site ?", options: ["Montrer qui je suis et comment me contacter", "Permettre d'acheter directement", "Permettre de reserver ou demander un devis", "Tout cela"] },
    { question: "Quelle taille pour votre site ?", options: ["Petit — quelques pages", "Moyen — plusieurs sections", "Grand — beaucoup de contenu ou produits", "Pas encore sur"] },
    { question: "Avez-vous besoin de plusieurs langues ?", options: ["Non, une seule", "Oui, 2 langues", "Oui, 3 langues", "4 ou plus"] },
    { question: "Qu'avez-vous deja de pret ?", options: ["Logo, photos et texte — tout est pret", "Quelques elements, besoin d'aide pour le reste", "Rien encore — j'ai besoin de tout", "J'ai un ancien site comme base"] },
    { question: "Comment les gens trouveront votre site ?", options: ["Je partagerai le lien moi-meme", "Ils devraient me trouver sur Google", "Les deux", "Pas encore sur"] },
  ],
  es: [
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
    label: "YOUR ESTIMATE",
  },
  ro: {
    starter: { name: "Starter", why: "Un site curat si rapid ca sa fii online.", features: ["Pana la 5 pagini", "Functioneaza perfect pe telefon", "Formular de contact", "Hosting inclus 1 an", "Conexiune securizata", "1 luna de suport"], cta: "Incepe acum" },
    business: { name: "Business", why: "Site profesional cu tot ce are nevoie o afacere in crestere.", features: ["Pana la 10 pagini", "Design profesional personalizat", "Formulare de rezervare sau oferta", "Vizibil in cautarile Google", "Linkuri social media", "Statistici vizitatori", "3 luni de suport"], cta: "Incepe acum" },
    ecommerce: { name: "Magazin Online", why: "Tot ce ai nevoie ca sa vinzi online.", features: ["Produse nelimitate", "Cos si checkout", "Plati online securizate", "Gestiune stocuri", "Urmarire comenzi", "Vizibil in cautarile Google", "6 luni de suport"], cta: "Incepe acum" },
    label: "ESTIMAREA TA",
  },
  de: {
    starter: { name: "Starter", why: "Eine saubere, schnelle Website um online zu gehen.", features: ["Bis zu 5 Seiten", "Perfekt auf dem Handy", "Kontaktformular", "Hosting fur 1 Jahr inklusive", "Sichere Verbindung", "1 Monat Support"], cta: "Jetzt starten" },
    business: { name: "Business", why: "Professionelle Seite mit allem was ein wachsendes Unternehmen braucht.", features: ["Bis zu 10 Seiten", "Professionelles individuelles Design", "Buchungs- oder Angebotsformulare", "Sichtbar in Google-Suchen", "Social-Media-Links", "Besucherstatistiken", "3 Monate Support"], cta: "Jetzt starten" },
    ecommerce: { name: "Online-Shop", why: "Alles was Sie brauchen um online zu verkaufen.", features: ["Unbegrenzte Produkte", "Warenkorb und Checkout", "Sichere Online-Zahlungen", "Bestandsverwaltung", "Bestellverfolgung", "Sichtbar in Google-Suchen", "6 Monate Support"], cta: "Jetzt starten" },
    label: "IHRE SCHATZUNG",
  },
  fr: {
    starter: { name: "Starter", why: "Un site propre et rapide pour etre en ligne.", features: ["Jusqu'a 5 pages", "Parfait sur mobile", "Formulaire de contact", "Hebergement inclus 1 an", "Connexion securisee", "1 mois de support"], cta: "Commencer" },
    business: { name: "Business", why: "Site professionnel avec tout ce qu'il faut pour grandir.", features: ["Jusqu'a 10 pages", "Design professionnel sur mesure", "Formulaires de reservation ou devis", "Visible sur Google", "Liens reseaux sociaux", "Statistiques visiteurs", "3 mois de support"], cta: "Commencer" },
    ecommerce: { name: "Boutique en Ligne", why: "Tout ce qu'il faut pour vendre en ligne.", features: ["Produits illimites", "Panier et paiement", "Paiements en ligne securises", "Gestion des stocks", "Suivi des commandes", "Visible sur Google", "6 mois de support"], cta: "Commencer" },
    label: "VOTRE ESTIMATION",
  },
  es: {
    starter: { name: "Starter", why: "Un sitio limpio y rapido para estar en linea.", features: ["Hasta 5 paginas", "Perfecto en el movil", "Formulario de contacto", "Hosting incluido 1 ano", "Conexion segura", "1 mes de soporte"], cta: "Empezar" },
    business: { name: "Business", why: "Sitio profesional con todo lo que un negocio en crecimiento necesita.", features: ["Hasta 10 paginas", "Diseno profesional personalizado", "Formularios de reserva o presupuesto", "Visible en busquedas de Google", "Enlaces a redes sociales", "Estadisticas de visitantes", "3 meses de soporte"], cta: "Empezar" },
    ecommerce: { name: "Tienda Online", why: "Todo lo que necesitas para vender en linea.", features: ["Productos ilimitados", "Carrito y pago", "Pagos en linea seguros", "Gestion de inventario", "Seguimiento de pedidos", "Visible en busquedas de Google", "6 meses de soporte"], cta: "Empezar" },
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

// q0: business type    (0=local, 1=online store, 2=freelancer, 3=company)
// q1: purpose          (0=informational, 1=sell online, 2=bookings, 3=all)
// q2: size             (0=small, 1=medium, 2=large, 3=not sure)
// q3: languages        (0=one, 1=two, 2=three, 3=four+)
// q4: readiness        (0=all set, 1=some things, 2=nothing, 3=old site)
// q5: discovery        (0=share link, 1=google, 2=both, 3=not sure)
function getRecommendation(answers: (number | null)[]): Tier {
  const [business, purpose, size, , readiness, discovery] = answers

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
  const { extraCount, addon, isMinimum } = getLangAddon(answers[3])
  const totalPrice = BASE_PRICES[recommendation] + addon

  const getContactURL = () => {
    const subject = `${result.name} (€${totalPrice})`
    return `mailto:contact@landings.md?subject=${encodeURIComponent(subject)}`
  }

  const startOverText: Record<Lang, string> = { en: "Start over", ro: "Reincepe", de: "Neu starten", fr: "Recommencer", es: "Empezar de nuevo" }

  const progressPercent = showResult ? 100 : (step / TOTAL_STEPS) * 100

  return (
    <div className="min-h-screen text-ink grain" style={{ background: 'linear-gradient(180deg, #302620 0%, #2A2118 30%, #342A20 70%, #2A2118 100%)' }}>

      <SiteNav contactHref="/#contact" />

      <div className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 relative line-sides">

      {/* Quiz */}
      <div className="min-h-[110vh] flex items-center justify-center pt-24 pb-24 px-6 md:px-8">
        <div className="max-w-2xl w-full">

          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {(step > 0 || showResult) && (
                  <button
                    onClick={() => showResult ? goToStep(TOTAL_STEPS - 1) : goToStep(step - 1)}
                    className="text-ink-muted hover:text-ink transition-colors mr-1"
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
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          showResult
                            ? 'bg-amber'
                            : isCompleted
                              ? 'bg-amber cursor-pointer hover:bg-amber-light'
                              : isCurrent
                                ? 'bg-ink'
                                : 'bg-divider'
                        }`}
                        aria-label={`Step ${i + 1}`}
                      />
                    )
                  })}
                </div>
              </div>
              <span className="text-ink-light text-sm font-mono tracking-wide">
                {showResult ? String(TOTAL_STEPS).padStart(2, '0') : String(step + 1).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
              </span>
            </div>
            <div className="w-full h-px bg-divider">
              <div
                className="h-full bg-amber transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${slideDirection === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>

            {!showResult ? (
              <>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink text-center leading-tight mb-12">
                  {q[step].question}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q[step].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      className={`text-left px-6 py-4 border text-sm transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        selectedFlash === i || answers[step] === i
                          ? 'border-amber bg-amber/10 text-ink'
                          : 'border-divider bg-surface text-ink-muted hover:border-ink-light hover:text-ink'
                      }${q[step].options.length % 2 !== 0 && i === q[step].options.length - 1 ? ' sm:col-span-2' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-ink-light font-mono mb-6">
                  {r.label}
                </span>

                <h2 className="font-serif text-4xl md:text-5xl text-ink mb-3">
                  {result.name}
                </h2>

                <div className="font-serif text-5xl md:text-6xl text-amber mb-2">
                  {isMinimum ? `${fromText[lang]} ` : ''}€{totalPrice}
                </div>

                {extraCount > 0 && (
                  <p className="text-ink-light text-xs font-mono tracking-wide mb-4">
                    {langNoteText[lang](extraCount, addon)}
                  </p>
                )}

                {extraCount === 0 && <div className="mb-4" />}

                <p className="text-ink-light text-[11px] tracking-wide mb-8">
                  {negotiableText[lang]}
                </p>

                <p className="text-ink-muted text-sm mb-10 max-w-md mx-auto">
                  {result.why}
                </p>

                <div className="text-left max-w-md mx-auto space-y-3 mb-10">
                  {result.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3"
                      style={{ animation: `fadeInUp 600ms ${i * 60}ms both` }}
                    >
                      <span className="text-ink-light text-xs mt-0.5">&mdash;</span>
                      <span className="text-ink text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={getContactURL()}
                  className="inline-block px-8 py-3 bg-amber text-[#1A1410] text-sm tracking-wide hover:bg-amber-light transition-colors"
                >
                  {result.cta}
                </Link>

                <div className="mt-6">
                  <button
                    onClick={resetInterview}
                    className="text-ink-light hover:text-ink-muted text-xs tracking-wide transition-colors"
                  >
                    {startOverText[lang]}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
