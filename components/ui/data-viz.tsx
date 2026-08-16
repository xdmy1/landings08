"use client"

import React, { useEffect, useRef, useState } from 'react'

/* ────────────────────────────────────────────────────────────────
   Data visuals for the bento cells.
   Every one is ENTRANCE-ONLY: it plays once when scrolled into view,
   then holds. No perpetual loops. Each visual is visually distinct so
   no two cards on a page ever wear the same one.
   ──────────────────────────────────────────────────────────────── */

const CORAL = '#FF9E7A'

function useSeen(threshold = 0.25) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, seen }
}

/* 1 ── Sparkline: a line that draws itself, glowing dot lands at the end */
export function Sparkline({ points = [8, 14, 11, 20, 17, 26, 24, 34, 46], className = '' }: { points?: number[], className?: string }) {
  const { ref, seen } = useSeen()
  const w = 104, h = 40, max = Math.max(...points)
  const d = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / max) * (h - 6) - 3}`).join(' ')
  const last = { x: w, y: h - (points[points.length - 1] / max) * (h - 6) - 3 }
  return (
    <div ref={ref} className={className} aria-hidden>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        <polyline
          points={d}
          fill="none"
          stroke={CORAL}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: seen ? 0 : 200,
            transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        <circle
          cx={last.x} cy={last.y} r="3.5" fill={CORAL}
          style={{ opacity: seen ? 1 : 0, transition: 'opacity 0.3s ease-out 0.85s', filter: 'drop-shadow(0 0 6px rgba(255,158,122,0.9))' }}
        />
      </svg>
    </div>
  )
}

/* 2 ── Segment meter: a battery-style row that charges up once */
export function SegmentMeter({ total = 7, filled = 5, className = '' }: { total?: number, filled?: number, className?: string }) {
  const { ref, seen } = useSeen()
  return (
    <div ref={ref} className={`flex items-center gap-1 ${className}`} aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-5 w-2.5 rounded-[3px]"
          style={{
            background: i < filled ? CORAL : 'rgba(255,255,255,0.1)',
            boxShadow: i < filled ? '0 0 8px rgba(255,158,122,0.45)' : 'none',
            opacity: seen ? 1 : 0,
            transform: seen ? 'scaleY(1)' : 'scaleY(0.35)',
            transition: `opacity 0.25s ease-out ${i * 0.07}s, transform 0.3s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s`,
          }}
        />
      ))}
    </div>
  )
}

/* 3 ── Gauge: a half-dial whose needle swings once into position */
export function Gauge({ value = 0.72, className = '' }: { value?: number, className?: string }) {
  const { ref, seen } = useSeen()
  const angle = -90 + value * 180
  return (
    <div ref={ref} className={className} aria-hidden>
      <svg width="82" height="48" viewBox="0 0 82 48" className="overflow-visible">
        <path d="M6 44 A 35 35 0 0 1 76 44" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M6 44 A 35 35 0 0 1 76 44"
          fill="none" stroke={CORAL} strokeWidth="5" strokeLinecap="round"
          style={{
            strokeDasharray: 110,
            strokeDashoffset: seen ? 110 - value * 110 : 110,
            transition: 'stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        <line
          x1="41" y1="44" x2="41" y2="16"
          stroke="#fff" strokeWidth="2" strokeLinecap="round"
          style={{
            transformOrigin: '41px 44px',
            transform: `rotate(${seen ? angle : -90}deg)`,
            transition: 'transform 1.1s cubic-bezier(0.34,1.3,0.64,1)',
          }}
        />
        <circle cx="41" cy="44" r="3" fill="#fff" />
      </svg>
    </div>
  )
}

/* 4 ── Heat grid: cells ignite in a diagonal wave, once */
export function HeatGrid({ cols = 8, rows = 3, lit = [2, 5, 7, 10, 12, 15, 18, 20, 22, 23], className = '' }: { cols?: number, rows?: number, lit?: number[], className?: string }) {
  const { ref, seen } = useSeen()
  const total = cols * rows
  return (
    <div ref={ref} className={`grid gap-1 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }} aria-hidden>
      {Array.from({ length: total }).map((_, i) => {
        const on = lit.includes(i)
        const wave = ((i % cols) + Math.floor(i / cols)) * 0.045
        return (
          <span
            key={i}
            className="aspect-square rounded-[2px]"
            style={{
              background: on ? CORAL : 'rgba(255,255,255,0.07)',
              boxShadow: on ? '0 0 7px rgba(255,158,122,0.5)' : 'none',
              opacity: seen ? (on ? 1 : 0.6) : 0,
              transform: seen ? 'scale(1)' : 'scale(0.4)',
              transition: `opacity 0.3s ease-out ${wave}s, transform 0.3s cubic-bezier(0.22,1,0.36,1) ${wave}s`,
            }}
          />
        )
      })}
    </div>
  )
}

/* 5 ── Donut split: segments draw in sequence around a ring */
export function DonutSplit({ parts = [0.5, 0.3, 0.2], className = '' }: { parts?: number[], className?: string }) {
  const { ref, seen } = useSeen()
  const C = 176, r = 28
  let offset = 0
  const shades = [CORAL, 'rgba(255,158,122,0.55)', 'rgba(255,255,255,0.22)']
  return (
    <div ref={ref} className={className} aria-hidden>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="8" />
        {parts.map((p, i) => {
          const dash = p * C
          const el = (
            <circle
              key={i}
              cx="36" cy="36" r={r} fill="none"
              stroke={shades[i % shades.length]} strokeWidth="8" strokeLinecap="butt"
              transform={`rotate(${-90 + (offset / C) * 360} 36 36)`}
              style={{
                strokeDasharray: `${dash} ${C}`,
                strokeDashoffset: seen ? 0 : dash,
                transition: `stroke-dashoffset 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.22}s`,
              }}
            />
          )
          offset += dash
          return el
        })}
      </svg>
    </div>
  )
}

/* 6 ── Odometer: digits roll up into place */
export function Odometer({ value, prefix = '', suffix = '', className = '' }: { value: number, prefix?: string, suffix?: string, className?: string }) {
  const { ref, seen } = useSeen()
  const digits = String(value).split('')
  return (
    <span ref={ref as React.RefObject<HTMLDivElement>} className={`inline-flex items-baseline tabular-nums ${className}`}>
      {prefix}
      {digits.map((d, i) => (
        <span key={i} className="relative inline-block overflow-hidden" style={{ height: '1em', lineHeight: 1 }}>
          <span
            className="block"
            style={{
              transform: seen ? 'translateY(0)' : 'translateY(0.85em)',
              opacity: seen ? 1 : 0,
              transition: `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, opacity 0.35s ease-out ${i * 0.08}s`,
            }}
          >
            {d}
          </span>
        </span>
      ))}
      {suffix}
    </span>
  )
}

/* 7 ── Orbit: a satellite swings once around its center and parks */
export function Orbit({ className = '' }: { className?: string }) {
  const { ref, seen } = useSeen()
  return (
    <div ref={ref} className={`relative ${className}`} style={{ width: 58, height: 58 }} aria-hidden>
      <span className="absolute inset-0 rounded-full" style={{ border: '1px dashed rgba(255,255,255,0.16)' }} />
      <span
        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
        style={{ background: '#fff', transform: 'translate(-50%,-50%)', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}
      />
      <span
        className="absolute left-1/2 top-1/2"
        style={{
          width: 0, height: 0,
          transform: `rotate(${seen ? 300 : 0}deg)`,
          transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span
          className="absolute h-2.5 w-2.5 rounded-full"
          style={{ background: CORAL, top: -29, left: -5, boxShadow: '0 0 10px rgba(255,158,122,0.9)' }}
        />
      </span>
    </div>
  )
}

/* 8 ── Wave: a stepped pulse line that sweeps in from the left */
export function WaveLine({ className = '' }: { className?: string }) {
  const { ref, seen } = useSeen()
  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-hidden>
      <svg width="110" height="34" viewBox="0 0 110 34">
        <path
          d="M0 24 H18 L24 24 L28 8 L34 30 L40 24 H58 L64 24 L68 12 L74 28 L80 24 H110"
          fill="none" stroke={CORAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{
            strokeDasharray: 220,
            strokeDashoffset: seen ? 0 : 220,
            transition: 'stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)',
            filter: 'drop-shadow(0 0 5px rgba(255,158,122,0.45))',
          }}
        />
      </svg>
    </div>
  )
}

/* 9 ── Stack: horizontal proportion bars that unroll left to right */
export function StackBars({ rows = [0.9, 0.62, 0.38], className = '' }: { rows?: number[], className?: string }) {
  const { ref, seen } = useSeen()
  return (
    <div ref={ref} className={`flex w-full flex-col gap-1.5 ${className}`} aria-hidden>
      {rows.map((v, i) => (
        <span key={i} className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <span
            className="block h-full rounded-full"
            style={{
              width: seen ? `${v * 100}%` : '0%',
              background: i === 0 ? CORAL : `rgba(255,158,122,${0.75 - i * 0.22})`,
              transition: `width 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
            }}
          />
        </span>
      ))}
    </div>
  )
}

/* 10 ── Concentric: rings expand outward once, like a ping */
export function Concentric({ className = '' }: { className?: string }) {
  const { ref, seen } = useSeen()
  return (
    <div ref={ref} className={`relative ${className}`} style={{ width: 60, height: 60 }} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: 18 + i * 18,
            height: 18 + i * 18,
            marginLeft: -(9 + i * 9),
            marginTop: -(9 + i * 9),
            border: `1.5px solid rgba(255,158,122,${0.85 - i * 0.26})`,
            opacity: seen ? 1 : 0,
            transform: seen ? 'scale(1)' : 'scale(0.3)',
            transition: `opacity 0.4s ease-out ${i * 0.13}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.13}s`,
          }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: CORAL, boxShadow: '0 0 10px rgba(255,158,122,0.9)' }} />
    </div>
  )
}
