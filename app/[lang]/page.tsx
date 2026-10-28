import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "../_shell/site";
import { LANGS, LANG_ALTERNATES, LANG_META, isLang, langPath } from "../_shell/langs";

/* the home page in each of the other languages: /en, /de, /fr, /es, /ru (Romanian stays at /) */
export function generateStaticParams() {
  return LANGS.filter((l) => l !== "ro").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLang(params.lang) || params.lang === "ro") return {};
  const m = LANG_META[params.lang];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: langPath(params.lang), languages: LANG_ALTERNATES },
    openGraph: { type: "website", url: langPath(params.lang), siteName: "landings.md", locale: m.locale, title: m.title, description: m.description, images: [{ url: "/images/og.jpg", width: 1200, height: 630 }] },
  };
}

export default function LangHome({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang) || params.lang === "ro") notFound();
  return <SiteShell initialLang={params.lang} />;
}
