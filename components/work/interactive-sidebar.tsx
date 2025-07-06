'use client'

import React, { useState, useEffect } from 'react'

interface SidebarItem {
  id: string
  title: string
  isActive?: boolean
}

interface InteractiveSidebarProps {
  items: SidebarItem[]
}

const InteractiveSidebar = ({ items }: InteractiveSidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>(items[0]?.id || '')

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean)
      
      if (sections.length === 0) {
        // Try again after a brief delay in case DOM isn't ready
        setTimeout(handleScroll, 100)
        return
      }
      
      // Find which section is currently in view using Intersection Observer approach
      let currentSection = ''
      const scrollPosition = window.scrollY + 200 // Better offset for header
      
      // Check each section from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionTop = window.scrollY + rect.top
          
          if (scrollPosition >= sectionTop) {
            currentSection = section.id
            break
          }
        }
      }
      
      // Fallback: use the first section if none found
      if (!currentSection && sections.length > 0) {
        currentSection = sections[0]!.id
      }
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [items, activeSection])

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    
    if (element) {
      // Use the built-in scrollIntoView with proper offset
      const rect = element.getBoundingClientRect()
      const absoluteElementTop = rect.top + window.scrollY
      const middle = absoluteElementTop - 120 // Account for header and some padding

      window.scrollTo({
        top: middle,
        behavior: 'smooth'
      })
      
      // Update active section immediately for better UX
      setActiveSection(sectionId)
    }
  }

  if (!items || items.length === 0) return null

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-8">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-sm font-saprona-medium text-theme-alt uppercase tracking-wider">
            Contents
          </h3>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`
                  group relative w-full text-left py-3 px-0
                  transition-all duration-200 ease-out
                  ${isActive ? 'text-theme' : 'text-theme-alt hover:text-theme'}
                `}
              >
                {/* Simple active indicator line */}
                <div className={`
                  absolute left-0 top-0 bottom-0 w-0.5 rounded-full
                  transition-all duration-200 ease-out
                  ${isActive ? 'bg-blue-500 opacity-100' : 'bg-transparent opacity-0'}
                `}></div>
                
                {/* Content */}
                <div className="flex items-center pl-4">
                  <span className={`
                    text-base leading-relaxed transition-all duration-200
                    ${isActive ? 'font-saprona-medium' : 'font-saprona-regular'}
                  `}>
                    {item.title}
                  </span>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Simple Progress section */}
        <div className="mt-12 pt-6 border-t border-theme-alt/15">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-saprona-medium text-theme-alt uppercase tracking-wider">
              Progress
            </span>
            <span className="text-sm font-saprona-medium text-theme">
              {Math.round(((items.findIndex(item => item.id === activeSection) + 1) / items.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-theme-alt/10 rounded-full h-0.5">
            <div 
              className="bg-blue-500 h-0.5 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${Math.min(100, ((items.findIndex(item => item.id === activeSection) + 1) / items.length) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default InteractiveSidebar
