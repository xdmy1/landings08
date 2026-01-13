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