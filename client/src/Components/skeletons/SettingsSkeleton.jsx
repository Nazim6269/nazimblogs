import { useTheme } from "../../hooks/useTheme";

const SettingsSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      <div className={`rounded-md shadow-md overflow-hidden animate-pulse ${isDark ? "bg-gray-900 border border-white/5" : "bg-white border border-black/5"}`}>
        <div className="p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Header: Avatar + Title */}
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-10 mb-6 sm:mb-12">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-md shrink-0 ${bg}`} />
            <div className="space-y-3 text-center md:text-left w-full">
              <div className={`h-8 sm:h-10 w-48 sm:w-64 rounded mx-auto md:mx-0 ${bg}`} />
              <div className={`h-4 w-full max-w-80 rounded mx-auto md:mx-0 ${bg}`} />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className={`h-4 w-24 rounded ${bg}`} />
                <div className={`h-12 sm:h-14 w-full rounded-md ${bg}`} />
              </div>
            ))}
            {/* Bio - full width */}
            <div className="space-y-3 md:col-span-2">
              <div className={`h-4 w-16 rounded ${bg}`} />
              <div className={`h-24 w-full rounded-md ${bg}`} />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end">
            <div className={`h-12 sm:h-14 w-40 sm:w-48 rounded-md ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeleton;
