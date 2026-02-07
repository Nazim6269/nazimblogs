import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import PendingOTP from '../models/otpModel.js';
import generateToken from '../utils/generateToken.js';
import { generateOTP, sendOTPEmail } from '../utils/sendEmail.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isBanned: user.isBanned,
            bio: user.bio,
            location: user.location,
            photoURL: user.photoURL,
            bookmarks: user.bookmarks,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // First registered user becomes admin
    const userCount = await User.countDocuments({});

    const user = await User.create({
        name,
        email,
        password,
        isAdmin: userCount === 0,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isBanned: false,
            bio: '',
            location: '',
            photoURL: '',
            bookmarks: [],
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'strict',
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Social Auth (Google/Github)
// @route   POST /api/users/social
// @access  Public
const socialAuth = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        // User exists, log them in
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isBanned: user.isBanned,
            bio: user.bio,
            location: user.location,
            photoURL: user.photoURL,
            bookmarks: user.bookmarks,
        });
    } else {
        // Create new user
        const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

        // First registered user becomes admin
        const userCount = await User.countDocuments({});

        user = await User.create({
            name,
            email,
            password: randomPassword,
            isAdmin: userCount === 0,
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isBanned: false,
                bio: '',
                location: '',
                photoURL: '',
                bookmarks: [],
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
});

// @desc    Send OTP for registration
// @route   POST /api/users/send-register-otp
// @access  Public
const sendRegisterOTP = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Name, email, and password are required');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upsert: replace any existing pending OTP for this email
    await PendingOTP.findOneAndUpdate(
        { email },
        { name, email, password: hashedPassword, otp: hashedOTP },
        { upsert: true, new: true }
    );

    await sendOTPEmail(email, otp, 'register');

    res.json({ message: 'OTP sent to your email' });
});

// @desc    Verify OTP and register user
// @route   POST /api/users/verify-register-otp
// @access  Public
const verifyRegisterOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const pending = await PendingOTP.findOne({ email });
    if (!pending) {
        res.status(400);
        throw new Error('OTP expired or not found. Please request a new one.');
    }

    const isMatch = await bcrypt.compare(otp, pending.otp);
    if (!isMatch) {
        res.status(400);
        throw new Error('Invalid OTP');
    }

    // First registered user becomes admin
    const userCount = await User.countDocuments({});

    const user = new User({
        name: pending.name,
        email: pending.email,
        password: 'placeholder', // will be overwritten below
        isAdmin: userCount === 0,
    });
    // Set the already-hashed password directly, skip pre-save hook
    user.password = pending.password;
    await user.save({ validateBeforeSave: false });

    await PendingOTP.deleteMany({ email });

    generateToken(res, user._id);

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isBanned: false,
        bio: '',
        location: '',
        photoURL: '',
        bookmarks: [],
    });
});

// @desc    Send OTP for password reset
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('No account found with this email');
    }

    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    user.otp = await bcrypt.hash(otp, salt);
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save({ validateBeforeSave: false });

    await sendOTPEmail(email, otp, 'reset');

    res.json({ message: 'OTP sent to your email' });
});

// @desc    Reset password with OTP
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otpExpiry) {
        res.status(400);
        throw new Error('OTP expired or not found. Please request a new one.');
    }

    if (user.otpExpiry < new Date()) {
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(400);
        throw new Error('OTP has expired. Please request a new one.');
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
        res.status(400);
        throw new Error('Invalid OTP');
    }

    user.password = newPassword; // pre-save hook will hash it
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    generateToken(res, user._id);

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
        bio: user.bio,
        location: user.location,
        photoURL: user.photoURL,
        bookmarks: user.bookmarks,
    });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Protected
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    user.name = req.body.name || user.name;
    if (req.body.bio !== undefined) user.bio = req.body.bio;
    if (req.body.location !== undefined) user.location = req.body.location;
    if (req.body.photoURL !== undefined) user.photoURL = req.body.photoURL;

    const updatedUser = await user.save({ validateBeforeSave: false });

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isBanned: updatedUser.isBanned,
        bio: updatedUser.bio,
        location: updatedUser.location,
        photoURL: updatedUser.photoURL,
    });
});

// @desc    Get author public profile
// @route   GET /api/users/:id/profile
// @access  Public
const getAuthorProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -otp -otpExpiry');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Get author's published blogs
    const Blog = (await import('../models/blogModel.js')).default;
    const blogs = await Blog.find({ author: user._id, status: 'published' })
        .sort({ createdAt: -1 })
        .populate('author', 'name email photoURL');

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        location: user.location,
        photoURL: user.photoURL,
        followers: user.followers,
        following: user.following,
        createdAt: user.createdAt,
        blogs,
    });
});

export { authUser, registerUser, logoutUser, socialAuth, sendRegisterOTP, verifyRegisterOTP, forgotPassword, resetPassword, updateProfile, getAuthorProfile };
