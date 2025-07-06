interface HeroSectionProps {
  title: string
  subtitle: React.ReactNode
}

const HeroSection = ({ title, subtitle }: HeroSectionProps) => {
  return (
    <div className="max-w-4xl">
      {/* Main Title */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] font-bogue-light text-theme leading-[0.9] tracking-tight">
            Hi! I&apos;m
          </h1>
        </div>
        <div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] font-bogue-medium text-theme leading-[0.9] tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Subtitle */}
      <div>
        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-saprona-light text-theme-alt leading-tight tracking-tight max-w-4xl">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default HeroSection
