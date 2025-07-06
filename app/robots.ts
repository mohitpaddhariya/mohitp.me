import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/admin/',
        '/api/',
        '/_next/',
        '/temp/',
        '/*.json$',
        '/*.xml$',
      ],
    },
    sitemap: 'https://mohitp.me/sitemap.xml',
    host: 'https://mohitp.me',
  }
}
