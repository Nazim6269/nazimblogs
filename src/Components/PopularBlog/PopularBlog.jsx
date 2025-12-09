import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const PopularBlog = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Link to={`/blog-details?id=2`}>
      <div
        className={`px-4 py-4 my-3 rounded-lg border transition-all duration-300
        transform hover:scale-[1.02] hover:shadow-lg
        ${
          isDark
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "bg-white border-gray-200 text-gray-900"
        }
        hover:bg-linear-to-r `}
      >
        <div className="space-y-4">
          <ul className="space-y-4">
            <li>
              <h3
                className={`text-lg font-semibold transition-all cursor-pointer
                  bg-clip-text text-transparent
                  ${
                    isDark
                      ? "bg-linear-to-r from-gray-200 to-gray-400 hover:from-blue-300 hover:to-purple-400"
                      : "bg-linear-to-r from-gray-900 to-gray-700 hover:from-blue-500 hover:to-purple-500"
                  }`}
              >
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>

              <p
                className={`text-sm mt-1 transition-colors ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                by{" "}
                <Link
                  to="/profile"
                  className={`transition-colors ${
                    isDark
                      ? "text-blue-400 hover:underline"
                      : "text-purple-600 hover:underline"
                  }`}
                >
                  Saad Hasan
                </Link>{" "}
                <span className="mx-1">•</span> 100 Likes
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default PopularBlog;
