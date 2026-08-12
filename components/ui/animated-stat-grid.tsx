"use client"

import React, { useEffect, useRef, useState } from 'react'

const COLOR = 'rgba(255, 255, 255, 0.08)'
const ANIM  = 'statDivDraw 900ms cubic-bezier(0.16,1,0.3,1) 150ms forwards'

export function AnimatedStatGrid({
  children,
  className = '',
  stagger = 150,
  mobileCols = 2,
  desktopCols = 4,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  mobileCols?: number
  desktopCols?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

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

  const items = React.Children.toArray(children)
  const count = items.length
  const mobileRows  = Math.ceil(count / mobileCols)
  const desktopRows = Math.ceil(count / desktopCols)

  // Divider style: invisible + no animation until intersection fires
  const lineStyle = visible
    ? { background: COLOR, transformOrigin: 'center', animation: ANIM }
    : { background: COLOR, transformOrigin: 'center', transform: 'scale(0)' }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {items.map((child, i) => {
        const mc = i % mobileCols,  mr = Math.floor(i / mobileCols)
        const dc = i % desktopCols, dr = Math.floor(i / desktopCols)

        const showRM = mc < mobileCols  - 1
        const showRD = dc < desktopCols - 1
        const showBM = mr < mobileRows  - 1
        const showBD = dr < desktopRows - 1

        // null = don't render; '' = always show; 'md:hidden' / 'hidden md:block' = responsive
        const rightClass  = showRM && showRD ? '' : showRM ? 'md:hidden' : showRD ? 'hidden md:block' : null
        const bottomClass = showBM && showBD ? '' : showBM ? 'md:hidden' : showBD ? 'hidden md:block' : null

        return (
          <div
            key={i}
            className="relative transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(12px)',
              transitionDelay: `${i * stagger}ms`,
            }}
          >
            {child}

            {/* Right divider */}
            {rightClass !== null && (
              <div
                className={`absolute right-0 top-0 bottom-0 w-px pointer-events-none ${rightClass}`}
                style={lineStyle}
              />
            )}

            {/* Bottom divider */}
            {bottomClass !== null && (
              <div
                className={`absolute bottom-0 left-0 right-0 h-px pointer-events-none ${bottomClass}`}
                style={lineStyle}
              />
            )}
          </div>
        )
      })}

      <style>{`@keyframes statDivDraw { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
    </div>
  )
}
