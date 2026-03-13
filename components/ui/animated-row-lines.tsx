"use client"

import React from 'react'

const COLOR = 'rgba(120, 100, 78, 0.55)'

export function AnimatedRowLines({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const items = React.Children.toArray(children)

  return (
    <div className={className}>
      {items.map((child, i) => (
        <div key={i} className="relative">
          {child}
          {i < items.length - 1 && (
            <div
              className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background: COLOR,
                transform: 'scale(0)',
                transformOrigin: 'center',
                animation: 'rowLineDraw 900ms cubic-bezier(0.16,1,0.3,1) 150ms forwards',
              }}
            />
          )}
        </div>
      ))}
      <style>{`@keyframes rowLineDraw { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
    </div>
  )
}
