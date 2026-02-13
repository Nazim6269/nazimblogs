import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/useTheme";
import { fetchTags } from "../../helper/blogApi";

const TagsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags()
      .then(setTags)
      .catch(() => setTags([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
      <Helmet>
        <title>All Tags | NazimBlogs</title>
      </Helmet>

      <h1 className={`text-xl font-bold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>
        <FontAwesomeIcon icon={faTag} className="mr-2 text-brand-primary" />
        All Tags
      </h1>

      {loading ? (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`h-8 w-20 rounded-full animate-pulse ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
          ))}
        </div>
      ) : tags.length === 0 ? (
        <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>No tags found.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag._id}
              to={`/tags/${tag._id}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-300 hover:bg-brand-primary/20 hover:text-brand-primary hover:border-brand-primary/30"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-brand-primary hover:border-purple-200"
              }`}
            >
              #{tag.displayName || tag._id}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isDark ? "bg-white/10 text-gray-400" : "bg-gray-200 text-gray-500"
              }`}>
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsPage;
