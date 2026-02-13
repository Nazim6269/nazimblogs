import Blog from '../models/blogModel.js';

const publishScheduledBlogs = async () => {
    try {
        const now = new Date();
        const result = await Blog.updateMany(
            { status: 'scheduled', scheduledAt: { $lte: now } },
            { $set: { status: 'published', scheduledAt: null } }
        );
        if (result.modifiedCount > 0) {
            console.log(`Published ${result.modifiedCount} scheduled blog(s)`);
        }
    } catch (error) {
        console.error('Scheduler error:', error.message);
    }
};

export const startScheduler = () => {
    setInterval(publishScheduledBlogs, 60 * 1000);
    publishScheduledBlogs();
};
