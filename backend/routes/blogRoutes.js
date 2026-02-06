import express from 'express';
import {
    getBlogs,
    getBlogById,
    getUserBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBlogs).post(protect, createBlog);
router.get('/user', protect, getUserBlogs);
router.route('/:id').get(getBlogById).put(protect, updateBlog).delete(protect, deleteBlog);

export default router;
