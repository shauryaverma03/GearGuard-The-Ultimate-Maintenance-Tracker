'use client'

import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { KanbanCard, Ticket } from './KanbanCard'
import { cn } from '@/lib/utils'

interface ColumnProps {
    id: string
    title: string
    tickets: Ticket[]
    color?: string
}

export function KanbanColumn({ id, title, tickets, color = 'bg-secondary' }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    })

    return (
        <div className="flex flex-col h-full min-w-[300px] w-[300px] bg-background/20 backdrop-blur-sm rounded-xl border border-white/5 mx-2">
            <div className={cn("p-4 border-b border-white/10 flex items-center justify-between rounded-t-xl glass-header", isOver && "bg-primary/10")}>
                <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]", color)} />
                    <h3 className="font-bold text-sm uppercase tracking-wider">{title}</h3>
                </div>
                <span className="text-xs font-bold bg-background/50 px-2 py-1 rounded-md text-muted-foreground">{tickets.length}</span>
            </div>

            <div
                ref={setNodeRef}
                className={cn("flex-1 p-3 overflow-y-auto scrollbar-hide space-y-3 transition-colors", isOver && "bg-primary/5")}
            >
                {tickets.map((ticket) => (
                    <KanbanCard key={ticket.id} ticket={ticket} />
                ))}
                {tickets.length === 0 && (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-muted rounded-lg m-2">
                        <span className="text-xs text-muted-foreground font-medium">Drop here</span>
                    </div>
                )}
            </div>
        </div>
    )
}
