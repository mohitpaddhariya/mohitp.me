import React from 'react'

export interface ExperienceData {
  title: string
  company: string
  location: string
  year: string
}

interface ExperienceItemProps {
  experience: ExperienceData
  showBorder?: boolean
}

const ExperienceItem = ({ experience, showBorder = true }: ExperienceItemProps) => {
  return (
    <div className={`flex justify-between items-start py-6 ${showBorder ? 'border-b border-theme-border' : ''}`}>
      <div className="flex flex-col">
        <div className="flex flex-col justify-start flex-shrink-0">
          <p className="text-base sm:text-lg font-saprona-semibold text-theme">
            {experience.title}
          </p>
        </div>
        <div className="flex flex-col justify-start flex-shrink-0">
          <p className="text-base sm:text-lg font-saprona-light text-theme-alt">
            {experience.company}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start flex-shrink-0">
        <p className="text-base sm:text-lg font-saprona-light text-theme-alt">
          {experience.year}
        </p>
      </div>
    </div>
  )
}

export default ExperienceItem
