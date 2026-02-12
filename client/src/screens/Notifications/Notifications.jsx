import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { fetchNotifications, markNotificationRead, markAllNotificationsRead } from "../../helper/notificationApi";
import NotificationsSkeleton from "../../Components/skeletons/NotificationsSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHeart, faComment, faUserPlus, faReply, faCheck } from "@fortawesome/free-solid-svg-icons";

const typeIcon = {
  like: faHeart,
  comment: faComment,
  follow: faUserPlus,
  reply: faReply,
};

const typeColor = {
  like: "text-red-400",
  comment: "text-blue-400",
  follow: "text-purple-400",
  reply: "text-green-400",
};

const timeAgo = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
};

const Notifications = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadNotifications = async (p = 1) => {
    try {
      const data = await fetchNotifications(p);
      if (p === 1) {
        setNotifications(data.notifications || []);
      } else {
        setNotifications((prev) => [...prev, ...(data.notifications || [])]);
      }
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch {
      if (p === 1) setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications(1);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {}
  };

  const handleClick = async (notif) => {
    if (!notif.read) {
      try {
        await markNotificationRead(notif._id);
        setNotifications((prev) =>
          prev.map((n) => (n._id === notif._id ? { ...n, read: true } : n))
        );
      } catch {}
    }
  };

  const getNotifLink = (notif) => {
    if (notif.type === "follow") return `/author/${notif.relatedUser?._id}`;
    if (notif.relatedBlog?._id) return `/blog-details/${notif.relatedBlog._id}`;
    return "#";
  };

  if (loading) return <NotificationsSkeleton />;

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 md:py-12 px-4">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <FontAwesomeIcon icon={faBell} className="text-brand-primary text-lg sm:text-xl" />
          <h1 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
            Notifications
          </h1>
        </div>
        {hasUnread && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-brand-primary hover:bg-purple-500/10 transition-colors"
          >
            <FontAwesomeIcon icon={faCheck} />
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className={`text-center py-20 rounded-md border ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}>
          <FontAwesomeIcon icon={faBell} className={`text-5xl mb-4 ${isDark ? "text-gray-700" : "text-gray-300"}`} />
          <p className={`text-lg font-bold mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            No notifications yet
          </p>
          <p className={`text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            When someone likes your post, comments, or follows you, it will show up here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((notif) => (
            <Link
              key={notif._id}
              to={getNotifLink(notif)}
              onClick={() => handleClick(notif)}
              className={`flex items-start gap-3 p-4 rounded-md border transition-all duration-200 ${
                notif.read
                  ? isDark
                    ? "bg-gray-900/30 border-gray-800/50 hover:bg-gray-800/50"
                    : "bg-white border-gray-100 hover:bg-gray-50"
                  : isDark
                    ? "bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10"
                    : "bg-purple-50 border-purple-200/50 hover:bg-purple-100/50"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                <FontAwesomeIcon
                  icon={typeIcon[notif.type] || faBell}
                  className={typeColor[notif.type] || "text-gray-400"}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-relaxed ${notif.read ? (isDark ? "text-gray-400" : "text-gray-500") : (isDark ? "text-gray-200" : "text-gray-800")}`}>
                  {notif.message}
                </p>
                <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                  {timeAgo(notif.createdAt)}
                </span>
              </div>
              {!notif.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-brand-primary flex-shrink-0 mt-1.5" />
              )}
            </Link>
          ))}

          {/* Load more */}
          {page < totalPages && (
            <button
              onClick={() => loadNotifications(page + 1)}
              className={`mt-4 px-6 py-2 rounded-md text-sm font-bold mx-auto transition-colors ${
                isDark ? "bg-white/5 text-gray-300 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
