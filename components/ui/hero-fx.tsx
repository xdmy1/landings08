"use client"

import React, { useEffect, useRef } from 'react'

/* Outline of the landings.md mark, traced from logowhite.png.
   Drawn as a continuous wireframe across the hero background. */
const LOGO_PATH = "M418,6 L425,6 L432,10 L1194,563 L1210,578 L1215,592 L1215,1337 L815,1337 L814,289 L408,582 L408,1551 L406,1748 L1206,1744 L1208,1747 L1207,1752 L831,2027 L817,2034 L807,2034 L799,2031 L755,2000 L506,1817 L404,1748 L283,1656 L17,1462 L9,1450 L6,1439 L6,889 L8,880 L14,867 L23,859 L295,660 L408,582 L410,15 L417,7 Z"

export function HeroLogoTrace({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <div className="hero-trace-drift absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[88%] md:h-[92%] aspect-[1222/2041] opacity-[0.34]">
        <svg viewBox="0 0 1222 2041" fill="none" className="w-full h-full">
          {/* soft glow twin */}
          <path
            d={LOGO_PATH}
            pathLength={1}
            stroke="#D4785A"
            strokeWidth={14}
            strokeLinejoin="round"
            className="hero-trace-path"
            style={{ filter: 'blur(12px)', opacity: 0.75 }}
          />
          {/* crisp line */}
          <path
            d={LOGO_PATH}
            pathLength={1}
            stroke="#EDAF8E"
            strokeWidth={3}
            strokeLinejoin="round"
            className="hero-trace-path"
          />
        </svg>
      </div>
    </div>
  )
}

/* Soft amber light that lazily follows the cursor inside the hero. */
export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const parent = el.parentElement
    if (!parent) return

    let tx = 0, ty = 0, cx = -400, cy = -400, raf = 0

    const loop = () => {
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      el.style.background = `radial-gradient(560px circle at ${cx}px ${cy}px, rgba(212,120,90,0.08), transparent 68%)`
      raf = requestAnimationFrame(loop)
    }
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
      if (!raf) { cx = tx; cy = ty; loop() }
    }
    parent.addEventListener('mousemove', onMove)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="absolute inset-0 pointer-events-none z-[1]" aria-hidden />
}

/* Slow-breathing ambient light behind the hero content. */
export function HeroBreath() {
  return (
    <div
      className="hero-breathe absolute inset-0 pointer-events-none"
      aria-hidden
      style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 32%, rgba(212,120,90,0.10) 0%, transparent 70%)' }}
    />
  )
}
