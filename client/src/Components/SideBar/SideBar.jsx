import Favorite from "../../Components/Favorite/Favorite";
import PopularBlog from "../../Components/PopularBlog/PopularBlog";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHeart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";

const SideBar = ({ blogs = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Calculate trending posts (Top 3 by likes)
  const trendingPosts = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    return [...blogs]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3)
      .map(post => ({
        ...post,
        image: `https://picsum.photos/seed/${post.id}/100/100` // Smaller for sidebar
      }));
  }, [blogs]);

  // Calculate recommended posts (3 posts with different tags)
  const recommendedPosts = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    // Just pick different ones than trending or just slice some
    return blogs.slice(5, 8).map(post => ({
      ...post,
      tags: ["Tech", "Design", "Code"] // Default tags for demo
    }));
  }, [blogs]);

  return (
    <aside className="w-full lg:w-[380px] flex flex-col gap-8 shrink-0 lg:sticky lg:top-24 h-fit">
      {/* Popular Section */}
      <section
        className={`p-6 rounded-3xl border transition-all duration-500 overflow-hidden relative group
        ${isDark ? "bg-[#0f172a]/40 border-white/5 shadow-2xl backdrop-blur-md" : "bg-white border-black/5 shadow-xl"}
      `}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-purple-500/20 transition-colors duration-500`}></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className={`text-lg font-black flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <FontAwesomeIcon icon={faFire} className="text-orange-500" />
            Popular Posts
          </h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-purple-500 hover:text-purple-400 transition-colors">
            See All
          </button>
        </div>

        <div className="flex flex-col gap-2 relative z-10">
          {trendingPosts.length > 0 ? (
            trendingPosts.map(post => (
              <PopularBlog key={`trending-${post.id}`} data={post} />
            ))
          ) : (
            // Skeleton while loading
            [1, 2, 3].map(i => (
              <div key={i} className="h-16 animate-pulse bg-gray-500/10 rounded-xl" />
            ))
          )}
        </div>
      </section>

      {/* Recommended Section */}
      <section
        className={`p-6 rounded-3xl border transition-all duration-500 overflow-hidden relative group
        ${isDark ? "bg-[#0f172a]/40 border-white/5 shadow-2xl backdrop-blur-md" : "bg-white border-black/5 shadow-xl"}
      `}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-pink-500/20 transition-colors duration-500`}></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className={`text-lg font-black flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <FontAwesomeIcon icon={faHeart} className="text-pink-500" />
            Recommended
          </h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-pink-500 hover:text-pink-400 transition-colors">
            Discover
          </button>
        </div>

        <div className="flex flex-col gap-2 relative z-10">
          {recommendedPosts.length > 0 ? (
            recommendedPosts.map(post => (
              <Favorite key={`fav-${post.id}`} data={post} />
            ))
          ) : (
            [1, 2, 3].map(i => (
              <div key={i} className="h-20 animate-pulse bg-gray-500/10 rounded-xl" />
            ))
          )}
        </div>

        <button className={`w-full mt-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 ${isDark ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-50 hover:bg-gray-100 text-gray-600"}`}>
          View More Articles
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </button>
      </section>
    </aside>
  );
};

export default SideBar;


