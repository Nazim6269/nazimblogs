import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useTheme } from '../../hooks/useTheme';
import { faSearch, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const NoBlogsFound = ({ searchQuery, setSearchQuery }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <div className="max-w-md mx-auto">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
                <FontAwesomeIcon
                    icon={faSearch}
                    className={`text-4xl ${isDark ? "text-gray-500" : "text-gray-400"}`}
                />
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                No Blogs Found
            </h3>
            <p className={`text-base mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                No blogs match your search for <span className="font-semibold">"{searchQuery}"</span>
            </p>
            <p className={`text-sm mb-6 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                Try different keywords or check your spelling
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    onClick={() => setSearchQuery("")}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${isDark
                        ? "bg-slate-700 text-gray-200 hover:bg-slate-600"
                        : "bg-slate-200 text-gray-700 hover:bg-slate-300"}`}
                >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Clear Search
                </button>
                <Link
                    to="/create-blog"
                    className={`px-6 py-3 rounded-md font-bold text-white transition-all duration-300 ${isDark
                        ? "bg-brand-primary hover:bg-purple-700"
                        : "bg-alter-brand-primary hover:bg-alter-brand-secondary"}`}
                >
                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                    Create New Blog
                </Link>
            </div>
        </div>
    )
}

export default NoBlogsFound