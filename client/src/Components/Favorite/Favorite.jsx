import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const Favorite = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const blog = data || {
        id: 3,
        title: "Mastering Modern CSS Layouts with Grid and Flexbox",
        tags: ["css", "frontend", "design"],
    };

    return (
        <div
            className={`group rounded-md transition-all duration-300 relative overflow-hidden p-3
        ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}
      `}
        >
            <Link to={`/blog-details?id=${blog.id}`}>
                <h3
                    className={`text-[13px] font-bold leading-snug mb-2 line-clamp-2 transition-colors duration-300 ${isDark ? "text-gray-300 group-hover:text-pink-400" : "text-gray-700 group-hover:text-pink-600"
                        }`}
                >
                    {blog.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                    {blog.tags?.map((tag) => (
                        <span
                            key={tag}
                            className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${isDark
                                ? "bg-white/5 text-gray-500 group-hover:bg-pink-500/10 group-hover:text-pink-400"
                                : "bg-gray-100 text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-600"
                                }`}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </Link>
        </div>
    );
};

export default Favorite;
