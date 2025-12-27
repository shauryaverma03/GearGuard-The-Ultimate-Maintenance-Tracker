// Centralized API client for all backend communication
import type {
    User,
    Equipment,
    Task,
    MaintenanceEvent,
    DashboardStats,
    TeamStats,
    LoginResponse
} from './types';

// Backend API base URL - configure via environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Generic fetch wrapper with error handling
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(`API request failed: ${endpoint}`, error);
        throw error;
    }
}

// ============ USER API ============
export const userApi = {
    register: (data: { name: string; email: string; password: string; role?: string }) =>
        apiRequest<User>('/users/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    login: (data: { email: string; password: string }) =>
        apiRequest<LoginResponse>('/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getAll: () =>
        apiRequest<User[]>('/users'),

    getById: (id: number) =>
        apiRequest<User>(`/users/${id}`),

    update: (id: number, data: Partial<User>) =>
        apiRequest<User>(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id: number) =>
        apiRequest<{ message: string }>(`/users/${id}`, {
            method: 'DELETE',
        }),
};

// ============ EQUIPMENT API ============
export const equipmentApi = {
    getAll: (params?: { status?: string; category?: string; search?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.status) searchParams.append('status', params.status);
        if (params?.category) searchParams.append('category', params.category);
        if (params?.search) searchParams.append('search', params.search);

        const query = searchParams.toString();
        return apiRequest<Equipment[]>(`/equipment${query ? `?${query}` : ''}`);
    },

    getById: (id: number) =>
        apiRequest<Equipment>(`/equipment/${id}`),

    create: (data: {
        name: string;
        description?: string;
        serialNumber: string;
        status?: string;
        category?: string;
        location?: string;
    }) =>
        apiRequest<Equipment>('/equipment', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (id: number, data: Partial<Equipment>) =>
        apiRequest<Equipment>(`/equipment/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id: number) =>
        apiRequest<{ message: string }>(`/equipment/${id}`, {
            method: 'DELETE',
        }),
};

// ============ TASKS API ============
export const tasksApi = {
    getAll: (params?: { status?: string; priority?: string; team?: string; equipmentId?: number }) => {
        const searchParams = new URLSearchParams();
        if (params?.status) searchParams.append('status', params.status);
        if (params?.priority) searchParams.append('priority', params.priority);
        if (params?.team) searchParams.append('team', params.team);
        if (params?.equipmentId) searchParams.append('equipmentId', params.equipmentId.toString());

        const query = searchParams.toString();
        return apiRequest<Task[]>(`/tasks${query ? `?${query}` : ''}`);
    },

    getById: (id: number) =>
        apiRequest<Task>(`/tasks/${id}`),

    create: (data: {
        title: string;
        description?: string;
        status?: string;
        priority?: string;
        team?: string;
        equipmentId: number;
        userId?: number;
    }) =>
        apiRequest<Task>('/tasks', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (id: number, data: Partial<Task>) =>
        apiRequest<Task>(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    updateStatus: (id: number, status: string) =>
        apiRequest<Task>(`/tasks/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        }),

    delete: (id: number) =>
        apiRequest<{ message: string }>(`/tasks/${id}`, {
            method: 'DELETE',
        }),
};

// ============ EVENTS API ============
export const eventsApi = {
    getAll: (params?: { month?: number; year?: number; eventType?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.month) searchParams.append('month', params.month.toString());
        if (params?.year) searchParams.append('year', params.year.toString());
        if (params?.eventType) searchParams.append('eventType', params.eventType);

        const query = searchParams.toString();
        return apiRequest<MaintenanceEvent[]>(`/events${query ? `?${query}` : ''}`);
    },

    getById: (id: number) =>
        apiRequest<MaintenanceEvent>(`/events/${id}`),

    create: (data: {
        title: string;
        description?: string;
        eventDate: string;
        eventType?: string;
        equipmentId?: number;
    }) =>
        apiRequest<MaintenanceEvent>('/events', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (id: number, data: Partial<MaintenanceEvent>) =>
        apiRequest<MaintenanceEvent>(`/events/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id: number) =>
        apiRequest<{ message: string }>(`/events/${id}`, {
            method: 'DELETE',
        }),
};

// ============ DASHBOARD API ============
export const dashboardApi = {
    getStats: () =>
        apiRequest<DashboardStats>('/dashboard/stats'),

    getTeamStats: () =>
        apiRequest<TeamStats[]>('/dashboard/teams'),
};

// ============ HEALTH CHECK ============
export const healthCheck = () =>
    apiRequest<{ status: string; timestamp: string }>('/health');
