"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InteractiveGridBackground } from '@/components/ui/interactive-grid-background'
import { StickyContactPill } from '@/components/ui/sticky-contact-pill'
import { useLanguage } from '@/hooks/useLanguage'

const pricingPlans = [
  {
    id: 1,
    title: {
      en: "Basic Website",
      ro: "Website de Bază",
      de: "Basis-Website",
      fr: "Site Web Basique",
      es: "Sitio Web Basico"
    },
    description: {
      en: "one-time payment",
      ro: "plată unică",
      de: "einmalige Zahlung",
      fr: "paiement unique",
      es: "pago unico"
    },
    price: "€350",
    period: "/one-time",
    subtitle: {
      en: "Perfect for small businesses and personal projects that need a simple, professional online presence.",
      ro: "Perfect pentru afaceri mici și proiecte personale care au nevoie de o prezență online simplă și profesională.",
      de: "Perfekt fur kleine Unternehmen und personliche Projekte, die eine einfache, professionelle Online-Prasenz benotigen.",
      fr: "Parfait pour les petites entreprises et projets personnels necessitant une presence en ligne simple et professionnelle.",
      es: "Perfecto para pequenos negocios y proyectos personales que necesitan una presencia en linea simple y profesional."
    },
    features: [
      {
        en: "Up to 5 pages website",
        ro: "Website până la 5 pagini",
        de: "Website bis zu 5 Seiten",
        fr: "Site web jusqu'a 5 pages",
        es: "Sitio web hasta 5 paginas"
      },
      {
        en: "Responsive mobile design",
        ro: "Design responsiv mobil",
        de: "Responsives Mobildesign",
        fr: "Design responsive mobile",
        es: "Diseno responsive movil"
      },
      {
        en: "Basic SEO optimization",
        ro: "Optimizare SEO de bază",
        de: "Basis-SEO-Optimierung",
        fr: "Optimisation SEO de base",
        es: "Optimizacion SEO basica"
      },
      {
        en: "Contact form integration",
        ro: "Integrare formular contact",
        de: "Kontaktformular-Integration",
        fr: "Integration formulaire de contact",
        es: "Integracion formulario de contacto"
      },
      {
        en: "Free hosting for 1 year",
        ro: "Hosting gratuit 1 an",
        de: "Kostenloses Hosting fur 1 Jahr",
        fr: "Hebergement gratuit pendant 1 an",
        es: "Hosting gratuito por 1 ano"
      },
      {
        en: "SSL Certificate included",
        ro: "Certificat SSL inclus",
        de: "SSL-Zertifikat inklusive",
        fr: "Certificat SSL inclus",
        es: "Certificado SSL incluido"
      },
      {
        en: "1 month support",
        ro: "1 lună suport",
        de: "1 Monat Support",
        fr: "1 mois de support",
        es: "1 mes de soporte"
      }
    ],
    popular: false,
    color: "green",
    buttonText: {
      en: "Get Basic Plan",
      ro: "Obține Planul de Bază",
      de: "Basis-Plan wahlen",
      fr: "Choisir le Plan Basique",
      es: "Obtener Plan Basico"
    }
  },
  {
    id: 2,
    title: {
      en: "Business Website",
      ro: "Website de Afaceri",
      de: "Business-Website",
      fr: "Site Web Business",
      es: "Sitio Web Empresarial"
    },
    description: {
      en: "one-time payment",
      ro: "plată unică",
      de: "einmalige Zahlung",
      fr: "paiement unique",
      es: "pago unico"
    },
    price: "€550",
    period: "/one-time",
    subtitle: {
      en: "Ideal for growing businesses that need advanced features and professional design with booking systems.",
      ro: "Ideal pentru afaceri în creștere care au nevoie de funcții avansate și design profesional cu sisteme de rezervări.",
      de: "Ideal fur wachsende Unternehmen, die erweiterte Funktionen und professionelles Design mit Buchungssystemen benotigen.",
      fr: "Ideal pour les entreprises en croissance necessitant des fonctionnalites avancees et un design professionnel avec systemes de reservation.",
      es: "Ideal para negocios en crecimiento que necesitan funciones avanzadas y diseno profesional con sistemas de reservas."
    },
    features: [
      {
        en: "Up to 10 pages website",
        ro: "Website până la 10 pagini",
        de: "Website bis zu 10 Seiten",
        fr: "Site web jusqu'a 10 pages",
        es: "Sitio web hasta 10 paginas"
      },
      {
        en: "Custom professional design",
        ro: "Design profesional personalizat",
        de: "Individuelles professionelles Design",
        fr: "Design professionnel personnalise",
        es: "Diseno profesional personalizado"
      },
      {
        en: "Advanced SEO optimization",
        ro: "Optimizare SEO avansată",
        de: "Erweiterte SEO-Optimierung",
        fr: "Optimisation SEO avancee",
        es: "Optimizacion SEO avanzada"
      },
      {
        en: "Booking system integration",
        ro: "Integrare sistem rezervări",
        de: "Buchungssystem-Integration",
        fr: "Integration systeme de reservation",
        es: "Integracion sistema de reservas"
      },
      {
        en: "Social media integration",
        ro: "Integrare rețele sociale",
        de: "Social-Media-Integration",
        fr: "Integration reseaux sociaux",
        es: "Integracion redes sociales"
      },
      {
        en: "Google Analytics setup",
        ro: "Configurare Google Analytics",
        de: "Google Analytics Einrichtung",
        fr: "Configuration Google Analytics",
        es: "Configuracion Google Analytics"
      },
      {
        en: "3 months support included",
        ro: "3 luni suport incluse",
        de: "3 Monate Support inklusive",
        fr: "3 mois de support inclus",
        es: "3 meses de soporte incluidos"
      },
      {
        en: "Performance optimization",
        ro: "Optimizare performanță",
        de: "Leistungsoptimierung",
        fr: "Optimisation des performances",
        es: "Optimizacion de rendimiento"
      }
    ],
    popular: true,
    color: "blue",
    buttonText: {
      en: "Get Business Plan",
      ro: "Obține Planul Business",
      de: "Business-Plan wahlen",
      fr: "Choisir le Plan Business",
      es: "Obtener Plan Empresarial"
    }
  },
  {
    id: 3,
    title: {
      en: "E-commerce Store",
      ro: "Magazin Online",
      de: "E-Commerce-Shop",
      fr: "Boutique E-commerce",
      es: "Tienda E-commerce"
    },
    description: {
      en: "one-time payment",
      ro: "plată unică",
      de: "einmalige Zahlung",
      fr: "paiement unique",
      es: "pago unico"
    },
    price: "€850",
    period: "/one-time",
    subtitle: {
      en: "Complete online store solution for businesses ready to sell products with full e-commerce functionality.",
      ro: "Soluție completă de magazin online pentru afaceri gata să vândă produse cu funcționalitate e-commerce completă.",
      de: "Komplette Online-Shop-Losung fur Unternehmen, die mit voller E-Commerce-Funktionalitat Produkte verkaufen mochten.",
      fr: "Solution complete de boutique en ligne pour les entreprises pretes a vendre des produits avec toutes les fonctionnalites e-commerce.",
      es: "Solucion completa de tienda en linea para negocios listos para vender productos con funcionalidad e-commerce completa."
    },
    features: [
      {
        en: "Unlimited pages & products",
        ro: "Pagini & produse nelimitate",
        de: "Unbegrenzte Seiten & Produkte",
        fr: "Pages & produits illimites",
        es: "Paginas y productos ilimitados"
      },
      {
        en: "Custom e-commerce design",
        ro: "Design e-commerce personalizat",
        de: "Individuelles E-Commerce-Design",
        fr: "Design e-commerce personnalise",
        es: "Diseno e-commerce personalizado"
      },
      {
        en: "Shopping cart & checkout",
        ro: "Coș cumpărături & checkout",
        de: "Warenkorb & Checkout",
        fr: "Panier & paiement",
        es: "Carrito de compras y pago"
      },
      {
        en: "Payment gateway integration",
        ro: "Integrare gateway plată",
        de: "Zahlungsgateway-Integration",
        fr: "Integration passerelle de paiement",
        es: "Integracion pasarela de pago"
      },
      {
        en: "Inventory management",
        ro: "Gestionare inventar",
        de: "Bestandsverwaltung",
        fr: "Gestion des stocks",
        es: "Gestion de inventario"
      },
      {
        en: "Order management system",
        ro: "Sistem gestionare comenzi",
        de: "Bestellverwaltungssystem",
        fr: "Systeme de gestion des commandes",
        es: "Sistema de gestion de pedidos"
      },
      {
        en: "SEO optimization",
        ro: "Optimizare SEO",
        de: "SEO-Optimierung",
        fr: "Optimisation SEO",
        es: "Optimizacion SEO"
      },
      {
        en: "6 months support",
        ro: "6 luni suport",
        de: "6 Monate Support",
        fr: "6 mois de support",
        es: "6 meses de soporte"
      }
    ],
    popular: false,
    color: "purple",
    buttonText: {
      en: "Get E-commerce Plan",
      ro: "Obține Planul E-commerce",
      de: "E-Commerce-Plan wahlen",
      fr: "Choisir le Plan E-commerce",
      es: "Obtener Plan E-commerce"
    }
  },
  {
    id: 4,
    title: {
      en: "SEO Backlinks",
      ro: "Backlinks SEO",
      de: "SEO-Backlinks",
      fr: "Backlinks SEO",
      es: "Backlinks SEO"
    },
    description: {
      en: "from €200 to €1500",
      ro: "de la €200 la €1500",
      de: "von 200€ bis 1500€",
      fr: "de 200€ a 1500€",
      es: "de 200€ a 1500€"
    },
    price: "€200-1500",
    period: "",
    subtitle: {
      en: "Boost your Google rankings with high-quality backlinks. Price varies based on competition and domain authority requirements.",
      ro: "Îmbunătățește-ți pozițiile în Google cu backlinks de înaltă calitate. Prețul variază în funcție de competiție și cerințele domeniului.",
      de: "Verbessern Sie Ihre Google-Rankings mit hochwertigen Backlinks. Der Preis variiert je nach Wettbewerb und Domain-Autoritat.",
      fr: "Ameliorez votre classement Google avec des backlinks de haute qualite. Le prix varie selon la concurrence et les exigences d'autorite de domaine.",
      es: "Mejora tu posicionamiento en Google con backlinks de alta calidad. El precio varia segun la competencia y los requisitos de autoridad del dominio."
    },
    features: [
      {
        en: "High-authority domain backlinks",
        ro: "Backlinks de la domenii cu autoritate înaltă",
        de: "Backlinks von Domains mit hoher Autoritat",
        fr: "Backlinks de domaines a haute autorite",
        es: "Backlinks de dominios de alta autoridad"
      },
      {
        en: "Competitor analysis included",
        ro: "Analiză competitori inclusă",
        de: "Wettbewerbsanalyse inklusive",
        fr: "Analyse concurrentielle incluse",
        es: "Analisis de competidores incluido"
      },
      {
        en: "Keyword research & targeting",
        ro: "Cercetare și țintire cuvinte cheie",
        de: "Keyword-Recherche & Targeting",
        fr: "Recherche et ciblage de mots-cles",
        es: "Investigacion y segmentacion de palabras clave"
      },
      {
        en: "Monthly progress reports",
        ro: "Rapoarte lunare de progres",
        de: "Monatliche Fortschrittsberichte",
        fr: "Rapports de progression mensuels",
        es: "Informes mensuales de progreso"
      },
      {
        en: "White-hat SEO techniques only",
        ro: "Doar tehnici SEO white-hat",
        de: "Nur White-Hat-SEO-Techniken",
        fr: "Uniquement techniques SEO white-hat",
        es: "Solo tecnicas SEO white-hat"
      },
      {
        en: "Google ranking improvements",
        ro: "Îmbunătățiri poziții Google",
        de: "Google-Ranking-Verbesserungen",
        fr: "Ameliorations du classement Google",
        es: "Mejoras en el posicionamiento Google"
      },
      {
        en: "Organic traffic increase",
        ro: "Creștere trafic organic",
        de: "Steigerung des organischen Traffics",
        fr: "Augmentation du trafic organique",
        es: "Aumento del trafico organico"
      },
      {
        en: "3-6 months campaign duration",
        ro: "Durată campanie 3-6 luni",
        de: "Kampagnendauer 3-6 Monate",
        fr: "Duree de campagne 3-6 mois",
        es: "Duracion de campana 3-6 meses"
      }
    ],
    popular: false,
    color: "yellow",
    buttonText: {
      en: "Get SEO Quote",
      ro: "Obține Ofertă SEO",
      de: "SEO-Angebot erhalten",
      fr: "Obtenir un Devis SEO",
      es: "Obtener Presupuesto SEO"
    }
  }
]

export default function PricingPage() {
  const { language, setLanguage: handleLanguageChange } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  // Generate WhatsApp URL with plan-specific message
  const getWhatsAppURL = (plan: any) => {
    const messages = {
      en: {
        1: `Hi! I'm interested in the Basic Website package for €350. I'd like to know more about getting started with a professional website for my business.`,
        2: `Hi! I'm interested in the Business Website package for €550. I'd like to learn more about the advanced features and how it can help grow my business.`,
        3: `Hi! I'm interested in the E-commerce Store package for €850. I'd like to discuss setting up a complete online store for my business.`,
        4: `Hi! I'm interested in your SEO Backlinks service (€200-1500). I'd like to improve my Google rankings and would like to discuss the best approach for my website and industry.`
      },
      ro: {
        1: `Salut! Sunt interesată de pachetul Website de Bază la €350. Aș vrea să știu mai multe despre cum să încep cu un website profesional pentru afacerea mea.`,
        2: `Salut! Sunt interesată de pachetul Website Business la €550. Aș vrea să aflu mai multe despre funcționalitățile avansate și cum poate ajuta afacerea mea să crească.`,
        3: `Salut! Sunt interesată de pachetul Magazin Online la €850. Aș vrea să discutăm despre configurarea unui magazin online complet pentru afacerea mea.`,
        4: `Salut! Sunt interesată de serviciul de Backlinks SEO (€200-1500). Aș vrea să îmi îmbunătățesc pozițiile în Google și să discutăm cea mai bună abordare pentru website-ul și industria mea.`
      },
      de: {
        1: `Hallo! Ich interessiere mich fur das Basis-Website-Paket fur 350€. Ich mochte mehr daruber erfahren, wie ich eine professionelle Website fur mein Unternehmen erstellen kann.`,
        2: `Hallo! Ich interessiere mich fur das Business-Website-Paket fur 550€. Ich mochte mehr uber die erweiterten Funktionen erfahren und wie es meinem Unternehmen beim Wachstum helfen kann.`,
        3: `Hallo! Ich interessiere mich fur das E-Commerce-Shop-Paket fur 850€. Ich mochte die Einrichtung eines kompletten Online-Shops fur mein Unternehmen besprechen.`,
        4: `Hallo! Ich interessiere mich fur Ihren SEO-Backlinks-Service (200-1500€). Ich mochte meine Google-Rankings verbessern und den besten Ansatz fur meine Website und Branche besprechen.`
      },
      fr: {
        1: `Bonjour ! Je suis interesse(e) par le pack Site Web Basique a 350€. J'aimerais en savoir plus sur la creation d'un site web professionnel pour mon entreprise.`,
        2: `Bonjour ! Je suis interesse(e) par le pack Site Web Business a 550€. J'aimerais en savoir plus sur les fonctionnalites avancees et comment cela peut aider mon entreprise a se developper.`,
        3: `Bonjour ! Je suis interesse(e) par le pack Boutique E-commerce a 850€. J'aimerais discuter de la mise en place d'une boutique en ligne complete pour mon entreprise.`,
        4: `Bonjour ! Je suis interesse(e) par votre service de Backlinks SEO (200-1500€). J'aimerais ameliorer mon classement Google et discuter de la meilleure approche pour mon site web et mon secteur.`
      },
      es: {
        1: `Hola! Estoy interesado/a en el paquete de Sitio Web Basico por 350€. Me gustaria saber mas sobre como empezar con un sitio web profesional para mi negocio.`,
        2: `Hola! Estoy interesado/a en el paquete de Sitio Web Empresarial por 550€. Me gustaria aprender mas sobre las funciones avanzadas y como puede ayudar a crecer mi negocio.`,
        3: `Hola! Estoy interesado/a en el paquete de Tienda E-commerce por 850€. Me gustaria discutir la configuracion de una tienda en linea completa para mi negocio.`,
        4: `Hola! Estoy interesado/a en su servicio de Backlinks SEO (200-1500€). Me gustaria mejorar mi posicionamiento en Google y discutir el mejor enfoque para mi sitio web y sector.`
      }
    }
    
    const message = messages[language as keyof typeof messages][plan.id as keyof typeof messages.en]
    return `https://wa.me/37368327082?text=${encodeURIComponent(message)}`
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
      hero: {
        title: "See our pricing",
        subtitle: "*Any of the prices is negotiable depending on the project"
      },
      contact: "Contact us for details",
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
        solutions: "Soluții",
        contact: "Contactează-mă"
      },
      hero: {
        title: "Vezi prețurile noastre",
        subtitle: "*Oricare din prețuri este negociabil în funcție de proiect"
      },
      contact: "Contactează-ne pentru detalii",
      cta: {
        title: "Obține o consultație gratuită!",
        button: "Contactează-mă"
      }
    },
    de: {
      nav: {
        home: "Startseite",
        portfolio: "Portfolio",
        pricing: "Preise",
        solutions: "Losungen",
        contact: "Kontakt"
      },
      hero: {
        title: "Unsere Preise",
        subtitle: "*Jeder Preis ist je nach Projekt verhandelbar"
      },
      contact: "Kontaktieren Sie uns fur Details",
      cta: {
        title: "Kostenlose Beratung erhalten!",
        button: "Kontaktieren Sie mich"
      }
    },
    fr: {
      nav: {
        home: "Accueil",
        portfolio: "Portfolio",
        pricing: "Tarifs",
        solutions: "Solutions",
        contact: "Contactez-moi"
      },
      hero: {
        title: "Nos tarifs",
        subtitle: "*Chaque prix est negociable selon le projet"
      },
      contact: "Contactez-nous pour plus de details",
      cta: {
        title: "Obtenez une consultation gratuite !",
        button: "Contactez-moi"
      }
    },
    es: {
      nav: {
        home: "Inicio",
        portfolio: "Portafolio",
        pricing: "Precios",
        solutions: "Soluciones",
        contact: "Contactame"
      },
      hero: {
        title: "Nuestros precios",
        subtitle: "*Cualquier precio es negociable dependiendo del proyecto"
      },
      contact: "Contactanos para mas detalles",
      cta: {
        title: "Obtiene una consulta gratuita!",
        button: "Contactame"
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
                <Link href="/pricing" className="text-white bg-neutral-800/50 px-4 py-2 rounded-lg border border-neutral-700">
                  {t.nav.pricing}
                </Link>
                <Link href="/solutions" className="hover:text-white transition-all duration-300 hover:bg-neutral-800/50 px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700">
                  {t.nav.solutions}
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    className="text-neutral-400 hover:text-white transition-all duration-300 text-sm font-medium px-3 py-2 rounded-md hover:bg-neutral-800/80 border border-neutral-700/50 hover:border-neutral-600 backdrop-blur-sm"
                  >
                    {language.toUpperCase()}
                  </button>
                  {langMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                      <div className="absolute top-full right-0 mt-2 bg-neutral-900/95 backdrop-blur-md rounded-lg border border-neutral-700/50 overflow-hidden z-50 min-w-[80px]">
                        {(['en', 'ro', 'de', 'fr', 'es'] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => { handleLanguageChange(lang); setLangMenuOpen(false); }}
                            className={`block w-full text-left px-4 py-2 text-sm transition-colors ${language === lang ? "bg-neutral-800 text-white" : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white"}`}
                          >
                            {lang.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <Link href="https://wa.me/37368327082">
                  <Button className="bg-gradient-to-r from-white to-neutral-200 hover:from-neutral-100 hover:to-neutral-300 text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    {t.nav.contact}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="text-neutral-400 hover:text-white transition-all duration-300 text-sm font-medium px-3 py-2 rounded-md hover:bg-neutral-800/80 border border-neutral-700/50"
                >
                  {language.toUpperCase()}
                </button>
                {langMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 bg-neutral-900/95 backdrop-blur-md rounded-lg border border-neutral-700/50 overflow-hidden z-50 min-w-[80px]">
                      {(['en', 'ro', 'de', 'fr', 'es'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => { handleLanguageChange(lang); setLangMenuOpen(false); }}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors ${language === lang ? "bg-neutral-800 text-white" : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white"}`}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
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
                  className="text-white bg-neutral-800/50 p-3 rounded-lg text-center border border-neutral-700"
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

      <main className="relative z-10 pt-28 md:pt-32">
        {/* Hero Section */}
        <section className="py-8 px-4 relative">
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent"
            >
              {t.hero.title}
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-neutral-400 mb-8 max-w-3xl mx-auto"
            >
              {t.hero.subtitle}
            </motion.h2>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn(
                    "relative group h-full",
                    plan.popular && "scale-105"
                  )}
                >
                  {/* Card Content */}
                  <div className={cn(
                    "relative h-full rounded-2xl p-6 transition-all duration-300 border flex flex-col",
                    plan.color === "green" && "bg-emerald-950/50 border-emerald-800/50",
                    plan.color === "blue" && "bg-blue-950/50 border-blue-800/50", 
                    plan.color === "purple" && "bg-purple-950/50 border-purple-800/50",
                    plan.color === "yellow" && "bg-yellow-950/50 border-yellow-800/50"
                  )}>
                    
                    {/* Plan Header */}
                    <div className="mb-6">
                      <div className={cn(
                        "text-sm font-medium mb-2",
                        plan.color === "green" && "text-emerald-400",
                        plan.color === "blue" && "text-blue-400",
                        plan.color === "purple" && "text-purple-400",
                        plan.color === "yellow" && "text-yellow-400"
                      )}>
                        {plan.title[language as keyof typeof plan.title]}
                      </div>
                      <div className="text-neutral-400 text-sm mb-4">
                        {plan.description[language as keyof typeof plan.description]}
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">
                        {plan.price}
                        <span className="text-lg text-neutral-400 font-normal">{plan.period}</span>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-neutral-300 text-sm mb-6 leading-relaxed flex-grow">
                      {plan.subtitle[language as keyof typeof plan.subtitle]}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full mt-0.5 flex items-center justify-center flex-shrink-0",
                            plan.color === "green" && "bg-emerald-500",
                            plan.color === "blue" && "bg-blue-500",
                            plan.color === "purple" && "bg-purple-500",
                            plan.color === "yellow" && "bg-yellow-500"
                          )}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-neutral-300 text-sm">
                            {feature[language as keyof typeof feature]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link href={getWhatsAppURL(plan)} className="mt-auto">
                      <Button className={cn(
                        "w-full py-3 font-medium rounded-lg transition-all duration-300",
                        plan.color === "green" && "bg-emerald-600 hover:bg-emerald-700 text-white",
                        plan.color === "blue" && "bg-blue-600 hover:bg-blue-700 text-white",
                        plan.color === "purple" && "bg-purple-600 hover:bg-purple-700 text-white",
                        plan.color === "yellow" && "bg-yellow-600 hover:bg-yellow-700 text-white"
                      )}>
                        {plan.buttonText[language as keyof typeof plan.buttonText]}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
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
                    {({ en: "Let's talk and make it happen", ro: "Să vorbim și să facem să se întâmple", de: 'Lassen Sie uns reden und es verwirklichen', fr: 'Parlons-en et realisons-le', es: 'Hablemos y hagamoslo realidad' })[language as 'en' | 'ro' | 'de' | 'fr' | 'es']}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-neutral-300 leading-relaxed"
                  >
                    {({ en: "Reach out to us, and we'll respond as soon as possible.", ro: "Contactează-ne și îți vom răspunde cât mai curând posibil.", de: 'Kontaktieren Sie uns und wir antworten so schnell wie moglich.', fr: 'Contactez-nous et nous vous repondrons des que possible.', es: 'Contactanos y te responderemos lo antes posible.' })[language as 'en' | 'ro' | 'de' | 'fr' | 'es']}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Link href="https://wa.me/37368327082">
                      <Button className="bg-gradient-to-r from-white to-neutral-100 hover:from-neutral-50 hover:to-neutral-200 text-black font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                        {({ en: 'Talk to us', ro: 'Vorbește cu noi', de: 'Kontaktieren Sie uns', fr: 'Parlez-nous', es: 'Hablanos' })[language as 'en' | 'ro' | 'de' | 'fr' | 'es']}
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
      </main>

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
                  {({ en: 'Home', ro: 'Acasă', de: 'Startseite', fr: 'Accueil', es: 'Inicio' })[language as 'en' | 'ro' | 'de' | 'fr' | 'es']}
                </Link>
                <Link href="/portfolio" className="hover:text-white transition-colors py-2">
                  {({ en: 'Portfolio', ro: 'Portofoliu', de: 'Portfolio', fr: 'Portfolio', es: 'Portafolio' })[language as 'en' | 'ro' | 'de' | 'fr' | 'es']}
                </Link>
                <Link href="/pricing" className="hover:text-white transition-colors py-2">
                  {({ en: 'Pricing', ro: 'Prețuri', de: 'Preise', fr: 'Tarifs', es: 'Precios' })[language as 'en' | 'ro' | 'de' | 'fr' | 'es']}
                </Link>
                <Link href="/solutions" className="hover:text-white transition-colors py-2">
                  {({ en: 'Solutions', ro: 'Soluții', de: 'Losungen', fr: 'Solutions', es: 'Soluciones' })[language as 'en' | 'ro' | 'de' | 'fr' | 'es']}
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-neutral-500">
                {({ en: '© 2026 All rights reserved.', ro: '© 2026 Toate drepturile rezervate.', de: '© 2026 Alle Rechte vorbehalten.', fr: '© 2026 Tous droits reserves.', es: '© 2026 Todos los derechos reservados.' })[language as 'en' | 'ro' | 'de' | 'fr' | 'es']}
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
      <StickyContactPill language={language as 'en' | 'ro' | 'de' | 'fr' | 'es'} />
    </div>
  )
}