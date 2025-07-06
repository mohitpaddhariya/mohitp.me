import React from 'react';
import { GraduationCap, Calendar, Target, Award, Trophy } from 'lucide-react';

const EducationItem = ({ education, theme }) => {
    return (
        <article className={`group p-4 rounded-xl border border-transparent 
            hover:border-pink-500/20 hover:bg-pink-50/5 transition-all duration-300`}>
            {/* Header with institution and period */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${theme.skillBox} 
                        group-hover:bg-pink-500/10 transition-colors duration-300`}>
                        <GraduationCap className={`w-5 h-5 ${theme.textSecondary} 
                            group-hover:text-pink-400 transition-colors`} />
                    </div>
                    <h3 className={`text-xl font-semibold ${theme.text} 
                        group-hover:text-pink-400 transition-colors`}>
                        {education.institution}
                    </h3>
                </div>
                
                <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${theme.textTertiary}`} />
                    <time 
                        className={`${theme.textTertiary} text-sm font-medium`} 
                        dateTime={education.period}
                    >
                        {education.period}
                    </time>
                </div>
            </div>
            
            {/* Degree with enhanced styling */}
            <div className={`flex items-center gap-2 mb-3 pl-12`}>
                <p className={`${theme.textSecondary} font-medium`}>
                    {education.degree}
                </p>
            </div>
            
            {/* Additional details with icons */}
            <div className="space-y-2 pl-12">
                {education.focus && (
                    <div className="flex items-center gap-2">
                        <Target className={`w-4 h-4 ${theme.textTertiary} 
                            group-hover:text-pink-400 transition-colors`} />
                        <p className={`${theme.textTertiary} text-sm`}>
                            <span className="font-medium">Focus:</span> {education.focus}
                        </p>
                    </div>
                )}
                
                {education.gpa && (
                    <div className="flex items-center gap-2">
                        <Award className={`w-4 h-4 ${theme.textTertiary} 
                            group-hover:text-pink-400 transition-colors`} />
                        <p className={`${theme.textTertiary} text-sm`}>
                            <span className="font-medium">GPA:</span> {education.gpa}
                        </p>
                    </div>
                )}
                
                {education.achievements && (
                    <div className={`flex items-center gap-2 mt-2 p-2 rounded-lg 
                        ${theme.skillBox} group-hover:bg-pink-500/5 transition-colors`}>
                        <Trophy className={`w-4 h-4 text-pink-400 flex-shrink-0`} />
                        <p className={`${theme.textTertiary} text-sm italic leading-relaxed`}>
                            {education.achievements}
                        </p>
                    </div>
                )}
            </div>
        </article>
    );
};

export default EducationItem;