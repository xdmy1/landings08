import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogTopBar } from "../../blog/chrome";
import Checkout from "../../_pay/checkout";
import { LegalFooter } from "../../_pay/legal-footer";
import { PLANS, PLAN_IDS, isPlanId } from "../../_pay/plans";
import { eurRate, maibReady, toMdl } from "../../_pay/maib";

export const revalidate = 3600;

export function generateStaticParams() {
  return PLAN_IDS.map((plan) => ({ plan }));
}

export function generateMetadata({ params }: { params: { plan: string } }): Metadata {
  if (!isPlanId(params.plan)) return {};
  const p = PLANS[params.plan];
  return {
    title: `Mentenanță lunară ${p.name.ro}, €${p.eur} | landings.md`,
    description: p.feats.ro.join(". ") + ".",
    alternates: { canonical: `/plata/${p.id}` },
    robots: { index: false, follow: true },
  };
}

export default async function PayPage({ params }: { params: { plan: string } }) {
  if (!isPlanId(params.plan)) notFound();
  const plan = PLANS[params.plan];
  const { rate, date } = await eurRate();

  return (
    <>
      <BlogTopBar />
      <main className="container co-main">
        <Checkout planId={plan.id} mdl={toMdl(plan.eur, rate)} rateDate={date} online={maibReady()} />
      </main>
      <LegalFooter />
    </>
  );
}
