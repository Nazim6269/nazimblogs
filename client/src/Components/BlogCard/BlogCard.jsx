import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

const BlogCard = ({ data }) => {
    const { id, title, imageSrc, body, author, date, likes } = data;
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`
        group relative flex flex-col md:flex-row gap-6 p-4 rounded-md border transition-all duration-500
        hover:-translate-y-1 overflow-hidden
        ${isDark
                    ? "bg-[#0f172a]/40 border-white/5 hover:border-purple-500/30 hover:shadow-[0_20px_50px_rgba(139,92,246,0.1)] shadow-md backdrop-blur-md"
                    : "bg-white border-black/5 hover:border-purple-500/20 hover:shadow-[0_20px_50px_rgba(139,92,246,0.08)] shadow-md"
                }
      `}
        >
            {/* Visual Accent - subtle glow on hover */}
            <div className={`absolute -inset-px bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md`}></div>

            {/* Image Section */}
            <div className="relative w-full md:w-56 lg:w-72 h-52 md:h-auto overflow-hidden rounded-md shrink-0">
                <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={imageSrc || `https://picsum.photos/seed/${id || title?.length}/600/400`}
                    alt={title}
                />
                {/* Category Badge - Static for demo */}
                <div className="absolute top-3 left-3 z-20">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-brand-primary/80 backdrop-blur-md rounded-md">
                        Technology
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex flex-col justify-between flex-1 py-1">
                <div>
                    {/* Meta Top */}
                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold opacity-60">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-500" />
                            <span>{date || "Jan 18, 2026"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold opacity-60">
                            <FontAwesomeIcon icon={faClock} className="text-blue-500" />
                            <span>5 min read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3
                        className={`text-xl lg:text-2xl font-black mb-3 leading-tight transition-colors duration-300 group-hover:text-purple-500 ${isDark ? "text-white" : "text-gray-900"
                            }`}
                    >
                        {title}
                    </h3>

                    {/* Snippet */}
                    <p
                        className={`line-clamp-2 md:line-clamp-3 leading-relaxed text-sm lg:text-base mb-6 ${isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                    >
                        {body || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-500/20">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-md bg-brand-primary flex items-center justify-center text-white font-bold shadow-md">
                                {author?.charAt(0).toUpperCase() || "N"}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#0f172a] rounded-full"></div>
                        </div>

                        <div className="flex flex-col">
                            <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                                {author || "Nazim Uddin"}
                            </span>
                            <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Editor</span>
                        </div>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center gap-2">
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"}`}>
                            <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                            <span className="text-xs font-bold">{likes || 124}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string.isRequired,
        body: PropTypes.string,
        author: PropTypes.string,
        date: PropTypes.string,
        imageSrc: PropTypes.string,
        likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
};

export default BlogCard;
