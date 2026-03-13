"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StickyContactPill } from '@/components/ui/sticky-contact-pill'
import { useLanguage } from '@/hooks/useLanguage'
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
  const { ref, visible } = useInView(0.15)
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
  const { ref, visible } = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function SlideIn({ children, className = "", delay = 0, direction = "left" }: { children: React.ReactNode, className?: string, delay?: number, direction?: "left" | "right" }) {
  const { ref, visible } = useInView(0.1)
  const x = direction === "left" ? "-40px" : "40px"
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${x})`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function ImageReveal({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const { ref, visible } = useInView(0.1)
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(1.08)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
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
  const { language } = useLanguage()

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

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

      <SiteNav contactHref="/#contact" />

      <div className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 relative line-sides">

        {/* Hero */}
        <section className="pt-36 md:pt-48 pb-16 md:pb-28 px-6 md:px-12 lg:px-16 relative glow-amber" style={{ background: 'linear-gradient(160deg, #302620 0%, #3C2E20 35%, #2A2118 100%)' }}>
          <RevealText>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,6rem)] text-ink leading-[1.05]">
              {t.hero.title1}<br />{t.hero.title2}
            </h1>
          </RevealText>
          <FadeIn delay={200}>
            <p className="mt-6 text-ink-muted text-lg md:text-xl leading-relaxed max-w-3xl">
              {t.hero.description}
            </p>
          </FadeIn>
          <FadeIn delay={350}>
            <div className="mt-10">
              <Link href="mailto:contact@landings.md" className="inline-flex items-center gap-3 text-amber hover:text-amber-light text-sm tracking-wide transition-colors group">
                {t.hero.cta}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={500}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-divider">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-serif text-ink">{stat.value}</div>
                  <div className="text-ink-muted text-xs tracking-wide mt-1">{stat.label[language as keyof typeof stat.label]}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* What We Build */}
        <section className="line-top py-20 md:py-32 px-6 md:px-12 lg:px-16" style={{ background: 'linear-gradient(145deg, #2A2118 0%, #342A20 40%, #3A2C1E 70%, #2C2218 100%)' }}>
          <SlideIn direction="left">
            <h2 className="font-serif text-3xl lg:text-5xl text-ink leading-tight mb-2">{t.whatWeBuild.heading}</h2>
            <p className="text-ink-muted text-xl mb-16">{t.whatWeBuild.subheading}</p>
          </SlideIn>

          <div className="space-y-24">
            {/* CRM Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <ImageReveal>
                <div className="aspect-[4/3] overflow-hidden border border-divider shadow-card">
                  <Image src="/images/CRM.png" alt="Custom CRM platform for small business — client management and booking system by landings.md" width={800} height={600} quality={95} className="w-full h-full object-cover" />
                </div>
              </ImageReveal>
              <SlideIn direction="right" delay={100}>
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
              </SlideIn>
            </div>

            {/* Logistics Row (reversed) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <SlideIn direction="left" className="order-2 lg:order-1">
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
              </SlideIn>
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
              <SlideIn direction="right" delay={100}>
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
              </SlideIn>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="line-top py-20 md:py-32 px-6 md:px-12 lg:px-16" style={{ background: 'linear-gradient(160deg, #342A20 0%, #3E3229 40%, #3A2C1E 70%, #2A2118 100%)' }}>
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-2">{t.caseStudies}</h2>
            <p className="text-ink-muted mb-16">{t.caseStudiesSubtitle}</p>
          </FadeIn>

          <div className="space-y-0">
            {caseStudies.map((study, i) => (
              <FadeIn key={study.id} delay={i * 100}>
                <div className="border-t border-divider py-10 md:py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                      <span className="text-ink-light text-[10px] tracking-[0.25em] uppercase">{study.badge[language as keyof typeof study.badge]}</span>
                      <h3 className="font-serif text-xl md:text-2xl text-ink mt-2 mb-1">{study.title[language as keyof typeof study.title]}</h3>
                      <span className="text-amber text-xs tracking-wide">{study.subtitle[language as keyof typeof study.subtitle]}</span>
                    </div>
                    <div className="lg:col-span-4">
                      <p className="text-ink-muted text-sm leading-relaxed">
                        {study.description[language as keyof typeof study.description]}
                      </p>
                    </div>
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
        </section>

        {/* CTA */}
        <section className="line-top py-20 md:py-28 px-6 md:px-12 lg:px-16 relative glow-amber" style={{ background: 'radial-gradient(ellipse 80% 100% at 15% 85%, #3E3229 0%, #302620 40%, #2A2118 85%)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <RevealText>
              <h2 className="font-serif italic text-[clamp(1.8rem,3.5vw,3rem)] text-ink mb-6">{t.cta.title}</h2>
            </RevealText>
            <FadeIn delay={200}>
              <p className="text-ink-muted leading-relaxed mb-10">{t.cta.body}</p>
            </FadeIn>
            <FadeIn delay={350}>
              <Link href="mailto:contact@landings.md" className="inline-flex items-center gap-3 text-amber hover:text-amber-light text-sm tracking-wide transition-colors group">
                {t.cta.button}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="line-top px-6 md:px-12 lg:px-16 py-8 pb-28" style={{ background: 'linear-gradient(180deg, #241E18 0%, #1C1710 100%)' }}>
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
              <span className="text-ink-muted text-xs tracking-wide">{t.footer.copy}</span>
              <div className="flex items-center gap-3">
                <Link href="mailto:contact@landings.md" className="text-ink-muted hover:text-ink transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.093L2.25 6.75" /></svg></Link>
              </div>
            </div>
          </div>
        </footer>

      </div>

      <StickyContactPill language={language as 'en' | 'ro' | 'de' | 'fr' | 'es'} />
    </div>
  )
}
