import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: true }
);

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        tags: [String],
        imageSrc: {
            type: String,
            default: '',
        },
        category: {
            type: String,
            enum: ['Tutorials', 'Design', 'Community'],
            default: 'Community',
        },
        status: {
            type: String,
            enum: ['draft', 'published', 'scheduled', 'pending', 'rejected'],
            default: 'draft',
        },
        scheduledAt: {
            type: Date,
            default: null,
        },
        rejectionReason: {
            type: String,
            default: '',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        views: {
            type: Number,
            default: 0,
        },
        comments: [commentSchema],
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
