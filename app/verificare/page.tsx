import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogTopBar } from "../blog/chrome";
import { LegalFooter } from "../_pay/legal-footer";
import Checker from "./checker";
import "./verificare.css";

export const metadata: Metadata = {
  title: "Verifică-ți site-ul gratuit: viteză, SEO, design, Google | landings.md",
  description: "Scrie adresa site-ului și în un minut afli cât de rapid e, cum stă în Google, cum arată pe telefon și cât de bine vinde. Gratuit, fără cont.",
  alternates: { canonical: "/verificare" },
};

export default function VerificarePage() {
  return (
    <>
      <BlogTopBar />
      <main className="container vr-main">
        <p className="vr-kicker">Verificare gratuită</p>
        <h1 className="vr-h1">
          Cât de bun e <span>site-ul tău?</span>
        </h1>
        <p className="vr-sub">Verificăm viteza, poziția în Google, designul și cât de bine îți aduce clienți. Primești nota și tot ce trebuie reparat, într-un minut.</p>
        <Suspense>
          <Checker />
        </Suspense>
      </main>
      <LegalFooter />
    </>
  );
}
