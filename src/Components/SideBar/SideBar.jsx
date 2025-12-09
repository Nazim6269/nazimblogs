import Favorite from "../../Components/Favorite/Favorite";
import PopularBlog from "../../Components/PopularBlog/PopularBlog";
import { useTheme } from "../../hooks/useTheme";

const SideBar = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <aside
      className={`w-full md:w-80 flex flex-col gap-6 p-4 rounded-xl border
      ${isDark ? " border-gray-700 " : " border-gray-300 "}
    `}
    >
      {/* Popular Section */}
      <section
        className={`p-4 rounded-xl  transition-all duration-300 border-0`}
      >
        <h3
          className={`text-xl font-bold mb-3
          ${isDark ? "text-white" : "text-gray-900"}
        `}
        >
          Most Popular 👍️
        </h3>

        <div className="space-y-3">
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
        </div>
      </section>

      {/* Favourites Section */}
      <section
        className={`p-4 rounded-xl border-0 transition-all duration-300
    `}
      >
        <h3
          className={`text-xl font-bold mb-3 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Your Favourites ❤️
        </h3>

        <div className="space-y-3">
          <Favorite />
          <Favorite />
          <Favorite />
        </div>
      </section>
    </aside>
  );
};

export default SideBar;
