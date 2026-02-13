import { useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const HomeSkeleton = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Hero Skeleton */}
      {isHome && (
        <div className={`relative w-full min-h-[180px] sm:min-h-[220px] md:min-h-[280px] rounded-lg mb-6 animate-pulse ${isDark ? "bg-slate-800" : "bg-gray-100"}`}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6">
            <div className={`h-7 sm:h-8 w-2/3 max-w-lg rounded ${isDark ? "bg-gray-600" : "bg-gray-200"}`} />
            <div className={`h-4 w-1/2 max-w-sm rounded ${isDark ? "bg-gray-600" : "bg-gray-200"}`} />
            <div className={`h-8 w-28 rounded-md mt-2 ${isDark ? "bg-gray-600" : "bg-gray-200"}`} />
          </div>
        </div>
      )}

      {/* Trending Skeleton */}
      <div className="px-4 sm:px-6 py-5">
        <div className={`h-6 w-28 rounded mb-4 animate-pulse ${bg}`} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`rounded-lg border overflow-hidden animate-pulse ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
              <div className={`h-24 ${bg}`} />
              <div className="p-2.5 space-y-1.5">
                <div className={`h-3.5 w-3/4 rounded ${bg}`} />
                <div className={`h-3 w-full rounded ${bg}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 p-4 sm:p-5">
        {/* Main Column */}
        <div className="flex flex-col gap-3 lg:col-span-8 order-1">
          {/* Section Header */}
          <div className="animate-pulse space-y-1">
            <div className={`h-6 w-32 rounded ${bg}`} />
            <div className={`h-3 w-56 rounded ${bg}`} />
          </div>

          {/* Blog Card Skeletons */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 rounded-lg border animate-pulse ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
              <div className={`w-full sm:w-44 md:w-52 h-36 sm:h-32 rounded-md shrink-0 ${bg}`} />
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="space-y-2.5">
                  {/* Author + date */}
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full ${bg}`} />
                    <div className={`h-3 w-20 rounded ${bg}`} />
                    <div className={`h-3 w-14 rounded ${bg}`} />
                  </div>
                  {/* Title */}
                  <div className={`h-5 w-3/4 rounded ${bg}`} />
                  {/* Snippet */}
                  <div className="space-y-1.5">
                    <div className={`h-3 w-full rounded ${bg}`} />
                    <div className={`h-3 w-4/5 rounded ${bg}`} />
                  </div>
                </div>
                {/* Stats */}
                <div className="flex items-center gap-3 mt-3">
                  <div className={`h-3 w-10 rounded ${bg}`} />
                  <div className={`h-3 w-10 rounded ${bg}`} />
                  <div className={`h-3 w-10 rounded ${bg}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 order-2 space-y-4">
          <div className={`p-4 rounded-lg border animate-pulse ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
            <div className={`h-4 w-20 rounded mb-3 ${bg}`} />
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex gap-3 items-center">
                  <div className={`w-12 h-12 rounded shrink-0 ${bg}`} />
                  <div className="flex-1 space-y-1.5">
                    <div className={`h-3 w-full rounded ${bg}`} />
                    <div className={`h-2 w-2/3 rounded ${bg}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`p-4 rounded-lg border animate-pulse ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
            <div className={`h-4 w-28 rounded mb-3 ${bg}`} />
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="space-y-1.5 p-2">
                  <div className={`h-3 w-full rounded ${bg}`} />
                  <div className={`h-2 w-3/4 rounded ${bg}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
