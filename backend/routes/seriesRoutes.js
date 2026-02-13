import express from 'express';
import { createSeries, getSeriesByUser, getSeriesById, updateSeries, deleteSeries, addBlogToSeries, removeBlogFromSeries } from '../controllers/seriesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').post(protect, createSeries);
router.get('/user', protect, getSeriesByUser);
router.route('/:id').get(getSeriesById).put(protect, updateSeries).delete(protect, deleteSeries);
router.put('/:id/add-blog', protect, addBlogToSeries);
router.put('/:id/remove-blog', protect, removeBlogFromSeries);
export default router;
