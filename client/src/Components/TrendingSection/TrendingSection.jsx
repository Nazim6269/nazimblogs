import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { fetchTrendingBlogs } from "../../helper/blogApi";
import { stripHTML } from "../../utils/stripHTML";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faEye, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

const TrendingSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingBlogs()
      .then((data) => setBlogs(data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    const bg = isDark ? "bg-gray-700" : "bg-gray-200";
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className={`h-6 w-36 rounded mb-4 animate-pulse ${bg}`} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`rounded-lg border overflow-hidden animate-pulse ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
              <div className={`h-24 ${bg}`} />
              <div className="p-2.5 space-y-1.5">
                <div className={`h-3.5 w-3/4 rounded ${bg}`} />
                <div className={`h-3 w-full rounded ${bg}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
      <div className="flex items-center gap-2 mb-4">
        <FontAwesomeIcon icon={faFire} className="text-orange-500" />
        <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Trending
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {blogs.map((blog) => {
          const authorName = typeof blog.author === "object" ? blog.author?.name : blog.author;
          return (
            <Link
              key={blog._id}
              to={`/blog-details/${blog._id}`}
              className={`group rounded-lg border overflow-hidden transition-colors duration-200 ${isDark
                ? "bg-slate-800/60 border-slate-700/50 hover:border-slate-600"
                : "bg-white border-gray-100 hover:border-gray-200"
                }`}
            >
              <div className="h-24 overflow-hidden relative">
                <img
                  src={blog.imageSrc || `https://picsum.photos/seed/${blog._id}/600/400`}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2.5">
                <h3 className={`text-xs font-semibold line-clamp-2 mb-1.5 group-hover:text-brand-secondary transition-colors ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                  {blog.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] truncate ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    {authorName}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`flex items-center gap-0.5 text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      <FontAwesomeIcon icon={faHeart} className="text-red-400/60" /> {blog.likes?.length || 0}
                    </span>
                    <span className={`flex items-center gap-0.5 text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      <FontAwesomeIcon icon={faComment} /> {blog.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingSection;
