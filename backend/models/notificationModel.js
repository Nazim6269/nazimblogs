import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: ['like', 'comment', 'follow', 'reply', 'blog_approved', 'blog_rejected', 'blog_pending'],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        relatedBlog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
        relatedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, read: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
