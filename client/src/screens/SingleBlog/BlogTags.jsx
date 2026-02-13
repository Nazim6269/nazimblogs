import React from 'react'
import { Link } from 'react-router-dom'

const BlogTags = ({ tags, isDark }) => (
    <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
            <Link
                key={index}
                to={`/tags/${tag.toLowerCase()}`}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${isDark
                    ? "bg-white/5 text-gray-300 hover:bg-white/10"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
            >
                #{tag}
            </Link>
        ))}
    </div>
)

export default BlogTags