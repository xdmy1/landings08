"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StickyContactPill } from '@/components/ui/sticky-contact-pill'
import { useLanguage } from '@/hooks/useLanguage'

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-700 ease-smooth ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const caseStudies = [
  {
    id: 1,
    badge: { en: "LOGISTICS", ro: "LOGISTICA", de: "LOGISTIK", fr: "LOGISTIQUE", es: "LOGISTICA" },
    title: { en: "Package Tracking Platform", ro: "Platforma Urmarire Colete", de: "Paketverfolgungs-Plattform", fr: "Plateforme de Suivi de Colis", es: "Plataforma de Seguimiento de Paquetes" },
    subtitle: { en: "MD — Europe — MD", ro: "MD — Europa — MD", de: "MD — Europa — MD", fr: "MD — Europe — MD", es: "MD — Europa — MD" },
    description: {
      en: "A highly advanced logistics application managing packages between Moldova and Europe. Real-time package tracking, automated status updates, admin management panel, driver assignments, route optimization, customer notifications, and full delivery history.",
      ro: "O aplicatie logistica avansata pentru gestionarea coletelor intre Moldova si Europa. Urmarire colete in timp real, actualizari automate de status, panou admin, atribuire soferi, optimizare rute, notificari clienti si istoric complet livrari.",
      de: "Eine hochentwickelte Logistikanwendung zur Verwaltung von Paketen zwischen Moldawien und Europa. Echtzeit-Paketverfolgung, automatische Statusaktualisierungen, Admin-Panel, Fahrerzuweisung, Routenoptimierung und vollstandiger Lieferverlauf.",
      fr: "Une application logistique avancee gerant les colis entre la Moldavie et l'Europe. Suivi en temps reel, mises a jour automatiques, panneau d'administration, affectation des chauffeurs, optimisation des itineraires et historique complet.",
      es: "Una aplicacion logistica avanzada que gestiona paquetes entre Moldavia y Europa. Seguimiento en tiempo real, actualizaciones automaticas, panel de administracion, asignacion de conductores, optimizacion de rutas e historial completo."
    },
    features: {
      en: ["Real-time GPS tracking", "Admin management panel", "Automated notifications", "Route optimization", "Driver assignments", "Delivery analytics"],
      ro: ["Urmarire GPS in timp real", "Panou administrare", "Notificari automate", "Optimizare rute", "Atribuire soferi", "Analiza livrari"],
      de: ["Echtzeit-GPS-Verfolgung", "Admin-Panel", "Automatische Benachrichtigungen", "Routenoptimierung", "Fahrerzuweisung", "Lieferanalysen"],
      fr: ["Suivi GPS en temps reel", "Panneau d'administration", "Notifications automatiques", "Optimisation des itineraires", "Affectation des chauffeurs", "Analyses de livraison"],
      es: ["Seguimiento GPS en tiempo real", "Panel de administracion", "Notificaciones automaticas", "Optimizacion de rutas", "Asignacion de conductores", "Analisis de entregas"]
    }
  },
  {
    id: 2,
    badge: { en: "FAMILY APP", ro: "APLICATIE FAMILIALA", de: "FAMILIEN-APP", fr: "APP FAMILIALE", es: "APP FAMILIAR" },
    title: { en: "Growing Memories Album", ro: "Album Amintiri in Crestere", de: "Wachsende Erinnerungen Album", fr: "Album de Souvenirs Grandissants", es: "Album de Recuerdos Crecientes" },
    subtitle: { en: "Ages 1 — 18", ro: "Varsta 1 — 18", de: "Alter 1 — 18", fr: "Ages 1 — 18", es: "Edades 1 — 18" },
    description: {
      en: "A unique digital family album where parents document their child's journey from age 1 to 18. Photos, milestones, letters, and memories are securely stored. On their 18th birthday, the child receives access to the complete album.",
      ro: "Un album digital unic unde parintii documenteaza calatoria copilului de la 1 la 18 ani. Poze, momente importante, scrisori si amintiri sunt stocate in siguranta. La 18 ani, copilul primeste acces la albumul complet.",
      de: "Ein einzigartiges digitales Familienalbum, in dem Eltern die Reise ihres Kindes von 1 bis 18 dokumentieren. Fotos, Meilensteine, Briefe und Erinnerungen werden sicher gespeichert.",
      fr: "Un album familial numerique unique ou les parents documentent le parcours de leur enfant de 1 a 18 ans. Photos, jalons, lettres et souvenirs sont stockes en securite.",
      es: "Un album digital familiar unico donde los padres documentan el viaje de su hijo desde 1 hasta 18 anos. Fotos, hitos, cartas y recuerdos se almacenan de forma segura."
    },
    features: {
      en: ["Milestone tracking", "Photo & video uploads", "Time-locked reveal at 18", "Parent collaboration", "Secure cloud storage", "Beautiful timeline view"],
      ro: ["Urmarire momente cheie", "Upload foto & video", "Dezvaluire la 18 ani", "Colaborare parinti", "Stocare cloud securizata", "Vizualizare cronologica"],
      de: ["Meilenstein-Verfolgung", "Foto- & Video-Uploads", "Zeitgesperrte Enthullung mit 18", "Eltern-Zusammenarbeit", "Sichere Cloud-Speicherung", "Schone Zeitleisten-Ansicht"],
      fr: ["Suivi des jalons", "Upload photos & videos", "Revelation a 18 ans", "Collaboration parentale", "Stockage cloud securise", "Belle vue chronologique"],
      es: ["Seguimiento de hitos", "Subida de fotos y videos", "Revelacion a los 18", "Colaboracion de padres", "Almacenamiento cloud seguro", "Vista de linea de tiempo"]
    }
  },
  {
    id: 3,
    badge: { en: "CRM SYSTEM", ro: "SISTEM CRM", de: "CRM-SYSTEM", fr: "SYSTEME CRM", es: "SISTEMA CRM" },
    title: { en: "Auto Service CRM", ro: "CRM Service Auto", de: "Auto-Service CRM", fr: "CRM Service Auto", es: "CRM Servicio Automotriz" },
    subtitle: { en: "Complete Business Management", ro: "Management Complet Afacere", de: "Komplettes Geschaftsmanagement", fr: "Gestion Complete d'Entreprise", es: "Gestion Empresarial Completa" },
    description: {
      en: "A complete client management platform built for auto service businesses. Appointment scheduling, service history tracking, invoice generation, parts inventory, client communication, and performance analytics — all in one dashboard.",
      ro: "O platforma completa de management clienti construita pentru service-uri auto. Programari, istoric servicii, generare facturi, inventar piese, comunicare clienti si analize performanta — totul intr-un singur panou.",
      de: "Eine komplette Kundenmanagement-Plattform fur Autoservice-Unternehmen. Terminplanung, Service-Historie, Rechnungserstellung, Teileinventar, Kundenkommunikation und Leistungsanalysen.",
      fr: "Une plateforme complete de gestion clients pour les services automobiles. Planification, historique, facturation, inventaire, communication et analyses — le tout dans un seul tableau de bord.",
      es: "Una plataforma completa de gestion de clientes para negocios de servicio automotriz. Citas, historial, facturas, inventario, comunicacion y analisis — todo en un solo panel."
    },
    features: {
      en: ["Appointment scheduling", "Service history", "Invoice generation", "Parts inventory", "Client portal", "Performance analytics"],
      ro: ["Programari", "Istoric servicii", "Generare facturi", "Inventar piese", "Portal clienti", "Analize performanta"],
      de: ["Terminplanung", "Service-Historie", "Rechnungserstellung", "Teileinventar", "Kundenportal", "Leistungsanalysen"],
      fr: ["Planification", "Historique des services", "Generation de factures", "Inventaire des pieces", "Portail client", "Analyses de performance"],
      es: ["Programacion de citas", "Historial de servicios", "Generacion de facturas", "Inventario de piezas", "Portal de clientes", "Analisis de rendimiento"]
    }
  }
]

const stats = [
  { value: "99.9%", label: { en: "Uptime", ro: "Disponibilitate", de: "Verfugbarkeit", fr: "Disponibilite", es: "Disponibilidad" } },
  { value: "3x", label: { en: "Faster Operations", ro: "Operatii Mai Rapide", de: "Schnellere Ablaufe", fr: "Operations Plus Rapides", es: "Operaciones Mas Rapidas" } },
  { value: "0", label: { en: "Paper Needed", ro: "Hartie Necesara", de: "Papier benotigt", fr: "Papier Necessaire", es: "Papel Necesario" } },
  { value: "24/7", label: { en: "System Access", ro: "Acces Sistem", de: "Systemzugang", fr: "Acces Systeme", es: "Acceso al Sistema" } },
]

export default function SolutionsPage() {
  const { language, setLanguage: handleLanguageChange } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", contact: "Contact" },
      hero: {
        title1: "We digitalize",
        title2: "your business.",
        description: "Your business still runs on paper, notebooks, and pens? We build advanced digital systems — CRMs, logistics platforms, custom apps — that replace the boring, tiring paperwork with sleek, powerful technology.",
        cta: "Discuss your project"
      },
      whatWeBuild: {
        heading: "Your business runs on paper.",
        subheading: "We fix that.",
        crm: { label: "CRM", title: "Client management that actually works.", body: "Appointments, invoices, service history, inventory — one dashboard instead of 10 notebooks. Built for auto services, clinics, salons, or any business that tracks clients.", tags: ["Scheduling", "Invoicing", "Analytics", "Client portal"] },
        logistics: { label: "Logistics", title: "Track every package, every step.", body: "GPS tracking, driver assignments, automated customer notifications, admin panels — we built a full logistics platform for the MD-Europe corridor. Your spreadsheets can retire.", tags: ["GPS tracking", "Route optimization", "Notifications", "Admin panel"] },
        custom: { label: "Custom Apps", title: "If you can dream it, we can build it.", body: "A digital family album that locks until the child turns 18. A booking system for a niche business. An internal tool that saves your team 4 hours a day. We don't do templates — we build exactly what you need.", tags: ["Family apps", "Booking systems", "Internal tools", "Custom platforms"] }
      },
      caseStudies: "Case Studies",
      caseStudiesSubtitle: "Real solutions we built for real businesses.",
      cta: { title: "Ready to digitalize your business?", body: "Tell us about your business challenges. We'll design a custom digital solution that eliminates paperwork and multiplies your efficiency.", button: "Start your transformation" },
      footer: { copy: "© 2026 All rights reserved." }
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", contact: "Contact" },
      hero: {
        title1: "Digitalizam",
        title2: "afacerea ta.",
        description: "Afacerea ta inca functioneaza pe hartie, caiete si pixuri? Construim sisteme digitale avansate — CRM-uri, platforme logistice, aplicatii custom — care inlocuiesc munca plictisitoare pe hartie cu tehnologie eleganta si puternica.",
        cta: "Discuta proiectul tau"
      },
      whatWeBuild: {
        heading: "Afacerea ta merge pe hartie.",
        subheading: "Noi rezolvam asta.",
        crm: { label: "CRM", title: "Management clienti care chiar functioneaza.", body: "Programari, facturi, istoric servicii, inventar — un singur panou in loc de 10 caiete. Construit pentru service-uri auto, clinici, saloane.", tags: ["Programari", "Facturare", "Analize", "Portal clienti"] },
        logistics: { label: "Logistica", title: "Urmareste fiecare colet, fiecare pas.", body: "Urmarire GPS, atribuire soferi, notificari automate clienti, panouri admin — am construit o platforma logistica completa pentru coridorul MD-Europa.", tags: ["Urmarire GPS", "Optimizare rute", "Notificari", "Panou admin"] },
        custom: { label: "Aplicatii Custom", title: "Daca poti visa, noi putem construi.", body: "Un album digital familial care se deblocheaza cand copilul implineste 18 ani. Un sistem de rezervari pentru o nisa specifica. Nu facem template-uri.", tags: ["Aplicatii familiale", "Sisteme rezervari", "Tooluri interne", "Platforme custom"] }
      },
      caseStudies: "Studii de Caz",
      caseStudiesSubtitle: "Solutii reale construite pentru afaceri reale.",
      cta: { title: "Gata sa-ti digitalizezi afacerea?", body: "Spune-ne despre provocarile afacerii tale. Vom proiecta o solutie digitala personalizata care elimina hartia si iti multiplica eficienta.", button: "Incepe transformarea" },
      footer: { copy: "© 2026 Toate drepturile rezervate." }
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", contact: "Kontakt" },
      hero: {
        title1: "Wir digitalisieren",
        title2: "Ihr Unternehmen.",
        description: "Ihr Unternehmen lauft noch auf Papier? Wir bauen fortschrittliche digitale Systeme — CRMs, Logistikplattformen, individuelle Apps — die Papierarbeit durch elegante Technologie ersetzen.",
        cta: "Projekt besprechen"
      },
      whatWeBuild: {
        heading: "Ihr Unternehmen lauft auf Papier.",
        subheading: "Wir andern das.",
        crm: { label: "CRM", title: "Kundenmanagement, das funktioniert.", body: "Termine, Rechnungen, Service-Historie, Inventar — ein Dashboard statt 10 Notizbuchern.", tags: ["Terminplanung", "Rechnungsstellung", "Analysen", "Kundenportal"] },
        logistics: { label: "Logistik", title: "Verfolgen Sie jedes Paket.", body: "GPS-Verfolgung, Fahrerzuweisung, automatische Benachrichtigungen, Admin-Panels — eine vollstandige Logistikplattform.", tags: ["GPS-Verfolgung", "Routenoptimierung", "Benachrichtigungen", "Admin-Panel"] },
        custom: { label: "Individuelle Apps", title: "Wenn Sie es traumen konnen, bauen wir es.", body: "Ein digitales Familienalbum. Ein Buchungssystem. Ein internes Tool. Wir bauen genau das, was Sie brauchen.", tags: ["Familien-Apps", "Buchungssysteme", "Interne Tools", "Plattformen"] }
      },
      caseStudies: "Fallstudien",
      caseStudiesSubtitle: "Echte Losungen fur echte Unternehmen.",
      cta: { title: "Bereit zu digitalisieren?", body: "Erzahlen Sie uns von Ihren Herausforderungen. Wir entwerfen eine individuelle digitale Losung.", button: "Transformation starten" },
      footer: { copy: "© 2026 Alle Rechte vorbehalten." }
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", contact: "Contact" },
      hero: {
        title1: "Nous numerisons",
        title2: "votre entreprise.",
        description: "Votre entreprise fonctionne encore sur papier ? Nous construisons des systemes numeriques avances — CRM, plateformes logistiques, applications sur mesure.",
        cta: "Discuter de votre projet"
      },
      whatWeBuild: {
        heading: "Votre entreprise fonctionne sur papier.",
        subheading: "Nous changeons cela.",
        crm: { label: "CRM", title: "Gestion client qui fonctionne.", body: "Rendez-vous, factures, historique, inventaire — un tableau de bord au lieu de 10 cahiers.", tags: ["Planification", "Facturation", "Analyses", "Portail client"] },
        logistics: { label: "Logistique", title: "Suivez chaque colis.", body: "Suivi GPS, affectation des chauffeurs, notifications automatiques — une plateforme logistique complete.", tags: ["Suivi GPS", "Optimisation", "Notifications", "Panneau d'admin"] },
        custom: { label: "Applications Sur Mesure", title: "Si vous pouvez le rever, nous le construisons.", body: "Un album familial numerique. Un systeme de reservation. Un outil interne. Pas de templates.", tags: ["Apps familiales", "Reservations", "Outils internes", "Plateformes"] }
      },
      caseStudies: "Etudes de Cas",
      caseStudiesSubtitle: "Des solutions reelles pour de vraies entreprises.",
      cta: { title: "Pret a numeriser ?", body: "Parlez-nous de vos defis. Nous concevrons une solution numerique personnalisee.", button: "Commencer la transformation" },
      footer: { copy: "© 2026 Tous droits reserves." }
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", contact: "Contacto" },
      hero: {
        title1: "Digitalizamos",
        title2: "tu negocio.",
        description: "Tu negocio todavia funciona con papel? Construimos sistemas digitales avanzados — CRMs, plataformas logisticas, aplicaciones personalizadas.",
        cta: "Discutir tu proyecto"
      },
      whatWeBuild: {
        heading: "Tu negocio funciona con papel.",
        subheading: "Nosotros lo solucionamos.",
        crm: { label: "CRM", title: "Gestion de clientes que funciona.", body: "Citas, facturas, historial, inventario — un panel en vez de 10 cuadernos.", tags: ["Programacion", "Facturacion", "Analisis", "Portal de clientes"] },
        logistics: { label: "Logistica", title: "Rastrea cada paquete.", body: "Seguimiento GPS, asignacion de conductores, notificaciones automaticas — una plataforma logistica completa.", tags: ["Seguimiento GPS", "Optimizacion", "Notificaciones", "Panel admin"] },
        custom: { label: "Apps Personalizadas", title: "Si puedes sonarlo, podemos construirlo.", body: "Un album familiar digital. Un sistema de reservas. Una herramienta interna. No hacemos plantillas.", tags: ["Apps familiares", "Reservas", "Herramientas", "Plataformas"] }
      },
      caseStudies: "Casos de Estudio",
      caseStudiesSubtitle: "Soluciones reales para negocios reales.",
      cta: { title: "Listo para digitalizar?", body: "Cuentanos sobre tus desafios. Disenaremos una solucion digital personalizada.", button: "Iniciar la transformacion" },
      footer: { copy: "© 2026 Todos los derechos reservados." }
    }
  }

  const t = text[language as keyof typeof text]

  return (
    <div className="min-h-screen text-ink grain" style={{ background: '#2A2118' }}>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-divider" style={{ backgroundColor: 'rgba(42,33,24,0.88)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center"><Image src="/images/logowhite.png" alt="landings.md" width={22} height={36} className="w-[22px] h-auto" /></Link>
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 text-sm text-ink-muted">
                <Link href="/portfolio" className="hover:text-ink transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-ink transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="text-ink">{t.nav.solutions}</Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-ink-muted hover:text-ink text-xs tracking-widest uppercase transition-colors">{language}</button>
                  {langMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                      <div className="absolute top-full right-0 mt-3 bg-surface border border-divider shadow-card z-50 min-w-[64px]">
                        {(['en', 'ro', 'de', 'fr', 'es'] as const).map((lang) => (
                          <button key={lang} onClick={() => { handleLanguageChange(lang); setLangMenuOpen(false); }} className={`block w-full text-left px-4 py-2 text-xs tracking-widest uppercase transition-colors ${language === lang ? "text-amber bg-surface" : "text-ink-muted hover:text-ink"}`}>{lang}</button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <Link href="mailto:contact@landings.md" className="text-amber text-sm hover:text-amber-light transition-colors">{t.nav.contact}</Link>
              </div>
            </div>
            <div className="md:hidden flex items-center gap-3">
              <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-ink-muted text-xs tracking-widest uppercase">{language}</button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute top-20 right-6 bg-surface border border-divider shadow-card z-50 min-w-[64px]">
                    {(['en', 'ro', 'de', 'fr', 'es'] as const).map((lang) => (
                      <button key={lang} onClick={() => { handleLanguageChange(lang); setLangMenuOpen(false); }} className={`block w-full text-left px-4 py-2 text-xs tracking-widest uppercase ${language === lang ? "text-amber bg-surface" : "text-ink-muted"}`}>{lang}</button>
                    ))}
                  </div>
                </>
              )}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-ink-muted">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-divider py-6 space-y-4">
              <Link href="/portfolio" className="block text-ink-muted text-sm py-1" onClick={() => setMobileMenuOpen(false)}>{t.nav.portfolio}</Link>
              <Link href="/pricing" className="block text-ink-muted text-sm py-1" onClick={() => setMobileMenuOpen(false)}>{t.nav.pricing}</Link>
              <Link href="/solutions" className="block text-ink text-sm py-1" onClick={() => setMobileMenuOpen(false)}>{t.nav.solutions}</Link>
              <div className="pt-2 border-t border-divider">
                <Link href="mailto:contact@landings.md" className="text-amber text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact} &rarr;</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-28 md:pt-10">

        {/* Hero */}
        <section className="py-16 md:py-28 px-6 md:px-8 relative glow-amber" style={{ background: 'linear-gradient(180deg, #302620 0%, #2A2118 100%)' }}>
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.1]">
                {t.hero.title1}<br />{t.hero.title2}
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="mt-6 text-ink-muted text-lg md:text-xl leading-relaxed max-w-3xl">
                {t.hero.description}
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="mt-10">
                <Link href="mailto:contact@landings.md" className="inline-flex items-center gap-3 text-amber hover:text-amber-light text-sm tracking-wide transition-colors group">
                  {t.hero.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={300}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-divider">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl md:text-3xl font-serif text-ink">{stat.value}</div>
                    <div className="text-ink-muted text-xs tracking-wide mt-1">{stat.label[language as keyof typeof stat.label]}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-8"><div className="border-t border-divider" /></div>

        {/* What We Build */}
        <section className="py-20 md:py-32 px-6 md:px-8" style={{ background: 'linear-gradient(180deg, #2A2118 0%, #342A20 100%)' }}>
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="font-serif text-3xl lg:text-5xl text-ink leading-tight mb-2">{t.whatWeBuild.heading}</h2>
              <p className="text-ink-muted text-xl mb-16">{t.whatWeBuild.subheading}</p>
            </FadeIn>

            <div className="space-y-24">
              {/* CRM Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <FadeIn>
                  <div className="aspect-[4/3] overflow-hidden border border-divider shadow-card">
                    <Image src="/images/CRM.png" alt="Custom CRM platform for small business — client management and booking system by landings.md" width={800} height={600} quality={95} className="w-full h-full object-cover" />
                  </div>
                </FadeIn>
                <FadeIn delay={100}>
                  <div>
                    <span className="text-amber text-xs tracking-[0.2em] uppercase">{t.whatWeBuild.crm.label}</span>
                    <h3 className="font-serif text-2xl lg:text-3xl text-ink leading-tight mt-3 mb-5">{t.whatWeBuild.crm.title}</h3>
                    <p className="text-ink-muted leading-relaxed mb-6">{t.whatWeBuild.crm.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.whatWeBuild.crm.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1.5 border border-divider text-ink-muted">{tag}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Logistics Row (reversed) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <FadeIn className="order-2 lg:order-1">
                  <div>
                    <span className="text-amber text-xs tracking-[0.2em] uppercase">{t.whatWeBuild.logistics.label}</span>
                    <h3 className="font-serif text-2xl lg:text-3xl text-ink leading-tight mt-3 mb-5">{t.whatWeBuild.logistics.title}</h3>
                    <p className="text-ink-muted leading-relaxed mb-6">{t.whatWeBuild.logistics.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.whatWeBuild.logistics.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1.5 border border-divider text-ink-muted">{tag}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
                <FadeIn delay={100} className="order-1 lg:order-2">
                  <div className="aspect-[4/3] border border-divider shadow-card bg-surface flex items-center justify-center">
                    <svg className="w-20 h-20 text-ink-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                </FadeIn>
              </div>

              {/* Custom Apps Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <FadeIn>
                  <div className="aspect-[4/3] border border-divider shadow-card bg-surface flex items-center justify-center">
                    <svg className="w-20 h-20 text-ink-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                </FadeIn>
                <FadeIn delay={100}>
                  <div>
                    <span className="text-amber text-xs tracking-[0.2em] uppercase">{t.whatWeBuild.custom.label}</span>
                    <h3 className="font-serif text-2xl lg:text-3xl text-ink leading-tight mt-3 mb-5">{t.whatWeBuild.custom.title}</h3>
                    <p className="text-ink-muted leading-relaxed mb-6">{t.whatWeBuild.custom.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.whatWeBuild.custom.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1.5 border border-divider text-ink-muted">{tag}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-8"><div className="border-t border-divider" /></div>

        {/* Case Studies */}
        <section className="py-20 md:py-32 px-6 md:px-8" style={{ background: 'linear-gradient(180deg, #342A20 0%, #3E3229 100%)' }}>
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-2">{t.caseStudies}</h2>
              <p className="text-ink-muted mb-16">{t.caseStudiesSubtitle}</p>
            </FadeIn>

            <div className="space-y-0">
              {caseStudies.map((study, i) => (
                <FadeIn key={study.id} delay={i * 100}>
                  <div className="border-t border-divider py-10 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Badge + Title */}
                      <div className="lg:col-span-4">
                        <span className="text-ink-light text-[10px] tracking-[0.25em] uppercase">{study.badge[language as keyof typeof study.badge]}</span>
                        <h3 className="font-serif text-xl md:text-2xl text-ink mt-2 mb-1">{study.title[language as keyof typeof study.title]}</h3>
                        <span className="text-amber text-xs tracking-wide">{study.subtitle[language as keyof typeof study.subtitle]}</span>
                      </div>

                      {/* Center: Description */}
                      <div className="lg:col-span-4">
                        <p className="text-ink-muted text-sm leading-relaxed">
                          {study.description[language as keyof typeof study.description]}
                        </p>
                      </div>

                      {/* Right: Features */}
                      <div className="lg:col-span-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {(study.features[language as keyof typeof study.features] as string[]).map((feature: string, fi: number) => (
                            <div key={fi} className="flex items-center gap-2">
                              <span className="text-ink-light text-[8px]">&#9642;</span>
                              <span className="text-ink-muted text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
              <div className="border-t border-divider" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 px-6 md:px-8 relative glow-amber" style={{ background: 'linear-gradient(180deg, #3E3229 0%, #2A2118 100%)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="font-serif italic text-3xl md:text-4xl text-ink mb-6">{t.cta.title}</h2>
              <p className="text-ink-muted leading-relaxed mb-10">{t.cta.body}</p>
              <Link href="mailto:contact@landings.md" className="inline-flex items-center gap-3 text-amber hover:text-amber-light text-sm tracking-wide transition-colors group">
                {t.cta.button}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-divider" style={{ background: '#241E18' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 pb-28">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Link href="/" className="flex items-center"><Image src="/images/logowhite.png" alt="landings.md" width={22} height={36} className="w-[22px] h-auto" /></Link>
              <div className="flex items-center gap-6 text-sm text-ink-muted">
                <Link href="/portfolio" className="hover:text-ink transition-colors">{t.nav.portfolio}</Link>
                <Link href="/pricing" className="hover:text-ink transition-colors">{t.nav.pricing}</Link>
                <Link href="/solutions" className="hover:text-ink transition-colors">{t.nav.solutions}</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-ink-light text-xs tracking-wide">{t.footer.copy}</span>
              <div className="flex items-center gap-3">
                <Link href="https://instagram.com/landings.md" className="text-ink-light hover:text-ink-muted transition-colors" target="_blank" rel="noopener noreferrer"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></Link>
                <Link href="mailto:contact@landings.md" className="text-ink-light hover:text-ink-muted transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.093L2.25 6.75" /></svg></Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <StickyContactPill language={language as 'en' | 'ro' | 'de' | 'fr' | 'es'} />
    </div>
  )
}
