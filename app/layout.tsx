import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://landings.md";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "landings.md | Site-uri, design și SEO în Chișinău, Moldova",
  description:
    "Construim site-uri rapide și curate, magazine online și sisteme, cu SEO optimizat direct în cod și backlink-uri premium contextuale.",
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
      "Site-uri rapide și curate, SEO în cod, backlink-uri premium contextuale.",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "landings.md: site-uri care aduc clienți. Site-uri, aplicații și SEO.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "landings.md | Site-uri, design și SEO",
    description:
      "Site-uri rapide și curate, SEO în cod, backlink-uri premium contextuale.",
    images: ["/images/og.jpg"],
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
      image: `${SITE}/images/og.jpg`,
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
      description:
        "Site-uri, design, SEO optimizat în cod și backlink-uri premium contextuale.",
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
