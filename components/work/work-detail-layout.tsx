import React from 'react'
import MainLayout from "@/components/main-layout"
import InteractiveSidebar from './interactive-sidebar'
import MobileNavigation from './mobile-navigation'

interface WorkDetailLayoutProps {
  children: React.ReactNode
  heroImage?: string
  heroImageAlt?: string
  sidebarItems?: Array<{
    id: string
    title: string
    isActive?: boolean
  }>
}

const WorkDetailLayout = ({
  children,
  heroImage,
  heroImageAlt = "Work detail hero image",
  sidebarItems = []
}: WorkDetailLayoutProps) => {
  return (
    <MainLayout renderGradient={true}>
      {/* Hero Image Section */}
      {heroImage && (
        <section className="w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden rounded-lg border border-theme-alt bg-theme-card mb-8 sm:mb-12 lg:mb-16">
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="w-full h-full object-cover object-center"
          />
        </section>
      )}

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Interactive Sidebar - Desktop */}
        {sidebarItems.length > 0 && (
          <InteractiveSidebar items={sidebarItems} />
        )}

        {/* Content Area */}
        <main className={`${sidebarItems.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'} ${sidebarItems.length > 0 ? 'mb-32 lg:mb-8' : ''}`}>
          <div className="prose prose-theme max-w-none">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      {sidebarItems.length > 0 && (
        <MobileNavigation items={sidebarItems} />
      )}
    </MainLayout>
  )
}

export default WorkDetailLayout
