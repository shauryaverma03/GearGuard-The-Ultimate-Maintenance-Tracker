'use client'

import { useState } from 'react'
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Clock, MoreHorizontal } from 'lucide-react'

// Mock Data
type Status = 'New' | 'In Progress' | 'Repaired' | 'Scrap'

interface Request {
    id: string
    title: string
    equipment: string
    team: string
    status: Status
    priority: 'Low' | 'Medium' | 'High' | 'Critical'
    date: string
}

const initialRequests: Request[] = [
    { id: '1', title: 'Leaking Hydraulic Pump', equipment: 'CNC Machine 01', team: 'Mechanics', status: 'New', priority: 'High', date: 'Today' },
    { id: '2', title: 'Monitor Flickering', equipment: 'Control Panel', team: 'Electricians', status: 'New', priority: 'Low', date: 'Yesterday' },
    { id: '3', title: 'Belt Replacement', equipment: 'Conveyor 04', team: 'Mechanics', status: 'In Progress', priority: 'Medium', date: '2 days ago' },
    { id: '4', title: 'Filter Change', equipment: 'HVAC Unit', team: 'Maintenance', status: 'Repaired', priority: 'Low', date: 'Last Week' },
    { id: '5', title: 'Cracked Casing', equipment: 'Drill Press', team: 'Mechanics', status: 'Scrap', priority: 'Critical', date: 'Last Month' },
]

export default function KanbanPage() {
    const [items, setItems] = useState<Request[]>(initialRequests)
    const [activeId, setActiveId] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event

        if (!over) {
            setActiveId(null)
            return
        }

        const activeId = active.id
        const overId = over.id

        // Find the container (status) we are dropping over
        // If hovering over a card, find its status
        // If hovering over a column, use that status

        let newStatus: Status | undefined

        if (['New', 'In Progress', 'Repaired', 'Scrap'].includes(overId)) {
            newStatus = overId as Status
        } else {
            const overItem = items.find(item => item.id === overId)
            if (overItem) newStatus = overItem.status
        }

        if (newStatus) {
            setItems((items) => items.map(item =>
                item.id === activeId ? { ...item, status: newStatus! } : item
            ))
        }

        setActiveId(null)
    }

    const columns: Status[] = ['New', 'In Progress', 'Repaired', 'Scrap']

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
                    <p className="text-muted-foreground">Drag and drop requests to update their status.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
                    + New Request
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full overflow-auto pb-10">
                    {columns.map((column) => (
                        <div key={column} className="flex flex-col h-full bg-muted/30 rounded-2xl border border-border/50 p-4">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h2 className="font-bold text-lg">{column}</h2>
                                <span className="bg-background/80 px-2 py-0.5 rounded-full text-xs font-bold border border-border/50">
                                    {items.filter(i => i.status === column).length}
                                </span>
                            </div>

                            <SortableContext
                                id={column}
                                items={items.filter(i => i.status === column).map(i => i.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="flex-1 space-y-3">
                                    {items.filter(item => item.status === column).map((item) => (
                                        <SortableItem key={item.id} id={item.id} item={item} />
                                    ))}
                                </div>
                            </SortableContext>
                        </div>
                    ))}
                </div>

                <DragOverlay>
                    {activeId ? (
                        <RequestCard item={items.find(i => i.id === activeId)!} isOverlay />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}

function SortableItem({ id, item }: { id: string, item: Request }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <RequestCard item={item} />
        </div>
    )
}

function RequestCard({ item, isOverlay }: { item: Request, isOverlay?: boolean }) {
    return (
        <Card className={`cursor-grab active:cursor-grabbing hover:shadow-lg transition-all border-l-4 ${item.priority === 'Critical' ? 'border-l-destructive' :
                item.priority === 'High' ? 'border-l-orange-500' :
                    item.priority === 'Medium' ? 'border-l-yellow-500' : 'border-l-blue-500'
            } ${isOverlay ? 'shadow-2xl scale-105 rotate-2' : ''}`}>
            <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm leading-tight">{item.title}</h3>
                    <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{item.equipment}</span>
                    <span>{item.team}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary">JD</div>
                    </div>
                    {item.priority === 'Critical' && (
                        <div className="flex items-center gap-1 text-destructive font-bold text-[10px] uppercase">
                            <AlertCircle className="w-3 h-3" /> Overdue
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
