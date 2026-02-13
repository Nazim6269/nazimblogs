import {
  faPen,
  faSearch,
  faEdit,
  faTimes,
  faCheck,
  faChartBar,
  faChevronDown,
  faEye,
  faHeart,
  faComment,
  faCrown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileBlogCard from "../../Components/ProfileBlogCard/ProfileBlogCard";
import { fetchUserBlogs, deleteBlog as apiDeleteBlog, updateBlog as apiUpdateBlog } from "../../helper/blogApi";
import { fetchUserAnalytics } from "../../helper/userApi";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import ProfileEditForm from "../Profile/ProfileEditeForm"
import toast from "react-hot-toast";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import { stripHTML } from "../../utils/stripHTML";

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
    body: ""
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  // Profile related state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "Guest User",
    email: user?.email || "",
    bio: user?.bio || "No bio available yet.",
    location: user?.location || "Unknown",
    photoURL: user?.photoURL || null
  });

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const handleToggleAnalytics = async () => {
    if (!showAnalytics && !analytics) {
      try {
        setAnalyticsLoading(true);
        const data = await fetchUserAnalytics();
        setAnalytics(data);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setAnalyticsLoading(false);
      }
    }
    setShowAnalytics(!showAnalytics);
  };

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

  // Fetch user blogs from API
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoadingBlogs(true);
        const data = await fetchUserBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setFilteredBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    };
    loadBlogs();
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search functionality with debounced query
  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (blog.body && stripHTML(blog.body).toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
        (blog.tags && blog.tags.join(" ").toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
      );
      setFilteredBlogs(filtered);
    }
  }, [debouncedSearchQuery, blogs]);

  // Handle delete blog
  const handleDeleteBlog = async (id) => {
    try {
      await apiDeleteBlog(id);
      const updatedBlogs = blogs.filter(b => b._id !== id);
      setBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs);
      setShowDeleteConfirm(null);
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete blog");
    }
  };

  // Handle edit blog
  const handleEditClick = (blog) => {
    setEditingBlog(blog._id);
    setEditForm({
      title: blog.title,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      body: blog.body || ""
    });
  };

  // Profile edit handlers
  const handleProfileSave = (updated) => {
    const updatedProfile = { ...profile, ...updated };
    setProfile(updatedProfile);
    updateUser(updated);
    setIsEditingProfile(false);
  };

  // Handle update blog
  const handleUpdateBlog = async (id) => {
    try {
      const updated = await apiUpdateBlog(id, {
        title: editForm.title,
        body: editForm.body,
        tags: editForm.tags.split(",").map(t => t.trim()).filter(Boolean),
      });
      const updatedBlogs = blogs.map((b) => b._id === id ? updated : b);
      setBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs);
      setEditingBlog(null);
      toast.success("Blog updated successfully");
      setEditForm({ title: "", tags: "", body: "" });
    } catch (error) {
      toast.error(error.message || "Failed to update blog");
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingBlog(null);
    setEditForm({ title: "", tags: "", body: "" });
  };

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 flex flex-col items-center gap-4 transition-colors">
      {/* Header */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-3 sm:gap-4">
        <div className="relative">
          {profile.photoURL ? (
            <img src={profile.photoURL} alt={profile.name} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${isDark ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
              {profile.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <button
            onClick={() => setIsEditingProfile(true)}
            title="Edit profile"
            className={`absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isDark ? "bg-brand-primary hover:bg-purple-700" : "bg-alter-brand-primary hover:bg-alter-brand-secondary"}`}
          >
            <FontAwesomeIcon icon={faPen} className="text-white text-[10px]" />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className={`text-lg sm:text-xl font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>{profile.name}</h1>
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{profile.email}</p>
          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{profile.bio}</p>
        </div>

        <Link to="/create-blog" className={`px-3 py-1.5 rounded-md text-xs font-semibold shrink-0 ${isDark ? "bg-brand-primary text-white" : "bg-alter-brand-primary text-white"}`}>Create</Link>
      </div>

      {/* Bio edit */}
      {isEditingProfile && (
        <div className={`w-full max-w-3xl rounded-lg p-4 ${isDark ? "bg-slate-800" : "bg-gray-50 border border-gray-200"}`}>
          <ProfileEditForm
            initial={profile}
            onCancel={() => setIsEditingProfile(false)}
            onSave={handleProfileSave}
          />
        </div>
      )}

      {/* Stats */}
      <div className="w-full max-w-3xl grid grid-cols-4 gap-2">
        {[
          { label: "Posts", value: totalBlogs },
          { label: "Likes", value: totalLikes },
          { label: "Followers", value: user?.followers?.length || 0 },
          { label: "Following", value: user?.following?.length || 0 },
        ].map((s) => (
          <div key={s.label} className={`py-2.5 rounded-lg text-center ${isDark ? "bg-slate-800/60" : "bg-white border border-gray-100"}`}>
            <div className={`text-lg font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{s.value}</div>
            <div className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="w-full max-w-3xl">
        <button
          onClick={handleToggleAnalytics}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            isDark
              ? "bg-slate-800/60 text-gray-300 hover:bg-slate-800"
              : "bg-white border border-gray-100 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faChartBar} className="text-brand-primary" />
            Analytics
          </span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform duration-200 ${showAnalytics ? "rotate-180" : ""}`} />
        </button>

        {showAnalytics && (
          <div className={`mt-2 p-4 rounded-lg ${isDark ? "bg-slate-800/60" : "bg-white border border-gray-100"}`}>
            {analyticsLoading ? (
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`h-16 rounded-lg animate-pulse ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
                ))}
              </div>
            ) : analytics ? (
              <>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: "Total Views", value: analytics.totalViews, icon: faEye, color: "text-blue-400" },
                    { label: "Total Likes", value: analytics.totalLikes, icon: faHeart, color: "text-red-400" },
                    { label: "Total Comments", value: analytics.totalComments, icon: faComment, color: "text-green-400" },
                    { label: "Published", value: analytics.publishedCount, icon: faCheck, color: "text-emerald-400" },
                    { label: "Drafts", value: analytics.draftCount, icon: faEdit, color: "text-yellow-400" },
                    { label: "Followers", value: analytics.followerCount, icon: faCrown, color: "text-purple-400" },
                  ].map((s) => (
                    <div key={s.label} className={`p-3 rounded-lg text-center ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                      <FontAwesomeIcon icon={s.icon} className={`text-sm mb-1 ${s.color}`} />
                      <div className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{s.value}</div>
                      <div className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {analytics.mostPopular && (
                  <Link
                    to={`/blog-details/${analytics.mostPopular._id}`}
                    className={`block p-3 rounded-lg transition-colors ${
                      isDark ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className={`text-[10px] font-semibold mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      <FontAwesomeIcon icon={faCrown} className="text-yellow-400 mr-1" />
                      MOST POPULAR POST
                    </div>
                    <div className={`text-sm font-bold truncate ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                      {analytics.mostPopular.title}
                    </div>
                    <div className={`text-[10px] mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {analytics.mostPopular.views} views · {analytics.mostPopular.likes} likes · {analytics.mostPopular.comments} comments
                    </div>
                  </Link>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>

      {/* Blogs Section */}
      <div className={`w-full max-w-4xl border rounded-lg ${isDark ? "border-slate-700" : "border-gray-200"}`}
      >
        {/* Header with Search */}
        <div className={`p-3 border-b ${isDark ? "border-slate-700" : "border-gray-200"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <h2 className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>
              Your Blogs ({filteredBlogs.length})
            </h2>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search your blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 pl-10 rounded-md border transition-all duration-300 ${isDark
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
              {searchQuery !== debouncedSearchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div
                    className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${isDark ? "border-purple-500" : "border-violet-500"
                      }`}
                  ></div>
                </div>
              )}
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
          {searchQuery !== debouncedSearchQuery && (
            <div className="text-center py-4">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Searching...
              </p>
            </div>
          )}
          {loadingBlogs ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredBlogs.map((blog) => (
                <div key={blog._id}>
                  {editingBlog === blog._id ? (
                    // Edit Mode
                    <div className={`p-4 rounded-lg border space-y-3 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
                      <div>
                        <label className={`block text-xs font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Title</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className={`w-full px-3 py-1.5 rounded-md border text-sm ${isDark
                            ? "bg-slate-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-900"
                          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Tags</label>
                        <input
                          type="text"
                          value={editForm.tags}
                          onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                          className={`w-full px-3 py-1.5 rounded-md border text-sm ${isDark
                            ? "bg-slate-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-900"
                          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Content</label>
                        <textarea
                          value={editForm.body}
                          onChange={(e) => setEditForm({ ...editForm, body: e.target.value })}
                          rows={4}
                          className={`w-full px-3 py-1.5 rounded-md border text-sm ${isDark
                            ? "bg-slate-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-900"
                          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={handleCancelEdit}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${isDark
                            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          <FontAwesomeIcon icon={faTimes} className="mr-1" />
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateBlog(blog._id)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-colors ${isDark
                            ? "bg-brand-primary hover:bg-purple-700"
                            : "bg-alter-brand-primary hover:bg-alter-brand-secondary"
                          }`}
                        >
                          <FontAwesomeIcon icon={faCheck} className="mr-1" />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <ProfileBlogCard
                      data={blog}
                      editable
                      onEdit={handleEditClick}
                      onDelete={(id) => setShowDeleteConfirm(id)}
                      onPublish={async (id) => {
                        try {
                          await apiUpdateBlog(id, { status: "published" });
                          const updatedBlogs = blogs.map((b) => b._id === id ? { ...b, status: "published" } : b);
                          setBlogs(updatedBlogs);
                          setFilteredBlogs(updatedBlogs);
                          toast.success("Blog published!");
                        } catch (err) {
                          toast.error(err.message || "Failed to publish");
                        }
                      }}
                    />
                  )}

                  {/* Delete Confirmation Modal */}
                  <ConfirmModal
                    isOpen={showDeleteConfirm === blog._id}
                    onClose={() => setShowDeleteConfirm(null)}
                    onConfirm={() => handleDeleteBlog(blog._id)}
                    title="Delete Blog?"
                    message={`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`}
                    confirmText="Delete"
                    confirmColor="red"
                  />
                </div>
              ))}
            </div>
          ) : (
            // Enhanced Empty State
            <div className="text-center py-16 px-4">
              {searchQuery ? (
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
                    No blogs match your search for <span className="font-semibold">&quot;{searchQuery}&quot;</span>
                  </p>
                  <p className={`text-sm mb-6 ${isDark ? "text-gray-500" : "text-gray-500"
                    }`}>
                    Try different keywords or check your spelling
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setSearchQuery("")}
                      className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${isDark
                        ? "bg-slate-700 text-gray-200 hover:bg-slate-600"
                        : "bg-slate-200 text-gray-700 hover:bg-slate-300"
                        }`}
                    >
                      <FontAwesomeIcon icon={faTimes} className="mr-2" />
                      Clear Search
                    </button>
                    <Link
                      to="/create-blog"
                      className={`px-6 py-3 rounded-md font-bold text-white transition-all duration-300 ${isDark
                        ? "bg-brand-primary hover:bg-purple-700"
                        : "bg-alter-brand-primary hover:bg-alter-brand-secondary"
                        }`}
                    >
                      <FontAwesomeIcon icon={faPen} className="mr-2" />
                      Create New Blog
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto">
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-md flex items-center justify-center ${isDark
                    ? "bg-linear-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30"
                    : "bg-linear-to-br from-violet-100 to-blue-100 border border-violet-200"
                    }`}>
                    <FontAwesomeIcon
                      icon={faPen}
                      className={`text-5xl ${isDark ? "text-brand-tertiary" : "text-alter-brand-secondary"
                        }`}
                    />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-gray-200" : "text-gray-900"
                    }`}>
                    Start Your Blogging Journey
                  </h3>
                  <p className={`text-base mb-6 ${isDark ? "text-gray-400" : "text-gray-600"
                    }`}>
                    You haven&apos;t created any blogs yet. Share your thoughts, ideas, and stories with the world!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/create-blog"
                      className={`px-8 py-3 rounded-md font-bold text-white transition-all duration-300 transform hover:scale-105 ${isDark
                        ? "bg-brand-primary hover:bg-purple-700 shadow-md shadow-purple-500/30"
                        : "bg-alter-brand-primary hover:bg-alter-brand-secondary shadow-md shadow-violet-500/30"
                        }`}
                    >
                      <FontAwesomeIcon icon={faPen} className="mr-2" />
                      Create Your First Blog
                    </Link>
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
