import type { Metadata } from "next";
import SiteShell from "./_shell/site";
import { LANG_ALTERNATES } from "./_shell/langs";

export const metadata: Metadata = { alternates: { canonical: "/", languages: LANG_ALTERNATES } };

/* questions and answers for Google's FAQ rich result; the home page only */
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ce servicii oferă Landings.md?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Creăm site-uri de prezentare, magazine online, aplicații și sisteme pentru afaceri din Moldova și Europa. Oferim și SEO în cod, backlink-uri premium și mentenanță lunară.",
      },
    },
    {
      "@type": "Question",
      name: "Ce înseamnă SEO în cod?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Este optimizare tehnică scrisă direct în cod: structură, viteză, date structurate și indexare. Se face la crearea site-ului, nu adăugată ulterior.",
      },
    },
    {
      "@type": "Question",
      name: "Pot verifica gratuit site-ul meu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Da. Verificarea gratuită durează un minut și arată viteza, poziția în Google, designul și cât de bine vinde site-ul.",
      },
    },
    {
      "@type": "Question",
      name: "Cât costă mentenanța lunară?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Există trei pachete: Start la €50/lună, Business la €150/lună și Prioritar la €250/lună. Plata se face lunar cu cardul, în lei, la cursul BNM din ziua plății. Bugetul pentru reclame se plătește separat.",
      },
    },
    {
      "@type": "Question",
      name: "Ce intră într-o cerere de mentenanță?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O cerere este o sarcină de până la 30 de minute, de exemplu poze noi, texte, produse sau o reclamă de verificat. Cererile se trimit pe Telegram, iar numărul lor depinde de pachet. Lucrările mari, ca un site nou, au ofertă separată.",
      },
    },
    {
      "@type": "Question",
      name: "Faceți și sisteme pentru firmă, nu doar site-uri?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Da, construim soluții pentru programări, facturare, stoc și contabilitate. Exemple din portofoliu: un CRM pentru Mobo, un ERP pentru Inter-Bus și o aplicație pentru Scoala Auto GLG. Prețul se stabilește la cerere.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SiteShell />
    </>
  );
}
