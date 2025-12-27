'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"

export default function CalendarPage() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const currentDate = new Date()
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
    const currentYear = currentDate.getFullYear()

    // Mock days generator for a 35-day grid (roughly)
    const calendarDays = Array.from({ length: 35 }, (_, i) => {
        const day = i - 2 // Offset to start month correctly (mock logic)
        return day > 0 && day <= 30 ? day : null
    })

    return (
        <div className="h-full flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Preventive Schedule</h1>
                    <p className="text-muted-foreground">Plan and view upcoming maintenance tasks.</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                    <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"><ChevronRight className="w-5 h-5" /></button>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Event
                    </button>
                </div>
            </div>

            <Card className="flex-1 flex flex-col border-border/50 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/20">
                    <h2 className="text-2xl font-serif font-bold text-foreground flex items-center gap-3">
                        <CalendarIcon className="w-6 h-6 text-primary" />
                        {currentMonth} {currentYear}
                    </h2>
                    <div className="flex gap-4 text-sm font-medium">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /> Preventive</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive" /> Critical</div>
                    </div>
                </div>

                <div className="grid grid-cols-7 border-b border-border/50 bg-muted/40">
                    {days.map(day => (
                        <div key={day} className="py-4 text-center font-bold text-muted-foreground uppercase tracking-widest text-xs">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="flex-1 grid grid-cols-7 bg-card">
                    {calendarDays.map((day, idx) => (
                        <div key={idx} className={`min-h-[120px] p-2 border-r border-b border-border/30 relative group hover:bg-muted/10 transition-colors ${!day ? 'bg-muted/5' : ''}`}>
                            {day && (
                                <>
                                    <span className={`text-sm font-medium p-1 rounded-full w-8 h-8 flex items-center justify-center ${day === currentDate.getDate() ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground'}`}>
                                        {day}
                                    </span>

                                    {/* Mock Events */}
                                    {day === 12 && (
                                        <div className="mt-2 bg-primary/10 border-l-2 border-primary p-1.5 rounded text-[10px] font-medium text-primary hover:bg-primary/20 cursor-pointer transition-colors block truncate">
                                            HVAC Inspection
                                        </div>
                                    )}
                                    {day === 24 && (
                                        <div className="mt-2 bg-destructive/10 border-l-2 border-destructive p-1.5 rounded text-[10px] font-medium text-destructive hover:bg-destructive/20 cursor-pointer transition-colors block truncate">
                                            Safety Audit
                                        </div>
                                    )}
                                    {day === 24 && (
                                        <div className="mt-1 bg-yellow-500/10 border-l-2 border-yellow-500 p-1.5 rounded text-[10px] font-medium text-yellow-600 hover:bg-yellow-500/20 cursor-pointer transition-colors block truncate">
                                            Oil Change
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
