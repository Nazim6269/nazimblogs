import { useTheme } from "../../hooks/useTheme";

const ProfileSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen px-4 py-4 sm:py-6 flex flex-col items-center gap-4">
      {/* Profile Header */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-4 animate-pulse">
        <div className={`w-20 h-20 rounded-full shrink-0 ${bg}`} />
        <div className="flex-1 space-y-2 text-center md:text-left w-full">
          <div className={`h-6 w-40 rounded mx-auto md:mx-0 ${bg}`} />
          <div className={`h-3 w-48 rounded mx-auto md:mx-0 ${bg}`} />
          <div className={`h-3 w-28 rounded mx-auto md:mx-0 ${bg}`} />
        </div>
      </div>

      {/* Stats */}
      <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-2 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`py-2.5 px-3 rounded-md text-center ${isDark ? "bg-slate-800" : "bg-white border border-gray-200"}`}>
            <div className={`h-2 w-12 rounded mb-1.5 mx-auto ${bg}`} />
            <div className={`h-5 w-8 rounded mx-auto ${bg}`} />
          </div>
        ))}
      </div>

      {/* Blogs Section */}
      <div className={`w-full max-w-6xl border rounded-md animate-pulse ${isDark ? "border-gray-600" : "border-gray-300"}`}>
        <div className={`p-3 border-b ${isDark ? "border-gray-600" : "border-gray-300"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className={`h-5 w-28 rounded ${bg}`} />
            <div className={`h-9 w-full md:w-80 rounded-md ${bg}`} />
          </div>
        </div>
        <div className="p-3 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`flex flex-col sm:flex-row gap-3 p-3 rounded-md border ${isDark ? "bg-slate-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className={`w-full sm:w-44 md:w-52 h-36 sm:h-32 rounded-md shrink-0 ${bg}`} />
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full ${bg}`} />
                    <div className={`h-3 w-20 rounded ${bg}`} />
                    <div className={`h-3 w-14 rounded ${bg}`} />
                  </div>
                  <div className={`h-4 w-3/4 rounded ${bg}`} />
                  <div className="space-y-1.5">
                    <div className={`h-3 w-full rounded ${bg}`} />
                    <div className={`h-3 w-4/5 rounded ${bg}`} />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className={`h-3 w-10 rounded ${bg}`} />
                  <div className={`h-3 w-10 rounded ${bg}`} />
                  <div className={`h-3 w-10 rounded ${bg}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
