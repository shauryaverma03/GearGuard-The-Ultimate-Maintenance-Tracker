'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Filter, Cpu, Wrench, MoreVertical } from 'lucide-react'

// Mock Data
const equipment = [
    { id: '1', name: 'CNC Milling Machine X1', category: 'Manufacturing', serial: 'CNC-2023-001', location: 'Floor A', status: 'Operational', lastMaintained: '2023-11-15' },
    { id: '2', name: 'Hydraulic Press 50T', category: 'Heavy Machinery', serial: 'HYD-2022-884', location: 'Floor B', status: 'Maintenance Required', lastMaintained: '2023-10-01' },
    { id: '3', name: 'Server Rack Main', category: 'IT Infrastructure', serial: 'IT-SRV-09', location: 'Server Room', status: 'Operational', lastMaintained: '2023-12-01' },
    { id: '4', name: 'Industrial Printer', category: 'Office', serial: 'PRT-992', location: 'Office 2', status: 'Broken', lastMaintained: '2023-08-20' },
    { id: '5', name: 'Forklift Model Z', category: 'Logistics', serial: 'FL-221', location: 'Warehouse', status: 'Operational', lastMaintained: '2023-11-20' },
]

export default function EquipmentPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredEquipment = equipment.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serial.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                    <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-md hover:brightness-110 transition-all">
                        + Add Asset
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

            {/* Equipment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((item) => (
                    <Card key={item.id} className="group hover:shadow-lg transition-all hover:-translate-y-1 border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-10 w-10 rounded-lg bg-secondary/50 flex items-center justify-center text-primary">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <button className="text-muted-foreground hover:text-foreground">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg leading-none mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground font-mono">{item.serial}</p>
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
                                    <span className="font-medium text-foreground">{item.location}</span>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <span>Last Service</span>
                                    <span className="font-medium text-foreground">{item.lastMaintained}</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2">
                                <Wrench className="w-4 h-4" /> Schedule Maintenance
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        'Operational': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        'Maintenance Required': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        'Broken': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    }
    const colorClass = styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700'

    return (
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${colorClass}`}>
            {status}
        </span>
    )
}
