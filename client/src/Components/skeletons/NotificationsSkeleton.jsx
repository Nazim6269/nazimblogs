import { useTheme } from "../../hooks/useTheme";

const NotificationsSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";
  const cardBg = isDark ? "bg-gray-800" : "bg-gray-100";

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 animate-pulse">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`w-5 sm:w-6 h-5 sm:h-6 rounded ${bg}`} />
          <div className={`w-36 sm:w-48 h-7 sm:h-8 rounded ${bg}`} />
        </div>
        <div className={`w-24 h-8 rounded-md ${bg}`} />
      </div>

      {/* Notification items */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`flex items-start gap-3 p-3 sm:p-4 rounded-md animate-pulse ${cardBg}`}>
            <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-full flex-shrink-0 ${bg}`} />
            <div className="flex-1 min-w-0 space-y-2">
              <div className={`w-3/4 h-3 sm:h-4 rounded ${bg}`} />
              <div className={`w-1/4 h-3 rounded ${bg}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSkeleton;
