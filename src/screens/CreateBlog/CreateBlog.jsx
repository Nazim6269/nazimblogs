import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import Dropzone from "../../Components/Dropzone/Dropzone";

const CreateBlog = () => {
  const [theme] = useTheme();

  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-gray-800" : " text-white"
      } min-h-screen flex items-center justify-center p-6`}
    >
      <form
        action="#"
        method="POST"
        className={`px-5 py-4 w-full max-w-4xl rounded-lg shadow-lg space-y-6 ${
          theme === "dark" ? "bg-gray-800" : ""
        }`}
      >
        {/* Image Upload Section */}
        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
          <div className="flex flex-col sm:flex sm:flex-row items-center gap-4 transition-all cursor-pointer">
            <Dropzone />
          </div>
        </div>

        {/* Blog Title Input */}
        <div className="mb-6">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your blog title"
            className={`font-semibold py-2 bg-transparent border-transparent outline-none focus:outline-transparent w-full text-xl sm:text-2xl md:text-4xl ${
              theme === "dark" ? "" : ""
            }`}
          />
        </div>

        {/* Blog Tags Input */}
        <div className="mb-6">
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Your Comma Separated Tags"
            className={`bg-transparent w-full border-transparent outline-none focus:outline-transparent text-xs sm:text-lg ${
              theme === "dark" ? "text-slate-500" : "text-black"
            } `}
          />
        </div>

        {/* Blog Content Input */}
        <div className="mb-6">
          <textarea
            id="content"
            name="content"
            placeholder="Write your blog content"
            rows="8"
            className={`bg-transparent w-full border-transparent outline-none focus:outline-transparent text-xs sm:text-lg ${
              theme === "dark" ? "text-slate-500" : "text-black"
            } `}
          ></textarea>
        </div>

        {/* Submit Button */}
        <Link
          to="#"
          className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200 flex justify-center"
        >
          Create Blog
        </Link>
      </form>
    </div>
  );
};

export default CreateBlog;
