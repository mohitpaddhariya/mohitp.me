'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Mobile detection utility
const isMobile = () => {
  if (typeof window === 'undefined') return false
  
  // Method 1: Screen width based (most common)
  const screenWidth = window.innerWidth <= 768 // Adjust breakpoint as needed
  
  // Method 2: User agent based (more accurate for touch devices)
  const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // Method 3: Touch capability
  const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  // Return true if any condition is met
  return screenWidth || userAgent || touchDevice
}

export const useGSAP = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldDisableGSAP, setShouldDisableGSAP] = useState(false)

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setShouldDisableGSAP(isMobile())
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!containerRef.current || shouldDisableGSAP) {
      // If GSAP is disabled, ensure elements are visible
      if (containerRef.current) {
        containerRef.current.setAttribute('data-gsap-disabled', 'true')
        
        // Reset all elements to visible state
        const elementsToShow = [
          '.hero-title',
          '.hero-subtitle', 
          '.section-header-reveal',
          '.work-item',
          '.project-item',
          '.testimonial-card',
          '.about-text-item'
        ]
        
        elementsToShow.forEach(selector => {
          const elements = containerRef.current!.querySelectorAll(selector)
          elements.forEach(el => {
            (el as HTMLElement).style.opacity = '1'
            ;(el as HTMLElement).style.transform = 'none'
          })
        })
      }
      return
    }

    // Add data attribute to enable CSS hiding
    containerRef.current.setAttribute('data-gsap-container', 'true')

    const ctx = gsap.context(() => {
      // Set initial states only within the container context to avoid global conflicts
      gsap.set('.hero-title', { y: 50, opacity: 0 })
      gsap.set('.hero-subtitle', { y: 30, opacity: 0 })
      gsap.set('.section-header-reveal', { y: 30, opacity: 0 })
      gsap.set('.work-item', { y: 20, opacity: 0 })
      gsap.set('.project-item', { scale: 0.95, opacity: 0 })
      gsap.set('.testimonial-card', { y: 20, opacity: 0 })
      gsap.set('.about-text-item', { y: 20, opacity: 0 })

      // Hero timeline - start immediately with no delay
      let heroAnimationComplete = false
      const loadTl = gsap.timeline({ 
        delay: 0,
        onComplete: () => {
          heroAnimationComplete = true
        }
      })
      
      loadTl
        .to('.hero-title', { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          ease: 'power3.out' 
        })
        .to('.hero-subtitle', { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          ease: 'power3.out' 
        }, '-=0.4')

      // Section headers - animate when any part enters viewport
      gsap.utils.toArray('.section-header-reveal').forEach((header: any, index: number) => {
        gsap.to(header, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 100%',
            toggleActions: 'play none none none',
            once: true
          }
        })
      })

      // Work section - animate when partially visible with staggered delays
      gsap.utils.toArray('.work-item').forEach((item: any, index: number) => {
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: item,
            start: 'top 100%',
            toggleActions: 'play none none none',
            once: true
          }
        })
      })

      // Project and testimonial sections - animate when partially visible with staggered delays
      gsap.utils.toArray('.project-item').forEach((item: any, index: number) => {
        gsap.to(item, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 100%',
            toggleActions: 'play none none none',
            once: true
          }
        })
      })

      // Testimonials section - enhanced animation with better timing
      const testimonialSection = document.querySelector('section:has(.testimonial-card)')
      if (testimonialSection) {
        gsap.utils.toArray('.testimonial-card').forEach((card: any, index: number) => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialSection,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            },
            delay: index * 0.2
          })
        })
      } else {
        gsap.utils.toArray('.testimonial-card').forEach((card: any, index: number) => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          })
        })
      }

      // About page text items - animate with delay after hero completes
      gsap.utils.toArray('.about-text-item').forEach((item: any, index: number) => {
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true
          }
        })
      })

      // Smooth parallax effects that don't conflict with other animations
      const setupParallax = () => {
        // Section titles parallax effect
        gsap.utils.toArray('.section-header-reveal').forEach((element: any) => {
          gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const yPercent = -6 * self.progress
                gsap.set(element, { 
                  yPercent: yPercent,
                  force3D: true,
                  willChange: 'transform'
                })
              }
            }
          })
        })
        
        // Create separate timeline for each parallax element to avoid conflicts
        gsap.utils.toArray('.parallax-slow').forEach((element: any) => {
          gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const yPercent = -8 * self.progress
                gsap.set(element, { 
                  yPercent: yPercent,
                  force3D: true,
                  willChange: 'transform'
                })
              }
            }
          })
        })

        gsap.utils.toArray('.parallax-medium').forEach((element: any) => {
          gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const yPercent = -12 * self.progress
                gsap.set(element, { 
                  yPercent: yPercent,
                  force3D: true,
                  willChange: 'transform'
                })
              }
            }
          })
        })

        gsap.utils.toArray('.parallax-fast').forEach((element: any) => {
          gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const yPercent = -16 * self.progress
                gsap.set(element, { 
                  yPercent: yPercent,
                  force3D: true,
                  willChange: 'transform'
                })
              }
            }
          })
        })
      }

      // Setup parallax after initial animations to prevent conflicts
      setTimeout(setupParallax, 100)

      // Hover effects that work with parallax
      gsap.utils.toArray('.work-item').forEach((item: any) => {
        let hoverTl: gsap.core.Timeline

        const handleMouseEnter = () => {
          if (hoverTl) hoverTl.kill()
          hoverTl = gsap.timeline()
          hoverTl.to(item, {
            yPercent: -2,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: false
          })
        }
        
        const handleMouseLeave = () => {
          if (hoverTl) hoverTl.kill()
          hoverTl = gsap.timeline()
          hoverTl.to(item, {
            yPercent: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: false
          })
        }
        
        item.addEventListener('mouseenter', handleMouseEnter)
        item.addEventListener('mouseleave', handleMouseLeave)
      })

      gsap.utils.toArray('.testimonial-card').forEach((card: any) => {
        let hoverTl: gsap.core.Timeline

        const handleMouseEnter = () => {
          if (hoverTl) hoverTl.kill()
          hoverTl = gsap.timeline()
          hoverTl.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: false
          })
        }
        
        const handleMouseLeave = () => {
          if (hoverTl) hoverTl.kill()
          hoverTl = gsap.timeline()
          hoverTl.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: false
          })
        }
        
        card.addEventListener('mouseenter', handleMouseEnter)
        card.addEventListener('mouseleave', handleMouseLeave)
      })

      // Project hover effects that work with scale animations
      gsap.utils.toArray('.project-item').forEach((item: any) => {
        let hoverTl: gsap.core.Timeline

        const handleMouseEnter = () => {
          if (hoverTl) hoverTl.kill()
          hoverTl = gsap.timeline()
          hoverTl.to(item, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        }
        
        const handleMouseLeave = () => {
          if (hoverTl) hoverTl.kill()
          hoverTl = gsap.timeline()
          hoverTl.to(item, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        }
        
        item.addEventListener('mouseenter', handleMouseEnter)
        item.addEventListener('mouseleave', handleMouseLeave)
      })

      // Refresh ScrollTrigger handling
      const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout
        return (...args: any[]) => {
          clearTimeout(timeout)
          timeout = setTimeout(() => func.apply(this, args), wait)
        }
      }
      
      const handleResize = debounce(() => {
        ScrollTrigger.refresh()
      }, 100)
      
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize)
      }

    }, containerRef)

    return () => ctx.revert()
  }, [shouldDisableGSAP])

  return { containerRef, isGSAPDisabled: shouldDisableGSAP }
}