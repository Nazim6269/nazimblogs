import express from 'express';
import { createReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';
import { notBanned } from '../middleware/banMiddleware.js';

const router = express.Router();
router.post('/', protect, notBanned, createReport);
export default router;
