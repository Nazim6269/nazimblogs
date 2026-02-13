import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const PopularBlog = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const blog = data || {
    _id: "1",
    title: "How to Auto Deploy a Next.js App on Ubuntu from GitHub",
    author: "Saad Hasan",
    likes: 124,
    imageSrc: "https://picsum.photos/seed/tech/100/100"
  };

  const blogId = blog._id || blog.id;
  const authorName = typeof blog.author === "object" ? blog.author?.name : blog.author;
  const image = blog.imageSrc || blog.image || `https://picsum.photos/seed/${blogId}/100/100`;

  return (
    <div
      className={`group rounded-md transition-all duration-300 relative overflow-hidden
        ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}
      `}
    >
      <Link to={`/blog-details/${blogId}`} className="flex gap-3 p-2.5 items-center">
        {/* Thumbnail */}
        <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
          <img
            src={image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-xs leading-tight mb-0.5 line-clamp-2 transition-colors ${isDark ? "text-gray-200 group-hover:text-brand-tertiary" : "text-gray-800 group-hover:text-brand-primary"
              }`}
          >
            {blog.title}
          </h3>

          <div className="flex items-center gap-1.5 text-[10px] font-medium opacity-60">
            <span className={isDark ? "text-brand-tertiary" : "text-brand-primary"}>{authorName || "Unknown"}</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-30"></span>
            <span>{Array.isArray(blog.likes) ? blog.likes.length : (blog.likes || 0)} Likes</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularBlog;
