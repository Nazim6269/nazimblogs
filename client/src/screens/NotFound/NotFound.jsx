import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/useTheme";

const NotFound = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <p className={`text-8xl font-bold mb-2 ${isDark ? "text-gray-800" : "text-gray-200"}`}>404</p>
            <h2 className={`text-xl font-semibold mb-2 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                Page not found
            </h2>
            <p className={`text-sm mb-6 max-w-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={() => window.history.back()}
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${isDark
                        ? "text-gray-300 hover:bg-white/5"
                        : "text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                    Go back
                </button>
                <Link
                    to="/"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-primary hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faHome} className="text-xs" />
                    Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
