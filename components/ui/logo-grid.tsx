"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Treatment = 'solid' | 'blend' | 'mono'

/* Client logos, unified into the site's warm monochrome.
   treatment 'solid' — transparent logos flattened to a warm-white silhouette.
   treatment 'blend' — logos with opaque light backgrounds: inverted + screen-blended
   so the background melts into the page and the mark glows light.
   treatment 'mono' — detailed badges that a flat silhouette would erase: desaturated
   and warmed instead, keeping their internal drawing readable. */
const logos: { src: string, alt: string, domain: string, h: string, treatment: Treatment, opacity?: string }[] = [
  { src: '/images/logos/davo.png', alt: 'Davo Group — davo.md', domain: 'davo.md', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/interbus.png', alt: 'Inter Bus — inter-bus.md', domain: 'inter-bus.md', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/cmiea.png', alt: 'CMIEA — cmiea.md', domain: 'cmiea.md', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/glg.png', alt: 'Scoala Auto GLG — scoalaautoglg.com', domain: 'scoalaautoglg.com', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/radx.png', alt: 'RADX Cooling Solutions — radx.solutions', domain: 'radx.solutions', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/eurogard.png', alt: 'EuroGard — eurogard.md', domain: 'eurogard.md', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/rizzaclassic.png', alt: 'Rizza Classic — rizzaclassic.com', domain: 'rizzaclassic.com', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/udc.png', alt: 'Universal Dental Clinic — udc.md', domain: 'udc.md', h: 'h-6 md:h-7', treatment: 'mono' },
]

const filters: Record<Treatment, React.CSSProperties> = {
  solid: { filter: 'brightness(0) invert(1)' },
  blend: { filter: 'grayscale(1) invert(1) brightness(1.9) contrast(1.05)', mixBlendMode: 'screen' },
  mono: { filter: 'grayscale(1) brightness(1.35) contrast(0.9)' },
}

const CELL_BORDER = 'rgba(255, 255, 255, 0.08)'

/* Static logo wall — every client in its own cell, cells separated by
   1px hairlines that run edge-to-edge into the page's side rails.
   2 columns on mobile, 4 on desktop; borders skip the outer edges so
   they never double up with the section rails / next section's line-top. */
export function LogoGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 ${className}`}
      style={{ borderTop: `1px solid ${CELL_BORDER}` }}
    >
      {logos.map((logo, i) => {
        const borders = [
          i % 2 === 0 ? 'border-r' : '',            // mobile: right edge on left column
          i % 4 !== 3 ? 'md:border-r' : 'md:border-r-0', // desktop: all but 4th column
          i < 6 ? 'border-b' : '',                   // mobile: all but last row
          i < 4 ? 'md:border-b' : 'md:border-b-0',   // desktop: only first row
        ].join(' ')
        return (
          <div
            key={logo.src}
            className={`group relative flex items-center justify-center px-4 py-9 md:py-10 ${borders} transition-colors duration-500 hover:bg-[#E8825A]/[0.05]`}
            style={{
              borderColor: CELL_BORDER,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, background-color 500ms`,
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={80}
              className={`w-auto ${logo.h} ${logo.opacity ?? 'opacity-50'} max-w-[140px] object-contain group-hover:opacity-90 transition-opacity duration-500 select-none`}
              style={filters[logo.treatment]}
              draggable={false}
            />
            <span className="absolute bottom-1.5 left-0 right-0 text-center text-[8px] font-mono tracking-[0.12em] text-ink-light opacity-0 translate-y-1 group-hover:opacity-70 group-hover:translate-y-0 transition-all duration-500 pointer-events-none hidden md:block">
              {logo.domain}
            </span>
          </div>
        )
      })}
    </div>
  )
}
