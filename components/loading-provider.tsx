'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { PageLoader } from './loader'

interface LoadingContextType {
  isLoading: boolean
  showLoader: (text?: string) => void
  hideLoader: () => void
  loadingText: string
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('Loading...')

  const showLoader = useCallback((text?: string) => {
    if (text) setLoadingText(text)
    setIsLoading(true)
  }, [])

  const hideLoader = useCallback(() => {
    setIsLoading(false)
    setLoadingText('Loading...')
  }, [])

  const value = {
    isLoading,
    showLoader,
    hideLoader,
    loadingText
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <PageLoader />}
    </LoadingContext.Provider>
  )
}
