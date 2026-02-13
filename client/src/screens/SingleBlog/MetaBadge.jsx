import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MetaBadge = ({ icon, text, isDark, variant = "default" }) => {
    const variants = {
        default: isDark
            ? "text-gray-400"
            : "text-gray-500",
        accent: isDark
            ? "text-purple-400"
            : "text-purple-600",
    };

    return (
        <span className={`flex items-center gap-1.5 text-xs font-medium ${variants[variant]}`}>
            <FontAwesomeIcon icon={icon} className="text-[10px]" />
            {text}
        </span>
    );
};

export default MetaBadge
