import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { POSTS } from "../posts";
import { BlogReveal, BlogTopBar, BlogOrb, CtaBand, CtaFinal, OtherPostsLabel } from "../chrome";
import { fmtDate } from "../format";

const SITE = "https://landings.md";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | landings.md`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE}/blog/${post.slug}`,
      siteName: "landings.md",
      locale: "ro_RO",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
    twitter: { card: "summary", title: post.title, description: post.description },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const mid = Math.ceil(post.sections.length / 2);
  const others = POSTS.filter((p) => p.slug !== post.slug)
    .sort(() => 0)
    .filter((p) => p.category === post.category)
    .slice(0, 3);
  const related = others.length >= 2 ? others : POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${SITE}/blog/${post.slug}#post`,
        mainEntityOfPage: `${SITE}/blog/${post.slug}`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "ro",
        author: { "@type": "Organization", name: "landings.md", url: SITE },
        publisher: { "@id": `${SITE}/#org` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/blog/${post.slug}#faq`,
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogReveal />
      <BlogTopBar />
      <main>
        <div className="blog-hero">
          <BlogOrb />
          <div className="container blog-hero-in">
            <div className="rv">
              <p className="lbl fu">
                <Link href="/blog">Blog</Link>
                <em aria-hidden="true">·</em> {fmtDate(post.date)} <em aria-hidden="true">·</em> {post.category}{" "}
                <em aria-hidden="true">·</em> {post.minutes} min
              </p>
              <h1 className="art-h1" style={{ marginTop: 18 }}>
                <span className="rl">
                  <span className="rl-i">{post.title}</span>
                </span>
              </h1>
            </div>
          </div>
        </div>

        <article className="container art">
          <div className="rv">
            {post.intro.map((p, i) => (
              <p className="art-lead fu" key={i}>
                {p}
              </p>
            ))}
          </div>

          {post.sections.map((s, i) => (
            <Fragment key={i}>
              {i === mid && <CtaBand />}
              <section className="rv">
                <h2 className="art-h2">
                  <span className="rl">
                    <span className="rl-i">{s.h}</span>
                  </span>
                </h2>
                {s.p.map((par, j) => (
                  <p className="fu" key={j}>
                    {par}
                  </p>
                ))}
                {s.list && (
                  <ul className="fu">
                    {s.list.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            </Fragment>
          ))}

          <section className="rv">
            <h2 className="art-h2">
              <span className="rl">
                <span className="rl-i">Întrebări frecvente</span>
              </span>
            </h2>
            {post.faq.map((f, i) => (
              <div className="art-faq fu" key={i}>
                <p className="art-faq-q">{f.q}</p>
                <p>{f.a}</p>
              </div>
            ))}
          </section>

          <CtaFinal />

          <nav className="blog-related rv" aria-label="Alte articole">
            <p className="lbl fu">
              <OtherPostsLabel />
            </p>
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="post-row fu">
                <span className="post-row-meta">
                  {fmtDate(p.date)} · {p.category} · {p.minutes} min
                </span>
                <span className="post-row-title">{p.title}</span>
              </Link>
            ))}
          </nav>
        </article>
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
