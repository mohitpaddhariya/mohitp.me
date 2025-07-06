'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Hook that tracks Next.js navigation loading state
 * Returns true when navigation is in progress
 */
export function useNavigationLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleStop = () => setIsLoading(false)

    // Listen for route changes
    const handleRouteChange = () => {
      setIsLoading(false)
    }

    // Set up the loading state
    let timeoutId: NodeJS.Timeout

    const handleNavigation = () => {
      setIsLoading(true)
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      // Set a timeout to hide loading after a maximum time
      timeoutId = setTimeout(() => {
        setIsLoading(false)
      }, 5000) // 5 seconds max loading time
    }

    // We'll use the pathname and searchParams changes to detect navigation
    const url = pathname + searchParams.toString()
    
    // Reset loading state when the route actually changes
    handleRouteChange()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [pathname, searchParams])

  return isLoading
}

/**
 * Hook for managing async operations with loading states
 */
export function useAsyncOperation<T = any>() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = async (operation: () => Promise<T>) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await operation()
      setData(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred')
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setError(null)
    setData(null)
  }

  return {
    isLoading,
    error,
    data,
    execute,
    reset
  }
}

/**
 * Hook for debounced loading states
 * Useful for preventing loading flicker on fast operations
 */
export function useDebouncedLoading(delay: number = 300) {
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedIsLoading, setDebouncedIsLoading] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isLoading) {
      // Show loading immediately
      setDebouncedIsLoading(true)
    } else {
      // Delay hiding loading
      timeoutId = setTimeout(() => {
        setDebouncedIsLoading(false)
      }, delay)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isLoading, delay])

  return {
    isLoading: debouncedIsLoading,
    setIsLoading
  }
}

/**
 * Hook for minimum loading time
 * Ensures loading state is shown for at least a minimum duration
 */
export function useMinimumLoadingTime(minimumTime: number = 500) {
  const [isLoading, setIsLoading] = useState(false)
  const [internalLoading, setInternalLoading] = useState(false)

  const setLoading = (loading: boolean) => {
    if (loading) {
      setInternalLoading(true)
      setIsLoading(true)
    } else {
      setInternalLoading(false)
      // Keep showing loading for minimum time
      setTimeout(() => {
        setIsLoading(false)
      }, minimumTime)
    }
  }

  return {
    isLoading,
    setLoading
  }
}
