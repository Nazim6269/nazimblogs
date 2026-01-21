import React from 'react'
import { Link } from 'react-router-dom'

const RelatedArticleCard = ({ id, isDark }) => (
    <Link
        to={`/blog-details?id=${id}`}
        className={`group rounded-md overflow-hidden transition-all duration-300 hover:shadow-md ${isDark
            ? "bg-gray-800 hover:bg-gray-750"
            : "bg-white hover:bg-gray-50 border border-gray-200"
            }`}
    >
        <div className="relative overflow-hidden">
            <img
                src={`https://picsum.photos/seed/${id}/400/200`}
                alt={`Related article ${id}`}
                className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-4">
            <h3
                className={`font-bold text-lg mb-2 line-clamp-2 group-hover:text-brand-secondary transition-colors ${isDark ? "text-gray-200" : "text-gray-900"
                    }`}
            >
                Related Article Title {id}
            </h3>
            <p className={`text-sm line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                A brief description of the related article content...
            </p>
        </div>
    </Link>
)

export default RelatedArticleCard