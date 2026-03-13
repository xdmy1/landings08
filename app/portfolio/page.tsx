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

const projects = [
  {
    id: 1, title: "RADX Cooling Solutions",
    description: { en: "Professional website for cooling solutions company. Presentation of services and industrial cooling products.", ro: "Website profesional pentru companie de solutii de racire. Prezentarea serviciilor si produselor de racire industriala.", de: "Professionelle Website fur ein Kuhllosungsunternehmen.", fr: "Site web professionnel pour une entreprise de solutions de refroidissement.", es: "Sitio web profesional para empresa de soluciones de refrigeracion." },
    image: "/images/radx-mockup.png", url: "https://radx.solutions", status: "LIVE", category: "services"
  },
  {
    id: 2, title: "Inter-Bus",
    description: { en: "International platform for authentic bus parts and components. Global shipping to 50+ countries.", ro: "Platforma internationala pentru piese autentice de autobuz. Livrare globala in peste 50 de tari.", de: "Internationale Plattform fur authentische Busteile und Komponenten.", fr: "Plateforme internationale pour pieces authentiques d'autobus.", es: "Plataforma internacional para piezas autenticas de autobus." },
    image: "/images/inter-bus.png", url: "https://inter-bus.md", status: "LIVE", category: "ecommerce"
  },
  {
    id: 3, title: "Rizza Classic",
    description: { en: "Italian website for old cars restoration.", ro: "Website italian pentru restaurarea masinilor vechi.", de: "Italienische Website fur die Restaurierung alter Autos.", fr: "Site web italien pour la restauration de voitures anciennes.", es: "Sitio web italiano para la restauracion de coches clasicos." },
    image: "/images/rizzaclassic.png", url: "https://rizzaclassic.com", status: "LIVE", category: "automotive"
  },
  {
    id: 4, title: "Auto Huse",
    description: { en: "Complete website for car covers. Presentation, online orders, gallery.", ro: "Website complet pentru huse auto. Prezentare, comenzi online, galerie.", de: "Komplette Website fur Autobezuge.", fr: "Site web complet pour housses de voiture.", es: "Sitio web completo para fundas de coche." },
    image: "/images/autohuse.md-min.png", url: "https://autohuse.md/", status: "LIVE", category: "ecommerce"
  },
  {
    id: 5, title: "CRM Platform",
    description: { en: "Platform for auto service client management.", ro: "Platforma pentru client management service auto.", de: "Plattform fur Kundenmanagement im Autoservice.", fr: "Plateforme de gestion clients pour service automobile.", es: "Plataforma de gestion de clientes para servicio automotriz." },
    image: "/images/CRM.png", url: "#", status: "PRIVATE", category: "automotive"
  },
  {
    id: 6, title: "U. Dental Clinic",
    description: { en: "Complete website for dental clinic.", ro: "Website complet pentru clinica stomatologica.", de: "Komplette Website fur Zahnklinik.", fr: "Site web complet pour clinique dentaire.", es: "Sitio web completo para clinica dental." },
    image: "/images/udc (1).png", url: "https://udc.md", status: "LIVE", category: "healthcare"
  },
  {
    id: 7, title: "Auto Marga Service",
    description: { en: "Simple landing page — auto service.", ro: "Landing page simplu — service auto.", de: "Einfache Landing Page — Autoservice.", fr: "Page d'atterrissage simple — service automobile.", es: "Pagina de aterrizaje simple — servicio automotriz." },
    image: "/images/automarga (1).png", url: "https://automarga.md/", status: "LIVE", category: "automotive"
  },
  {
    id: 8, title: "Elena Diacon Salon",
    description: { en: "Elegant website for beauty salon with online booking system.", ro: "Website elegant pentru salon de infrumusetare cu sistem de programari online.", de: "Elegante Website fur Schonheitssalon mit Online-Buchungssystem.", fr: "Site web elegant pour salon de beaute avec systeme de reservation en ligne.", es: "Sitio web elegante para salon de belleza con sistema de reservas en linea." },
    image: "/images/elenadiacon (1).png", url: "https://elenadiacon.md", status: "LIVE", category: "services"
  },
  {
    id: 9, title: "RespectAuto",
    description: { en: "Car rental platform with advanced SEO and booking system. 300% organic growth.", ro: "Platforma de inchiriere auto cu SEO avansat si sistem de rezervari. Crestere organica de 300%.", de: "Autovermietungsplattform mit fortschrittlichem SEO. 300% organisches Wachstum.", fr: "Plateforme de location avec SEO avance. Croissance organique de 300%.", es: "Plataforma de alquiler con SEO avanzado. Crecimiento organico del 300%." },
    image: "/images/respectauto-mockup.png", url: "https://respectauto.md", status: "LIVE", category: "automotive"
  },
  {
    id: 10, title: "CMIEA Platform",
    description: { en: "Complex educational platform with authentication, interactive courses and dashboard.", ro: "Platforma educationala complexa cu autentificare, cursuri interactive si dashboard.", de: "Komplexe Bildungsplattform mit Authentifizierung und interaktiven Kursen.", fr: "Plateforme educative complexe avec authentification et cours interactifs.", es: "Plataforma educativa compleja con autenticacion y cursos interactivos." },
    image: "/images/cmiea-mockup.png", url: "https://cmiea.md", status: "LIVE", category: "education"
  },
  {
    id: 11, title: "EuroGard",
    description: { en: "High-converting landing page for gardening services.", ro: "Landing page high-converting pentru servicii de gradinarit.", de: "Hochkonvertierende Landing Page fur Gartendienstleistungen.", fr: "Page d'atterrissage a haute conversion pour services de jardinage.", es: "Pagina de aterrizaje de alta conversion para servicios de jardineria." },
    image: "/images/eurogard (1).png", url: "https://eurogard.md", status: "LIVE", category: "services"
  },
  {
    id: 12, title: "Green Next.js Demo",
    description: { en: "Interactive demo built with Next.js, showcasing modern web capabilities.", ro: "Demo interactiv construit cu Next.js.", de: "Interaktive Demo mit Next.js.", fr: "Demo interactive construite avec Next.js.", es: "Demo interactiva construida con Next.js." },
    image: "/images/img-hero.jpeg", url: "https://nextjs-green-eta-60.vercel.app/", status: "DEMO", category: "demo"
  },
  {
    id: 13, title: "Advanced Green Demo",
    description: { en: "Advanced demonstration with complex functionalities and animations.", ro: "Demonstratie avansata cu functionalitati complexe si animatii.", de: "Fortgeschrittene Demonstration mit komplexen Funktionalitaten.", fr: "Demonstration avancee avec des fonctionnalites complexes.", es: "Demostracion avanzada con funcionalidades complejas." },
    image: "/images/img-hero.jpeg", url: "https://green-nextjs.vercel.app/", status: "DEMO", category: "demo"
  }
]

const categories = [
  { id: 'all', name: { en: 'All', ro: 'Toate', de: 'Alle', fr: 'Tous', es: 'Todos' } },
  { id: 'automotive', name: { en: 'Automotive', ro: 'Auto', de: 'Automobil', fr: 'Automobile', es: 'Automotriz' } },
  { id: 'ecommerce', name: { en: 'E-commerce', ro: 'E-commerce', de: 'E-Commerce', fr: 'E-commerce', es: 'E-commerce' } },
  { id: 'healthcare', name: { en: 'Healthcare', ro: 'Sanatate', de: 'Gesundheit', fr: 'Sante', es: 'Salud' } },
  { id: 'education', name: { en: 'Education', ro: 'Educatie', de: 'Bildung', fr: 'Education', es: 'Educacion' } },
  { id: 'services', name: { en: 'Services', ro: 'Servicii', de: 'Dienste', fr: 'Services', es: 'Servicios' } },
  { id: 'demo', name: { en: 'Demos', ro: 'Demo-uri', de: 'Demos', fr: 'Demos', es: 'Demos' } }
]

export default function PortfolioPage() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  const text = {
    en: {
      nav: { portfolio: "Portfolio", pricing: "Pricing", solutions: "Solutions", caseStudies: "Case Studies", contact: "Contact" },
      title: "Portfolio.",
      subtitle: "All projects are custom developed. No WordPress.",
      visitSite: "Visit site", viewDemo: "View demo", private: "Private",
      cta: { title: "Have a project in mind?", body: "Reach out and we'll respond within hours.", button: "Let's talk" },
      footer: { copy: "© 2026 All rights reserved." }
    },
    ro: {
      nav: { portfolio: "Portofoliu", pricing: "Preturi", solutions: "Solutii", caseStudies: "Studii de Caz", contact: "Contact" },
      title: "Portofoliu.",
      subtitle: "Toate proiectele sunt custom dezvoltate. Fara WordPress.",
      visitSite: "Acceseaza site-ul", viewDemo: "Vezi demo", private: "Privat",
      cta: { title: "Ai un proiect in minte?", body: "Contacteaza-ne si iti vom raspunde in cateva ore.", button: "Hai sa vorbim" },
      footer: { copy: "© 2026 Toate drepturile rezervate." }
    },
    de: {
      nav: { portfolio: "Portfolio", pricing: "Preise", solutions: "Losungen", caseStudies: "Fallstudien", contact: "Kontakt" },
      title: "Portfolio.",
      subtitle: "Alle Projekte sind individuell entwickelt. Kein WordPress.",
      visitSite: "Website besuchen", viewDemo: "Demo ansehen", private: "Privat",
      cta: { title: "Haben Sie ein Projekt?", body: "Kontaktieren Sie uns, wir antworten innerhalb von Stunden.", button: "Kontaktieren Sie uns" },
      footer: { copy: "© 2026 Alle Rechte vorbehalten." }
    },
    fr: {
      nav: { portfolio: "Portfolio", pricing: "Tarifs", solutions: "Solutions", caseStudies: "Etudes de Cas", contact: "Contact" },
      title: "Portfolio.",
      subtitle: "Tous les projets sont developpes sur mesure. Pas de WordPress.",
      visitSite: "Visiter le site", viewDemo: "Voir la demo", private: "Prive",
      cta: { title: "Vous avez un projet ?", body: "Contactez-nous et nous repondrons en quelques heures.", button: "Parlons-en" },
      footer: { copy: "© 2026 Tous droits reserves." }
    },
    es: {
      nav: { portfolio: "Portafolio", pricing: "Precios", solutions: "Soluciones", caseStudies: "Casos de Estudio", contact: "Contacto" },
      title: "Portafolio.",
      subtitle: "Todos los proyectos son desarrollados a medida. Sin WordPress.",
      visitSite: "Visitar sitio", viewDemo: "Ver demo", private: "Privado",
      cta: { title: "Tienes un proyecto?", body: "Contactanos y te responderemos en horas.", button: "Hablemos" },
      footer: { copy: "© 2026 Todos los derechos reservados." }
    }
  }

  const t = text[language as keyof typeof text]
  const filteredProjects = selectedCategory === 'all' ? projects : projects.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen text-ink grain" style={{ background: '#2A2118' }}>

      <SiteNav contactHref="/#contact" />

      <div className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 relative line-sides">

        {/* Hero */}
        <section className="pt-36 md:pt-48 pb-12 px-6 md:px-12 lg:px-16 relative glow-amber" style={{ background: 'linear-gradient(160deg, #302620 0%, #3A2C1E 35%, #2A2118 100%)' }}>
          <RevealText>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] text-ink">{t.title}</h1>
          </RevealText>
          <FadeIn delay={200}>
            <p className="mt-4 text-ink-muted text-sm tracking-wide">{t.subtitle}</p>
          </FadeIn>
        </section>

        {/* Category Filter */}
        <section className="line-top px-6 md:px-12 lg:px-16 py-6 md:py-8" style={{ background: 'linear-gradient(90deg, #2A2118 0%, #302620 50%, #2A2118 100%)' }}>
          <FadeIn>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs tracking-[0.15em] uppercase px-3 py-1.5 transition-all duration-200 ${selectedCategory === cat.id ? 'text-ink border-b border-ink' : 'text-ink-muted hover:text-ink'}`}
                >
                  {cat.name[language as keyof typeof cat.name]}
                </button>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Projects Grid */}
        <section className="line-top px-6 md:px-12 lg:px-16 pt-10 pb-20 md:pb-32" style={{ background: 'linear-gradient(180deg, #2A2118 0%, #342A20 50%, #2C2218 100%)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 60} className="h-full">
                <div className="h-full flex flex-col bg-surface border border-divider shadow-card group hover:border-amber transition-colors duration-300">
                  {/* Image */}
                  <div className="flex-shrink-0 flex items-center justify-center p-3 bg-surface/50">
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.description.en}`}
                      width={500}
                      height={350}
                      className="w-full h-auto max-h-[150px] object-contain group-hover:scale-[1.02] transition-all duration-300 ease-smooth"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber text-[10px] tracking-[0.2em] uppercase">
                        {categories.find(c => c.id === project.category)?.name[language as keyof typeof categories[0]['name']]}
                      </span>
                      <span className={`text-[10px] tracking-[0.15em] uppercase ${project.status === 'LIVE' ? 'text-ink-muted' : 'text-ink-light'}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-ink font-serif text-lg mb-1">{project.title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {project.description[language as keyof typeof project.description]}
                    </p>
                    {project.status !== "PRIVATE" ? (
                      <Link href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber hover:text-amber-light text-xs tracking-wide transition-colors mt-auto">
                        {project.status === "DEMO" ? t.viewDemo : t.visitSite}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </Link>
                    ) : (
                      <span className="text-ink-light text-xs tracking-wide mt-auto">{t.private}</span>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="line-top px-6 md:px-12 lg:px-16 py-20 md:py-28 relative glow-amber" style={{ background: 'radial-gradient(ellipse 90% 130% at 50% 100%, #3E3229 0%, #302620 40%, #2A2118 85%)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <RevealText>
              <h2 className="font-serif italic text-[clamp(1.8rem,3.5vw,3rem)] text-ink mb-4">{t.cta.title}</h2>
            </RevealText>
            <FadeIn delay={200}>
              <p className="text-ink-muted mb-8">{t.cta.body}</p>
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
                <Link href="/case-studies" className="hover:text-ink transition-colors">{t.nav.caseStudies}</Link>
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
