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
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
      <div className="flex items-center gap-2 mb-4">
        <FontAwesomeIcon icon={faBookmark} className="text-yellow-500 text-sm" />
        <h1 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Reading List
        </h1>
        <span className={`text-xs px-1.5 py-0.5 rounded ${isDark ? "bg-white/10 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
          {bookmarks.length}
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <div className={`text-center py-12 rounded-lg ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          <FontAwesomeIcon icon={faBookmark} className="text-2xl mb-2" />
          <p className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>No bookmarks yet</p>
          <p className="text-xs">Save articles to read later.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {bookmarks.map((blog) => {
            const authorName = typeof blog.author === "object" ? blog.author?.name : blog.author;
            return (
              <Link
                key={blog._id}
                to={`/blog-details/${blog._id}`}
                className={`group flex gap-3 p-3 rounded-lg border transition-colors ${isDark
                  ? "bg-slate-800/60 border-slate-700/50 hover:border-slate-600"
                  : "bg-white border-gray-100 hover:border-gray-200"
                  }`}
              >
                <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={blog.imageSrc || `https://picsum.photos/seed/${blog._id}/600/400`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-semibold line-clamp-1 mb-0.5 group-hover:text-brand-secondary transition-colors ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                    {blog.title}
                  </h3>
                  <p className={`text-xs line-clamp-1 mb-1.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {stripHTML(blog.body)?.substring(0, 100)}
                  </p>
                  <div className={`flex items-center gap-2 text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    <span>{authorName}</span>
                    <span className="flex items-center gap-0.5"><FontAwesomeIcon icon={faHeart} className="text-red-400/60" /> {blog.likes?.length || 0}</span>
                    <span className="flex items-center gap-0.5"><FontAwesomeIcon icon={faComment} /> {blog.comments?.length || 0}</span>
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
