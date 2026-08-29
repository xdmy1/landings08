import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";

const SITE = "https://landings.md";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/blog`,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...POSTS.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
