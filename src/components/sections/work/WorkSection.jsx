import { motion } from "framer-motion";

const WorkExperience = () => {
    const experiences = [
        {
            role: "Full Stack Developer",
            company: "Imobile Designs",
            date: "Dec 2023 - Apr 2024",
            location: "On Site",
            summary: "Led development of high-performance marketplace system and innovative mobile apps, focusing on user experience and system efficiency.",
            skills: ["MERN", "SQL", "Android", "Figma", "PHP", "Laravel", "Bootstrap", "Tailwind CSS", "API Integration", "UI/UX Design", "Cloud Computing"],
            color: "from-violet-400 to-indigo-400"
        },
        {
            role: "Full Stack Developer",
            company: "Freelance",
            date: "Jan 2024 - Present",
            location: "Remote",
            summary: "Delivered innovative solutions for diverse clients, specializing in e-commerce platforms and administrative systems with perfect client satisfaction.",
            skills: ["Laravel", "MySQL", "PHP", "Android", "API Integration", "UI/UX Design"],
            color: "from-blue-400 to-cyan-400"
        }
    ];

    return (
        <section id='work' className="py-12 md:py-20 relative overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        Work Experience
                    </h2>
                </motion.div>

                {/* Experience Cards */}
                <div className="space-y-8 md:space-y-32">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative w-full"
                        >
                            {/* Mobile Design */}
                            <div className="md:hidden">
                                <motion.div
                                    className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Company Badge */}
                                    <div className="inline-flex px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg mb-4">
                                        <span className="text-white text-sm font-medium">{exp.company}</span>
                                    </div>

                                    {/* Role & Date */}
                                    <h3 className="text-xl font-bold text-gray-900 mt-2">{exp.role}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                        <span>{exp.date}</span>
                                        <span>•</span>
                                        <span>{exp.location}</span>
                                    </div>

                                    {/* Summary Card */}
                                    <div className="mt-4 p-4 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-100">
                                        <p className="text-gray-700">{exp.summary}</p>
                                    </div>

                                    {/* Skills Tags */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {exp.skills.map((skill, idx) => (
                                            <motion.span
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-white text-violet-700 border border-violet-100 shadow-sm"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Desktop Design (Unchanged) */}
                            <div className="hidden md:block">
                                <div className={`relative w-full md:w-1/2 ${index % 2 === 0 ? 'md:ml-0' : 'md:ml-auto'}`}>
                                    <motion.div
                                        className="relative z-10 bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg">
                                            <span className="text-white text-sm font-medium">{exp.company}</span>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
                                            <p className="text-base text-gray-600 mt-2">{exp.date} • {exp.location}</p>
                                        </div>
                                        <motion.div className={`absolute ${index % 2 === 0 ? '-right-32' : '-left-32'} top-1/2 w-32 h-px bg-gradient-to-r ${exp.color}`} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />
                                        <motion.div className={`absolute ${index % 2 === 0 ? 'left-full' : 'right-full'} top-1/2 -translate-y-1/2 ${index % 2 === 0 ? 'ml-16' : 'mr-16'} w-64`} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                            <div className="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-lg">
                                                <p className="text-sm text-gray-600">{exp.summary}</p>
                                            </div>
                                        </motion.div>
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {exp.skills.map((skill, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 border border-violet-100 hover:border-violet-300 transition-all cursor-default"
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-violet-100/20 to-indigo-100/20 rounded-2xl blur-xl -z-10" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;