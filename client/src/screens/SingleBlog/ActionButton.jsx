import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ActionButton = ({ icon, text, onClick, isActive, isDark, activeColor = "text-brand-secondary" }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive
            ? activeColor
            : isDark
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
    >
        <FontAwesomeIcon icon={icon} />
        <span className="hidden sm:inline">{text}</span>
    </button>
);

export default ActionButton