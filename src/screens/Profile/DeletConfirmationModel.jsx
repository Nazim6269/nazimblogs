import React from 'react'

const DeletConfirmationModel = ({ blog, setShowDeleteConfirm, handleDeleteBlog, isDark }) => {
    return (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50">
            <div
                className={`p-6 rounded-xl shadow-2xl max-w-md mx-4 ${isDark ? "bg-slate-800" : "bg-white"}`}
            >
                <h3
                    className={`text-xl font-bold mb-4 ${isDark ? "text-gray-200" : "text-gray-900"}`}
                >
                    Delete Blog?
                </h3>
                <p
                    className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                    Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isDark
                            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletConfirmationModel