import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get dashboard statistics
router.get('/stats', async (req, res) => {
    try {
        // Get counts for different metrics
        const [
            totalTasks,
            newTasks,
            inProgressTasks,
            repairedTasks,
            scrapTasks,
            criticalTasks,
            totalEquipment,
            operationalEquipment,
            maintenanceRequiredEquipment,
            brokenEquipment,
            totalUsers,
            upcomingEvents
        ] = await Promise.all([
            prisma.task.count(),
            prisma.task.count({ where: { status: 'New' } }),
            prisma.task.count({ where: { status: 'In Progress' } }),
            prisma.task.count({ where: { status: 'Repaired' } }),
            prisma.task.count({ where: { status: 'Scrap' } }),
            prisma.task.count({ where: { priority: 'Critical' } }),
            prisma.equipment.count(),
            prisma.equipment.count({ where: { status: 'Operational' } }),
            prisma.equipment.count({ where: { status: 'Maintenance Required' } }),
            prisma.equipment.count({ where: { status: 'Broken' } }),
            prisma.user.count(),
            prisma.maintenanceEvent.count({
                where: {
                    eventDate: {
                        gte: new Date()
                    }
                }
            })
        ]);

        // Get recent tasks for activity feed
        const recentTasks = await prisma.task.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                equipment: {
                    select: {
                        name: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        // Calculate completion rate
        const completionRate = totalTasks > 0
            ? Math.round((repairedTasks / totalTasks) * 100)
            : 0;

        // Calculate average repair time (mock for now, would need actual time tracking)
        const avgRepairTime = '2.4h';

        res.json({
            tasks: {
                total: totalTasks,
                new: newTasks,
                inProgress: inProgressTasks,
                repaired: repairedTasks,
                scrap: scrapTasks,
                critical: criticalTasks
            },
            equipment: {
                total: totalEquipment,
                operational: operationalEquipment,
                maintenanceRequired: maintenanceRequiredEquipment,
                broken: brokenEquipment
            },
            users: {
                total: totalUsers
            },
            metrics: {
                completionRate,
                avgRepairTime,
                upcomingEvents
            },
            recentActivity: recentTasks.map(task => ({
                id: task.id,
                title: task.title,
                equipment: task.equipment?.name || 'Unknown',
                user: task.user?.name || 'Unassigned',
                status: task.status,
                priority: task.priority,
                createdAt: task.createdAt
            }))
        });
    } catch (err) {
        console.error('Get dashboard stats error:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
});

// Get team workload summary
router.get('/teams', async (req, res) => {
    try {
        const teams = ['Mechanics', 'Electricians', 'IT', 'Maintenance'];

        const teamStats = await Promise.all(
            teams.map(async (team) => {
                const activeTasks = await prisma.task.count({
                    where: {
                        team,
                        status: { in: ['New', 'In Progress'] }
                    }
                });
                const completedTasks = await prisma.task.count({
                    where: {
                        team,
                        status: { in: ['Repaired', 'Scrap'] }
                    }
                });

                return {
                    name: team,
                    activeTasks,
                    completedTasks,
                    totalTasks: activeTasks + completedTasks
                };
            })
        );

        res.json(teamStats);
    } catch (err) {
        console.error('Get team stats error:', err);
        res.status(500).json({ error: 'Failed to fetch team statistics' });
    }
});

export default router;
