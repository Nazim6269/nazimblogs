import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCalendarAlt, faClock, faEye, faComment } from "@fortawesome/free-solid-svg-icons";
import { stripHTML } from "../../utils/stripHTML";

const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown";
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const BlogCard = ({ data }) => {
    const { _id, id, title, imageSrc, body, author, date, createdAt, likes, category, views, comments } = data;
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const authorName = typeof author === "object" ? author?.name : author;
    const authorId = typeof author === "object" ? author?._id : null;
    const displayDate = date || formatDate(createdAt);
    const blogId = _id || id;

    return (
        <div
            className={`
        group relative flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 p-4 rounded-md border transition-all duration-500
        hover:-translate-y-1 overflow-hidden
        ${isDark
                    ? "bg-[#0f172a]/40 border-white/5 hover:border-purple-500/30 hover:shadow-[0_20px_50px_rgba(139,92,246,0.1)] shadow-md backdrop-blur-md"
                    : "bg-white border-black/5 hover:border-purple-500/20 hover:shadow-[0_20px_50px_rgba(139,92,246,0.08)] shadow-md"
                }
      `}
        >
            {/* Visual Accent */}
            <div className="absolute -inset-px bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"></div>

            {/* Image Section */}
            <div className="relative w-full md:w-56 lg:w-72 h-40 sm:h-48 md:h-auto overflow-hidden rounded-md shrink-0">
                <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={imageSrc || `https://picsum.photos/seed/${blogId || title?.length}/600/400`}
                    alt={title}
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-20">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-brand-primary/80 backdrop-blur-md rounded-md">
                        {category || "Technology"}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex flex-col justify-between flex-1 py-1">
                <div>
                    {/* Meta Top */}
                    <div className="flex items-center gap-2 sm:gap-4 mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold opacity-60">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-brand-secondary" />
                            <span>{displayDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold opacity-60">
                            <FontAwesomeIcon icon={faClock} className="text-blue-500" />
                            <span>5 min read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3
                        className={`text-lg sm:text-xl lg:text-2xl font-black mb-3 leading-tight transition-colors duration-300 group-hover:text-brand-secondary ${isDark ? "text-white" : "text-gray-900"
                            }`}
                    >
                        {title}
                    </h3>

                    {/* Snippet */}
                    <p
                        className={`line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-base mb-6 ${isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                    >
                        {stripHTML(body)?.substring(0, 200) || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-500/20">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-md bg-brand-primary flex items-center justify-center text-white font-bold shadow-md">
                                {authorName?.charAt(0).toUpperCase() || "N"}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#0f172a] rounded-full"></div>
                        </div>

                        <div className="flex flex-col">
                            {authorId ? (
                              <Link
                                to={`/author/${authorId}`}
                                onClick={(e) => e.stopPropagation()}
                                className={`text-sm font-bold hover:text-brand-secondary transition-colors ${isDark ? "text-white" : "text-gray-900"}`}
                              >
                                {authorName || "Nazim Uddin"}
                              </Link>
                            ) : (
                              <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                                {authorName || "Nazim Uddin"}
                              </span>
                            )}
                            <span className="text-[10px] uppercase font-black tracking-widest opacity-40">{category || "Community"}</span>
                        </div>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                            <FontAwesomeIcon icon={faEye} className="text-blue-400 text-[10px]" />
                            <span>{views || 0}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                            <FontAwesomeIcon icon={faComment} className="text-gray-400 text-[10px]" />
                            <span>{comments?.length || 0}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-md ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                            <FontAwesomeIcon icon={faHeart} className="text-red-500 text-[10px]" />
                            <span className="text-xs font-bold">{Array.isArray(likes) ? likes.length : (likes || 0)}</span>
                        </div>
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
        likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        category: PropTypes.string,
    }).isRequired,
};

export default BlogCard;
