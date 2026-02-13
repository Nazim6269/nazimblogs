import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";

const NoData = ({ message = "No data found", subMessage = "Try adjusting your filters or search terms." }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            <FontAwesomeIcon icon={faInbox} className="text-2xl mb-3" />
            <h3 className={`text-base font-semibold mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {message}
            </h3>
            <p className="text-sm max-w-xs">
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
