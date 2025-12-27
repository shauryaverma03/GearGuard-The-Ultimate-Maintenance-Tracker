// Type definitions matching backend Prisma models

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    _count?: {
        tasks: number;
    };
}

export interface Equipment {
    id: number;
    name: string;
    description: string;
    serialNumber: string;
    status: 'Operational' | 'Maintenance Required' | 'Broken';
    category: string;
    location: string;
    lastMaintained: string | null;
    createdAt: string;
    updatedAt: string;
    _count?: {
        tasks: number;
    };
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'New' | 'In Progress' | 'Repaired' | 'Scrap';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    team: string;
    assignedDate: string;
    completionDate: string | null;
    equipmentId: number;
    userId: number | null;
    createdAt: string;
    updatedAt: string;
    equipment?: {
        id: number;
        name: string;
        serialNumber: string;
    };
    user?: {
        id: number;
        name: string;
        role?: string;
    } | null;
}

export interface MaintenanceEvent {
    id: number;
    title: string;
    description: string | null;
    eventDate: string;
    eventType: 'Preventive' | 'Corrective' | 'Inspection';
    equipmentId: number | null;
    createdAt: string;
    equipment?: {
        id: number;
        name: string;
        serialNumber: string;
    } | null;
}

export interface DashboardStats {
    tasks: {
        total: number;
        new: number;
        inProgress: number;
        repaired: number;
        scrap: number;
        critical: number;
    };
    equipment: {
        total: number;
        operational: number;
        maintenanceRequired: number;
        broken: number;
    };
    users: {
        total: number;
    };
    metrics: {
        completionRate: number;
        avgRepairTime: string;
        upcomingEvents: number;
    };
    recentActivity: {
        id: number;
        title: string;
        equipment: string;
        user: string;
        status: string;
        priority: string;
        createdAt: string;
    }[];
}

export interface TeamStats {
    name: string;
    activeTasks: number;
    completedTasks: number;
    totalTasks: number;
}

export interface LoginResponse {
    message: string;
    user: User;
}

export interface ApiError {
    error: string;
}
