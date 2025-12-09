import Comments from "../../Components/Comments/Comments";
import User from "../../Components/User/User";
import { useTheme } from "../../hooks/useTheme";

const SingleBlog = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark ? " text-gray-200" : " text-gray-900"
      }`}
    >
      {/* Blog Container */}
      <div className={` mx-auto rounded-2xl p-8  relative overflow-hidden`}>
        {/* Title */}
        <h1
          className={`relative text-3xl md:text-3xl font-extrabold leading-tight mb-5 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Integer Maecenas Eget Viverra
        </h1>

        {/* Meta Info */}
        <div className="relative flex flex-wrap items-center gap-4 text-sm opacity-90 mb-6">
          <User />

          {/* Date */}
          <span
            className={`px-3 py-1 rounded-full ${
              isDark
                ? "bg-gray-800 text-gray-200 border border-gray-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            12 Dec, 2032
          </span>

          {/* Likes */}
          <span
            className={`px-3 py-1 rounded-full flex items-center gap-1 ${
              isDark
                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/40"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            ❤️ 100 Likes
          </span>
        </div>

        {/* Cover Image */}
        <div className="relative mt-4 overflow-hidden rounded-xl group shadow-lg">
          <img
            src="/roadmap.webp"
            alt="Blog Cover"
            className={`w-full h-40 lg:h-114 object-cover rounded-xl transition-all duration-500 group-hover:scale-105 ${
              isDark ? "shadow-[0_0_30px_#10b98150]" : "shadow-lg"
            }`}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mt-6">
          {["Javascript", "Node", "React", "Next"].map((tag) => (
            <span
              key={tag}
              className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer transition-all ${
                isDark
                  ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-[0_0_20px_rgba(130,90,250,0.7)]"
                  : "bg-linear-to-r from-purple-400 to-blue-500  text-white hover:shadow-[0_0_20px_rgba(130,90,250,0.7)]"
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Blog Content */}
        <div className="mt-8 space-y-6 leading-relaxed text-lg opacity-95">
          <p>
            Today I was mob programming with Square{"'"}s Mobile & Performance
            Reliability team and we toyed with an interesting idea...
          </p>

          <h2
            className={`text-3xl font-bold border-l-4 pl-4 ${
              isDark
                ? "border-emerald-400 text-white"
                : "border-indigo-500 text-gray-900"
            }`}
          >
            100% Code-Based Map
          </h2>

          <p>
            What if we generate code that returns the right team for a given
            screen...
          </p>
        </div>

        {/* Comments Section */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Comments <span className="opacity-60">(3)</span>
        </h2>

        <div className={`rounded-xl p-4 `}>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
