"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SiteNav } from '@/components/ui/site-nav'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

function RevealText({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.01)
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(110%)',
          opacity: visible ? 1 : 0,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.01)
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function NotFound() {
  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen text-ink grain overflow-hidden" style={{ background: '#0D0D0D' }}>

      <SiteNav contactHref="/#contact" />

      <div className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 relative line-sides">

        {/* Main content */}
        <section
          className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-32 pb-20 glow-amber"
          style={{ background: 'radial-gradient(ellipse 100% 80% at 60% 40%, #1B1B1B 0%, #131313 35%, #0D0D0D 75%)' }}
        >

          {/* Big ghost "404" */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="font-serif leading-none"
              style={{
                fontSize: 'clamp(180px, 40vw, 480px)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(180, 140, 100, 0.08)',
                letterSpacing: '-0.04em',
              }}
            >
              404
            </span>
          </div>

          {/* Floating amber dot accent */}
          <div
            className="absolute top-1/3 right-[15%] w-1 h-1 rounded-full bg-amber/40 pointer-events-none"
            style={{ boxShadow: '0 0 20px 6px rgba(232, 130, 90, 0.15)' }}
          />
          <div
            className="absolute bottom-1/3 left-[20%] w-px h-16 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(232, 130, 90, 0.25), transparent)' }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-xl">

            <FadeIn delay={0}>
              <span className="text-amber text-[11px] font-mono tracking-[0.25em] uppercase block mb-8">
                Error 404
              </span>
            </FadeIn>

            <RevealText delay={100}>
              <h1 className="font-serif text-[clamp(2.8rem,6vw,5rem)] text-ink leading-[1.05] tracking-[-0.02em]">
                This page<br />
                <span className="italic text-amber">doesn't exist.</span>
              </h1>
            </RevealText>

            <FadeIn delay={400}>
              <p className="mt-6 text-ink-muted text-[15px] leading-relaxed max-w-sm">
                Whatever you were looking for, it's not here. But a website that actually gets you clients, that we can do.
              </p>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="mt-12 flex flex-col sm:flex-row items-start gap-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 text-amber hover:text-amber-light text-sm tracking-wide transition-colors group"
                >
                  Back to homepage
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="mailto:contact@landings.md"
                  className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm tracking-wide transition-colors"
                >
                  Or contact us
                </Link>
              </div>
            </FadeIn>

          </div>

          {/* Bottom label */}
          <FadeIn delay={900} className="absolute bottom-10 right-6 md:right-12 lg:right-16">
            <span className="text-ink-light/30 text-[10px] font-mono tracking-[0.2em] uppercase">
              landings.md
            </span>
          </FadeIn>

        </section>

        {/* Footer */}
        <footer className="line-top px-6 md:px-12 lg:px-16 py-8 pb-10" style={{ background: 'linear-gradient(180deg, #101010 0%, #0A0A0A 100%)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image src="/images/logowhite.png" alt="landings.md" width={18} height={30} className="w-[18px] h-auto opacity-60" />
            </Link>
            <div className="flex items-center gap-6 text-[11px] text-ink-muted font-mono">
              <Link href="/portfolio" className="hover:text-ink transition-colors">Portfolio</Link>
              <Link href="/pricing" className="hover:text-ink transition-colors">Pricing</Link>
              <Link href="/solutions" className="hover:text-ink transition-colors">Solutions</Link>
              <Link href="mailto:contact@landings.md" className="hover:text-ink transition-colors">contact@landings.md</Link>
            </div>
          </div>
        </footer>

      </div>

      <style jsx>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
