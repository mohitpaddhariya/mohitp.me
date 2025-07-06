'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGSAP = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

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
        delay: 0, // Remove delay to start immediately
        onComplete: () => {
          heroAnimationComplete = true
        }
      })
      
      loadTl
        .to('.hero-title', { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, // Back to original timing
          ease: 'power3.out' 
        })
        .to('.hero-subtitle', { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, // Back to original timing
          ease: 'power3.out' 
        }, '-=0.4')

      // Enable all animations immediately - no waiting for hero
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
          delay: index * 0.15, // Add staggered delay for smoother appearance
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
          delay: index * 0.1, // Add staggered delay
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
              start: 'top 85%', // Start when section is 85% visible
              toggleActions: 'play none none none',
              once: true
            },
            delay: index * 0.2 // Stagger animation for each card
          })
        })
      } else {
        // Fallback if section selector doesn't work
        gsap.utils.toArray('.testimonial-card').forEach((card: any, index: number) => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.15, // Stagger the animation for better visual flow
            scrollTrigger: {
              trigger: card,
              start: 'top 90%', // Start animation a bit earlier
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
          delay: 0.2, // Reduced delay for faster appearance
          scrollTrigger: {
            trigger: item,
            start: 'top 90%', // Trigger a bit earlier
            toggleActions: 'play none none none',
            once: true
          }
        })
      })

      // IMPROVED: Smooth parallax effects that don't conflict with other animations
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
                // Use transform3d for better performance and smoother animation
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

      // IMPROVED: Hover effects that work with parallax - use transform instead of y
      gsap.utils.toArray('.work-item').forEach((item: any) => {
        let hoverTl: gsap.core.Timeline

        const handleMouseEnter = () => {
          if (hoverTl) hoverTl.kill()
          hoverTl = gsap.timeline()
          hoverTl.to(item, {
            yPercent: -2, // Use yPercent instead of y to avoid conflicts
            duration: 0.3,
            ease: 'power2.out',
            overwrite: false // Don't overwrite scroll animations
          })
        }
        
        const handleMouseLeave = () => {
          if (hoverTl) hoverTl.kill()
          hoverTl = gsap.timeline()
          hoverTl.to(item, {
            yPercent: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: false // Don't overwrite scroll animations
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
            y: -8, // Use y instead of yPercent to avoid parallax conflicts
            scale: 1.02, // Add subtle scale for more dynamic effect
            duration: 0.4,
            ease: 'power2.out',
            overwrite: false // Don't overwrite scroll animations
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
            overwrite: false // Don't overwrite scroll animations
          })
        }
        
        card.addEventListener('mouseenter', handleMouseEnter)
        card.addEventListener('mouseleave', handleMouseLeave)
      })

      // IMPROVED: Project hover effects that work with scale animations
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

      // REMOVED: Magnetic mouse effect - disabled as requested
      // const heroSection = document.querySelector('.hero-title')
      // Magnetic effect has been disabled

      // IMPROVED: Refresh ScrollTrigger handling
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

    }, containerRef) // Close gsap.context callback with containerRef

    return () => ctx.revert()
  }, [])

  return { containerRef }
}