import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { fetchUnreadCount, fetchNotifications, markAllNotificationsRead, markNotificationRead } from "../../helper/notificationApi";
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
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
};

const NotificationBell = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Poll unread count
  useEffect(() => {
    const fetchCount = () => {
      fetchUnreadCount()
        .then((data) => setUnreadCount(data.count))
        .catch(() => {});
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleOpen = async () => {
    if (showDropdown) {
      setShowDropdown(false);
      return;
    }
    setShowDropdown(true);
    setLoading(true);
    try {
      const data = await fetchNotifications(1);
      setNotifications(data.notifications || []);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {}
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      try {
        await markNotificationRead(notif._id);
        setUnreadCount((c) => Math.max(0, c - 1));
        setNotifications((prev) =>
          prev.map((n) => (n._id === notif._id ? { ...n, read: true } : n))
        );
      } catch {}
    }
    setShowDropdown(false);
  };

  const getNotifLink = (notif) => {
    if (notif.type === "follow") return `/author/${notif.relatedUser?._id}`;
    if (notif.relatedBlog?._id) return `/blog-details/${notif.relatedBlog._id}`;
    return "#";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleOpen}
        className={`relative w-10 h-10 rounded-md flex items-center justify-center transition-all duration-300 ${
          isDark ? "bg-white/5 text-gray-300 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <FontAwesomeIcon icon={faBell} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div
          className={`absolute right-0 mt-3 w-80 rounded-md shadow-lg border max-h-[400px] overflow-y-auto z-50 ${
            isDark ? "bg-[#0f172a] border-white/10" : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}
          <div className={`sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-white/10 bg-[#0f172a]" : "border-gray-100 bg-white"}`}>
            <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Notifications
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline"
              >
                <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications list */}
          {loading ? (
            <div className="py-8 text-center">
              <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-8 text-center">
              <FontAwesomeIcon icon={faBell} className={`text-2xl mb-2 ${isDark ? "text-gray-700" : "text-gray-300"}`} />
              <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>No notifications</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.slice(0, 10).map((notif) => (
                <Link
                  key={notif._id}
                  to={getNotifLink(notif)}
                  onClick={() => handleNotificationClick(notif)}
                  className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                    notif.read
                      ? isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                      : isDark ? "bg-purple-500/5 hover:bg-purple-500/10" : "bg-purple-50 hover:bg-purple-100/50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                    <FontAwesomeIcon icon={typeIcon[notif.type] || faBell} className={`text-xs ${typeColor[notif.type] || "text-gray-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs leading-relaxed ${notif.read ? (isDark ? "text-gray-400" : "text-gray-500") : (isDark ? "text-gray-200" : "text-gray-800")}`}>
                      {notif.message}
                    </p>
                    <span className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                      {timeAgo(notif.createdAt)}
                    </span>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0 mt-1.5" />
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className={`sticky bottom-0 border-t px-4 py-2 ${isDark ? "border-white/10 bg-[#0f172a]" : "border-gray-100 bg-white"}`}>
            <Link
              to="/notifications"
              onClick={() => setShowDropdown(false)}
              className="block text-center text-xs font-semibold text-brand-primary hover:underline"
            >
              See all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
