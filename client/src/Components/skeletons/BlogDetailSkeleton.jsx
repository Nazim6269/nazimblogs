import { useTheme } from "../../hooks/useTheme";

const BlogDetailSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="animate-pulse space-y-8">
        {/* Back button */}
        <div className={`h-5 w-28 rounded ${bg}`} />

        {/* Title */}
        <div className="space-y-3">
          <div className={`h-8 sm:h-10 md:h-12 w-full rounded ${bg}`} />
          <div className={`h-8 sm:h-10 md:h-12 w-3/4 rounded ${bg}`} />
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${bg}`} />
            <div className="space-y-1">
              <div className={`h-3 w-20 sm:w-24 rounded ${bg}`} />
              <div className={`h-2 w-16 sm:w-20 rounded ${bg}`} />
            </div>
          </div>
          <div className={`h-8 sm:h-10 w-24 sm:w-28 rounded-full ${bg}`} />
          <div className={`h-8 sm:h-10 w-24 sm:w-28 rounded-full ${bg}`} />
          <div className={`h-8 sm:h-10 w-20 sm:w-24 rounded-full ${bg}`} />
        </div>

        {/* Cover Image */}
        <div className={`h-48 sm:h-64 md:h-80 lg:h-96 w-full rounded-md ${bg}`} />

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-7 w-16 sm:w-20 rounded-full ${bg}`} />
          ))}
        </div>

        {/* Content - more paragraphs to match actual blog body */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((p) => (
            <div key={p} className="space-y-2">
              <div className={`h-4 w-full rounded ${bg}`} />
              <div className={`h-4 w-full rounded ${bg}`} />
              <div className={`h-4 w-5/6 rounded ${bg}`} />
              <div className={`h-4 w-4/6 rounded ${bg}`} />
            </div>
          ))}
        </div>

        {/* Related articles */}
        <div className="pt-8 border-t border-gray-500/20 space-y-6">
          <div className={`h-8 w-48 rounded ${bg}`} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`rounded-md overflow-hidden border ${isDark ? "border-white/5" : "border-black/5"}`}>
                <div className={`h-32 sm:h-40 ${bg}`} />
                <div className="p-3 space-y-2">
                  <div className={`h-4 w-3/4 rounded ${bg}`} />
                  <div className={`h-3 w-full rounded ${bg}`} />
                  <div className={`h-3 w-1/2 rounded ${bg}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments section - more comments to match actual */}
        <div className="pt-8 border-t border-gray-500/20 space-y-4">
          <div className={`h-8 w-36 sm:w-40 rounded ${bg}`} />
          <div className={`h-20 sm:h-24 w-full rounded-lg ${bg}`} />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3">
              <div className={`w-9 h-9 rounded-full shrink-0 ${bg}`} />
              <div className="flex-1 space-y-2">
                <div className={`h-3 w-24 sm:w-32 rounded ${bg}`} />
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
