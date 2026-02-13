import { useTheme } from "../../hooks/useTheme";

const AuthSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8 px-4">
      <div className={`w-full max-w-md rounded-md border p-6 animate-pulse ${isDark ? "bg-slate-800 border-gray-700" : "bg-white border-gray-300"}`}>
        {/* Logo/Title */}
        <div className={`h-6 w-36 rounded mx-auto mb-1.5 ${bg}`} />
        <div className={`h-3 w-48 rounded mx-auto mb-6 ${bg}`} />

        {/* Form Fields */}
        <div className="space-y-3 mb-5">
          <div className={`h-10 w-full rounded-md ${bg}`} />
          <div className={`h-10 w-full rounded-md ${bg}`} />
          <div className={`h-10 w-full rounded-md ${bg}`} />
        </div>

        {/* Submit Button */}
        <div className={`h-10 w-full rounded-md mb-5 ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`h-px flex-1 ${bg}`} />
          <div className={`h-3 w-6 rounded ${bg}`} />
          <div className={`h-px flex-1 ${bg}`} />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3 mb-5">
          <div className={`h-9 flex-1 rounded-md ${bg}`} />
          <div className={`h-9 flex-1 rounded-md ${bg}`} />
        </div>

        {/* Footer Link */}
        <div className={`h-3 w-44 rounded mx-auto ${bg}`} />
      </div>
    </div>
  );
};

export default AuthSkeleton;
