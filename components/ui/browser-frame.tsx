"use client"

import React from 'react'

/* Minimal warm-toned browser chrome — wraps project screenshots so every
   mockup on the site shares the same, consistent presentation. */
export function BrowserFrame({ domain, className = "", children }: { domain?: string, className?: string, children: React.ReactNode }) {
  return (
    <div className={`border border-divider/60 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.65)] ${className}`} style={{ background: '#0C0C0C' }}>
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-divider/40" style={{ background: '#111111' }}>
        <span className="w-2 h-2 rounded-full bg-divider" />
        <span className="w-2 h-2 rounded-full bg-divider/70" />
        <span className="w-2 h-2 rounded-full bg-divider/40" />
        {domain && (
          <span className="ml-3 inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wide text-ink-light px-2.5 py-0.5 truncate" style={{ background: '#121212' }}>
            <svg className="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
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
