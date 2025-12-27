import React from 'react'

export function Footer() {
    return (
        <footer className="relative bg-muted/80 text-foreground py-20 overflow-hidden border-t border-border">
            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-3xl font-bold text-primary mb-4 font-serif">GearGuard.</h2>
                    <p className="max-w-md text-muted-foreground leading-relaxed">
                        Elevating maintenance management to a royal standard.
                        Precision tracking, automated workflows, and premium intelligence for your most valuable assets.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-primary mb-4 uppercase tracking-widest text-sm">Platform</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                        <li><a href="#" className="hover:text-primary transition-colors">Equipment Database</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Maintenance Requests</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Calendar & Kanban</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Reports & Analytics</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-primary mb-4 uppercase tracking-widest text-sm">Company</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                        <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Legal</a></li>
                    </ul>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <div className="flex flex-col gap-1 text-center md:text-left">
                     <span className="font-medium text-foreground">Designed for maintenance teams, not spreadsheets.</span>
                     <p>&copy; 2025 GearGuard Inc. All rights reserved.</p>
                </div>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-foreground">Privacy Policy</a>
                    <a href="#" className="hover:text-foreground">Terms of Service</a>
                </div>
            </div>
        </footer>
    )
}
