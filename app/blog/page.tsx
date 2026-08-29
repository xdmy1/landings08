import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "./posts";
import { BlogReveal, BlogTopBar, BlogOrb } from "./chrome";
import { fmtDate } from "./format";

export const metadata: Metadata = {
  title: "Blog | landings.md",
  description:
    "Ghiduri practice despre site-uri, SEO, backlink-uri, Google Ads și Meta Ads, scrise de echipa landings.md din Chișinău. Fără teorie goală, doar ce funcționează.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "https://landings.md/blog",
    siteName: "landings.md",
    title: "Blog | landings.md",
    description: "Ghiduri practice despre site-uri, SEO și publicitate online.",
  },
};

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://landings.md/blog#blog",
    url: "https://landings.md/blog",
    name: "Blog landings.md",
    inLanguage: "ro",
    publisher: { "@id": "https://landings.md/#org" },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://landings.md/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogReveal />
      <BlogTopBar />
      <main className="blog-hero">
        <BlogOrb />
        <div className="container blog-hero-in">
          <div className="rv">
            <div className="rl">
              <h1 className="rl-i art-h1">Blog</h1>
            </div>
            <p className="art-lead fu">
              Ghiduri practice despre site-uri, SEO și publicitate online. Scrise de echipa landings.md, pentru afaceri din Moldova
              și România.
            </p>
          </div>
          <div className="blog-list">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="post-row rv">
                <span className="post-row-meta fu">
                  {fmtDate(p.date)} · {p.category} · {p.minutes} min
                </span>
                <span className="post-row-title fu">{p.title}</span>
                <span className="post-row-desc fu">{p.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="container footer-in">
          <span>&copy; {new Date().getFullYear()} landings.md</span>
          <span>Chișinău, Moldova</span>
        </div>
      </footer>
    </>
  );
}
