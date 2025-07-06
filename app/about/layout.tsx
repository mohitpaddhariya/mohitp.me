import { Metadata } from 'next'
import { generateSEOMetadata, pageSEOConfig } from '@/lib/seo'

// SEO metadata for the about page
export const metadata: Metadata = generateSEOMetadata(pageSEOConfig.about)

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
