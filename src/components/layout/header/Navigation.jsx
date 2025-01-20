import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import HeaderLogo from "./HeaderLogo";

const menuItems = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

const socialLinks = [
    {
        icon: Github,
        href: "https://github.com/dev-mohit06",
        label: "GitHub Profile",
    },
    {
        icon: Linkedin,
        href: "https://linkedin.com/in/mohit-paddhariya",
        label: "LinkedIn Profile",
    },
    {
        icon: Mail,
        href: "mailto:mohit.paddhariya@gmail.com",
        label: "Email Contact",
    },
];

const animationVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, when: "beforeChildren" },
        },
        exit: {
            opacity: 0,
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
    },
    item: {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
        exit: { x: 50, opacity: 0 },
    },
    background: {
        hidden: { x: "100%" },
        visible: { x: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
        exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
    },
    header: (isLoading, isPageLoaded) => ({
        initial: { x: isLoading ? "40vw" : 0, y: isLoading ? "40vh" : 0, opacity: 0 },
        animate: {
            x: 0,
            y: 0,
            opacity: isPageLoaded ? 1 : 0,
            transition: { type: "spring", stiffness: 200, damping: 20, delay: isLoading ? 0 : 0.55 },
        },
    }),
};

const NavLinks = ({ mobile = false, closeMenu }) => (
    <>
        {menuItems.map((item) => (
            <motion.a
                key={item.name}
                href={item.href}
                variants={mobile ? animationVariants.item : {}}
                onClick={() => mobile && closeMenu()}
                className={`${mobile
                    ? "block py-4 text-2xl font-semibold hover:text-violet-600 transition-colors relative group"
                    : "text-sm font-medium hover:text-black hover:underline decoration-2 underline-offset-4 decoration-violet-500 transition-all"
                    }`}
            >
                <span className="relative z-10">{item.name}</span>
                {mobile && (
                    <motion.span
                        className="absolute inset-0 bg-violet-100 rounded-lg -z-0"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                )}
            </motion.a>
        ))}
        <motion.a
            variants={mobile ? animationVariants.item : {}}
            href="/resume.pdf"
            className={`w-min text-sm px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 ${mobile ? "mt-4 inline-block" : ""}`}
        >
            Resume
        </motion.a>
    </>
);

const SocialLinks = ({ mobile = false }) => (
    <div className={`flex items-center gap-6 ${mobile ? "mt-auto" : ""}`}>
        {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
                key={href}
                variants={mobile ? animationVariants.item : {}}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-black/5 rounded-full transition-all hover:shadow-md hover:scale-110"
                aria-label={label}
            >
                <Icon className="w-6 h-6" />
            </motion.a>
        ))}
    </div>
);

const Navigation = ({ isLoading, isPageLoaded, isScrolled }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Navigation */}
            <nav
                className={`hidden md:flex fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
            >
                <div className="container mx-auto">
                    <div className="flex items-center justify-between py-6 px-6">
                        <motion.div
                            className="flex items-center gap-2 group"
                            initial={isLoading ? { scale: 1, y: "40vh", x: "40vw" } : { scale: 1 }}
                            animate={{
                                scale: 1,
                                y: 0,
                                x: 0,
                                transition: { type: "spring", stiffness: 200, damping: 20, delay: isLoading ? 0 : 0.2 },
                            }}
                        >
                            <HeaderLogo isLoading={isLoading} />
                        </motion.div>
                        <motion.div
                            className="hidden md:flex items-center gap-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <NavLinks />
                        </motion.div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 md:hidden"
                initial="initial"
                animate="animate"
                variants={animationVariants.header(isLoading, isPageLoaded)}
            >
                <div className={`flex items-center justify-between py-6 px-6 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : ""}`}>
                    <HeaderLogo isLoading={isLoading} />
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        className="p-2 hover:bg-white/10 rounded-lg relative z-50"
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isPageLoaded ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                    >
                        <Menu className="w-6 h-6" />
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                            />
                            <motion.div
                                className="fixed inset-y-0 right-0 w-full max-w-sm z-[70] overflow-y-auto"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <motion.div
                                    variants={animationVariants.background}
                                    className="absolute inset-0 bg-white/95 backdrop-blur-lg shadow-lg"
                                />
                                <motion.div variants={animationVariants.container} className="relative h-full p-6 flex flex-col">
                                    <motion.div variants={animationVariants.item} className="flex justify-between items-center">
                                        <HeaderLogo isLoading={false} />
                                        <motion.button
                                            onClick={() => setIsOpen(false)}
                                            className="p-2 hover:bg-black/5 rounded-lg"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <X className="w-6 h-6" />
                                        </motion.button>
                                    </motion.div>
                                    <motion.nav className="mt-12 space-y-4 flex flex-col">
                                        <NavLinks mobile closeMenu={() => setIsOpen(false)} />
                                    </motion.nav>
                                    <SocialLinks mobile />
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default Navigation;