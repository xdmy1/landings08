import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogTopBar } from "../../../blog/chrome";
import { LegalFooter } from "../../../_pay/legal-footer";
import { eurRate, toMdl } from "../../../_pay/maib";
import { AUDIT_EUR, AUDIT_EUR_WAS } from "../../../_audit/price";
import Report from "./report";
import "../../verificare.css";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Raport de verificare | landings.md", robots: { index: false, follow: false } };

export default async function ReportPage({ params }: { params: { rid: string } }) {
  const { rate } = await eurRate();
  return (
    <>
      <BlogTopBar />
      <main className="blog-hero vr-hero">
        <div className="container blog-hero-in">
          <Suspense fallback={<p className="vr-loading">Se încarcă raportul…</p>}>
            <Report rid={params.rid.replace(/[^a-z0-9]/g, "").slice(0, 12)} eur={AUDIT_EUR} was={AUDIT_EUR_WAS} mdl={toMdl(AUDIT_EUR, rate)} />
          </Suspense>
        </div>
      </main>
      <LegalFooter />
    </>
  );
}
