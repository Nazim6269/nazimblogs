import express from 'express';
import { getSiteConfig, updateSiteConfig } from '../controllers/siteConfigController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').get(getSiteConfig).put(protect, admin, updateSiteConfig);

export default router;
