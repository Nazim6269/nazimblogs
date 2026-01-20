import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const PopularBlog = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Mock data if none provided
  const blog = data || {
    id: 1,
    title: "How to Auto Deploy a Next.js App on Ubuntu from GitHub",
    author: "Saad Hasan",
    likes: 124,
    image: "https://picsum.photos/seed/tech/100/100"
  };

  return (
    <div
      className={`group rounded-2xl transition-all duration-300 relative overflow-hidden
        ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}
      `}
    >
      <Link to={`/blog-details?id=${blog.id}`} className="flex gap-4 p-3 items-center">
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
          <img
            src={blog.image || `https://picsum.photos/seed/${blog.id}/100/100`}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-sm leading-tight mb-1 line-clamp-2 transition-colors duration-300 ${isDark ? "text-gray-200 group-hover:text-purple-400" : "text-gray-800 group-hover:text-purple-600"
              }`}
          >
            {blog.title}
          </h3>

          <div className="flex items-center gap-2 text-[11px] font-semibold opacity-60">
            <span className={isDark ? "text-purple-400" : "text-purple-600"}>{blog.author}</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-30"></span>
            <span>{blog.likes} Likes</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularBlog;

