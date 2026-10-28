import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";
import { SEO_SLUGS } from "./_seo/index";
import { LANGS } from "./_shell/langs";

const SITE = "https://www.landings.md";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...LANGS.filter((l) => l !== "ro").map((l) => ({
      url: `${SITE}/${l}`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE}/blog`,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE}/verificare`,
      lastModified: new Date("2026-10-25"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/termeni-si-conditii`,
      lastModified: new Date("2026-10-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...SEO_SLUGS.map((slug) => ({
      url: `${SITE}/${slug}`,
      lastModified: new Date("2026-09-16"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...POSTS.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
