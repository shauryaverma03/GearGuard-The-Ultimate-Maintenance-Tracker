import express from 'express';
import usersRouter from './users.router';
import equipmentRouter from './equipment.router';
import tasksRouter from './tasks.router';
import eventsRouter from './events.router';
import dashboardRouter from './dashboard.router';

const router = express.Router();

// Mount all route modules
router.use('/users', usersRouter);
router.use('/equipment', equipmentRouter);
router.use('/tasks', tasksRouter);
router.use('/events', eventsRouter);
router.use('/dashboard', dashboardRouter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;