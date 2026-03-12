import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies — SEO Results & Client Success | landings.md',
  description: 'Real SEO results for real businesses. See how we grew RespectAuto to #1 on Google (+300% traffic) and doubled CMIEA organic sign-ups in 3 months.',
  openGraph: {
    title: 'Case Studies — SEO Results & Client Success | landings.md',
    description: 'Real SEO results for real businesses. RespectAuto: +300% organic traffic. CMIEA: 638% click growth. Zero ad spend.',
  },
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
