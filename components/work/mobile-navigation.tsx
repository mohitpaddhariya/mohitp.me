'use client'

import React, { useState, useEffect, useRef } from 'react'

interface SidebarItem {
  id: string
  title: string
  isActive?: boolean
}

interface MobileNavigationProps {
  items: SidebarItem[]
}

const MobileNavigation = ({ items }: MobileNavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>(items[0]?.id || '')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean)
      
      if (sections.length === 0) {
        setTimeout(handleScroll, 100)
        return
      }
      
      let currentSection = ''
      const scrollPosition = window.scrollY + 200
      
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
      
      if (!currentSection && sections.length > 0) {
        currentSection = sections[0]!.id
      }
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

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
    handleScroll()
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [items, activeSection])

  // Auto-scroll to active item in mobile navigation
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeIndex = items.findIndex(item => item.id === activeSection)
      const activeButton = scrollContainerRef.current.children[activeIndex] as HTMLElement
      
      if (activeButton) {
        const containerWidth = scrollContainerRef.current.offsetWidth
        const buttonLeft = activeButton.offsetLeft
        const buttonWidth = activeButton.offsetWidth
        const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2)
        
        scrollContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }, [activeSection, items])

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      const absoluteElementTop = rect.top + window.scrollY
      const middle = absoluteElementTop - 120

      window.scrollTo({
        top: middle,
        behavior: 'smooth'
      })
      
      setActiveSection(sectionId)
    }
  }

  if (!items || items.length === 0) return null

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-theme-card/98 backdrop-blur-lg border-t border-theme-alt/20 z-50">
      {/* Simple Progress bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="w-full bg-theme-alt/10 rounded-full h-0.5">
          <div 
            className="bg-blue-500 h-0.5 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${Math.min(100, ((items.findIndex(item => item.id === activeSection) + 1) / items.length) * 100)}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Navigation items */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-1 px-4 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleSectionClick(item.id)}
              className={`
                flex-shrink-0 relative py-2.5 px-4 
                transition-all duration-200 ease-out
                ${isActive ? 'text-theme' : 'text-theme-alt hover:text-theme'}
              `}
            >
              {/* Simple active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full"></div>
              )}
              
              <span className={`
                text-sm whitespace-nowrap transition-all duration-200
                ${isActive ? 'font-saprona-medium' : 'font-saprona-regular'}
              `}>
                {item.title}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MobileNavigation
