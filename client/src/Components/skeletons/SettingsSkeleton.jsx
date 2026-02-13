import { useTheme } from "../../hooks/useTheme";

const SettingsSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
      <div className={`rounded-md shadow-md overflow-hidden animate-pulse ${isDark ? "bg-gray-900 border border-white/5" : "bg-white border border-black/5"}`}>
        <div className="p-4 sm:p-5 md:p-6">
          {/* Header: Avatar + Title */}
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5 mb-5">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-md shrink-0 ${bg}`} />
            <div className="space-y-2 text-center md:text-left w-full">
              <div className={`h-6 w-40 rounded mx-auto md:mx-0 ${bg}`} />
              <div className={`h-3 w-56 rounded mx-auto md:mx-0 ${bg}`} />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className={`h-3 w-20 rounded ${bg}`} />
                  <div className={`h-10 w-full rounded-md ${bg}`} />
                </div>
              ))}
            </div>
            {/* Bio - full width */}
            <div className="space-y-1.5">
              <div className={`h-3 w-12 rounded ${bg}`} />
              <div className={`h-20 w-full rounded-md ${bg}`} />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end">
            <div className={`h-10 w-32 rounded-md ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeleton;
