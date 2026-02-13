import Notification from '../models/notificationModel.js';

const createNotification = async ({ recipient, type, message, relatedBlog, relatedUser }, io) => {
    // Don't notify yourself
    if (recipient?.toString() === relatedUser?.toString()) return;

    const notification = await Notification.create({
        recipient,
        type,
        message,
        relatedBlog,
        relatedUser,
    });

    // Emit real-time notification if io is available
    if (io) {
        io.to(`user:${recipient.toString()}`).emit('notification', {
            _id: notification._id,
            type,
            message,
            relatedBlog,
            relatedUser,
            read: false,
            createdAt: notification.createdAt,
        });
    }
};

export default createNotification;
