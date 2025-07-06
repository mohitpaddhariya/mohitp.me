'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoaderProps {
  /** Size of the loader - sm, md, lg, xl */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Whether to show the full-screen overlay */
  fullScreen?: boolean
  /** Custom loading text */
  text?: string
  /** Show minimal version without text */
  minimal?: boolean
  /** Custom className for additional styling */
  className?: string
  /** Whether to show the loader */
  show?: boolean
}

const Loader = ({ 
  size = 'md', 
  fullScreen = false, 
  text = 'Loading...', 
  minimal = false, 
  className = '', 
  show = true 
}: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement[]>([])
  const textRef = useRef<HTMLSpanElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!show || !loaderRef.current) return

    const dots = dotsRef.current
    const tl = gsap.timeline({ repeat: -1 })

    // Animate dots with staggered effect
    tl.to(dots, {
      scale: 1.2,
      opacity: 0.8,
      duration: 0.4,
      stagger: 0.15,
      ease: "power2.inOut",
    })
    .to(dots, {
      scale: 1,
      opacity: 0.3,
      duration: 0.4,
      stagger: 0.15,
      ease: "power2.inOut",
    }, "-=0.2")

    // Animate text if present
    if (textRef.current && !minimal) {
      gsap.to(textRef.current, {
        opacity: 0.7,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }

    // Animate overlay entrance
    if (overlayRef.current && fullScreen) {
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.3,
          ease: "power2.out"
        }
      )
    }

    return () => {
      tl.kill()
    }
  }, [show, minimal, fullScreen])

  if (!show) return null

  // Size configurations
  const sizeConfig = {
    sm: {
      dotSize: 'w-2 h-2',
      spacing: 'gap-1',
      container: 'w-12 h-8',
      textSize: 'text-xs',
      padding: 'p-2'
    },
    md: {
      dotSize: 'w-3 h-3',
      spacing: 'gap-1.5',
      container: 'w-16 h-10',
      textSize: 'text-sm',
      padding: 'p-3'
    },
    lg: {
      dotSize: 'w-4 h-4',
      spacing: 'gap-2',
      container: 'w-20 h-12',
      textSize: 'text-base',
      padding: 'p-4'
    },
    xl: {
      dotSize: 'w-5 h-5',
      spacing: 'gap-2.5',
      container: 'w-24 h-14',
      textSize: 'text-lg',
      padding: 'p-6'
    }
  }

  const config = sizeConfig[size]

  const loaderContent = (
    <div 
      ref={loaderRef}
      className={`flex flex-col items-center justify-center ${minimal ? '' : config.padding} ${className}`}
    >
      {/* Dots Animation */}
      <div className={`flex items-center justify-center ${config.spacing} ${config.container}`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) dotsRef.current[i] = el
            }}
            className={`
              ${config.dotSize} 
              rounded-full 
              bg-theme-text 
              opacity-30
              transition-colors duration-300
            `}
          />
        ))}
      </div>
      
      {/* Loading Text */}
      {!minimal && (
        <span 
          ref={textRef}
          className={`
            ${config.textSize} 
            font-saprona-light 
            text-theme-alt 
            mt-3
            transition-colors duration-300
          `}
        >
          {text}
        </span>
      )}
    </div>
  )

  // Full screen overlay
  if (fullScreen) {
    return (
      <div 
        ref={overlayRef}
        className="
          fixed inset-0 z-[9999] 
          bg-theme 
          backdrop-blur-sm 
          flex items-center justify-center
          transition-all duration-300
        "
      >
        <div className="
          bg-theme-card 
          rounded-2xl 
          border border-theme-alt 
          shadow-2xl 
          p-8
          backdrop-blur-md
          transition-all duration-300
        ">
          {loaderContent}
        </div>
      </div>
    )
  }

  // Inline loader
  return loaderContent
}

export default Loader

// Pre-configured loader variants for common use cases
export const PageLoader = () => (
  <Loader 
    size="lg" 
    fullScreen 
    text="Loading page..."
  />
)

export const ComponentLoader = ({ className = '' }: { className?: string }) => (
  <Loader 
    size="md" 
    className={`my-8 ${className}`}
    text="Loading..."
  />
)

export const ButtonLoader = () => (
  <Loader 
    size="sm" 
    minimal 
    className="inline-flex"
  />
)

export const InlineLoader = ({ text = 'Loading...' }: { text?: string }) => (
  <Loader 
    size="sm" 
    text={text}
    className="inline-flex"
  />
)
