import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all equipment
router.get('/', async (req, res) => {
    try {
        const { status, category, search } = req.query;

        const where: any = {};

        if (status) {
            where.status = status as string;
        }

        if (category) {
            where.category = category as string;
        }

        if (search) {
            where.OR = [
                { name: { contains: search as string, mode: 'insensitive' } },
                { serialNumber: { contains: search as string, mode: 'insensitive' } }
            ];
        }

        const equipment = await prisma.equipment.findMany({
            where,
            include: {
                _count: {
                    select: { tasks: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(equipment);
    } catch (err) {
        console.error('Get equipment error:', err);
        res.status(500).json({ error: 'Failed to fetch equipment' });
    }
});

// Get equipment by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await prisma.equipment.findUnique({
            where: { id: parseInt(id) },
            include: {
                tasks: {
                    orderBy: { createdAt: 'desc' },
                    take: 5
                }
            }
        });

        if (!equipment) {
            return res.status(404).json({ error: 'Equipment not found' });
        }

        res.json(equipment);
    } catch (err) {
        console.error('Get equipment error:', err);
        res.status(500).json({ error: 'Failed to fetch equipment' });
    }
});

// Create new equipment
router.post('/', async (req, res) => {
    try {
        const { name, description, serialNumber, status, category, location } = req.body;

        // Check if serial number already exists
        const existing = await prisma.equipment.findUnique({
            where: { serialNumber }
        });

        if (existing) {
            return res.status(400).json({ error: 'Equipment with this serial number already exists' });
        }

        const equipment = await prisma.equipment.create({
            data: {
                name,
                description: description || '',
                serialNumber,
                status: status || 'Operational',
                category: category || 'General',
                location: location || ''
            }
        });

        res.status(201).json(equipment);
    } catch (err) {
        console.error('Create equipment error:', err);
        res.status(500).json({ error: 'Failed to create equipment' });
    }
});

// Update equipment
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, serialNumber, status, category, location, lastMaintained } = req.body;

        const equipment = await prisma.equipment.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                serialNumber,
                status,
                category,
                location,
                lastMaintained: lastMaintained ? new Date(lastMaintained) : undefined
            }
        });

        res.json(equipment);
    } catch (err) {
        console.error('Update equipment error:', err);
        res.status(500).json({ error: 'Failed to update equipment' });
    }
});

// Delete equipment
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.equipment.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Equipment deleted successfully' });
    } catch (err) {
        console.error('Delete equipment error:', err);
        res.status(500).json({ error: 'Failed to delete equipment' });
    }
});

export default router;
