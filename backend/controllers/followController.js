import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import createNotification from '../utils/createNotification.js';

// @desc    Follow a user
// @route   PUT /api/users/:id/follow
// @access  Protected
const followUser = asyncHandler(async (req, res) => {
    const targetId = req.params.id;
    const currentUserId = req.user._id;

    if (targetId === currentUserId.toString()) {
        res.status(400);
        throw new Error('You cannot follow yourself');
    }

    const targetUser = await User.findById(targetId);
    if (!targetUser) {
        res.status(404);
        throw new Error('User not found');
    }

    if (targetUser.followers.includes(currentUserId)) {
        res.status(400);
        throw new Error('You are already following this user');
    }

    await User.findByIdAndUpdate(targetId, { $push: { followers: currentUserId } });
    await User.findByIdAndUpdate(currentUserId, { $push: { following: targetId } });

    // Notify the followed user
    await createNotification({
        recipient: targetId,
        type: 'follow',
        message: `${req.user.name} started following you`,
        relatedUser: currentUserId,
    });

    res.json({ message: 'Followed successfully' });
});

// @desc    Unfollow a user
// @route   PUT /api/users/:id/unfollow
// @access  Protected
const unfollowUser = asyncHandler(async (req, res) => {
    const targetId = req.params.id;
    const currentUserId = req.user._id;

    if (targetId === currentUserId.toString()) {
        res.status(400);
        throw new Error('You cannot unfollow yourself');
    }

    const targetUser = await User.findById(targetId);
    if (!targetUser) {
        res.status(404);
        throw new Error('User not found');
    }

    if (!targetUser.followers.includes(currentUserId)) {
        res.status(400);
        throw new Error('You are not following this user');
    }

    await User.findByIdAndUpdate(targetId, { $pull: { followers: currentUserId } });
    await User.findByIdAndUpdate(currentUserId, { $pull: { following: targetId } });

    res.json({ message: 'Unfollowed successfully' });
});

export { followUser, unfollowUser };
