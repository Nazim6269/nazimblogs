import { useTheme } from "../../hooks/useTheme";

const NotificationsSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const pulse = isDark ? "bg-gray-800" : "bg-gray-200";

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className={`w-40 h-8 rounded-md animate-pulse mb-8 ${pulse}`} />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`flex items-center gap-3 p-4 rounded-md animate-pulse ${pulse}`}>
            <div className={`w-10 h-10 rounded-full flex-shrink-0 ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
            <div className="flex-1 space-y-2">
              <div className={`w-3/4 h-4 rounded ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
              <div className={`w-1/4 h-3 rounded ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSkeleton;
