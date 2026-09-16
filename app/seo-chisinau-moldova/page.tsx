import type { Metadata } from "next";
import SiteShell from "../_shell/site";
import { seoMetadata, SeoJsonLd } from "../_seo/meta";
import page from "../_seo/pages/seo-chisinau-moldova";

export const metadata: Metadata = seoMetadata(page);

export default function Page() {
  return (
    <>
      <SeoJsonLd page={page} />
      <SiteShell seo={page} />
    </>
  );
}
