import React from 'react'
import { Link } from 'react-router-dom'

const BlogTags = ({ tags, isDark }) => (
    <div className="flex flex-wrap gap-3 mb-10">
        {tags.map((tag, index) => (
            <Link
                key={index}
                to={`/tags/${tag.toLowerCase()}`}
                className={`px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 ${isDark
                    ? "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200"
                    }`}
            >
                #{tag}
            </Link>
        ))}
    </div>
)

export default BlogTags