"use client";

import { Component, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { MetalFx } from "metal-fx";
import { ThinkingOrb } from "thinking-orbs";
import { HeroOrb } from "../fx";
import type { SeoPage } from "../_seo/types";
import { SEO_INDEX, SEO_SLUGS } from "../_seo/index";

/* if a WebGL/CSS effect throws at runtime, fall back to the plain element */
class FxBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    return this.state.err ? this.props.fallback : this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

const LANGS = ["ro", "en", "de", "fr", "es", "ru"] as const;
type Lang = (typeof LANGS)[number];

const PROJECTS = [
  { key: "glg", name: "Scoala Auto GLG", domain: "scoalaautoglg.com", href: "https://scoalaautoglg.com", img: "/images/shot-glg" },
  { key: "mobo", name: "Mobo", domain: "mobo.md", href: "https://mobo.md", img: "/images/shot-mobo" },
  { key: "inauto", name: "InAuto", domain: "inauto.md", href: "https://inauto.md", img: "/images/shot-inauto" },
  { key: "davo", name: "Davo", domain: "davo.md", href: "https://davo.md", img: "/images/shot-davo" },
  { key: "radx", name: "RADX Cooling", domain: "radx.solutions", href: "https://radx.solutions", img: "/images/shot-radx" },
  { key: "interbus", name: "Inter-Bus", domain: "inter-bus.md", href: "https://inter-bus.md", img: "/images/shot-interbus" },
  { key: "eurogard", name: "Eurogard", domain: "eurogard.md", href: "https://eurogard.md", img: "/images/shot-eurogard" },
  { key: "infobac", name: "Infobac", domain: "infobac.md", href: "https://infobac.md", img: "/images/shot-infobac" },
] as const;

const shotSrcSet = (base: string) => `${base}-800.webp 800w, ${base}-1280.webp 1280w`;

const LOGOS: ReadonlyArray<{ n: string; h: number }> = [
  { n: "davo", h: 26 },
  { n: "glg", h: 46 },
  { n: "interbus", h: 30 },
  { n: "eurogard", h: 44 },
  { n: "radx", h: 30 },
  { n: "mobo", h: 32 },
  { n: "inauto", h: 34 },
  { n: "cmiea", h: 44 },
  { n: "respectauto", h: 30 },
  { n: "rizzaclassic", h: 36 },
  { n: "udc", h: 42 },
];

type ProjectKey = (typeof PROJECTS)[number]["key"];

type Copy = {
  nav: [string, string, string, string];
  avail: string;
  availShort: string;
  founder: string;
  online: string;
  h1a: string;
  words: string[];
  sub: string;
  ctaP: string;
  ctaS: string;
  heroCap: string;
  projLabel: string;
  logosLabel: string;
  projects: Record<ProjectKey, { desc: string; tags: string[] }>;
  servLabel: string;
  services: { name: string; desc: string }[];
  priceLabel: string;
  plans: { name: string; price: string; feats: string[] }[];
  priceNote: string;
  priceFrom: string;
  priceCta: string;
  proofLabel: string;
  proofLine: string;
  statCards: { v: string; l: string; s: string }[];
  contactLabel: string;
  contactTitle: string;
  contactSub: string;
  loc: string;
  rights: string;
  footTag: string;
  faqLabel: string;
  faq: { q: string; a: string }[];
  a11y: { prev: string; next: string; menu: string; lang: string };
};

const T: Record<Lang, Copy> = {
  ro: {
    nav: ["Proiecte", "Servicii", "Prețuri", "Contact"],
    avail: "Disponibili pentru proiecte noi",
    availShort: "Disponibili",
    founder: "Fondator",
    online: "Online",
    h1a: "Site-uri care aduc",
    words: ["clienți.", "vânzări.", "rezultate."],
    sub: "Studio din Chișinău. Site-uri, aplicații și SEO. Soluții digitale simple și rapide pentru afaceri din Moldova și Europa.",
    ctaP: "Cere o ofertă",
    ctaS: "Vezi proiectele",
    heroCap: "Davo.md · Transport de pasageri, rezervări online",
    projLabel: "Câteva din proiectele noastre",
    logosLabel: "Și alții cu care am lucrat",
    projects: {
      glg: { desc: "Nu doar site: aplicația școlii auto, cu 60 de instructori, operatori, secretari, profesori, contabili și examinatori.", tags: ["Aplicație", "Website"] },
      davo: { desc: "Transport de pasageri. Site, rezervări cu alegerea locului și SEO.", tags: ["Website", "Rezervări", "SEO"] },
      interbus: { desc: "Magazin de piese auto cu ERP: facturare, stoc, contabilitate.", tags: ["E-commerce", "ERP"] },
      eurogard: { desc: "Porți, garduri și automatizări. Site de prezentare care vinde constant.", tags: ["Website"] },
      radx: { desc: "Răcire industrială. Prima pagină pe Google, lead-uri săptămânal, fără reclame.", tags: ["Website", "SEO"] },
      mobo: { desc: "Bucătării și mobilier la comandă. Site cu calculator de preț online.", tags: ["Website", "Calculator de preț"] },
      inauto: { desc: "Parc auto din Chișinău. Site cu catalogul mașinilor, filtre de căutare și cereri de test drive.", tags: ["Website", "Catalog"] },
      infobac: { desc: "Platformă de cursuri pentru BAC-ul la informatică, cu simulări și certificări Certiport.", tags: ["Platformă", "Cursuri"] },
    },
    servLabel: "Servicii",
    services: [
      { name: "Website", desc: "Construit de la zero, rapid și optimizat pentru orice ecran." },
      { name: "Design", desc: "Minimalist, curat, gândit pentru brandul tău." },
      { name: "SEO în cod", desc: "Optimizare tehnică scrisă direct în cod: structură, viteză, date structurate, indexare." },
      { name: "Backlink-uri premium", desc: "Link-uri contextuale, indexate, din site-uri reale. De la 3$ per backlink." },
      { name: "Sisteme și aplicații", desc: "Soluții care scot hârtiile din firmă: programări, facturare, stoc, contabilitate. Preț la cerere." },
    ],
    priceLabel: "Prețuri",
    plans: [
      { name: "Starter", price: "€350", feats: ["O pagină, design inclus", "Optimizat pentru mobil", "SEO de bază în cod"] },
      { name: "Business", price: "€550", feats: ["Mai multe pagini", "Design personalizat", "SEO tehnic complet"] },
      { name: "Magazin", price: "€850", feats: ["Catalog și coș de cumpărături", "Plăți online", "Panou de administrare"] },
    ],
    priceNote: "+ 50 EUR per limbă extra. Backlink-uri premium de la 3$ per bucată. Sisteme personalizate și SEO lunar: preț la cerere.",
    priceFrom: "de la",
    priceCta: "Cere ofertă",
    proofLabel: "Rezultate",
    proofLine: "SEO făcut de noi pentru Davo.md, măsurat în Ahrefs.",
    statCards: [
      { v: "50", l: "Domain Rating", s: "din 100, măsurat în Ahrefs" },
      { v: "2.6K", l: "Backlink-uri", s: "13% dofollow" },
      { v: "348", l: "Domenii de referință", s: "98% dofollow" },
      { v: "Pag. 1", l: "Poziție în Google · RADX", s: "fără reclame plătite" },
      { v: "60+", l: "Oameni în aplicația GLG", s: "instructori, operatori, contabili" },
      { v: "24h", l: "Timp de răspuns", s: "la orice mesaj" },
    ],
    contactLabel: "Contact",
    contactTitle: "Hai să vorbim.",
    contactSub: "Răspundem în cel mult 24 de ore.",
    loc: "Chișinău, Moldova",
    rights: "Toate drepturile rezervate.",
    footTag: "Site-uri, aplicații și SEO, scrise în cod, din Chișinău.",
    faqLabel: "Întrebări frecvente",
    faq: [
      { q: "Cât costă un site?", a: "De la 350 EUR pentru o pagină, 550 EUR pentru un site de prezentare și 850 EUR pentru un magazin online. Prețul final îl primești fix, înainte să începem." },
      { q: "Cât durează?", a: "Un site de prezentare iese în două săptămâni. Un magazin online sau o platformă cu conturi, în trei sau patru." },
      { q: "Lucrați și în afara Moldovei?", a: "Da. Lucrăm din Chișinău cu clienți din Moldova, România și restul Europei, în șase limbi." },
    ],
    a11y: { prev: "Înapoi", next: "Înainte", menu: "Meniu", lang: "Limba" },
  },
  en: {
    nav: ["Projects", "Services", "Pricing", "Contact"],
    avail: "Available for new projects",
    availShort: "Available",
    founder: "Founder",
    online: "Online",
    h1a: "Websites that bring",
    words: ["clients.", "sales.", "results."],
    sub: "Studio from Chisinau. Websites, apps and SEO. Simple, fast digital solutions for businesses in Moldova and Europe.",
    ctaP: "Request a quote",
    ctaS: "See the projects",
    heroCap: "Davo.md · Passenger transport, online booking",
    projLabel: "A few of our projects",
    logosLabel: "And others we worked with",
    projects: {
      glg: { desc: "Not just a website: the driving school's app, with 60 instructors, operators, secretaries, teachers, accountants and examiners.", tags: ["App", "Website"] },
      davo: { desc: "Passenger transport. Website, booking with seat selection and SEO.", tags: ["Website", "Booking", "SEO"] },
      interbus: { desc: "Auto parts store with ERP: invoicing, stock, accounting.", tags: ["E-commerce", "ERP"] },
      eurogard: { desc: "Gates, fences and automation. A presentation site that sells steadily.", tags: ["Website"] },
      radx: { desc: "Industrial cooling. First page on Google, weekly leads, no ads.", tags: ["Website", "SEO"] },
      mobo: { desc: "Custom kitchens and furniture. Website with an online price calculator.", tags: ["Website", "Price calculator"] },
      inauto: { desc: "Car dealership in Chisinau. Website with the car catalogue, search filters and test drive requests.", tags: ["Website", "Catalogue"] },
      infobac: { desc: "Course platform for the informatics BAC exam, with simulations and Certiport certifications.", tags: ["Platform", "Courses"] },
    },
    servLabel: "Services",
    services: [
      { name: "Website", desc: "Built from scratch, fast and optimized for every screen." },
      { name: "Design", desc: "Minimal, clean, shaped around your brand." },
      { name: "SEO in the code", desc: "Technical SEO written directly in the code: structure, speed, structured data, indexing." },
      { name: "Premium backlinks", desc: "Contextual, indexed links from real websites. From $3 per backlink." },
      { name: "Systems and apps", desc: "Solutions that remove the paperwork: scheduling, invoicing, stock, accounting. Price on request." },
    ],
    priceLabel: "Pricing",
    plans: [
      { name: "Starter", price: "€350", feats: ["One page, design included", "Mobile optimized", "Basic SEO in the code"] },
      { name: "Business", price: "€550", feats: ["Multiple pages", "Custom design", "Full technical SEO"] },
      { name: "Store", price: "€850", feats: ["Catalog and cart", "Online payments", "Admin panel"] },
    ],
    priceNote: "+ 50 EUR per extra language. Premium backlinks from $3 each. Custom systems and monthly SEO: price on request.",
    priceFrom: "starting from",
    priceCta: "Request a quote",
    proofLabel: "Results",
    proofLine: "Our SEO for Davo.md, measured in Ahrefs.",
    statCards: [
      { v: "50", l: "Domain Rating", s: "out of 100, measured in Ahrefs" },
      { v: "2.6K", l: "Backlinks", s: "13% dofollow" },
      { v: "348", l: "Referring domains", s: "98% dofollow" },
      { v: "Page 1", l: "Google position · RADX", s: "no paid ads" },
      { v: "60+", l: "People in the GLG app", s: "instructors, operators, accountants" },
      { v: "24h", l: "Response time", s: "to any message" },
    ],
    contactLabel: "Contact",
    contactTitle: "Let's talk.",
    contactSub: "We reply within 24 hours.",
    loc: "Chisinau, Moldova",
    rights: "All rights reserved.",
    footTag: "Websites, apps and SEO, written in code, from Chisinau.",
    faqLabel: "FAQ",
    faq: [
      { q: "How much does a website cost?", a: "From 350 EUR for one page, 550 EUR for a full presentation site and 850 EUR for an online shop. You get the final price fixed, before we start." },
      { q: "How long does it take?", a: "A presentation site takes two weeks. An online shop or a platform with accounts, three or four." },
      { q: "Do you work outside Moldova?", a: "Yes. We work from Chisinau with clients in Moldova, Romania and the rest of Europe, in six languages." },
    ],
    a11y: { prev: "Previous", next: "Next", menu: "Menu", lang: "Language" },
  },
  de: {
    nav: ["Projekte", "Leistungen", "Preise", "Kontakt"],
    avail: "Verfugbar fur neue Projekte",
    availShort: "Verfugbar",
    founder: "Grunder",
    online: "Online",
    h1a: "Websites bringen",
    words: ["Kunden.", "Umsatz.", "Ergebnisse."],
    sub: "Studio aus Chisinau. Websites, Apps und SEO. Einfache, schnelle digitale Losungen fur Firmen in Moldau und Europa.",
    ctaP: "Angebot anfragen",
    ctaS: "Projekte ansehen",
    heroCap: "Davo.md · Personentransport, Online-Buchung",
    projLabel: "Einige unserer Projekte",
    logosLabel: "Und weitere Kunden",
    projects: {
      glg: { desc: "Nicht nur eine Website: die App der Fahrschule, mit 60 Fahrlehrern, Operatoren, Sekretariat, Lehrern, Buchhaltung und Prufern.", tags: ["App", "Website"] },
      davo: { desc: "Personentransport. Website, Buchung mit Sitzplatzwahl und SEO.", tags: ["Website", "Buchung", "SEO"] },
      interbus: { desc: "Autoteile-Shop mit ERP: Rechnungen, Lager, Buchhaltung.", tags: ["E-Commerce", "ERP"] },
      eurogard: { desc: "Tore, Zaune und Automatisierung. Eine Website, die konstant verkauft.", tags: ["Website"] },
      radx: { desc: "Industrielle Kuhlung. Seite 1 bei Google, Leads jede Woche, ohne Werbung.", tags: ["Website", "SEO"] },
      mobo: { desc: "Kuchen und Mobel nach Mass. Website mit Online-Preisrechner.", tags: ["Website", "Preisrechner"] },
      inauto: { desc: "Autohaus in Chisinau. Website mit Fahrzeugkatalog, Suchfiltern und Anfragen fur Probefahrten.", tags: ["Website", "Katalog"] },
      infobac: { desc: "Kursplattform fur das Informatik-Abitur, mit Simulationen und Certiport-Zertifikaten.", tags: ["Plattform", "Kurse"] },
    },
    servLabel: "Leistungen",
    services: [
      { name: "Website", desc: "Von Grund auf gebaut, schnell, fur jeden Bildschirm optimiert." },
      { name: "Design", desc: "Minimalistisch, sauber, auf deine Marke abgestimmt." },
      { name: "SEO im Code", desc: "Technisches SEO direkt im Code: Struktur, Tempo, strukturierte Daten, Indexierung." },
      { name: "Premium-Backlinks", desc: "Kontextuelle, indexierte Links von echten Websites. Ab 3$ pro Backlink." },
      { name: "Systeme und Apps", desc: "Losungen gegen den Papierkram: Termine, Rechnungen, Lager, Buchhaltung. Preis auf Anfrage." },
    ],
    priceLabel: "Preise",
    plans: [
      { name: "Starter", price: "€350", feats: ["Eine Seite, Design inklusive", "Mobil optimiert", "Basis-SEO im Code"] },
      { name: "Business", price: "€550", feats: ["Mehrere Seiten", "Individuelles Design", "Komplettes technisches SEO"] },
      { name: "Shop", price: "€850", feats: ["Katalog und Warenkorb", "Online-Zahlungen", "Admin-Panel"] },
    ],
    priceNote: "+ 50 EUR pro zusatzliche Sprache. Premium-Backlinks ab 3$ pro Stuck. Individuelle Systeme und monatliches SEO: Preis auf Anfrage.",
    priceFrom: "ab",
    priceCta: "Angebot anfragen",
    proofLabel: "Ergebnisse",
    proofLine: "SEO von uns fur Davo.md, gemessen in Ahrefs.",
    statCards: [
      { v: "50", l: "Domain Rating", s: "von 100, gemessen in Ahrefs" },
      { v: "2.6K", l: "Backlinks", s: "13% dofollow" },
      { v: "348", l: "Verweisende Domains", s: "98% dofollow" },
      { v: "Seite 1", l: "Google-Position · RADX", s: "ohne bezahlte Werbung" },
      { v: "60+", l: "Nutzer in der GLG-App", s: "Fahrlehrer, Operatoren, Buchhaltung" },
      { v: "24h", l: "Antwortzeit", s: "auf jede Nachricht" },
    ],
    contactLabel: "Kontakt",
    contactTitle: "Reden wir.",
    contactSub: "Antwort innerhalb von 24 Stunden.",
    loc: "Chisinau, Moldau",
    rights: "Alle Rechte vorbehalten.",
    footTag: "Websites, Apps und SEO, im Code geschrieben, aus Chisinau.",
    faqLabel: "Haufige Fragen",
    faq: [
      { q: "Was kostet eine Website?", a: "Ab 350 EUR fur eine Seite, 550 EUR fur eine komplette Website und 850 EUR fur einen Onlineshop. Den Endpreis bekommst du fix, bevor wir starten." },
      { q: "Wie lange dauert es?", a: "Eine Prasentationswebsite in zwei Wochen. Ein Onlineshop oder eine Plattform mit Konten, in drei oder vier." },
      { q: "Arbeitet ihr auch ausserhalb der Republik Moldau?", a: "Ja. Wir arbeiten aus Chisinau mit Kunden in der Republik Moldau, Rumanien und dem Rest Europas, in sechs Sprachen." },
    ],
    a11y: { prev: "Zuruck", next: "Weiter", menu: "Menu", lang: "Sprache" },
  },
  fr: {
    nav: ["Projets", "Services", "Tarifs", "Contact"],
    avail: "Disponibles pour de nouveaux projets",
    availShort: "Disponibles",
    founder: "Fondateur",
    online: "En ligne",
    h1a: "Des sites qui generent",
    words: ["des clients.", "des ventes.", "des resultats."],
    sub: "Studio a Chisinau. Sites, applications et SEO. Des solutions digitales simples et rapides pour les entreprises.",
    ctaP: "Demander un devis",
    ctaS: "Voir les projets",
    heroCap: "Davo.md · Transport de passagers, reservation en ligne",
    projLabel: "Quelques-uns de nos projets",
    logosLabel: "Et d'autres clients",
    projects: {
      glg: { desc: "Pas qu'un site: l'application de l'auto-ecole, avec 60 instructeurs, operateurs, secretaires, professeurs, comptables et examinateurs.", tags: ["App", "Site"] },
      davo: { desc: "Transport de passagers. Site, reservation avec choix du siege et SEO.", tags: ["Site", "Reservation", "SEO"] },
      interbus: { desc: "Boutique de pieces auto avec ERP: factures, stock, comptabilite.", tags: ["E-commerce", "ERP"] },
      eurogard: { desc: "Portails, clotures et automatisation. Un site vitrine qui vend constamment.", tags: ["Site"] },
      radx: { desc: "Refroidissement industriel. Premiere page Google, des leads chaque semaine, sans publicite.", tags: ["Site", "SEO"] },
      mobo: { desc: "Cuisines et meubles sur mesure. Site avec calculateur de prix en ligne.", tags: ["Site", "Calculateur de prix"] },
      inauto: { desc: "Parc automobile a Chisinau. Site avec le catalogue des voitures, filtres de recherche et demandes d essai.", tags: ["Site", "Catalogue"] },
      infobac: { desc: "Plateforme de cours pour le bac informatique, avec simulations et certifications Certiport.", tags: ["Plateforme", "Cours"] },
    },
    servLabel: "Services",
    services: [
      { name: "Site web", desc: "Construit de zero, rapide, optimise pour tous les ecrans." },
      { name: "Design", desc: "Minimaliste, propre, pense pour votre marque." },
      { name: "SEO dans le code", desc: "SEO technique ecrit directement dans le code: structure, vitesse, donnees structurees, indexation." },
      { name: "Backlinks premium", desc: "Liens contextuels, indexes, depuis de vrais sites. A partir de 3$ par backlink." },
      { name: "Systemes et applications", desc: "Des solutions qui suppriment la paperasse: rendez-vous, factures, stock, comptabilite. Prix sur demande." },
    ],
    priceLabel: "Tarifs",
    plans: [
      { name: "Starter", price: "€350", feats: ["Une page, design inclus", "Optimise mobile", "SEO de base dans le code"] },
      { name: "Business", price: "€550", feats: ["Plusieurs pages", "Design personnalise", "SEO technique complet"] },
      { name: "Boutique", price: "€850", feats: ["Catalogue et panier", "Paiements en ligne", "Panneau d'administration"] },
    ],
    priceNote: "+ 50 EUR par langue supplementaire. Backlinks premium a partir de 3$ piece. Systemes sur mesure et SEO mensuel: prix sur demande.",
    priceFrom: "a partir de",
    priceCta: "Demander un devis",
    proofLabel: "Resultats",
    proofLine: "SEO realise par nous pour Davo.md, mesure dans Ahrefs.",
    statCards: [
      { v: "50", l: "Domain Rating", s: "sur 100, mesure dans Ahrefs" },
      { v: "2.6K", l: "Backlinks", s: "13% dofollow" },
      { v: "348", l: "Domaines referents", s: "98% dofollow" },
      { v: "Page 1", l: "Position Google · RADX", s: "sans publicite payante" },
      { v: "60+", l: "Personnes dans l'app GLG", s: "instructeurs, operateurs, comptables" },
      { v: "24h", l: "Temps de reponse", s: "a chaque message" },
    ],
    contactLabel: "Contact",
    contactTitle: "Parlons-en.",
    contactSub: "Reponse sous 24 heures.",
    loc: "Chisinau, Moldavie",
    rights: "Tous droits reserves.",
    footTag: "Sites, applications et SEO, ecrits en code, depuis Chisinau.",
    faqLabel: "Questions frequentes",
    faq: [
      { q: "Combien coute un site?", a: "A partir de 350 EUR pour une page, 550 EUR pour un site complet et 850 EUR pour une boutique en ligne. Le prix final est fixe avant de commencer." },
      { q: "Combien de temps faut-il?", a: "Un site de presentation sort en deux semaines. Une boutique en ligne ou une plateforme avec comptes, en trois ou quatre." },
      { q: "Travaillez-vous hors de Moldavie?", a: "Oui. Nous travaillons depuis Chisinau avec des clients en Moldavie, en Roumanie et dans le reste de l Europe, en six langues." },
    ],
    a11y: { prev: "Precedent", next: "Suivant", menu: "Menu", lang: "Langue" },
  },
  es: {
    nav: ["Proyectos", "Servicios", "Precios", "Contacto"],
    avail: "Disponibles para nuevos proyectos",
    availShort: "Disponibles",
    founder: "Fundador",
    online: "En linea",
    h1a: "Webs que generan",
    words: ["clientes.", "ventas.", "confianza."],
    sub: "Estudio en Chisinau. Webs, aplicaciones y SEO. Soluciones digitales simples y rapidas para negocios.",
    ctaP: "Pedir presupuesto",
    ctaS: "Ver proyectos",
    heroCap: "Davo.md · Transporte de pasajeros, reservas online",
    projLabel: "Algunos de nuestros proyectos",
    logosLabel: "Y otros clientes",
    projects: {
      glg: { desc: "No solo una web: la aplicacion de la autoescuela, con 60 instructores, operadores, secretarias, profesores, contables y examinadores.", tags: ["App", "Web"] },
      davo: { desc: "Transporte de pasajeros. Web, reservas con eleccion de asiento y SEO.", tags: ["Web", "Reservas", "SEO"] },
      interbus: { desc: "Tienda de piezas de auto con ERP: facturas, stock, contabilidad.", tags: ["E-commerce", "ERP"] },
      eurogard: { desc: "Puertas, vallas y automatizacion. Una web de presentacion que vende constantemente.", tags: ["Web"] },
      radx: { desc: "Refrigeracion industrial. Primera pagina en Google, leads cada semana, sin publicidad.", tags: ["Web", "SEO"] },
      mobo: { desc: "Cocinas y muebles a medida. Web con calculadora de precios online.", tags: ["Web", "Calculadora de precios"] },
      inauto: { desc: "Concesionario en Chisinau. Web con el catalogo de coches, filtros de busqueda y solicitudes de prueba.", tags: ["Web", "Catalogo"] },
      infobac: { desc: "Plataforma de cursos para el examen de informatica, con simulaciones y certificaciones Certiport.", tags: ["Plataforma", "Cursos"] },
    },
    servLabel: "Servicios",
    services: [
      { name: "Web", desc: "Construida desde cero, rapida y optimizada para cualquier pantalla." },
      { name: "Diseno", desc: "Minimalista, limpio, pensado para tu marca." },
      { name: "SEO en el codigo", desc: "SEO tecnico escrito directamente en el codigo: estructura, velocidad, datos estructurados, indexacion." },
      { name: "Backlinks premium", desc: "Enlaces contextuales, indexados, de webs reales. Desde 3$ por backlink." },
      { name: "Sistemas y aplicaciones", desc: "Soluciones que eliminan el papeleo: citas, facturas, stock, contabilidad. Precio a consultar." },
    ],
    priceLabel: "Precios",
    plans: [
      { name: "Starter", price: "€350", feats: ["Una pagina, diseno incluido", "Optimizada para movil", "SEO basico en el codigo"] },
      { name: "Business", price: "€550", feats: ["Varias paginas", "Diseno personalizado", "SEO tecnico completo"] },
      { name: "Tienda", price: "€850", feats: ["Catalogo y carrito", "Pagos online", "Panel de administracion"] },
    ],
    priceNote: "+ 50 EUR por idioma extra. Backlinks premium desde 3$ cada uno. Sistemas a medida y SEO mensual: precio a consultar.",
    priceFrom: "desde",
    priceCta: "Pedir presupuesto",
    proofLabel: "Resultados",
    proofLine: "SEO hecho por nosotros para Davo.md, medido en Ahrefs.",
    statCards: [
      { v: "50", l: "Domain Rating", s: "de 100, medido en Ahrefs" },
      { v: "2.6K", l: "Backlinks", s: "13% dofollow" },
      { v: "348", l: "Dominios de referencia", s: "98% dofollow" },
      { v: "Pag. 1", l: "Posicion en Google · RADX", s: "sin anuncios pagados" },
      { v: "60+", l: "Personas en la app GLG", s: "instructores, operadores, contables" },
      { v: "24h", l: "Tiempo de respuesta", s: "a cualquier mensaje" },
    ],
    contactLabel: "Contacto",
    contactTitle: "Hablemos.",
    contactSub: "Respondemos en 24 horas.",
    loc: "Chisinau, Moldavia",
    rights: "Todos los derechos reservados.",
    footTag: "Webs, aplicaciones y SEO, escritos en codigo, desde Chisinau.",
    faqLabel: "Preguntas frecuentes",
    faq: [
      { q: "Cuanto cuesta una web?", a: "Desde 350 EUR por una pagina, 550 EUR por una web completa y 850 EUR por una tienda online. El precio final es cerrado, antes de empezar." },
      { q: "Cuanto tarda?", a: "Una web de presentacion sale en dos semanas. Una tienda online o una plataforma con cuentas, en tres o cuatro." },
      { q: "Trabajan fuera de Moldavia?", a: "Si. Trabajamos desde Chisinau con clientes de Moldavia, Rumania y el resto de Europa, en seis idiomas." },
    ],
    a11y: { prev: "Anterior", next: "Siguiente", menu: "Menu", lang: "Idioma" },
  },
  ru: {
    nav: ["Проекты", "Услуги", "Цены", "Контакты"],
    avail: "Открыты для новых проектов",
    availShort: "Открыты",
    founder: "Основатель",
    online: "Онлайн",
    h1a: "Сайты, которые приносят",
    words: ["клиентов.", "продажи.", "результат."],
    sub: "Студия из Кишинёва. Сайты, приложения и SEO. Простые и быстрые цифровые решения для бизнеса в Молдове и Европе.",
    ctaP: "Запросить предложение",
    ctaS: "Смотреть проекты",
    heroCap: "Davo.md · Пассажирские перевозки, онлайн-бронирование",
    projLabel: "Несколько наших проектов",
    logosLabel: "И другие клиенты",
    projects: {
      glg: { desc: "Не просто сайт: приложение автошколы, 60 инструкторов, операторы, секретари, преподаватели, бухгалтеры и экзаменаторы.", tags: ["Приложение", "Сайт"] },
      davo: { desc: "Пассажирские перевозки. Сайт, бронирование с выбором места и SEO.", tags: ["Сайт", "Бронирование", "SEO"] },
      interbus: { desc: "Магазин автозапчастей с ERP: счета, склад, бухгалтерия.", tags: ["E-commerce", "ERP"] },
      eurogard: { desc: "Ворота, заборы и автоматика. Сайт-визитка, который стабильно продаёт.", tags: ["Сайт"] },
      radx: { desc: "Промышленное охлаждение. Первая страница Google, заявки каждую неделю, без рекламы.", tags: ["Сайт", "SEO"] },
      mobo: { desc: "Кухни и мебель на заказ. Сайт с онлайн-калькулятором цены.", tags: ["Сайт", "Калькулятор цены"] },
      inauto: { desc: "Автопарк в Кишиневе. Сайт с каталогом машин, фильтрами поиска и заявками на тест-драйв.", tags: ["Сайт", "Каталог"] },
      infobac: { desc: "Платформа курсов для экзамена по информатике, с симуляциями и сертификациями Certiport.", tags: ["Платформа", "Курсы"] },
    },
    servLabel: "Услуги",
    services: [
      { name: "Сайт", desc: "Собран с нуля, быстрый, оптимизирован под любой экран." },
      { name: "Дизайн", desc: "Минималистичный, чистый, под ваш бренд." },
      { name: "SEO в коде", desc: "Техническая оптимизация прямо в коде: структура, скорость, структурированные данные, индексация." },
      { name: "Премиум-беклинки", desc: "Контекстные, индексируемые ссылки с реальных сайтов. От 3$ за беклинк." },
      { name: "Системы и приложения", desc: "Решения, которые убирают бумажную работу: записи, счета, склад, бухгалтерия. Цена по запросу." },
    ],
    priceLabel: "Цены",
    plans: [
      { name: "Starter", price: "€350", feats: ["Одна страница, дизайн включён", "Оптимизация под мобильные", "Базовое SEO в коде"] },
      { name: "Business", price: "€550", feats: ["Несколько страниц", "Индивидуальный дизайн", "Полное техническое SEO"] },
      { name: "Магазин", price: "€850", feats: ["Каталог и корзина", "Онлайн-оплата", "Панель администратора"] },
    ],
    priceNote: "+ 50 EUR за дополнительный язык. Премиум-беклинки от 3$ за штуку. Индивидуальные системы и ежемесячное SEO: цена по запросу.",
    priceFrom: "от",
    priceCta: "Запросить предложение",
    proofLabel: "Результаты",
    proofLine: "Наше SEO для Davo.md, измерено в Ahrefs.",
    statCards: [
      { v: "50", l: "Domain Rating", s: "из 100, измерено в Ahrefs" },
      { v: "2.6K", l: "Беклинки", s: "13% dofollow" },
      { v: "348", l: "Ссылающиеся домены", s: "98% dofollow" },
      { v: "Стр. 1", l: "Позиция в Google · RADX", s: "без платной рекламы" },
      { v: "60+", l: "Люди в приложении GLG", s: "инструкторы, операторы, бухгалтеры" },
      { v: "24ч", l: "Время ответа", s: "на любое сообщение" },
    ],
    contactLabel: "Контакты",
    contactTitle: "Давайте поговорим.",
    contactSub: "Отвечаем в течение 24 часов.",
    loc: "Кишинёв, Молдова",
    rights: "Все права защищены.",
    footTag: "Сайты, приложения и SEO, написанные в коде, из Кишинева.",
    faqLabel: "Частые вопросы",
    faq: [
      { q: "Сколько стоит сайт?", a: "От 350 EUR за одну страницу, 550 EUR за полноценный сайт и 850 EUR за интернет-магазин. Итоговую цену вы получаете фиксированной, до старта." },
      { q: "Сколько занимает работа?", a: "Сайт-презентация выходит за две недели. Интернет-магазин или платформа с аккаунтами, за три или четыре." },
      { q: "Работаете ли вы за пределами Молдовы?", a: "Да. Работаем из Кишинева с клиентами из Молдовы, Румынии и остальной Европы, на шести языках." },
    ],
    a11y: { prev: "Назад", next: "Вперёд", menu: "Меню", lang: "Язык" },
  },
};

const SECTION_IDS = ["proiecte", "servicii", "preturi", "contact"];
const EMAIL = "contact@landings.md";
const WHATSAPP = "https://wa.me/37368327082";
const TELEGRAM = "https://t.me/damiqqn";
const INSTAGRAM = "https://www.instagram.com/landings.md";

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* slot-machine word cycler                                            */
/* ------------------------------------------------------------------ */

function Slot({ words }: { words: string[] }) {
  const track = useRef<HTMLSpanElement>(null);
  const key = words.join("|");

  /* the track is driven imperatively: every step sets an absolute position, so a
     throttled background tab or a missed frame can never leave it stuck or blurry */
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const STEP = 1.6; /* em, must match .slot-word height */
    const HOLD = 2600;
    const DUR = 800; /* must match .slot-track transition */
    let i = 0;
    let t = 0;
    const jump = (y: number) => {
      el.style.transition = "none";
      el.style.transform = `translateY(${y}em)`;
      void el.offsetHeight;
      el.style.transition = "";
    };
    jump(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const go = () => {
      i += 1;
      el.style.transform = `translateY(${-i * STEP}em)`;
      if (i === words.length) {
        /* rolled onto the duplicate first word: swap to the real one, unseen */
        t = window.setTimeout(() => {
          jump(0);
          i = 0;
          t = window.setTimeout(go, HOLD - DUR - 60);
        }, DUR + 60);
      } else {
        t = window.setTimeout(go, HOLD);
      }
    };
    t = window.setTimeout(go, HOLD);
    return () => clearTimeout(t);
  }, [key, words.length]);

  const list = [...words, words[0]];

  return (
    <span className="slot">
      <span className="slot-track" ref={track}>
        {list.map((w, k) => (
          <span className="slot-word" key={k} aria-hidden={k > 0}>
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* count-up stat                                                       */
/* ------------------------------------------------------------------ */

function StatValue({ target, decimals = 0, suffix = "" }: { target: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (v: number) => v.toFixed(decimals) + suffix;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = fmt(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1100);
          el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, decimals, suffix]);

  return <span ref={ref}>{target.toFixed(decimals) + suffix}</span>;
}

/* ------------------------------------------------------------------ */
/* email menu                                                          */
/* ------------------------------------------------------------------ */

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MailOpenIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 10.2L12 4l9 6.2V19a1.8 1.8 0 01-1.8 1.8H4.8A1.8 1.8 0 013 19v-8.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3 10.4l9 5.6 9-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="9" y="9" width="11.5" height="11.5" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M15 5.6A2.1 2.1 0 0012.9 3.5H5.6A2.1 2.1 0 003.5 5.6v7.3A2.1 2.1 0 005.6 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4.5 12.5l5 5 10-11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* one click on any email button opens Gmail, Outlook, or copies the address */
function EmailMenu({ subject, triggerClass, children }: { subject?: string; triggerClass: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const su = subject ? encodeURIComponent(subject) : "";
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}${subject ? `&su=${su}` : ""}`;
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}${subject ? `&subject=${su}` : ""}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}${subject ? `?subject=${su}` : ""}`;
      setOpen(false);
    }
  };

  return (
    <div className="mailwrap" ref={wrap}>
      <button type="button" className={triggerClass} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {children}
      </button>
      {open && (
        <div className="mailmenu" role="menu">
          <a role="menuitem" href={gmail} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            <MailIcon />
            Gmail
          </a>
          <a role="menuitem" href={outlook} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            <MailOpenIcon />
            Outlook
          </a>
          <span className="mailmenu-sep" aria-hidden="true" />
          <button type="button" role="menuitem" onClick={copy}>
            {copied ? <CheckIcon /> : <CopyIcon />}
            {EMAIL}
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* projects carousel                                                   */
/* ------------------------------------------------------------------ */

function Carousel({ t, fx, order }: { t: Copy; fx: boolean; order?: readonly ProjectKey[] }) {
  const items = order ? order.map((k) => PROJECTS.find((p) => p.key === k)!).filter(Boolean) : PROJECTS;
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const cardStep = () => {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>(".car-card");
    return card ? card.offsetWidth + 22 : 480;
  };

  const step = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startL = 0;
    let lastX = 0;
    let lastT = 0;
    let vel = 0;

    const pd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startL = el.scrollLeft;
      lastX = e.clientX;
      lastT = performance.now();
      vel = 0;
    };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      /* capture only once a real drag starts, so plain clicks keep their
         native target (capturing on pointerdown retargets the click to the
         track and kills the card links) */
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.classList.add("dragging");
        el.setPointerCapture(e.pointerId);
      }
      if (!moved) return;
      el.scrollLeft = startL - dx;
      const now = performance.now();
      vel = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
    };
    const pu = () => {
      if (!down) return;
      down = false;
      el.classList.remove("dragging");
      if (moved) {
        const w = cardStep();
        const projected = el.scrollLeft - vel * 260;
        const idx = Math.max(0, Math.round(projected / w));
        el.scrollTo({ left: idx * w, behavior: "smooth" });
      }
      if (moved) {
        const kill = (ev: MouseEvent) => {
          ev.preventDefault();
          ev.stopPropagation();
          el.removeEventListener("click", kill, true);
        };
        el.addEventListener("click", kill, true);
        setTimeout(() => el.removeEventListener("click", kill, true), 80);
      }
    };

    el.addEventListener("pointerdown", pd);
    el.addEventListener("pointermove", pm);
    el.addEventListener("pointerup", pu);
    el.addEventListener("pointercancel", pu);
    return () => {
      el.removeEventListener("pointerdown", pd);
      el.removeEventListener("pointermove", pm);
      el.removeEventListener("pointerup", pu);
      el.removeEventListener("pointercancel", pu);
    };
  }, []);

  return (
    <div className="car">
      <div className="container sec-head rv">
        <div>
          <div className="rl">
            <h2 className="rl-i lbl">
              {fx && <ThinkingOrb state="shaping" size={20} theme="light" className="orb-lbl" aria-label="" />}
              {t.projLabel}
            </h2>
          </div>
        </div>
        <div className="car-nav fu" style={d("0.15s")}>
          <button className="car-btn" onClick={() => step(-1)} disabled={atStart} aria-label={t.a11y.prev}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="car-btn" onClick={() => step(1)} disabled={atEnd} aria-label={t.a11y.next}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="car-track" ref={trackRef} onScroll={measure}>
        {items.map((p, i) => {
          const c = t.projects[p.key];
          return (
            <a className="car-card rv" key={p.key} href={p.href} target="_blank" rel="noopener noreferrer">
              <div className="car-media fu" style={d(`${0.05 + (i % 3) * 0.08}s`)}>
                <img
                  src={`${p.img}-800.webp`}
                  srcSet={shotSrcSet(p.img)}
                  sizes="(max-width: 860px) 72vw, min(30vw, 400px)"
                  alt={`${p.name}, ${c.tags.join(", ")}`}
                  width={1000}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
              <div className="car-meta fu" style={d("0.15s")}>
                <span className="car-name">{p.name}</span>
                <span className="car-url">{p.domain} &#8599;</span>
              </div>
              <p className="car-desc fu" style={d("0.2s")}>
                {c.desc}
              </p>
              <div className="car-tags fu" style={d("0.25s")}>
                {c.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>
      <div className="car-progress">
        <i ref={barRef} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* keyword page sections                                               */
/* ------------------------------------------------------------------ */

function SeoIntro({ seo, fx }: { seo: SeoPage; fx: boolean }) {
  return (
    <section className="section" id="despre">
      <div className="container">
        <div className="rv">
          <div className="rl">
            <h2 className="rl-i lbl">
              {fx && <ThinkingOrb state="searching" size={20} theme="light" className="orb-lbl" aria-label="" />}
              {seo.introLabel}
            </h2>
          </div>
        </div>
        <div className="intro rv">
          <h3 className="intro-title">
            <span className="rl">
              <span className="rl-i">{seo.introTitle}</span>
            </span>
          </h3>
          <div className="intro-body fu" style={d("0.12s")}>
            {seo.introParas.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
        <div className="intro-points rv">
          {seo.introPoints.map((pt, i) => (
            <div className="intro-point fu" style={d(`${i * 0.07}s`)} key={pt.t}>
              <h4>{pt.t}</h4>
              <p>{pt.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoCases({ seo, fx }: { seo: SeoPage; fx: boolean }) {
  return (
    <section className="section" id="cazuri">
      <div className="container">
        <div className="rv">
          <div className="rl">
            <h2 className="rl-i lbl">
              {fx && <ThinkingOrb state="solving" size={20} theme="light" className="orb-lbl" aria-label="" />}
              {seo.casesLabel}
            </h2>
          </div>
          <p className="proof-line fu" style={d("0.1s")}>
            {seo.casesLine}
          </p>
        </div>
        <div className="case-list">
          {seo.cases.map((c) => (
            <article className="case rv" key={c.key}>
              <a className="case-shot fu" href={c.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={`/images/shot-${c.key}-800.webp`}
                  alt={`${c.name}, ${c.line}`}
                  width={800}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="case-body">
                <h3 className="case-name">
                  <span className="rl">
                    <span className="rl-i">{c.name}</span>
                  </span>
                </h3>
                <p className="case-line fu" style={d("0.1s")}>
                  {c.line}
                </p>
                <p className="case-text fu" style={d("0.16s")}>
                  {c.body}
                </p>
                <div className="case-stats fu" style={d("0.22s")}>
                  {c.stats.map((st) => (
                    <div className="case-stat" key={st.l}>
                      <span className="case-stat-v">{st.v}</span>
                      <span className="case-stat-l">{st.l}</span>
                    </div>
                  ))}
                </div>
                <a className="case-link fu" style={d("0.28s")} href={c.href} target="_blank" rel="noopener noreferrer">
                  {c.domain} &#8599;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoFaq({ seo, fx }: { seo: SeoPage; fx: boolean }) {
  return (
    <section className="section" id="intrebari">
      <div className="container">
        <div className="rv">
          <div className="rl">
            <h2 className="rl-i lbl">
              {fx && <ThinkingOrb state="weaving" size={20} theme="light" className="orb-lbl" aria-label="" />}
              {seo.faqLabel}
            </h2>
          </div>
        </div>
        <div className="faq rv">
          {seo.faq.map((f, i) => (
            <details className="faq-item fu" style={d(`${i * 0.05}s`)} key={f.q}>
              <summary>
                <h3>{f.q}</h3>
                <span className="faq-mark" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoRelated({ seo }: { seo: SeoPage }) {
  if (!seo.related.length) return null;
  return (
    <section className="section" id="servicii-legate">
      <div className="container rv">
        <p className="rel-label fu">Alte servicii</p>
        <div className="rel-links fu" style={d("0.08s")}>
          {seo.related.map((r) => {
            const page = SEO_INDEX[r];
            if (!page) return null;
            return (
              <a className="rel-link" href={`/${r}`} key={r}>
                {page}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export default function SiteShell({ seo }: { seo?: SeoPage }) {
  const [lang, setLang] = useState<Lang>("ro");
  const [fx, setFx] = useState(false);
  const [fxHeavy, setFxHeavy] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const base = T[seo ? "ro" : lang];
  const t: Copy = seo
    ? {
        ...base,
        h1a: seo.h1a,
        words: seo.words,
        sub: seo.sub,
        servLabel: seo.servLabel,
        services: seo.services,
        priceNote: seo.priceNote,
        proofLine: seo.proofLine,
        contactTitle: seo.contactTitle,
        contactSub: seo.contactSub,
      }
    : base;

  useEffect(() => {
    try {
      const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setFx(!rm);
      const c = document.createElement("canvas");
      const gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
      const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      setFxHeavy(!rm && gl && desktop);
    } catch {
      setFxHeavy(false);
    }
  }, []);

  useEffect(() => {
    if (seo) return;
    try {
      const saved = window.localStorage.getItem("lang");
      if (saved && (LANGS as readonly string[]).includes(saved)) {
        setLang(saved as Lang);
        return;
      }
    } catch {
      /* private mode, fall through to the browser languages */
    }
    const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const p of prefs) {
      const code = (p || "").toLowerCase().slice(0, 2);
      if ((LANGS as readonly string[]).includes(code)) {
        setLang(code as Lang);
        return;
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.115 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  const goto = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -60, duration: 1.05 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main id="top">
        <header className="top-bar">
          <div className="container">
            <div className="top-bar-in">
              <a className="wordmark" href="#" onClick={(e) => goto(e, "top")} aria-label="landings.md">
                <img src="/images/logo-mark.webp" alt="landings.md" width={57} height={96} />
              </a>
              <p className="status">
                {fx ? <ThinkingOrb state="working" size={20} theme="light" className="orb-avail" aria-label={t.avail} /> : <span className="orb-ph" aria-hidden="true" />}
                <span className="avail-long">{t.avail}</span>
                <span className="avail-short">{t.availShort}</span>
              </p>
            </div>
          </div>
        </header>
        {/* hero */}
        <section className="hero rv">
          <div className="hero-orb" aria-hidden="true">{fx && <HeroOrb />}</div>
          <div className="container">
            <p className="founder fu" style={d("0s")}>
              <span className="founder-pic">
                <img src="/images/founder.webp" alt="Damian B." width={288} height={288} />
              </span>
              <span className="founder-txt">
                <span className="founder-name">Damian B.</span>
                <span className="founder-role">
                  {t.founder}
                  <span className="founder-dot" aria-hidden="true" />
                  {t.online}
                </span>
              </span>
            </p>
            <h1 className="h1">
              <span className="rl">
                <span className="rl-i" style={d("0.06s")}>
                  {t.h1a}
                </span>
              </span>
              <span className="rl">
                <span className="rl-i" style={d("0.16s")}>
                  <Slot words={t.words} />
                </span>
              </span>
            </h1>
            <p className="hero-sub fu" style={d("0.3s")}>
              {t.sub}
            </p>
            <div className="hero-cta fu" style={d("0.4s")}>
              {(() => {
                const cta = (
                  <a className="btn" href="#contact" onClick={(e) => goto(e, "contact")}>
                    {t.ctaP}
                  </a>
                );
                return fxHeavy ? (
                  <FxBoundary fallback={cta}>
                    <MetalFx variant="button" preset="chromatic" theme="light" normalizeHostStyles={false} className="fx-cta">
                      {cta}
                    </MetalFx>
                  </FxBoundary>
                ) : (
                  cta
                );
              })()}
              <a className="tlink" href="#proiecte" onClick={(e) => goto(e, "proiecte")}>
                {t.ctaS}
              </a>
            </div>
            <div className="hero-meta fu" style={d("0.5s")}>
              <div className="hero-meta-links">
                <a className="icon-btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <WhatsAppIcon />
                </a>
                <a className="icon-btn" href={TELEGRAM} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <TelegramIcon />
                </a>
              </div>
              <div className="hero-meta-links">
                <EmailMenu triggerClass="mail-link">{EMAIL}</EmailMenu>
              </div>
            </div>
            <div className="logos fu" style={d("0.6s")}>
              <div className="logo-strip">
                <div className="logo-row">
                  {[...LOGOS, ...LOGOS].map((l, i) => (
                    <img
                      key={`${l.n}${i}`}
                      className={i >= LOGOS.length ? "dup" : undefined}
                      src={`/images/logos/${l.n}.png`}
                      alt={i >= LOGOS.length ? "" : l.n}
                      style={{ height: l.h }}
                      decoding="async"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {seo && <SeoIntro seo={seo} fx={fx} />}

        {/* projects */}
        <section className="section" id="proiecte">
          <Carousel t={t} fx={fx} order={seo?.projectOrder} />
        </section>

        {/* services */}
        <section className="section" id="servicii">
          <div className="container">
            <div className="rv">
              <div className="rl">
                <h2 className="rl-i lbl">
                  {fx && <ThinkingOrb state="weaving" size={20} theme="light" className="orb-lbl" aria-label="" />}
                  {t.servLabel}
                </h2>
              </div>
            </div>
            <div className="srv-list" style={{ marginTop: 44 }}>
              {t.services.map((s, i) => (
                <div className="srv rv" key={i}>
                  <h3 className="srv-name">
                    <span className="rl">
                      <span className="rl-i">{s.name}</span>
                    </span>
                  </h3>
                  <p className="srv-desc fu" style={d("0.12s")}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {seo && <SeoCases seo={seo} fx={fx} />}

        {/* pricing */}
        <section className="section" id="preturi">
          <div className="container">
            <div className="rv">
              <div className="rl">
                <h2 className="rl-i lbl">
                  {fx && <ThinkingOrb state="solving" size={20} theme="light" className="orb-lbl" aria-label="" />}
                  {t.priceLabel}
                </h2>
              </div>
            </div>
            <div className="price-grid rv" style={{ marginTop: 44 }}>
              {t.plans.map((p, i) => (
                <div className="price-cell" key={i}>
                  <div className="price-plan fu" style={d(`${i * 0.08}s`)}>
                    {p.name}
                  </div>
                  <div className="price-val">
                    <span className="rl">
                      <span className="rl-i" style={d(`${0.08 + i * 0.08}s`)}>
                        <em className="price-from">{t.priceFrom}</em>
                        {p.price}
                      </span>
                    </span>
                  </div>
                  <ul className="price-feats fu" style={d(`${0.16 + i * 0.08}s`)}>
                    {p.feats.map((f) => (
                      <li key={f}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M4.5 12.6l5 5 10-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="price-cta fu" style={d(`${0.22 + i * 0.08}s`)}>
                    <EmailMenu subject={`${p.name} (${p.price})`} triggerClass="btn btn-sm">
                      {t.priceCta}
                    </EmailMenu>
                  </div>
                </div>
              ))}
            </div>
            <p className="price-note rv fu">{t.priceNote}</p>
          </div>
        </section>

        {/* proof */}
        <section className="section" id="rezultate">
          <div className="container">
            <div className="rv">
              <div className="rl">
                <h2 className="rl-i lbl">
                  {fx && <ThinkingOrb state="breathing" size={20} theme="light" className="orb-lbl" aria-label="" />}
                  {t.proofLabel}
                </h2>
              </div>
              <p className="proof-line fu" style={d("0.1s")}>
                {t.proofLine}
              </p>
            </div>
            <div className="rv">
              <div className="proof-frame fu">
                <img
                  src="/images/davo-ahrefs.png"
                  alt="Profil de backlink-uri pentru davo.md in Ahrefs: Domain Rating 50, 2.6K backlink-uri, 348 domenii de referinta"
                  width={2102}
                  height={512}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="stats rv">
              {t.statCards.slice(0, 3).map((c, i) => (
                <div className="stat fu" style={d(`${i * 0.08}s`)} key={i}>
                  <div className="stat-val">
                    {i === 0 ? <StatValue target={50} /> : i === 1 ? <StatValue target={2.6} decimals={1} suffix="K" /> : <StatValue target={348} />}
                  </div>
                  <div className="stat-lbl">{c.l}</div>
                  <div className="stat-sub">{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {seo && <SeoFaq seo={seo} fx={fx} />}
        {seo && <SeoRelated seo={seo} />}

        {/* contact */}
        <section className="contact" id="contact">
          <div className="container rv">
            <p className="founder founder-c fu" style={d("0.05s")}>
              <span className="founder-pic">
                <img src="/images/founder.webp" alt="Damian B." width={288} height={288} loading="lazy" decoding="async" />
              </span>
              <span className="founder-txt">
                <span className="founder-name">Damian B.</span>
                <span className="founder-role">
                  {t.founder}
                  <span className="founder-dot" aria-hidden="true" />
                  {t.online}
                </span>
              </span>
            </p>
            <h2 className="contact-title" style={{ marginTop: 24 }}>
              <span className="rl">
                <span className="rl-i" style={d("0.1s")}>
                  {t.contactTitle}
                </span>
              </span>
            </h2>
            <p className="contact-sub fu" style={d("0.2s")}>
              {t.contactSub}
            </p>
            <div className="fu" style={d("0.3s")}>
              <EmailMenu triggerClass="btn btn-lg">{EMAIL}</EmailMenu>
            </div>
            <div className="contact-links fu" style={d("0.4s")}>
              <a className="pill-btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a className="pill-btn" href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                <TelegramIcon />
                Telegram
              </a>
              <a className="pill-btn" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
                Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container foot-top">
          <div className="foot-brand">
            <a href="/" aria-label="landings.md">
              <img className="foot-logo" src="/images/logo-mark.webp" alt="landings.md" width={57} height={96} />
            </a>
            <p className="foot-tag">{base.footTag}</p>
            <div className="foot-social">
              <a className="icon-btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a className="icon-btn" href={TELEGRAM} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <TelegramIcon />
              </a>
              <a className="icon-btn" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>

          <nav className="foot-col" aria-label={base.servLabel}>
            <p className="foot-col-label">{base.servLabel}</p>
            <ul className="foot-links foot-links-2">
              {SEO_SLUGS.map((slug) => (
                <li key={slug}>
                  <a href={`/${slug}`} aria-current={seo?.slug === slug ? "page" : undefined}>
                    {SEO_INDEX[slug]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot-col">
            <p className="foot-col-label">{base.contactLabel}</p>
            <ul className="foot-links">
              <li>
                <EmailMenu triggerClass="mail-link">{EMAIL}</EmailMenu>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  +373 68 327 082
                </a>
              </li>
              <li>
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                  @damiqqn
                </a>
              </li>
              <li className="foot-muted">{base.loc}</li>
              <li className="foot-muted">{base.contactSub}</li>
            </ul>
          </div>
        </div>

        {!seo && (
          <div className="container foot-faq">
            <p className="foot-col-label">{base.faqLabel}</p>
            <div className="faq">
              {base.faq.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>
                    <h3>{f.q}</h3>
                    <span className="faq-mark" aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="container footer-in">
          <span>
            &copy; {new Date().getFullYear()} landings.md. {t.rights}
          </span>
          {!seo && (
            <div className="lang-row" role="group" aria-label={t.a11y.lang}>
              {LANGS.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={code === lang ? "lang-btn is-on" : "lang-btn"}
                  aria-pressed={code === lang}
                  onClick={() => {
                    setLang(code);
                    try {
                      window.localStorage.setItem("lang", code);
                    } catch {
                      /* nothing to remember, the pick still applies for this visit */
                    }
                  }}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          <span>{t.loc}</span>
        </div>
      </footer>
    </>
  );
}
