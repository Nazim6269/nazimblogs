import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";

const User = ({ comment }) => {
  const [theme] = useTheme();

  return (
    <div
      className={`flex items-start space-x-3 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <div className="avatar">
        <span
          className={`${
            theme === "dark"
              ? "text-white bg-gray-600"
              : "text-black bg-gray-200"
          } p-2 rounded-full`}
        >
          U
        </span>{" "}
        {/* Example avatar */}
      </div>
      <div>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {comment}
        </p>
        {/* Display the comment */}
      </div>
    </div>
  );
};

User.propTypes = {
  comment: PropTypes.string.isRequired,
};

export default User;
