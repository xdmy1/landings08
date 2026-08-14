"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'

const navText = {
  en: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Start a project", sub: "Web · SEO · Systems" },
  ro: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Incepe un proiect", sub: "Web · SEO · Sisteme" },
  de: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Projekt starten", sub: "Web · SEO · Systeme" },
  fr: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Demarrer un projet", sub: "Web · SEO · Systemes" },
  es: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Iniciar proyecto", sub: "Web · SEO · Sistemas" },
}

const announceText = {
  en: { short: "Free 30-min audit — your Google position & what's wrong", cta: "Book it" },
  ro: { short: "Audit gratuit de 30 min — pozitia pe Google si ce e gresit", cta: "Rezerva" },
  de: { short: "Gratis-Audit in 30 Min — Google-Position & Fehler", cta: "Termin" },
  fr: { short: "Audit gratuit de 30 min — position Google & erreurs", cta: "Reserver" },
  es: { short: "Auditoria gratis de 30 min — posicion en Google y errores", cta: "Reservar" },
}

/* navarro-clone header: audit strip (static, scrolls away) above a sticky
   header that goes transparent → rgba(13,13,13,.85)+blur once scrolled.
   `tone` is kept for call-site compatibility; the site is single-ground dark. */
export function SiteNav({ contactHref = "#contact" }: { contactHref?: string, tone?: "dark" | "light" }) {
  const { language, setLanguage } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
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
      {/* ── AUDIT STRIP — protected conversion element; static, scrolls away ── */}
      <Link
        href={`mailto:contact@landings.md?subject=${encodeURIComponent('Audit gratuit — 30 min')}`}
        className="block"
        style={{ background: '#0f0f0f', borderBottom: '1px solid rgba(198,198,198,0.15)' }}
      >
        <div className="nv-container py-2.5 text-[13px] flex items-center justify-center gap-2">
          <span className="truncate" style={{ color: '#a4a4a4' }}>{a.short}</span>
          <span
            className="flex-shrink-0 underline underline-offset-4 font-medium"
            style={{ color: '#c6ff69', textDecorationColor: 'rgba(198,255,105,0.5)' }}
          >
            {a.cta}
          </span>
        </div>
      </Link>

      {/* ── HEADER — sticky; transparent → dark glass on scroll ── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: scrolled ? 'rgba(13,13,13,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(198,198,198,0.15)' : 'transparent'}`,
          transition: 'background 0.3s ease-in-out, border-color 0.3s ease-in-out',
        }}
      >
        <div className="nv-container flex items-center justify-between py-4 md:py-[22px]">
          {/* logo + name/sub */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logowhite.png"
              alt="landings.md"
              width={24} height={40}
              className="w-[24px] h-auto"
              priority
            />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-[14px] font-medium text-white">landings.md</span>
              <span className="text-[12px]" style={{ color: '#a4a4a4' }}>{t.sub}</span>
            </span>
          </Link>

          {/* desktop links + lang + CTA */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-7 text-[14px] font-medium">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors duration-300 ease-in-out hover:!text-white"
                  style={{ color: '#a4a4a4' }}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* language switcher — dark dropdown in a gradient hairline */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="text-[12px] tracking-[0.08em] uppercase transition-colors duration-300 ease-in-out hover:!text-white"
                  style={{ color: '#a4a4a4' }}
                >
                  {language}
                </button>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <div className="absolute top-full right-0 mt-3 z-50 nv-edge" style={{ borderRadius: 16 }}>
                      <div className="nv-edge-inner min-w-[64px] py-1.5" style={{ background: '#0f0f0f' }}>
                        {(['en', 'ro', 'de', 'fr', 'es'] as const).map(lang => (
                          <button
                            key={lang}
                            onClick={() => { setLanguage(lang); setLangOpen(false) }}
                            className="block w-full text-left px-4 py-1.5 text-[12px] tracking-[0.08em] uppercase transition-colors duration-300 ease-in-out"
                            style={{ color: language === lang ? '#c6ff69' : '#a4a4a4' }}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* metallic CTA with arrow-slide-in hover */}
              <Link href={contactHref} className="btn-metal btn-metal--sm">
                {t.contact}
                <span className="nv-arr" aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* mobile trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 transition-colors hover:!text-white"
            style={{ color: '#a4a4a4' }}
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── MOBILE OVERLAY — solid #0f0f0f, big Geist links ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[70] flex flex-col mobile-nav-overlay" style={{ background: '#0f0f0f' }}>
          <div className="flex items-center justify-between px-5 h-[64px] flex-shrink-0" style={{ borderBottom: '1px solid rgba(198,198,198,0.15)' }}>
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <Image src="/images/logowhite.png" alt="landings.md" width={20} height={33} className="w-[20px] h-auto" />
              <span className="text-[14px] font-medium text-white">landings.md</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 transition-colors hover:!text-white"
              style={{ color: '#a4a4a4' }}
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-7 gap-4">
            {links.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="mobile-nav-link text-white font-bold text-[clamp(2.2rem,9vw,3rem)] leading-[1.05] tracking-[-0.04em]"
                style={{ animationDelay: `${60 + i * 70}ms` }}
              >
                {label}
              </Link>
            ))}
            <div className="mt-8 mobile-nav-link" style={{ animationDelay: '340ms' }}>
              <Link href={contactHref} onClick={() => setMobileOpen(false)} className="btn-metal">
                {t.contact}
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="px-7 pb-10 pt-6 flex items-center justify-between mobile-nav-link" style={{ borderTop: '1px solid rgba(198,198,198,0.15)', animationDelay: '400ms' }}>
            <div className="flex items-center gap-4">
              {(['en', 'ro', 'de', 'fr', 'es'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang) }}
                  className="text-[12px] tracking-[0.08em] uppercase transition-colors"
                  style={{ color: language === lang ? '#c6ff69' : '#a4a4a4' }}
                >
                  {lang}
                </button>
              ))}
            </div>
            <span className="text-[11px] tracking-[0.08em] uppercase" style={{ color: '#909099' }}>landings.md</span>
          </div>
        </div>
      )}
    </>
  )
}
