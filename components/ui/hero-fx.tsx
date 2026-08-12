"use client"

import React, { useEffect, useRef } from 'react'

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
      el.style.background = `radial-gradient(560px circle at ${cx}px ${cy}px, rgba(232,130,90,0.08), transparent 68%)`
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
