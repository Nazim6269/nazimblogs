import { useState } from "react";
import { followUser, unfollowUser } from "../../helper/userApi";
import { useTheme } from "../../hooks/useTheme";
import toast from "react-hot-toast";

const FollowButton = ({ targetUserId, initialFollowing = false, onFollowChange }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(targetUserId);
        setIsFollowing(false);
        onFollowChange?.(-1);
      } else {
        await followUser(targetUserId);
        setIsFollowing(true);
        onFollowChange?.(1);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all duration-300 ${
        isFollowing
          ? isDark
            ? "bg-white/10 text-gray-300 hover:bg-red-500/20 hover:text-red-400"
            : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500"
          : "bg-brand-primary text-white hover:bg-purple-700"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
