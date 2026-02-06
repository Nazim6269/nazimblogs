import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    socialAuth,
    sendRegisterOTP,
    verifyRegisterOTP,
    forgotPassword,
    resetPassword,
    updateProfile,
    getAuthorProfile,
} from '../controllers/userController.js';
import { followUser, unfollowUser } from '../controllers/followController.js';
import { getBookmarks } from '../controllers/bookmarkController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/social', socialAuth);
router.post('/send-register-otp', sendRegisterOTP);
router.post('/verify-register-otp', verifyRegisterOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Profile & bookmarks (BEFORE /:id routes)
router.put('/profile', protect, updateProfile);
router.get('/bookmarks', protect, getBookmarks);

// Follow system
router.put('/:id/follow', protect, followUser);
router.put('/:id/unfollow', protect, unfollowUser);
router.get('/:id/profile', getAuthorProfile);

export default router;
