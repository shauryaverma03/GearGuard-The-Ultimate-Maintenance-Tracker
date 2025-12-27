import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Endpoint to fetch all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { equipment: true, user: true }, // Include associated models like User and Equipment
    });
    res.json(tasks); // Return tasks in JSON format
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

export default router;