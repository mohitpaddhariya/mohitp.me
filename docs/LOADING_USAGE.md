# Loading Components Usage Guide

This guide shows how to use the loading components in your Next.js application.

## Available Components

### 1. Basic Loader Component
```tsx
import Loader from '@/components/loader'

// Basic usage
<Loader size="md" text="Loading..." />

// Full screen loader
<Loader size="lg" fullScreen text="Loading page..." />

// Minimal loader (no text)
<Loader size="sm" minimal />
```

### 2. Pre-configured Loader Variants
```tsx
import { PageLoader, ComponentLoader, ButtonLoader, InlineLoader } from '@/components/loader'

// Full screen page loader
<PageLoader />

// Component loader with padding
<ComponentLoader />

// Small loader for buttons
<ButtonLoader />

// Inline loader with custom text
<InlineLoader text="Saving..." />
```

### 3. Skeleton Loaders
```tsx
import Skeleton, { TextSkeleton, CardSkeleton, WorkItemSkeleton } from '@/components/skeleton'

// Basic skeleton
<Skeleton width="100%" height="20px" />

// Text skeleton with multiple lines
<TextSkeleton lines={3} />

// Card skeleton
<CardSkeleton />

// Work item skeleton
<WorkItemSkeleton />
```

### 4. Loading Provider & Hook
```tsx
import { useLoading } from '@/components/loading-provider'

function MyComponent() {
  const { showLoader, hideLoader } = useLoading()

  const handleAsyncOperation = async () => {
    showLoader('Processing...')
    try {
      await someAsyncOperation()
    } finally {
      hideLoader()
    }
  }

  return <button onClick={handleAsyncOperation}>Start Operation</button>
}
```

### 5. Higher-Order Component (HOC)
```tsx
import { withLoading } from '@/components/with-loading'

const MyComponent = () => {
  // Your component logic
  return <div>Content</div>
}

export default withLoading(MyComponent)
```

### 6. Loading Wrapper
```tsx
import { LoadingWrapper } from '@/components/with-loading'
import { useAsyncOperation } from '@/hooks/useLoading'

function MyComponent() {
  const { isLoading, error, data, execute } = useAsyncOperation()

  const loadData = () => {
    execute(async () => {
      const response = await fetch('/api/data')
      return response.json()
    })
  }

  return (
    <LoadingWrapper isLoading={isLoading} error={error} retry={loadData}>
      {data && <div>{JSON.stringify(data)}</div>}
    </LoadingWrapper>
  )
}
```

## Usage Examples

### Page-level Loading
```tsx
// app/my-page/page.tsx
import { Suspense } from 'react'
import { ComponentLoader } from '@/components/loader'

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <Suspense fallback={<ComponentLoader />}>
        <AsyncComponent />
      </Suspense>
    </div>
  )
}
```

### Component-level Loading
```tsx
'use client'

import { useState } from 'react'
import { useLoading } from '@/components/loading-provider'
import { ButtonLoader } from '@/components/loader'

export default function MyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showLoader, hideLoader } = useLoading()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    showLoader('Submitting form...')
    
    try {
      await submitForm(formData)
    } finally {
      setIsSubmitting(false)
      hideLoader()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <ButtonLoader /> : 'Submit'}
      </button>
    </form>
  )
}
```

### Data Fetching with Loading States
```tsx
'use client'

import { useEffect, useState } from 'react'
import { WorkItemSkeleton } from '@/components/skeleton'
import { LoadingWrapper } from '@/components/with-loading'

export default function WorkList() {
  const [workItems, setWorkItems] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkItems = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/work-items')
        const data = await response.json()
        setWorkItems(data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkItems()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <WorkItemSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <LoadingWrapper isLoading={isLoading} error={error}>
      {workItems?.map((item) => (
        <WorkItem key={item.id} {...item} />
      ))}
    </LoadingWrapper>
  )
}
```

### Navigation Loading
```tsx
'use client'

import { useNavigationLoading } from '@/hooks/useLoading'
import { PageLoader } from '@/components/loader'

export default function NavigationLoader() {
  const isLoading = useNavigationLoading()

  return isLoading ? <PageLoader /> : null
}
```

## Best Practices

1. **Use appropriate loader sizes**:
   - `sm` for buttons and inline elements
   - `md` for components
   - `lg` for pages and major sections
   - `xl` for full-screen important operations

2. **Provide meaningful loading text**:
   ```tsx
   <Loader text="Saving your changes..." />
   <Loader text="Loading work items..." />
   <Loader text="Processing payment..." />
   ```

3. **Use skeleton loaders for content**:
   - Better UX than spinners for content that has predictable layout
   - Matches the actual content structure

4. **Handle loading states gracefully**:
   - Always provide error states
   - Include retry functionality
   - Show progress when possible

5. **Optimize performance**:
   - Use `Suspense` boundaries appropriately
   - Lazy load heavy components
   - Avoid too many concurrent loaders

## Accessibility

The loading components include:
- ARIA labels and roles
- Screen reader announcements
- Respect for `prefers-reduced-motion`
- Proper focus management

## Theme Integration

All loading components automatically follow your theme:
- Use CSS custom properties for colors
- Respond to light/dark mode changes
- Match your design system typography
- Support all your custom font weights and families
