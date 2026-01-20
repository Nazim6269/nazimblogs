import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const Favorite = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Link to={`/blog-details?id=2`}>
      <div
        className={`py-4 px-4 my-3 rounded-lg border transition-all duration-300
        transform hover:scale-[1.02] shadow-lg
        ${isDark
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "bg-white border-gray-300 text-gray-900"
          }
        `}
      >
        <ul className="space-y-4">
          <li>
            {/* Title */}
            <h3
              className={`text-lg font-semibold transition-all cursor-pointer
                bg-clip-text text-transparent
                ${isDark
                  ? "bg-gray-200 hover:bg-purple-500 hover:text-white"
                  : "bg-gray-800 hover:bg-purple-500 hover:text-white"
                }`}
            >
              How to Auto Deploy a Next.js App on Ubuntu from GitHub
            </h3>

            {/* Tags */}
            <p
              className={`mt-1 text-sm transition-colors ${isDark ? "text-gray-400" : "text-gray-600"
                }`}
            >
              <span className="mr-2">#tailwindcss</span>
              <span className="mr-2">#server</span>
              <span>#ubuntu</span>
            </p>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default Favorite;
