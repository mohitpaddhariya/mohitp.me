"use client"
import { ThemeProvider } from "next-themes"
import PageTransition from "@/components/page-transition"
import Navigation from "@/components/navigation"
import { LoadingProvider } from "@/components/loading-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LoadingProvider>
        {/* Header */}
        <header>
          {/* Navigation */}
          <Navigation />
        </header>
        <PageTransition>
          {children}
        </PageTransition>
      </LoadingProvider>
    </ThemeProvider>
  )
}