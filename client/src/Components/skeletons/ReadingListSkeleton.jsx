import { useTheme } from "../../hooks/useTheme";

const ReadingListSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 animate-pulse">
        <div className={`w-6 h-6 rounded ${bg}`} />
        <div className={`w-40 sm:w-52 h-8 sm:h-9 rounded ${bg}`} />
        <div className={`w-8 h-6 rounded-md ${bg}`} />
      </div>

      {/* Bookmark items */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`group flex gap-4 p-4 rounded-md border animate-pulse ${isDark ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200"}`}>
            <div className={`w-24 h-24 sm:w-32 sm:h-24 rounded-md flex-shrink-0 ${bg}`} />
            <div className="flex-1 min-w-0">
              <div className={`w-3/4 h-5 rounded mb-2 ${bg}`} />
              <div className="space-y-1.5 mb-3">
                <div className={`w-full h-3 sm:h-4 rounded ${bg}`} />
                <div className={`w-4/5 h-3 sm:h-4 rounded ${bg}`} />
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className={`w-20 h-3 rounded ${bg}`} />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-12 h-3 rounded ${bg}`} />
                  <div className={`w-12 h-3 rounded ${bg}`} />
                  <div className={`w-12 h-3 rounded ${bg}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingListSkeleton;
