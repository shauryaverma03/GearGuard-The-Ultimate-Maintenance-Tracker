'use client'

import React from 'react'

export function RoyalHeroIllustration() {
    return (
        <svg viewBox="0 0 800 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Abstract Background Shapes */}
            <circle cx="400" cy="300" r="200" fill="#f0fdf4" opacity="0.5" />
            <circle cx="400" cy="300" r="160" stroke="url(#goldGradient)" strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="400" cy="300" r="180" stroke="url(#goldGradient)" strokeWidth="0.5" fill="none" opacity="0.1" />

            {/* Central Shield/Gear Motif */}
            <path d="M400 150 L550 220 V380 L400 480 L250 380 V220 Z" fill="#065f46" stroke="url(#goldGradient)" strokeWidth="4" filter="url(#glow)" />

            {/* Inner Gear */}
            <circle cx="400" cy="310" r="60" fill="transparent" stroke="#fbbf24" strokeWidth="8" strokeDasharray="20 10" />
            <circle cx="400" cy="310" r="40" fill="#fbbf24" />

            {/* Decorative Lines */}
            <path d="M400 100 V150" stroke="#d97706" strokeWidth="2" />
            <path d="M400 480 V530" stroke="#d97706" strokeWidth="2" />
            <path d="M150 300 H250" stroke="#d97706" strokeWidth="2" />
            <path d="M550 300 H650" stroke="#d97706" strokeWidth="2" />

            {/* Floating Elements */}
            <rect x="580" y="180" width="80" height="60" rx="8" fill="#ecfccb" opacity="0.8" transform="rotate(10 620 210)" />
            <rect x="140" y="380" width="80" height="60" rx="8" fill="#ecfccb" opacity="0.8" transform="rotate(-10 180 410)" />
        </svg>
    )
}

export function EquipmentIllustration() {
    return (
        <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="machineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#065f46" />
                    <stop offset="100%" stopColor="#064e3b" />
                </linearGradient>
            </defs>
            {/* Base */}
            <rect x="50" y="300" width="300" height="40" fill="#d97706" rx="4" />
            {/* Main Body */}
            <rect x="80" y="100" width="240" height="200" fill="url(#machineGradient)" rx="8" />
            {/* Screen */}
            <rect x="100" y="120" width="120" height="80" fill="#ecfccb" opacity="0.9" />
            {/* Activity Lines */}
            <path d="M110 140 H180" stroke="#065f46" strokeWidth="2" />
            <path d="M110 155 H160" stroke="#065f46" strokeWidth="2" />
            <path d="M110 170 H190" stroke="#065f46" strokeWidth="2" />

            {/* Buttons */}
            <circle cx="260" cy="140" r="10" fill="#ef4444" />
            <circle cx="260" cy="170" r="10" fill="#fbbf24" />
            <circle cx="260" cy="200" r="10" fill="#10b981" />

            {/* Gears */}
            <circle cx="320" cy="80" r="30" fill="transparent" stroke="#d97706" strokeWidth="4" strokeDasharray="8 4" className="animate-spin-slow" />
        </svg>
    )
}

export function CalendarIllustration() {
    return (
        <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Calendar Page */}
            <rect x="80" y="60" width="240" height="280" fill="#ffffff" rx="12" stroke="#e5e5e5" strokeWidth="2" />
            {/* Header */}
            <path d="M80 72 Q80 60 92 60 H308 Q320 60 320 72 V120 H80 V72 Z" fill="#065f46" />

            {/* Rings or Bindings */}
            <circle cx="120" cy="50" r="8" fill="#d97706" />
            <circle cx="280" cy="50" r="8" fill="#d97706" />

            {/* Grid */}
            <rect x="110" y="150" width="180" height="150" fill="transparent" />
            {/* Check Marks */}
            <path d="M130 180 L140 190 L160 170" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
            <path d="M130 220 L140 230 L160 210" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />

            {/* Highlight Circle */}
            <circle cx="260" cy="260" r="25" fill="none" stroke="#d97706" strokeWidth="2" />
        </svg>
    )
}
