import React from 'react'
import { Link } from 'react-router-dom'

const RelatedArticleCard = ({ blog, isDark }) => {
    const blogId = blog._id || blog.id;
    const authorName = typeof blog.author === "object" ? blog.author?.name : blog.author;
    const image = blog.imageSrc || `https://picsum.photos/seed/${blogId}/400/200`;

    return (
        <Link
            to={`/blog-details/${blogId}`}
            className={`group rounded-md overflow-hidden transition-all duration-300 hover:shadow-md ${isDark
                ? "bg-gray-800 hover:bg-gray-750"
                : "bg-white hover:bg-gray-50 border border-gray-200"
                }`}
        >
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={blog.title}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
                <h3
                    className={`font-bold text-lg mb-2 line-clamp-2 group-hover:text-brand-secondary transition-colors ${isDark ? "text-gray-200" : "text-gray-900"
                        }`}
                >
                    {blog.title}
                </h3>
                <p className={`text-sm line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {blog.body?.substring(0, 100)}...
                </p>
            </div>
        </Link>
    );
}

export default RelatedArticleCard