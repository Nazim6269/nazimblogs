import { useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  confirmColor = "red",
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, loading]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const confirmBtnClass =
    confirmColor === "brand"
      ? "bg-brand-primary text-white hover:bg-purple-700"
      : "bg-red-600 text-white hover:bg-red-700";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div
        className={`w-full max-w-sm mx-4 p-5 rounded-lg shadow-xl transition-all ${
          isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <h3
          className={`text-base font-bold mb-1.5 ${isDark ? "text-gray-100" : "text-gray-900"}`}
        >
          {title}
        </h3>
        <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 ${
              isDark
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 ${confirmBtnClass}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Processing...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
