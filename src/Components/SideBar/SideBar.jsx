import { useTheme } from "../../hooks/useTheme"; // Assuming you have a `useTheme` hook
import Favorite from "../../Components/Favorite/Favorite";
import PopularBlog from "../../Components/PopularBlog/PopularBlog";

const SideBar = () => {
  const [theme] = useTheme(); // Get current theme (dark or light)

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      } flex flex-col gap-5 p-4 rounded-lg`}
    >
      {/* Popular Blog div */}
      <div
        className={`${
          theme === "dark" ? "border-gray-600" : "border-gray-500"
        } border hover:border-gray-600 rounded px-3 py-2`}
      >
        <h3
          className={`text-black text-xl lg:text-2xl font-semibold ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          Most Popular 👍️
        </h3>
        <PopularBlog />
        <PopularBlog />
        <PopularBlog />
      </div>

      {/* Favorite Blog div */}
      <div
        className={`${
          theme === "dark" ? "border-gray-600" : "border-gray-500"
        } border hover:border-gray-600 rounded px-3 py-2`}
      >
        <h3
          className={`text-black text-xl lg:text-2xl font-semibold ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          Your Favourites ❤️
        </h3>
        <Favorite />
        <Favorite />
        <Favorite />
      </div>
    </div>
  );
};

export default SideBar;
