import { useTheme } from "../../hooks/useTheme";

const AuthorProfileSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      {/* Author Header Card */}
      <div className={`rounded-md border p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-pulse ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="flex flex-col items-center gap-4">
          <div className={`w-28 h-28 rounded-full ${bg}`} />
          <div className={`w-36 sm:w-40 h-6 rounded ${bg}`} />
          <div className={`w-48 sm:w-64 h-4 rounded ${bg}`} />
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-2">
            <div className={`w-16 sm:w-20 h-8 rounded ${bg}`} />
            <div className={`w-16 sm:w-20 h-8 rounded ${bg}`} />
            <div className={`w-20 sm:w-24 h-8 rounded ${bg}`} />
          </div>
          <div className={`w-24 h-9 rounded-md mt-1 ${bg}`} />
        </div>
      </div>

      {/* Blog list header */}
      <div className={`w-40 sm:w-48 h-6 rounded mb-4 animate-pulse ${bg}`} />

      {/* Blog cards */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex flex-col md:flex-row gap-4 p-4 rounded-md border animate-pulse ${isDark ? "bg-gray-900/30 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`w-full md:w-56 h-40 sm:h-48 md:h-auto rounded-md shrink-0 ${bg}`} />
            <div className="flex-1 space-y-3 py-1">
              <div className={`h-5 w-3/4 rounded ${bg}`} />
              <div className={`h-4 w-full rounded ${bg}`} />
              <div className={`h-4 w-5/6 rounded ${bg}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorProfileSkeleton;
