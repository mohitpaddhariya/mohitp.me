import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ProjectItemProps {
  title: string
  description: React.ReactNode
  buttonText?: string
  buttonHref?: string
  imagePosition?: "left" | "right"
}

const ProjectItem = ({ 
  title, 
  description, 
  buttonText, 
  buttonHref = "#", 
  imagePosition = "left" 
}: ProjectItemProps) => {
  const isImageLeft = imagePosition === "left"

  return (
    <div>
      {/* Mobile Layout - Stack vertically */}
      <div className="block md:hidden space-y-6">
        {/* Content First on Mobile */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-saprona-semibold text-theme leading-tight">
              {title}
            </h3>
          </div>

          <div className="space-y-4">
            <div className="text-base font-saprona-light text-theme leading-relaxed">
              {description}
            </div>
            
            {buttonText && (
              <div className="flex flex-wrap gap-3">
                <Link href={buttonHref}>
                  <button className="text-sm font-saprona-medium text-theme hover:text-[color:var(--theme-link-hover)] border border-theme-alt/10 hover:border-[color:var(--theme-link-hover)] bg-theme-card/50 hover:bg-theme-card/80 px-5 py-3 rounded-lg transition-all duration-300 flex items-center gap-2">
                    <span>{buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Image Below on Mobile */}
        <div className="w-full">
          <div className="w-full aspect-[4/2.7] bg-theme-card border border-theme-alt rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-lg font-bogue-medium text-theme-alt/40">
                {title.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Side by side */}
      <div className="hidden md:grid grid-cols-10 gap-6 md:gap-8 lg:gap-12 items-start">
        {/* Image Container */}
        <div className={`col-span-5 flex items-center justify-center ${isImageLeft ? 'order-1' : 'order-2'}`}>
          <div className="w-full aspect-[4/2.7] bg-theme-card border border-theme-alt rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bogue-medium text-theme-alt/40">
                {title.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`col-span-5 space-y-4 sm:space-y-6 ${isImageLeft ? 'order-2' : 'order-1'}`}>
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-saprona-semibold text-theme leading-tight">
              {title}
            </h3>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-saprona-light text-theme leading-relaxed">
              {description}
            </div>
            
            {buttonText && (
              <div className="flex flex-wrap gap-3">
                <Link href={buttonHref}>
                  <button className="text-sm sm:text-base lg:text-lg font-saprona-medium text-theme hover:text-[color:var(--theme-link-hover)] border border-theme-alt/10 hover:border-[color:var(--theme-link-hover)] bg-theme-card/50 hover:bg-theme-card/80 px-5 py-3 rounded-lg transition-all duration-300 flex items-center gap-2">
                    <span>{buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
