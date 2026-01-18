import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { getBlogs } from "../../helper/localStorage";
import { useTheme } from "../../hooks/useTheme";

const Profile = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = getBlogs();
    setBlogs(storedBlogs);
  }, []);

  return (
    <div
      className={`min-h-screen px-6 py-10 flex flex-col items-center gap-8 transition-colors duration-500 `}
    >
      {/* Avatar */}
      <div className="relative group">
        <div
          className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold transition-all duration-300 group-hover:scale-105 ${isDark ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"
            }`}
        >
          N
        </div>
        <span
          className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isDark
            ? "bg-blue-700 hover:bg-blue-600"
            : "bg-indigo-500 hover:bg-indigo-400"
            }`}
        >
          <FontAwesomeIcon icon={faPen} className="text-white text-sm" />
        </span>
      </div>

      {/* Name and Email */}
      <div className="text-center space-y-1">
        <h1
          className={`text-3xl font-bold ${isDark ? "text-gray-600" : "text-gray-900"
            }`}
        >
          Nazim Uddin
        </h1>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
          nazimdev10022001@gmail.com
        </p>
      </div>

      {/* Bio Section */}
      <div
        className={`relative w-full max-w-3xl rounded-xl p-6 shadow-md transition-colors duration-500 ${isDark
          ? "bg-slate-800 text-gray-200"
          : "bg-slate-100 border-gray-300 text-gray-900 shadow-lg"
          }`}
      >
        <p className="leading-relaxed text-center">
          This is Nazim, who wants to be a full stack engineer though it's not
          easy at all. But he is always trying his best. Now he is learning
          Front end development through various online resources. Recently he is
          studying at the University of Chittagong.
        </p>
        <span
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isDark
            ? "bg-blue-700 hover:bg-blue-600"
            : "bg-indigo-500 hover:bg-indigo-400"
            }`}
        >
          <FontAwesomeIcon icon={faPen} className="text-white text-sm" />
        </span>
      </div>

      {/* Blogs Section */}
      <div
        className={`w-full max-w-6xl border rounded-xl ${isDark ? "border-gray-600" : "border-gray-300"
          }`}
      >
        <h2
          className={`text-3xl font-semibold p-2 ${isDark ? "text-gray-600" : "text-gray-900"
            }`}
        >
          Your Blogs
        </h2>
        <div className="grid p-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link key={blog.id} to={`/blog-details?id=${blog.id}`}>
                <BlogCard data={blog} />
              </Link>
            ))
          ) : (
            <p className={`p-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              No blogs written yet...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
