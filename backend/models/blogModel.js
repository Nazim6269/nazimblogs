import mongoose from 'mongoose';

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
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
