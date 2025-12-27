import React from 'react'

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="currentColor" className="text-primary" />
        <path d="M20 10L22.2 16.8H29.3L23.6 21L25.8 27.8L20 23.6L14.2 27.8L16.4 21L10.7 16.8H17.8L20 10Z" fill="currentColor" className="text-primary-foreground" />
    </svg>
)
