import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all tasks with filters
router.get('/', async (req, res) => {
    try {
        const { status, priority, team, equipmentId } = req.query;

        const where: any = {};

        if (status) {
            where.status = status as string;
        }

        if (priority) {
            where.priority = priority as string;
        }

        if (team) {
            where.team = team as string;
        }

        if (equipmentId) {
            where.equipmentId = parseInt(equipmentId as string);
        }

        const tasks = await prisma.task.findMany({
            where,
            include: {
                equipment: {
                    select: {
                        id: true,
                        name: true,
                        serialNumber: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        role: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(tasks);
    } catch (err) {
        console.error('Get tasks error:', err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Get task by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) },
            include: {
                equipment: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        console.error('Get task error:', err);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});

// Create new task
router.post('/', async (req, res) => {
    try {
        const { title, description, status, priority, team, equipmentId, userId } = req.body;

        // Verify equipment exists
        const equipment = await prisma.equipment.findUnique({
            where: { id: equipmentId }
        });

        if (!equipment) {
            return res.status(400).json({ error: 'Equipment not found' });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description: description || '',
                status: status || 'New',
                priority: priority || 'Medium',
                team: team || 'Maintenance',
                equipmentId,
                userId: userId || null
            },
            include: {
                equipment: {
                    select: {
                        id: true,
                        name: true,
                        serialNumber: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        res.status(201).json(task);
    } catch (err) {
        console.error('Create task error:', err);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Update task
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority, team, equipmentId, userId, completionDate } = req.body;

        const task = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                status,
                priority,
                team,
                equipmentId,
                userId,
                completionDate: completionDate ? new Date(completionDate) : undefined
            },
            include: {
                equipment: {
                    select: {
                        id: true,
                        name: true,
                        serialNumber: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        res.json(task);
    } catch (err) {
        console.error('Update task error:', err);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Update task status only (for Kanban drag-drop)
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['New', 'In Progress', 'Repaired', 'Scrap'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updateData: any = { status };

        // If marking as completed, set completion date
        if (status === 'Repaired' || status === 'Scrap') {
            updateData.completionDate = new Date();
        }

        const task = await prisma.task.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                equipment: {
                    select: {
                        id: true,
                        name: true,
                        serialNumber: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        res.json(task);
    } catch (err) {
        console.error('Update task status error:', err);
        res.status(500).json({ error: 'Failed to update task status' });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.task.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Delete task error:', err);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

export default router;
