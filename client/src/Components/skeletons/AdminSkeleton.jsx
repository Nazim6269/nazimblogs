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
          <div className={`h-10 w-56 rounded mb-2 ${bg}`} />
          <div className={`h-4 w-80 rounded ${bg}`} />
        </div>

        {/* Config Card */}
        <div className={`rounded-md border p-6 sm:p-8 space-y-6 ${isDark ? "bg-slate-800 border-gray-700" : "bg-white border-gray-300"}`}>
          {/* Section Header */}
          <div className={`h-6 w-40 rounded ${bg}`} />

          {/* Input Fields */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className={`h-4 w-28 rounded ${bg}`} />
              <div className={`h-12 w-full rounded-md ${bg}`} />
            </div>
          ))}

          {/* Textarea */}
          <div className="space-y-2">
            <div className={`h-4 w-24 rounded ${bg}`} />
            <div className={`h-32 w-full rounded-md ${bg}`} />
          </div>

          {/* Another Textarea */}
          <div className="space-y-2">
            <div className={`h-4 w-32 rounded ${bg}`} />
            <div className={`h-32 w-full rounded-md ${bg}`} />
          </div>

          {/* Save Button */}
          <div className={`h-12 w-full rounded-md ${isDark ? "bg-gray-600" : "bg-gray-300"}`} />
        </div>
      </div>
    </div>
  );
};

export default AdminSkeleton;
