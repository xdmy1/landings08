export type Severity = "critic" | "important" | "minor";
export type CatKey = "viteza" | "seo" | "design" | "vanzare" | "mobil" | "siguranta";

export const CATS: { key: CatKey; name: string }[] = [
  { key: "viteza", name: "Viteză" },
  { key: "seo", name: "SEO" },
  { key: "design", name: "Design" },
  { key: "vanzare", name: "Vânzare" },
  { key: "mobil", name: "Telefon" },
  { key: "siguranta", name: "Siguranță" },
];

/* what we measure ourselves, before any AI looks at the site */
export type Facts = {
  url: string;
  finalUrl: string;
  host: string;
  status: number;
  https: boolean;
  redirectsToHttps: boolean | null;
  ttfbMs: number | null;
  htmlKb: number;
  title: string;
  description: string;
  h1: string[];
  h2: string[];
  lang: string;
  canonical: string;
  viewport: boolean;
  robotsMeta: string;
  ogTitle: boolean;
  ogImage: boolean;
  favicon: boolean;
  structuredData: string[];
  hreflang: number;
  images: number;
  imagesNoAlt: number;
  links: { internal: number; external: number };
  brokenLinks: { url: string; status: number }[];
  checkedLinks: number;
  phoneVisible: boolean;
  whatsapp: boolean;
  telegram: boolean;
  email: boolean;
  forms: number;
  analytics: string[];
  cookieBanner: boolean;
  robotsTxt: boolean;
  sitemap: boolean;
  sslDaysLeft: number | null;
  securityHeaders: { hsts: boolean; csp: boolean; xFrame: boolean; xContentType: boolean };
  words: number;
  textSample: string;
};

export type Vitals = {
  performance: number | null; // 0..100
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  lcp: string | null;
  cls: string | null;
  tbt: string | null;
  fcp: string | null;
  speedIndex: string | null;
  lcpMs: number | null;
  opportunities: { title: string; savings: string }[];
  screenshot: string | null; // data URI of the visible screen
};

export type Issue = {
  category: CatKey;
  severity: Severity;
  title: string;
  why: string;
  fix: string;
};

export type Analysis = {
  verdict: string;
  firstImpression: string;
  looksDated: boolean;
  scores: { design: number; vanzare: number; mobil: number };
  catSummary: Record<CatKey, string>;
  issues: Issue[];
  strengths: string[];
};

export type GooglePos = {
  keyword: string;
  position: number | null; // null = not in the results we saw
  page: number | null; // Google page 1-5 when the real results were checked
  source: "google" | "search"; // real Google pages, or Claude's web search (first ~10 results)
  depth: number; // how many results were looked at
  competitors: { name: string; url: string }[];
  note: string;
  analysis: string; // why the ones above rank above
  actions: string[]; // what to do to move up
};

export type Audit = {
  id: string;
  createdAt: string;
  url: string;
  host: string;
  keyword: string;
  facts?: Facts;
  mobile?: Vitals;
  desktop?: Vitals;
  shots?: { desktop: string | null; mobile: string | null };
  analysis?: Analysis;
  google?: GooglePos;
  errors: string[];
  paid: boolean;
  payId?: string;
};
