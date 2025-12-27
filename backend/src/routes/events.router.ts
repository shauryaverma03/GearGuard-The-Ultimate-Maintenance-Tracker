import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all events with optional date filtering
router.get('/', async (req, res) => {
    try {
        const { month, year, eventType } = req.query;

        const where: any = {};

        // Filter by month/year if provided
        if (month && year) {
            const startDate = new Date(parseInt(year as string), parseInt(month as string) - 1, 1);
            const endDate = new Date(parseInt(year as string), parseInt(month as string), 0, 23, 59, 59);
            where.eventDate = {
                gte: startDate,
                lte: endDate
            };
        }

        if (eventType) {
            where.eventType = eventType as string;
        }

        const events = await prisma.maintenanceEvent.findMany({
            where,
            include: {
                equipment: {
                    select: {
                        id: true,
                        name: true,
                        serialNumber: true
                    }
                }
            },
            orderBy: { eventDate: 'asc' }
        });

        res.json(events);
    } catch (err) {
        console.error('Get events error:', err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Get event by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const event = await prisma.maintenanceEvent.findUnique({
            where: { id: parseInt(id) },
            include: {
                equipment: true
            }
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(event);
    } catch (err) {
        console.error('Get event error:', err);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

// Create new event
router.post('/', async (req, res) => {
    try {
        const { title, description, eventDate, eventType, equipmentId } = req.body;

        const event = await prisma.maintenanceEvent.create({
            data: {
                title,
                description: description || null,
                eventDate: new Date(eventDate),
                eventType: eventType || 'Preventive',
                equipmentId: equipmentId || null
            },
            include: {
                equipment: {
                    select: {
                        id: true,
                        name: true,
                        serialNumber: true
                    }
                }
            }
        });

        res.status(201).json(event);
    } catch (err) {
        console.error('Create event error:', err);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Update event
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, eventDate, eventType, equipmentId } = req.body;

        const event = await prisma.maintenanceEvent.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                eventDate: eventDate ? new Date(eventDate) : undefined,
                eventType,
                equipmentId
            },
            include: {
                equipment: {
                    select: {
                        id: true,
                        name: true,
                        serialNumber: true
                    }
                }
            }
        });

        res.json(event);
    } catch (err) {
        console.error('Update event error:', err);
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// Delete event
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.maintenanceEvent.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Delete event error:', err);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

export default router;
