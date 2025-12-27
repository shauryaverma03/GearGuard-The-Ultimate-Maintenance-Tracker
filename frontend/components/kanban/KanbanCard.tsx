'use client'

import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MoreHorizontal, Clock, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Ticket = {
    id: string
    title: string
    machine: string
    priority: 'low' | 'medium' | 'high'
    dueDate: string
    assignedTo?: string
}

export function KanbanCard({ ticket }: { ticket: Ticket }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: ticket.id,
    })

    const style = transform ? {
        transform: CSS.Translate.toString(transform),
    } : undefined

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none mb-3">
            <Card className="cursor-grab active:cursor-grabbing border-l-4 hover:shadow-lg transition-all group backdrop-blur-md bg-white/50 dark:bg-black/40 border-white/10 dark:border-white/5"
                style={{ borderLeftColor: ticket.priority === 'high' ? 'var(--destructive)' : ticket.priority === 'medium' ? 'orange' : 'var(--primary)' }}
            >
                <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                            {ticket.id}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm leading-tight mb-1">{ticket.title}</h4>
                        <p className="text-xs text-muted-foreground font-medium">{ticket.machine}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{ticket.dueDate}</span>
                        </div>
                        {ticket.priority === 'high' && (
                            <div className="flex items-center gap-1 text-xs font-bold text-destructive animate-pulse">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Crit</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
