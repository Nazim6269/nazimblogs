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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 mb-6 animate-pulse">
          <div className={`w-6 h-6 rounded ${bg}`} />
          <div className={`w-40 h-8 rounded-md ${bg}`} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`rounded-md border overflow-hidden animate-pulse ${isDark ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200"}`}>
              <div className={`h-32 ${bg}`} />
              <div className="p-3 space-y-2">
                <div className={`h-4 w-3/4 rounded ${bg}`} />
                <div className={`h-3 w-full rounded ${bg}`} />
                <div className={`h-3 w-5/6 rounded ${bg}`} />
                <div className="flex items-center justify-between pt-1">
                  <div className={`h-3 w-16 rounded ${bg}`} />
                  <div className="flex gap-2">
                    <div className={`h-3 w-8 rounded ${bg}`} />
                    <div className={`h-3 w-8 rounded ${bg}`} />
                    <div className={`h-3 w-8 rounded ${bg}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 mb-6">
        <FontAwesomeIcon icon={faFire} className="text-orange-500 text-xl" />
        <h2 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
          Trending Now
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {blogs.map((blog) => {
          const authorName = typeof blog.author === "object" ? blog.author?.name : blog.author;
          return (
            <Link
              key={blog._id}
              to={`/blog-details/${blog._id}`}
              className={`group rounded-md border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isDark
                ? "bg-gray-800/50 border-gray-700/50 hover:border-purple-500/30"
                : "bg-white border-gray-200 hover:border-purple-500/20 hover:shadow-lg"
                }`}
            >
              {/* Image */}
              <div className="h-32 overflow-hidden relative">
                <img
                  src={blog.imageSrc || `https://picsum.photos/seed/${blog._id}/600/400`}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase text-white bg-orange-500/90 backdrop-blur rounded">
                  Trending
                </span>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className={`text-sm font-bold line-clamp-2 mb-2 group-hover:text-brand-secondary transition-colors ${isDark ? "text-white" : "text-gray-900"}`}>
                  {blog.title}
                </h3>
                <p className={`text-xs line-clamp-2 mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {stripHTML(blog.body)?.substring(0, 100)}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    {authorName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      <FontAwesomeIcon icon={faEye} /> {blog.views || 0}
                    </span>
                    <span className={`flex items-center gap-1 text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      <FontAwesomeIcon icon={faHeart} className="text-red-400" /> {blog.likes?.length || 0}
                    </span>
                    <span className={`flex items-center gap-1 text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
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
