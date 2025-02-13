import React from 'react';
import { Github, ExternalLink, Rocket, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, theme }) => {
    return (
        <article className={`group relative ${theme.card} rounded-xl overflow-hidden border 
            ${theme.cardBorder} hover:border-purple-500/50 transition-all duration-300`}>
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 
                group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-all duration-300" 
            />

            <div className="relative p-6">
                {/* Header section */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${theme.skillBox} 
                            group-hover:bg-purple-500/10 transition-colors duration-300`}>
                            <Github className={`w-5 h-5 ${theme.textSecondary} 
                                group-hover:text-purple-400 transition-colors`} />
                        </div>
                        <h3 className={`text-lg font-semibold ${theme.text} 
                            group-hover:text-purple-400 transition-colors`}>
                            {project.name}
                        </h3>
                    </div>
                    
                    <div className={`p-2 rounded-lg ${theme.skillBox} opacity-0 group-hover:opacity-100 
                        transition-all duration-300 -translate-y-1 group-hover:translate-y-0`}>
                        <Rocket className={`w-4 h-4 ${theme.textSecondary}`} />
                    </div>
                </div>

                {/* Description with improved typography */}
                <p className={`${theme.textSecondary} mb-6 line-clamp-2 leading-relaxed`}>
                    {project.description}
                </p>

                {/* Technologies with enhanced styling */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className={`px-3 py-1.5 ${theme.skillBox} ${theme.text} text-sm 
                                rounded-lg font-medium group-hover:bg-purple-500/10 
                                group-hover:text-purple-500 transition-colors duration-200`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Project highlights with improved styling */}
                {project.highlights && (
                    <div className={`mb-6 p-4 rounded-lg ${theme.skillBox}`}>
                        <ul className={`${theme.textSecondary} space-y-2`}>
                            {project.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <ArrowUpRight className="w-4 h-4 mt-0.5 text-purple-400" />
                                    <span className="leading-relaxed">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Project link with enhanced interaction */}
                {project.link && (
                    <div className="flex items-center justify-end pt-4 border-t border-dashed border-purple-500/20">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-sm font-medium 
                                ${theme.textSecondary} hover:text-purple-400 
                                transition-colors group/link`}
                            aria-label={`View ${project.name} project`}
                        >
                            View Project
                            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 
                                group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
};

export default ProjectCard;