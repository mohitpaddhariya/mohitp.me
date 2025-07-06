import React from 'react';

const ExperienceItem = ({ experience, theme }) => {
  const {
    title,
    period,
    company,
    type,
    description,
    technologies,
    highlights
  } = experience;

  return (
    <article className={`group p-6 rounded-xl border ${theme.cardBorder} ${theme.card}
      ${theme.hover} transition-all duration-300`}>
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div className="space-y-1">
          <h3 className={`text-xl font-semibold group-hover:text-pink-500 transition-colors ${theme.text}`}>
            {title}
          </h3>
          <div className={`${theme.textTertiary} text-sm flex items-center gap-2`}>
            <span className="font-medium">{company}</span>
            |
            <span>{type}</span>
          </div>
        </div>
        <time 
          className={`text-sm ${theme.textTertiary} px-3 py-1 rounded-full ${theme.skillBox}`} 
          dateTime={period}
        >
          {period}
        </time>
      </header>

      {/* Description */}
      <div className={`${theme.textSecondary} space-y-3 mb-6`}>
        {description.split('\n').map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-lg
                  ${theme.skillBox} ${theme.text}
                  transition-colors duration-200
                  hover:bg-pink-500/10 hover:text-pink-500
                `}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <div className={`${theme.skillBox} rounded-lg p-4`}>
          <ul className="space-y-3">
            {highlights.map((highlight, index) => (
              <li 
                key={index} 
                className={`text-sm ${theme.textSecondary} flex items-start gap-3`}
              >
                <span className="w-2 h-2 mt-1.5 rounded-full bg-pink-500/80 shrink-0
                  group-hover:bg-pink-400 transition-colors" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default ExperienceItem;