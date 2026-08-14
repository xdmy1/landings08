"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Treatment = 'solid' | 'mono' | 'white'

/* Client logos on the ink ground — one static flex strip, no cells,
   no marquee, no hover behavior. treatment 'solid' flattens transparent
   marks to white; 'mono' lifts detailed marks; 'white' passes
   already-white artwork through. */
const logos: { src: string, alt: string, h: string, treatment: Treatment }[] = [
  { src: '/images/logos/davo.png', alt: 'Davo Group', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/interbus.png', alt: 'Inter Bus', h: 'h-7 md:h-8', treatment: 'solid' },
  { src: '/images/logos/cmiea.png', alt: 'CMIEA', h: 'h-9 md:h-10', treatment: 'solid' },
  { src: '/images/logos/glg.png', alt: 'Scoala Auto GLG', h: 'h-10 md:h-11', treatment: 'solid' },
  { src: '/images/logos/radx.png', alt: 'RADX Cooling Solutions', h: 'h-6 md:h-7', treatment: 'solid' },
  { src: '/images/logos/eurogard.png', alt: 'EuroGard', h: 'h-10 md:h-11', treatment: 'solid' },
  { src: '/images/logos/rizzaclassic.png', alt: 'Rizza Classic', h: 'h-8 md:h-9', treatment: 'solid' },
  { src: '/images/logos/autohuse.png', alt: 'Auto Huse', h: 'h-9 md:h-10', treatment: 'mono' },
]

const filters: Record<Treatment, React.CSSProperties> = {
  solid: { filter: 'brightness(0) invert(1)' },
  mono: { filter: 'grayscale(1) brightness(1.6) contrast(0.9)' },
  white: {},
}

export function LogoStrip({ moreLabel = "+40 proiecte", className = "" }: { moreLabel?: string, className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-x-10 gap-y-8 ${className}`}>
      {logos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={240}
          height={96}
          className={`w-auto ${logo.h} max-w-[150px] object-contain opacity-75 select-none`}
          style={filters[logo.treatment]}
          draggable={false}
        />
      ))}
      <Link href="/portfolio" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors duration-[400ms] ease-m">
        {moreLabel} &rarr;
      </Link>
    </div>
  )
}
