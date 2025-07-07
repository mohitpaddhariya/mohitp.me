"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Use resolvedTheme instead of theme to handle "system" properly
    setIsDark(resolvedTheme === "dark")
  }, [resolvedTheme])

  const toggleTheme = () => {
    // Toggle between light and dark, not system
    setTheme(isDark ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <div className="min-h-[30px] min-w-[52px] bg-theme-alt/20 rounded-2xl animate-pulse" />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative min-h-[30px] min-w-[52px] p-1 rounded-2xl transition-all duration-300 ease-in-out focus:outline-none hover:scale-105"
      style={{ 
        backgroundColor: 'rgba(153, 153, 153, 0.2)'
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sliding circle indicator */}
      <div 
        className={`absolute h-[22px] aspect-square rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center transform`}
        style={{
          backgroundColor: isDark ? 'var(--theme-text)' : 'var(--theme-bg)',
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px 0px',
          right: isDark ? '4px' : 'auto',
          left: isDark ? 'auto' : '4px',
          top: '4px',
          transform: `translateX(${isDark ? '0px' : '0px'})` // Smooth sliding
        }}
      >
        {isDark ? (
          <Moon 
            width="16" 
            height="16" 
            strokeWidth="2" 
            stroke="none"
            fill="currentColor"
            className="transition-all duration-300 ease-in-out"
            style={{ color: 'var(--theme-bg)' }}
          />
        ) : (
          <Sun 
            width="16" 
            height="16" 
            strokeWidth="2" 
            stroke="none"
            fill="currentColor"
            className="transition-all duration-300 ease-in-out"
            style={{ color: 'var(--theme-text)' }}
          />
        )}
      </div>
    </button>
  )
}