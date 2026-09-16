/* Every keyword landing page, in the order they are listed in the sitemap.
   SEO_INDEX maps slug -> short label, used for the internal links row. */

export const SEO_SLUGS = [
  "creare-website-chisinau-moldova",
  "magazin-online-chisinau-moldova",
  "landing-page-chisinau-moldova",
  "seo-chisinau-moldova",
  "backlink-chisinau-moldova",
  "google-ads-chisinau-moldova",
  "meta-ads-chisinau-moldova",
  "creare-boti-telegram",
  "automatizari-ai-moldova",
  "solutii-software-moldova",
  "crm-erp-moldova",
  "aplicatii-mobile-chisinau-moldova",
] as const;

export type SeoSlug = (typeof SEO_SLUGS)[number];

export const SEO_INDEX: Record<string, string> = {
  "creare-website-chisinau-moldova": "Creare website",
  "magazin-online-chisinau-moldova": "Magazin online",
  "landing-page-chisinau-moldova": "Landing page",
  "seo-chisinau-moldova": "Promovare SEO",
  "backlink-chisinau-moldova": "Backlinkuri",
  "google-ads-chisinau-moldova": "Google Ads",
  "meta-ads-chisinau-moldova": "Meta Ads",
  "creare-boti-telegram": "Boți Telegram",
  "automatizari-ai-moldova": "Automatizări AI",
  "solutii-software-moldova": "Soluții software",
  "crm-erp-moldova": "CRM și ERP",
  "aplicatii-mobile-chisinau-moldova": "Aplicații mobile",
};
