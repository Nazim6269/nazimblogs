import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faReply } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ConfirmModal from '../../Components/ConfirmModal/ConfirmModal'

const timeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
};

const CommentsSection = ({ isDark, comments = [], user, blogAuthorId, onAddComment, onDeleteComment }) => {
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [replySubmitting, setReplySubmitting] = useState(false);

    // Group comments: top-level and replies
    const topLevel = comments.filter((c) => !c.parentComment);
    const getReplies = (commentId) =>
        comments.filter((c) => {
            const parentId = typeof c.parentComment === 'object' ? c.parentComment?._id : c.parentComment;
            return parentId?.toString() === commentId?.toString();
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setSubmitting(true);
        try {
            await onAddComment(text.trim());
            setText('');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReplySubmit = async (e, parentId) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        setReplySubmitting(true);
        try {
            await onAddComment(replyText.trim(), parentId);
            setReplyText('');
            setReplyingTo(null);
        } finally {
            setReplySubmitting(false);
        }
    };

    const canDelete = (comment) => {
        if (!user) return false;
        const commentUserId = typeof comment.user === 'object' ? comment.user._id : comment.user;
        return (
            commentUserId?.toString() === user._id?.toString() ||
            user.isAdmin
        );
    };

    const renderComment = (comment, isReply = false) => {
        const commentUser = typeof comment.user === 'object' ? comment.user : { name: 'User' };
        const commentUserId = typeof comment.user === 'object' ? comment.user._id : null;
        const initial = commentUser.name?.charAt(0).toUpperCase() || 'U';

        return (
            <div
                key={comment._id}
                className={`group ${isReply ? 'ml-8 sm:ml-12' : ''} p-4 rounded-lg border transition-colors ${isDark
                    ? 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/60'
                    : 'border-gray-100 bg-white hover:bg-gray-50'
                    }`}
            >
                <div className="flex items-start gap-3">
                    <div className={`${isReply ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'} rounded-full bg-brand-primary flex items-center justify-center text-white font-bold shrink-0`}>
                        {initial}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            {commentUserId ? (
                                <Link
                                    to={`/author/${commentUserId}`}
                                    className={`text-sm font-bold hover:text-brand-secondary transition-colors ${isDark ? 'text-gray-200' : 'text-gray-900'}`}
                                >
                                    {commentUser.name || 'User'}
                                </Link>
                            ) : (
                                <span className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                    {commentUser.name || 'User'}
                                </span>
                            )}
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                {timeAgo(comment.createdAt)}
                            </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {comment.text}
                        </p>

                        {/* Reply button */}
                        {user && !user.isBanned && !isReply && (
                            <button
                                onClick={() => {
                                    setReplyingTo(replyingTo === comment._id ? null : comment._id);
                                    setReplyText('');
                                }}
                                className={`mt-2 flex items-center gap-1.5 text-xs font-semibold transition-colors ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <FontAwesomeIcon icon={faReply} className="text-[10px]" />
                                Reply
                            </button>
                        )}
                    </div>
                    {canDelete(comment) && (
                        <button
                            onClick={() => setDeleteTarget(comment._id)}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all p-1"
                            title="Delete comment"
                        >
                            <FontAwesomeIcon icon={faTrash} className="text-xs" />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div id="comments-section" className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
                <h2
                    className={`text-3xl font-bold flex items-center gap-3 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                    Comments
                    <span
                        className={`text-sm font-normal px-4 py-1.5 rounded-full ${isDark
                            ? "bg-gray-800 text-gray-400"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {comments.length}
                    </span>
                </h2>
            </div>

            {/* Comment Form */}
            {user && user.isBanned ? (
                <div className={`mb-8 p-4 rounded-lg text-center ${isDark ? 'bg-red-900/20 border border-red-800/50' : 'bg-red-50 border border-red-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}>
                        Your account is suspended. You cannot post comments.
                    </p>
                </div>
            ) : user ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className={`rounded-lg border overflow-hidden ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write a comment..."
                            rows={3}
                            className={`w-full px-4 py-3 resize-none focus:outline-none ${isDark
                                ? 'bg-transparent text-gray-200 placeholder-gray-500'
                                : 'bg-transparent text-gray-900 placeholder-gray-400'
                                }`}
                        />
                        <div className={`flex items-center justify-between px-4 py-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                Commenting as {user.name}
                            </span>
                            <button
                                type="submit"
                                disabled={!text.trim() || submitting}
                                className="px-5 py-1.5 bg-brand-primary text-white text-sm font-semibold rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className={`mb-8 p-4 rounded-lg text-center ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Link to="/login" className="text-brand-primary font-semibold hover:underline">Login</Link> to join the conversation
                    </p>
                </div>
            )}

            {/* Comments List */}
            <div className="flex flex-col gap-3">
                {comments.length === 0 ? (
                    <p className={`text-center py-8 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    topLevel.map((comment) => {
                        const replies = getReplies(comment._id);
                        return (
                            <div key={comment._id} className="flex flex-col gap-2">
                                {renderComment(comment)}

                                {/* Inline reply form */}
                                {replyingTo === comment._id && (
                                    <form
                                        onSubmit={(e) => handleReplySubmit(e, comment._id)}
                                        className="ml-8 sm:ml-12"
                                    >
                                        <div className={`rounded-lg border overflow-hidden ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder={`Reply to ${typeof comment.user === 'object' ? comment.user.name : 'User'}...`}
                                                rows={2}
                                                autoFocus
                                                className={`w-full px-4 py-2 resize-none text-sm focus:outline-none ${isDark
                                                    ? 'bg-transparent text-gray-200 placeholder-gray-500'
                                                    : 'bg-transparent text-gray-900 placeholder-gray-400'
                                                    }`}
                                            />
                                            <div className={`flex items-center justify-end gap-2 px-3 py-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                                <button
                                                    type="button"
                                                    onClick={() => setReplyingTo(null)}
                                                    className={`px-3 py-1 text-xs font-semibold rounded-md ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={!replyText.trim() || replySubmitting}
                                                    className="px-4 py-1 bg-brand-primary text-white text-xs font-semibold rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
                                                >
                                                    {replySubmitting ? 'Posting...' : 'Reply'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {/* Replies */}
                                {replies.map((reply) => renderComment(reply, true))}
                            </div>
                        );
                    })
                )}
            </div>

            <ConfirmModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={async () => {
                    setDeleting(true);
                    try {
                        await onDeleteComment(deleteTarget);
                        setDeleteTarget(null);
                    } finally {
                        setDeleting(false);
                    }
                }}
                title="Delete Comment?"
                message="Are you sure you want to delete this comment? This action cannot be undone."
                confirmText="Delete"
                confirmColor="red"
                loading={deleting}
            />
        </div>
    );
};

export default CommentsSection
