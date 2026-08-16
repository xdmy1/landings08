"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'

const footerText = {
  en: { portfolio: 'Portfolio', pricing: 'Pricing', solutions: 'Solutions', caseStudies: 'Case Studies', copy: '© 2026 landings.md · Chisinau, Moldova' },
  ro: { portfolio: 'Portofoliu', pricing: 'Preturi', solutions: 'Solutii', caseStudies: 'Studii de Caz', copy: '© 2026 landings.md · Chisinau, Moldova' },
  de: { portfolio: 'Portfolio', pricing: 'Preise', solutions: 'Losungen', caseStudies: 'Fallstudien', copy: '© 2026 landings.md · Chisinau, Moldawien' },
  fr: { portfolio: 'Portfolio', pricing: 'Tarifs', solutions: 'Solutions', caseStudies: 'Etudes de Cas', copy: '© 2026 landings.md · Chisinau, Moldavie' },
  es: { portfolio: 'Portafolio', pricing: 'Precios', solutions: 'Soluciones', caseStudies: 'Casos de Estudio', copy: '© 2026 landings.md · Chisinau, Moldavia' },
}

const iconCls =
  'flex h-8 w-8 items-center justify-center rounded-full transition-[color,box-shadow] duration-150 hover:!text-[#FF9E7A] hover:[box-shadow:0_0_1px_1px_#FF9E7A]'
const iconStyle: React.CSSProperties = { color: '#a4a4a4', border: '1px solid rgba(255,255,255,0.14)' }

function SocialIcons() {
  return (
    <span className="flex items-center gap-1.5">
      <a href="mailto:contact@landings.md" aria-label="Email" className={iconCls} style={iconStyle}>
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <a href="https://wa.me/37368327082" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconCls} style={iconStyle}>
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z" />
        </svg>
      </a>
      <a href="https://instagram.com/landings.md" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={iconCls} style={iconStyle}>
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </span>
  )
}

/* The site footer: one gradient hairline card carrying the brand, the
   page links, contact and the social icons. `compact` drops the page
   links so it fits inside a single bento cell on the dashboard home. */
export function SiteFooter({ compact = false }: { compact?: boolean }) {
  const { language } = useLanguage()
  const t = footerText[language as keyof typeof footerText] ?? footerText.en

  const links = [
    { href: '/portfolio', label: t.portfolio },
    { href: '/pricing', label: t.pricing },
    { href: '/solutions', label: t.solutions },
    { href: '/case-studies', label: t.caseStudies },
  ]

  const card = (
    <div className="nv-edge h-full">
      <div
        className={`nv-edge-inner nv-inset flex h-full flex-col items-start justify-between gap-5 ${
          compact ? 'gap-3 px-4 py-3 md:flex-row md:items-center md:gap-5' : 'p-6 md:flex-row md:items-center md:p-7'
        }`}
      >
        <div className={`flex flex-wrap items-center ${compact ? 'gap-4' : 'gap-7'}`}>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logowhite.png" alt="landings.md" width={22} height={36} className={compact ? 'h-5 w-auto' : 'h-8 w-auto'} />
            <span className={`font-medium text-white ${compact ? 'hidden text-[12px] lg:inline' : 'text-[14px]'}`}>landings.md</span>
          </Link>
          {!compact && (
            <div className="hidden items-center gap-5 text-[13px] font-medium md:flex">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors duration-150 hover:!text-white" style={{ color: '#a4a4a4' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${compact ? 'sm:gap-3' : 'sm:gap-5'}`}>
          <div className={`flex flex-col gap-1 font-medium sm:flex-row sm:items-center ${compact ? 'text-[10px] leading-tight sm:gap-3' : 'text-[13px] sm:gap-5'}`} style={{ color: '#909099' }}>
            {!compact && (
              <a href="tel:+37368327082" className="transition-colors duration-150 hover:!text-white">
                +373 683 27 082
              </a>
            )}
            <span>{t.copy}</span>
          </div>
          <SocialIcons />
        </div>
      </div>
    </div>
  )

  if (compact) return card

  return (
    <footer className="pb-16 pt-16 md:pb-20 md:pt-20">
      <div className="nv-container">{card}</div>
    </footer>
  )
}
