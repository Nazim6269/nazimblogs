import express from 'express';
import {
    getBlogs,
    getBlogById,
    getUserBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    addComment,
    deleteComment,
    getTrendingBlogs,
    getRecommendedBlogs,
    getCategoryCounts,
    getTagsWithCounts,
} from '../controllers/blogController.js';
import { toggleBookmark } from '../controllers/bookmarkController.js';
import { protect } from '../middleware/authMiddleware.js';
import { notBanned } from '../middleware/banMiddleware.js';

const router = express.Router();

router.route('/').get(getBlogs).post(protect, notBanned, createBlog);
router.get('/user', protect, getUserBlogs);
router.get('/trending', getTrendingBlogs);
router.get('/recommended', getRecommendedBlogs);
router.get('/categories', getCategoryCounts);
router.get('/tags', getTagsWithCounts);
router.put('/:id/bookmark', protect, toggleBookmark);
router.route('/:id').get(getBlogById).put(protect, updateBlog).delete(protect, deleteBlog);
router.put('/:id/like', protect, notBanned, likeBlog);
router.post('/:id/comments', protect, notBanned, addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);

export default router;
