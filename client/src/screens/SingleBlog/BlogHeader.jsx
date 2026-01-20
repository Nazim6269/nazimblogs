import React from 'react'

const BlogHeader = ({ title, isDark }) => (
    <div className="mb-8">
        <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 ${isDark ? "text-white" : "text-gray-900"
                }`}
        >
            {title}
        </h1>
    </div>
);

export default BlogHeader