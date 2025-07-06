'use client'

import { Suspense, ComponentType } from 'react'
import { ComponentLoader } from './loader'

interface WithLoadingProps {
  /** Custom loading component */
  LoadingComponent?: ComponentType
  /** Custom loading text */
  loadingText?: string
  /** Custom className for loader wrapper */
  className?: string
}

/**
 * Higher-order component that adds loading state to any component
 * Usage: export default withLoading(MyComponent)
 */
export function withLoading<T extends object>(
  Component: ComponentType<T>,
  options: WithLoadingProps = {}
) {
  const {
    LoadingComponent = ComponentLoader,
    loadingText = 'Loading...',
    className = ''
  } = options

  const WithLoadingComponent = (props: T) => {
    return (
      <Suspense 
        fallback={
          <div className={`flex justify-center items-center ${className}`}>
            <LoadingComponent />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    )
  }

  WithLoadingComponent.displayName = `withLoading(${Component.displayName || Component.name})`
  
  return WithLoadingComponent
}

/**
 * Hook for creating async loading states
 */
import { useState, useCallback } from 'react'

export function useAsyncLoading<T extends any[], R>(
  asyncFn: (...args: T) => Promise<R>
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (...args: T): Promise<R | null> => {
      setIsLoading(true)
      setError(null)
      
      try {
        const result = await asyncFn(...args)
        return result
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [asyncFn]
  )

  return { execute, isLoading, error }
}

/**
 * Component wrapper for handling loading states with data fetching
 */
interface LoadingWrapperProps {
  isLoading?: boolean
  error?: Error | null
  retry?: () => void
  children: React.ReactNode
  LoadingComponent?: ComponentType
  ErrorComponent?: ComponentType<{ error: Error; retry?: () => void }>
  className?: string
}

export const LoadingWrapper = ({
  isLoading = false,
  error,
  retry,
  children,
  LoadingComponent = ComponentLoader,
  ErrorComponent,
  className = ''
}: LoadingWrapperProps) => {
  if (error && ErrorComponent) {
    return <ErrorComponent error={error} retry={retry} />
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
        <div className="text-theme-alt text-center">
          <p className="font-saprona-medium text-lg mb-2">Something went wrong</p>
          <p className="font-saprona-light text-sm mb-4 text-theme-alt">
            {error.message}
          </p>
          {retry && (
            <button
              onClick={retry}
              className="
                px-4 py-2 
                bg-theme-card 
                border border-theme-alt 
                rounded-lg 
                text-theme-text 
                font-saprona-medium 
                text-sm
                hover:border-theme-text
                transition-colors duration-200
              "
            >
              Try again
            </button>
          )}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <LoadingComponent />
      </div>
    )
  }

  return <>{children}</>
}
