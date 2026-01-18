import Favorite from "../../Components/Favorite/Favorite";
import PopularBlog from "../../Components/PopularBlog/PopularBlog";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHeart, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <aside className="w-full lg:w-[400px] flex flex-col gap-8 shrink-0">
      {/* Popular Section */}
      <section
        className={`p-6 rounded-4xl border transition-all duration-500 overflow-hidden relative group
        ${isDark ? "bg-[#0f172a]/40 border-white/5 shadow-2xl backdrop-blur-md" : "bg-white border-black/5 shadow-xl"}
      `}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-purple-500/20 transition-colors duration-500`}></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <FontAwesomeIcon icon={faFire} className="text-orange-500" />
            Trending Post
          </h3>
          <button className="text-xs font-bold uppercase tracking-widest text-purple-500 hover:text-purple-400 transition-colors">
            See All
          </button>
        </div>

        <div className="space-y-5 relative z-10">
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
        </div>
      </section>

      {/* Favourites Section */}
      <section
        className={`p-6 rounded-4xl border transition-all duration-500 overflow-hidden relative group
        ${isDark ? "bg-[#0f172a]/40 border-white/5 shadow-2xl backdrop-blur-md" : "bg-white border-black/5 shadow-xl"}
      `}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-pink-500/20 transition-colors duration-500`}></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <FontAwesomeIcon icon={faHeart} className="text-pink-500" />
            Recommended
          </h3>
          <button className="text-xs font-bold uppercase tracking-widest text-pink-500 hover:text-pink-400 transition-colors">
            Discover
          </button>
        </div>

        <div className="space-y-5 relative z-10">
          <Favorite />
          <Favorite />
          <Favorite />
        </div>

        <button className={`w-full mt-6 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${isDark ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-50 hover:bg-gray-100 text-gray-600"}`}>
          View More Articles
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </button>
      </section>
    </aside>
  );
};

export default SideBar;
