import { useState, useEffect, useMemo } from "react";
import Favorite from "../../Components/Favorite/Favorite";
import PopularBlog from "../../Components/PopularBlog/PopularBlog";
import { useTheme } from "../../hooks/useTheme";
import { fetchRecommendedBlogs } from "../../helper/blogApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHeart } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ blogs = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [recLoading, setRecLoading] = useState(true);

  const trendingPosts = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    return [...blogs]
      .sort((a, b) => (Array.isArray(b.likes) ? b.likes.length : (b.likes || 0)) - (Array.isArray(a.likes) ? a.likes.length : (a.likes || 0)))
      .slice(0, 3);
  }, [blogs]);

  useEffect(() => {
    fetchRecommendedBlogs()
      .then((data) => setRecommendedPosts(data))
      .catch(() => setRecommendedPosts([]))
      .finally(() => setRecLoading(false));
  }, []);

  return (
    <aside className="w-full lg:w-[340px] flex flex-col gap-4 shrink-0 lg:sticky lg:top-20 h-fit">
      {/* Popular */}
      <section className={`p-4 rounded-lg border ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
        <h3 className={`text-sm font-bold flex items-center gap-1.5 mb-3 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          <FontAwesomeIcon icon={faFire} className="text-orange-500 text-xs" />
          Popular
        </h3>
        <div className="flex flex-col gap-1">
          {trendingPosts.length > 0 ? (
            trendingPosts.map(post => <PopularBlog key={post._id || post.id} data={post} />)
          ) : (
            [1, 2, 3].map(i => <div key={i} className="h-14 animate-pulse bg-gray-500/10 rounded" />)
          )}
        </div>
      </section>

      {/* Recommended */}
      <section className={`p-4 rounded-lg border ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
        <h3 className={`text-sm font-bold flex items-center gap-1.5 mb-3 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          <FontAwesomeIcon icon={faHeart} className="text-pink-500 text-xs" />
          Recommended
        </h3>
        <div className="flex flex-col gap-1">
          {recLoading ? (
            [1, 2, 3].map(i => <div key={i} className="h-16 animate-pulse bg-gray-500/10 rounded" />)
          ) : recommendedPosts.length > 0 ? (
            recommendedPosts.map(post => <Favorite key={post._id || post.id} data={post} />)
          ) : (
            <p className={`text-xs text-center py-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              No recommendations yet
            </p>
          )}
        </div>
      </section>
    </aside>
  );
};

export default SideBar;
