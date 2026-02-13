import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart, faEye, faComment, faClock,
    faEdit, faTrash, faCheck, faArrowUpRightFromSquare, faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { stripHTML } from "../../utils/stripHTML";
import { calculateReadingTime } from "../../utils/readingTime";

const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown";
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const statusConfig = {
    draft: { label: "Draft", bg: "bg-yellow-500/20", text: "text-yellow-500" },
    pending: { label: "Pending", bg: "bg-orange-500/20", text: "text-orange-500" },
    rejected: { label: "Rejected", bg: "bg-red-500/20", text: "text-red-500" },
    published: { label: "Live", bg: "bg-emerald-500/20", text: "text-emerald-500" },
    scheduled: { label: "Scheduled", bg: "bg-blue-500/20", text: "text-blue-500" },
};

const ProfileBlogCard = ({ data, editable = false, onEdit, onDelete, onPublish, onResubmit }) => {
    const { _id, id, title, imageSrc, body, date, createdAt, likes, category, views, comments, status, tags, rejectionReason } = data;
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const blogId = _id || id;
    const likeCount = Array.isArray(likes) ? likes.length : (likes || 0);
    const commentCount = comments?.length || 0;
    const displayDate = date || formatDate(createdAt);
    const isDraft = status === "draft";
    const isRejected = status === "rejected";
    const badge = statusConfig[status] || statusConfig.published;
    const tagList = Array.isArray(tags) ? tags.slice(0, 3) : [];

    return (
        <div
            className={`
                group relative flex gap-3 p-3 rounded-lg border transition-all duration-300
                ${isDark
                    ? "bg-slate-800/60 border-slate-700/50 hover:border-brand-primary/40"
                    : "bg-white border-gray-100 hover:border-brand-primary/30 hover:shadow-md"
                }
            `}
        >
            {/* Thumbnail */}
            <Link
                to={`/blog-details/${blogId}`}
                className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-md overflow-hidden shrink-0"
            >
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={imageSrc || `https://picsum.photos/seed/${blogId || title?.length}/200/200`}
                    alt={title}
                />
                {/* Category badge */}
                <span className={`absolute bottom-0 left-0 right-0 px-1.5 py-0.5 text-[9px] font-semibold text-center truncate
                    ${isDark ? "bg-slate-900/80 text-gray-300" : "bg-white/90 text-gray-600"} backdrop-blur-sm`}
                >
                    {category || "Community"}
                </span>
            </Link>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                {/* Top row: title + status */}
                <div>
                    <div className="flex items-start gap-2 mb-0.5">
                        <Link
                            to={`/blog-details/${blogId}`}
                            className={`flex-1 min-w-0 text-sm font-bold leading-snug line-clamp-1 transition-colors duration-200 group-hover:text-brand-secondary ${isDark ? "text-gray-100" : "text-gray-900"}`}
                        >
                            {title}
                        </Link>
                        <div className="flex items-center gap-1 shrink-0">
                            <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${badge.bg} ${badge.text}`}>
                                {badge.label}
                            </span>
                        </div>
                    </div>

                    {/* Snippet */}
                    <p className={`text-xs leading-relaxed line-clamp-1 mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        {stripHTML(body)?.substring(0, 120) || "No description available."}
                    </p>

                    {/* Rejection reason */}
                    {isRejected && rejectionReason && (
                        <p className={`text-[10px] leading-relaxed line-clamp-1 mb-1 ${isDark ? "text-red-400/80" : "text-red-500/80"}`}>
                            Reason: {rejectionReason}
                        </p>
                    )}

                    {/* Tags */}
                    {tagList.length > 0 && (
                        <div className="flex items-center gap-1 mb-1.5">
                            {tagList.map((tag) => (
                                <span
                                    key={tag}
                                    className={`px-1.5 py-0.5 text-[9px] font-medium rounded-full transition-colors ${isDark
                                        ? "bg-slate-700/80 text-gray-400 group-hover:text-brand-tertiary"
                                        : "bg-gray-100 text-gray-500 group-hover:text-brand-primary"
                                    }`}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer: stats + actions */}
                <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2.5 text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faClock} className="text-[9px]" />
                            {calculateReadingTime(body)}m
                        </span>
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faEye} className="text-[9px]" />
                            {views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faHeart} className="text-[9px] text-red-400/70" />
                            {likeCount}
                        </span>
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faComment} className="text-[9px]" />
                            {commentCount}
                        </span>
                        <span className={`hidden sm:inline ${isDark ? "text-gray-700" : "text-gray-300"}`}>|</span>
                        <span className="hidden sm:inline">{displayDate}</span>
                    </div>

                    {/* Action buttons */}
                    {editable && (
                        <div className={`flex items-center gap-1 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100`}>
                            {isDraft && onPublish && (
                                <button
                                    onClick={(e) => { e.preventDefault(); onPublish(blogId); }}
                                    className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isDark
                                        ? "text-green-400 hover:bg-green-500/20"
                                        : "text-green-600 hover:bg-green-50"
                                    }`}
                                    title="Publish"
                                >
                                    <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                                </button>
                            )}
                            {isRejected && onResubmit && (
                                <button
                                    onClick={(e) => { e.preventDefault(); onResubmit(blogId); }}
                                    className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isDark
                                        ? "text-orange-400 hover:bg-orange-500/20"
                                        : "text-orange-600 hover:bg-orange-50"
                                    }`}
                                    title="Resubmit for review"
                                >
                                    <FontAwesomeIcon icon={faRotateRight} className="text-[10px]" />
                                </button>
                            )}
                            <button
                                onClick={(e) => { e.preventDefault(); onEdit?.(data); }}
                                className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isDark
                                    ? "text-blue-400 hover:bg-blue-500/20"
                                    : "text-blue-500 hover:bg-blue-50"
                                }`}
                                title="Edit"
                            >
                                <FontAwesomeIcon icon={faEdit} className="text-[10px]" />
                            </button>
                            <button
                                onClick={(e) => { e.preventDefault(); onDelete?.(blogId); }}
                                className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isDark
                                    ? "text-red-400 hover:bg-red-500/20"
                                    : "text-red-500 hover:bg-red-50"
                                }`}
                                title="Delete"
                            >
                                <FontAwesomeIcon icon={faTrash} className="text-[10px]" />
                            </button>
                        </div>
                    )}

                    {/* Open link for non-editable cards */}
                    {!editable && (
                        <Link
                            to={`/blog-details/${blogId}`}
                            className={`w-6 h-6 rounded flex items-center justify-center transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 ${isDark
                                ? "text-gray-500 hover:text-brand-secondary"
                                : "text-gray-400 hover:text-brand-primary"
                            }`}
                            title="Read post"
                        >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

ProfileBlogCard.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string.isRequired,
        body: PropTypes.string,
        date: PropTypes.string,
        createdAt: PropTypes.string,
        imageSrc: PropTypes.string,
        likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        category: PropTypes.string,
        views: PropTypes.number,
        comments: PropTypes.array,
        status: PropTypes.string,
        tags: PropTypes.array,
        rejectionReason: PropTypes.string,
    }).isRequired,
    editable: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onPublish: PropTypes.func,
    onResubmit: PropTypes.func,
};

export default ProfileBlogCard;
