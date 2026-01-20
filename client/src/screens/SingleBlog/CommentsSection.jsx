import React from 'react'
import Comments from '../../Components/Comments/Comments';

const CommentsSection = ({ isDark, count = 12 }) => (
    <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-8">
            <h2
                className={`text-3xl font-bold flex items-center gap-3 ${isDark ? "text-white" : "text-gray-900"
                    }`}
            >
                Comments
                <span
                    className={`text-sm font-normal px-4 py-1.5 rounded-full ${isDark
                        ? "bg-gray-800 text-gray-400"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {count}
                </span>
            </h2>
        </div>
        <Comments />
    </div>
);

export default CommentsSection