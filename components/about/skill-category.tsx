import React from 'react'
import SkillTag from './skill-tag'

export interface SkillCategoryData {
  title: string
  skills: Array<{
    name: string
    isHighlighted?: boolean
  }>
}

interface SkillCategoryProps {
  category: SkillCategoryData
}

const SkillCategory = ({ category }: SkillCategoryProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-saprona-semibold text-theme">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, index) => (
          <SkillTag 
            key={index} 
            skill={skill.name} 
            isHighlighted={skill.isHighlighted}
          />
        ))}
      </div>
    </div>
  )
}

export default SkillCategory
