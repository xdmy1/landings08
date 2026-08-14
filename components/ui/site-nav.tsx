"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'

const navText = {
  en: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Start a project" },
  ro: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Incepe un proiect" },
  de: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Projekt starten" },
  fr: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Demarrer un projet" },
  es: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Iniciar proyecto" },
}

const announceText = {
  en: { short: "Free 30-min audit — your Google position & what's wrong", cta: "Book it" },
  ro: { short: "Audit gratuit de 30 min — pozitia pe Google si ce e gresit", cta: "Rezerva" },
  de: { short: "Gratis-Audit in 30 Min — Google-Position & Fehler", cta: "Termin" },
  fr: { short: "Audit gratuit de 30 min — position Google & erreurs", cta: "Reserver" },
  es: { short: "Auditoria gratis de 30 min — posicion en Google y errores", cta: "Reservar" },
}

/* Static nav — mirabel-style: in flow, transparent, simply scrolls away.
   tone="dark" on ink grounds (white ladder), tone="light" on paper. */
export function SiteNav({ contactHref = "#contact", tone = "dark" }: { contactHref?: string, tone?: "dark" | "light" }) {
  const { language, setLanguage } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const t = navText[language as keyof typeof navText] ?? navText.en
  const a = announceText[language as keyof typeof announceText] ?? announceText.en
  const dark = tone === "dark"

  const c = {
    link: dark ? 'text-white/60 hover:text-white' : 'text-ink-light hover:text-ink',
    strong: dark ? 'text-white' : 'text-ink',
    meta: dark ? 'text-white/40' : 'text-ink-light',
    hairline: dark ? 'border-[#57433B]' : 'border-[#E8E3E0]',
  }

  const links = [
    { href: '/portfolio',    label: t.portfolio },
    { href: '/pricing',      label: t.pricing },
    { href: '/solutions',    label: t.solutions },
    { href: '/case-studies', label: t.caseStudies },
  ] as const

  return (
    <>
      {/* ── AUDIT STRIP — static, scrolls away with the page ── */}
      <Link
        href={`mailto:contact@landings.md?subject=${encodeURIComponent('Audit gratuit — 30 min')}`}
        className={`block border-b ${c.hairline}`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-3 text-[13px] flex items-center justify-center gap-2">
          <span className={`${c.link} transition-colors duration-[400ms] ease-m truncate`}>{a.short}</span>
          <span className={`${c.strong} underline underline-offset-2 flex-shrink-0 ${dark ? 'decoration-white/40 hover:decoration-white' : 'decoration-ink/40 hover:decoration-ink'}`}>{a.cta}</span>
        </div>
      </Link>

      {/* ── NAV — static in flow ── */}
      <nav className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8 md:py-10 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logowhite.png"
            alt="landings.md"
            width={22} height={36}
            className="w-[22px] h-auto"
            style={dark ? undefined : { filter: 'brightness(0)' }}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-[14px] font-medium">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className={`${c.link} transition-colors duration-[400ms] ease-m`}>
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`${c.meta} text-[11px] tracking-[0.08em] uppercase transition-colors duration-[400ms] ease-m`}
              >
                {language}
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <div className={`absolute top-full right-0 mt-2 z-50 min-w-[56px] py-1 border ${c.hairline}`} style={{ background: dark ? '#251109' : '#FFFFFF' }}>
                    {(['en', 'ro', 'de', 'fr', 'es'] as const).map(lang => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setLangOpen(false) }}
                        className={`block w-full text-left px-4 py-1.5 text-[11px] tracking-[0.08em] uppercase transition-colors duration-[400ms] ease-m ${
                          language === lang ? c.strong : c.link
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Link href={contactHref} className="btn-cta btn-cta--sm">
              <span className="btn-fill-bg" aria-hidden />
              <span className="btn-fill-label">{t.contact}</span>
            </Link>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className={`md:hidden p-2 ${c.link} transition-colors`}
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </nav>

      {/* ── MOBILE MENU — solid ink, no blur ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex flex-col mobile-nav-overlay" style={{ background: '#251109' }}>
          <div className="flex items-center justify-between px-6 h-[68px] flex-shrink-0 border-b border-[#57433B]">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image src="/images/logowhite.png" alt="landings.md" width={18} height={30} className="w-[18px] h-auto" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-8 gap-3">
            {links.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-[clamp(2.5rem,9vw,3.2rem)] leading-[1.02] text-white mobile-nav-link"
                style={{ animationDelay: `${60 + i * 70}ms` }}
              >
                {label}
              </Link>
            ))}
            <div className="mt-8 mobile-nav-link" style={{ animationDelay: '340ms' }}>
              <Link href={contactHref} onClick={() => setMobileOpen(false)} className="btn-cta">
                <span className="btn-fill-bg" aria-hidden />
                <span className="btn-fill-label">
                  {t.contact}
                  <span className="btn-chip" aria-hidden>
                    <svg className="arrow-a" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                    <svg className="arrow-b" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" /></svg>
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <div className="px-8 pb-10 flex items-center justify-between border-t border-[#57433B] pt-6 mobile-nav-link" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-4">
              {(['en', 'ro', 'de', 'fr', 'es'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setMobileOpen(false) }}
                  className={`text-[11px] tracking-[0.08em] uppercase transition-colors ${
                    language === lang ? 'text-white' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <span className="text-white/40 text-[10px] font-mono tracking-[0.08em] uppercase">landings.md</span>
          </div>
        </div>
      )}
    </>
  )
}
