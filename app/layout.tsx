import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://landings.md'),
  title: {
    default: 'Websites, SEO, Ads & Custom Business Systems — landings.md',
    template: '%s — landings.md',
  },
  description: 'We build websites that rank on Google, run Meta & Google Ads campaigns, and create booking, invoicing, stock and accounting systems that eliminate paperwork. Custom-coded, start to finish. Serving Europe in 5 languages.',
  keywords: [
    'small business website', 'affordable website design', 'professional website design',
    'small business web design', 'website for small business', 'local business website',
    'get a website for my business', 'business website cost', 'website design packages',
    'website designer for small business', 'hire a web designer', 'website design near me',
    'responsive website design', 'small business online presence', 'ecommerce website small business',
    'cheap website builder', 'business website builder', 'build a website cheap',
    'creare site web', 'site web pentru afaceri mici', 'realizare site ieftin',
    'creare site prezentare', 'design web profesional', 'cat costa un site web',
    'creare magazin online', 'web design Romania', 'pachete web design',
    'création site web', 'site web pour petite entreprise', 'creation site internet pas cher',
    'agence web design', 'créer un site professionnel', 'combien coûte un site web',
    'site vitrine entreprise', 'tarif création site internet',
    'Website erstellen lassen', 'Webdesign für kleine Unternehmen', 'günstige Website erstellen',
    'professionelle Website', 'Website Kosten', 'Webdesign Preise', 'Homepage erstellen lassen',
    'crear página web', 'diseño web para pequeñas empresas', 'página web barata',
    'diseño web profesional', 'cuánto cuesta una página web', 'agencia de diseño web',
    'web para negocio local', 'precio diseño web',
    'custom business software', 'booking system for small business', 'appointment scheduling system',
    'invoicing software custom', 'inventory management system', 'business automation',
    'seat selection booking system', 'custom CRM development', 'ERP for small business',
    'sistem de rezervari', 'sistem programari online', 'soft de facturare la comanda',
    'automatizare afacere', 'CRM la comanda', 'aplicatii web la comanda Moldova',
    'SEO Moldova', 'promovare Google', 'campanii Meta Ads', 'agentie SEO Chisinau',
  ],
  authors: [{ name: 'landings.md', url: 'https://landings.md' }],
  creator: 'landings.md',
  publisher: 'landings.md',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ro_RO', 'de_DE', 'fr_FR', 'es_ES'],
    url: 'https://landings.md',
    siteName: 'landings.md',
    title: 'Websites, SEO, Ads & Custom Business Systems — landings.md',
    description: 'Websites that rank on Google, Meta & Google Ads campaigns, and booking, invoicing and accounting systems that eliminate paperwork. Custom-coded, start to finish.',
    images: [{
      url: '/icon.png',
      width: 512,
      height: 512,
      alt: 'landings.md — websites, SEO and custom business systems',
    }],
  },
  twitter: {
    card: 'summary',
    title: 'Websites, SEO, Ads & Custom Business Systems — landings.md',
    description: 'Websites that rank on Google, ad campaigns that convert, and custom systems that eliminate paperwork.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://landings.md',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://landings.md/#organization',
        name: 'landings.md',
        url: 'https://landings.md',
        logo: {
          '@type': 'ImageObject',
          url: 'https://landings.md/images/logowhite.png',
        },
        email: 'contact@landings.md',
        sameAs: ['https://instagram.com/landings.md'],
        description: 'Websites that rank on Google, Meta & Google Ads campaigns, and custom business systems — bookings, invoicing, stock, automated accounting — for small businesses across Europe. Hand-coded, in 5 languages.',
        areaServed: [
          { '@type': 'Country', name: 'Moldova' },
          { '@type': 'Country', name: 'Romania' },
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'France' },
          { '@type': 'Country', name: 'Spain' },
          { '@type': 'Country', name: 'Austria' },
          { '@type': 'Country', name: 'Switzerland' },
          { '@type': 'Country', name: 'Belgium' },
        ],
        knowsLanguage: ['en', 'ro', 'de', 'fr', 'es'],
        serviceType: ['Web Design', 'Search Engine Optimization', 'Online Advertising', 'Custom Software Development'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://landings.md/#website',
        url: 'https://landings.md',
        name: 'landings.md',
        publisher: { '@id': 'https://landings.md/#organization' },
        inLanguage: ['en', 'ro', 'de', 'fr', 'es'],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://landings.md/#service',
        name: 'landings.md — Web Design, SEO & Business Systems',
        url: 'https://landings.md',
        priceRange: '€350+',
        telephone: '',
        email: 'contact@landings.md',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'MD',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 47.0105,
          longitude: 28.8638,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Website Design Packages',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'Starter Website' },
              price: '350',
              priceCurrency: 'EUR',
              description: 'Up to 5 pages, mobile-friendly, contact form, hosting included for 1 year.',
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'Business Website' },
              price: '550',
              priceCurrency: 'EUR',
              description: 'Up to 10 pages, custom design, booking forms, Google visibility, 3 months support.',
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'Online Store' },
              price: '850',
              priceCurrency: 'EUR',
              description: 'Unlimited products, cart and checkout, secure payments, stock management, 6 months support.',
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'Custom Business System' },
              description: 'Booking systems with seat selection, appointment scheduling, invoicing, stock tracking and automated accounting — built around your processes. Custom quote.',
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'SEO & Advertising' },
              description: 'Monthly growth subscription: SEO, backlinks, content, Meta & Google Ads campaigns with reporting.',
            },
          ],
        },
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..800&family=Geist+Mono:wght@400..600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
