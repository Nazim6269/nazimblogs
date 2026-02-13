import { useTheme } from "../../hooks/useTheme";

const AdminSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="w-full py-4 sm:py-6">
      <div className="flex gap-5">

        {/* Desktop Sidebar Skeleton */}
        <aside className="hidden md:flex flex-col w-60 shrink-0">
          <div className={`sticky top-20 h-[calc(100vh-6rem)] rounded-md animate-pulse ${
            isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
          }`}>
            {/* Brand header */}
            <div className={`px-4 py-4 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-md ${bg}`} />
                <div className="space-y-1">
                  <div className={`h-3.5 w-20 rounded ${bg}`} />
                  <div className={`h-2.5 w-16 rounded ${bg}`} />
                </div>
              </div>
            </div>

            {/* Nav sections */}
            <div className="p-3 space-y-5">
              {/* Section 1: Main */}
              <div>
                <div className={`h-2.5 w-10 rounded mb-2 ml-3 ${bg}`} />
                <div className="flex flex-col gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-10 w-full rounded-r-md ${
                      i === 1 ? (isDark ? "bg-brand-primary/10" : "bg-purple-50") : (isDark ? "bg-white/5" : "bg-gray-50")
                    }`} />
                  ))}
                </div>
              </div>
              {/* Section 2: Settings */}
              <div>
                <div className={`h-2.5 w-14 rounded mb-2 ml-3 ${bg}`} />
                <div className="flex flex-col gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-10 w-full rounded-r-md ${isDark ? "bg-white/5" : "bg-gray-50"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area Skeleton */}
        <div className="flex-1 min-w-0 animate-pulse">

          {/* Content Header Bar */}
          <div className={`flex items-center gap-3 px-4 py-3 mb-4 rounded-md ${
            isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200"
          }`}>
            <div className={`md:hidden w-8 h-8 rounded-md ${bg}`} />
            <div className={`h-5 w-24 rounded ${bg}`} />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`p-4 rounded-md border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
                <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2">
                  <div className={`w-9 h-9 rounded-md ${bg}`} />
                  <div className="space-y-1 text-center sm:text-left">
                    <div className={`h-2.5 w-12 rounded mx-auto sm:mx-0 ${bg}`} />
                    <div className={`h-5 w-8 rounded mx-auto sm:mx-0 ${bg}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div className={`rounded-md border p-4 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
            <div className={`h-4 w-32 rounded mb-4 ${bg}`} />

            {/* Mobile card list */}
            <div className="flex flex-col gap-2 md:hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`flex items-center justify-between gap-3 p-2.5 rounded-md ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className={`h-3.5 w-28 rounded ${bg}`} />
                    <div className={`h-3 w-36 rounded ${bg}`} />
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className={`h-5 w-12 rounded-full ${bg}`} />
                    <div className={`h-5 w-10 rounded-full ${bg}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block space-y-2.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`h-3.5 w-28 rounded ${bg}`} />
                  <div className={`h-3.5 w-44 rounded ${bg}`} />
                  <div className="flex-1" />
                  <div className={`h-5 w-12 rounded-full ${bg}`} />
                  <div className={`h-5 w-14 rounded-full ${bg}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSkeleton;
