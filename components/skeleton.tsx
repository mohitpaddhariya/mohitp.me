'use client'

import { useEffect, useRef } from 'react'

interface SkeletonProps {
  /** Width of the skeleton */
  width?: string | number
  /** Height of the skeleton */
  height?: string | number
  /** Shape of the skeleton */
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text'
  /** Custom className */
  className?: string
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none'
  /** Number of lines for text variant */
  lines?: number
}

const Skeleton = ({
  width,
  height,
  variant = 'rectangular',
  className = '',
  animation = 'wave',
  lines = 1
}: SkeletonProps) => {
  const skeletonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!skeletonRef.current || animation === 'none') return

    const element = skeletonRef.current
    
    if (animation === 'pulse') {
      element.classList.add('loading-pulse')
    } else if (animation === 'wave') {
      element.classList.add('loading-skeleton')
    }

    return () => {
      element.classList.remove('loading-pulse', 'loading-skeleton')
    }
  }, [animation])

  // Base styles for different variants
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full'
      case 'rounded':
        return 'rounded-lg'
      case 'text':
        return 'rounded-md'
      default:
        return 'rounded-sm'
    }
  }

  // Get dimensions
  const getDimensions = () => {
    if (variant === 'text') {
      return {
        width: width || '100%',
        height: height || '1.25rem'
      }
    }
    
    if (variant === 'circular') {
      const size = width || height || '40px'
      return {
        width: size,
        height: size
      }
    }

    return {
      width: width || '100%',
      height: height || '20px'
    }
  }

  const dimensions = getDimensions()

  // For text variant with multiple lines
  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(lines)].map((_, index) => (
          <div
            key={index}
            ref={index === 0 ? skeletonRef : null}
            className={`
              bg-theme-card 
              ${getVariantStyles()}
              ${animation !== 'none' ? 'loading-skeleton' : ''}
              ${index === lines - 1 ? 'w-3/4' : ''}
            `}
            style={{
              width: index === lines - 1 ? '75%' : dimensions.width,
              height: dimensions.height
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={skeletonRef}
      className={`
        bg-theme-card 
        ${getVariantStyles()}
        ${animation !== 'none' ? 'loading-skeleton' : ''}
        ${className}
      `}
      style={{
        width: dimensions.width,
        height: dimensions.height
      }}
    />
  )
}

export default Skeleton

// Pre-configured skeleton variants
export const TextSkeleton = ({ lines = 3, className = '' }: { lines?: number; className?: string }) => (
  <Skeleton variant="text" lines={lines} className={className} />
)

export const CardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`space-y-4 p-6 ${className}`}>
    <Skeleton variant="rectangular" width="100%" height="200px" className="rounded-lg" />
    <div className="space-y-2">
      <Skeleton variant="text" width="75%" height="1.5rem" />
      <Skeleton variant="text" width="100%" height="1rem" />
      <Skeleton variant="text" width="60%" height="1rem" />
    </div>
  </div>
)

export const AvatarSkeleton = ({ size = '40px', className = '' }: { size?: string; className?: string }) => (
  <Skeleton variant="circular" width={size} height={size} className={className} />
)

export const ButtonSkeleton = ({ className = '' }: { className?: string }) => (
  <Skeleton variant="rounded" width="120px" height="40px" className={className} />
)

export const WorkItemSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-theme-card border border-theme-alt rounded-2xl p-6 ${className}`}>
    <div className="flex items-start gap-4">
      <Skeleton variant="rectangular" width="80px" height="80px" className="rounded-xl" />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" width="60%" height="1.5rem" />
        <Skeleton variant="text" width="100%" height="1rem" />
        <Skeleton variant="text" width="80%" height="1rem" />
        <div className="flex gap-2 mt-4">
          <Skeleton variant="rounded" width="60px" height="24px" />
          <Skeleton variant="rounded" width="80px" height="24px" />
          <Skeleton variant="rounded" width="70px" height="24px" />
        </div>
      </div>
    </div>
  </div>
)

export const ProjectSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-theme-card border border-theme-alt rounded-2xl overflow-hidden ${className}`}>
    <Skeleton variant="rectangular" width="100%" height="200px" />
    <div className="p-6 space-y-3">
      <Skeleton variant="text" width="70%" height="1.5rem" />
      <Skeleton variant="text" width="100%" height="1rem" />
      <Skeleton variant="text" width="90%" height="1rem" />
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <Skeleton variant="rounded" width="50px" height="20px" />
          <Skeleton variant="rounded" width="60px" height="20px" />
        </div>
        <Skeleton variant="rounded" width="80px" height="32px" />
      </div>
    </div>
  </div>
)
