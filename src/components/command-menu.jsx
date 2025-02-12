import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, Github, Linkedin, Mail, Search } from 'lucide-react';

const CommandMenu = ({ isOpen, setIsOpen, commands, theme = 'dark' }) => {
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const themeStyles = {
        dark: {
            overlay: 'bg-black/60',
            background: 'bg-gray-900',
            border: 'border-gray-800',
            text: 'text-gray-300',
            textSecondary: 'text-gray-500',
            textHover: 'text-purple-400',
            kbd: 'bg-gray-950',
            hoverBg: 'hover:bg-gray-800',
            selectedBg: 'bg-gray-800'
        },
        light: {
            overlay: 'bg-gray-500/30',
            background: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-700',
            textSecondary: 'text-gray-500',
            textHover: 'text-purple-600',
            kbd: 'bg-gray-100',
            hoverBg: 'hover:bg-gray-100',
            selectedBg: 'bg-gray-100'
        }
    };

    const currentTheme = themeStyles[theme];

    const filteredCommands = commands.filter(command =>
        command.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

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

    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [setIsOpen]);

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
            className={`fixed inset-0 ${currentTheme.overlay} backdrop-blur-sm z-50 flex items-start justify-center pt-32`}
            onClick={(e) => {
                if (e.target === e.currentTarget) setIsOpen(false);
            }}
        >
            <div className={`${currentTheme.background} w-full max-w-xl rounded-lg border ${currentTheme.border} overflow-hidden shadow-2xl`}>
                <div className={`p-4 border-b ${currentTheme.border} flex items-center gap-2`}>
                    <Search className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                    <input
                        type="text"
                        className={`bg-transparent outline-none flex-1 ${currentTheme.text}`}
                        placeholder="Type a command or search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                    />
                    <kbd className={`px-2 py-1 text-xs ${currentTheme.kbd} rounded ${currentTheme.textSecondary}`}>ESC</kbd>
                </div>

                <div className="py-2 px-1 max-h-96 overflow-y-auto">
                    {filteredCommands.length === 0 ? (
                        <div className={`px-4 py-2 ${currentTheme.textSecondary} text-center`}>
                            No matching commands found
                        </div>
                    ) : (
                        filteredCommands.map((command, index) => (
                            <button
                                key={command.id}
                                className={`w-full px-3 py-2 text-left rounded flex items-center justify-between ${
                                    selectedIndex === index
                                        ? `${currentTheme.selectedBg} ${currentTheme.textHover}`
                                        : `${currentTheme.text} ${currentTheme.hoverBg}`
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
                                            className={`px-2 py-1 text-xs ${currentTheme.kbd} rounded`}
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

export default CommandMenu;