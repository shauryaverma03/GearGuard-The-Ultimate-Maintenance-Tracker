'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Loader2 } from "lucide-react"
import { useCalendarEvents, useEquipment } from '@/lib/hooks'
import type { MaintenanceEvent, Equipment } from '@/lib/types'

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [showAddModal, setShowAddModal] = useState(false)

    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const { data: events, loading, error, createEvent } = useCalendarEvents({
        month: currentMonth,
        year: currentYear
    })
    const { data: equipment } = useEquipment()

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthName = currentDate.toLocaleString('default', { month: 'long' })

    // Generate calendar days
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const startingDay = firstDayOfMonth.getDay()

    const calendarDays: (number | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        calendarDays.push(null)
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day)
    }

    // Fill remaining cells to complete the grid (up to 42 cells for 6 rows)
    while (calendarDays.length < 42) {
        calendarDays.push(null)
    }

    const today = new Date()
    const isToday = (day: number) => {
        return day === today.getDate() &&
            currentMonth === today.getMonth() + 1 &&
            currentYear === today.getFullYear()
    }

    const getEventsForDay = (day: number) => {
        if (!events) return []
        return events.filter(event => {
            const eventDate = new Date(event.eventDate)
            return eventDate.getDate() === day &&
                eventDate.getMonth() + 1 === currentMonth &&
                eventDate.getFullYear() === currentYear
        })
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 2, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth, 1))
    }

    const getEventColor = (eventType: string) => {
        switch (eventType) {
            case 'Corrective':
                return 'bg-destructive/10 border-l-destructive text-destructive'
            case 'Inspection':
                return 'bg-yellow-500/10 border-l-yellow-500 text-yellow-600'
            default: // Preventive
                return 'bg-primary/10 border-l-primary text-primary'
        }
    }

    return (
        <div className="h-full flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Preventive Schedule</h1>
                    <p className="text-muted-foreground">Plan and view upcoming maintenance tasks.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Event
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    Failed to load events. Make sure the backend server is running.
                </div>
            )}

            <Card className="flex-1 flex flex-col border-border/50 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/20">
                    <h2 className="text-2xl font-serif font-bold text-foreground flex items-center gap-3">
                        <CalendarIcon className="w-6 h-6 text-primary" />
                        {monthName} {currentYear}
                    </h2>
                    <div className="flex gap-4 text-sm font-medium">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /> Preventive</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive" /> Corrective</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /> Inspection</div>
                    </div>
                </div>

                <div className="grid grid-cols-7 border-b border-border/50 bg-muted/40">
                    {days.map(day => (
                        <div key={day} className="py-4 text-center font-bold text-muted-foreground uppercase tracking-widest text-xs">
                            {day}
                        </div>
                    ))}
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <div className="flex-1 grid grid-cols-7 bg-card">
                        {calendarDays.map((day, idx) => {
                            const dayEvents = day ? getEventsForDay(day) : []
                            return (
                                <div
                                    key={idx}
                                    className={`min-h-[120px] p-2 border-r border-b border-border/30 relative group hover:bg-muted/10 transition-colors ${!day ? 'bg-muted/5' : ''}`}
                                >
                                    {day && (
                                        <>
                                            <span className={`text-sm font-medium p-1 rounded-full w-8 h-8 flex items-center justify-center ${isToday(day) ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground'
                                                }`}>
                                                {day}
                                            </span>

                                            {dayEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className={`mt-1 border-l-2 p-1.5 rounded text-[10px] font-medium hover:brightness-110 cursor-pointer transition-colors block truncate ${getEventColor(event.eventType)}`}
                                                    title={`${event.title}${event.equipment ? ` - ${event.equipment.name}` : ''}`}
                                                >
                                                    {event.title}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </Card>

            {/* Add Event Modal */}
            {showAddModal && (
                <AddEventModal
                    equipment={equipment || []}
                    currentDate={currentDate}
                    onClose={() => setShowAddModal(false)}
                    onCreate={createEvent}
                />
            )}
        </div>
    )
}

interface AddEventModalProps {
    equipment: Equipment[]
    currentDate: Date
    onClose: () => void
    onCreate: (data: any) => Promise<any>
}

function AddEventModal({ equipment, currentDate, onClose, onCreate }: AddEventModalProps) {
    const defaultDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [eventDate, setEventDate] = useState(defaultDate.toISOString().split('T')[0])
    const [eventType, setEventType] = useState('Preventive')
    const [equipmentId, setEquipmentId] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await onCreate({
                title,
                description: description || undefined,
                eventDate,
                eventType,
                equipmentId: equipmentId || undefined
            })
            onClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create event')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold">Schedule Maintenance Event</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Event Title *</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="HVAC Inspection"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Quarterly maintenance check"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date *</label>
                            <Input
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Event Type</label>
                            <select
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                            >
                                <option value="Preventive">Preventive</option>
                                <option value="Corrective">Corrective</option>
                                <option value="Inspection">Inspection</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Equipment (Optional)</label>
                        <select
                            value={equipmentId || ''}
                            onChange={(e) => setEquipmentId(e.target.value ? parseInt(e.target.value) : null)}
                            className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                        >
                            <option value="">No specific equipment</option>
                            {equipment.map(eq => (
                                <option key={eq.id} value={eq.id}>{eq.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="premium"
                            disabled={loading}
                            className="flex-1"
                        >
                            {loading ? 'Creating...' : 'Schedule Event'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
