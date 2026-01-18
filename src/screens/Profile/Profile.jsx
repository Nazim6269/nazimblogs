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
import { getBlogs, deleteBlog, updateBlog } from "../../helper/localStorage";
import { useTheme } from "../../hooks/useTheme";
import ProfileEditForm from "./ProfileEditeForm";
import ProfileInfo from "./ProfileInfo";
import ProfileBlogsGrid from "./ProfileBlogsGrid";



const Profile = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
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
    name: "Nazim Uddin",
    email: "nazimdev10022001@gmail.com",
    bio:
      "This is Nazim, who wants to be a full stack engineer though it's not easy at all. But he is always trying his best.",
    location: "Chittagong, Bangladesh",
  });

  // Derived stats
  const totalBlogs = blogs.length;
  const totalLikes = blogs.reduce((s, b) => s + (Number(b.likes) || 0), 0);

  useEffect(() => {
    const storedBlogs = getBlogs() || [];
    setBlogs(storedBlogs);
    setFilteredBlogs(storedBlogs);
  }, []);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsSearching(false);
    }, 300); // Reduced to 300ms for better UX

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search functionality with debounced query
  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const query = debouncedSearchQuery.toLowerCase();
      const filtered = blogs.filter((blog) => {
        const titleMatch = blog.title?.toLowerCase().includes(query);
        const tagsMatch = blog.tags?.toLowerCase().includes(query);
        const contentMatch = blog.content?.toLowerCase().includes(query);
        return titleMatch || tagsMatch || contentMatch;
      });
      setFilteredBlogs(filtered);
    }
  }, [debouncedSearchQuery, blogs]);

  // Handle delete blog
  const handleDeleteBlog = (id) => {
    const updatedBlogs = deleteBlog(id);
    setBlogs(updatedBlogs);
    setShowDeleteConfirm(null);
    // Clear search if deleting filtered results
    if (searchQuery && filteredBlogs.length === 1) {
      setSearchQuery("");
    }
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
    setProfile((p) => ({ ...p, ...updated }));
    setIsEditingProfile(false);
  };

  // Handle update blog
  const handleUpdateBlog = (id) => {
    const updatedBlogs = updateBlog(id, editForm);
    setBlogs(updatedBlogs);
    setEditingBlog(null);
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
      <ProfileInfo profile={profile} handleToggleFollow={handleToggleFollow} isFollowing={isFollowing} setIsFollowing={setIsFollowing} />

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
        className={`w-full max-w-6xl border rounded-xl ${isDark ? "border-gray-600" : "border-gray-300"}`}
      >
        {/* Header with Search */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2
              className={`text-3xl font-semibold ${isDark ? "text-gray-200" : "text-gray-900"}`}
            >
              Your Blogs ({totalBlogs})
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
                  } focus:outline-none focus:ring-2 ${isDark ? "focus:ring-purple-500/50" : "focus:ring-violet-500/50"}`}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
              {/* Loading indicator when debouncing */}
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div
                    className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${isDark ? "border-purple-500" : "border-violet-500"}`}
                  ></div>
                </div>
              )}
              {/* Clear button */}
              {searchQuery && !isSearching && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${isDark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"}`}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <ProfileBlogsGrid
          blogs={filteredBlogs}
          isSearching={isSearching}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleEditClick={handleEditClick}
          handleUpdateBlog={handleUpdateBlog}
          handleDeleteBlog={handleDeleteBlog}
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default Profile;