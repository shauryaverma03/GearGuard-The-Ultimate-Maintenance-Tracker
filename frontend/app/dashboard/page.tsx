'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, CheckCircle2, Timer } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold tracking-tight">Overview</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Last updated: Just now</span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                        <AlertCircle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92</div>
                        <p className="text-xs text-muted-foreground">98% completion rate</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Repair Time</CardTitle>
                        <Timer className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2.4h</div>
                        <p className="text-xs text-muted-foreground">-30m from average</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Areas */}
            <div className="grid gap-6 md:grid-cols-7">
                <Card className="col-span-4 bg-background/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">CNC Machine #04 Breakdown</p>
                                        <p className="text-xs text-muted-foreground">Reported by John Doe • 2 hours ago</p>
                                    </div>
                                    <div className="text-xs font-bold px-2 py-1 rounded bg-destructive/10 text-destructive">Criitcal</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-primary/5 border-none">
                    <CardHeader>
                        <CardTitle>Team Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">M</div>
                                    <div>
                                        <p className="text-sm font-bold">Mechanics</p>
                                        <p className="text-xs text-muted-foreground">4 Active Tasks</p>
                                    </div>
                                </div>
                                <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[70%]" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold">E</div>
                                    <div>
                                        <p className="text-sm font-bold">Electricians</p>
                                        <p className="text-xs text-muted-foreground">2 Active Tasks</p>
                                    </div>
                                </div>
                                <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[40%]" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
