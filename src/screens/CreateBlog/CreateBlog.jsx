import { Link } from "react-router-dom";
import Dropzone from "../../Components/Dropzone/Dropzone";
import { useTheme } from "../../hooks/useTheme";

const CreateBlog = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-start justify-center transition-colors duration-500 `}
    >
      <form
        className={`w-full max-w-4xl px-8 py-6 rounded-2xl border  shadow-2xl space-y-6 transition-all duration-500 ${
          isDark ? "border-gray-700" : "border-gray-400"
        } `}
      >
        {/* Image Upload Section */}
        <div
          className={`grid place-items-center h-40 rounded-lg transition-all duration-300 ${
            isDark
              ? "bg-linear-to-r from-[#0b1025] via-[#0d0f2c] to-[#050816] border border-gray-600"
              : "bg-gray-200/40 border border-gray-300"
          }`}
        >
          <Dropzone />
        </div>

        {/* Blog Title Input */}
        <input
          type="text"
          placeholder="Enter your blog title"
          className={`w-full text-2xl sm:text-3xl md:text-4xl font-semibold px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
            isDark
              ? "bg-linear-to-r from-[#0b1025] via-[#0d0f2c] to-[#050816] border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-600"
              : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
          }`}
        />

        {/* Tags Input */}
        <input
          type="text"
          placeholder="Your comma separated tags"
          className={`w-full text-sm sm:text-lg px-4 py-2 rounded-lg border focus:outline-none transition-colors duration-300 ${
            isDark
              ? "bg-linear-to-r from-[#0b1025] via-[#0d0f2c] to-[#050816] border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-600"
              : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
          }`}
        />

        {/* Blog Content */}
        <textarea
          rows={8}
          placeholder="Write your blog content"
          className={`w-full text-sm sm:text-lg px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
            isDark
              ? "bg-linear-to-r from-[#0b1025] via-[#0d0f2c] to-[#050816] border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-600"
              : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
          }`}
        ></textarea>

        {/* Submit Button */}
        <Link
          to="#"
          className={`w-full py-3 md:py-2 px-2 rounded-lg font-bold text-white text-center transition-all duration-300 ${
            isDark
              ? "bg-linear-to-r from-blue-500 to-purple-500  text-white hover:shadow-[0_0_20px_rgba(130,90,250,0.7)]"
              : "bg-linear-to-r from-purple-400 via-blue-500 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(130,90,250,0.7)]"
          }`}
        >
          Create Blog
        </Link>
      </form>
    </div>
  );
};

export default CreateBlog;
