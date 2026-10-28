/* the site's languages: one URL each (/ is Romanian), with the title and description Google shows */

export const LANGS = ["ro", "en", "de", "fr", "es", "ru"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);
export const langPath = (l: Lang) => (l === "ro" ? "/" : `/${l}`);

/* every language points at every other one; x-default = Romanian */
export const LANG_ALTERNATES: Record<string, string> = Object.fromEntries([...LANGS.map((l) => [l, langPath(l)]), ["x-default", "/"]]);

export const LANG_META: Record<Lang, { title: string; description: string; locale: string }> = {
  ro: { title: "landings.md | Site-uri, design și SEO în Chișinău, Moldova", description: "Construim site-uri rapide și curate, magazine online și sisteme, cu SEO optimizat direct în cod și backlink-uri premium contextuale.", locale: "ro_RO" },
  en: { title: "landings.md | Websites, design and SEO in Chișinău, Moldova", description: "Fast, clean websites, online shops and business systems, with SEO built into the code and premium contextual backlinks.", locale: "en_US" },
  de: { title: "landings.md | Websites, Design und SEO in Chișinău, Moldau", description: "Schnelle, klare Websites, Onlineshops und Systeme, mit SEO direkt im Code und hochwertigen Backlinks.", locale: "de_DE" },
  fr: { title: "landings.md | Sites web, design et SEO à Chișinău, Moldavie", description: "Des sites rapides et épurés, des boutiques en ligne et des systèmes, avec le SEO intégré au code et des backlinks premium.", locale: "fr_FR" },
  es: { title: "landings.md | Sitios web, diseño y SEO en Chișinău, Moldavia", description: "Sitios rápidos y limpios, tiendas online y sistemas, con SEO integrado en el código y backlinks premium.", locale: "es_ES" },
  ru: { title: "landings.md | Сайты, дизайн и SEO в Кишинёве, Молдова", description: "Быстрые и аккуратные сайты, интернет-магазины и системы, с SEO прямо в коде и качественными ссылками.", locale: "ru_RU" },
};
