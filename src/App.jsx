import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';

// Import components
import CommandMenu from './components/command-menu';
import LightTrail from './components/light-trail';
import ProjectCard from './components/project-card';
import OpenSourceCard from './components/opensource-card';
import SkillBox from './components/skill-box';
import ExperienceItem from './components/experience-item';
import EducationItem from './components/education-item';
import SEO from './components/SEO';
import GoogleAnalytics from './components/google-analytics';

/**
 * @author Mohit Paddhariya
 */

const App = () => {
    const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
    const [data, setData] = useState(null);
    const [visibleProjects, setVisibleProjects] = useState(4);
    const [theme, setTheme] = useState('dark');
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/data.json');
                const jsonData = await res.json();
                setData(jsonData);
                // Add schema markup
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.text = JSON.stringify(jsonData.seoMetadata.schema);
                document.head.appendChild(script);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        fetchData();

        // Cleanup schema script
        return () => {
            const scripts = document.getElementsByTagName('script');
            for (let script of scripts) {
                if (script.type === 'application/ld+json') {
                    script.remove();
                }
            }
        };
    }, []);

    useEffect(() => {
        // Check if user is on macOS
        const checkPlatform = () => {
            const platform = navigator.platform.toLowerCase();
            setIsMac(platform.includes('mac'));
        };
        checkPlatform();
    }, []);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
                e.preventDefault();
                setIsCommandMenuOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
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
        <>
            {/* Google Analytics */}
            <GoogleAnalytics trackingId={data.seoMetadata.googleAnalytics} />

            <SEO
                title={data.seoMetadata.title}
                description={data.seoMetadata.description}
                keywords={data.seoMetadata.keywords.join(', ')}
                ogImage={`${data.seoMetadata.canonicalUrl}${data.profile.image}`}
                canonical={data.seoMetadata.canonicalUrl}
                ogDescription={data.seoMetadata.ogDescription}
                ogLocale={data.seoMetadata.og_locale}
            />

            <main className={`pt-10 min-h-screen ${currentTheme.background} ${currentTheme.text} font-mono relative overflow-hidden selection:bg-purple-500/30 selection:text-${theme === 'dark' ? 'white' : 'black'}`}>
                <CommandMenu
                    isOpen={isCommandMenuOpen}
                    setIsOpen={setIsCommandMenuOpen}
                    commands={data.commandMenu}
                    theme={theme}
                />

                <LightTrail theme={theme} />

                <div className="fixed top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
                    <div className={`absolute top-0 left-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-200/30'} rounded-full filter blur-3xl`} />
                    <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-200/30'} rounded-full filter blur-3xl`} />
                </div>

                <button
                    onClick={toggleTheme}
                    className={`fixed top-4 right-4 p-2 rounded-lg ${currentTheme.hover} ${currentTheme.footer} z-20 ${currentTheme.cardBorder} transition-colors`}
                    aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
                    {/* Header Section */}
                    <header className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-12 sm:mb-20">
                        <div className="text-center sm:text-left mb-8 sm:mb-0">
                            <h1 className="text-3xl sm:text-4xl font-light mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                                {data.profile.name}
                            </h1>
                            <p className={`${currentTheme.textSecondary} mb-6 text-base sm:text-lg`}>
                                {data.profile.role} • {data.profile.tagline}
                            </p>
                            <nav className="flex space-x-6 justify-center sm:justify-start" aria-label="Social links">
                                <a
                                    href={`mailto:${data.profile.email}`}
                                    className={`${currentTheme.textSecondary} hover:text-purple-400 transition-colors`}
                                    aria-label="Send email"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                                <a
                                    href={data.profile.github}
                                    className={`${currentTheme.textSecondary} hover:text-pink-400 transition-colors`}
                                    aria-label="GitHub profile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href={data.profile.linkedin}
                                    className={`${currentTheme.textSecondary} hover:text-blue-400 transition-colors`}
                                    aria-label="LinkedIn profile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </nav>
                        </div>
                        <div className="w-24 h-24 sm:w-32 sm:h-32 relative group">
                            <img
                                src={data.profile.image}
                                alt={`${data.profile.name} - ${data.profile.role}`}
                                className="relative w-full rounded-lg shadow-lg"
                                width="128"
                                height="128"
                                loading="eager"
                            />
                        </div>
                    </header>

                    {/* About Section */}
                    <section className="mb-12 sm:mb-20" aria-labelledby="about-heading">
                        <h2 id="about-heading" className="text-sm uppercase tracking-widest text-purple-400 mb-4">
                            About
                        </h2>
                        <p className={`${currentTheme.textSecondary} text-base sm:text-lg leading-relaxed`}>
                            {data.about}
                        </p>
                    </section>

                    {/* Experience Section */}
                    <section className="mb-12 sm:mb-20" aria-labelledby="experience-heading">
                        <h2 id="experience-heading" className="text-sm uppercase tracking-widest text-pink-400 mb-4">
                            Work Experience
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, index) => (
                                <ExperienceItem
                                    key={index}
                                    experience={exp}
                                    theme={currentTheme}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section className="mb-12 sm:mb-20" aria-labelledby="skills-heading">
                        <h2 id="skills-heading" className="text-sm uppercase tracking-widest text-blue-400 mb-6">
                            Skills
                        </h2>
                        <div className="space-y-3">
                            {Object.entries(data.skills).map(([category, skills], index) => (
                                <SkillBox
                                    key={index}
                                    category={category}
                                    skills={skills}
                                    theme={currentTheme}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Open Source Section */}
                    <section className="mb-12 sm:mb-20" aria-labelledby="opensource-heading">
                        <h2 id="opensource-heading" className="text-sm uppercase tracking-widest text-green-400 mb-6">
                            Open Source Contributions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.openSource.slice(0, visibleProjects).map((project, index) => (
                                <OpenSourceCard
                                    key={index}
                                    project={project}
                                    theme={currentTheme}
                                />
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
                    <section className="mb-12 sm:mb-20" aria-labelledby="projects-heading">
                        <h2 id="projects-heading" className="text-sm uppercase tracking-widest text-purple-400 mb-6">
                            Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.projects.slice(0, visibleProjects).map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    theme={currentTheme}
                                />
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
                    <section className="mb-12 sm:mb-20" aria-labelledby="education-heading">
                        <h2 id="education-heading" className="text-sm uppercase tracking-widest text-pink-400 mb-4">
                            Education
                        </h2>
                        <div className="space-y-8">
                            {data.education.map((edu, index) => (
                                <EducationItem
                                    key={index}
                                    education={edu}
                                    theme={currentTheme}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className={`fixed bottom-0 left-0 w-full flex justify-center border-t ${currentTheme.footer} ${currentTheme.text} ${currentTheme.cardBorder} text-sm`}>
                        <button
                            onClick={() => setIsCommandMenuOpen(true)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme.hover} hover:text-purple-400 transition-colors`}
                            aria-label="Open command menu"
                        >
                            <span>Press {isMac ? '⌘' : 'Ctrl'} + J to open command menu</span>
                        </button>
                    </footer>
                </div>
            </main>
        </>
    );
};

export default App;