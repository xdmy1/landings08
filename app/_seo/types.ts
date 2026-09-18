/* Content model for the keyword landing pages. Every page renders through the
   same shell as the home page, only the copy changes. */

export type SeoCase = {
  /* project key, used to pull the same card image the carousel uses */
  key: "glg" | "mobo" | "davo" | "inauto" | "interbus" | "eurogard" | "radx" | "infobac";
  name: string;
  domain: string;
  href: string;
  /* one line on what was built, then the story */
  line: string;
  body: string;
  /* only real, verifiable numbers here */
  stats: { v: string; l: string }[];
};

export type SeoPage = {
  slug: string;
  /* the exact phrase the page targets */
  kw: string;
  /* accepted variants of that phrase, counted together with it */
  kwAlt?: string[];
  /* <title> and meta description */
  title: string;
  desc: string;
  /* hero: h1 = h1a + the rolling words */
  h1a: string;
  words: string[];
  sub: string;
  /* intro block under the hero, where the topic is explained */
  introLabel: string;
  introTitle: string;
  introParas: string[];
  introPoints: { t: string; d: string }[];
  /* the five numbered service rows */
  servLabel: string;
  services: { name: string; desc: string }[];
  /* case studies */
  casesLabel: string;
  casesLine: string;
  cases: SeoCase[];
  /* pricing note under the three plans */
  priceNote: string;
  /* results line above the Ahrefs shot */
  proofLine: string;
  /* faq, also emitted as FAQPage structured data */
  faqLabel: string;
  faq: { q: string; a: string }[];
  /* contact block */
  contactTitle: string;
  contactSub: string;
  /* carousel order, most relevant project first */
  projectOrder: SeoCase["key"][];
  /* internal links to sibling pages */
  related: string[];
};
