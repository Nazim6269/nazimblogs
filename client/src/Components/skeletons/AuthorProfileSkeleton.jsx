import { useTheme } from "../../hooks/useTheme";

const AuthorProfileSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      {/* Author Header Card */}
      <div className={`rounded-md border p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-pulse ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="flex flex-col items-center gap-4">
          <div className={`w-28 h-28 rounded-full ${bg}`} />
          <div className={`w-40 sm:w-48 h-7 sm:h-8 rounded ${bg}`} />
          <div className={`w-56 sm:w-72 h-4 rounded ${bg}`} />
          {/* Bio lines */}
          <div className="w-full max-w-md space-y-2">
            <div className={`w-full h-3 rounded ${bg}`} />
            <div className={`w-3/4 h-3 rounded mx-auto ${bg}`} />
          </div>
          {/* Location & join date */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className={`w-24 h-4 rounded ${bg}`} />
            <div className={`w-28 h-4 rounded ${bg}`} />
          </div>
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-2">
            <div className="text-center space-y-1">
              <div className={`w-8 h-6 rounded mx-auto ${bg}`} />
              <div className={`w-12 h-3 rounded ${bg}`} />
            </div>
            <div className="text-center space-y-1">
              <div className={`w-8 h-6 rounded mx-auto ${bg}`} />
              <div className={`w-16 h-3 rounded ${bg}`} />
            </div>
            <div className="text-center space-y-1">
              <div className={`w-8 h-6 rounded mx-auto ${bg}`} />
              <div className={`w-14 h-3 rounded ${bg}`} />
            </div>
          </div>
          {/* Follow button */}
          <div className={`w-28 h-10 rounded-md mt-2 ${bg}`} />
        </div>
      </div>

      {/* Blog list header */}
      <div className={`w-44 sm:w-52 h-7 rounded mb-4 sm:mb-6 animate-pulse ${bg}`} />

      {/* Blog cards */}
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 p-4 rounded-md border animate-pulse ${isDark ? "bg-gray-900/30 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`w-full md:w-56 lg:w-72 h-40 sm:h-48 md:h-auto rounded-md shrink-0 ${bg}`} />
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className={`h-3 w-24 rounded ${bg}`} />
                  <div className={`h-3 w-20 rounded ${bg}`} />
                </div>
                <div className={`h-6 sm:h-7 w-3/4 rounded ${bg}`} />
                <div className="space-y-2">
                  <div className={`h-4 w-full rounded ${bg}`} />
                  <div className={`h-4 w-5/6 rounded ${bg}`} />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-6 border-t border-dashed border-gray-500/20">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-md ${bg}`} />
                  <div className="space-y-1">
                    <div className={`h-3 w-24 rounded ${bg}`} />
                    <div className={`h-2 w-16 rounded ${bg}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`h-7 w-14 rounded-md ${bg}`} />
                  <div className={`h-7 w-14 rounded-md ${bg}`} />
                  <div className={`h-7 w-14 rounded-md ${bg}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorProfileSkeleton;
