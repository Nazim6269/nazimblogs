import {
  faPen,
  faSearch,
  faTrash,
  faEdit,
  faTimes,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { getBlogs, deleteBlog, updateBlog } from "../../helper/localStorage";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import ProfileEditForm from "../Profile/ProfileEditeForm"
import toast from "react-hot-toast";

const Profile = () => {
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    tags: "",
    content: ""
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  // Profile related state
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "Guest User",
    email: user?.email || "",
    bio: user?.bio || "No bio available yet.",
    location: user?.location || "Unknown",
    photoURL: user?.photoURL || null
  });

  // Derived stats
  const totalBlogs = blogs.length;
  const totalLikes = blogs.reduce((s, b) => s + (Number(b.likes) || 0), 0);

  // Sync profile with user data when user changes
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "Guest User",
        email: user.email || "",
        bio: user.bio || "No bio available yet.",
        location: user.location || "Unknown",
        photoURL: user.photoURL || null
      });
    }
  }, [user]);

  useEffect(() => {
    const storedBlogs = getBlogs() || [];
    setBlogs(storedBlogs);
    setFilteredBlogs(storedBlogs);
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search functionality with debounced query
  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        blog.tags.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [debouncedSearchQuery, blogs]);

  // Handle delete blog
  const handleDeleteBlog = (id) => {
    const updatedBlogs = deleteBlog(id);
    setBlogs(updatedBlogs);
    setFilteredBlogs(updatedBlogs);
    setShowDeleteConfirm(null);
    toast.success("Blog deleted successfully");
  };

  // Handle edit blog
  const handleEditClick = (blog) => {
    setEditingBlog(blog.id);
    setEditForm({
      title: blog.title,
      tags: blog.tags,
      content: blog.content
    });
  };

  // Profile edit handlers
  const handleToggleFollow = () => setIsFollowing((s) => !s);

  const handleProfileSave = (updated) => {
    const updatedProfile = { ...profile, ...updated };
    setProfile(updatedProfile);

    // Update user context and localStorage
    updateUser(updated);

    setIsEditingProfile(false);
  };

  // Handle update blog
  const handleUpdateBlog = (id) => {
    const updatedBlogs = updateBlog(id, editForm);
    setBlogs(updatedBlogs);
    setFilteredBlogs(updatedBlogs);
    setEditingBlog(null);
    toast.success("Blog updated successfully");

    setEditForm({ title: "", tags: "", content: "" });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingBlog(null);
    setEditForm({ title: "", tags: "", content: "" });
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 flex flex-col items-center gap-8 transition-colors duration-500`}
    >
      {/* Header: Avatar, name, actions */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          {profile.photoURL ? (
            <img
              src={profile.photoURL}
              alt={profile.name}
              className="w-28 h-28 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold transition-all duration-300 ${isDark ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"}`}
            >
              {profile.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <button
            onClick={() => setIsEditingProfile(true)}
            title="Edit profile"
            className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isDark ? "bg-purple-600 hover:bg-purple-700" : "bg-violet-600 hover:bg-violet-700"}`}
          >
            <FontAwesomeIcon icon={faPen} className="text-white text-sm" />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className={`text-3xl font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>{profile.name}</h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>{profile.email}</p>
          <p className={`mt-3 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{profile.bio}</p>
          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{profile.location}</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleToggleFollow}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isFollowing ? "bg-gray-200 text-gray-900" : "bg-violet-600 text-white"}`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
          <Link to="/create-blog" className={`px-4 py-2 rounded-lg font-semibold ${isDark ? "bg-purple-600 text-white" : "bg-violet-600 text-white"}`}>Create</Link>
        </div>
      </div>

      {/* Bio Section */}
      {/* Editable Bio Section */}
      <div className={`relative w-full max-w-3xl rounded-xl p-6 shadow-md transition-colors duration-500 ${isDark ? "bg-slate-800 text-gray-200" : "bg-slate-100 border-gray-300 text-gray-900 shadow-lg"}`}>
        {isEditingProfile ? (
          <ProfileEditForm
            initial={profile}
            onCancel={() => setIsEditingProfile(false)}
            onSave={handleProfileSave}
          />
        ) : (
          <>
            <p className="leading-relaxed text-center">{profile.bio} <span className="hidden sm:inline">Currently studying at the University of Chittagong.</span></p>
          </>
        )}
      </div>

      {/* Quick Stats */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg text-center ${isDark ? "bg-slate-800" : "bg-white border border-gray-200"}`}>
          <div className="text-sm text-gray-400">Blogs</div>
          <div className="text-2xl font-bold">{totalBlogs}</div>
        </div>
        <div className={`p-4 rounded-lg text-center ${isDark ? "bg-slate-800" : "bg-white border border-gray-200"}`}>
          <div className="text-sm text-gray-400">Likes</div>
          <div className="text-2xl font-bold">{totalLikes}</div>
        </div>
        <div className={`p-4 rounded-lg text-center ${isDark ? "bg-slate-800" : "bg-white border border-gray-200"}`}>
          <div className="text-sm text-gray-400">Reading Time</div>
          <div className="text-2xl font-bold">{Math.max(1, Math.round((totalBlogs * 5)))} min</div>
        </div>
      </div>

      {/* Blogs Section */}
      <div
        className={`w-full max-w-6xl border rounded-xl ${isDark ? "border-gray-600" : "border-gray-300"
          }`}
      >
        {/* Header with Search */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2
              className={`text-3xl font-semibold ${isDark ? "text-gray-200" : "text-gray-900"
                }`}
            >
              Your Blogs ({filteredBlogs.length})
            </h2>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search your blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 pl-10 rounded-lg border transition-all duration-300 ${isDark
                  ? "bg-slate-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-purple-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-violet-500"
                  } focus:outline-none focus:ring-2 ${isDark ? "focus:ring-purple-500/50" : "focus:ring-violet-500/50"
                  }`}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"
                  }`}
              />
              {/* Loading indicator when debouncing */}
              {searchQuery !== debouncedSearchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div
                    className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${isDark ? "border-purple-500" : "border-violet-500"
                      }`}
                  ></div>
                </div>
              )}
              {/* Clear button */}
              {searchQuery && searchQuery === debouncedSearchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${isDark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="p-4">
          {/* Show searching message */}
          {searchQuery !== debouncedSearchQuery && (
            <div className="text-center py-4">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Searching...
              </p>
            </div>
          )}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className={`relative rounded-2xl border transition-all duration-300 ${isDark
                    ? "bg-slate-800 border-gray-700 hover:border-purple-500/50"
                    : "bg-white border-gray-300 hover:border-violet-500/50"
                    }`}
                >
                  {editingBlog === blog.id ? (
                    // Edit Mode
                    <div className="p-6 space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Title
                        </label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className={`w-full px-4 py-2 rounded-lg border ${isDark
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
                          value={editForm.tags}
                          onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                          className={`w-full px-4 py-2 rounded-lg border ${isDark
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
                          value={editForm.content}
                          onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                          rows={6}
                          className={`w-full px-4 py-2 rounded-lg border ${isDark
                            ? "bg-slate-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-900"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                      </div>

                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={handleCancelEdit}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isDark
                            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                          <FontAwesomeIcon icon={faTimes} className="mr-2" />
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateBlog(blog.id)}
                          className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 ${isDark
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-violet-600 hover:bg-violet-700"
                            }`}
                        >
                          <FontAwesomeIcon icon={faCheck} className="mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </div>
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
                      <div className="flex md:flex-col gap-2 justify-end md:justify-start">
                        <button
                          onClick={() => handleEditClick(blog)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${isDark
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                          title="Edit Blog"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          onClick={() => setShowDeleteConfirm(blog.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${isDark
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                          title="Delete Blog"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Delete Confirmation Modal */}
                  {showDeleteConfirm === blog.id && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50">
                      <div
                        className={`p-6 rounded-xl shadow-2xl max-w-md mx-4 ${isDark ? "bg-slate-800" : "bg-white"
                          }`}
                      >
                        <h3
                          className={`text-xl font-bold mb-4 ${isDark ? "text-gray-200" : "text-gray-900"
                            }`}
                        >
                          Delete Blog?
                        </h3>
                        <p
                          className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                        >
                          Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isDark
                              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
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
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Enhanced Empty State
            <div className="text-center py-16 px-4">
              {searchQuery ? (
                // No Search Results
                <div className="max-w-md mx-auto">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isDark ? "bg-slate-700" : "bg-slate-200"
                    }`}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      className={`text-4xl ${isDark ? "text-gray-500" : "text-gray-400"}`}
                    />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-gray-200" : "text-gray-900"
                    }`}>
                    No Blogs Found
                  </h3>
                  <p className={`text-base mb-2 ${isDark ? "text-gray-400" : "text-gray-600"
                    }`}>
                    No blogs match your search for <span className="font-semibold">"{searchQuery}"</span>
                  </p>
                  <p className={`text-sm mb-6 ${isDark ? "text-gray-500" : "text-gray-500"
                    }`}>
                    Try different keywords or check your spelling
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setSearchQuery("")}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${isDark
                        ? "bg-slate-700 text-gray-200 hover:bg-slate-600"
                        : "bg-slate-200 text-gray-700 hover:bg-slate-300"
                        }`}
                    >
                      <FontAwesomeIcon icon={faTimes} className="mr-2" />
                      Clear Search
                    </button>
                    <Link
                      to="/create-blog"
                      className={`px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 ${isDark
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-violet-600 hover:bg-violet-700"
                        }`}
                    >
                      <FontAwesomeIcon icon={faPen} className="mr-2" />
                      Create New Blog
                    </Link>
                  </div>
                </div>
              ) : (
                // No Blogs at All
                <div className="max-w-md mx-auto">
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDark
                    ? "bg-linear-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30"
                    : "bg-linear-to-br from-violet-100 to-blue-100 border border-violet-200"
                    }`}>
                    <FontAwesomeIcon
                      icon={faPen}
                      className={`text-5xl ${isDark ? "text-purple-400" : "text-violet-600"
                        }`}
                    />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-gray-200" : "text-gray-900"
                    }`}>
                    Start Your Blogging Journey
                  </h3>
                  <p className={`text-base mb-6 ${isDark ? "text-gray-400" : "text-gray-600"
                    }`}>
                    You haven't created any blogs yet. Share your thoughts, ideas, and stories with the world!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/create-blog"
                      className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 ${isDark
                        ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30"
                        : "bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/30"
                        }`}
                    >
                      <FontAwesomeIcon icon={faPen} className="mr-2" />
                      Create Your First Blog
                    </Link>
                  </div>

                  {/* Tips Section */}
                  <div className={`mt-10 p-6 rounded-xl text-left ${isDark ? "bg-slate-800/50 border border-slate-700" : "bg-slate-50 border border-slate-200"
                    }`}>
                    <h4 className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-200" : "text-gray-900"
                      }`}>
                      💡 Quick Tips for Your First Blog
                    </h4>
                    <ul className={`space-y-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"
                      }`}>
                      <li className="flex items-start gap-2">
                        <span className={isDark ? "text-purple-400" : "text-violet-600"}>•</span>
                        <span>Choose a topic you're passionate about</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={isDark ? "text-purple-400" : "text-violet-600"}>•</span>
                        <span>Write a catchy title to grab attention</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={isDark ? "text-purple-400" : "text-violet-600"}>•</span>
                        <span>Add relevant tags to help others find your content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className={isDark ? "text-purple-400" : "text-violet-600"}>•</span>
                        <span>Include images to make your blog more engaging</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
