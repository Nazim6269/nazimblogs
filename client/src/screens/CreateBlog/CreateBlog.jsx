import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "../../Components/Dropzone/Dropzone";
import { createBlog } from "../../helper/blogApi";
import { useTheme } from "../../hooks/useTheme";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Community");
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const createToast = toast.loading("Creating blog...");

    try {
      await createBlog({
        title,
        body: content,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        imageSrc: imageSrc || "",
        category,
      });

      toast.success("Blog created successfully!", { id: createToast });
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Failed to create blog", { id: createToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-start justify-center transition-colors duration-500 `}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-4xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 rounded-md border shadow-md space-y-6 transition-all duration-500 ${isDark ? "border-gray-700" : "border-gray-400"
          } `}
      >
        {/* Image Upload Section */}
        <div
          className={`grid place-items-center h-40 rounded-md transition-all duration-300 overflow-hidden relative ${isDark
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
          className={`w-full text-2xl sm:text-3xl md:text-4xl font-semibold px-4 py-3 rounded-md border focus:outline-none transition-colors duration-300 ${isDark
            ? "bg-slate-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-500"
            : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
            }`}
        />

        {/* Category Selection */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full text-sm sm:text-lg px-4 py-2 rounded-md border focus:outline-none transition-colors duration-300 ${isDark
            ? "bg-slate-800 border-gray-700 text-gray-100 focus:border-purple-500"
            : "bg-gray-200/40 border-gray-300 text-gray-900 focus:border-indigo-600"
            }`}
        >
          <option value="Community">Community</option>
          <option value="Tutorials">Tutorials</option>
          <option value="Design">Design</option>
        </select>

        {/* Tags Input */}
        <input
          type="text"
          placeholder="Your comma separated tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={`w-full text-sm sm:text-lg px-4 py-2 rounded-md border focus:outline-none transition-colors duration-300 ${isDark
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
          className={`w-full text-sm sm:text-lg px-4 py-3 rounded-md border focus:outline-none transition-colors duration-300 ${isDark
            ? "bg-slate-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-500"
            : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
            }`}
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-2 rounded-md font-bold text-white text-center transition-all duration-300 cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""} ${isDark
            ? "bg-brand-primary text-white hover:bg-purple-700 hover:shadow-md hover:shadow-purple-500/50"
            : "bg-alter-brand-primary text-white hover:bg-alter-brand-secondary hover:shadow-md hover:shadow-violet-500/50"
            }`}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
