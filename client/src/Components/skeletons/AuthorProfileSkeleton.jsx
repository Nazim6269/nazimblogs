import { useTheme } from "../../hooks/useTheme";

const AuthorProfileSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
      {/* Author Header Card */}
      <div className={`rounded-lg border p-4 sm:p-6 mb-5 animate-pulse ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
        <div className="flex flex-col items-center gap-3">
          <div className={`w-20 h-20 rounded-full ${bg}`} />
          <div className={`w-36 h-5 rounded ${bg}`} />
          <div className={`w-48 h-3 rounded ${bg}`} />
          {/* Location & join date */}
          <div className="flex gap-3">
            <div className={`w-20 h-3 rounded ${bg}`} />
            <div className={`w-24 h-3 rounded ${bg}`} />
          </div>
          {/* Stats */}
          <div className="flex gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-1">
                <div className={`w-6 h-5 rounded mx-auto ${bg}`} />
                <div className={`w-12 h-2.5 rounded ${bg}`} />
              </div>
            ))}
          </div>
          {/* Follow button */}
          <div className={`w-20 h-8 rounded-md mt-1 ${bg}`} />
        </div>
      </div>

      {/* Blog list header */}
      <div className={`w-32 h-4 rounded mb-3 animate-pulse ${bg}`} />

      {/* Blog cards */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex flex-col sm:flex-row gap-3 p-3 rounded-lg border animate-pulse ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorProfileSkeleton;
