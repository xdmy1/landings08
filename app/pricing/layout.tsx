import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Design Packages & Pricing | From €350',
  description: 'Transparent website design pricing for small businesses. Starter websites from €350, Business sites from €550, Online Stores from €850. Extra languages from €50 each. Find your price in 2 minutes.',
  keywords: [
    'business website cost', 'website design packages', 'affordable website design',
    'cheap website builder', 'build a website cheap', 'website design near me',
    'cat costa un site web', 'pachete web design', 'realizare site ieftin', 'web design ieftin Romania',
    'combien coûte un site web', 'tarif création site internet', 'creation site internet pas cher',
    'Website Kosten', 'Webdesign Preise', 'günstige Website erstellen', 'Website Pakete',
    'cuánto cuesta una página web', 'precio diseño web', 'página web barata', 'diseño web económico',
  ],
  openGraph: {
    title: 'Website Design Pricing | From €350 — landings.md',
    description: 'Starter from €350, Business from €550, Online Store from €850. Find out what your website will cost.',
    url: 'https://landings.md/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Website Design Pricing | From €350 — landings.md',
    description: 'Find out what your website will cost in 2 minutes. Transparent pricing, no surprises.',
  },
  alternates: {
    canonical: 'https://landings.md/pricing',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a small business website cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A starter website for small businesses starts at €350, including up to 5 pages, mobile-friendly design, contact form, and 1 year of free hosting. Business websites with more features start at €550, and online stores start at €850.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a multilingual website cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each additional language costs €50 on top of the base price. For example, a starter website in 3 languages would cost €450 (€350 base + €100 for 2 extra languages).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in the website design packages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All packages include mobile-friendly responsive design, secure connection (SSL), and free hosting. Starter (€350) includes up to 5 pages and a contact form. Business (€550) adds custom design, booking forms, Google visibility, and 3 months support. Online Store (€850) includes unlimited products, cart, checkout, secure payments, and 6 months support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you build online stores and e-commerce websites?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our Online Store package starts at €850 and includes unlimited products, shopping cart, secure checkout, payment integration, stock management, order tracking, and 6 months of support.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A starter website typically takes 1-2 weeks. Business websites take 2-3 weeks. Online stores and more complex projects take 3-4 weeks. Timeline depends on how quickly you provide content and feedback.',
      },
    },
  ],
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
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
