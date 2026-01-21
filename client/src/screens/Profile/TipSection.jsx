import React from 'react'
import { useTheme } from '../../hooks/useTheme';

const TipSection = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <div className={`mt-10 p-6 rounded-md text-left ${isDark ? "bg-slate-800/50 border border-slate-700" : "bg-slate-50 border border-slate-200"}`}>
            <h4 className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                💡 Quick Tips for Your First Blog
            </h4>
            <ul className={`space-y-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                <li className="flex items-start gap-2">
                    <span className={isDark ? "text-brand-tertiary" : "text-alter-brand-secondary"}>•</span>
                    <span>Choose a topic you're passionate about</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className={isDark ? "text-brand-tertiary" : "text-alter-brand-secondary"}>•</span>
                    <span>Write a catchy title to grab attention</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className={isDark ? "text-brand-tertiary" : "text-alter-brand-secondary"}>•</span>
                    <span>Add relevant tags to help others find your content</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className={isDark ? "text-brand-tertiary" : "text-alter-brand-secondary"}>•</span>
                    <span>Include images to make your blog more engaging</span>
                </li>
            </ul>
        </div>
    )
}

export default TipSection