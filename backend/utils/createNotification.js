import Notification from '../models/notificationModel.js';

const createNotification = async ({ recipient, type, message, relatedBlog, relatedUser }) => {
    // Don't notify yourself
    if (recipient?.toString() === relatedUser?.toString()) return;

    await Notification.create({
        recipient,
        type,
        message,
        relatedBlog,
        relatedUser,
    });
};

export default createNotification;
