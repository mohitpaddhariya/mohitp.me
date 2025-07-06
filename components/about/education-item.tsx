import React from 'react'

export interface EducationData {
  institution: string
  degree: string
  focus?: string
  period: string
  gpa?: string
  achievements?: string[]
}

interface EducationItemProps {
  education: EducationData
}

const EducationItem = ({ education }: EducationItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
      <div className="flex-1 space-y-1">
        <div className="flex flex-col justify-start flex-shrink-0">
          <p className="text-lg sm:text-xl font-saprona-semibold text-theme">
            {education.institution}
          </p>
        </div>
        <div className="flex flex-col justify-start flex-shrink-0">
          <p className="text-base sm:text-lg font-saprona-light text-theme-alt">
            {education.degree}
          </p>
          {education.focus && (
            <p className="text-sm sm:text-base font-saprona-light text-theme-muted mt-1">
              {education.focus}
            </p>
          )}
          {(education.gpa || education.achievements) && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-1">
              {education.gpa && (
                <p className="text-sm sm:text-base font-saprona-light text-theme-muted">
                  GPA: <span className="text-theme">{education.gpa}</span>
                </p>
              )}
              {education.achievements && education.achievements.map((achievement, index) => (
                <p key={index} className="text-sm sm:text-base font-saprona-light text-theme-muted">
                  <span className="text-theme">{achievement}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start flex-shrink-0">
        <p className="text-base sm:text-lg font-saprona-light text-theme-alt">
          {education.period}
        </p>
      </div>
    </div>
  )
}

export default EducationItem
