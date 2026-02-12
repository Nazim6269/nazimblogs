import { useTheme } from "../../hooks/useTheme";

const NotificationsSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 animate-pulse">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`w-5 sm:w-6 h-5 sm:h-6 rounded ${bg}`} />
          <div className={`w-40 sm:w-52 h-8 sm:h-9 rounded ${bg}`} />
        </div>
        <div className={`w-28 h-9 rounded-md ${bg}`} />
      </div>

      {/* Notification items */}
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className={`flex items-start gap-3 p-4 rounded-md border animate-pulse ${isDark ? "bg-purple-500/5 border-purple-500/20" : "bg-purple-50 border-purple-200/50"}`}>
            <div className={`w-10 h-10 rounded-full flex-shrink-0 ${bg}`} />
            <div className="flex-1 min-w-0 space-y-2">
              <div className={`w-3/4 h-4 rounded ${bg}`} />
              <div className={`w-1/4 h-3 rounded ${bg}`} />
            </div>
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${bg}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSkeleton;
