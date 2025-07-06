import Loader from '@/components/loader'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-theme">
      <div className="text-center">
        <Loader size="lg" text="Loading..." />
        <p className="mt-4 text-theme-alt font-saprona-light text-sm">
          Just a moment...
        </p>
      </div>
    </div>
  )
}
