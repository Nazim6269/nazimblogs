import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { fetchBookmarks } from "../../helper/blogApi";
import { stripHTML } from "../../utils/stripHTML";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEye, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import ReadingListSkeleton from "../../Components/skeletons/ReadingListSkeleton";

const ReadingList = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks()
      .then((data) => setBookmarks(data))
      .catch(() => setBookmarks([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ReadingListSkeleton />;

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <FontAwesomeIcon icon={faBookmark} className="text-yellow-500 text-lg sm:text-xl" />
        <h1 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
          Reading List
        </h1>
        <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${isDark ? "bg-white/10 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
          {bookmarks.length}
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <div className={`text-center py-20 rounded-md border ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <FontAwesomeIcon icon={faBookmark} className={`text-5xl mb-4 ${isDark ? "text-gray-700" : "text-gray-300"}`} />
          <p className={`text-lg font-bold mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            No bookmarks yet
          </p>
          <p className={`text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            Save articles you want to read later by clicking the bookmark icon.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((blog) => {
            const authorName = typeof blog.author === "object" ? blog.author?.name : blog.author;
            return (
              <Link
                key={blog._id}
                to={`/blog-details/${blog._id}`}
                className={`group flex gap-4 p-4 rounded-md border transition-all duration-300 hover:-translate-y-0.5 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700/50 hover:border-purple-500/30"
                    : "bg-white border-gray-200 hover:border-purple-500/20 hover:shadow-lg"
                }`}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-24 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={blog.imageSrc || `https://picsum.photos/seed/${blog._id}/600/400`}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-bold line-clamp-1 mb-1 group-hover:text-brand-secondary transition-colors ${isDark ? "text-white" : "text-gray-900"}`}>
                    {blog.title}
                  </h3>
                  <p className={`text-sm line-clamp-2 mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {stripHTML(blog.body)?.substring(0, 150)}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className={`text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {authorName}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        <FontAwesomeIcon icon={faEye} /> {blog.views || 0}
                      </span>
                      <span className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        <FontAwesomeIcon icon={faHeart} className="text-red-400" /> {blog.likes?.length || 0}
                      </span>
                      <span className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        <FontAwesomeIcon icon={faComment} /> {blog.comments?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReadingList;
