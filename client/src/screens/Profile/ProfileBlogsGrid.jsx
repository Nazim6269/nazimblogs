import React, { useState } from 'react'
import { useTheme } from '../../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import BlogEditForm from './BlogEditForm';
import BlogCard from '../../Components/BlogCard/BlogCard';
import BlogCardActions from './BlogCardActions';
import DeletConfirmationModel from './DeletConfirmationModel';
import NoBlogsFound from './NoBlogsFound';
import TipSection from './TipSection';
import { Link } from 'react-router-dom';


const ProfileBlogsGrid = ({ blogs, isSearching, searchQuery, setSearchQuery, handleEditClick, handleUpdateBlog, handleDeleteBlog, showDeleteConfirm, setShowDeleteConfirm }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [editingBlog, setEditingBlog] = useState(null);
    return (
        <div className="p-4">
            {/* Show searching message */}
            {isSearching ? (
                <div className="text-center py-8">
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                        <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${isDark ? "border-purple-500" : "border-violet-500"}`}></div>
                        <p className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            Searching...
                        </p>
                    </div>
                </div>
            ) : blogs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className={`relative rounded-2xl border transition-all duration-300 ${isDark
                                ? "bg-slate-800 border-gray-700 hover:border-purple-500/50"
                                : "bg-white border-gray-300 hover:border-violet-500/50"}`}
                        >
                            {editingBlog === blog.id ? (
                                // Edit Mode
                                <BlogEditForm blog={blog} handleCancelEdit={() => setEditingBlog(null)} handleUpdateBlog={handleUpdateBlog} />
                            ) : (
                                // View Mode
                                <div className="flex flex-col md:flex-row gap-4 p-4">
                                    <Link
                                        to={`/blog-details?id=${blog.id}`}
                                        className="flex-1"
                                    >
                                        <BlogCard data={blog} />
                                    </Link>

                                    {/* Action Buttons */}
                                    <BlogCardActions blog={blog} handleEditClick={handleEditClick} setShowDeleteConfirm={setShowDeleteConfirm} />
                                </div>
                            )}

                            {/* Delete Confirmation Modal */}
                            {showDeleteConfirm === blog.id && (
                                <DeletConfirmationModel blog={blog} setShowDeleteConfirm={setShowDeleteConfirm} handleDeleteBlog={handleDeleteBlog} isDark={isDark} />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                // Enhanced Empty State
                <div className="text-center py-16 px-4">
                    {searchQuery ? (
                        // No Search Results
                        <NoBlogsFound searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    ) : (
                        // No Blogs at All
                        <div className="max-w-md mx-auto">
                            <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDark
                                ? "bg-linear-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30"
                                : "bg-linear-to-br from-violet-100 to-blue-100 border border-violet-200"}`}>
                                <FontAwesomeIcon
                                    icon={faPen}
                                    className={`text-5xl ${isDark ? "text-purple-400" : "text-violet-600"}`}
                                />
                            </div>
                            <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                                Start Your Blogging Journey
                            </h3>
                            <p className={`text-base mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                You haven't created any blogs yet. Share your thoughts, ideas, and stories with the world!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    to="/create-blog"
                                    className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 ${isDark
                                        ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30"
                                        : "bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/30"}`}
                                >
                                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                                    Create Your First Blog
                                </Link>
                            </div>

                            {/* Tips Section */}
                            <TipSection />

                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfileBlogsGrid