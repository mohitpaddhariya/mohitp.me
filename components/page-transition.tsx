'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isNavigating = useRef(false)
  const prevPathnameRef = useRef<string>('')

  // Handle route changes
  useEffect(() => {
    if (!containerRef.current) return

    // Initial page load
    if (prevPathnameRef.current === '') {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1
        }
      )
      prevPathnameRef.current = pathname
      return
    }

    // Page change detected
    if (prevPathnameRef.current !== pathname) {
      // Animate in new page
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          ease: "power2.out"
        }
      )
      
      prevPathnameRef.current = pathname
    }
  }, [pathname])

  // Handle link clicks
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Prevent handling if already navigating
      if (isNavigating.current) return

      const target = e.target as HTMLElement
      const link = target.closest('a[href]') as HTMLAnchorElement
      
      if (!link || !containerRef.current) return
      
      const href = link.getAttribute('href')
      
      // Only handle internal navigation
      if (!href || 
          href.startsWith('http') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') ||
          href.startsWith('#') ||
          href === pathname ||
          link.hasAttribute('target') ||
          link.hasAttribute('download')) {
        return
      }

      // Start navigation process
      e.preventDefault()
      
      isNavigating.current = true

      // Exit animation
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          // Navigate to new page
          router.push(href)
          // Reset navigation flag after delay
          setTimeout(() => {
            isNavigating.current = false
          }, 100)
        }
      })
    }

    // Use capture phase to intercept clicks before other handlers
    document.addEventListener('click', handleLinkClick, true)
    
    return () => {
      document.removeEventListener('click', handleLinkClick, true)
    }
  }, [pathname, router])

  return (
    <>
      {/* Page content */}
      <div 
        ref={containerRef}
      >
        {children}
      </div>
    </>
  )
}

export default PageTransition
