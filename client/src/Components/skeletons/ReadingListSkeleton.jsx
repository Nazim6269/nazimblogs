import { useTheme } from "../../hooks/useTheme";

const ReadingListSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const pulse = isDark ? "bg-gray-800" : "bg-gray-200";

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className={`w-48 h-8 rounded-md animate-pulse mb-8 ${pulse}`} />
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`rounded-md animate-pulse p-6 ${pulse}`}>
            <div className="flex gap-4">
              <div className={`w-24 h-24 rounded-md flex-shrink-0 ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
              <div className="flex-1 space-y-3">
                <div className={`w-3/4 h-5 rounded ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
                <div className={`w-1/2 h-4 rounded ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
                <div className={`w-1/4 h-3 rounded ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingListSkeleton;
