"use client"

import React, { useEffect, useRef, useState } from 'react'

type Seg = { x1: number; y1: number; x2: number; y2: number; len: number }

const COLOR = 'rgba(120, 100, 78, 0.55)'

export function AnimatedRowLines({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [segs, setSegs] = useState<{ list: Seg[]; w: number; h: number } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const t = setTimeout(() => {
      const rows = Array.from(el.querySelectorAll('[data-row-item]')) as HTMLElement[]
      if (rows.length < 2) return

      // Use layout measurements — not getBoundingClientRect — to avoid transform interference
      const w = el.offsetWidth
      const h = el.offsetHeight
      const list: Seg[] = []

      // Draw a line at the bottom of every row except the last
      rows.slice(0, -1).forEach(row => {
        const y = row.offsetTop + row.offsetHeight
        const xmid = w / 2
        list.push({ x1: xmid, y1: y, x2: 0, y2: y, len: xmid })
        list.push({ x1: xmid, y1: y, x2: w, y2: y, len: w - xmid })
      })

      setSegs({ list, w, h })
    }, 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {React.Children.map(children, (child, i) => (
        <div key={i} data-row-item>{child}</div>
      ))}

      {segs && (
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox={`0 0 ${segs.w} ${segs.h}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', zIndex: 5 }}
          aria-hidden
        >
          {segs.list.map((s, i) => (
            <line
              key={i}
              x1={s.x1} y1={s.y1}
              x2={s.x2} y2={s.y2}
              stroke={COLOR}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              strokeDasharray={s.len}
              strokeDashoffset={s.len}
              style={{ animation: `rowLineDraw 900ms cubic-bezier(0.16,1,0.3,1) 150ms forwards` }}
            />
          ))}
          <style>{`@keyframes rowLineDraw { to { stroke-dashoffset: 0; } }`}</style>
        </svg>
      )}
    </div>
  )
}
