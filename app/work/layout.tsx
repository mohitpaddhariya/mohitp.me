import { Metadata } from 'next'
import { generateSEOMetadata, pageSEOConfig } from '@/lib/seo'

// SEO metadata for the work page
export const metadata: Metadata = generateSEOMetadata(pageSEOConfig.work)

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
