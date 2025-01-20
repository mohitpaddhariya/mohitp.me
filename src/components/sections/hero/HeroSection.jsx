import { ArrowRight, Code, Github, Linkedin, Mail, Sparkles, Zap } from 'lucide-react'
import { motion } from 'framer-motion'


const HeroSection = () => {
    return (
        <div className="container mx-auto">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {/* Left Column */}
                    <div className="space-y-10 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-semibold text-green-800 group-hover:text-green-900">Available for opportunities</span>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 animate-gradient">
                                    Mohit Paddhariya,
                                </span>
                            </h1>
                            <p className="text-gray-600 text-lg md:text-xl max-w-xl leading-relaxed">
                                Software Developer, Full-Stack Development, Cloud Computing. Currently focused on building robust carrer from {' '}
                                <a href="#" className="text-black font-medium underline decoration-2 decoration-violet-500 underline-offset-4 hover:decoration-black transition-colors">
                                    PES University
                                </a>.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors cursor-pointer"
                            >
                                React
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors cursor-pointer"
                            >
                                JavaScript
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors cursor-pointer"
                            >
                                Node.js
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors cursor-pointer"
                            >
                                +More
                            </motion.span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <a
                                href="#contact"
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-xl text-lg font-medium hover:scale-105"
                            >
                                Let's work together
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </a>

                            <div className="flex items-center gap-6">
                                <a
                                    href="https://github.com/dev-mohit06"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 hover:bg-white/80 rounded-full transition-all hover:shadow-md hover:scale-110"
                                    aria-label="GitHub Profile"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/mohit-paddhariya"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 hover:bg-white/80 rounded-full transition-all hover:shadow-md hover:scale-110"
                                    aria-label="LinkedIn Profile"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                                <a
                                    href="mailto:mohit.paddhariya@gmail.com"
                                    className="p-3 hover:bg-white/80 rounded-full transition-all hover:shadow-md hover:scale-110"
                                    aria-label="Email Contact"
                                >
                                    <Mail className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <motion.div
                        className="relative lg:h-[640px]"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="relative z-10 bg-white/90 backdrop-blur rounded-3xl shadow-xl p-4 sm:p-8 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group">
                            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r p-[2px] from-violet-500 via-indigo-500 to-blue-500">
                                <div className="relative overflow-hidden rounded-2xl bg-white">
                                    <img
                                        src="/mohitpaddhariya.jpg"
                                        alt="Professional Portrait"
                                        className="w-full h-[400px] sm:h-[500px] object-cover object-center transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent group-hover:from-black/40 transition-all duration-300" />
                                </div>
                            </div>

                            {/* Achievement Cards - Repositioned and made responsive */}
                            <div className="hidden sm:block absolute -left-4 lg:-left-8 top-16 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg transform -rotate-6 hover:rotate-0 transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="flex items-center gap-3">
                                    <Code className="w-6 h-6 text-violet-600" />
                                    <p className="text-sm font-semibold">Full Stack Developer</p>
                                </div>
                            </div>

                            <div className="hidden sm:block absolute -right-4 lg:-right-8 top-1/3 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg transform rotate-6 hover:rotate-0 transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-blue-600" />
                                    <p className="text-sm font-semibold">UI/UX Enthusiast</p>
                                </div>
                            </div>

                            <div className="hidden sm:block absolute -left-4 lg:-left-8 bottom-24 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg transform -rotate-6 hover:rotate-0 transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-6 h-6 text-yellow-600" />
                                    <p className="text-sm font-semibold">Problem Solver</p>
                                </div>
                            </div>

                            {/* Mobile Achievement Cards */}
                            <div className="flex sm:hidden justify-around mt-4 gap-2">
                                <div className="bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg flex items-center gap-2">
                                    <Code className="w-4 h-4 text-violet-600" />
                                    <p className="text-xs font-semibold">Full Stack</p>
                                </div>
                                <div className="bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                    <p className="text-xs font-semibold">UI/UX</p>
                                </div>
                                <div className="bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-yellow-600" />
                                    <p className="text-xs font-semibold">Problem Solver</p>
                                </div>
                            </div>
                        </div>

                        {/* Background Elements */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse duration-5000"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse duration-5000 delay-300"></div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection