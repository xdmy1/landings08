"use client"

import { useEffect, useRef, useState } from 'react'

const SPACING = 60
const COLOR = 'rgba(232, 130, 90, 0.13)'
const DRAW_DURATION = 1100
const MAX_STAGGER = 950
const INITIAL_DELAY = 250

interface Seg {
  x1: number; y1: number; x2: number; y2: number; len: number; delay: number
}

export function GridAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<{ segs: Seg[]; w: number; h: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const { width: w, height: h } = el.getBoundingClientRect()
    if (!w || !h) return

    const cx = w / 2
    const cy = h / 2
    const segs: Seg[] = []

    // Horizontal lines — each draws left AND right from the center x axis
    for (let y = cy % SPACING; y <= h + SPACING; y += SPACING) {
      const dist = Math.abs(y - cy) / (h / 2)
      const delay = INITIAL_DELAY + dist * MAX_STAGGER
      segs.push({ x1: cx, y1: y, x2: 0, y2: y, len: cx, delay })
      segs.push({ x1: cx, y1: y, x2: w, y2: y, len: w - cx, delay })
    }

    // Vertical lines — each draws up AND down from the center y axis
    for (let x = cx % SPACING; x <= w + SPACING; x += SPACING) {
      const dist = Math.abs(x - cx) / (w / 2)
      const delay = INITIAL_DELAY + dist * MAX_STAGGER
      segs.push({ x1: x, y1: cy, x2: x, y2: 0, len: cy, delay })
      segs.push({ x1: x, y1: cy, x2: x, y2: h, len: h - cy, delay })
    }

    setData({ segs, w, h })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {data && (
        <svg width={data.w} height={data.h} className="absolute inset-0">
          <defs>
            <radialGradient id="heroGridFade" cx="50%" cy="45%" r="55%" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="white" stopOpacity="1" />
              <stop offset="60%"  stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="heroGridMask">
              <rect x="0" y="0" width={data.w} height={data.h} fill="url(#heroGridFade)" />
            </mask>
          </defs>
          <g mask="url(#heroGridMask)">
            {data.segs.map((s, i) => (
              <line
                key={i}
                x1={s.x1} y1={s.y1}
                x2={s.x2} y2={s.y2}
                stroke={COLOR}
                strokeWidth={1}
                strokeDasharray={s.len}
                strokeDashoffset={s.len}
                style={{
                  animation: `heroGridDraw ${DRAW_DURATION}ms cubic-bezier(0.16,1,0.3,1) ${s.delay}ms forwards`
                }}
              />
            ))}
          </g>
          <style>{`
            @keyframes heroGridDraw { to { stroke-dashoffset: 0; } }
          `}</style>
        </svg>
      )}
    </div>
  )
}
