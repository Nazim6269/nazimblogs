import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import { fetchAuthorProfile } from "../../helper/userApi";
import ProfileBlogCard from "../../Components/ProfileBlogCard/ProfileBlogCard";
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
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-4">
      <Helmet>
        <title>{author.name} | NazimBlogs</title>
        <meta name="description" content={author.bio || `Check out ${author.name}'s blog posts on NazimBlogs`} />
        <meta property="og:title" content={`${author.name} on NazimBlogs`} />
        <meta property="og:description" content={author.bio || `Check out ${author.name}'s blog posts`} />
        <meta property="og:image" content={author.photoURL || ""} />
      </Helmet>

      {/* Author Header */}
      <div className={`rounded-lg border p-4 sm:p-6 mb-5 ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-white border-gray-100"}`}>
        <div className="flex flex-col items-center text-center">
          {author.photoURL ? (
            <img src={author.photoURL} alt={author.name} className="w-20 h-20 rounded-full object-cover mb-3" />
          ) : (
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-3 ${isDark ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
              {author.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <h1 className={`text-lg font-bold mb-0.5 ${isDark ? "text-white" : "text-gray-900"}`}>{author.name}</h1>

          {author.bio && (
            <p className={`text-xs max-w-md mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{author.bio}</p>
          )}

          <div className="flex items-center gap-3 mb-3">
            {author.location && (
              <span className={`flex items-center gap-1 text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[10px]" /> {author.location}
              </span>
            )}
            <span className={`flex items-center gap-1 text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              <FontAwesomeIcon icon={faCalendarAlt} className="text-[10px]" /> Joined {joinDate}
            </span>
          </div>

          <div className="flex items-center gap-5 mb-3">
            <div className="text-center">
              <div className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{followerCount}</div>
              <div className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>Followers</div>
            </div>
            <div className="text-center">
              <div className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{author.following?.length || 0}</div>
              <div className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>Following</div>
            </div>
            <div className="text-center">
              <div className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{author.blogs?.length || 0}</div>
              <div className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>Posts</div>
            </div>
          </div>

          {isOwnProfile ? (
            <Link to="/settings" className="px-3 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors">
              Edit Profile
            </Link>
          ) : user ? (
            <FollowButton targetUserId={id} initialFollowing={isFollowing} onFollowChange={(delta) => setFollowerCount((c) => c + delta)} />
          ) : null}
        </div>
      </div>

      <h2 className={`text-sm font-bold mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        Posts by {author.name}
      </h2>

      {author.blogs?.length === 0 ? (
        <div className={`text-center py-8 rounded-lg ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          <p className="text-xs">No published posts yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {author.blogs?.map((blog) => (
            <ProfileBlogCard key={blog._id} data={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorProfile;
