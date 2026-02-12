import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import { fetchAuthorProfile } from "../../helper/userApi";
import BlogCard from "../../Components/BlogCard/BlogCard";
import FollowButton from "../../Components/FollowButton/FollowButton";
import AuthorProfileSkeleton from "../../Components/skeletons/AuthorProfileSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const AuthorProfile = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === "dark";

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followerCount, setFollowerCount] = useState(0);

  const isOwnProfile = user && user._id === id;

  useEffect(() => {
    setLoading(true);
    fetchAuthorProfile(id)
      .then((data) => {
        setAuthor(data);
        setFollowerCount(data.followers?.length || 0);
      })
      .catch(() => setAuthor(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <AuthorProfileSkeleton />;

  if (!author) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <FontAwesomeIcon icon={faUser} className={`text-5xl mb-4 ${isDark ? "text-gray-700" : "text-gray-300"}`} />
        <p className={`text-lg font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Author not found</p>
      </div>
    );
  }

  const isFollowing = user && author.followers?.includes(user._id);
  const joinDate = new Date(author.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      {/* Author Header */}
      <div className={`rounded-md border p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="flex flex-col items-center text-center">
          {author.photoURL ? (
            <img
              src={author.photoURL}
              alt={author.name}
              className="w-28 h-28 rounded-full object-cover shadow-md mb-4"
            />
          ) : (
            <div className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold shadow-md mb-4 ${isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"}`}>
              {author.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <h1 className={`text-2xl font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {author.name}
          </h1>

          {author.bio && (
            <p className={`text-sm max-w-lg mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {author.bio}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
            {author.location && (
              <span className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {author.location}
              </span>
            )}
            <span className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              <FontAwesomeIcon icon={faCalendarAlt} /> Joined {joinDate}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-4">
            <div className="text-center">
              <div className={`text-lg font-black ${isDark ? "text-white" : "text-gray-900"}`}>{followerCount}</div>
              <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Followers</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-black ${isDark ? "text-white" : "text-gray-900"}`}>{author.following?.length || 0}</div>
              <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Following</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-black ${isDark ? "text-white" : "text-gray-900"}`}>{author.blogs?.length || 0}</div>
              <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Posts</div>
            </div>
          </div>

          {/* Follow / Edit Profile */}
          {isOwnProfile ? (
            <Link
              to="/settings"
              className="px-4 py-1.5 rounded-md text-sm font-bold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
            >
              Edit Profile
            </Link>
          ) : user ? (
            <FollowButton
              targetUserId={id}
              initialFollowing={isFollowing}
              onFollowChange={(delta) => setFollowerCount((c) => c + delta)}
            />
          ) : null}
        </div>
      </div>

      {/* Author's Blogs */}
      <h2 className={`text-xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        Posts by {author.name}
      </h2>

      {author.blogs?.length === 0 ? (
        <div className={`text-center py-12 rounded-md border ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            No published posts yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {author.blogs?.map((blog) => (
            <Link key={blog._id} to={`/blog-details/${blog._id}`}>
              <BlogCard data={blog} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorProfile;
