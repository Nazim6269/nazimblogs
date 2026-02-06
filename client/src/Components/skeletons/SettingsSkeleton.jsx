import { useTheme } from "../../hooks/useTheme";

const SettingsSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      <div className="max-w-2xl mx-auto animate-pulse">
        {/* Header */}
        <div className="mb-8">
          <div className={`h-10 w-48 rounded mb-2 ${bg}`} />
          <div className={`h-4 w-72 rounded ${bg}`} />
        </div>

        {/* Settings Card */}
        <div className={`rounded-md border p-6 sm:p-8 space-y-6 ${isDark ? "bg-slate-800 border-gray-700" : "bg-white border-gray-300"}`}>
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className={`w-24 h-24 rounded-full ${bg}`} />
            <div className={`h-4 w-28 rounded ${bg}`} />
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <div className={`h-4 w-16 rounded ${bg}`} />
            <div className={`h-12 w-full rounded-md ${bg}`} />
          </div>

          {/* Bio Input */}
          <div className="space-y-2">
            <div className={`h-4 w-12 rounded ${bg}`} />
            <div className={`h-24 w-full rounded-md ${bg}`} />
          </div>

          {/* Location Input */}
          <div className="space-y-2">
            <div className={`h-4 w-20 rounded ${bg}`} />
            <div className={`h-12 w-full rounded-md ${bg}`} />
          </div>

          {/* Save Button */}
          <div className={`h-12 w-full rounded-md ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeleton;
