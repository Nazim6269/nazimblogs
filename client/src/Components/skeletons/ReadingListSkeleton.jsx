import { useTheme } from "../../hooks/useTheme";

const ReadingListSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 animate-pulse">
        <div className={`w-4 h-4 rounded ${bg}`} />
        <div className={`w-28 h-6 rounded ${bg}`} />
        <div className={`w-6 h-5 rounded-md ${bg}`} />
      </div>

      {/* Bookmark items */}
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex gap-3 p-3 rounded-lg border animate-pulse ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
            <div className={`w-20 h-16 sm:w-24 sm:h-18 rounded-md flex-shrink-0 ${bg}`} />
            <div className="flex-1 min-w-0">
              <div className={`w-3/4 h-3.5 rounded mb-1.5 ${bg}`} />
              <div className={`w-full h-3 rounded mb-1.5 ${bg}`} />
              <div className="flex items-center gap-2">
                <div className={`w-16 h-2.5 rounded ${bg}`} />
                <div className={`w-10 h-2.5 rounded ${bg}`} />
                <div className={`w-10 h-2.5 rounded ${bg}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingListSkeleton;
