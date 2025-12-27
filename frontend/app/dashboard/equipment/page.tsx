'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, Cpu, Wrench, MoreVertical, X, Loader2, Trash2, Plus } from 'lucide-react'
import { useEquipment } from '@/lib/hooks'
import type { Equipment } from '@/lib/types'

export default function EquipmentPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)

    const {
        data: equipment,
        loading,
        error,
        createEquipment,
        updateEquipment,
        deleteEquipment,
        refetch
    } = useEquipment({ search: searchTerm })

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this equipment?')) {
            try {
                await deleteEquipment(id)
            } catch (err) {
                alert('Failed to delete equipment')
            }
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Equipment Database</h1>
                    <p className="text-muted-foreground">Manage your assets, track warranties, and view maintenance history.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-10 px-4 rounded-lg border border-border bg-background hover:bg-muted font-medium text-sm flex items-center gap-2 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-md hover:brightness-110 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Asset
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name or serial number..."
                    className="pl-10 bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    Failed to load equipment. Make sure the backend server is running.
                </div>
            )}

            {/* Equipment Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : equipment && equipment.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipment.map((item) => (
                        <Card key={item.id} className="group hover:shadow-lg transition-all hover:-translate-y-1 border-border/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="h-10 w-10 rounded-lg bg-secondary/50 flex items-center justify-center text-primary">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setEditingEquipment(item)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg leading-none mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                                        <p className="text-xs text-muted-foreground font-mono">{item.serialNumber}</p>
                                    </div>
                                    <StatusBadge status={item.status} />
                                </div>

                                <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                                    <div className="flex justify-between border-b border-border/40 pb-2">
                                        <span>Category</span>
                                        <span className="font-medium text-foreground">{item.category}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-border/40 pb-2">
                                        <span>Location</span>
                                        <span className="font-medium text-foreground">{item.location || 'Not set'}</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                        <span>Last Service</span>
                                        <span className="font-medium text-foreground">
                                            {item.lastMaintained
                                                ? new Date(item.lastMaintained).toLocaleDateString()
                                                : 'Never'}
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2">
                                    <Wrench className="w-4 h-4" /> Schedule Maintenance
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <Cpu className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No equipment found</p>
                    <p className="text-sm">Add your first equipment to get started.</p>
                </div>
            )}

            {/* Add/Edit Modal */}
            {(showAddModal || editingEquipment) && (
                <EquipmentModal
                    equipment={editingEquipment}
                    onClose={() => {
                        setShowAddModal(false)
                        setEditingEquipment(null)
                    }}
                    onCreate={createEquipment}
                    onUpdate={updateEquipment}
                />
            )}
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        'Operational': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        'Maintenance Required': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        'Broken': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    }
    const colorClass = styles[status] || 'bg-gray-100 text-gray-700'

    return (
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${colorClass}`}>
            {status}
        </span>
    )
}

interface EquipmentModalProps {
    equipment: Equipment | null
    onClose: () => void
    onCreate: (data: any) => Promise<any>
    onUpdate: (id: number, data: any) => Promise<any>
}

function EquipmentModal({ equipment, onClose, onCreate, onUpdate }: EquipmentModalProps) {
    const [name, setName] = useState(equipment?.name || '')
    const [description, setDescription] = useState(equipment?.description || '')
    const [serialNumber, setSerialNumber] = useState(equipment?.serialNumber || '')
    const [status, setStatus] = useState(equipment?.status || 'Operational')
    const [category, setCategory] = useState(equipment?.category || 'General')
    const [location, setLocation] = useState(equipment?.location || '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (equipment) {
                await onUpdate(equipment.id, { name, description, serialNumber, status, category, location })
            } else {
                await onCreate({ name, description, serialNumber, status, category, location })
            }
            onClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save equipment')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold">{equipment ? 'Edit Equipment' : 'Add New Equipment'}</h2>
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
                        <label className="text-sm font-medium">Name *</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="CNC Milling Machine X1"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Serial Number *</label>
                        <Input
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            placeholder="CNC-2023-001"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="High-precision milling machine"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                            >
                                <option value="General">General</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Heavy Machinery">Heavy Machinery</option>
                                <option value="IT Infrastructure">IT Infrastructure</option>
                                <option value="Office">Office</option>
                                <option value="Logistics">Logistics</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                            >
                                <option value="Operational">Operational</option>
                                <option value="Maintenance Required">Maintenance Required</option>
                                <option value="Broken">Broken</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Floor A, Section 2"
                        />
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
                            {loading ? 'Saving...' : equipment ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
