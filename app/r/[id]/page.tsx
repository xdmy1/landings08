import type { Metadata } from "next";
import Open from "./open";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Raportul tău | landings.md", robots: { index: false, follow: false } };

export default function OpenReportPage({ params }: { params: { id: string } }) {
  return <Open id={params.id.replace(/[^a-z0-9]/g, "").slice(0, 12)} />;
}
