import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "../../Components/Dropzone/Dropzone";
import { addBlog } from "../../helper/localStorage";
import { useTheme } from "../../hooks/useTheme";

const CreateBlog = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in all required fields");
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      body: content,
      tags: tags.split(",").map((tag) => tag.trim()),
      imageSrc,
      author: "Nazim Uddin",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      likes: 0,
    };

    addBlog(newBlog);
    navigate("/profile");
  };

  return (
    <div
      className={`min-h-screen flex items-start justify-center transition-colors duration-500 `}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-4xl px-8 py-6 rounded-2xl border  shadow-2xl space-y-6 transition-all duration-500 ${isDark ? "border-gray-700" : "border-gray-400"
          } `}
      >
        {/* Image Upload Section */}
        <div
          className={`grid place-items-center h-40 rounded-lg transition-all duration-300 overflow-hidden relative ${isDark
            ? "bg-slate-800 border border-gray-700"
            : "bg-gray-200/40 border border-gray-300"
            }`}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Dropzone onFileChange={handleFileChange} />
          )}
        </div>

        {/* Blog Title Input */}
        <input
          type="text"
          placeholder="Enter your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full text-2xl sm:text-3xl md:text-4xl font-semibold px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${isDark
            ? "bg-slate-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-500"
            : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
            }`}
        />

        {/* Tags Input */}
        <input
          type="text"
          placeholder="Your comma separated tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={`w-full text-sm sm:text-lg px-4 py-2 rounded-lg border focus:outline-none transition-colors duration-300 ${isDark
            ? "bg-slate-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-500"
            : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
            }`}
        />

        {/* Blog Content */}
        <textarea
          rows={8}
          placeholder="Write your blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full text-sm sm:text-lg px-4 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${isDark
            ? "bg-slate-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-500"
            : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
            }`}
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 md:py-2 px-2 rounded-lg font-bold text-white text-center transition-all duration-300 cursor-pointer ${isDark
            ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50"
            : "bg-violet-600 text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/50"
            }`}
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
