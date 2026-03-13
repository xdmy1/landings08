"use client"

import { useEffect, useState } from 'react'

interface LineData {
  w: number
  h: number
  ys: number[]
}

export function PageLines({ containerId }: { containerId: string }) {
  const [data, setData] = useState<LineData | null>(null)

  useEffect(() => {
    const el = document.getElementById(containerId)
    if (!el) return
    const t = setTimeout(() => {
      const rect = el.getBoundingClientRect()
      const w = rect.width
      const h = el.scrollHeight
      const elTop = rect.top + window.scrollY
      const ys = Array.from(el.querySelectorAll('[data-hline]')).map(
        s => (s as HTMLElement).getBoundingClientRect().top + window.scrollY - elTop
      )
      setData({ w, h, ys })
    }, 100)
    return () => clearTimeout(t)
  }, [containerId])

  if (!data) return null

  const { w, h, ys } = data

  const DUR  = 900
  const INIT = 150
  const vmid = h / 2
  const hmid = w / 2

  type Seg = { x1:number; y1:number; x2:number; y2:number; len:number }

  const vSegs: Seg[] = [
    { x1: 0.5,     y1: vmid, x2: 0.5,     y2: 0, len: vmid },
    { x1: 0.5,     y1: vmid, x2: 0.5,     y2: h, len: h - vmid },
    { x1: w - 0.5, y1: vmid, x2: w - 0.5, y2: 0, len: vmid },
    { x1: w - 0.5, y1: vmid, x2: w - 0.5, y2: h, len: h - vmid },
  ]

  const hSegs: Seg[] = ys.flatMap(y => [
    { x1: hmid, y1: y + 0.5, x2: 0,   y2: y + 0.5, len: hmid },
    { x1: hmid, y1: y + 0.5, x2: w,   y2: y + 0.5, len: w - hmid },
  ])

  const allSegs = [...vSegs, ...hSegs]

  return (
    // SVG is sized purely by CSS (inset-0 fills container), viewBox maps the coordinate system
    <svg
      className="absolute inset-0 pointer-events-none"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%', zIndex: 10 }}
    >
      {allSegs.map((s, i) => (
        <line
          key={i}
          x1={s.x1} y1={s.y1}
          x2={s.x2} y2={s.y2}
          stroke="rgba(120,100,78,0.65)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          strokeDasharray={s.len}
          strokeDashoffset={s.len}
          style={{
            animation: `plDraw ${DUR}ms cubic-bezier(0.16,1,0.3,1) ${INIT}ms forwards`
          }}
        />
      ))}

      <style>{`@keyframes plDraw { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  )
}
