"use client"

import React, { useState, useEffect } from 'react'
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
  en: {
    full: "Free 30-min audit — your Google position, what's wrong, what your keywords are worth. No site yet? We study your business.",
    short: "Free 30-min audit — Google position & what's wrong",
    cta: "Book it",
  },
  ro: {
    full: "Audit gratuit de 30 min — pozitia ta pe Google, ce e gresit si cat se cauta cuvintele tale. Nu ai site? Iti studiem afacerea.",
    short: "Audit gratuit de 30 min — pozitia pe Google si ce e gresit",
    cta: "Rezerva",
  },
  de: {
    full: "Gratis-Audit (30 Min): Google-Position, Fehler, Keyword-Nachfrage. Keine Website? Wir analysieren Ihr Geschaft.",
    short: "Gratis-Audit in 30 Min — Google-Position & Fehler",
    cta: "Termin",
  },
  fr: {
    full: "Audit gratuit de 30 min — votre position Google, ce qui cloche, la demande sur vos mots-cles. Pas de site ? On etudie votre activite.",
    short: "Audit gratuit de 30 min — position Google & erreurs",
    cta: "Reserver",
  },
  es: {
    full: "Auditoria gratis de 30 min — tu posicion en Google, que esta mal, la demanda de tus palabras clave. Sin web? Estudiamos tu negocio.",
    short: "Auditoria gratis de 30 min — posicion en Google y errores",
    cta: "Reservar",
  },
}

export function SiteNav({ contactHref = "#contact" }: { contactHref?: string }) {
  const { language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = navText[language as keyof typeof navText] ?? navText.en
  const a = announceText[language as keyof typeof announceText] ?? announceText.en

  const links = [
    { href: '/portfolio',    label: t.portfolio },
    { href: '/pricing',      label: t.pricing },
    { href: '/solutions',    label: t.solutions },
    { href: '/case-studies', label: t.caseStudies },
  ] as const

  return (
    <>
      {/* ── DESKTOP / SCROLLED NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth"
        style={{
          background: scrolled
            ? 'rgba(13,13,13,0.88)'
            : 'linear-gradient(180deg, rgba(10,10,10,0.72) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* ── FREE AUDIT BAR — collapses away on scroll ── */}
        <Link
          href={`mailto:contact@landings.md?subject=${encodeURIComponent('Audit gratuit — 30 min')}`}
          className="group/bar block overflow-hidden transition-all duration-500 ease-smooth"
          style={{ maxHeight: scrolled ? 0 : 40, opacity: scrolled ? 0 : 1 }}
        >
          <div
            className="flex items-center justify-center gap-2.5 h-9 px-4 border-b border-white/[0.07] text-[11px] font-medium"
            style={{ background: '#101010' }}
          >
            <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
            <span className="hidden lg:block min-w-0 text-ink-muted group-hover/bar:text-ink transition-colors duration-300 truncate">
              {a.full}
            </span>
            <span className="lg:hidden text-ink-muted group-hover/bar:text-ink transition-colors duration-300 truncate">
              {a.short}
            </span>
            <span className="text-ink underline underline-offset-2 decoration-white/40 group-hover/bar:decoration-white transition-colors duration-300 flex-shrink-0 inline-flex items-center gap-1">
              {a.cta}
              <svg className="w-3 h-3 transition-transform duration-300 group-hover/bar:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </Link>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logowhite.png"
                alt="landings.md"
                width={22} height={36}
                className="w-[22px] h-auto"
                priority
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 text-[13px] text-ink-muted">
                {links.map(({ href, label }) => (
                  <Link key={href} href={href} className="hover:text-ink transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {/* Language switcher */}
                <div className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="text-ink-light hover:text-ink-muted text-[11px] tracking-widest uppercase transition-colors"
                  >
                    {language}
                  </button>
                  {langOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                      <div className="absolute top-full right-0 mt-2 bg-surface border border-divider z-50 min-w-[56px] py-1">
                        {(['en', 'ro', 'de', 'fr', 'es'] as const).map(lang => (
                          <button
                            key={lang}
                            onClick={() => { setLanguage(lang); setLangOpen(false) }}
                            className={`block w-full text-left px-4 py-1.5 text-[11px] tracking-widest uppercase transition-colors ${
                              language === lang ? 'text-amber' : 'text-ink-muted hover:text-ink'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <Link
                  href={contactHref}
                  className="btn-fill group text-[13px] font-medium text-ink border border-white/25 px-5 py-2 active:scale-[0.98] transition-transform"
                >
                  <span className="btn-fill-bg" aria-hidden />
                  <span className="btn-fill-label transition-colors duration-[400ms] group-hover:text-[#0A0A0A]">{t.contact}</span>
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-ink-muted hover:text-ink transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE FULL-SCREEN MENU ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[60] flex flex-col mobile-nav-overlay"
          style={{ background: 'rgba(20,15,10,0.98)', backdropFilter: 'blur(20px)' }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 h-[68px] flex-shrink-0 border-b border-divider/30">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image src="/images/logowhite.png" alt="landings.md" width={18} height={30} className="w-[18px] h-auto" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-ink-muted hover:text-ink transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col justify-center px-8 gap-2">
            {links.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-[clamp(2rem,9vw,3.2rem)] text-ink hover:text-amber transition-colors duration-300 leading-tight mobile-nav-link"
                style={{ animationDelay: `${60 + i * 70}ms` }}
              >
                {label}
              </Link>
            ))}
            <div className="mt-8 mobile-nav-link" style={{ animationDelay: '340ms' }}>
              <Link
                href={contactHref}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber-light text-[#0A0A0A] px-6 py-3 text-sm transition-colors duration-300"
              >
                {t.contact}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Bottom: language + brand */}
          <div
            className="px-8 pb-10 flex items-center justify-between border-t border-divider/30 pt-6 mobile-nav-link"
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex items-center gap-4">
              {(['en', 'ro', 'de', 'fr', 'es'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setMobileOpen(false) }}
                  className={`text-[11px] tracking-widest uppercase transition-colors ${
                    language === lang ? 'text-amber' : 'text-ink-light hover:text-ink-muted'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <span className="text-ink-light/40 text-[10px] font-mono tracking-wide">landings.md</span>
          </div>
        </div>
      )}
    </>
  )
}
