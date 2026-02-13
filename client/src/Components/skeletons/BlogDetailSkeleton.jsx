import { useTheme } from "../../hooks/useTheme";

const BlogDetailSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen py-4 sm:py-6 px-4 max-w-3xl mx-auto">
      <div className="animate-pulse space-y-5">
        {/* Back button */}
        <div className={`h-4 w-20 rounded ${bg}`} />

        {/* Title */}
        <div className="space-y-2">
          <div className={`h-6 sm:h-8 md:h-9 w-full rounded ${bg}`} />
          <div className={`h-6 sm:h-8 md:h-9 w-3/4 rounded ${bg}`} />
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${bg}`} />
            <div className="space-y-1">
              <div className={`h-3 w-20 rounded ${bg}`} />
              <div className={`h-2 w-14 rounded ${bg}`} />
            </div>
          </div>
          <div className={`h-3 w-16 rounded ${bg}`} />
          <div className={`h-3 w-12 rounded ${bg}`} />
          <div className={`h-3 w-10 rounded ${bg}`} />
        </div>

        {/* Cover Image */}
        <div className={`h-52 sm:h-64 md:h-80 w-full rounded-md ${bg}`} />

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-6 w-14 rounded-md ${bg}`} />
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((p) => (
            <div key={p} className="space-y-2">
              <div className={`h-3.5 w-full rounded ${bg}`} />
              <div className={`h-3.5 w-full rounded ${bg}`} />
              <div className={`h-3.5 w-5/6 rounded ${bg}`} />
              <div className={`h-3.5 w-3/5 rounded ${bg}`} />
            </div>
          ))}
        </div>

        {/* Related articles */}
        <div className="pt-6 border-t border-gray-500/20 space-y-4">
          <div className={`h-5 w-36 rounded ${bg}`} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`rounded-md overflow-hidden border ${isDark ? "border-white/5" : "border-black/5"}`}>
                <div className={`h-32 ${bg}`} />
                <div className="p-3 space-y-1.5">
                  <div className={`h-3.5 w-3/4 rounded ${bg}`} />
                  <div className={`h-3 w-full rounded ${bg}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments section */}
        <div className="pt-6 border-t border-gray-500/20 space-y-3">
          <div className={`h-5 w-28 rounded ${bg}`} />
          <div className={`h-16 w-full rounded-lg ${bg}`} />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-2.5">
              <div className={`w-8 h-8 rounded-full shrink-0 ${bg}`} />
              <div className="flex-1 space-y-1.5">
                <div className={`h-3 w-20 rounded ${bg}`} />
                <div className={`h-3.5 w-full rounded ${bg}`} />
                <div className={`h-3.5 w-2/3 rounded ${bg}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSkeleton;
