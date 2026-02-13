import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye, faComment } from "@fortawesome/free-solid-svg-icons";
import { stripHTML } from "../../utils/stripHTML";

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

const BlogCard = ({ data }) => {
    const { _id, id, title, imageSrc, body, author, date, createdAt, likes, category, views, comments } = data;
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const authorName = typeof author === "object" ? author?.name : author;
    const authorId = typeof author === "object" ? author?._id : null;
    const authorPhoto = typeof author === "object" ? author?.photoURL : null;
    const displayDate = date || formatDate(createdAt);
    const blogId = _id || id;
    const likeCount = Array.isArray(likes) ? likes.length : (likes || 0);

    return (
        <div
            className={`
                group relative flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 rounded-lg border transition-all duration-300
                ${isDark
                    ? "bg-slate-800/60 border-slate-700/50 hover:border-slate-600"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
                }
            `}
        >
            {/* Image */}
            <div className="relative w-full sm:w-44 md:w-52 h-36 sm:h-32 overflow-hidden rounded-md shrink-0">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={imageSrc || `https://picsum.photos/seed/${blogId || title?.length}/600/400`}
                    alt={title}
                />
                <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded ${isDark
                    ? "bg-slate-900/80 text-gray-300"
                    : "bg-white/90 text-gray-600"
                    } backdrop-blur-sm`}
                >
                    {category || "Community"}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                <div>
                    {/* Author row + date */}
                    <div className="flex items-center gap-2 mb-2">
                        {authorId ? (
                            <Link
                                to={`/author/${authorId}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 shrink-0"
                            >
                                {authorPhoto ? (
                                    <img src={authorPhoto} alt={authorName} className="w-5 h-5 rounded-full object-cover" />
                                ) : (
                                    <div className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${isDark ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
                                        {authorName?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}
                                <span className={`text-xs font-semibold hover:text-brand-secondary transition-colors truncate ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    {authorName}
                                </span>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2 shrink-0">
                                {authorPhoto ? (
                                    <img src={authorPhoto} alt={authorName} className="w-5 h-5 rounded-full object-cover" />
                                ) : (
                                    <div className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${isDark ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
                                        {authorName?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}
                                <span className={`text-xs font-semibold truncate ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                    {authorName}
                                </span>
                            </div>
                        )}
                        <span className={`text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>{displayDate}</span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-base sm:text-lg font-bold leading-snug mb-1.5 line-clamp-2 group-hover:text-brand-secondary transition-colors duration-200 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                        {title}
                    </h3>

                    {/* Snippet */}
                    <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {stripHTML(body)?.substring(0, 150) || "No description available."}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3">
                    <div className={`flex items-center gap-3 text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faEye} className="text-[10px]" />
                            {views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faHeart} className="text-[10px] text-red-400/70" />
                            {likeCount}
                        </span>
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faComment} className="text-[10px]" />
                            {comments?.length || 0}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string.isRequired,
        body: PropTypes.string,
        author: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({ name: PropTypes.string, email: PropTypes.string }),
        ]),
        date: PropTypes.string,
        createdAt: PropTypes.string,
        imageSrc: PropTypes.string,
        likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        category: PropTypes.string,
        views: PropTypes.number,
        comments: PropTypes.array,
    }).isRequired,
};

export default BlogCard;
