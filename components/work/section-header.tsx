interface SectionHeaderProps {
  title: string
  className?: string
}

const SectionHeader = ({ title, className = "" }: SectionHeaderProps) => {
  return (
    <div className={`mb-6 sm:mb-10 lg:mb-16 ${className}`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bogue-regular text-theme leading-tight tracking-tight">
        {title}
      </h2>
    </div>
  )
}

export default SectionHeader
