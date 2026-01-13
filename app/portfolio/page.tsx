"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'

const projects = [
  {
    id: 1,
    title: "Rizza Classic",
    description: {
      en: "Italian website for old cars restoration.",
      ro: "Website italian pentru restaurarea mașinilor vechi."
    },
    image: "/images/rizzaclassic.png",
    url: "https://rizzaclassic.com",
    status: "LIVE",
    category: "automotive"
  },
  {
    id: 2,
    title: "Auto Huse",
    description: {
      en: "Complete website for car covers. Presentation, online orders, gallery.",
      ro: "Website complet pentru huse auto. Prezentare, comenzi online, galerie."
    },
    image: "/images/autohuse.md-min.png",
    url: "https://autohuse.md/",
    status: "LIVE",
    category: "ecommerce"
  },
  {
    id: 3,
    title: "CRM Platform",
    description: {
      en: "Platform for auto service client management.",
      ro: "Platformă pentru client management service auto."
    },
    image: "/images/CRM.png",
    url: "#",
    status: "PRIVATE",
    category: "automotive"
  },
  {
    id: 4,
    title: "U. Dental Clinic",
    description: {
      en: "Complete website for dental clinic.",
      ro: "Website complet pentru clinica stomatologică."
    },
    image: "/images/udc (1).png",
    url: "https://udc.md",
    status: "LIVE",
    category: "healthcare"
  },
  {
    id: 5,
    title: "Auto Marga Service",
    description: {
      en: "Simple landing page - auto service.",
      ro: "Landing page simplu - service auto."
    },
    image: "/images/automarga (1).png",
    url: "https://automarga.md/",
    status: "LIVE",
    category: "automotive"
  },
  {
    id: 6,
    title: "Elena Diacon Salon",
    description: {
      en: "Elegant website for beauty salon with online booking system and interactive photo gallery.",
      ro: "Website elegant pentru salon de înfrumusețare cu sistem de programări online și galerie foto interactivă."
    },
    image: "/images/elenadiacon (1).png",
    url: "https://elenadiacon.md",
    status: "LIVE",
    category: "services"
  },
  {
    id: 7,
    title: "RespectAuto",
    description: {
      en: "Car rental platform with advanced SEO and booking system. 300% organic growth.",
      ro: "Platformă de închiriere auto cu SEO avansat și sistem de rezervări. Creștere organică de 300%."
    },
    image: "/images/respectauto (1).png",
    url: "https://respectauto.md",
    status: "LIVE",
    category: "automotive"
  },
  {
    id: 8,
    title: "CMIEA Platform",
    description: {
      en: "Complex educational platform with authentication system, interactive courses and user dashboard.",
      ro: "Platformă educațională complexă cu sistem de autentificare, cursuri interactive și dashboard pentru utilizatori."
    },
    image: "/images/cmiea (1).png",
    url: "https://cmiea.md",
    status: "LIVE",
    category: "education"
  },
  {
    id: 9,
    title: "EuroGard",
    description: {
      en: "High-converting landing page for gardening services with conversion and sales optimization.",
      ro: "Landing page high-converting pentru servicii de grădinărit cu optimizare pentru conversii și vânzări."
    },
    image: "/images/eurogard (1).png",
    url: "https://eurogard.md",
    status: "LIVE",
    category: "services"
  },
  {
    id: 10,
    title: "Green Next.js Demo",
    description: {
      en: "Interactive demo built with Next.js, showcasing modern web development capabilities.",
      ro: "Demo interactiv construit cu Next.js, prezentând capabilitățile moderne de dezvoltare web."
    },
    image: "/images/img-hero.jpeg",
    url: "https://nextjs-green-eta-60.vercel.app/",
    status: "DEMO",
    category: "demo"
  },
  {
    id: 11,
    title: "Advanced Green Demo",
    description: {
      en: "Advanced demonstration with complex functionalities, animations and modern interactions.",
      ro: "Demonstrație avansată cu funcționalități complexe, animații și interacțiuni moderne."
    },
    image: "/images/img-hero.jpeg",
    url: "https://green-nextjs.vercel.app/",
    status: "DEMO",
    category: "demo"
  }
]

const categories = [
  { id: 'all', name: { en: 'All Projects', ro: 'Toate Proiectele' } },
  { id: 'automotive', name: { en: 'Automotive', ro: 'Auto' } },
  { id: 'ecommerce', name: { en: 'E-commerce', ro: 'E-commerce' } },
  { id: 'healthcare', name: { en: 'Healthcare', ro: 'Sănătate' } },
  { id: 'education', name: { en: 'Education', ro: 'Educație' } },
  { id: 'services', name: { en: 'Services', ro: 'Servicii' } },
  { id: 'demo', name: { en: 'Demos', ro: 'Demo-uri' } }
]

export default function PortfolioPage() {
  const [language, setLanguage] = useState('en')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const text = {
    en: {
      nav: {
        home: "Home",
        portfolio: "Portfolio",
        pricing: "Pricing",
        contact: "Contact Me"
      },
      hero: {
        title: "Our Portfolio",
        description: "Showcasing our best work and successful projects"
      },
      portfolio: {
        title: "Portfolio",
        subtitle: "*all projects are custom developed, no wordpress",
        visitSite: "Visit Site",
        viewDemo: "View Demo",
        private: "Private"
      },
      cta: {
        title: "Get a free consultation!",
        button: "Contact Me"
      }
    },
    ro: {
      nav: {
        home: "Acasă",
        portfolio: "Portofoliu",
        pricing: "Prețuri",
        contact: "Contactează-mă"
      },
      hero: {
        title: "Portofoliul Nostru",
        description: "Prezentând cele mai bune lucrări și proiecte de succes"
      },
      portfolio: {
        title: "Portofoliu",
        subtitle: "*toate proiectele sunt custom dezvoltate, fără wordpress",
        visitSite: "Accesează site-ul",
        viewDemo: "Vezi Demo",
        private: "Privat"
      },
      cta: {
        title: "Obține o consultație gratuită!",
        button: "Contactează-mă"
      }
    }
  }

  const t = text[language as keyof typeof text]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      </div>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-white/10" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between min-h-[60px]">
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
                <Link href="/portfolio" className="text-white bg-neutral-800/50 px-4 py-2 rounded-lg border border-neutral-700">
                  {t.nav.portfolio}
                </Link>
                <Link href="/pricing" className="hover:text-white transition-all duration-300 hover:bg-neutral-800/50 px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700">
                  {t.nav.pricing}
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'ro' : 'en')}
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
                  className="text-white bg-neutral-800/50 p-3 rounded-lg text-center border border-neutral-700"
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

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent"
            >
              {t.portfolio.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-neutral-400 max-w-2xl mx-auto"
            >
              {t.hero.description}
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-4 mb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300",
                    selectedCategory === category.id
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  {category.name[language as keyof typeof category.name]}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid with 3D Cards */}
        <section className="px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <CardContainer className="inter-var w-full h-full">
                    <CardBody className="bg-black/30 relative group/card hover:bg-black/40 border border-white/10 backdrop-blur-md w-full rounded-3xl overflow-hidden h-fit hover:border-white/20 transition-all duration-500">
                      
                      {/* Project Image - Larger, full width */}
                      <CardItem translateZ="100" className="w-full">
                        <div className="relative overflow-hidden h-56">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                          />
                          {/* Status Badge - Over the image */}
                          <div className="absolute top-4 right-4 z-10">
                            <span className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm",
                              project.status === "LIVE" ? "bg-green-500/90 text-white" :
                              project.status === "DEMO" ? "bg-yellow-500/90 text-black" :
                              "bg-gray-500/90 text-white"
                            )}>
                              {project.status}
                            </span>
                          </div>
                          
                          {/* Category overlay */}
                          <div className="absolute bottom-4 left-4">
                            <span className="px-3 py-1 bg-black/70 text-white text-xs rounded-full border border-white/20 font-medium backdrop-blur-sm uppercase tracking-wider">
                              {categories.find(cat => cat.id === project.category)?.name[language as keyof typeof categories[0]['name']]}
                            </span>
                          </div>
                        </div>
                      </CardItem>

                      {/* Compact Info Section */}
                      <div className="px-6 pt-6 pb-4 flex flex-col h-[224px]">
                        <div className="space-y-3">
                          <CardItem translateZ="50">
                            <h3 className="text-xl font-bold text-white group-hover/card:text-neutral-100 transition-all duration-300 line-clamp-1">
                              {project.title}
                            </h3>
                          </CardItem>
                          
                          <CardItem as="p" translateZ="60">
                            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                              {project.description[language as keyof typeof project.description]}
                            </p>
                          </CardItem>
                        </div>

                        {/* Action Button - At Very Bottom */}
                        <CardItem translateZ={20} className="mt-auto mb-2">
                          {project.status !== "PRIVATE" ? (
                            <Link href={project.url} target="_blank" rel="noopener noreferrer">
                              <Button className="w-full bg-white text-black hover:bg-neutral-100 font-bold py-3 px-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                                {project.status === "DEMO" ? t.portfolio.viewDemo : t.portfolio.visitSite}
                              </Button>
                            </Link>
                          ) : (
                            <Button 
                              disabled 
                              className="w-full bg-gray-500 text-black cursor-not-allowed py-3 px-4 rounded-2xl"
                            >
                              {t.portfolio.private}
                            </Button>
                          )}
                        </CardItem>
                      </div>

                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-neutral-400 mt-12 text-center text-lg"
            >
              {t.portfolio.subtitle}
            </motion.p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-12 px-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl p-6 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-600/5 to-neutral-800/5"></div>
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
              
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
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-600/20 to-neutral-700/20 border border-neutral-700/50">
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
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-600/20 to-neutral-700/20 border border-neutral-700/50">
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
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image src="/images/logowhite.png" alt="landings.md" width={32} height={32} className="w-8 h-8 object-contain" />
              <span className="text-white font-semibold">landings.md</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-neutral-500">
                {language === 'en' ? '© 2026 All rights reserved.' : '© 2026 Toate drepturile rezervate.'}
              </div>
              <div className="flex items-center gap-3">
                <Link href="https://instagram.com/landings.md" className="text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 5.988c-1.828 0-2.058.008-2.782.041-.723.032-1.217.146-1.649.312-.446.174-.825.406-1.201.782-.376.376-.608.755-.782 1.201-.166.432-.28.926-.312 1.649-.033.724-.041.954-.041 2.782s.008 2.058.041 2.782c.032.723.146 1.217.312 1.649.174.446.406.825.782 1.201.376.376.755.608 1.201.782.432.166.926.28 1.649.312.724.033.954.041 2.782.041s2.058-.008 2.782-.041c.723-.032 1.217-.146 1.649-.312.446-.174.825-.406 1.201-.782.376-.376.608-.755.782-1.201.166-.432.28-.926.312-1.649.033-.724.041-.954.041-2.782s-.008-2.058-.041-2.782c-.032-.723-.146-1.217-.312-1.649-.174-.446-.406-.825-.782-1.201-.376-.376-.755-.608-1.201-.782-.432-.166-.926-.28-1.649-.312-.724-.033-.954-.041-2.782-.041zm0 1.082c1.8 0 2.013.007 2.724.039.657.03 1.014.139 1.252.231.314.122.539.268.774.503.235.235.381.46.503.774.092.238.201.595.231 1.252.032.711.039.924.039 2.724s-.007 2.013-.039 2.724c-.03.657-.139 1.014-.231 1.252-.122.314-.268.539-.503.774-.235.235-.46.381-.774.503-.238.092-.595.201-1.252.231-.711.032-.924.039-2.724.039s-2.013-.007-2.724-.039c-.657-.03-1.014-.139-1.252-.231-.314-.122-.539-.268-.774-.503-.235-.235-.381-.46-.503-.774-.092-.238-.201-.595-.231-1.252-.032-.711-.039-.924-.039-2.724s.007-2.013.039-2.724c.03-.657.139-1.014.231-1.252.122-.314.268-.539.503-.774.235-.235.46-.381.774-.503.238-.092.595-.201 1.252-.231.711-.032.924-.039 2.724-.039z"/>
                    <path d="M12.017 15.531c-1.943 0-3.514-1.571-3.514-3.514s1.571-3.514 3.514-3.514 3.514 1.571 3.514 3.514-1.571 3.514-3.514 3.514zm0-5.946c-1.342 0-2.432 1.09-2.432 2.432s1.09 2.432 2.432 2.432 2.432-1.09 2.432-2.432-1.09-2.432-2.432-2.432z"/>
                    <path d="M18.253 7.97c0-.454-.368-.822-.822-.822s-.822.368-.822.822.368.822.822.822.822-.368.822-.822z"/>
                  </svg>
                </Link>
                <Link href="https://wa.me/37368327082" className="text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.485"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}