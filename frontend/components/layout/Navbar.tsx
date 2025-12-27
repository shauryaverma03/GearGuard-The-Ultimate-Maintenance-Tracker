'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'
import { Palette, Moon, Sun, Menu, X } from 'lucide-react'

const themes = [
    { name: 'Royal Gold', value: 'gold', color: '#fbbf24' },
    { name: 'Royal Blue', value: 'blue', color: '#3b82f6' },
    { name: 'Midnight Purple', value: 'purple', color: '#9333ea' },
    { name: 'Emerald Prestige', value: 'emerald', color: '#10b981' },
    { name: 'Crimson Elite', value: 'crimson', color: '#f43f5e' },
    { name: 'Obsidian Slate', value: 'slate', color: '#64748b' },
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [themeOpen, setThemeOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleDark = () => {
        document.documentElement.classList.toggle('dark')
    }

    const setTheme = (theme: string) => {
        document.documentElement.setAttribute('data-theme', theme)
        if (theme === 'gold') document.documentElement.removeAttribute('data-theme')
        localStorage.setItem('gear-guard-theme', theme)
        setThemeOpen(false)
    }

    if (!mounted) return null

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'}`}>
            <div className={`mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border border-border/50 rounded-full py-2 shadow-lg' : 'bg-transparent border-transparent'}`}>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="group-hover:scale-105 transition-transform">
                        <Logo className="w-10 h-10" />
                    </div>
                    <span className="font-serif font-bold text-xl tracking-tight text-foreground hidden sm:block">
                        GearGuard
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1 bg-background/50 px-2 py-1 rounded-full border border-border/50 backdrop-blur-md">
                    {[
                        { name: 'Features', href: '#features' },
                        { name: 'How it Works', href: '#how-it-works' },
                        { name: 'Pricing', href: '#pricing' },
                        { name: 'About', href: '#about' }
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-4 py-2 rounded-full transition-all"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {/* Theme Controls */}
                    <div className="flex items-center gap-1 bg-background/50 rounded-full border border-border/50 p-1 backdrop-blur-md">
                        <button
                            onClick={toggleDark}
                            className="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            <Sun className="h-4 w-4 hidden dark:block" />
                            <Moon className="h-4 w-4 block dark:hidden" />
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setThemeOpen(!themeOpen)}
                                className="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
                            >
                                <Palette className="h-4 w-4" />
                            </button>

                            {/* Theme Dropdown */}
                            {themeOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setThemeOpen(false)} />
                                    <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                                        <div className="text-xs font-bold text-muted-foreground px-2 py-1 mb-1">THEME</div>
                                        {themes.map((t) => (
                                            <button
                                                key={t.value}
                                                onClick={() => setTheme(t.value)}
                                                className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-muted text-sm transition-colors"
                                            >
                                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                                                {t.name}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="h-6 w-px bg-border/50 mx-1 hidden sm:block" />

                    <div className="hidden sm:flex items-center gap-2">
                        <Link href="/login">
                            <Button variant="ghost" className="rounded-full">Log In</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="rounded-full font-bold shadow-lg shadow-primary/20">Get Started</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-4 shadow-2xl">
                    <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Features</Link>
                    <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">How it Works</Link>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Log In</Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                        <Button className="w-full">Get Started</Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}

