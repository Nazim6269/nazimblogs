import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { submitReport } from "../../helper/reportApi";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const REASONS = ["Spam", "Inappropriate content", "Harassment", "Misinformation"];

const ReportButton = ({ targetType, targetId, isDark }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReport = async () => {
    if (!reason) {
      toast.error("Please select a reason");
      return;
    }
    try {
      setSubmitting(true);
      await submitReport(targetType, targetId, reason);
      toast.success("Report submitted");
      setShowModal(false);
      setReason("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
          isDark
            ? "text-gray-400 hover:text-red-400 hover:bg-white/5"
            : "text-gray-400 hover:text-red-500 hover:bg-gray-50"
        }`}
        title="Report"
      >
        <FontAwesomeIcon icon={faFlag} className="text-[10px]" />
        <span className="hidden sm:inline">Report</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className={`relative w-full max-w-sm rounded-lg p-5 ${isDark ? "bg-gray-800" : "bg-white"} shadow-xl`}>
            <h3 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
              Report {targetType}
            </h3>
            <div className="space-y-2 mb-4">
              {REASONS.map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm transition-colors ${
                    reason === r
                      ? isDark ? "bg-brand-primary/20 text-brand-primary" : "bg-purple-50 text-brand-primary"
                      : isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="accent-brand-primary"
                  />
                  {r}
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowModal(false); setReason(""); }}
                className={`flex-1 py-2 rounded-md text-xs font-semibold ${
                  isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                disabled={submitting || !reason}
                className="flex-1 py-2 rounded-md text-xs font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportButton;
