import { useTheme } from "../../hooks/useTheme";

const CreateBlogSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen flex items-start justify-center py-4">
      <div className={`w-full max-w-4xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 rounded-md border shadow-md animate-pulse ${isDark ? "border-gray-700 bg-slate-800" : "border-gray-300 bg-white"}`}>
        {/* Image Dropzone */}
        <div className={`h-40 w-full rounded-md mb-6 border-2 border-dashed ${isDark ? "border-gray-600" : "border-gray-300"} ${bg}`} />

        {/* Title Input */}
        <div className={`h-14 w-full rounded-md mb-4 ${bg}`} />

        {/* Category Select */}
        <div className={`h-12 w-full rounded-md mb-4 ${bg}`} />

        {/* Tags Input */}
        <div className={`h-12 w-full rounded-md mb-4 ${bg}`} />

        {/* Content Textarea */}
        <div className={`h-56 w-full rounded-md mb-6 ${bg}`} />

        {/* Submit Button */}
        <div className={`h-12 w-full rounded-md ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
      </div>
    </div>
  );
};

export default CreateBlogSkeleton;
