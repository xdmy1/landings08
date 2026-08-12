"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Treatment = 'solid' | 'blend' | 'mono' | 'white'

/* Client logos, unified into white monochrome.
   treatment 'solid' — transparent logos flattened to a white silhouette.
   treatment 'blend' — logos with opaque light backgrounds: inverted + screen-blended.
   treatment 'mono' — detailed badges that a flat silhouette would erase: desaturated
   and lifted instead, keeping their internal drawing readable. */
const logos: { src: string, alt: string, domain: string, h: string, treatment: Treatment }[] = [
  { src: '/images/logos/davo.png', alt: 'Davo Group — davo.md', domain: 'davo.md', h: 'h-7 md:h-8', treatment: 'solid' },
  { src: '/images/logos/interbus.png', alt: 'Inter Bus — inter-bus.md', domain: 'inter-bus.md', h: 'h-8 md:h-9', treatment: 'solid' },
  { src: '/images/logos/cmiea.png', alt: 'CMIEA — cmiea.md', domain: 'cmiea.md', h: 'h-10 md:h-11', treatment: 'solid' },
  { src: '/images/logos/glg.png', alt: 'Scoala Auto GLG — scoalaautoglg.com', domain: 'scoalaautoglg.com', h: 'h-11 md:h-12', treatment: 'solid' },
  { src: '/images/logos/radx.png', alt: 'RADX Cooling Solutions — radx.solutions', domain: 'radx.solutions', h: 'h-7 md:h-8', treatment: 'solid' },
  { src: '/images/logos/eurogard.png', alt: 'EuroGard — eurogard.md', domain: 'eurogard.md', h: 'h-11 md:h-12', treatment: 'solid' },
  { src: '/images/logos/rizzaclassic.png', alt: 'Rizza Classic — rizzaclassic.com', domain: 'rizzaclassic.com', h: 'h-9 md:h-10', treatment: 'solid' },
  { src: '/images/logos/droppack.png', alt: 'DropPack — droppack', domain: 'droppack', h: 'h-10 md:h-11', treatment: 'mono' },
  { src: '/images/logos/autohuse.png', alt: 'Auto Huse — autohuse.md', domain: 'autohuse.md', h: 'h-10 md:h-11', treatment: 'mono' },
  { src: '/images/logos/automarga.png', alt: 'AutoMarga — automarga.md', domain: 'automarga.md', h: 'h-10 md:h-11', treatment: 'white' },
  { src: '/images/logos/udc.png', alt: 'Universal Dental Clinic — udc.md', domain: 'udc.md', h: 'h-10 md:h-11', treatment: 'mono' },
]

const filters: Record<Treatment, React.CSSProperties> = {
  solid: { filter: 'brightness(0) invert(1)' },
  blend: { filter: 'grayscale(1) invert(1) brightness(1.9) contrast(1.05)', mixBlendMode: 'screen' },
  mono: { filter: 'grayscale(1) brightness(1.6) contrast(0.9)' },
  white: {},
}

const CELL_BORDER = 'rgba(255, 255, 255, 0.08)'

const COLS_MOBILE = 2
const COLS_MD = 4
const CELL_COUNT = logos.length + 1 // +1 for the "+40 more" cell

/* Static logo wall — every client in its own cell, cells separated by
   1px hairlines that run edge-to-edge into the page's side rails.
   2 columns on mobile, 4 on desktop; the last cell counts the rest of
   the launched projects and links to the portfolio. */
export function LogoGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cellClasses = (i: number) => [
    i % COLS_MOBILE !== COLS_MOBILE - 1 ? 'border-r' : '',
    i % COLS_MD !== COLS_MD - 1 ? 'md:border-r' : 'md:border-r-0',
    i < CELL_COUNT - COLS_MOBILE ? 'border-b' : '',
    i < CELL_COUNT - COLS_MD ? 'md:border-b' : 'md:border-b-0',
  ].join(' ')

  const cellStyle = (i: number): React.CSSProperties => ({
    borderColor: CELL_BORDER,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, background-color 500ms`,
  })

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 ${className}`}
      style={{ borderTop: `1px solid ${CELL_BORDER}` }}
    >
      {logos.map((logo, i) => (
        <div
          key={logo.src}
          className={`group relative flex items-center justify-center px-5 py-9 md:py-10 ${cellClasses(i)} transition-colors duration-500 hover:bg-white/[0.03]`}
          style={cellStyle(i)}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={240}
            height={96}
            className={`w-auto ${logo.h} max-w-[170px] object-contain opacity-55 group-hover:opacity-95 transition-opacity duration-500 select-none`}
            style={filters[logo.treatment]}
            draggable={false}
          />
          <span className="absolute bottom-1.5 left-0 right-0 text-center text-[8px] font-mono tracking-[0.12em] text-ink-light opacity-0 translate-y-1 group-hover:opacity-70 group-hover:translate-y-0 transition-all duration-500 pointer-events-none hidden md:block">
            {logo.domain}
          </span>
        </div>
      ))}
      {/* the rest of the wall, counted */}
      <Link
        href="/portfolio"
        className={`group relative flex flex-col items-center justify-center px-5 py-9 md:py-10 ${cellClasses(logos.length)} transition-colors duration-500 hover:bg-white/[0.03]`}
        style={cellStyle(logos.length)}
      >
        <span className="font-serif text-3xl md:text-4xl text-ink/70 group-hover:text-ink transition-colors duration-500 leading-none">+40</span>
        <span className="mt-2 text-[9px] font-mono tracking-[0.14em] uppercase text-ink-light group-hover:text-ink-muted transition-colors duration-500 inline-flex items-center gap-1">
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">&rarr;</span>
        </span>
      </Link>
    </div>
  )
}
