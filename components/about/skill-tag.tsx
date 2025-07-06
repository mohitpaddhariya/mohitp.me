import React from 'react'

interface SkillTagProps {
  skill: string
  isHighlighted?: boolean
}

const SkillTag = ({ skill, isHighlighted = false }: SkillTagProps) => {
  const baseClasses = "px-3 py-1 text-sm font-saprona-light bg-theme-card border rounded-full text-theme transition-all duration-200 cursor-pointer"
  
  const hoverClasses = isHighlighted 
    ? "border-theme hover:border-theme hover:shadow-md hover:scale-105"
    : "border-theme-border hover:border-theme hover:shadow-sm"

  return (
    <span className={`${baseClasses} ${hoverClasses}`}>
      {skill}
    </span>
  )
}

export default SkillTag
