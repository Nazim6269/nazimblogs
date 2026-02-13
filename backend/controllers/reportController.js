import asyncHandler from 'express-async-handler';
import Report from '../models/reportModel.js';

// @desc    Create a report
// @route   POST /api/reports
// @access  Protected
const createReport = asyncHandler(async (req, res) => {
    const { targetType, targetId, reason } = req.body;

    if (!targetType || !targetId || !reason) {
        res.status(400);
        throw new Error('Target type, target ID, and reason are required');
    }

    const existing = await Report.findOne({ reporter: req.user._id, targetId });
    if (existing) {
        res.status(400);
        throw new Error('You have already reported this content');
    }

    const report = await Report.create({
        reporter: req.user._id,
        targetType,
        targetId,
        reason,
    });

    res.status(201).json(report);
});

// @desc    Get all reports (admin)
// @route   GET /api/admin/reports
// @access  Admin
const getReports = asyncHandler(async (req, res) => {
    const { status } = req.query;
    const query = status ? { status } : {};

    const reports = await Report.find(query)
        .populate('reporter', 'name email photoURL')
        .sort({ createdAt: -1 });

    res.json(reports);
});

// @desc    Update report status (admin)
// @route   PUT /api/admin/reports/:id
// @access  Admin
const updateReportStatus = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);
    if (!report) {
        res.status(404);
        throw new Error('Report not found');
    }
    report.status = req.body.status;
    await report.save();
    res.json(report);
});

export { createReport, getReports, updateReportStatus };
