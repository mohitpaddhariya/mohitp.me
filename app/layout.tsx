import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import MainLoader from "@/components/main-loader";
import localFont from "next/font/local";
import { generateSEOMetadata, structuredData,  baseSEOConfig } from "@/lib/seo";

const bogue = localFont({
  src: [
    {
      path: "../public/fonts/Bogue/Bogue Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Thin Italic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/Bogue/Bogue Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Light Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Bogue/Bogue Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Bogue/Bogue Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Medium Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Bogue/Bogue Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Semibold Italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/Bogue/Bogue Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Bogue/Bogue Extrabold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Extrabold Italic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/Bogue/Bogue Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Bogue/Bogue Black Italic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-bogue",
  display: "swap",
});

const saprona = localFont({
  src: [
    {
      path: "../public/fonts/Saprona/Saprona-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Saprona/Saprona-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Saprona/Saprona-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Saprona/Saprona-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-saprona",
  display: "swap",
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
        
        {/* DNS Prefetch & Preconnect */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PPV7T8F7NT"
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
