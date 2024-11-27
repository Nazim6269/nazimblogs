import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

const BlogCard = ({ title, description, author, date, imageSrc, likes }) => {
  const [theme] = useTheme();

  return (
    <div
      className={`flex flex-col justify-center items-center gap-3 px-3 py-7 border rounded transition duration-300 hover:ease-in lg:flex lg:flex-row mb-3 shadow-lg
      ${
        theme === "dark"
          ? "bg-gray-800 text-white border-gray-600 hover:border-blue-400"
          : "bg-white text-black border-gray-300 hover:border-blue-400"
      }`}
    >
      <img className="w-96" src={imageSrc || "/roadmap.webp"} alt={title} />

      <div className="mt-2">
        <h3 className="text-slate-300 text-xl lg:text-2xl">{title}</h3>
        <p className="mb-6 text-base mt-1">
          {description ||
            "Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem."}
        </p>

        {/* Meta Information */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-gray-600 text-white px-4 py-2 rounded-full">
              <span>{author ? author[0] : "N"}</span>
            </div>

            <div>
              <h5 className="text-gray-500 text-sm">
                <Link to="/profile" className="hover:underline">
                  {author || "Nazim Uddin"}
                </Link>
              </h5>
              <div className="flex items-center text-xs text-gray-500">
                <span>{date || "June 28, 2018"}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-gray-500">
            <span>{likes || "100 Likes"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

BlogCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.func,
  imageSrc: PropTypes.string,
  likes: PropTypes.string,
};
