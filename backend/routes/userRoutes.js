import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    socialAuth,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/social', socialAuth);

export default router;
