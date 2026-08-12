"use client"

import React from 'react'

/* Glass browser chrome — a translucent material layer that wraps every
   project screenshot so all mockups share the same presentation. */
export function BrowserFrame({ domain, className = "", children }: { domain?: string, className?: string, children: React.ReactNode }) {
  return (
    <div className={`glass rounded-xl overflow-hidden shadow-[0_24px_70px_-28px_rgba(0,0,0,0.6)] ${className}`}>
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/[0.08]">
        <span className="w-2 h-2 rounded-full bg-white/25" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/10" />
        {domain && (
          <span className="ml-3 inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wide text-ink-light bg-white/[0.05] rounded-md px-2.5 py-0.5 truncate">
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
