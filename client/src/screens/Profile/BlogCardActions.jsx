import React from 'react'
import { useTheme } from '../../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const BlogCardActions = ({ blog, handleEditClick, setShowDeleteConfirm }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <div className="flex md:flex-col gap-2 justify-end md:justify-start">
            <button
                onClick={() => handleEditClick(blog)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-2 ${isDark
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 text-white hover:bg-blue-600"}`}
                title="Edit Blog"
            >
                <FontAwesomeIcon icon={faEdit} />
                <span className="hidden sm:inline">Edit</span>
            </button>

            <button
                onClick={() => setShowDeleteConfirm(blog.id)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-2 ${isDark
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-red-500 text-white hover:bg-red-600"}`}
                title="Delete Blog"
            >
                <FontAwesomeIcon icon={faTrash} />
                <span className="hidden sm:inline">Delete</span>
            </button>
        </div>
    )
}

export default BlogCardActions