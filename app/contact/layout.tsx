import { Metadata } from 'next'
import { generateSEOMetadata, pageSEOConfig } from '@/lib/seo'

// SEO metadata for the contact page
export const metadata: Metadata = generateSEOMetadata(pageSEOConfig.contact)

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
