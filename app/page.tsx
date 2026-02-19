"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { InteractiveGridBackground } from '@/components/ui/interactive-grid-background'
import { EncryptedText } from '@/components/ui/encrypted-text'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { StickyContactPill } from '@/components/ui/sticky-contact-pill'

const techStack = [
  {
    id: 1,
    name: "Next.js",
    designation: "React Framework",
    image: "/images/nextjs.png",
  },
  {
    id: 2,
    name: "React",
    designation: "Frontend Library",
    image: "/images/react.png",
  },
  {
    id: 3,
    name: "Tailwind CSS",
    designation: "CSS Framework", 
    image: "/images/tailwind.png",
  },
  {
    id: 4,
    name: "JavaScript",
    designation: "Programming Language",
    image: "/images/js.png",
  },
  {
    id: 5,
    name: "HTML5",
    designation: "Markup Language",
    image: "/images/html.png",
  },
]

export default function HomePage() {
  const [language, setLanguage] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Load language from localStorage on mount, default to English
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ro')) {
      setLanguage(savedLanguage)
    } else {
      setLanguage('en')
    }
  }, [])

  // Save language to localStorage when changed
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const text = {
    en: {
      nav: {
        home: "Home",
        portfolio: "Portfolio",
        pricing: "Pricing",
        solutions: "Solutions",
        contact: "Contact Me"
      },
      announcement: "We create websites that sell",
      hero: {
        title1: "Superior",
        title2: "websites ",
        title3: "in Europe",
        title4: "",
        description: "We create modern, fast and SEO-optimized websites that help your business reach new customers and increase sales.",
        cta1: "View Portfolio", 
        cta2: "Custom Quote",
        encrypted: "professional websites that drive results"
      },
      portfolio: {
        title: "Create professional websites that convert",
        subtitle: "Modern, fast, and optimized websites that help your business grow."
      }
    },
    ro: {
      nav: {
        home: "Acasă",
        portfolio: "Portofoliu",
        pricing: "Prețuri",
        solutions: "Soluții",
        contact: "Contactează-mă"
      },
      announcement: "Creăm website-uri care vând",
      hero: {
        title1: "Website-uri",
        title2: "superioare",
        title3: "în Europa",
        title4: "",
        description: "Creăm website-uri moderne, rapide și optimizate SEO care ajută afacerea ta să ajungă la clienți noi și să crească vânzările.",
        cta1: "Vezi Portofoliul",
        cta2: "Ofertă Personalizată",
        encrypted: "website-uri profesionale cu rezultate garantate"
      },
      portfolio: {
        title: "Creează website-uri profesionale care convertesc",
        subtitle: "Website-uri moderne, rapide și optimizate care ajută afacerea ta să crească."
      }
    }
  }

  const t = text[language as keyof typeof text]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <InteractiveGridBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between min-h-[48px]">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/images/logowhite.png"
                alt="landings.md"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-8 text-neutral-400">
                <Link href="/" className="hover:text-white transition-all duration-300 hover:bg-neutral-800/50 px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700">
                  {t.nav.home}
                </Link>
                <Link href="/portfolio" className="hover:text-white transition-all duration-300 hover:bg-neutral-800/50 px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700">
                  {t.nav.portfolio}
                </Link>
                <Link href="/pricing" className="hover:text-white transition-all duration-300 hover:bg-neutral-800/50 px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700">
                  {t.nav.pricing}
                </Link>
                <Link href="/solutions" className="hover:text-white transition-all duration-300 hover:bg-neutral-800/50 px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700">
                  {t.nav.solutions}
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLanguageChange(language === 'en' ? 'ro' : 'en')}
                  className="text-neutral-400 hover:text-white transition-all duration-300 text-sm font-medium px-3 py-2 rounded-md hover:bg-neutral-800/80 border border-neutral-700/50 hover:border-neutral-600 backdrop-blur-sm"
                >
                  {language.toUpperCase()}
                </button>
                <Link href="https://wa.me/37368327082">
                  <Button className="bg-gradient-to-r from-white to-neutral-200 hover:from-neutral-100 hover:to-neutral-300 text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    {t.nav.contact}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ro' : 'en')}
                className="text-neutral-400 hover:text-white transition-all duration-300 text-sm font-medium px-3 py-2 rounded-md hover:bg-neutral-800/80 border border-neutral-700/50"
              >
                {language.toUpperCase()}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg border border-neutral-700/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all duration-300"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-8 right-8 mt-4 p-4 bg-neutral-900/95 backdrop-blur-md rounded-xl border border-neutral-700/50 z-50"
            >
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/" 
                  className="text-neutral-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-neutral-800/50 text-center border border-transparent hover:border-neutral-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.home}
                </Link>
                <Link 
                  href="/portfolio" 
                  className="text-neutral-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-neutral-800/50 text-center border border-transparent hover:border-neutral-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.portfolio}
                </Link>
                <Link
                  href="/pricing"
                  className="text-neutral-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-neutral-800/50 text-center border border-transparent hover:border-neutral-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.pricing}
                </Link>
                <Link
                  href="/solutions"
                  className="text-neutral-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-neutral-800/50 text-center border border-transparent hover:border-neutral-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.solutions}
                </Link>
                <Link
                  href="https://wa.me/37368327082"
                  className="bg-gradient-to-r from-white to-neutral-200 hover:from-neutral-100 hover:to-neutral-300 text-black font-medium p-3 rounded-full transition-all duration-300 hover:scale-105 text-center mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.contact}
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 px-8 max-w-7xl mx-auto min-h-screen items-center pt-28">
        
        {/* Left Column - Hero Content */}
        <div className="space-y-8 text-center lg:text-left">
          
          {/* Announcement Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-neutral-900/50 border border-neutral-700/50 rounded-full px-4 py-2 text-sm mx-auto lg:mx-0"
          >
            <span className="text-neutral-300">{t.announcement}</span>
            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>

          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight">
              <div className="space-y-2">
                <div>{t.hero.title1}</div>
                <div>{t.hero.title2}</div>
                <div className="relative inline-block">
                  <span className="relative z-10 text-white px-6 py-2">{t.hero.title3}</span>
                  <div className="absolute inset-0 bg-neutral-800 rounded-2xl transform rotate-1"></div>
                </div>

              </div>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-neutral-400 leading-relaxed max-w-lg"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-medium px-8 py-4 rounded-full text-base">
              {t.hero.cta1}
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-600 text-white hover:bg-neutral-900 px-8 py-4 rounded-full text-base">
              {t.hero.cta2}
            </Button>
          </motion.div>

        </div>

        {/* Right Column - Simple Preview */}
        <div className="space-y-6 relative text-center lg:text-left">
          
          {/* Simple Portfolio Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.15)] rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {t.portfolio.title}
            </h3>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
              {t.portfolio.subtitle}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-neutral-800/50">
                <Image
                  src="/images/elenadiacon (1).png"
                  alt="Elena Diacon Project"
                  width={400}
                  height={300}
                  quality={95}
                  priority
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    console.log('Image failed to load:', e);
                  }}
                />
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-neutral-800/50">
                <Image
                  src="/images/respectauto (1).png"
                  alt="Respect Auto Project" 
                  width={400}
                  height={300}
                  quality={95}
                  priority
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    console.log('Image failed to load:', e);
                  }}
                />
              </div>
            </div>
            <Link href="/portfolio">
              <button className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-sm font-medium transition-colors">
                View Portfolio →
              </button>
            </Link>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 pt-6"
          >
            <span className="text-sm text-neutral-500">Built with</span>
            <div className="flex items-center">
              <AnimatedTooltip items={techStack} />
            </div>
          </motion.div>

          {/* Encrypted Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-4 text-center sm:text-left overflow-hidden"
          >
            <div className="w-full max-w-full h-[55px]">
              <EncryptedText text={t.hero.encrypted} className="text-lg font-mono text-neutral-400" />
            </div>
          </motion.div>

        </div>

      </div>

      {/* Why Us Section */}
      <section className="relative z-10 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {language === 'en' ? '50+ projects delivered.' : '50+ proiecte livrate.'}
                <br />
                <span className="text-neutral-500">{language === 'en' ? 'Zero unsatisfied clients.' : 'Zero clienți nemulțumiți.'}</span>
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
                {language === 'en'
                  ? "From auto services to dental clinics, from e-commerce to educational platforms — we've built it all. Every project is custom, every line of code is ours."
                  : "De la service-uri auto la clinici dentare, de la e-commerce la platforme educaționale — le-am construit pe toate. Fiecare proiect e custom, fiecare linie de cod e a noastră."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-8"
            >
              <div>
                <div className="text-4xl font-bold text-white mb-1">5+</div>
                <div className="text-sm text-neutral-500">{language === 'en' ? 'Years in business' : 'Ani în business'}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">300%</div>
                <div className="text-sm text-neutral-500">{language === 'en' ? 'Avg. organic growth' : 'Creștere organică medie'}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-neutral-500">{language === 'en' ? 'Support included' : 'Suport inclus'}</div>
              </div>
            </motion.div>
          </div>

          {/* Project Images Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { src: "/images/radx.png", alt: "RADX" },
              { src: "/images/inter-bus.png", alt: "Inter-Bus" },
              { src: "/images/elenadiacon (1).png", alt: "Elena Diacon" },
              { src: "/images/cmiea (1).png", alt: "CMIEA" },
            ].map((img, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-neutral-800/50 bg-neutral-900">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  quality={95}
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Free Consultation Section */}
      <section className="relative z-10 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-3xl p-8 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)'
              }}
            >
              {/* Signature SVG */}
              <div className="absolute top-4 right-6 opacity-20">
                <svg width="120" height="40" viewBox="0 0 234.23 67.13" className="text-white fill-current">
                  <path className="cls-1" d="M95.24,24.43c-10.77,11.2-22.4,21.58-34.76,30.99-3.61,2.75-7.29,5.42-11.02,8-.68.47-.1.64.47.57,12.75-1.43,25.39-3.82,37.77-7.17,6.12-1.66,12.18-3.55,18.16-5.67s11.53-4.13,17-6.78c3.94-1.91,8.47-4.76,9.09-9.5.7-5.39-4.22-9.4-8.89-10.72-2.73-.77-5.61-.91-8.43-.93-3.07-.02-6.14.09-9.2.3-6.05.41-12.07,1.27-17.99,2.54-13.42,2.88-26.35,7.84-38.2,14.77-.27.16-.53.45-.09.56,4.38,1.16,8.92.75,13.35.19,4.98-.63,9.96-1.29,14.93-1.93,9.92-1.28,19.84-2.57,29.76-3.85.51-.07,1.64-.19,1.94-.68s-.25-.48-.67-.43c-9.59,1.24-19.18,2.48-28.78,3.73-4.76.62-9.51,1.23-14.27,1.85s-9.3,1.26-13.89.04l-.09.56c9.83-5.74,20.44-10.09,31.48-12.87,5.51-1.39,11.13-2.38,16.79-2.97s11.49-1.04,17.13-.48c5,.5,10.51,2.8,11.98,8.09,1.36,4.88-2.4,8.56-6.31,10.73-2.26,1.25-4.71,2.19-7.1,3.17-2.76,1.13-5.55,2.2-8.35,3.23-5.49,2-11.05,3.81-16.67,5.41-12.83,3.65-25.94,6.22-39.19,7.71l.47.57c12.98-8.98,25.26-18.93,36.69-29.81,3.24-3.08,6.41-6.24,9.51-9.47.44-.45-.39-.45-.67-.43-.58.04-1.52.24-1.94.68h-.01Z"/>
                  <path className="cls-1" d="M135.23,30.66c-1.38-.11-2.73.24-3.85,1.06-.72.53-1.31,1.35-1.39,2.26s.2,1.74.8,2.41c.74.83,1.9,1.1,2.97,1.11,2.11,0,4.74-.92,5.8-2.88.79-1.46.42-3.47-1.16-4.23-1.18-.57-2.73-.22-3.83.36-.91.48-1.62,1.27-1.61,2.34,0,.22.42.33.55.35.34.06.75,0,1.08-.08.49-.14,1.28-.43,1.27-1.05,0,.09,0-.07,0-.09,0-.06.02-.13.04-.19,0-.05.04-.1.05-.14.07-.22-.05.07.02-.04.06-.1.13-.19.21-.28-.17.19-.02.05,0,0,.03-.03.06-.05.09-.07-.16.1-.18.12-.06.05.14-.09.05.05-.11.05.02,0,.12-.05.15-.06l-.22.08c.12-.03.1-.03-.04,0l-.12.02c.15-.02.11-.02-.12,0,0,0,.16,0,.16,0,0-.04-.3,0-.04,0,.08,0,.21.09,0,0,.07.03.15.06.22.1.15.07.07.04.03.01.07.05.14.1.2.16.08.07.16.16.23.24.17.2.26.38.35.65.18.55.19,1.06.02,1.61-.09.27-.16.4-.32.63-.04.05-.08.1-.12.16,0,0-.23.25-.07.1-.12.12-.25.22-.37.32-.25.2.15-.08-.02.02-.07.04-.14.08-.21.13-.1.06-.18.03.06-.02-.06,0-.13.06-.18.08-.02,0-.27.12-.28.11,0,0,.38-.11.09-.04-.06.02-.13.03-.19.05-.29.08.34-.05-.06,0-.1,0-.19.03-.29.03.06,0,.27,0,0,0,.02,0-.36-.02-.19,0s-.2-.03-.18-.03c-.22-.04-.58-.18-.74-.3-.46-.35-.76-.81-.9-1.37-.08-.31-.11-.61-.05-.92.06-.36.16-.59.35-.84.04-.05.08-.1.12-.15.14-.18-.09.05.08-.08.06-.05.13-.1.19-.15.07-.05.05-.04-.07.05.05-.03.11-.07.17-.1-.02,0-.3.16-.07.04.28-.15-.32.08-.02,0-.4.09-.17.04-.06.02.1,0,.06,0-.13,0.14,0,.13,0-.03,0,.69.05,1.52-.07,2.05-.55.16-.14.36-.34.3-.58-.06-.22-.35-.34-.55-.35h-.03Z"/>
                  <path className="cls-1" d="M139.5,31.18c-.54.15-1.09.39-1.53.75-.31.26-.52.54-.7.9-.24.47-.31,1.07-.16,1.58.17.58.64,1.04,1.21,1.22.96.31,2.04.17,2.96-.21.8-.32,1.66-.91,1.88-1.8.06-.22-.09-.37-.28-.46-.27-.12-.67-.11-.95-.06-.38.06-.77.16-1.1.36-.21.13-.5.3-.56.56-.03.11-.07.22-.12.33l.1-.19c-.07.13-.16.24-.26.35l.19-.19c-.05.05-.11.1-.16.15-.05.04-.19.13.03-.02s.08-.05.03-.02c-.03.02-.06.03-.08.05.28-.13.36-.17.24-.12-.02,0-.04.02-.06.03-.03,0-.06.02-.09.03.55-.21.37-.12.24-.08s-.33.05.25-.05c-.03,0-.06,0-.09.02h-.06c-.13,0-.04,0,.27-.02h-.2c.27.02.34.03.23.02h-.06c-.07,0-.14-.02-.22-.04l.26.07c-.13-.04-.26-.09-.37-.16l.19.11c-.18-.11-.33-.26-.45-.44l.1.16c-.17-.28-.24-.6-.23-.93v.19c0-.3.09-.59.23-.86l-.1.19c.08-.15.18-.28.3-.4l-.19.19s.08-.07.12-.1c.02-.02.05-.04.07-.06,0,0-.33.2-.17.12.02,0,.05-.03.07-.04.15-.08-.37.16-.23.11.02,0,.05-.02.07-.03,0,0-.48.15-.26.09.33-.09.71-.24.97-.46.13-.11.38-.36.3-.57-.08-.22-.33-.31-.55-.34-.36-.05-.73,0-1.08.09h0v-.02Z"/>
                  <path className="cls-1" d="M143.62,30.51c-.98,1.1-2.26,3.84-.21,4.57,1.62.58,3.45-.38,4.6-1.49.97-.93,1.71-2.03,2.19-3.29l-2.89.4c-.32,1-.64,2-.96,3-.11.35.3.48.54.54,2.84.67,6.37-.82,7.55-3.55l-2.79.75c.06.09.07.25.06.36-.02.24-.23.31.09.12-.21.13-.86.62-.47.92.79.6,1.75.74,2.71.58.51-.08,1.52-.33,1.66-.94s-.9-.59-1.23-.54c-.23.03-.2.04.08.02-.06,0-.11,0-.17-.03-.14-.07-.23-.1-.35-.19l-.47.92c.85-.52,1.38-1.4.78-2.32-.24-.37-1.21-.2-1.53-.11-.48.14-1.06.37-1.27.86-.16.37-.39.72-.67,1.02-.28.3-.46.41-.79.59-.09.05-.16.07-.03,0-.04.02-.44.15-.12.06-.08.02-.17.05-.25.07-.38.1.16,0-.06,0-.09,0-.29.02-.09.02h-.33s-.34-.05-.52-.1l.54.54c.32-1,.64-2,.96-3,.19-.6-.91-.59-1.23-.54-.57.09-1.43.33-1.66.94-.32.83-.77,1.57-1.35,2.24-.25.29-.54.56-.85.79s-.13.06-.11.07c.08.09.59-.24.69-.09-.06-.1-.18-.08-.24-.15-.71-.81.26-2.41.86-3.08.46-.52-.39-.76-.76-.76-.68,0-1.46.25-1.92.77h0v.02Z"/>
                  <path className="cls-1" d="M158.65,29.26c-.32.24-.57.48-.79.82-.14.22-.24.48-.3.73s-.06.51-.04.77c0,.19.05.38.13.56.21.48.55.9,1.04,1.12.37.17.7.25,1.1.3.43.05.86,0,1.28-.1s.85-.27,1.23-.5.63-.5.89-.83c.15-.19.12-.51-.03-.69-.17-.22-.54-.31-.8-.32-.38-.02-.79.05-1.14.21l-.32.18c-.18.11-.33.26-.44.44l-.02.02.18-.23c-.06.08-.14.15-.22.22l.26-.21c-.07.06-.15.11-.23.15l.32-.18c-.08.04-.16.08-.25.11l.38-.13c-.09.03-.18.05-.27.07l.39-.07c-.09.02-.18.02-.28.03h.37c-.11,0-.23-.01-.34-.03l.33.05c-.12-.02-.24-.05-.35-.1l.27.11c-.13-.06-.25-.13-.37-.22l.2.16c-.15-.12-.27-.27-.37-.45l.11.21c-.11-.22-.17-.46-.18-.71v.24c0-.24.04-.47.12-.69l-.09.24c.06-.15.14-.29.24-.42l-.18.23c.06-.08.13-.15.21-.22l-.26.21s.03-.03.05-.04c.22-.17.48-.39.53-.68.04-.25-.1-.49-.32-.61-.29-.16-.65-.2-.97-.15-.37.05-.79.15-1.09.38h0l.02.02Z"/>
                  <path className="cls-1" d="M163.22,24h-.59c-.2,0-.4.06-.58.14-.18.05-.35.14-.51.26-.14.1-.26.22-.34.37-.1.12-.15.26-.17.41l.02.28c.06.19.17.34.33.46l.28.14c.23.08.47.11.71.09h.59c.2,0,.4-.06.58-.14.18-.05.35-.14.51-.26.14-.1.26-.22.34-.37.1-.12.15-.26.17-.41l-.02-.28c-.06-.19-.17-.34-.33-.46l-.28-.14c-.23-.08-.47-.11-.71-.09h0Z"/>
                  <path className="cls-1" d="M171.05,27.67c0-.35-.28-.62-.6-.74-.62-.23-1.32-.15-1.95,0-.49.12-1,.33-1.42.61-.47.32-.85.72-1.23,1.14-.61.66-1.08,1.46-1.05,2.38.02.75.45,1.5,1.16,1.79s1.58.23,2.32.02c.69-.2,1.33-.53,1.89-.98.65-.52,1.17-1.25,1.42-2.05.21-.67.21-1.46-.14-2.09-.21-.38-.44-.63-.81-.85-.28-.17-.62-.27-.94-.31-1.1-.14-2.32.1-3.26.71-.71.47-1.32,1.17-1.12,2.08.05.23.37.34.55.37.33.07.76.02,1.08-.07s.71-.23.97-.48c.17-.16.35-.35.29-.6-.02-.1-.03-.19-.03-.29v.2c0-.17.04-.33.12-.48l-.1.2c.05-.09.13-.17.17-.25-.13.23-.16.16-.05.06.1-.09.25-.14-.1.06.05-.03.09-.06.14-.09.24-.15-.33.14-.14.07.03-.01.05-.02.08-.03.14-.05.05-.02-.26.08.06-.02.11-.03.17-.05.22-.06-.48.08-.18.04.13-.02.35,0-.15,0h.17c.19,0-.37-.05-.11,0,.06,0,.11.02.17.03.16.03-.28-.11-.06-.02.1.05.2.09.3.15l-.19-.13c.2.14.34.31.47.51l-.1-.17c.2.35.29.74.28,1.15v-.2c0,.44-.13.85-.32,1.25l.1-.2c-.11.23-.25.44-.4.64-.04.05-.08.09-.11.13-.13.16.19-.19,0-.01-.09.09-.19.17-.28.25-.17.14.27-.17.08-.05-.06.04-.12.07-.19.11-.22.14.33-.14.03-.02s.34-.08.07-.02l.25-.05c-.14.02-.09.02.15,0-.25,0,.29.06.04,0-.23-.05.19.09.03,0-.06-.03-.12-.06-.18-.1l.19.13c-.18-.12-.31-.26-.43-.44l.1.17c-.18-.3-.26-.63-.26-.98v.2c0-.35.1-.67.25-.99l-.1.2c.16-.31.37-.59.6-.86.03-.04.06-.07.09-.11-.11.11-.12.13-.04.05.07-.07.13-.13.2-.2.11-.11.22-.22.34-.32.18-.16-.27.17-.09.06.06-.03.11-.06.17-.1-.43.24-.22.11-.1.06.22-.09-.44.13-.17.06s-.41.07-.19.04c.21-.03-.43,0-.15.01-.25-.03-.32-.03-.2-.02.1.02.05,0-.16-.05.03.03.08.04.12.06l-.19-.13s.08.07.11.12l-.1-.17c.04.08.06.16.06.26,0,.22.41.35.55.37.33.07.76.02,1.08-.07s.71-.23.97-.48c.19-.18.3-.33.29-.6h0l.03.03Z"/>
                  <path className="cls-1" d="M171.81,27.74c-1.03.24-2.16.86-1.98,2.07.16,1.12,1.16,1.58,2.19,1.55,1.51-.05,3.04-.76,3.97-1.96.83-1.07,1.17-2.63,2.32-3.41l-2.56.13c-.21,1.21-.03,2.34.66,3.37.42.62,1.8.14,2.3-.13,1.45-.78,2.75-1.77,3.82-3.02l-2.77.46c.15,1.17.69,2.19,1.55,2.99.57.54,2.23-.1,2.68-.58,1.07-1.15,2.38-2.08,3.9-2.53.31-.09,1.44-.42,1.31-.92s-1.33-.22-1.59-.14c-2.39.69-4.56,1.9-6.26,3.72l2.68-.58c-.79-.75-1.23-1.66-1.37-2.74-.1-.82-2.49.13-2.77.46-.83.96-1.77,1.76-2.89,2.36l2.3-.13c-.61-.92-.88-1.97-.69-3.06.17-.95-2.26-.07-2.56.13-1.43.97-1.75,2.57-2.79,3.84-.1.13-.21.25-.33.36-.07.07-.14.13-.23.19-.29.18-.05.14.72-.12-.03-.09-.38-.26-.47-.39-.14-.2-.22-.47-.24-.71,0-.11.03-.23.02-.33l.04-.12c.14-.28-.09-.18-.69.3.31-.07,1.44-.43,1.31-.92s-1.32-.2-1.59-.14h0Z"/>
                  <path className="cls-1" d="M187.64,27.34c1.67,0,2.21-2.17.24-2.17-1.67,0-2.21,2.17-.24,2.17h0Z"/>
                  <path className="cls-1" d="M184.24,29.91c.55,0,1.63-.21,1.92-.75s-.25-.7-.74-.7c-.55,0-1.63.21-1.92.75s.25.7.74.7h0Z"/>
                  <path className="cls-1" d="M185.47,30.08c8.25-2.33,16.32-5.3,24.09-8.92,4.13-1.93,15.2-6.23,10.11-12.58-2.08-2.6-5.6-3.73-8.64-4.72-3.92-1.27-7.95-2.14-12.03-2.73C190.7-.07,182.27-.09,173.9.07c-17.86.34-35.69,1.9-53.33,4.65-17.64,2.75-34.7,6.61-51.62,11.64-15.72,4.67-31.36,10.28-45.37,18.94-6.72,4.15-13.17,8.97-18.47,14.86C3,52.5-.4,55.79.04,59.25c.37,2.86,3.26,4.4,5.73,5.2,3.81,1.23,8.02,1.64,11.98,2.04,4.42.44,8.86.62,13.29.64,8.97.04,17.95-.46,26.9-.92,18.24-.95,36.45-2.3,54.63-4.05s36.32-3.88,54.41-6.4,36.28-5.47,54.32-8.79c4.22-.78,8.44-1.58,12.65-2.4.45-.09.33-.51-.11-.43-17.33,3.37-34.73,6.38-52.19,9.03-17.33,2.62-34.71,4.89-52.13,6.79-17.34,1.9-34.72,3.43-52.12,4.61-8.74.59-17.49,1.09-26.24,1.5-8.79.41-17.59.82-26.39.42-4.41-.2-8.82-.61-13.18-1.34-3.23-.54-7.29-1.04-9.63-3.6-3.03-3.32.37-7.32,2.61-9.96,2.54-3,5.39-5.72,8.42-8.22,12.48-10.27,27.52-17.08,42.69-22.33s32.05-9.69,48.42-12.96,33.93-5.63,51.08-6.77c8.57-.57,17.17-.89,25.76-.86s16.58.5,24.63,2.42c3.65.87,7.62,1.88,10.85,3.83s5.17,5.36,2.36,8.52c-1.22,1.38-2.89,2.28-4.51,3.11-1.8.92-3.61,1.8-5.45,2.65-3.81,1.76-7.68,3.37-11.61,4.82s-7.86,2.71-11.87,3.84c-.44.12-.33.55.11.43h.02Z"/>
                </svg>
              </div>

              <div className="text-yellow-400 text-xs font-medium mb-3 uppercase tracking-wider">
                {language === 'en' ? 'Limited Time Offer' : 'Ofertă Limitată'}
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {language === 'en' ? 'Free Consultation' : 'Consultație Gratuită'}
              </h2>

              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-2xl text-neutral-400 line-through">€50</span>
                <span className="text-3xl font-bold text-green-400">
                  {language === 'en' ? 'FREE' : 'GRATUIT'}
                </span>
              </div>

              <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'Get expert advice on your website strategy, design improvements, and technical solutions. Usually €50, now completely free for a limited time.'
                  : 'Primește sfaturi experte pentru strategia website-ului, îmbunătățiri de design și soluții tehnice. În mod normal €50, acum complet gratuit pentru o perioadă limitată.'}
              </p>

              <Link href="https://wa.me/37368327082">
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  {language === 'en' ? 'Book Free Consultation' : 'Rezervă Consultația Gratuită'}
                </Button>
              </Link>

              <div className="mt-6 text-sm text-neutral-400">
                {language === 'en' 
                  ? '⏰ Limited time offer • No commitment required'
                  : '⏰ Ofertă limitată • Fără obligații'}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.15)] rounded-3xl p-4 md:p-6 relative">
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-bold text-white leading-tight"
                >
                  {language === 'en' ? "Let's talk and make it happen" : "Să vorbim și să facem să se întâmple"}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-neutral-300 leading-relaxed"
                >
                  {language === 'en' 
                    ? "Reach out to us, and we'll respond as soon as possible." 
                    : "Contactează-ne și îți vom răspunde cât mai curând posibil."}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link href="https://wa.me/37368327082">
                    <Button className="bg-gradient-to-r from-white to-neutral-100 hover:from-neutral-50 hover:to-neutral-200 text-black font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                      {language === 'en' ? 'Talk to us' : 'Vorbește cu noi'}
                    </Button>
                  </Link>
                </motion.div>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center gap-4"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Rating Text */}
                  <span className="text-neutral-300 font-medium">4.9/5</span>
                </motion.div>
              </div>

              {/* Right Content - Portfolio Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Portfolio Items - Left Column */}
                  <div className="space-y-4">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-700/20 to-neutral-800/20 border border-neutral-700/50">
                      <Image
                        src="/images/rizzaclassic.png"
                        alt="Rizza Classic"
                        width={400}
                        height={300}
                        quality={95}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-700/20 to-neutral-800/20 border border-neutral-700/50">
                      <Image
                        src="/images/autohuse.md-min.png"
                        alt="Auto Huse"
                        width={400}
                        height={300}
                        quality={95}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                  </div>
                  {/* Portfolio Items - Right Column */}
                  <div className="space-y-4 pt-8">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-700/20 to-neutral-800/20 border border-neutral-700/50">
                      <Image
                        src="/images/CRM.png"
                        alt="CRM Platform"
                        width={400}
                        height={300}
                        quality={95}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-700/20 to-neutral-800/20 border border-neutral-700/50">
                      <Image
                        src="/images/eurogard.png"
                        alt="Eurogard Project"
                        width={400}
                        height={300}
                        quality={95}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-8 py-16 pb-32">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logowhite.png"
                  alt="landings.md"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white font-semibold">landings.md</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-neutral-400">
                <Link href="/" className="hover:text-white transition-colors py-2">
                  {language === 'en' ? 'Home' : 'Acasă'}
                </Link>
                <Link href="/portfolio" className="hover:text-white transition-colors py-2">
                  {language === 'en' ? 'Portfolio' : 'Portofoliu'}
                </Link>
                <Link href="/pricing" className="hover:text-white transition-colors py-2">
                  {language === 'en' ? 'Pricing' : 'Prețuri'}
                </Link>
                <Link href="/solutions" className="hover:text-white transition-colors py-2">
                  {language === 'en' ? 'Solutions' : 'Soluții'}
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-neutral-500">
                {language === 'en' ? '© 2026 All rights reserved.' : '© 2026 Toate drepturile rezervate.'}
              </div>
              <div className="flex items-center gap-3">
                <Link href="https://instagram.com/landings.md" className="text-neutral-500 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                <Link href="https://wa.me/37368327082" className="text-neutral-500 hover:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.485"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Sticky Contact Pill */}
      <StickyContactPill language={language as 'en' | 'ro'} />
    </div>
  )
}