import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";

const User = ({ comment }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`flex items-start space-x-3`}>
      {/* Avatar */}
      <div className="avatar">
        <span
          className={`
            p-2 rounded-full font-bold
            ${isDark
              ? "bg-slate-800 text-gray-100"
              : "bg-gray-200 text-black"
            }
          `}
        >
          U
        </span>
      </div>

      {/* Comment Text */}
      <div>
        <p
          className={`
            text-sm
            ${isDark ? "text-gray-100" : "text-gray-800"}
          `}
        >
          {comment}
        </p>
      </div>
    </div>
  );
};

User.propTypes = {
  comment: PropTypes.string,
};

export default User;
