import Link from "next/link"
import Image from "next/image"

interface WorkItemProps {
  title: string[]
  company: string
  companyLogo?: string // Optional logo prop
  period: string
  type: string
  href?: string
  slug?: string // Add slug prop for dynamic routing
}

const WorkItem = ({ title, company, companyLogo, period, type, href, slug }: WorkItemProps) => {
  // Use slug for work detail page or fallback to href
  const linkHref = slug ? `/work/${slug}` : (href || "/")

  return (
    <Link href={linkHref}>
      <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
        {/* Mobile Layout - Stack vertically */}
        <div className="block md:hidden space-y-4">
          {/* Content First on Mobile */}
          <div className="space-y-3">
            <div>
              {title.map((line, index) => (
                <h3 key={index} className="text-lg font-saprona-semibold text-theme transition-colors duration-300 leading-tight group-hover:text-[color:var(--theme-link-hover)]">
                  {line}
                </h3>
              ))}
            </div>

            <div className="border-t border-theme-alt w-12 group-hover:w-full my-4 transition-all duration-300 group-hover:border-[color:var(--theme-link-hover)]"></div>

            <div className="space-y-1">
              <p className="text-sm font-saprona-medium text-theme uppercase tracking-wider transition-colors duration-300 group-hover:text-[color:var(--theme-link-hover)]">
                {company}
              </p>
              <p className="text-sm font-saprona-regular text-theme-alt transition-colors duration-300 group-hover:text-[color:var(--theme-link-hover)]">
                {period}
              </p>
              <p className="text-sm font-saprona-light text-theme-alt transition-colors duration-300 group-hover:text-[color:var(--theme-link-hover)]">
                {type}
              </p>
            </div>
          </div>

          {/* Image Below on Mobile */}
          <div className="w-full">
            <div className="w-full aspect-video bg-theme-card border border-theme-alt rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
              {companyLogo ? (
                <Image
                  src={companyLogo}
                  width={400}
                  height={225}
                  alt={`${company} work preview`}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-90"
                  priority
                  quality={85}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-theme-alt">
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Grid layout */}
        <div className="hidden md:grid grid-cols-10 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Column - Content */}
          <div className="col-span-5 lg:col-span-3 space-y-3 sm:space-y-4">
            <div>
              {title.map((line, index) => (
                <h3 key={index} className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-saprona-semibold text-theme transition-colors duration-300 leading-tight group-hover:text-[color:var(--theme-link-hover)]">
                  {line}
                </h3>
              ))}
            </div>

            <div className="border-t border-theme-alt w-16 group-hover:w-full my-6 transition-all duration-300 group-hover:border-[color:var(--theme-link-hover)]"></div>

            <div className="space-y-2">
              <p className="text-base lg:text-lg font-saprona-medium text-theme uppercase tracking-wider transition-colors duration-300 group-hover:text-[color:var(--theme-link-hover)]">
                {company}
              </p>
              <p className="text-base lg:text-lg font-saprona-regular text-theme-alt transition-colors duration-300 group-hover:text-[color:var(--theme-link-hover)]">
                {period}
              </p>
              <p className="text-base lg:text-lg font-saprona-light text-theme-alt transition-colors duration-300 group-hover:text-[color:var(--theme-link-hover)]">
                {type}
              </p>
            </div>
          </div>

          {/* Right Column - Image Container */}
          <div className="col-span-5 lg:col-span-7 flex items-center justify-center">
            <div className="w-full aspect-video bg-theme-card border border-theme-alt rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
              {companyLogo ? (
                <Image
                  src={companyLogo}
                  width={600}
                  height={338}
                  alt={`${company} work preview`}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-90"
                  priority
                  quality={85}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-theme-alt">
                  <span className="text-lg">No image available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default WorkItem
