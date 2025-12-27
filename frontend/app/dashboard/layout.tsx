import Link from 'next/link'
import { LayoutDashboard, Database, ClipboardList, CalendarDays, Users, Settings, Bell } from 'lucide-react'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full bg-background/50">
            {/* Sidebar */}
            <aside className="hidden w-72 flex-col border-r border-border/40 bg-card/50 backdrop-blur-xl lg:flex z-50 transition-all duration-300">
                <div className="flex h-24 items-center gap-3 px-8 border-b border-border/40">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">GG</div>
                    <span className="font-serif text-2xl font-bold tracking-tight text-foreground">GearGuard</span>
                </div>
                <nav className="flex-1 overflow-auto py-8 px-4 space-y-2">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-4 mb-4 mt-2">Core Modules</div>

                    <Link href="/dashboard" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10 font-medium">
                        <LayoutDashboard className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Dashboard
                    </Link>
                    <Link href="/dashboard/equipment" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10 font-medium">
                        <Database className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Equipment
                    </Link>
                    <Link href="/dashboard/requests" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10 font-medium">
                        <ClipboardList className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Maintenance Requests
                    </Link>
                    <Link href="/dashboard/calendar" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10 font-medium">
                        <CalendarDays className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Schedule
                    </Link>

                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-4 mb-4 mt-8">Administration</div>

                    <Link href="/dashboard/teams" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10 font-medium">
                        <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Teams
                    </Link>
                    <Link href="/dashboard/settings" className="group flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10 font-medium">
                        <Settings className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Settings
                    </Link>
                </nav>
                <div className="p-6 border-t border-border/40">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/10">
                        <h4 className="font-bold text-sm text-primary mb-1">Need Help?</h4>
                        <p className="text-xs text-muted-foreground mb-3">Contact support or read the docs.</p>
                        <button className="text-xs bg-background hover:bg-white text-foreground px-3 py-2 rounded-lg shadow-sm border border-border/50 transition-colors w-full font-medium">Documentation</button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 flex-col overflow-hidden bg-muted/20">
                <header className="flex h-20 items-center justify-between gap-4 border-b border-border/40 bg-background/60 backdrop-blur-xl px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <h2 className="font-semibold text-foreground">Overview</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-background animate-pulse" />
                        </button>
                        <div className="h-6 w-px bg-border/60" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold leading-none">John Doe</p>
                                <p className="text-xs text-muted-foreground">Lead Technician</p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-sm">JD</div>
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-6 md:p-10 scrollbar-hide">
                    {children}
                </div>
            </main>
        </div>
    )
}
