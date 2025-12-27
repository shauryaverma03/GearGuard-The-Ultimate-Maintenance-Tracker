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
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertCircle, MoreHorizontal, X, Loader2, Plus } from 'lucide-react'
import { useTasks, useEquipment } from '@/lib/hooks'
import type { Task, Equipment } from '@/lib/types'

type Status = 'New' | 'In Progress' | 'Repaired' | 'Scrap'

export default function KanbanPage() {
    const { data: tasks, loading, error, createTask, updateTaskStatus, refetch } = useTasks()
    const { data: equipment } = useEquipment()
    const [activeId, setActiveId] = useState<string | null>(null)
    const [showAddModal, setShowAddModal] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = async (event: any) => {
        const { active, over } = event

        if (!over) {
            setActiveId(null)
            return
        }

        const activeId = active.id
        const overId = over.id

        let newStatus: Status | undefined

        if (['New', 'In Progress', 'Repaired', 'Scrap'].includes(overId)) {
            newStatus = overId as Status
        } else {
            const overItem = tasks?.find(item => item.id.toString() === overId)
            if (overItem) newStatus = overItem.status as Status
        }

        if (newStatus) {
            const taskId = parseInt(activeId)
            const currentTask = tasks?.find(t => t.id === taskId)

            if (currentTask && currentTask.status !== newStatus) {
                try {
                    await updateTaskStatus(taskId, newStatus)
                } catch (err) {
                    console.error('Failed to update task status:', err)
                    refetch()
                }
            }
        }

        setActiveId(null)
    }

    const columns: Status[] = ['New', 'In Progress', 'Repaired', 'Scrap']

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
                    <p className="text-muted-foreground">Drag and drop requests to update their status.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> New Request
                </button>
            </div>

            {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    Failed to load tasks. Make sure the backend server is running.
                </div>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full overflow-auto pb-10">
                    {columns.map((column) => {
                        const columnTasks = tasks?.filter(t => t.status === column) || []
                        return (
                            <div key={column} id={column} className="flex flex-col h-full bg-muted/30 rounded-2xl border border-border/50 p-4">
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <h2 className="font-bold text-lg">{column}</h2>
                                    <span className="bg-background/80 px-2 py-0.5 rounded-full text-xs font-bold border border-border/50">
                                        {columnTasks.length}
                                    </span>
                                </div>

                                <SortableContext
                                    id={column}
                                    items={columnTasks.map(t => t.id.toString())}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="flex-1 space-y-3 min-h-[100px]">
                                        {columnTasks.map((item) => (
                                            <SortableItem key={item.id} id={item.id.toString()} item={item} />
                                        ))}
                                        {columnTasks.length === 0 && (
                                            <div className="text-center py-8 text-muted-foreground text-sm">
                                                Drop tasks here
                                            </div>
                                        )}
                                    </div>
                                </SortableContext>
                            </div>
                        )
                    })}
                </div>

                <DragOverlay>
                    {activeId && tasks ? (
                        <RequestCard item={tasks.find(i => i.id.toString() === activeId)!} isOverlay />
                    ) : null}
                </DragOverlay>
            </DndContext>

            {/* Add Task Modal */}
            {showAddModal && (
                <AddTaskModal
                    equipment={equipment || []}
                    onClose={() => setShowAddModal(false)}
                    onCreate={createTask}
                />
            )}
        </div>
    )
}

function SortableItem({ id, item }: { id: string, item: Task }) {
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

function RequestCard({ item, isOverlay }: { item: Task, isOverlay?: boolean }) {
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
                    <span className="font-medium text-foreground">{item.equipment?.name || 'Unknown Equipment'}</span>
                    <span>{item.team}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary">
                            {item.user?.name?.[0] || 'U'}
                        </div>
                    </div>
                    {item.priority === 'Critical' && (
                        <div className="flex items-center gap-1 text-destructive font-bold text-[10px] uppercase">
                            <AlertCircle className="w-3 h-3" /> Critical
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

interface AddTaskModalProps {
    equipment: Equipment[]
    onClose: () => void
    onCreate: (data: any) => Promise<any>
}

function AddTaskModal({ equipment, onClose, onCreate }: AddTaskModalProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('Medium')
    const [team, setTeam] = useState('Maintenance')
    const [equipmentId, setEquipmentId] = useState<number | null>(equipment[0]?.id || null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!equipmentId) {
            setError('Please select equipment')
            return
        }

        setLoading(true)
        setError(null)

        try {
            await onCreate({
                title,
                description,
                priority,
                team,
                equipmentId,
                status: 'New'
            })
            onClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create task')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold">New Maintenance Request</h2>
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
                        <label className="text-sm font-medium">Title *</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Leaking Hydraulic Pump"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the issue..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Equipment *</label>
                        <select
                            value={equipmentId || ''}
                            onChange={(e) => setEquipmentId(parseInt(e.target.value))}
                            className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                            required
                        >
                            <option value="">Select Equipment</option>
                            {equipment.map(eq => (
                                <option key={eq.id} value={eq.id}>{eq.name} ({eq.serialNumber})</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Team</label>
                            <select
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                            >
                                <option value="Maintenance">Maintenance</option>
                                <option value="Mechanics">Mechanics</option>
                                <option value="Electricians">Electricians</option>
                                <option value="IT">IT</option>
                            </select>
                        </div>
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
                            {loading ? 'Creating...' : 'Create Request'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
