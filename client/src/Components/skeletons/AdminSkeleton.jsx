import { useTheme } from "../../hooks/useTheme";

const AdminSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-4xl mx-auto animate-pulse">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className={`h-8 sm:h-9 w-44 sm:w-56 rounded mb-2 ${bg}`} />
          <div className={`h-4 w-full max-w-80 rounded ${bg}`} />
        </div>

        {/* Tabs */}
        <div className={`flex overflow-hidden gap-1 mb-6 sm:mb-8 p-1 rounded-md ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`flex-1 h-10 rounded-md ${bg}`} />
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`p-4 sm:p-6 rounded-md border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
              <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md ${bg}`} />
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className={`h-3 w-14 sm:w-16 rounded mx-auto sm:mx-0 ${bg}`} />
                  <div className={`h-6 sm:h-7 w-8 sm:w-10 rounded mx-auto sm:mx-0 ${bg}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className={`rounded-md border p-4 sm:p-6 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
          <div className={`h-6 w-40 rounded mb-4 sm:mb-6 ${bg}`} />

          {/* Mobile card list */}
          <div className="flex flex-col gap-2 md:hidden">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`flex items-center justify-between gap-3 p-3 rounded-md ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className={`h-4 w-32 rounded ${bg}`} />
                  <div className={`h-3 w-40 rounded ${bg}`} />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className={`h-5 w-14 rounded-full ${bg}`} />
                  <div className={`h-5 w-12 rounded-full ${bg}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`h-4 w-32 rounded ${bg}`} />
                <div className={`h-4 w-48 rounded ${bg}`} />
                <div className="flex-1" />
                <div className={`h-6 w-14 rounded-full ${bg}`} />
                <div className={`h-6 w-16 rounded-full ${bg}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSkeleton;
