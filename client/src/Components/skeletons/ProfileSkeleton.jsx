import { useTheme } from "../../hooks/useTheme";

const ProfileSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-10 flex flex-col items-center gap-6 sm:gap-8">
      {/* Profile Header */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-4 sm:gap-6 animate-pulse">
        <div className={`w-28 h-28 rounded-full shrink-0 ${bg}`} />
        <div className="flex-1 space-y-3 text-center md:text-left w-full">
          <div className={`h-8 w-48 rounded mx-auto md:mx-0 ${bg}`} />
          <div className={`h-4 w-56 rounded mx-auto md:mx-0 ${bg}`} />
          <div className={`h-3 w-32 rounded mx-auto md:mx-0 ${bg}`} />
        </div>
        <div className="flex gap-3">
          <div className={`w-24 h-10 rounded-md ${bg}`} />
          <div className={`w-24 h-10 rounded-md ${bg}`} />
        </div>
      </div>

      {/* Bio */}
      <div className={`w-full max-w-3xl rounded-md p-6 animate-pulse ${isDark ? "bg-slate-800" : "bg-gray-100 border border-gray-200"}`}>
        <div className="space-y-2">
          <div className={`h-4 w-full rounded ${bg}`} />
          <div className={`h-4 w-4/5 rounded ${bg}`} />
        </div>
      </div>

      {/* Stats */}
      <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`p-4 rounded-md text-center ${isDark ? "bg-slate-800" : "bg-white border border-gray-200"}`}>
            <div className={`h-3 w-16 rounded mb-2 mx-auto ${bg}`} />
            <div className={`h-8 w-10 rounded mx-auto ${bg}`} />
          </div>
        ))}
      </div>

      {/* Blogs Section */}
      <div className={`w-full max-w-6xl border rounded-md animate-pulse ${isDark ? "border-gray-600" : "border-gray-300"}`}>
        <div className={`p-4 border-b ${isDark ? "border-gray-600" : "border-gray-300"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`h-7 w-36 rounded ${bg}`} />
            <div className={`h-10 w-full md:w-96 rounded-md ${bg}`} />
          </div>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-4 p-4 rounded-md border ${isDark ? "bg-slate-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
              <div className={`w-full md:w-48 h-32 rounded-md shrink-0 ${bg}`} />
              <div className="flex-1 space-y-3">
                <div className={`h-5 w-3/4 rounded ${bg}`} />
                <div className={`h-4 w-full rounded ${bg}`} />
                <div className={`h-4 w-5/6 rounded ${bg}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
