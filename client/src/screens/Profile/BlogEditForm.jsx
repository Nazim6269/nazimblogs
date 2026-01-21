import React from 'react'
import { useTheme } from '../../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const BlogEditForm = ({ blog, handleCancelEdit, handleUpdateBlog }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <div className="p-6 space-y-4">
            <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Title
                </label>
                <input
                    type="text"
                    value={blog.title}
                    onChange={(e) => handleUpdateBlog({ ...blog, title: e.target.value })}
                    className={`w-full px-4 py-2 rounded-md border ${isDark
                        ? "bg-slate-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
            </div>

            <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Tags
                </label>
                <input
                    type="text"
                    value={blog.tags}
                    onChange={(e) => handleUpdateBlog({ ...blog, tags: e.target.value })}
                    className={`w-full px-4 py-2 rounded-md border ${isDark
                        ? "bg-slate-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
            </div>

            <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Content
                </label>
                <textarea
                    value={blog.content}
                    onChange={(e) => handleUpdateBlog({ ...blog, content: e.target.value })}
                    rows={6}
                    className={`w-full px-4 py-2 rounded-md border ${isDark
                        ? "bg-slate-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
            </div>

            <div className="flex gap-3 justify-end">
                <button
                    onClick={handleCancelEdit}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${isDark
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Cancel
                </button>
                <button
                    onClick={() => handleUpdateBlog(blog.id)}
                    className={`px-4 py-2 rounded-md font-medium text-white transition-all duration-300 ${isDark
                        ? "bg-brand-primary hover:bg-purple-700"
                        : "bg-alter-brand-primary hover:bg-alter-brand-secondary"}`}
                >
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default BlogEditForm