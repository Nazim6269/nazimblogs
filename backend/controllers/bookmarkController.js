import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Blog from '../models/blogModel.js';

// @desc    Toggle bookmark on a blog
// @route   PUT /api/blogs/:id/bookmark
// @access  Protected
const toggleBookmark = asyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    const user = await User.findById(userId);
    const isBookmarked = user.bookmarks.includes(blogId);

    if (isBookmarked) {
        await User.findByIdAndUpdate(userId, { $pull: { bookmarks: blogId } });
        res.json({ bookmarked: false, message: 'Bookmark removed' });
    } else {
        await User.findByIdAndUpdate(userId, { $push: { bookmarks: blogId } });
        res.json({ bookmarked: true, message: 'Blog bookmarked' });
    }
});

// @desc    Get user's bookmarked blogs
// @route   GET /api/users/bookmarks
// @access  Protected
const getBookmarks = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate({
        path: 'bookmarks',
        populate: { path: 'author', select: 'name email photoURL' },
    });

    res.json(user.bookmarks || []);
});

export { toggleBookmark, getBookmarks };
