"use client"

import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import { useState } from "react"
import { usePathname } from "next/navigation"

const navigationItems = [
    { name: "Work", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const isActiveLink = (item: { name: string; href: string }) => {
        if (item.name === "Work") {
            return pathname === "/" || pathname.startsWith("/work")
        }
        return pathname === item.href
    }

    return (
        <>
            <nav className="rounded-lg fixed top-3 sm:top-5 left-3 right-3 sm:left-5 sm:right-5 z-50 flex items-center justify-between w-auto p-4 sm:p-6 max-w-[1000px] mx-auto glass-nav font-saprona">
                {/* Logo/Brand */}
                <Link
                    href="/"
                    className="text-sm sm:text-base font-saprona-semibold text-theme tracking-wider"
                    style={{ letterSpacing: "0.1em" }}
                >
                    <span className="hidden sm:inline">MOHIT PADDHARIYA</span>
                    <span className="sm:hidden">MOHIT P.</span>
                </Link>

                {/* Desktop Navigation Items */}
                <div className="hidden md:flex items-center gap-4 xl:gap-6">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-sm xl:text-base font-saprona-regular transition-colors duration-300 ${isActiveLink(item)
                                ? "text-green-400"
                                : "text-theme hover:text-[color:var(--theme-link-hover)]"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Separator */}
                    <div className="w-px h-4 bg-theme-alt/30 mx-2"></div>

                    {/* Theme Toggle for Desktop */}
                    <div className="flex items-center">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Menu Section */}
                <div className="md:hidden flex items-center gap-3 sm:gap-4">
                    {/* Theme Toggle for Mobile */}
                    <ThemeToggle />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 text-theme hover:text-[color:var(--theme-link-hover)] transition-all duration-300 focus:outline-none hover:bg-theme-alt/10 rounded-lg"
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center relative">
                            <div className={`w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                                }`} />
                            <div className={`w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-1 scale-1'
                                }`} />
                            <div className={`w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1.5'
                                }`} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
                        onClick={closeMobileMenu}
                    />

                    {/* Mobile Menu - Integrated with navbar */}
                    <div className="md:hidden fixed top-[72px] sm:top-[84px] left-3 right-3 sm:left-5 sm:right-5 z-40 transition-all duration-300 ease-out">
                        <div className="glass-nav rounded-lg border border-white/10 shadow-xl backdrop-blur-xl">
                            <div className="p-4 sm:p-6 space-y-1">
                        {navigationItems.map((item, index) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className={`flex items-center px-4 py-3 rounded-lg text-base sm:text-lg font-saprona-regular transition-all duration-200 ${isActiveLink(item)
                                    ? "text-green-400 bg-green-400/10"
                                    : "text-theme hover:text-[color:var(--theme-link-hover)] hover:bg-theme-alt/5"
                                    }`}
                                style={{
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                <span className="flex-1">{item.name}</span>
                                {isActiveLink(item) && (
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                )}
                            </Link>
                        ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
