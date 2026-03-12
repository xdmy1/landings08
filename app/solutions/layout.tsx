import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Web Solutions | CRM, E-commerce & Digital Systems',
  description: 'Custom digital solutions for businesses: CRM systems, e-commerce stores, logistics platforms, booking systems. 99.9% uptime, 3x faster operations. Built for small businesses and startups.',
  keywords: [
    'ecommerce website small business', 'responsive website design', 'WordPress website for business',
    'small business online presence',
    'creare magazin online', 'optimizare SEO Romania', 'creare site WordPress',
    'création site e-commerce', 'site internet pour artisan', 'refonte site internet', 'site internet PME',
    'Online-Shop erstellen', 'SEO für kleine Unternehmen', 'Webentwickler freelancer',
    'crear tienda online', 'desarrollo web para pymes', 'web responsive',
  ],
  openGraph: {
    title: 'Custom Web Solutions — landings.md',
    description: 'CRM systems, e-commerce stores, logistics platforms. Custom-built for small businesses.',
    url: 'https://landings.md/solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Custom Web Solutions — landings.md',
    description: 'CRM, e-commerce, logistics — custom digital solutions for small businesses.',
  },
  alternates: {
    canonical: 'https://landings.md/solutions',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom Digital Solutions',
  provider: { '@id': 'https://landings.md/#organization' },
  url: 'https://landings.md/solutions',
  description: 'Custom web applications, CRM systems, e-commerce platforms, and logistics solutions for small businesses.',
  serviceType: ['Web Application Development', 'E-commerce Development', 'CRM Development'],
  areaServed: {
    '@type': 'Place',
    name: 'Europe',
  },
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
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
