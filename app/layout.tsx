import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://landings.md'),
  title: {
    default: 'Custom Websites for Small Business | Affordable Web Design — landings.md',
    template: '%s — landings.md',
  },
  description: 'Professional website design for small businesses starting at €350. Get found on Google, get more clients. Custom-built, mobile-friendly, no templates. Serving Europe in 5 languages.',
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
    title: 'Custom Websites for Small Business — landings.md',
    description: 'Professional website design for small businesses starting at €350. Get found on Google, get more clients. No templates, no WordPress.',
    images: [{
      url: '/icon.png',
      width: 512,
      height: 512,
      alt: 'landings.md — Custom websites for small business',
    }],
  },
  twitter: {
    card: 'summary',
    title: 'Custom Websites for Small Business — landings.md',
    description: 'Professional website design starting at €350. Get found on Google, get more clients.',
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
        description: 'Professional website design and development for small businesses across Europe. Custom-built websites starting at €350.',
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
        serviceType: 'Web Design',
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
        name: 'landings.md — Web Design Agency',
        url: 'https://landings.md',
        priceRange: '€350 - €850+',
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
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Onest:wght@100..900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden bg-cream text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
