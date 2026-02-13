import React from 'react'
import { Link } from 'react-router-dom'

const RelatedArticleCard = ({ blog, isDark }) => {
    const blogId = blog._id || blog.id;
    const authorName = typeof blog.author === "object" ? blog.author?.name : blog.author;
    const image = blog.imageSrc || `https://picsum.photos/seed/${blogId}/400/200`;

    return (
        <Link
            to={`/blog-details/${blogId}`}
            className={`group rounded-md overflow-hidden transition-colors ${isDark
                ? "bg-gray-800 hover:bg-gray-750"
                : "bg-white hover:bg-gray-50 border border-gray-100"
                }`}
        >
            <img
                src={image}
                alt={blog.title}
                className="w-full h-32 object-cover"
            />
            <div className="p-3">
                <h3
                    className={`font-semibold text-sm mb-1 line-clamp-2 group-hover:text-brand-secondary transition-colors ${isDark ? "text-gray-200" : "text-gray-900"
                        }`}
                >
                    {blog.title}
                </h3>
                <p className={`text-xs line-clamp-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {blog.body?.substring(0, 80)}
                </p>
            </div>
        </Link>
    );
}

export default RelatedArticleCard