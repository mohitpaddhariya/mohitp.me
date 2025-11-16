import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import MainLoader from "@/components/main-loader";
import localFont from "next/font/local";
import { generateSEOMetadata, structuredData,  baseSEOConfig } from "@/lib/seo";

const bogue = localFont({
  src: [
    {
      path: "../public/fonts/Bogue/Bogue Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bogue",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const saprona = localFont({
  src: [
    {
      path: "../public/fonts/Saprona/Saprona-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Saprona/Saprona-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-saprona",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Enhanced SEO metadata
export const metadata: Metadata = generateSEOMetadata(baseSEOConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.person),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.website),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.professionalService),
          }}
        />
        
        {/* Additional Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mohit Paddhariya" />
        <meta name="application-name" content="Mohit Paddhariya" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS Prefetch & Preconnect for external resources */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/work/cognitive-labs.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/work/imobile-designs.png" fetchPriority="high" />
        
        {/* Google Analytics - Loaded asynchronously with low priority */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PPV7T8F7NT"
          defer
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PPV7T8F7NT', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
              });
            `,
          }}
          defer
        />

      </head>
      <body className={`${bogue.variable} ${saprona.variable}`}>
        <MainLoader />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
