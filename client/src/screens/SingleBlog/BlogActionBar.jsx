import React, { useState, useRef, useEffect } from 'react'
import ActionButton from './ActionButton'
import { faBookmark, faComment, faHeart, faShare, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebookF, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toggleBookmark } from '../../helper/blogApi'
import { useAuth } from '../../contexts/AuthContext'
import ReportButton from '../../Components/ReportButton/ReportButton'
import toast from 'react-hot-toast'

const BlogActionBar = ({ isDark, blogId, likes = [], comments, user, onLike, blogTitle }) => {
    const { user: authUser, updateUser } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);
    const shareRef = useRef(null);

    const isLiked = user && likes.some((id) => {
        const likeId = typeof id === 'object' ? id._id || id : id;
        return likeId?.toString() === user._id?.toString();
    });
    const likeCount = likes.length;

    // Check if blog is bookmarked from user context
    useEffect(() => {
        if (authUser?.bookmarks && blogId) {
            setIsBookmarked(authUser.bookmarks.includes(blogId));
        }
    }, [authUser?.bookmarks, blogId]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (shareRef.current && !shareRef.current.contains(e.target)) {
                setShowShareMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const pageUrl = window.location.href;
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(blogTitle || 'Check out this blog post');

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(pageUrl);
            setCopied(true);
            toast.success('Link copied!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy link');
        }
    };

    const handleBookmark = async () => {
        if (!authUser) {
            toast.error('Please login to bookmark');
            return;
        }
        try {
            const data = await toggleBookmark(blogId);
            setIsBookmarked(data.bookmarked);
            // Update user bookmarks in context
            const currentBookmarks = authUser.bookmarks || [];
            const updatedBookmarks = data.bookmarked
                ? [...currentBookmarks, blogId]
                : currentBookmarks.filter((id) => id !== blogId);
            updateUser({ bookmarks: updatedBookmarks });
            toast.success(data.bookmarked ? 'Bookmarked!' : 'Bookmark removed');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const shareLinks = [
        {
            name: 'Twitter',
            icon: faTwitter,
            color: 'hover:text-sky-400',
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        },
        {
            name: 'Facebook',
            icon: faFacebookF,
            color: 'hover:text-blue-500',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: 'LinkedIn',
            icon: faLinkedinIn,
            color: 'hover:text-blue-600',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
            name: 'WhatsApp',
            icon: faWhatsapp,
            color: 'hover:text-green-500',
            url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        },
    ];

    return (
        <div
            className={`sticky bottom-0 left-0 right-0 border-t backdrop-blur-lg z-40 ${isDark
                ? "bg-gray-900/80 border-gray-700"
                : "bg-white/80 border-gray-200"
                }`}
        >
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ActionButton
                        icon={faHeart}
                        text={likeCount}
                        onClick={onLike}
                        isActive={isLiked}
                        isDark={isDark}
                        activeColor="text-red-500"
                    />

                    <ActionButton
                        icon={faComment}
                        text={comments}
                        onClick={() => {
                            const el = document.getElementById('comments-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            else window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                        }}
                        isDark={isDark}
                    />

                    {/* Share with dropdown */}
                    <div className="relative" ref={shareRef}>
                        <ActionButton
                            icon={faShare}
                            text="Share"
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            isDark={isDark}
                        />

                        {showShareMenu && (
                            <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 rounded-lg border shadow-xl p-3 min-w-[180px] ${isDark
                                ? 'bg-gray-800 border-gray-700'
                                : 'bg-white border-gray-200'
                                }`}>
                                <div className="flex flex-col gap-1">
                                    {shareLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${isDark
                                                ? `text-gray-300 hover:bg-gray-700 ${link.color}`
                                                : `text-gray-600 hover:bg-gray-50 ${link.color}`
                                                }`}
                                            onClick={() => setShowShareMenu(false)}
                                        >
                                            <FontAwesomeIcon icon={link.icon} className="w-4" />
                                            {link.name}
                                        </a>
                                    ))}
                                    <button
                                        onClick={() => { handleCopyLink(); setShowShareMenu(false); }}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${isDark
                                            ? 'text-gray-300 hover:bg-gray-700 hover:text-green-400'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                                            }`}
                                    >
                                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-4" />
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                <ReportButton targetType="blog" targetId={blogId} isDark={isDark} />
                <ActionButton
                    icon={faBookmark}
                    text={isBookmarked ? "Saved" : "Save"}
                    onClick={handleBookmark}
                    isActive={isBookmarked}
                    isDark={isDark}
                    activeColor="text-yellow-500"
                />
                </div>
            </div>
        </div>
    );
}

export default BlogActionBar
