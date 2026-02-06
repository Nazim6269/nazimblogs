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
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 3);
  }, [blogs]);

  // Calculate recommended posts (3 different ones)
  const recommendedPosts = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    return blogs.slice(5, 8);
  }, [blogs]);

  return (
    <aside className="w-full lg:w-[380px] flex flex-col gap-6 sm:gap-8 shrink-0 lg:sticky lg:top-24 h-fit">
      {/* Popular Section */}
      <section
        className={`p-4 sm:p-6 rounded-md border transition-all duration-500 overflow-hidden relative group
        ${isDark ? "bg-[#0f172a]/40 border-white/5 shadow-md backdrop-blur-md" : "bg-white border-black/5 shadow-md"}
      `}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-purple-500/20 transition-colors duration-500`}></div>

        <div className="flex items-center justify-between mb-4 sm:mb-6 relative z-10">
          <h3 className={`text-lg font-black flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <FontAwesomeIcon icon={faFire} className="text-orange-500" />
            Popular Posts
          </h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:text-brand-tertiary transition-colors">
            See All
          </button>
        </div>

        <div className="flex flex-col gap-2 relative z-10">
          {trendingPosts.length > 0 ? (
            trendingPosts.map(post => (
              <PopularBlog key={post._id || post.id} data={post} />
            ))
          ) : (
            [1, 2, 3].map(i => (
              <div key={i} className="h-16 animate-pulse bg-gray-500/10 rounded-md" />
            ))
          )}
        </div>
      </section>

      {/* Recommended Section */}
      <section
        className={`p-4 sm:p-6 rounded-md border transition-all duration-500 overflow-hidden relative group
        ${isDark ? "bg-[#0f172a]/40 border-white/5 shadow-md backdrop-blur-md" : "bg-white border-black/5 shadow-md"}
      `}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-pink-500/20 transition-colors duration-500`}></div>

        <div className="flex items-center justify-between mb-4 sm:mb-6 relative z-10">
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
              <Favorite key={post._id || post.id} data={post} />
            ))
          ) : (
            [1, 2, 3].map(i => (
              <div key={i} className="h-20 animate-pulse bg-gray-500/10 rounded-md" />
            ))
          )}
        </div>

        <button className={`w-full mt-4 sm:mt-6 py-2 sm:py-3 rounded-md flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 ${isDark ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-50 hover:bg-gray-100 text-gray-600"}`}>
          View More Articles
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </button>
      </section>
    </aside>
  );
};

export default SideBar;
