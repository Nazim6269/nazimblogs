import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const PopularBlog = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Link to={`/blog-details?id=2`}>
      <div
        className={`px-4 py-4 my-3 rounded-lg border transition-all duration-300
        transform hover:scale-[1.02] hover:shadow-lg group
        ${isDark
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "bg-white border-gray-200 text-gray-900"
          }
        hover:bg-purple-500/10`}
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <h3
              className={`font-bold text-sm mb-2 transition-colors duration-300 ${isDark
                  ? "text-gray-200 group-hover:text-purple-400"
                  : "text-gray-800 group-hover:text-purple-600"
                }`}
            >
              How to Auto Deploy a Next.js App on Ubuntu from GitHub
            </h3>

            <p
              className={`text-sm mt-1 transition-colors ${isDark ? "text-gray-400" : "text-gray-600"
                }`}
            >
              by{" "}
              <Link
                to="/profile"
                className={`transition-colors ${isDark
                    ? "text-blue-400 hover:underline"
                    : "text-purple-600 hover:underline"
                  }`}
              >
                Saad Hasan
              </Link>{" "}
              <span className="mx-1">•</span> 100 Likes
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PopularBlog;
