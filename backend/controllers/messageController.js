import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';

// @desc    Send a message to admin (banned users only)
// @route   POST /api/messages
// @access  Private (banned users)
const sendMessage = asyncHandler(async (req, res) => {
    const { text } = req.body;

    if (!text || !text.trim()) {
        res.status(400);
        throw new Error('Message text is required');
    }

    if (!req.user.isBanned) {
        res.status(403);
        throw new Error('Only banned users can send messages to admin');
    }

    const message = await Message.create({
        from: req.user._id,
        text: text.trim(),
    });

    res.status(201).json(message);
});

export { sendMessage };
