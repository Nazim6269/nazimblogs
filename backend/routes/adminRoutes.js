import express from 'express';
import { getDashboardStats, banUser, unbanUser, getMessages, markMessageRead } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getDashboardStats);
router.put('/users/:id/ban', protect, admin, banUser);
router.put('/users/:id/unban', protect, admin, unbanUser);
router.get('/messages', protect, admin, getMessages);
router.put('/messages/:id/read', protect, admin, markMessageRead);

export default router;
