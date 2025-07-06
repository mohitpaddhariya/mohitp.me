import React from 'react'
import Image from 'next/image'

interface ProfileSectionProps {
  name: string
  role: string
  description: string[]
  imageSrc: string
  imageAlt: string
}

const ProfileSection = ({ name, role, description, imageSrc, imageAlt }: ProfileSectionProps) => {
  return (
    <>
      {/* Mobile Layout - Photo first, then content */}
      <div className="flex flex-col md:hidden gap-6">
        {/* Profile Image - Mobile */}
        <div className="self-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Content - Mobile */}
        <div className="space-y-4 hero-subtitle">
          {description.map((text, index) => (
            <h1 key={index} className="text-lg sm:text-xl font-bogue-thin text-theme leading-tight">
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </h1>
          ))}
        </div>
      </div>

      {/* Medium and Large Layout - Side by side */}
      <div className="hidden md:flex md:justify-between md:items-center lg:items-around gap-8 lg:gap-16">
        {/* Text Content - Medium/Large */}
        <div className="flex flex-col justify-center lg:justify-start space-y-6 lg:space-y-8 flex-1 max-w-2xl hero-subtitle">
          {description.map((text, index) => (
            <h1 key={index} className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bogue-thin text-theme leading-tight">
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </h1>
          ))}
        </div>

        {/* Profile Image - Medium/Large */}
        <div className="flex-shrink-0">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileSection
