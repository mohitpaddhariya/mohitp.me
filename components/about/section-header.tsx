import React from 'react'

interface SectionHeaderProps {
  title: string
  className?: string
}

const SectionHeader = ({ title, className = "" }: SectionHeaderProps) => {
  return (
    <h2 className={`text-xl sm:text-2xl md:text-3xl font-bogue-semibold text-theme mb-6 lg:mb-8 ${className}`}>
      {title}
    </h2>
  )
}

export default SectionHeader
