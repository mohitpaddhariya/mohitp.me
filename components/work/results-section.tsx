import React from 'react'

interface MetricCardProps {
  value: string
  description: string
  icon?: React.ReactNode
  color?: 'orange' | 'green' | 'blue' | 'purple'
}

const MetricCard = ({ value, description, icon, color = 'orange' }: MetricCardProps) => {
  const colorClasses = {
    orange: 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400',
    green: 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400',
    blue: 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400',
    purple: 'bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400'
  }

  return (
    <div className={`
      p-4 rounded-lg border transition-all duration-300 hover:scale-105
      ${colorClasses[color]}
    `}>
      <div className="flex items-center space-x-3">
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <div className="font-saprona-semibold text-lg">
            {value}
          </div>
          <div className="font-saprona-light text-sm opacity-75">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ResultsSectionProps {
  title?: string
  metrics: Array<{
    value: string
    description: string
    icon?: React.ReactNode
    color?: 'orange' | 'green' | 'blue' | 'purple'
  }>
  disclaimer?: string
}

const ResultsSection = ({ 
  title = "Results", 
  metrics = [], 
  disclaimer 
}: ResultsSectionProps) => {
  return (
    <div className="my-8 p-6 bg-theme-card border border-theme-alt rounded-xl">
      <h3 className="text-xl font-saprona-semibold text-theme mb-6">{title}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      
      {disclaimer && (
        <p className="text-sm font-bogue-light text-theme-alt italic opacity-75">
          {disclaimer}
        </p>
      )}
    </div>
  )
}

export default ResultsSection
