"use client"

import React from 'react'
import Image from 'next/image'

/* Client logos, unified into the site's warm monochrome.
   treatment 'solid' — transparent logos flattened to a warm-white silhouette.
   treatment 'blend' — logos with opaque light backgrounds: inverted + screen-blended
   so the background melts into the page and the mark glows light. */
const logos: { src: string, alt: string, h: string, treatment: 'solid' | 'blend', opacity?: string }[] = [
  { src: '/images/logos/davo.png', alt: 'Davo Group — davo.md', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/interbus.png', alt: 'Inter Bus — inter-bus.md', h: 'h-7 md:h-8', treatment: 'solid' },
  { src: '/images/logos/respectauto.png', alt: 'RespectAuto — respectauto.md', h: 'h-5 md:h-6', treatment: 'solid' },
  { src: '/images/logos/rizzaclassic.png', alt: 'Rizza Classic — rizzaclassic.com', h: 'h-9 md:h-10', treatment: 'solid' },
  { src: '/images/logos/glg.png', alt: 'GLG', h: 'h-14 md:h-16', treatment: 'solid', opacity: 'opacity-70' },
]

const filters: Record<'solid' | 'blend', React.CSSProperties> = {
  solid: { filter: 'brightness(0) invert(0.92) sepia(0.12)' },
  blend: { filter: 'grayscale(1) invert(1) brightness(1.9) contrast(1.05)', mixBlendMode: 'screen' },
}

export function LogoMarquee({ className = "" }: { className?: string }) {
  const set = [...logos, ...logos]
  return (
    <div
      className={`logo-marquee relative overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className="logo-marquee-track flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-14 md:gap-20 pr-14 md:pr-20" aria-hidden={half === 1}>
            {set.map((logo, i) => (
              <Image
                key={`${half}-${i}`}
                src={logo.src}
                alt={half === 0 && i < logos.length ? logo.alt : ""}
                width={200}
                height={80}
                className={`w-auto ${logo.h} ${logo.opacity ?? 'opacity-45'} hover:opacity-90 transition-opacity duration-500 select-none flex-shrink-0`}
                style={filters[logo.treatment]}
                draggable={false}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
