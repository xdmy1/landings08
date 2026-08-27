import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://landings.md";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "landings.md | Site-uri, design și SEO în Chișinău, Moldova",
  description:
    "Studio web din Chișinău. Construim site-uri rapide și curate, magazine online și sisteme, cu SEO optimizat direct în cod și backlink-uri premium contextuale de la 3$. Prețuri de la 350 EUR.",
  keywords: [
    "creare site moldova",
    "creare site chisinau",
    "web design moldova",
    "seo moldova",
    "magazin online moldova",
    "backlink-uri premium",
    "landing page moldova",
    "landings.md",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "landings.md",
    locale: "ro_RO",
    title: "landings.md | Site-uri, design și SEO",
    description:
      "Studio web din Chișinău. Site-uri rapide și curate, SEO în cod, backlink-uri premium de la 3$. Prețuri de la 350 EUR.",
    images: [
      {
        url: "/images/shot-davo.jpg",
        width: 1920,
        height: 1200,
        alt: "landings.md, proiect Davo.md",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "landings.md | Site-uri, design și SEO",
    description:
      "Studio web din Chișinău. Site-uri rapide și curate, SEO în cod, backlink-uri premium de la 3$.",
    images: ["/images/shot-davo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfcfa",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#org`,
      name: "landings.md",
      url: SITE,
      email: "contact@landings.md",
      telephone: "+37368327082",
      image: `${SITE}/images/shot-davo.jpg`,
      logo: `${SITE}/images/logo.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chisinau",
        addressCountry: "MD",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.0105,
        longitude: 28.8638,
      },
      areaServed: ["MD", "RO", "EU"],
      sameAs: ["https://www.instagram.com/landings.md"],
      priceRange: "€350 - €850",
      description:
        "Studio web din Chișinău: site-uri, design, SEO optimizat în cod și backlink-uri premium contextuale.",
      makesOffer: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "350",
          priceCurrency: "EUR",
          description: "Landing page: o pagină, design inclus, SEO de bază în cod.",
        },
        {
          "@type": "Offer",
          name: "Business",
          price: "550",
          priceCurrency: "EUR",
          description: "Site complet cu mai multe pagini, design personalizat și SEO tehnic.",
        },
        {
          "@type": "Offer",
          name: "Magazin",
          price: "850",
          priceCurrency: "EUR",
          description: "Magazin online cu plăți, catalog și panou de administrare.",
        },
        {
          "@type": "Offer",
          name: "Backlink-uri premium",
          price: "3",
          priceCurrency: "USD",
          description: "Backlink-uri contextuale, indexate, din site-uri reale. Preț per backlink.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#site`,
      url: SITE,
      name: "landings.md",
      publisher: { "@id": `${SITE}/#org` },
      inLanguage: "ro",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
