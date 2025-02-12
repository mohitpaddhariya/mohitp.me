import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Command, ExternalLink, Sun, Moon } from 'lucide-react';
import CommandMenu from './components/command-menu';
import LightTrail from './components/light-trail';

/**
 * @author Mohit Paddhariya
 */

const App = () => {

    const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
    const [data, setData] = useState(null);
    const [visibleProjects, setVisibleProjects] = useState(2);
    const [theme, setTheme] = useState('dark');
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('./data.json');
            const data = await res.json();
            setData(data);
        };

        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        fetchData();
    }, []);

    useEffect(() => {
        // Check if the user is on macOS
        const checkPlatform = () => {
            const platform = navigator.platform.toLowerCase();
            setIsMac(platform.includes('mac'));
        };

        checkPlatform();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (!data) return null;

    const themeStyles = {
        dark: {
            background: 'bg-gradient-to-b from-gray-900 to-black',
            text: 'text-gray-200',
            card: 'bg-gray-900/30',
            cardBorder: 'border-gray-800',
            skillBox: 'bg-gray-800/50',
            textSecondary: 'text-gray-400',
            textTertiary: 'text-gray-500',
            hover: 'hover:bg-gray-800',
            footer: 'bg-gray-900'
        },
        light: {
            background: 'bg-gradient-to-b from-gray-50 to-white',
            text: 'text-gray-900',
            card: 'bg-white',
            cardBorder: 'border-gray-200',
            skillBox: 'bg-gray-100',
            textSecondary: 'text-gray-600',
            textTertiary: 'text-gray-500',
            hover: 'hover:bg-gray-100',
            footer: 'bg-white'
        }
    };

    const currentTheme = themeStyles[theme];

    return (
        <div className={`pt-10 min-h-screen ${currentTheme.background} ${currentTheme.text} font-mono relative overflow-hidden selection:bg-purple-500/30 selection:text-${theme === 'dark' ? 'white' : 'black'}`}>
            {/* Command Menu */}
            <CommandMenu
                isOpen={isCommandMenuOpen}
                setIsOpen={setIsCommandMenuOpen}
                commands={data.commandMenu}
                theme={theme}
            />

            {/* Light Trail */}
            <LightTrail theme={theme} />

            {/* Theme effects */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className={`absolute top-0 left-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-200/30'} rounded-full filter blur-3xl`}></div>
                <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-200/30'} rounded-full filter blur-3xl`}></div>
            </div>

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className={`fixed top-4 right-4 p-2 rounded-lg ${currentTheme.hover} ${currentTheme.footer} z-20 ${currentTheme.cardBorder} transition-colors`}
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-12 sm:mb-20">
                    <div className="text-center sm:text-left mb-8 sm:mb-0">
                        <h1 className="text-3xl sm:text-4xl font-light mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                            {data.profile.name}
                        </h1>
                        <p className={`${currentTheme.textSecondary} mb-6 text-base sm:text-lg`}>
                            {data.profile.role} • {data.profile.tagline}
                        </p>
                        <div className="flex space-x-6 justify-center sm:justify-start">
                            <a href={`mailto:${data.profile.email}`} className={`${currentTheme.textSecondary} hover:text-purple-400 transition-colors`}>
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href={data.profile.github} className={`${currentTheme.textSecondary} hover:text-pink-400 transition-colors`}>
                                <Github className="w-5 h-5" />
                            </a>
                            <a href={data.profile.linkedin} className={`${currentTheme.textSecondary} hover:text-blue-400 transition-colors`}>
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="w-24 h-24 sm:w-32 sm:h-32 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-lg transform rotate-6 group-hover:rotate-12 transition-transform"></div>
                        <img src={data.profile.image} alt="Profile" className="relative w-full rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* About Section */}
                <section className="mb-12 sm:mb-20">
                    <h2 className="text-sm uppercase tracking-widest text-purple-400 mb-4">About</h2>
                    <p className={`${currentTheme.textSecondary} text-base sm:text-lg leading-relaxed max-w-2xl`}>
                        {data.about}
                    </p>
                </section>

                {/* Work Experience Section */}
                <section className="mb-12 sm:mb-20">
                    <h2 className="text-sm uppercase tracking-widest text-pink-400 mb-4">Work Experience</h2>
                    <div className="space-y-8">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="group">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                    <h3 className={`text-xl group-hover:text-pink-400 transition-colors ${currentTheme.text}`}>
                                        {exp.title}
                                    </h3>
                                    <span className={currentTheme.textTertiary}>{exp.period}</span>
                                </div>
                                <p className={`${currentTheme.textTertiary} mb-2`}>{exp.company} | {exp.type}</p>
                                <p className={currentTheme.textSecondary}>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Section */}
                <section className="mb-12 sm:mb-20">
                    <h2 className="text-sm uppercase tracking-widest text-blue-400 mb-6">Skills</h2>
                    <div className="space-y-3">
                        <div className={`${currentTheme.skillBox} py-2 px-4 rounded-md`}>
                            <span className={`${currentTheme.textSecondary} mr-3`}>AI/ML/DL:</span>
                            <span>{data.skills.languages.join(', ')}</span>
                        </div>

                        <div className={`${currentTheme.skillBox} py-2 px-4 rounded-md`}>
                            <span className={`${currentTheme.textSecondary} mr-3`}>Web Technologies:</span>
                            <span>{data.skills.webTechnologies.join(', ')}</span>
                        </div>

                        <div className={`${currentTheme.skillBox} py-2 px-4 rounded-md`}>
                            <span className={`${currentTheme.textSecondary} mr-3`}>Databases:</span>
                            <span>{data.skills.databases.join(', ')}</span>
                        </div>

                        <div className={`${currentTheme.skillBox} py-2 px-4 rounded-md`}>
                            <span className={`${currentTheme.textSecondary} mr-3`}>DevOps & Cloud:</span>
                            <span>{data.skills.devOps.join(', ')}</span>
                        </div>
                    </div>
                </section>

                {/* Open Source Section */}
                <section className="mb-12 sm:mb-20">
                    <h2 className="text-sm uppercase tracking-widest text-green-400 mb-6">Open Source Contributions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.openSource.slice(0, visibleProjects).map((project, index) => (
                            <div
                                key={index}
                                className={`group ${currentTheme.card} rounded-xl overflow-hidden border ${currentTheme.cardBorder} hover:border-green-500/50 transition-all duration-300`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Github className={`w-5 h-5 ${currentTheme.textSecondary} group-hover:text-green-400 transition-colors`} />
                                            <h3 className={`text-lg font-medium ${currentTheme.text} group-hover:text-green-400 transition-colors`}>
                                                {project.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className={`${currentTheme.textSecondary} mb-4 line-clamp-2`}>{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className={`px-2.5 py-1 ${currentTheme.skillBox} ${currentTheme.text} text-sm rounded-md`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {project.issueNumber && (
                                            <span className={`text-sm ${currentTheme.textTertiary}`}>
                                                Issue #{project.issueNumber}
                                            </span>
                                        )}
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 text-sm ${currentTheme.textSecondary} hover:text-green-400 transition-colors ml-auto`}
                                        >
                                            View PR #{project.prNumber}
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleProjects < data.openSource.length && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setVisibleProjects(prev => prev + 4)}
                                className="px-6 py-2 border border-green-500/30 hover:border-green-500/60 rounded-lg text-green-400 hover:text-green-300 transition-colors"
                            >
                                View More Contributions
                            </button>
                        </div>
                    )}
                </section>

                {/* Projects Section */}
                <section className="mb-12 sm:mb-20">
                    <h2 className="text-sm uppercase tracking-widest text-purple-400 mb-6">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.projects.slice(0, visibleProjects).map((project, index) => (
                            <div
                                key={index}
                                className={`group ${currentTheme.card} rounded-xl overflow-hidden border ${currentTheme.cardBorder} hover:border-purple-500/50 transition-all duration-300`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Github className={`w-5 h-5 ${currentTheme.textSecondary} group-hover:text-purple-400 transition-colors`} />
                                            <h3 className={`text-lg font-medium ${currentTheme.text} group-hover:text-purple-400 transition-colors`}>
                                                {project.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className={`${currentTheme.textSecondary} mb-4 line-clamp-2`}>{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className={`px-2.5 py-1 ${currentTheme.skillBox} ${currentTheme.text} text-sm rounded-md`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {project.link && (
                                        <div className="flex items-center justify-end">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center gap-2 text-sm ${currentTheme.textSecondary} hover:text-purple-400 transition-colors`}
                                            >
                                                View Project
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleProjects < data.projects.length && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setVisibleProjects(prev => prev + 4)}
                                className="px-6 py-2 border border-purple-500/30 hover:border-purple-500/60 rounded-lg text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                View More Projects
                            </button>
                        </div>
                    )}
                </section>

                {/* Education Section */}
                <section className="mb-12 sm:mb-20">
                    <h2 className="text-sm uppercase tracking-widest text-pink-400 mb-4">Education</h2>
                    <div className="space-y-8">
                        {data.education.map((edu, index) => (
                            <div key={index} className="group">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                    <h3 className={`text-xl ${currentTheme.text} group-hover:text-pink-400 transition-colors`}>
                                        {edu.institution}
                                    </h3>
                                    <span className={currentTheme.textTertiary}>{edu.period}</span>
                                </div>
                                <p className={currentTheme.textSecondary}>{edu.degree}</p>
                                {edu.gpa && <p className={`${currentTheme.textTertiary} mt-2`}>GPA: {edu.gpa}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <div className={`fixed bottom-0 left-0 w-full flex justify-center border-t ${currentTheme.footer} ${currentTheme.text} ${currentTheme.cardBorder} text-sm`}>
                    <button
                        onClick={() => setIsCommandMenuOpen(true)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme.hover} hover:text-purple-400 transition-colors`}
                    >
                        <span>Press {isMac ? '⌘' : 'Ctrl'} + J to open command menu</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;