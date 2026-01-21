import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MetaBadge = ({ icon, text, isDark, variant = "default" }) => {
    const variants = {
        default: isDark
            ? "bg-gray-800 text-gray-300 border border-gray-700"
            : "bg-gray-100 text-gray-700 border border-gray-200",
        accent: isDark
            ? "bg-brand-primary/20 text-purple-300 border border-purple-600/40"
            : "bg-purple-100 text-purple-700 border border-purple-200",
    };

    return (
        <span
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${variants[variant]}`}
        >
            <FontAwesomeIcon icon={icon} className="text-xs" />
            {text}
        </span>
    );
};

export default MetaBadge