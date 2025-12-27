'use client'
import { useState, useEffect } from 'react'
import { Palette, Moon, Sun } from 'lucide-react'

const themes = [
    { name: 'Royal Gold', value: 'gold', color: '#fbbf24' }, // amber-400
    { name: 'Royal Blue', value: 'blue', color: '#3b82f6' }, // blue-500
    { name: 'Midnight Purple', value: 'purple', color: '#9333ea' }, // purple-600
    { name: 'Emerald Prestige', value: 'emerald', color: '#10b981' }, // emerald-500
    { name: 'Crimson Elite', value: 'crimson', color: '#f43f5e' }, // rose-500
    { name: 'Obsidian Slate', value: 'slate', color: '#64748b' }, // slate-500
]

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const setTheme = (theme: string) => {
        document.documentElement.setAttribute('data-theme', theme)
        if (theme === 'gold') {
            document.documentElement.removeAttribute('data-theme')
        }
        localStorage.setItem('gear-guard-theme', theme)
    }

    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('gear-guard-theme')
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme)
            if (savedTheme === 'gold') {
                document.documentElement.removeAttribute('data-theme')
            }
        }
    }, [])

    if (!mounted) return null

    const toggleDark = () => {
        document.documentElement.classList.toggle('dark')
    }

    return (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 pointer-events-auto">
            <button
                onClick={toggleDark}
                className="p-3 bg-secondary backdrop-blur-md rounded-full border border-border/50 hover:bg-secondary/80 transition-all shadow-lg active:scale-95 cursor-pointer text-foreground"
                aria-label="Toggle Dark Mode"
            >
                <Sun className="hidden dark:block h-5 w-5" />
                <Moon className="block dark:hidden h-5 w-5" />
            </button>

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 bg-primary backdrop-blur-md rounded-full border border-border/50 hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(var(--primary),0.4)] active:scale-95 text-primary-foreground cursor-pointer"
                    aria-label="Theme Selector"
                >
                    <Palette className="h-5 w-5" />
                </button>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <div className="absolute right-0 top-14 z-50 bg-background/95 backdrop-blur-xl border border-border/50 p-2 rounded-2xl w-56 shadow-2xl flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest my-2 px-3">Select Aesthetics</span>
                            {themes.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => {
                                        setTheme(t.value)
                                        setIsOpen(false)
                                    }}
                                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors w-full text-left group"
                                >
                                    <span className="w-3 h-3 rounded-full shadow-sm ring-1 ring-white/20 group-hover:scale-125 transition-transform" style={{ backgroundColor: t.color }}></span>
                                    <span className="text-sm font-medium">{t.name}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
