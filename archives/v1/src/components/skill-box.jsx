import React from 'react';

const SkillBox = ({ category, skills, theme }) => {
    // Convert category string to title case for display
    const formatCategory = (str) => {
        return str
            .split(/(?=[A-Z])/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div 
            className={`${theme.skillBox} py-2 px-4 rounded-md`}
            role="group"
            aria-labelledby={`skill-category-${category}`}
        >
            <span 
                id={`skill-category-${category}`}
                className={`${theme.textSecondary} mr-3 font-medium`}
            >
                {formatCategory(category)}:
            </span>
            <span className="text-sm">
                {skills.map((skill, index) => (
                    <React.Fragment key={skill}>
                        <span className={theme.text}>{skill}</span>
                        {index < skills.length - 1 && <span className={theme.textTertiary}>, </span>}
                    </React.Fragment>
                ))}
            </span>
        </div>
    );
};

export default SkillBox;