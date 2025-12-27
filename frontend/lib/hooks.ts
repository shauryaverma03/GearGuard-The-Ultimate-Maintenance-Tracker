'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    equipmentApi,
    tasksApi,
    eventsApi,
    dashboardApi
} from './api';
import type {
    Equipment,
    Task,
    MaintenanceEvent,
    DashboardStats,
    TeamStats
} from './types';

// Generic hook for data fetching with loading and error states
function useApiData<T>(
    fetchFn: () => Promise<T>,
    deps: any[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFn();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, deps);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, loading, error, refetch, setData };
}

// ============ DASHBOARD HOOKS ============
export function useDashboardStats() {
    return useApiData<DashboardStats>(
        () => dashboardApi.getStats(),
        []
    );
}

export function useTeamStats() {
    return useApiData<TeamStats[]>(
        () => dashboardApi.getTeamStats(),
        []
    );
}

// ============ EQUIPMENT HOOKS ============
export function useEquipment(params?: { status?: string; category?: string; search?: string }) {
    const result = useApiData<Equipment[]>(
        () => equipmentApi.getAll(params),
        [params?.status, params?.category, params?.search]
    );

    const createEquipment = async (data: Parameters<typeof equipmentApi.create>[0]) => {
        const newEquipment = await equipmentApi.create(data);
        result.setData(prev => prev ? [newEquipment, ...prev] : [newEquipment]);
        return newEquipment;
    };

    const updateEquipment = async (id: number, data: Parameters<typeof equipmentApi.update>[1]) => {
        const updated = await equipmentApi.update(id, data);
        result.setData(prev => prev ? prev.map(e => e.id === id ? updated : e) : null);
        return updated;
    };

    const deleteEquipment = async (id: number) => {
        await equipmentApi.delete(id);
        result.setData(prev => prev ? prev.filter(e => e.id !== id) : null);
    };

    return {
        ...result,
        createEquipment,
        updateEquipment,
        deleteEquipment,
    };
}

// ============ TASKS HOOKS ============
export function useTasks(params?: { status?: string; priority?: string; team?: string }) {
    const result = useApiData<Task[]>(
        () => tasksApi.getAll(params),
        [params?.status, params?.priority, params?.team]
    );

    const createTask = async (data: Parameters<typeof tasksApi.create>[0]) => {
        const newTask = await tasksApi.create(data);
        result.setData(prev => prev ? [newTask, ...prev] : [newTask]);
        return newTask;
    };

    const updateTask = async (id: number, data: Parameters<typeof tasksApi.update>[1]) => {
        const updated = await tasksApi.update(id, data);
        result.setData(prev => prev ? prev.map(t => t.id === id ? updated : t) : null);
        return updated;
    };

    const updateTaskStatus = async (id: number, status: string) => {
        const updated = await tasksApi.updateStatus(id, status);
        result.setData(prev => prev ? prev.map(t => t.id === id ? updated : t) : null);
        return updated;
    };

    const deleteTask = async (id: number) => {
        await tasksApi.delete(id);
        result.setData(prev => prev ? prev.filter(t => t.id !== id) : null);
    };

    return {
        ...result,
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
    };
}

// ============ EVENTS HOOKS ============
export function useCalendarEvents(params?: { month?: number; year?: number }) {
    const result = useApiData<MaintenanceEvent[]>(
        () => eventsApi.getAll(params),
        [params?.month, params?.year]
    );

    const createEvent = async (data: Parameters<typeof eventsApi.create>[0]) => {
        const newEvent = await eventsApi.create(data);
        result.setData(prev => prev ? [...prev, newEvent] : [newEvent]);
        return newEvent;
    };

    const updateEvent = async (id: number, data: Parameters<typeof eventsApi.update>[1]) => {
        const updated = await eventsApi.update(id, data);
        result.setData(prev => prev ? prev.map(e => e.id === id ? updated : e) : null);
        return updated;
    };

    const deleteEvent = async (id: number) => {
        await eventsApi.delete(id);
        result.setData(prev => prev ? prev.filter(e => e.id !== id) : null);
    };

    return {
        ...result,
        createEvent,
        updateEvent,
        deleteEvent,
    };
}

// ============ AUTH STATE ============
export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user on mount
        const storedUser = localStorage.getItem('gearguard_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('gearguard_user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData: any) => {
        setUser(userData);
        localStorage.setItem('gearguard_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('gearguard_user');
    };

    return { user, loading, login, logout, isAuthenticated: !!user };
}
