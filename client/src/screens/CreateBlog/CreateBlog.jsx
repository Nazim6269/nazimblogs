import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Dropzone from "../../Components/Dropzone/Dropzone";
import { createBlog } from "../../helper/blogApi";
import { useTheme } from "../../hooks/useTheme";
import toast from "react-hot-toast";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import { stripHTML } from "../../utils/stripHTML";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  }), []);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!title || !stripHTML(content).trim()) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConfirm(true);
  };

  const handleSave = async (status) => {
    if (!validateForm()) return;

    setLoading(true);
    const toastMsg = status === "draft" ? "Saving draft..." : "Publishing blog...";
    const saveToast = toast.loading(toastMsg);

    try {
      await createBlog({
        title,
        body: content,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        imageSrc: imageSrc || "",
        category,
        status,
        scheduledAt: scheduledAt || undefined,
      });

      const successMsg = status === "draft" ? "Draft saved!" : "Blog published!";
      toast.success(successMsg, { id: saveToast });
      setShowConfirm(false);
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Failed to save blog", { id: saveToast });
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
          className={`w-full text-lg sm:text-xl md:text-2xl font-semibold px-4 py-2.5 rounded-md border focus:outline-none transition-colors duration-300 ${isDark
            ? "bg-slate-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-500"
            : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
            }`}
        />

        {/* Category Selection */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full text-sm px-4 py-2 rounded-md border focus:outline-none transition-colors duration-300 ${isDark
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
          className={`w-full text-sm px-4 py-2 rounded-md border focus:outline-none transition-colors duration-300 ${isDark
            ? "bg-slate-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-500"
            : "bg-gray-200/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600"
            }`}
        />

        {/* Rich Text Editor */}
        <div className={`quill-wrapper ${isDark ? "quill-dark" : "quill-light"}`}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={quillModules}
            placeholder="Write your blog content..."
          />
        </div>

        {/* Schedule Section */}
        <div className="flex items-center gap-3">
          <label className={`text-sm font-medium shrink-0 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Schedule for:
          </label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className={`flex-1 text-sm px-3 py-2 rounded-md border focus:outline-none transition-colors duration-300 ${
              isDark
                ? "bg-slate-800 border-gray-700 text-gray-100 focus:border-purple-500"
                : "bg-gray-200/40 border-gray-300 text-gray-900 focus:border-indigo-600"
            }`}
          />
          {scheduledAt && (
            <button type="button" onClick={() => setScheduledAt("")} className="text-xs text-red-400 hover:underline shrink-0">
              Clear
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={loading}
            className={`flex-1 py-2.5 px-2 rounded-md text-sm font-semibold text-center transition-all duration-300 cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""} ${isDark
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {loading ? "Saving..." : "Save as Draft"}
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-2.5 px-2 rounded-md text-sm font-semibold text-white text-center transition-all duration-300 cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""} ${isDark
              ? "bg-brand-primary text-white hover:bg-purple-700 hover:shadow-md hover:shadow-purple-500/50"
              : "bg-alter-brand-primary text-white hover:bg-alter-brand-secondary hover:shadow-md hover:shadow-violet-500/50"
              }`}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleSave("published")}
        title="Publish this blog?"
        message="Your blog will be published and visible to all users."
        confirmText="Publish"
        confirmColor="brand"
        loading={loading}
      />
    </div>
  );
};

export default CreateBlog;
