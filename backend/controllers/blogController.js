import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const { search, category, page = 1, limit = 50 } = req.query;

    const query = {};

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
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
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
    const { title, body, tags, imageSrc, category } = req.body;

    if (!title || !body) {
        res.status(400);
        throw new Error('Title and body are required');
    }

    const blog = await Blog.create({
        title,
        body,
        tags: tags || [],
        imageSrc: imageSrc || '',
        category: category || 'Community',
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

    const { title, body, tags, imageSrc, category } = req.body;

    if (title !== undefined) blog.title = title;
    if (body !== undefined) blog.body = body;
    if (tags !== undefined) blog.tags = tags;
    if (imageSrc !== undefined) blog.imageSrc = imageSrc;
    if (category !== undefined) blog.category = category;

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

export { getBlogs, getBlogById, getUserBlogs, createBlog, updateBlog, deleteBlog };
