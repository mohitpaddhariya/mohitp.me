import React, { useState, useEffect, useCallback } from 'react';
import { Github, Linkedin, Mail, Search, Command, ExternalLink } from 'lucide-react';

const CommandMenu = ({ isOpen, setIsOpen, commands }) => {
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredCommands = commands.filter(command =>
        command.name.toLowerCase().includes(search.toLowerCase())
    );

    // Reset selection when search changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    // Reset search when menu opens
    useEffect(() => {
        if (isOpen) {
            setSearch('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    const executeCommand = useCallback((command) => {
        if (command.action.startsWith('http')) {
            window.open(command.action, '_blank');
        } else if (command.action.startsWith('mailto')) {
            window.location.href = command.action;
        } else if (command.action.startsWith('./')) {
            window.location.href = command.action;
        }
        setIsOpen(false);
    }, [setIsOpen]);

    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;

        // Prevent default behavior for our handled keys
        if (['ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'Tab'].includes(e.key)) {
            e.preventDefault();
        }

        switch (e.key) {
            case 'ArrowUp':
                setSelectedIndex(prev =>
                    prev <= 0 ? filteredCommands.length - 1 : prev - 1
                );
                break;
            case 'ArrowDown':
                setSelectedIndex(prev =>
                    prev >= filteredCommands.length - 1 ? 0 : prev + 1
                );
                break;
            case 'Enter':
                if (filteredCommands[selectedIndex]) {
                    executeCommand(filteredCommands[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            case 'Tab':
                setSelectedIndex(prev =>
                    e.shiftKey
                        ? prev <= 0 ? filteredCommands.length - 1 : prev - 1
                        : prev >= filteredCommands.length - 1 ? 0 : prev + 1
                );
                break;
            default:
                break;
        }
    }, [isOpen, filteredCommands, selectedIndex, executeCommand, setIsOpen]);

    // Global keyboard shortcut to open menu
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            // Check for Command(⌘)/Ctrl + J
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [setIsOpen]);

    // Add event listener for menu keyboard navigation
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const getIcon = (id) => {
        switch (id) {
            case 'email': return <Mail className="w-4 h-4" />;
            case 'github': return <Github className="w-4 h-4" />;
            case 'linkedin': return <Linkedin className="w-4 h-4" />;
            case 'resume': return <ExternalLink className="w-4 h-4" />;
            default: return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
            onClick={(e) => {
                if (e.target === e.currentTarget) setIsOpen(false);
            }}
        >
            <div className="bg-gray-900 w-full max-w-xl rounded-lg border border-gray-800 overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-gray-800 flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        className="bg-transparent outline-none flex-1 text-gray-300"
                        placeholder="Type a command or search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                    />
                    <kbd className="px-2 py-1 text-xs bg-gray-950 rounded text-gray-400">ESC</kbd>
                </div>

                <div className="py-2 px-1 max-h-96 overflow-y-auto">
                    {filteredCommands.length === 0 ? (
                        <div className="px-4 py-2 text-gray-500 text-center">
                            No matching commands found
                        </div>
                    ) : (
                        filteredCommands.map((command, index) => (
                            <button
                                key={command.id}
                                className={`w-full px-3 py-2 text-left rounded flex items-center justify-between ${selectedIndex === index
                                    ? 'bg-gray-800 text-purple-400'
                                    : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                                onClick={() => executeCommand(command)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <div className="flex items-center gap-2">
                                    {getIcon(command.id)}
                                    {command.name}
                                </div>
                                <div className="flex items-center gap-1">
                                    {command.shortcut.map((key, i) => (
                                        <kbd
                                            key={i}
                                            className="px-2 py-1 text-xs bg-gray-950 rounded"
                                        >
                                            {key}
                                        </kbd>
                                    ))}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
    const [data, setData] = useState(null);
    const [visibleProjects, setVisibleProjects] = useState(2);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('./data.json');
            const data = await res.json();
            setData(data);
        };

        fetchData();
    }, []);

    if (!data) return null;

    return (
        <div className="pt-10 min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 font-mono relative overflow-hidden selection:bg-purple-500/30 selection:text-white">
            <CommandMenu
                isOpen={isCommandMenuOpen}
                setIsOpen={setIsCommandMenuOpen}
                commands={data.commandMenu}
            />

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-12 sm:mb-20">
                    <div className="text-center sm:text-left mb-8 sm:mb-0">
                        <h1 className="text-3xl sm:text-4xl font-light mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                            {data.profile.name}
                        </h1>
                        <p className="text-gray-400 mb-6 text-base sm:text-lg">
                            {data.profile.role} • {data.profile.tagline}
                        </p>
                        <div className="flex space-x-6 justify-center sm:justify-start">
                            <a href={`mailto:${data.profile.email}`} className="text-gray-400 hover:text-purple-400 transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href={data.profile.github} className="text-gray-400 hover:text-pink-400 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href={data.profile.linkedin} className="text-gray-400 hover:text-blue-400 transition-colors">
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
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
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
                                    <h3 className="text-xl group-hover:text-pink-400 transition-colors">{exp.title}</h3>
                                    <span className="text-gray-500 text-sm sm:text-base">{exp.period}</span>
                                </div>
                                <p className="text-gray-500 mb-2">{exp.company} | {exp.type}</p>
                                <p className="text-gray-400">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Section */}
                <section className="mb-12 sm:mb-20">
                    <h2 className="text-sm uppercase tracking-widest text-blue-400 mb-6">Skills</h2>
                    <div className="space-y-3">
                        <div className="bg-gray-800/50 py-2 px-4 rounded-md">
                            <span className="text-gray-400 mr-3">AI/ML/DL:</span>
                            <span className="text-gray-200">{data.skills.languages.join(', ')}</span>
                        </div>

                        <div className="bg-gray-800/50 py-2 px-4 rounded-md">
                            <span className="text-gray-400 mr-3">Web Technologies:</span>
                            <span className="text-gray-200">{data.skills.webTechnologies.join(', ')}</span>
                        </div>

                        <div className="bg-gray-800/50 py-2 px-4 rounded-md">
                            <span className="text-gray-400 mr-3">Databases:</span>
                            <span className="text-gray-200">{data.skills.databases.join(', ')}</span>
                        </div>

                        <div className="bg-gray-800/50 py-2 px-4 rounded-md">
                            <span className="text-gray-400 mr-3">DevOps & Cloud:</span>
                            <span className="text-gray-200">{data.skills.devOps.join(', ')}</span>
                        </div>
                    </div>
                </section>

                {/* Open Source Section */}
                <section className="mb-12 sm:mb-20">
                    <h2 className="text-sm uppercase tracking-widest text-green-400 mb-6">Open Source Contributions</h2>

                    {/* Grid Container with Visible Projects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.openSource.slice(0, visibleProjects).map((project, index) => (
                            <div
                                key={index}
                                className="group bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Github className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                                            <h3 className="text-lg font-medium text-gray-200 group-hover:text-green-400 transition-colors">
                                                {project.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-2.5 py-1 bg-gray-800 text-gray-300 text-sm rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {project.issueNumber && (
                                            <span className="text-sm text-gray-500">
                                                Issue #{project.issueNumber}
                                            </span>
                                        )}
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors ml-auto"
                                        >
                                            View PR #{project.prNumber}
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View More Button - Only show if there are more projects to load */}
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
                                className="group bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Github className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                            <h3 className="text-lg font-medium text-gray-200 group-hover:text-purple-400 transition-colors">
                                                {project.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-2.5 py-1 bg-gray-800 text-gray-300 text-sm rounded-md"
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
                                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
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
                                    <h3 className="text-xl group-hover:text-pink-400 transition-colors">
                                        {edu.institution}
                                    </h3>
                                    <span className="text-gray-500 text-sm sm:text-base">{edu.period}</span>
                                </div>
                                <p className="text-gray-400">{edu.degree}</p>
                                {edu.gpa && <p className="text-gray-500 mt-2">GPA: {edu.gpa}</p>}
                            </div>
                        ))}
                    </div>
                </section>


                {/* Footer */}
                <div className="text-center text-gray-500 text-sm">
                    <button
                        onClick={() => setIsCommandMenuOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-purple-400 transition-colors"
                    >
                        <Command className="w-4 h-4" />
                        <span>Press ⌘/J to open command menu</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default App;