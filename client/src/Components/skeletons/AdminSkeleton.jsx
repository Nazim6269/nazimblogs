import { useTheme } from "../../hooks/useTheme";

const AdminSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      <div className="max-w-4xl mx-auto animate-pulse">
        {/* Header */}
        <div className="mb-8">
          <div className={`h-8 sm:h-10 w-44 sm:w-56 rounded mb-2 ${bg}`} />
          <div className={`h-4 w-full max-w-80 rounded ${bg}`} />
        </div>

        {/* Tabs */}
        <div className={`grid grid-cols-3 sm:grid-cols-6 gap-1 mb-8 p-1 rounded-md ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`h-9 sm:h-10 rounded-md ${bg}`} />
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`p-4 sm:p-6 rounded-md border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-md ${bg}`} />
                <div className="space-y-1.5">
                  <div className={`h-3 w-16 rounded ${bg}`} />
                  <div className={`h-6 w-10 rounded ${bg}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className={`rounded-md border p-4 sm:p-6 space-y-4 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
          <div className={`h-6 w-40 rounded ${bg}`} />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-4">
              <div className={`h-4 w-24 sm:w-32 rounded ${bg}`} />
              <div className={`h-4 w-32 sm:w-48 rounded hidden sm:block ${bg}`} />
              <div className="flex-1" />
              <div className={`h-6 w-12 rounded-full ${bg}`} />
              <div className={`h-6 w-14 rounded-full ${bg}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSkeleton;
