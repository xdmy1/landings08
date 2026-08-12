"use client"

import React from 'react'

const COLOR = 'rgba(255, 255, 255, 0.09)'
const ANIM  = 'railDraw 900ms cubic-bezier(0.16,1,0.3,1) 100ms forwards'

export function PageLines() {
  return (
    <>
      <div
        className="absolute inset-y-0 left-0 w-px pointer-events-none"
        style={{ background: COLOR, transform: 'scale(0)', transformOrigin: 'center', animation: ANIM }}
      />
      <div
        className="absolute inset-y-0 right-0 w-px pointer-events-none"
        style={{ background: COLOR, transform: 'scale(0)', transformOrigin: 'center', animation: ANIM }}
      />
      <style>{`@keyframes railDraw { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
    </>
  )
}
