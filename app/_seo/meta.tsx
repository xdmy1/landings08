import type { Metadata } from "next";
import type { SeoPage } from "./types";

const SITE = "https://landings.md";

export function seoMetadata(page: SeoPage): Metadata {
  const url = `${SITE}/${page.slug}`;
  return {
    title: `${page.title} | landings.md`,
    description: page.desc,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: "landings.md",
      locale: "ro_RO",
      title: page.title,
      description: page.desc,
      images: [{ url: "/images/shot-davo.jpg", width: 1920, height: 1200, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.desc,
      images: ["/images/shot-davo.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export function SeoJsonLd({ page }: { page: SeoPage }) {
  const url = `${SITE}/${page.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.title,
        description: page.desc,
        serviceType: page.kw,
        url,
        provider: { "@id": `${SITE}/#org` },
        areaServed: [
          { "@type": "City", name: "Chisinau" },
          { "@type": "Country", name: "Moldova" },
        ],
        inLanguage: "ro",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: page.servLabel,
          itemListElement: page.services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.desc },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "landings.md", item: SITE },
          { "@type": "ListItem", position: 2, name: page.title, item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
