"use client"

import React from 'react'

/* Sharp hairline browser chrome — wraps every real screenshot.
   ground="ink" for dark sections, ground="light" for paper sections;
   hairlines and chrome re-derive per ground. Square ticks, no radius,
   no shadow, no hover behavior. */
export function BrowserFrame({ domain, ground = "light", className = "", children }: { domain?: string, ground?: "ink" | "light", className?: string, children: React.ReactNode }) {
  const dark = ground === "ink"
  return (
    <div
      className={className}
      style={{ border: `1px solid ${dark ? '#57433B' : '#E8E3E0'}`, background: dark ? undefined : '#FFFFFF' }}
    >
      <div
        className="flex items-center gap-1.5 h-9 px-3.5"
        style={{ background: dark ? '#36241D' : '#FAF7F5', borderBottom: `1px solid ${dark ? '#57433B' : '#E8E3E0'}` }}
      >
        <span className="w-1.5 h-1.5" style={{ background: dark ? 'rgba(255,255,255,0.25)' : 'rgba(37,17,9,0.12)' }} />
        <span className="w-1.5 h-1.5" style={{ background: dark ? 'rgba(255,255,255,0.25)' : 'rgba(37,17,9,0.12)' }} />
        <span className="w-1.5 h-1.5" style={{ background: dark ? 'rgba(255,255,255,0.25)' : 'rgba(37,17,9,0.12)' }} />
        {domain && (
          <span
            className="ml-3 text-[10px] font-mono tracking-[0.08em] uppercase truncate"
            style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(37,17,9,0.5)' }}
          >
            {domain}
          </span>
        )}
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  )
}
