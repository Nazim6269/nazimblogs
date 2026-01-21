import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ActionButton = ({ icon, text, onClick, isActive, isDark, activeColor = "text-purple-500" }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105 ${isActive
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