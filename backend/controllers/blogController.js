import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import createNotification from '../utils/createNotification.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const { search, category, page = 1, limit = 50 } = req.query;

    const query = { status: 'published' };

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { body: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } },
        ];
    }

    if (category && category !== 'Explore') {
        query.category = category;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [blogs, total] = await Promise.all([
        Blog.find(query)
            .populate('author', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),
        Blog.countDocuments(query),
    ]);

    res.json({
        blogs,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        total,
    });
});

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
        .populate('author', 'name email')
        .populate('comments.user', 'name email');

    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    // Only increment views for published blogs
    if (blog.status === 'published') {
        blog.views += 1;
        await blog.save();
    }

    res.json(blog);
});

// @desc    Get logged-in user's blogs
// @route   GET /api/blogs/user
// @access  Private
const getUserBlogs = asyncHandler(async (req, res) => {
    const { search } = req.query;
    const query = { author: req.user._id };

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { body: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } },
        ];
        query.author = req.user._id;
    }

    const blogs = await Blog.find(query)
        .populate('author', 'name email')
        .sort({ createdAt: -1 });

    res.json(blogs);
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
    const { title, body, tags, imageSrc, category, status } = req.body;

    if (!title || !body) {
        res.status(400);
        throw new Error('Title and body are required');
    }

    // Activity limit: non-admin users limited to 5 blogs
    if (!req.user.isAdmin) {
        const userBlogCount = await Blog.countDocuments({ author: req.user._id });
        if (userBlogCount >= 5) {
            res.status(403);
            throw new Error('You have reached the maximum limit of 5 blog posts');
        }
    }

    const blog = await Blog.create({
        title,
        body,
        tags: tags || [],
        imageSrc: imageSrc || '',
        category: category || 'Community',
        status: status || 'draft',
        author: req.user._id,
    });

    const populated = await blog.populate('author', 'name email');

    res.status(201).json(populated);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private (owner or admin)
const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    if (blog.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to update this blog');
    }

    const { title, body, tags, imageSrc, category, status } = req.body;

    if (title !== undefined) blog.title = title;
    if (body !== undefined) blog.body = body;
    if (tags !== undefined) blog.tags = tags;
    if (imageSrc !== undefined) blog.imageSrc = imageSrc;
    if (category !== undefined) blog.category = category;
    if (status !== undefined) blog.status = status;

    const updated = await blog.save();
    const populated = await updated.populate('author', 'name email');

    res.json(populated);
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private (owner or admin)
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    if (blog.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized to delete this blog');
    }

    await blog.deleteOne();

    res.json({ message: 'Blog deleted' });
});

// @desc    Toggle like on a blog
// @route   PUT /api/blogs/:id/like
// @access  Private
const likeBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    const userId = req.user._id.toString();
    const index = blog.likes.findIndex((id) => id.toString() === userId);

    // Activity limit: non-admin users limited to 5 total likes (only when adding)
    if (index === -1 && !req.user.isAdmin) {
        const totalLikes = await Blog.countDocuments({ likes: req.user._id });
        if (totalLikes >= 5) {
            res.status(403);
            throw new Error('You have reached the maximum limit of 5 likes');
        }
    }

    if (index === -1) {
        blog.likes.push(req.user._id);
        await blog.save();

        // Notify blog author
        await createNotification({
            recipient: blog.author,
            type: 'like',
            message: `${req.user.name} liked your post "${blog.title}"`,
            relatedBlog: blog._id,
            relatedUser: req.user._id,
        });
    } else {
        blog.likes.splice(index, 1);
        await blog.save();
    }

    res.json({ likes: blog.likes });
});

// @desc    Add a comment to a blog
// @route   POST /api/blogs/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
    const { text, parentComment } = req.body;

    if (!text || !text.trim()) {
        res.status(400);
        throw new Error('Comment text is required');
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    // Activity limit: non-admin users limited to 5 total comments
    if (!req.user.isAdmin) {
        const totalComments = await Blog.aggregate([
            { $unwind: '$comments' },
            { $match: { 'comments.user': req.user._id } },
            { $count: 'total' },
        ]);
        const count = totalComments.length > 0 ? totalComments[0].total : 0;
        if (count >= 5) {
            res.status(403);
            throw new Error('You have reached the maximum limit of 5 comments');
        }
    }

    // Flatten to 1 level: if parent itself is a reply, use the root parent
    let resolvedParent = parentComment || null;
    if (resolvedParent) {
        const parentObj = blog.comments.id(resolvedParent);
        if (parentObj && parentObj.parentComment) {
            resolvedParent = parentObj.parentComment;
        }
    }

    const comment = {
        user: req.user._id,
        text: text.trim(),
        parentComment: resolvedParent,
    };

    blog.comments.unshift(comment);
    await blog.save();

    // Notify blog author about the comment
    await createNotification({
        recipient: blog.author,
        type: 'comment',
        message: `${req.user.name} commented on your post "${blog.title}"`,
        relatedBlog: blog._id,
        relatedUser: req.user._id,
    });

    // If this is a reply, also notify the parent comment author
    if (resolvedParent) {
        const parentObj = blog.comments.id(resolvedParent);
        if (parentObj && parentObj.user) {
            await createNotification({
                recipient: parentObj.user,
                type: 'reply',
                message: `${req.user.name} replied to your comment on "${blog.title}"`,
                relatedBlog: blog._id,
                relatedUser: req.user._id,
            });
        }
    }

    // Populate the user info on the newly added comment
    await blog.populate('comments.user', 'name email');

    res.status(201).json(blog.comments[0]);
});

// @desc    Delete a comment from a blog
// @route   DELETE /api/blogs/:id/comments/:commentId
// @access  Private (comment author, blog author, or admin)
const deleteComment = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    const comment = blog.comments.id(req.params.commentId);

    if (!comment) {
        res.status(404);
        throw new Error('Comment not found');
    }

    const isCommentAuthor = comment.user.toString() === req.user._id.toString();
    const isAdmin = req.user.isAdmin;

    if (!isCommentAuthor && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to delete this comment');
    }

    blog.comments.pull({ _id: req.params.commentId });
    await blog.save();

    res.json({ message: 'Comment deleted' });
});

// @desc    Get trending blogs
// @route   GET /api/blogs/trending
// @access  Public
const getTrendingBlogs = asyncHandler(async (req, res) => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const blogs = await Blog.aggregate([
        { $match: { status: 'published' } },
        {
            $addFields: {
                score: {
                    $add: [
                        { $multiply: [{ $size: '$likes' }, 3] },
                        { $multiply: [{ $size: '$comments' }, 2] },
                        { $multiply: ['$views', 0.1] },
                        {
                            $cond: [
                                { $gte: ['$createdAt', sevenDaysAgo] },
                                50,
                                0,
                            ],
                        },
                    ],
                },
            },
        },
        { $sort: { score: -1 } },
        { $limit: 6 },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
                pipeline: [{ $project: { name: 1, email: 1 } }],
            },
        },
        { $unwind: '$author' },
    ]);

    res.json(blogs);
});

// @desc    Get recommended blogs (random popular posts)
// @route   GET /api/blogs/recommended
// @access  Public
const getRecommendedBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.aggregate([
        { $match: { status: 'published' } },
        {
            $match: {
                $or: [
                    { $expr: { $gt: [{ $size: '$likes' }, 0] } },
                    { $expr: { $gt: [{ $size: '$comments' }, 0] } },
                ],
            },
        },
        { $sample: { size: 3 } },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
                pipeline: [{ $project: { name: 1, email: 1 } }],
            },
        },
        { $unwind: '$author' },
    ]);

    res.json(blogs);
});

export { getBlogs, getBlogById, getUserBlogs, createBlog, updateBlog, deleteBlog, likeBlog, addComment, deleteComment, getTrendingBlogs, getRecommendedBlogs };
