import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const BlogCard = ({ data }) => {
  const { title, imageSrc, body, author, date, likes } = data;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`
        group flex flex-col lg:flex-row gap-5 p-6 rounded-2xl border shadow-xl transition-all duration-300
        hover:scale-[1.02] hover:shadow-lg
        ${
          isDark
            ? "bg-linear-to-r from-[#0b1025] via-[#0d0f2c] to-[#050816] border-gray-700 text-gray-200 hover:shadow-blue-500/20"
            : "bg-linear-to-r from-sky-100 via-blue-100 to-indigo-100 border-gray-300 text-gray-900 hover:shadow-purple-300/30"
        }
      `}
    >
      {/* Image */}
      <div className="w-full lg:w-60 overflow-hidden rounded-xl">
        <img
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
          src={imageSrc || "/roadmap.webp"}
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        {/* Title */}
        <h3
          className={`text-2xl font-bold mb-2 ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`leading-relaxed text-sm mb-4 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {body?.slice(0, 120) ||
            "Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum."}
          ...
        </p>

        {/* Meta Info */}
        <div className="flex justify-between items-center mt-2">
          {/* Author + Avatar */}
          <div className="flex items-center gap-3">
            <div
              className={`
                w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold
                ${
                  isDark
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                }
              `}
            >
              {author ? author[0] : "N"}
            </div>

            <div>
              <Link
                to="/profile"
                className={`font-medium ${
                  isDark ? "text-blue-300" : "text-purple-600"
                } hover:underline`}
              >
                {author || "Nazim Uddin"}
              </Link>
              <div
                className={`text-xs ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {date || "June 28, 2018"}
              </div>
            </div>
          </div>

          {/* Likes */}
          <div
            className={`text-sm px-3 py-1 rounded-full ${
              isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            ❤️ {likes || "100"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

BlogCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    imageSrc: PropTypes.string,
    likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};
