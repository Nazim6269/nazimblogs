import asyncHandler from 'express-async-handler';
import Notification from '../models/notificationModel.js';

// @desc    Get notifications for current user
// @route   GET /api/notifications
// @access  Protected
const getNotifications = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
        Notification.find({ recipient: req.user._id })
            .populate('relatedUser', 'name photoURL')
            .populate('relatedBlog', 'title')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Notification.countDocuments({ recipient: req.user._id }),
    ]);

    res.json({
        notifications,
        page,
        totalPages: Math.ceil(total / limit),
        total,
    });
});

// @desc    Get unread notification count
// @route   GET /api/notifications/unread-count
// @access  Protected
const getUnreadCount = asyncHandler(async (req, res) => {
    const count = await Notification.countDocuments({
        recipient: req.user._id,
        read: false,
    });
    res.json({ count });
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Protected
const markAllAsRead = asyncHandler(async (req, res) => {
    await Notification.updateMany(
        { recipient: req.user._id, read: false },
        { $set: { read: true } }
    );
    res.json({ message: 'All notifications marked as read' });
});

// @desc    Mark single notification as read
// @route   PUT /api/notifications/:id/read
// @access  Protected
const markAsRead = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        res.status(404);
        throw new Error('Notification not found');
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized');
    }

    notification.read = true;
    await notification.save();
    res.json({ message: 'Notification marked as read' });
});

export { getNotifications, getUnreadCount, markAllAsRead, markAsRead };
