import { useTheme } from "../../hooks/useTheme";

const ReadingListSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";
  const cardBg = isDark ? "bg-gray-800/50" : "bg-white";

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 animate-pulse">
        <div className={`w-6 h-6 rounded ${bg}`} />
        <div className={`w-36 sm:w-48 h-7 sm:h-8 rounded ${bg}`} />
        <div className={`w-8 h-6 rounded-md ${bg}`} />
      </div>

      {/* Bookmark items */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex gap-3 sm:gap-4 p-4 rounded-md border animate-pulse ${isDark ? "border-gray-700/50" : "border-gray-200"} ${cardBg}`}>
            <div className={`w-20 h-20 sm:w-32 sm:h-24 rounded-md flex-shrink-0 ${bg}`} />
            <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
              <div className={`w-3/4 h-4 sm:h-5 rounded ${bg}`} />
              <div className={`w-full h-3 sm:h-4 rounded ${bg}`} />
              <div className={`w-1/3 h-3 rounded ${bg}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingListSkeleton;
