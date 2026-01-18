import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";

const NoData = ({ message = "No data found", subMessage = "Try adjusting your filters or search terms." }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl border-2 border-dashed transition-all duration-300 ${isDark ? "border-white/5 bg-white/2" : "border-black/5 bg-black/2"
            }`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDark ? "bg-white/5 text-gray-500" : "bg-black/5 text-gray-400"
                }`}>
                <FontAwesomeIcon icon={faInbox} className="text-3xl" />
            </div>

            <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {message}
            </h3>

            <p className={`text-base max-w-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                {subMessage}
            </p>
        </div>
    );
};

NoData.propTypes = {
    message: PropTypes.string,
    subMessage: PropTypes.string,
};

export default NoData;
