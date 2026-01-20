import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";

const User = ({ author, date }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`flex items-center space-x-3`}>
      {/* Avatar */}
      <div className="avatar">
        <div
          className={`
            w-10 h-10 rounded-full font-bold flex items-center justify-center
            ${isDark
              ? "bg-slate-800 text-gray-100"
              : "bg-gray-200 text-black border border-gray-300"
            }
          `}
        >
          {author?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>

      {/* Info Text */}
      <div>
        <h4
          className={`
            text-sm font-bold leading-tight
            ${isDark ? "text-gray-100" : "text-gray-900"}
          `}
        >
          {author || "Unknown Author"}
        </h4>
        <p className={`text-[11px] font-semibold opacity-50 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {date || "Published just now"}
        </p>
      </div>
    </div>
  );
};

User.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
};

export default User;
