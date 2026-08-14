import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Design Portfolio | 50+ Websites Delivered',
  description: 'See our web design work for small businesses across Europe. Real projects, real results, 300% traffic increase, Page 1 Google rankings. Automotive, e-commerce, healthcare, education and more.',
  keywords: [
    'professional website design', 'small business web design', 'website designer for small business',
    'web design portfolio', 'hire a web designer',
    'firme creare site web', 'design web profesional', 'agentie web design',
    'agence web design', 'création site web', 'agence création site web', 'site vitrine entreprise',
    'professionelle Website', 'Webdesign Agentur', 'Firmenwebsite erstellen',
    'diseño web profesional', 'agencia de diseño web', 'web corporativa',
  ],
  openGraph: {
    title: 'Web Design Portfolio | landings.md',
    description: '50+ websites delivered for small businesses across Europe. Real projects, real results.',
    url: 'https://landings.md/portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Web Design Portfolio | landings.md',
    description: '50+ websites delivered. Real projects, real results for small businesses.',
  },
  alternates: {
    canonical: 'https://landings.md/portfolio',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Web Design Portfolio | landings.md',
  description: 'Portfolio of custom websites built for small businesses across Europe. Automotive, e-commerce, healthcare, education, and services.',
  url: 'https://landings.md/portfolio',
  publisher: { '@id': 'https://landings.md/#organization' },
  about: {
    '@type': 'Service',
    name: 'Professional Web Design',
    provider: { '@id': 'https://landings.md/#organization' },
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
