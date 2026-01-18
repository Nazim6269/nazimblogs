import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import Comments from "../../Components/Comments/Comments";
import User from "../../Components/User/User";
import { useTheme } from "../../hooks/useTheme";
import NoData from "../../Components/NoData/NoData";

const SingleBlog = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
          throw new Error("Blog not found");
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen py-20 px-4">
        <NoData
          message="Article Not Found"
          subMessage="The article you are looking for might have been deleted or the link is incorrect."
        />
        <div className="mt-8 text-center">
          <Link to="/" className="text-purple-500 font-bold flex items-center justify-center gap-2 hover:underline">
            <FontAwesomeIcon icon={faArrowLeft} />
            Return to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isDark ? " text-gray-200" : " text-gray-900"
        }`}
    >
      {/* Blog Container */}
      <div className={` mx-auto rounded-2xl p-8 relative overflow-hidden`}>
        {/* Back Link */}
        <Link to="/" className={`inline-flex items-center gap-2 mb-8 font-semibold transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to feed
        </Link>

        {/* Title */}
        <h1
          className={`relative text-4xl md:text-5xl font-extrabold leading-tight mb-6 ${isDark ? "text-white" : "text-gray-900"
            }`}
        >
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="relative flex flex-wrap items-center gap-4 text-sm opacity-90 mb-8">
          <User />

          {/* Date */}
          <span
            className={`px-3 py-1 rounded-full ${isDark
              ? "bg-gray-800 text-gray-200 border border-gray-700"
              : "bg-indigo-100 text-indigo-700"
              }`}
          >
            18 Jan, 2026
          </span>

          {/* Likes */}
          <span
            className={`px-3 py-1 rounded-full flex items-center gap-1 ${isDark
              ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/40"
              : "bg-emerald-100 text-emerald-700"
              }`}
          >
            <FontAwesomeIcon icon={faHeart} className="text-red-500" /> 124 Likes
          </span>
        </div>

        {/* Cover Image */}
        <div className="relative mt-4 overflow-hidden rounded-3xl group shadow-2xl">
          <img
            src={`https://picsum.photos/seed/${id}/1200/600`}
            alt="Blog Cover"
            className="w-full h-64 lg:h-[450px] object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mt-8">
          {["Development", "Tech", "Programming"].map((tag) => (
            <span
              key={tag}
              className={`px-4 py-1.5 rounded-full text-sm font-bold cursor-pointer transition-all ${isDark
                ? "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Blog Content */}
        <div className={`mt-10 space-y-6 leading-relaxed text-xl ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-purple-500">
            {blog.body}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h2
            className={`text-3xl font-bold border-l-4 pl-4 my-8 ${isDark
              ? "border-purple-500 text-white"
              : "border-indigo-500 text-gray-900"
              }`}
          >
            Key Insights and Analysis
          </h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        {/* Comments Section */}
        <div className="mt-16 pt-10 border-t border-gray-100 dark:border-white/5">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            Comments <span className="text-sm font-normal opacity-50 bg-gray-500/10 px-3 py-1 rounded-full">12</span>
          </h2>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
