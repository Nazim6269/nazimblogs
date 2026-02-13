import asyncHandler from 'express-async-handler';
import Series from '../models/seriesModel.js';

const createSeries = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!title) { res.status(400); throw new Error('Title is required'); }
    const series = await Series.create({ title, description, author: req.user._id });
    res.status(201).json(series);
});

const getSeriesByUser = asyncHandler(async (req, res) => {
    const series = await Series.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(series);
});

const getSeriesById = asyncHandler(async (req, res) => {
    const series = await Series.findById(req.params.id)
        .populate('author', 'name photoURL')
        .populate({ path: 'blogs', populate: { path: 'author', select: 'name photoURL' } });
    if (!series) { res.status(404); throw new Error('Series not found'); }
    res.json(series);
});

const updateSeries = asyncHandler(async (req, res) => {
    const series = await Series.findById(req.params.id);
    if (!series) { res.status(404); throw new Error('Series not found'); }
    if (series.author.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Not authorized'); }
    if (req.body.title !== undefined) series.title = req.body.title;
    if (req.body.description !== undefined) series.description = req.body.description;
    await series.save();
    res.json(series);
});

const deleteSeries = asyncHandler(async (req, res) => {
    const series = await Series.findById(req.params.id);
    if (!series) { res.status(404); throw new Error('Series not found'); }
    if (series.author.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Not authorized'); }
    await series.deleteOne();
    res.json({ message: 'Series deleted' });
});

const addBlogToSeries = asyncHandler(async (req, res) => {
    const series = await Series.findById(req.params.id);
    if (!series) { res.status(404); throw new Error('Series not found'); }
    if (series.author.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Not authorized'); }
    const { blogId } = req.body;
    if (!series.blogs.includes(blogId)) {
        series.blogs.push(blogId);
        await series.save();
    }
    res.json(series);
});

const removeBlogFromSeries = asyncHandler(async (req, res) => {
    const series = await Series.findById(req.params.id);
    if (!series) { res.status(404); throw new Error('Series not found'); }
    if (series.author.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Not authorized'); }
    series.blogs = series.blogs.filter(id => id.toString() !== req.body.blogId);
    await series.save();
    res.json(series);
});

export { createSeries, getSeriesByUser, getSeriesById, updateSeries, deleteSeries, addBlogToSeries, removeBlogFromSeries };
