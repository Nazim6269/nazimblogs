import { useTheme } from "../../hooks/useTheme";

const CreateBlogSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen flex items-start justify-center py-4">
      <div className={`w-full max-w-4xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 rounded-md border shadow-md animate-pulse ${isDark ? "border-gray-700 bg-slate-800" : "border-gray-300 bg-white"}`}>
        {/* Image Dropzone */}
        <div className={`h-40 w-full rounded-md mb-5 border-2 border-dashed ${isDark ? "border-gray-600" : "border-gray-300"} ${bg}`} />

        {/* Title Input */}
        <div className={`h-11 w-full rounded-md mb-4 ${bg}`} />

        {/* Category Select */}
        <div className={`h-10 w-full rounded-md mb-4 ${bg}`} />

        {/* Tags Input */}
        <div className={`h-10 w-full rounded-md mb-4 ${bg}`} />

        {/* Content Textarea */}
        <div className={`h-48 w-full rounded-md mb-5 ${bg}`} />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <div className={`h-10 flex-1 rounded-md ${bg}`} />
          <div className={`h-10 flex-1 rounded-md ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
        </div>
      </div>
    </div>
  );
};

export default CreateBlogSkeleton;
