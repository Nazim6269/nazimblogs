import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/useTheme";

const NotFound = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`min-h-[80vh] flex flex-col items-center justify-center text-center px-4`}>
            {/* 404 Text Background */}
            <h1 className={`text-[12rem] md:text-[18rem] font-black opacity-10 leading-none absolute select-none ${isDark ? "text-purple-500" : "text-purple-200"}`}>
                404
            </h1>

            <div className="relative z-10 space-y-6">
                <div className="relative inline-block">
                    <div className="w-32 h-32 bg-linear-to-tr from-purple-600 to-blue-500 rounded-3xl rotate-12 absolute -inset-1 blur-xl opacity-30 animate-pulse"></div>
                    <div className="w-32 h-32 bg-linear-to-tr from-purple-600 to-blue-500 rounded-3xl flex items-center justify-center text-white text-5xl font-bold shadow-2xl relative">
                        ?
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className={`text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                        Page Not Found
                    </h2>
                    <p className={`text-lg max-w-md mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        Oops! The page you are looking for doesn't exist or has been moved to another galaxy.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <button
                        onClick={() => window.history.back()}
                        className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${isDark
                                ? "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-transparent"
                            }`}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                        Go Back
                    </button>

                    <Link
                        to="/"
                        className="px-8 py-3 rounded-xl font-bold text-white bg-linear-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faHome} className="text-sm" />
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
