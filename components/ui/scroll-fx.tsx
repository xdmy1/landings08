"use client"

import React, { useEffect, useRef, useState } from 'react'

/* ── ScrubText ──
   Words light up one by one, driven by scroll position — the paragraph
   starts as a dim ghost and is fully lit by the time it reaches the
   upper third of the viewport. Scroll-linked, so it plays forward and
   backward with the reader. */
export function ScrubText({ text, className = "" }: { text: string, className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setProgress(1); return }
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the top of the text enters at 88% of the viewport, 1 at 38%
      const p = (vh * 0.88 - rect.top) / (vh * 0.5)
      setProgress(Math.min(1, Math.max(0, p)))
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const words = text.split(' ')
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        // each word fades across a small window of the global progress
        const start = i / words.length
        const wordP = Math.min(1, Math.max(0, (progress - start) * words.length * 1.6))
        return (
          <span key={i} aria-hidden className="inline-block mr-[0.28em] last:mr-0" style={{ opacity: 0.13 + wordP * 0.87 }}>
            {word}
          </span>
        )
      })}
    </p>
  )
}

/* ── Magnetic ──
   Element leans toward the cursor while hovered and springs back on
   leave. Desktop-only, transform-only, gated behind reduced-motion. */
export function Magnetic({ children, strength = 0.25, className = "" }: { children: React.ReactNode, strength?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, hovering = false

    const loop = () => {
      cx += (tx - cx) * 0.16
      cy += (ty - cy) * 0.16
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`
      if (hovering || Math.abs(cx) > 0.1 || Math.abs(cy) > 0.1) {
        raf = requestAnimationFrame(loop)
      } else {
        el.style.transform = ''
        raf = 0
      }
    }
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      tx = (e.clientX - (r.left + r.width / 2)) * strength
      ty = (e.clientY - (r.top + r.height / 2)) * strength
      hovering = true
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onLeave = () => { tx = 0; ty = 0; hovering = false }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [strength])

  return <div ref={ref} className={`inline-block will-change-transform ${className}`}>{children}</div>
}

/* ── Parallax ──
   Child drifts vertically as the element crosses the viewport —
   ±shift px from center. Transform-only, rAF-throttled. */
export function Parallax({ children, shift = 26, className = "" }: { children: React.ReactNode, shift?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // -1 when element center is at viewport bottom, +1 at top
      const p = ((vh / 2 - (rect.top + rect.height / 2)) / (vh / 2))
      el.style.transform = `translateY(${(p * shift).toFixed(2)}px)`
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [shift])

  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>
}
