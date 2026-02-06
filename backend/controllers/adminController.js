import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Blog from '../models/blogModel.js';
import Message from '../models/messageModel.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const [totalUsers, totalBlogs, users] = await Promise.all([
        User.countDocuments({}),
        Blog.countDocuments({}),
        User.aggregate([
            {
                $lookup: {
                    from: 'blogs',
                    localField: '_id',
                    foreignField: 'author',
                    as: 'blogs',
                },
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    isAdmin: 1,
                    isBanned: 1,
                    blogCount: { $size: '$blogs' },
                    createdAt: 1,
                },
            },
            { $sort: { createdAt: -1 } },
        ]),
    ]);

    res.json({ totalUsers, totalBlogs, users });
});

// @desc    Ban a user
// @route   PUT /api/admin/users/:id/ban
// @access  Private/Admin
const banUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.isAdmin) {
        res.status(400);
        throw new Error('Cannot ban an admin user');
    }

    user.isBanned = true;
    await user.save({ validateBeforeSave: false });

    res.json({ message: 'User banned successfully' });
});

// @desc    Unban a user
// @route   PUT /api/admin/users/:id/unban
// @access  Private/Admin
const unbanUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    user.isBanned = false;
    await user.save({ validateBeforeSave: false });

    res.json({ message: 'User unbanned successfully' });
});

// @desc    Get all messages from banned users
// @route   GET /api/admin/messages
// @access  Private/Admin
const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({})
        .populate('from', 'name email')
        .sort({ createdAt: -1 });

    res.json(messages);
});

// @desc    Mark a message as read
// @route   PUT /api/admin/messages/:id/read
// @access  Private/Admin
const markMessageRead = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (!message) {
        res.status(404);
        throw new Error('Message not found');
    }

    message.read = true;
    await message.save();

    res.json({ message: 'Message marked as read' });
});

export { getDashboardStats, banUser, unbanUser, getMessages, markMessageRead };
