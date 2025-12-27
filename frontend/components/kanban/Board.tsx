'use client'

import React, { useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard, Ticket } from './KanbanCard'
import { createPortal } from 'react-dom'

const initialData: Record<string, Ticket[]> = {
    'new': [
        { id: 'T-101', title: 'Oil Leakage in CMC', machine: 'CNC Machine 01', priority: 'high', dueDate: 'Today' },
        { id: 'T-102', title: 'Conveyor Belt Jam', machine: 'Assembly Line A', priority: 'medium', dueDate: 'Tomorrow' },
    ],
    'in_progress': [
        { id: 'T-098', title: 'Calibration Error', machine: 'Robotic Arm #2', priority: 'low', dueDate: '2 days ago' },
    ],
    'repaired': [
        { id: 'T-090', title: 'Screen flicker', machine: 'Control Panel', priority: 'low', dueDate: 'Last Week' },
    ],
    'scrap': []
}

export default function KanbanBoard() {
    const [columns, setColumns] = useState(initialData)
    const [activeTicket, setActiveTicket] = useState<Ticket | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    const handleDragStart = (event: any) => {
        const { active } = event
        // Find ticket
        const ticketId = active.id
        let foundTicket: Ticket | null = null

        Object.values(columns).forEach(list => {
            const t = list.find(x => x.id === ticketId)
            if (t) foundTicket = t
        })

        setActiveTicket(foundTicket)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        const ticketId = active.id as string
        const overId = over.id as string

        // Find source column
        const sourceCol = Object.keys(columns).find(key => columns[key].some(t => t.id === ticketId))
        const destCol = overId

        if (!sourceCol || !destCol || sourceCol === destCol) {
            setActiveTicket(null)
            return
        }

        // Move ticket
        setColumns(prev => {
            const ticket = prev[sourceCol].find(t => t.id === ticketId)!
            return {
                ...prev,
                [sourceCol]: prev[sourceCol].filter(t => t.id !== ticketId),
                [destCol]: [...prev[destCol], ticket]
            }
        })

        setActiveTicket(null)
    }

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex h-[calc(100vh-140px)] overflow-x-auto pb-4 gap-2">
                <KanbanColumn id="new" title="New Request" tickets={columns['new']} color="bg-blue-500" />
                <KanbanColumn id="in_progress" title="In Progress" tickets={columns['in_progress']} color="bg-amber-500" />
                <KanbanColumn id="repaired" title="Repaired" tickets={columns['repaired']} color="bg-emerald-500" />
                <KanbanColumn id="scrap" title="Scrap" tickets={columns['scrap']} color="bg-destructive" />
            </div>

            {typeof document !== 'undefined' && createPortal(
                <DragOverlay>
                    {activeTicket ? (
                        <div className="opacity-90 rotate-2 scale-105 cursor-grabbing">
                            <KanbanCard ticket={activeTicket} />
                        </div>
                    ) : null}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    )
}
