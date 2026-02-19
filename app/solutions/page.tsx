"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { InteractiveGridBackground } from '@/components/ui/interactive-grid-background'
import { StickyContactPill } from '@/components/ui/sticky-contact-pill'

const caseStudies = [
  {
    id: 1,
    badge: { en: "LOGISTICS", ro: "LOGISTICĂ" },
    title: { en: "Package Tracking Platform", ro: "Platformă Urmărire Colete" },
    subtitle: { en: "MD — Europe — MD", ro: "MD — Europa — MD" },
    description: {
      en: "A highly advanced logistics application managing packages between Moldova and Europe. Real-time package tracking, automated status updates, admin management panel, driver assignments, route optimization, customer notifications, and full delivery history.",
      ro: "O aplicație logistică avansată pentru gestionarea coletelor între Moldova și Europa. Urmărire colete în timp real, actualizări automate de status, panou admin, atribuire șoferi, optimizare rute, notificări clienți și istoric complet livrări."
    },
    features: {
      en: ["Real-time GPS tracking", "Admin management panel", "Automated notifications", "Route optimization", "Driver assignments", "Delivery analytics"],
      ro: ["Urmărire GPS în timp real", "Panou administrare", "Notificări automate", "Optimizare rute", "Atribuire șoferi", "Analiză livrări"]
    },
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    accentColor: "violet",
    iconBg: "bg-violet-500/20",
    icon: (
      <svg className="w-10 h-10 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    )
  },
  {
    id: 2,
    badge: { en: "FAMILY APP", ro: "APLICAȚIE FAMILIALĂ" },
    title: { en: "Growing Memories Album", ro: "Album Amintiri în Creștere" },
    subtitle: { en: "Ages 1 — 18", ro: "Vârsta 1 — 18" },
    description: {
      en: "A unique digital family album where parents document their child's journey from age 1 to 18. Photos, milestones, letters, and memories are securely stored. On their 18th birthday, the child receives access to the complete album — a lifetime of love, captured digitally.",
      ro: "Un album digital unic unde părinții documentează călătoria copilului de la 1 la 18 ani. Poze, momente importante, scrisori și amintiri sunt stocate în siguranță. La 18 ani, copilul primește acces la albumul complet — o viață de dragoste, capturată digital."
    },
    features: {
      en: ["Milestone tracking", "Photo & video uploads", "Time-locked reveal at 18", "Parent collaboration", "Secure cloud storage", "Beautiful timeline view"],
      ro: ["Urmărire momente cheie", "Upload foto & video", "Dezvăluire la 18 ani", "Colaborare părinți", "Stocare cloud securizată", "Vizualizare cronologică"]
    },
    gradient: "from-amber-500/20 via-orange-500/10 to-rose-500/20",
    accentColor: "amber",
    iconBg: "bg-amber-500/20",
    icon: (
      <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  },
  {
    id: 3,
    badge: { en: "CRM SYSTEM", ro: "SISTEM CRM" },
    title: { en: "Auto Service CRM", ro: "CRM Service Auto" },
    subtitle: { en: "Complete Business Management", ro: "Management Complet Afacere" },
    description: {
      en: "A complete client management platform built for auto service businesses. Appointment scheduling, service history tracking, invoice generation, parts inventory, client communication, and performance analytics — all in one dashboard.",
      ro: "O platformă completă de management clienți construită pentru service-uri auto. Programări, istoric servicii, generare facturi, inventar piese, comunicare clienți și analize performanță — totul într-un singur panou."
    },
    features: {
      en: ["Appointment scheduling", "Service history", "Invoice generation", "Parts inventory", "Client portal", "Performance analytics"],
      ro: ["Programări", "Istoric servicii", "Generare facturi", "Inventar piese", "Portal clienți", "Analize performanță"]
    },
    gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
    accentColor: "cyan",
    iconBg: "bg-cyan-500/20",
    icon: (
      <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H20.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
      </svg>
    )
  }
]

const stats = [
  { value: "99.9%", label: { en: "Uptime", ro: "Disponibilitate" } },
  { value: "3x", label: { en: "Faster Operations", ro: "Operații Mai Rapide" } },
  { value: "0", label: { en: "Paper Needed", ro: "Hârtie Necesară" } },
  { value: "24/7", label: { en: "System Access", ro: "Acces Sistem" } },
]

export default function SolutionsPage() {
  const [language, setLanguage] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ro')) {
      setLanguage(savedLanguage)
    } else {
      setLanguage('en')
    }
  }, [])

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const text = {
    en: {
      nav: { home: "Home", portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", contact: "Contact Me" },
      hero: {
        badge: "Enterprise Solutions",
        title1: "We digitalize",
        title2: "your business",
        description: "Your business still runs on paper, notebooks, and pens? We build advanced digital systems — CRMs, logistics platforms, custom apps — that replace the boring, tiring paperwork with sleek, powerful technology.",
        cta: "Discuss Your Project"
      },
      sections: {
        whatWeBuild: "What we build",
        caseStudies: "Case Studies",
        caseStudiesSubtitle: "Real solutions we built for real businesses",
        killPaper: "Kill the paperwork",
        killPaperDescription: "Every minute spent on manual paperwork is a minute lost. We transform analog chaos into digital precision.",
        beforeTitle: "Before",
        afterTitle: "After",
        before: ["Paper forms & notebooks", "Manual data entry", "Lost documents", "No real-time tracking", "Human errors daily"],
        after: ["Digital dashboards", "Automated workflows", "Cloud-secured data", "Live tracking & alerts", "99.9% accuracy"],
        ctaTitle: "Ready to digitalize your business?",
        ctaDescription: "Tell us about your business challenges. We'll design a custom digital solution that eliminates paperwork and multiplies your efficiency.",
        ctaButton: "Start Your Transformation"
      }
    },
    ro: {
      nav: { home: "Acasă", portfolio: "Portofoliu", pricing: "Prețuri", solutions: "Soluții", contact: "Contactează-mă" },
      hero: {
        badge: "Soluții Enterprise",
        title1: "Digitalizăm",
        title2: "afacerea ta",
        description: "Afacerea ta încă funcționează pe hârtie, caiete și pixuri? Construim sisteme digitale avansate — CRM-uri, platforme logistice, aplicații custom — care înlocuiesc munca plictisitoare pe hârtie cu tehnologie elegantă și puternică.",
        cta: "Discută Proiectul Tău"
      },
      sections: {
        whatWeBuild: "Ce construim",
        caseStudies: "Studii de Caz",
        caseStudiesSubtitle: "Soluții reale construite pentru afaceri reale",
        killPaper: "Elimină hârtia",
        killPaperDescription: "Fiecare minut petrecut pe documente manuale e un minut pierdut. Transformăm haosul analog în precizie digitală.",
        beforeTitle: "Înainte",
        afterTitle: "După",
        before: ["Formulare pe hârtie & caiete", "Introducere manuală date", "Documente pierdute", "Fără urmărire în timp real", "Erori umane zilnice"],
        after: ["Panouri digitale", "Fluxuri automatizate", "Date securizate în cloud", "Urmărire live & alerte", "Precizie 99.9%"],
        ctaTitle: "Gata să-ți digitalizezi afacerea?",
        ctaDescription: "Spune-ne despre provocările afacerii tale. Vom proiecta o soluție digitală personalizată care elimină hârtia și îți multiplică eficiența.",
        ctaButton: "Începe Transformarea"
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
            <Link href="/">
              <Image src="/images/logowhite.png" alt="landings.md" width={48} height={48} className="w-12 h-12 object-contain" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-8 text-neutral-400">
                <Link href="/" className="hover:text-white transition-all duration-300 hover:bg-neutral-800/50 px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700">{t.nav.home}</Link>
                <Link href="/portfolio" className="hover:text-white transition-all duration-300 hover:bg-neutral-800/50 px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-white transition-all duration-300 hover:bg-neutral-800/50 px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700">{t.nav.pricing}</Link>
                <Link href="/solutions" className="text-white bg-neutral-800/50 px-4 py-2 rounded-lg border border-neutral-700">{t.nav.solutions}</Link>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => handleLanguageChange(language === 'en' ? 'ro' : 'en')} className="text-neutral-400 hover:text-white transition-all duration-300 text-sm font-medium px-3 py-2 rounded-md hover:bg-neutral-800/80 border border-neutral-700/50 hover:border-neutral-600 backdrop-blur-sm">
                  {language.toUpperCase()}
                </button>
                <Link href="https://wa.me/37368327082">
                  <Button className="bg-gradient-to-r from-white to-neutral-200 hover:from-neutral-100 hover:to-neutral-300 text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">{t.nav.contact}</Button>
                </Link>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <button onClick={() => setLanguage(language === 'en' ? 'ro' : 'en')} className="text-neutral-400 hover:text-white transition-all duration-300 text-sm font-medium px-3 py-2 rounded-md hover:bg-neutral-800/80 border border-neutral-700/50">
                {language.toUpperCase()}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg border border-neutral-700/50 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden absolute top-full left-8 right-8 mt-4 p-4 bg-neutral-900/95 backdrop-blur-md rounded-xl border border-neutral-700/50 z-50">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="text-neutral-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-neutral-800/50 text-center border border-transparent hover:border-neutral-700" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</Link>
                <Link href="/portfolio" className="text-neutral-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-neutral-800/50 text-center border border-transparent hover:border-neutral-700" onClick={() => setMobileMenuOpen(false)}>{t.nav.portfolio}</Link>
                <Link href="/pricing" className="text-neutral-300 hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-neutral-800/50 text-center border border-transparent hover:border-neutral-700" onClick={() => setMobileMenuOpen(false)}>{t.nav.pricing}</Link>
                <Link href="/solutions" className="text-white bg-neutral-800/50 p-3 rounded-lg text-center border border-neutral-700" onClick={() => setMobileMenuOpen(false)}>{t.nav.solutions}</Link>
                <Link href="https://wa.me/37368327082" className="bg-gradient-to-r from-white to-neutral-200 hover:from-neutral-100 hover:to-neutral-300 text-black font-medium p-3 rounded-full transition-all duration-300 hover:scale-105 text-center mt-4" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <main className="relative z-10 pt-28 md:pt-32">

        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-5 py-2.5 text-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-neutral-300">{t.hero.badge}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-none tracking-tight">
              <span className="bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent">{t.hero.title1}</span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-white px-6 py-2">{t.hero.title2}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/60 to-violet-900/60 rounded-2xl transform -rotate-1 border border-cyan-500/20" />
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              {t.hero.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <Link href="https://wa.me/37368327082">
                <Button className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-semibold px-10 py-5 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]">
                  {t.hero.cta}
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-neutral-500 mt-1">{stat.label[language as keyof typeof stat.label]}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="relative z-10 py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Card 1: CRM (Top Left) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-3xl p-6 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-500 group lg:row-span-1 relative overflow-hidden min-h-[180px]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)' }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="text-cyan-400 text-xs font-medium mb-3 uppercase tracking-wider">
                      {language === 'en' ? 'CRM Systems' : 'Sisteme CRM'}
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3 leading-tight">
                      {language === 'en' ? 'Client Management' : 'Management Clienți'}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {language === 'en' ? 'Track leads, manage clients, automate your entire workflow.' : 'Urmărește lead-uri, gestionează clienți, automatizează fluxul.'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Main Showcase (Center Large) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-3xl p-6 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-500 group lg:col-span-2 lg:row-span-2 relative overflow-hidden min-h-[360px]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)' }}
              >
                <div className="flex flex-col h-full">
                  <div className="text-center mb-6">
                    <div className="text-violet-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      {language === 'en' ? 'Enterprise Grade' : 'Nivel Enterprise'}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      {language === 'en' ? 'Paper → Digital' : 'Hârtie → Digital'}
                    </h2>
                    <p className="text-sm text-neutral-400 max-w-sm mx-auto">
                      {language === 'en' ? 'We replace notebooks, pens, and boring paperwork with systems that actually work' : 'Înlocuim caietele, pixurile și hârtia plictisitoare cu sisteme care chiar funcționează'}
                    </p>
                  </div>

                  <div className="flex-1 relative">
                    <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl p-4 border border-neutral-700 h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-neutral-500 text-xs ml-2">dashboard.app</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div className="h-16 flex-1 bg-gradient-to-r from-cyan-600/40 to-violet-600/40 rounded-lg border border-white/5 flex items-center justify-center">
                            <span className="text-white/60 font-medium text-xs">{language === 'en' ? 'Live Tracking' : 'Urmărire Live'}</span>
                          </div>
                          <div className="h-16 w-20 bg-neutral-700/50 rounded-lg border border-white/5 flex items-center justify-center">
                            <span className="text-emerald-400 text-lg font-bold">+47%</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-10 bg-neutral-700/30 rounded-lg border border-white/5"></div>
                          <div className="h-10 bg-neutral-700/30 rounded-lg border border-white/5"></div>
                          <div className="h-10 bg-neutral-700/30 rounded-lg border border-white/5"></div>
                        </div>
                        <div className="h-3 bg-neutral-700/30 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Logistics (Top Right) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-3xl p-6 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-500 group lg:row-span-1 relative overflow-hidden min-h-[180px]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)' }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="text-violet-400 text-xs font-medium mb-3 uppercase tracking-wider">
                      {language === 'en' ? 'Logistics' : 'Logistică'}
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3 leading-tight">
                      {language === 'en' ? 'Package Tracking' : 'Urmărire Colete'}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {language === 'en' ? 'Real-time tracking, route optimization, admin panels.' : 'Urmărire în timp real, optimizare rute, panouri admin.'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Custom Apps (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-3xl p-6 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-500 group lg:row-span-1 relative overflow-hidden min-h-[180px]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)' }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="text-amber-400 text-sm font-medium mb-4 uppercase tracking-wider">
                      {language === 'en' ? 'Custom Apps' : 'Aplicații Custom'}
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">{language === 'en' ? 'Any' : 'Orice'}</h3>
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {language === 'en' ? 'Business Idea' : 'Idee de Afacere'}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Link href="https://wa.me/37368327082" className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium flex items-center gap-1">
                        {language === 'en' ? 'Talk to us' : 'Vorbește cu noi'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 5: Dashboards (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-3xl p-6 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-500 group lg:row-span-1 relative overflow-hidden min-h-[180px]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)' }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="text-emerald-400 text-xs font-medium mb-3 uppercase tracking-wider">
                      {language === 'en' ? 'Analytics' : 'Analize'}
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3 leading-tight">
                      {language === 'en' ? 'Business Dashboards' : 'Panouri de Control'}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {language === 'en' ? 'KPIs, reports, and data visualization in real-time.' : 'KPI-uri, rapoarte și vizualizare date în timp real.'}
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent mb-4">
                {t.sections.caseStudies}
              </h2>
              <p className="text-neutral-500 text-lg">{t.sections.caseStudiesSubtitle}</p>
            </motion.div>

            <div className="space-y-8">
              {caseStudies.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <div className={`relative bg-gradient-to-br ${study.gradient} backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden group hover:border-white/20 transition-all duration-500`}>
                    {/* Decorative grid */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                      {/* Left: Icon + Badge */}
                      <div className="lg:col-span-1 flex flex-col items-start gap-4">
                        <div className={`${study.iconBg} p-4 rounded-2xl border border-white/10`}>
                          {study.icon}
                        </div>
                        <span className={`text-xs font-bold tracking-widest px-3 py-1.5 rounded-full border ${
                          study.accentColor === 'violet' ? 'text-violet-300 border-violet-500/30 bg-violet-500/10' :
                          study.accentColor === 'amber' ? 'text-amber-300 border-amber-500/30 bg-amber-500/10' :
                          'text-cyan-300 border-cyan-500/30 bg-cyan-500/10'
                        }`}>
                          {study.badge[language as keyof typeof study.badge]}
                        </span>
                      </div>

                      {/* Center: Info */}
                      <div className="lg:col-span-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                          {study.title[language as keyof typeof study.title]}
                        </h3>
                        <div className={`text-sm font-medium mb-4 ${
                          study.accentColor === 'violet' ? 'text-violet-400' :
                          study.accentColor === 'amber' ? 'text-amber-400' :
                          'text-cyan-400'
                        }`}>
                          {study.subtitle[language as keyof typeof study.subtitle]}
                        </div>
                        <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                          {study.description[language as keyof typeof study.description]}
                        </p>
                      </div>

                      {/* Right: Features */}
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(study.features[language as keyof typeof study.features] as string[]).map((feature: string, fi: number) => (
                            <div key={fi} className="flex items-center gap-3 bg-white/[0.04] border border-white/5 rounded-xl px-4 py-3">
                              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                study.accentColor === 'violet' ? 'bg-violet-400' :
                                study.accentColor === 'amber' ? 'bg-amber-400' :
                                'bg-cyan-400'
                              }`} />
                              <span className="text-neutral-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Paper → Digital - Full Width Card */}
        <section className="relative z-10 py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-3xl p-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)' }}
              >
                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Left - Old way */}
                  <div>
                    <div className="text-neutral-500 text-xs font-medium mb-4 uppercase tracking-wider">
                      {t.sections.beforeTitle}
                    </div>
                    <div className="space-y-3">
                      {t.sections.before.map((item, i) => (
                        <div key={i} className="text-neutral-500 text-sm line-through">{item}</div>
                      ))}
                    </div>
                  </div>

                  {/* Center - Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-neutral-600 via-white to-emerald-400 bg-clip-text text-transparent">
                      →
                    </div>
                  </div>

                  {/* Right - New way */}
                  <div>
                    <div className="text-emerald-400 text-xs font-medium mb-4 uppercase tracking-wider">
                      {t.sections.afterTitle}
                    </div>
                    <div className="space-y-3">
                      {t.sections.after.map((item, i) => (
                        <div key={i} className="text-white text-sm font-medium">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="relative bg-gradient-to-br from-cyan-500/10 via-white/[0.04] to-violet-500/10 border border-white/10 rounded-3xl p-10 md:p-14 text-center overflow-hidden">
                {/* Glow orbs */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    {t.sections.ctaTitle}
                  </h2>
                  <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                    {t.sections.ctaDescription}
                  </p>
                  <Link href="https://wa.me/37368327082">
                    <Button className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-semibold px-10 py-5 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]">
                      {t.sections.ctaButton}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-8 py-16 pb-32">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <Image src="/images/logowhite.png" alt="landings.md" width={32} height={32} className="w-8 h-8 object-contain" />
                <span className="text-white font-semibold">landings.md</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-neutral-400">
                <Link href="/" className="hover:text-white transition-colors py-2">{language === 'en' ? 'Home' : 'Acasă'}</Link>
                <Link href="/portfolio" className="hover:text-white transition-colors py-2">{language === 'en' ? 'Portfolio' : 'Portofoliu'}</Link>
                <Link href="/pricing" className="hover:text-white transition-colors py-2">{language === 'en' ? 'Pricing' : 'Prețuri'}</Link>
                <Link href="/solutions" className="hover:text-white transition-colors py-2">{language === 'en' ? 'Solutions' : 'Soluții'}</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-neutral-500">
                {language === 'en' ? '© 2026 All rights reserved.' : '© 2026 Toate drepturile rezervate.'}
              </div>
              <div className="flex items-center gap-3">
                <Link href="https://instagram.com/landings.md" className="text-neutral-500 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </Link>
                <Link href="https://wa.me/37368327082" className="text-neutral-500 hover:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.485"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <StickyContactPill language={language as 'en' | 'ro'} />
    </div>
  )
}
