import { useTheme } from "../../hooks/useTheme";

const BlogDetailSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <div className="animate-pulse space-y-8">
        {/* Back button */}
        <div className={`h-5 w-28 rounded ${bg}`} />

        {/* Title */}
        <div className="space-y-3">
          <div className={`h-10 sm:h-12 w-full rounded ${bg}`} />
          <div className={`h-10 sm:h-12 w-3/4 rounded ${bg}`} />
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${bg}`} />
            <div className="space-y-1">
              <div className={`h-3 w-24 rounded ${bg}`} />
              <div className={`h-2 w-20 rounded ${bg}`} />
            </div>
          </div>
          <div className={`h-10 w-28 rounded-full ${bg}`} />
          <div className={`h-10 w-28 rounded-full ${bg}`} />
          <div className={`h-10 w-24 rounded-full ${bg}`} />
        </div>

        {/* Cover Image */}
        <div className={`h-64 sm:h-80 md:h-96 w-full rounded-md ${bg}`} />

        {/* Tags */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-7 w-20 rounded-full ${bg}`} />
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {[1, 2, 3].map((p) => (
            <div key={p} className="space-y-2">
              <div className={`h-4 w-full rounded ${bg}`} />
              <div className={`h-4 w-full rounded ${bg}`} />
              <div className={`h-4 w-5/6 rounded ${bg}`} />
              <div className={`h-4 w-4/6 rounded ${bg}`} />
            </div>
          ))}
        </div>

        {/* Comments section */}
        <div className="pt-8 border-t border-gray-500/20 space-y-4">
          <div className={`h-8 w-40 rounded ${bg}`} />
          <div className={`h-24 w-full rounded-lg ${bg}`} />
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <div className={`w-9 h-9 rounded-full shrink-0 ${bg}`} />
              <div className="flex-1 space-y-2">
                <div className={`h-3 w-32 rounded ${bg}`} />
                <div className={`h-4 w-full rounded ${bg}`} />
                <div className={`h-4 w-2/3 rounded ${bg}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSkeleton;
