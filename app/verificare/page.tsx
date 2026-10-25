/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogOrb, BlogReveal, BlogTopBar } from "../blog/chrome";
import { LegalFooter } from "../_pay/legal-footer";
import Checker from "./checker";
import "./verificare.css";

export const metadata: Metadata = {
  title: "Verifică-ți site-ul gratuit: viteză, Google, design | landings.md",
  description: "Scrie adresa site-ului și în un minut afli cât de rapid e, pe ce loc ești în Google, cum arată pe telefon și cât de bine vinde. Gratuit, fără cont.",
  alternates: { canonical: "/verificare" },
};

export default function VerificarePage() {
  return (
    <>
      <BlogReveal />
      <BlogTopBar />
      <main className="blog-hero vr-hero">
        <BlogOrb />
        <div className="container blog-hero-in">
          <div className="rv">
            <p className="founder fu">
              <span className="founder-pic">
                <img src="/images/founder.webp" alt="Damian B." width={288} height={288} />
              </span>
              <span className="founder-txt">
                <span className="founder-name">Damian B.</span>
                <span className="founder-role">
                  Fondator <span className="founder-dot" /> Online
                </span>
              </span>
            </p>
            <h1 className="h1 vr-title">
              <span className="rl">
                <span className="rl-i">Verifică-ți site-ul</span>
              </span>
              <span className="rl">
                <span className="rl-i grey" style={{ ["--d" as string]: "0.08s" }}>gratuit.</span>
              </span>
            </h1>
            <p className="hero-sub fu" style={{ ["--d" as string]: "0.2s" }}>
              În un minut afli cât de rapid e, pe ce loc ești în Google, cum arată pe telefon și cât de bine îți aduce clienți.
            </p>
            <div className="fu" style={{ ["--d" as string]: "0.3s" }}>
              <Suspense>
                <Checker />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <LegalFooter />
    </>
  );
}
