import React from 'react'

const BlogHeader = ({ title, isDark }) => (
    <div className="mb-4">
        <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}
        >
            {title}
        </h1>
    </div>
);

export default BlogHeader
