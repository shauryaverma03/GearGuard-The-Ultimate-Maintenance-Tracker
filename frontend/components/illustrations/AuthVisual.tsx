'use client'

import React from 'react'

export function AuthVisual() {
    return (
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center p-8">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />

            {/* Main SVG Graphic */}
            <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl relative z-10"
            >
                <g className="animate-[spin_20s_linear_infinite]">
                    {/* Outer Ring */}
                    <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" className="text-primary" />
                    <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.3" className="text-secondary" />
                </g>

                <g className="animate-[spin_15s_linear_infinite_reverse]">
                    {/* Middle Ring */}
                    <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" className="text-primary" />
                    <path d="M200 60 A140 140 0 0 1 340 200" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" />
                </g>

                {/* Central Shield/Core */}
                <path d="M200 120 L270 150 L270 230 L200 280 L130 230 L130 150 L200 120 Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" className="text-primary" />

                {/* Floating Elements */}
                <rect x="180" y="180" width="40" height="40" rx="8" fill="currentColor" className="text-primary-foreground animate-bounce" />
                <circle cx="200" cy="200" r="10" fill="currentColor" className="text-primary" />

                {/* Data Lines */}
                <path d="M270 150 L320 120" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
                <circle cx="320" cy="120" r="4" fill="currentColor" className="text-muted-foreground" />

                <path d="M130 230 L80 260" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
                <circle cx="80" cy="260" r="4" fill="currentColor" className="text-muted-foreground" />
            </svg>

            {/* Floating Glass Cards CSS Overlay */}
            <div className="absolute top-1/4 right-0 bg-card/60 border border-border/50 backdrop-blur-md p-3 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <div className="text-xs font-bold text-foreground">System Operational</div>
                </div>
            </div>

            <div className="absolute bottom-1/4 left-0 bg-card/60 border border-border/50 backdrop-blur-md p-3 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3 animate-[shimmer_2s_infinite]" />
                    </div>
                    <div className="text-xs font-bold text-foreground">Syncing...</div>
                </div>
            </div>
        </div>
    )
}
