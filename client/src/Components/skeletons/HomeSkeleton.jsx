import { useTheme } from "../../hooks/useTheme";

const HomeSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Hero Skeleton */}
      <div className={`relative w-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] rounded-md mb-8 animate-pulse ${isDark ? "bg-slate-800" : "bg-gray-200"}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
          <div className={`h-10 sm:h-12 w-3/4 max-w-2xl rounded ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
          <div className={`h-5 w-1/2 max-w-xl rounded ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
          <div className={`h-10 w-40 rounded-md mt-4 ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
        </div>
      </div>

      {/* Trending Section Skeleton */}
      <div className="px-4 sm:px-6 py-8">
        <div className={`h-8 w-44 rounded-md mb-6 animate-pulse ${bg}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`rounded-md border overflow-hidden animate-pulse ${isDark ? "bg-[#0f172a]/40 border-white/5" : "bg-white border-black/5"}`}>
              <div className={`h-32 ${bg}`} />
              <div className="p-3 space-y-2">
                <div className={`h-4 w-3/4 rounded ${bg}`} />
                <div className={`h-3 w-full rounded ${bg}`} />
                <div className="flex items-center justify-between pt-1">
                  <div className={`h-3 w-16 rounded ${bg}`} />
                  <div className={`h-3 w-20 rounded ${bg}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-5 lg:p-8">
        {/* Main Column */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-8 order-1 lg:order-1">
          {/* Section Header */}
          <div className="animate-pulse space-y-2">
            <div className={`h-8 sm:h-9 w-48 rounded ${bg}`} />
            <div className={`h-4 w-full max-w-80 rounded ${bg}`} />
          </div>

          {/* Blog Card Skeletons - 5 items to match actual page feel */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 p-4 rounded-md border animate-pulse ${isDark ? "bg-[#0f172a]/40 border-white/5" : "bg-white border-black/5"}`}>
              <div className={`w-full md:w-56 lg:w-72 h-40 sm:h-48 md:h-auto rounded-md shrink-0 ${bg}`} />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-3">
                  {/* Meta top */}
                  <div className="flex gap-4">
                    <div className={`h-3 w-24 rounded ${bg}`} />
                    <div className={`h-3 w-20 rounded ${bg}`} />
                  </div>
                  {/* Title */}
                  <div className={`h-6 sm:h-7 w-3/4 rounded ${bg}`} />
                  {/* Snippet */}
                  <div className="space-y-2">
                    <div className={`h-4 w-full rounded ${bg}`} />
                    <div className={`h-4 w-5/6 rounded ${bg}`} />
                  </div>
                </div>
                {/* Bottom bar - mb-6 gap like actual */}
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

        {/* Sidebar */}
        <div className="lg:col-span-4 order-2 lg:order-2 space-y-6 sm:space-y-8">
          {/* Popular Posts */}
          <div className={`p-4 sm:p-6 rounded-md border animate-pulse ${isDark ? "bg-[#0f172a]/40 border-white/5" : "bg-white border-black/5"}`}>
            <div className={`h-6 w-32 rounded mb-4 sm:mb-6 ${bg}`} />
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex gap-3 items-center">
                  <div className={`w-16 h-16 rounded-md shrink-0 ${bg}`} />
                  <div className="flex-1 space-y-2">
                    <div className={`h-3 w-full rounded ${bg}`} />
                    <div className={`h-2 w-2/3 rounded ${bg}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className={`p-4 sm:p-6 rounded-md border animate-pulse ${isDark ? "bg-[#0f172a]/40 border-white/5" : "bg-white border-black/5"}`}>
            <div className={`h-6 w-36 rounded mb-4 sm:mb-6 ${bg}`} />
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className={`p-3 rounded-md space-y-2 ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                  <div className={`h-4 w-full rounded ${bg}`} />
                  <div className={`h-3 w-3/4 rounded ${bg}`} />
                  <div className="flex gap-2">
                    <div className={`h-5 w-14 rounded-full ${bg}`} />
                    <div className={`h-5 w-16 rounded-full ${bg}`} />
                  </div>
                </div>
              ))}
            </div>
            {/* View More button */}
            <div className={`h-10 w-full rounded-md mt-4 sm:mt-6 ${bg}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
