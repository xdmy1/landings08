"use client"

import React, { useEffect, useRef, useState } from 'react'

type Seg = { x1: number; y1: number; x2: number; y2: number; len: number }

const DIVIDER_COLOR = 'rgba(120, 100, 78, 0.55)'

export function AnimatedStatGrid({
  children,
  className = '',
  stagger = 150,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [lines, setLines] = useState<{ segs: Seg[]; w: number; h: number } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const t = setTimeout(() => {
      const cells = Array.from(el.querySelectorAll('[data-stat-cell]')) as HTMLElement[]
      if (!cells.length) return

      // Use offsetWidth/offsetHeight — NOT getBoundingClientRect — so CSS transforms
      // (stagger translateY) don't corrupt the measurements.
      const w = el.offsetWidth
      const h = el.offsetHeight
      const segs: Seg[] = []
      const seenV = new Set<number>()
      const seenH = new Set<number>()

      cells.forEach((cell) => {
        const right  = cell.offsetLeft + cell.offsetWidth
        const bottom = cell.offsetTop  + cell.offsetHeight

        // Vertical divider: cell whose right edge is not the container right
        if (right < w - 2 && !seenV.has(right)) {
          seenV.add(right)
          const ymid = h / 2
          segs.push({ x1: right, y1: ymid, x2: right, y2: 0,   len: ymid })
          segs.push({ x1: right, y1: ymid, x2: right, y2: h,   len: h - ymid })
        }

        // Horizontal divider: cell whose bottom edge is not the container bottom
        if (bottom < h - 2 && !seenH.has(bottom)) {
          seenH.add(bottom)
          const xmid = w / 2
          segs.push({ x1: xmid, y1: bottom, x2: 0, y2: bottom, len: xmid })
          segs.push({ x1: xmid, y1: bottom, x2: w, y2: bottom, len: w - xmid })
        }
      })

      setLines({ segs, w, h })
    }, 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {React.Children.map(children, (child, i) => (
        <div
          data-stat-cell
          className="transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(12px)',
            transitionDelay: `${i * stagger}ms`,
          }}
        >
          {child}
        </div>
      ))}

      {lines && (
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox={`0 0 ${lines.w} ${lines.h}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', zIndex: 5 }}
          aria-hidden
        >
          {lines.segs.map((s, i) => (
            <line
              key={i}
              x1={s.x1} y1={s.y1}
              x2={s.x2} y2={s.y2}
              stroke={DIVIDER_COLOR}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              strokeDasharray={s.len}
              strokeDashoffset={s.len}
              style={{ animation: `statLineDraw 900ms cubic-bezier(0.16,1,0.3,1) 150ms forwards` }}
            />
          ))}
          <style>{`@keyframes statLineDraw { to { stroke-dashoffset: 0; } }`}</style>
        </svg>
      )}
    </div>
  )
}
