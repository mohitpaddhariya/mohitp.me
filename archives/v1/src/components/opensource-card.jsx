import React from 'react';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

const OpenSourceCard = ({ project, theme }) => {
    return (
        <article 
            className={`group relative ${theme.card} rounded-xl overflow-hidden border 
            ${theme.cardBorder} hover:border-green-500/50 transition-all duration-300`}
        >
            {/* Subtle gradient overlay on hover that works with both themes */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 
                group-hover:from-green-500/5 group-hover:to-green-500/10 transition-all duration-300" 
            />

            <div className="relative p-6">
                {/* Header section */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${theme.skillBox} 
                            group-hover:bg-green-500/10 transition-colors duration-300`}>
                            <Github className={`w-5 h-5 ${theme.textSecondary} 
                                group-hover:text-green-400 transition-colors`} />
                        </div>
                        <h3 className={`text-lg font-semibold ${theme.text} 
                            group-hover:text-green-400 transition-colors`}>
                            {project.name}
                        </h3>
                    </div>
                </div>

                {/* Description */}
                <p className={`${theme.textSecondary} mb-6 line-clamp-2 leading-relaxed`}>
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className={`px-3 py-1.5 ${theme.skillBox} ${theme.text} text-sm 
                                rounded-lg font-medium group-hover:bg-green-500/10 
                                group-hover:text-green-500 transition-colors duration-200`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Footer section */}
                <div className={`flex items-center justify-between pt-4 border-t ${theme.cardBorder}`}>
                    {project.issueNumber && (
                        <span className={`text-sm ${theme.textTertiary} 
                            px-3 py-1 rounded-full ${theme.skillBox}`}>
                            Issue #{project.issueNumber}
                        </span>
                    )}
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 text-sm font-medium
                            ${theme.textSecondary} hover:text-green-400 
                            transition-colors ml-auto group/link`}
                        aria-label={`View pull request #${project.prNumber} for ${project.name}`}
                    >
                        View PR #{project.prNumber}
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 
                            group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                </div>

                {/* Impact section */}
                {project.impact && (
                    <div className={`mt-4 p-3 rounded-lg ${theme.skillBox}`}>
                        <p className={`text-sm ${theme.textTertiary} leading-relaxed`}>
                            <span className="font-medium text-green-500">Impact:</span> {project.impact}
                        </p>
                    </div>
                )}
            </div>
        </article>
    );
};

export default OpenSourceCard;