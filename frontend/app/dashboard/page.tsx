'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, CheckCircle2, Timer, Loader2 } from "lucide-react"
import { useDashboardStats, useTeamStats } from "@/lib/hooks"

export default function DashboardPage() {
    const { data: stats, loading: statsLoading, error: statsError } = useDashboardStats()
    const { data: teams, loading: teamsLoading } = useTeamStats()

    // Format relative time
    const formatRelativeTime = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Just now'
        if (diffMins < 60) return `${diffMins} min ago`
        if (diffHours < 24) return `${diffHours} hours ago`
        return `${diffDays} days ago`
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold tracking-tight">Overview</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {statsLoading ? 'Loading...' : 'Last updated: Just now'}
                    </span>
                </div>
            </div>

            {statsError && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    Failed to load dashboard data. Make sure the backend server is running.
                </div>
            )}

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{stats?.tasks.total || 0}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats?.tasks.new || 0} new, {stats?.tasks.inProgress || 0} in progress
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                        <AlertCircle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{stats?.tasks.critical || 0}</div>
                                <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{stats?.tasks.repaired || 0}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats?.metrics.completionRate || 0}% completion rate
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Repair Time</CardTitle>
                        <Timer className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                            <>
                                <div className="text-2xl font-bold">{stats?.metrics.avgRepairTime || 'N/A'}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats?.metrics.upcomingEvents || 0} events scheduled
                                </p>
                            </>
                        )}
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
                            {statsLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : stats?.recentActivity && stats.recentActivity.length > 0 ? (
                                stats.recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center gap-4 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                                        <div className={`h-2 w-2 rounded-full ${activity.priority === 'Critical' ? 'bg-destructive' :
                                                activity.priority === 'High' ? 'bg-orange-500' :
                                                    activity.priority === 'Medium' ? 'bg-yellow-500' : 'bg-primary'
                                            }`} />
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{activity.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {activity.equipment} • {formatRelativeTime(activity.createdAt)}
                                            </p>
                                        </div>
                                        <div className={`text-xs font-bold px-2 py-1 rounded ${activity.priority === 'Critical' ? 'bg-destructive/10 text-destructive' :
                                                activity.priority === 'High' ? 'bg-orange-500/10 text-orange-500' :
                                                    activity.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {activity.priority}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No recent activity. Create a maintenance request to get started.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-primary/5 border-none">
                    <CardHeader>
                        <CardTitle>Team Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {teamsLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : teams && teams.length > 0 ? (
                                teams.map((team, index) => {
                                    const colors = ['blue', 'purple', 'green', 'orange']
                                    const color = colors[index % colors.length]
                                    const percentage = team.totalTasks > 0
                                        ? Math.round((team.activeTasks / team.totalTasks) * 100)
                                        : 0

                                    return (
                                        <div key={team.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-10 w-10 rounded-full bg-${color}-500/20 flex items-center justify-center text-${color}-500 font-bold`}>
                                                    {team.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{team.name}</p>
                                                    <p className="text-xs text-muted-foreground">{team.activeTasks} Active Tasks</p>
                                                </div>
                                            </div>
                                            <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-${color}-500`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">M</div>
                                            <div>
                                                <p className="text-sm font-bold">Mechanics</p>
                                                <p className="text-xs text-muted-foreground">0 Active Tasks</p>
                                            </div>
                                        </div>
                                        <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-0" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold">E</div>
                                            <div>
                                                <p className="text-sm font-bold">Electricians</p>
                                                <p className="text-xs text-muted-foreground">0 Active Tasks</p>
                                            </div>
                                        </div>
                                        <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-0" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
