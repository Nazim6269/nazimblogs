import { useTheme } from "../../hooks/useTheme";

const AuthorProfileSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const pulse = isDark ? "bg-gray-800" : "bg-gray-200";

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className={`w-28 h-28 rounded-full animate-pulse ${pulse}`} />
        <div className={`w-40 h-6 rounded animate-pulse ${pulse}`} />
        <div className={`w-64 h-4 rounded animate-pulse ${pulse}`} />
        <div className="flex gap-6 mt-2">
          <div className={`w-20 h-8 rounded animate-pulse ${pulse}`} />
          <div className={`w-20 h-8 rounded animate-pulse ${pulse}`} />
          <div className={`w-24 h-8 rounded animate-pulse ${pulse}`} />
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`rounded-md animate-pulse p-6 h-40 ${pulse}`} />
        ))}
      </div>
    </div>
  );
};

export default AuthorProfileSkeleton;
