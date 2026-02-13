import { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useSiteConfig } from "../../contexts/SiteConfigContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faSave, faSpinner, faBan, faCheck, faUsers, faNewspaper, faEnvelope, faChartBar, faGauge, faPalette, faImage, faColumns, faBars, faXmark, faGear, faFlag, faClock, faTimes } from "@fortawesome/free-solid-svg-icons";
import { fetchDashboardStats, banUser as banUserApi, unbanUser as unbanUserApi, fetchAdminMessages, markMessageRead as markMessageReadApi, fetchReports, updateReportStatus, fetchPendingBlogs, approveBlog as approveBlogApi, rejectBlog as rejectBlogApi } from "../../helper/adminApi";
import toast from "react-hot-toast";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Admin = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { siteConfig, refreshConfig } = useSiteConfig();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [saving, setSaving] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dashboard state
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [banTarget, setBanTarget] = useState(null);
  const [banLoading, setBanLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [reportFilter, setReportFilter] = useState("");
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Form states
  const [navbarForm, setNavbarForm] = useState(siteConfig.navbar);
  const [heroForm, setHeroForm] = useState(siteConfig.hero);
  const [footerForm, setFooterForm] = useState(siteConfig.footer);

  // Sync form state when siteConfig loads
  useEffect(() => {
    setNavbarForm(siteConfig.navbar);
    setHeroForm(siteConfig.hero);
    setFooterForm(siteConfig.footer);
  }, [siteConfig]);

  // Body scroll lock for mobile drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Escape key to close mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileMenuOpen]);

  const handleSave = async (section, data) => {
    setSaving(true);
    const saveToast = toast.loading("Saving...");
    try {
      const response = await fetch(`${API_URL}/api/site-config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [section]: data }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Save failed");
      }
      await refreshConfig();
      toast.success("Settings saved!", { id: saveToast });
    } catch (error) {
      toast.error(error.message, { id: saveToast });
    } finally {
      setSaving(false);
    }
  };

  // Fetch stats when Dashboard or Users tab is active
  useEffect(() => {
    if (activeTab === "dashboard" || activeTab === "users") {
      setLoadingStats(true);
      fetchDashboardStats()
        .then((data) => setStats(data))
        .catch((err) => toast.error(err.message))
        .finally(() => setLoadingStats(false));
    }
    if (activeTab === "messages") {
      setLoadingMessages(true);
      fetchAdminMessages()
        .then((data) => setMessages(data))
        .catch((err) => toast.error(err.message))
        .finally(() => setLoadingMessages(false));
    }
    if (activeTab === "reports") {
      setLoadingReports(true);
      fetchReports(reportFilter || undefined)
        .then((data) => setReports(data))
        .catch((err) => toast.error(err.message))
        .finally(() => setLoadingReports(false));
    }
    if (activeTab === "pending") {
      setLoadingPending(true);
      fetchPendingBlogs()
        .then((data) => setPendingBlogs(data))
        .catch((err) => toast.error(err.message))
        .finally(() => setLoadingPending(false));
    }
  }, [activeTab, reportFilter]);

  const handleBanToggle = async (u) => {
    try {
      if (u.isBanned) {
        await unbanUserApi(u._id);
        toast.success(`${u.name} has been unbanned`);
      } else {
        await banUserApi(u._id);
        toast.success(`${u.name} has been banned`);
      }
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleMarkRead = async (msgId) => {
    try {
      await markMessageReadApi(msgId);
      setMessages((prev) => prev.map((m) => m._id === msgId ? { ...m, read: true } : m));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateReportStatus = async (reportId, status) => {
    try {
      await updateReportStatus(reportId, status);
      setReports((prev) => prev.map((r) => r._id === reportId ? { ...r, status } : r));
      toast.success(`Report marked as ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: faGauge },
    { id: "pending", label: "Pending", icon: faClock },
    { id: "users", label: "Users", icon: faUsers },
    { id: "messages", label: "Messages", icon: faEnvelope },
    { id: "reports", label: "Reports", icon: faFlag },
    { id: "navbar", label: "Navbar", icon: faPalette },
    { id: "hero", label: "Hero", icon: faImage },
    { id: "footer", label: "Footer", icon: faColumns },
  ];

  const navSections = [
    {
      label: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", icon: faGauge },
        { id: "pending", label: "Pending", icon: faClock },
        { id: "users", label: "Users", icon: faUsers },
        { id: "messages", label: "Messages", icon: faEnvelope },
        { id: "reports", label: "Reports", icon: faFlag },
      ],
    },
    {
      label: "Settings",
      items: [
        { id: "navbar", label: "Navbar", icon: faPalette },
        { id: "hero", label: "Hero", icon: faImage },
        { id: "footer", label: "Footer", icon: faColumns },
      ],
    },
  ];

  const unreadCount = messages.filter((m) => !m.read).length;
  const activeTabLabel = tabs.find((t) => t.id === activeTab)?.label || "Dashboard";

  const inputClass = `w-full px-4 py-2.5 rounded-md text-sm outline-none transition-all duration-300 ${
    isDark
      ? "bg-white/5 border border-white/10 text-white focus:border-purple-500/50"
      : "bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500/30"
  }`;

  const labelClass = `block text-sm font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`;

  const cardClass = `p-4 sm:p-5 rounded-md ${isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"}`;

  const renderSidebarNav = (onTabClick) => (
    <nav className="flex flex-col gap-5">
      {navSections.map((section) => (
        <div key={section.label}>
          <p className={`px-3 mb-2 text-[10px] font-bold uppercase tracking-wider ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}>
            {section.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {section.items.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (onTabClick) onTabClick();
                }}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium transition-colors text-left rounded-r-md ${
                  activeTab === tab.id
                    ? isDark
                      ? "border-l-[3px] border-brand-primary bg-brand-primary/10 text-brand-tertiary"
                      : "border-l-[3px] border-brand-primary bg-purple-50 text-brand-primary"
                    : isDark
                      ? "border-l-[3px] border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                      : "border-l-[3px] border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} className="w-4 text-[13px]" />
                {tab.label}
                {tab.id === "messages" && unreadCount > 0 && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="w-full py-4 sm:py-6">
      <div className="flex gap-5">

        {/* ── Desktop Sidebar ── */}
        <aside className="hidden md:flex flex-col w-60 shrink-0">
          <div className={`sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto rounded-md ${
            isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
          }`}>
            {/* Brand Header */}
            <div className={`px-4 py-4 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-brand-primary flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faGauge} className="text-white text-xs" />
                </div>
                <div>
                  <h1 className={`text-sm font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>Admin Panel</h1>
                  <p className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>Manage your site</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-3">
              {renderSidebarNav()}
            </div>
          </div>
        </aside>

        {/* ── Mobile Sidebar Overlay ── */}
        <div className={`md:hidden fixed inset-0 z-[90] transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Slide-in Drawer */}
          <aside className={`absolute top-0 left-0 h-full w-64 shadow-xl overflow-y-auto transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } ${isDark ? "bg-slate-900 border-r border-white/10" : "bg-white border-r border-gray-200"}`}>
            {/* Drawer Header */}
            <div className={`flex items-center justify-between px-4 py-4 border-b ${
              isDark ? "border-white/10" : "border-gray-200"
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-brand-primary flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faGauge} className="text-white text-xs" />
                </div>
                <h1 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Admin Panel</h1>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  isDark ? "text-gray-400 hover:bg-white/10" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* Drawer Navigation */}
            <div className="p-3">
              {renderSidebarNav(() => setMobileMenuOpen(false))}
            </div>
          </aside>
        </div>

        {/* ── Content Area ── */}
        <div className="flex-1 min-w-0">

          {/* Content Header Bar */}
          <div className={`flex items-center gap-3 px-4 py-3 mb-4 rounded-md ${
            isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"
          }`}>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                isDark ? "text-gray-400 hover:bg-white/10" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h2 className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {activeTabLabel}
            </h2>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-4">
              {loadingStats ? (
                <div className="flex justify-center py-12">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl text-brand-primary" />
                </div>
              ) : stats ? (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { icon: faUsers, label: "Users", value: stats.totalUsers },
                      { icon: faNewspaper, label: "Blogs", value: stats.totalBlogs },
                      { icon: faChartBar, label: "Avg/User", value: stats.totalUsers > 0 ? (stats.totalBlogs / stats.totalUsers).toFixed(1) : 0 },
                    ].map((card) => (
                      <div key={card.label} className={cardClass}>
                        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
                          <div className="w-9 h-9 rounded-md bg-brand-primary/10 flex items-center justify-center shrink-0">
                            <FontAwesomeIcon icon={card.icon} className="text-brand-primary text-sm" />
                          </div>
                          <div>
                            <p className={`text-[10px] sm:text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{card.label}</p>
                            <p className={`text-lg sm:text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{card.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* User Blog Counts */}
                  <div className={cardClass}>
                    <h2 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Users & Blog Counts</h2>

                    {/* Mobile: Card layout */}
                    <div className="flex flex-col gap-2 md:hidden">
                      {stats.users.map((u) => (
                        <div key={u._id} className={`flex items-center justify-between gap-3 p-2.5 rounded-md ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-semibold truncate ${isDark ? "text-gray-200" : "text-gray-900"}`}>{u.name}</p>
                            <p className={`text-xs truncate ${isDark ? "text-gray-500" : "text-gray-400"}`}>{u.email}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${isDark ? "bg-white/10 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
                              {u.blogCount} posts
                            </span>
                            {u.isAdmin ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Admin</span>
                            ) : u.isBanned ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Banned</span>
                            ) : (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop: Table layout */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                            <th className={`text-left py-2 px-3 font-semibold text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}>Name</th>
                            <th className={`text-left py-2 px-3 font-semibold text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}>Email</th>
                            <th className={`text-center py-2 px-3 font-semibold text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}>Blogs</th>
                            <th className={`text-center py-2 px-3 font-semibold text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.users.map((u) => (
                            <tr key={u._id} className={`border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                              <td className={`py-2 px-3 text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>{u.name}</td>
                              <td className={`py-2 px-3 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{u.email}</td>
                              <td className="py-2 px-3 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                                  {u.blogCount}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-center">
                                {u.isAdmin ? (
                                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Admin</span>
                                ) : u.isBanned ? (
                                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Banned</span>
                                ) : (
                                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* Pending Blogs Tab */}
          {activeTab === "pending" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Blogs Pending Review ({pendingBlogs.length})
                </h2>
              </div>
              {loadingPending ? (
                <div className="flex justify-center py-12">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl text-brand-primary" />
                </div>
              ) : pendingBlogs.length > 0 ? (
                <div className="space-y-3">
                  {pendingBlogs.map((blog) => (
                    <div key={blog._id} className={`${cardClass} flex flex-col sm:flex-row gap-3`}>
                      {/* Thumbnail */}
                      <div className="w-full sm:w-20 h-32 sm:h-20 rounded-md overflow-hidden shrink-0">
                        <img
                          src={blog.imageSrc || `https://picsum.photos/seed/${blog._id}/200/200`}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`text-sm font-bold line-clamp-1 ${isDark ? "text-gray-100" : "text-gray-900"}`}>{blog.title}</h3>
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-orange-500/20 text-orange-500 shrink-0">Pending</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          {blog.author?.photoURL ? (
                            <img src={blog.author.photoURL} alt="" className="w-4 h-4 rounded-full object-cover" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center ${isDark ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
                              {blog.author?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                          )}
                          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{blog.author?.name}</span>
                          <span className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                            {blog.category} · {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className={`text-xs line-clamp-2 mb-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                          {blog.body?.replace(/<[^>]*>/g, '').substring(0, 200) || "No content"}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              try {
                                await approveBlogApi(blog._id);
                                setPendingBlogs((prev) => prev.filter((b) => b._id !== blog._id));
                                toast.success(`"${blog.title}" approved and published!`);
                              } catch (err) {
                                toast.error(err.message);
                              }
                            }}
                            className="px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1"
                          >
                            <FontAwesomeIcon icon={faCheck} className="text-[10px]" /> Approve
                          </button>
                          <button
                            onClick={() => { setRejectTarget(blog._id); setRejectReason(""); }}
                            className="px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-1"
                          >
                            <FontAwesomeIcon icon={faTimes} className="text-[10px]" /> Reject
                          </button>
                        </div>
                      </div>

                      {/* Reject Reason Input */}
                      {rejectTarget === blog._id && (
                        <div className={`w-full sm:w-auto sm:min-w-[220px] flex flex-col gap-2 p-3 rounded-md ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                          <label className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Rejection Reason</label>
                          <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter reason for rejection..."
                            rows={2}
                            className={`w-full px-3 py-1.5 rounded-md border text-xs ${isDark
                              ? "bg-slate-700 border-gray-600 text-gray-200 placeholder-gray-500"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                            } focus:outline-none focus:ring-1 focus:ring-red-500`}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                try {
                                  await rejectBlogApi(blog._id, rejectReason);
                                  setPendingBlogs((prev) => prev.filter((b) => b._id !== blog._id));
                                  setRejectTarget(null);
                                  toast.success(`"${blog.title}" rejected`);
                                } catch (err) {
                                  toast.error(err.message);
                                }
                              }}
                              className="px-3 py-1 rounded text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                              Confirm Reject
                            </button>
                            <button
                              onClick={() => setRejectTarget(null)}
                              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}`}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-12 ${cardClass}`}>
                  <FontAwesomeIcon icon={faClock} className={`text-3xl mb-3 ${isDark ? "text-gray-700" : "text-gray-300"}`} />
                  <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>No blogs pending review</p>
                </div>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className={cardClass}>
              <h2 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>User Management</h2>
              {loadingStats ? (
                <div className="flex justify-center py-8">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-brand-primary" />
                </div>
              ) : stats ? (
                <div className="space-y-2">
                  {stats.users.map((u) => (
                    <div key={u._id} className={`p-2.5 rounded-md ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>{u.name}</p>
                            <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              u.isAdmin ? "bg-purple-100 text-purple-700" :
                              u.isBanned ? "bg-red-100 text-red-700" :
                              "bg-green-100 text-green-700"
                            }`}>
                              {u.isAdmin ? "Admin" : u.isBanned ? "Banned" : "Active"}
                            </span>
                          </div>
                          <p className={`text-xs truncate mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{u.email}</p>
                        </div>
                        {!u.isAdmin && (
                          <button
                            onClick={() => setBanTarget(u)}
                            className={`shrink-0 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                              u.isBanned
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                          >
                            <FontAwesomeIcon icon={u.isBanned ? faCheck : faBan} className="sm:mr-1" />
                            <span className="hidden sm:inline">{u.isBanned ? "Unban" : "Ban"}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className={cardClass}>
              <h2 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>User Messages</h2>
              {loadingMessages ? (
                <div className="flex justify-center py-8">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-brand-primary" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-10">
                  <FontAwesomeIcon icon={faEnvelope} className={`text-2xl mb-2 ${isDark ? "text-gray-600" : "text-gray-300"}`} />
                  <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>No messages yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`p-3 rounded-md border transition-colors ${
                        msg.read
                          ? isDark ? "border-gray-700/50 bg-gray-800/20" : "border-gray-100 bg-gray-50"
                          : isDark ? "border-purple-500/30 bg-purple-900/10" : "border-purple-200 bg-purple-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className={`text-sm font-bold truncate ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                              {msg.from?.name || "Unknown User"}
                            </p>
                            {!msg.read && (
                              <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0"></span>
                            )}
                          </div>
                          <p className={`text-[10px] mb-1.5 truncate ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            <span className="hidden sm:inline">{msg.from?.email} &middot; </span>{new Date(msg.createdAt).toLocaleDateString()}
                          </p>
                          <p className={`text-xs line-clamp-3 sm:line-clamp-none ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            {msg.text}
                          </p>
                        </div>
                        {!msg.read && (
                          <button
                            onClick={() => handleMarkRead(msg._id)}
                            className="shrink-0 px-2 py-1 rounded-md text-[10px] font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
                          >
                            <FontAwesomeIcon icon={faCheck} className="sm:hidden" />
                            <span className="hidden sm:inline">Mark Read</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className={cardClass}>
              <h2 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>User Reports</h2>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {[
                  { label: "All", value: "" },
                  { label: "Pending", value: "pending" },
                  { label: "Reviewed", value: "reviewed" },
                  { label: "Dismissed", value: "dismissed" },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setReportFilter(filter.value)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      reportFilter === filter.value
                        ? "bg-brand-primary text-white"
                        : isDark
                          ? "bg-white/5 text-gray-400 hover:bg-white/10"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {loadingReports ? (
                <div className="flex justify-center py-8">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-brand-primary" />
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-10">
                  <FontAwesomeIcon icon={faFlag} className={`text-2xl mb-2 ${isDark ? "text-gray-600" : "text-gray-300"}`} />
                  <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>No reports yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {reports.map((report) => (
                    <div
                      key={report._id}
                      className={`p-3 rounded-md border transition-colors ${
                        report.status === "pending"
                          ? isDark ? "border-purple-500/30 bg-purple-900/10" : "border-purple-200 bg-purple-50"
                          : isDark ? "border-gray-700/50 bg-gray-800/20" : "border-gray-100 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className={`text-sm font-bold truncate ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                              {report.reporter?.name || "Unknown User"}
                            </p>
                            <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              report.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                              report.status === "reviewed" ? "bg-green-100 text-green-700" :
                              "bg-gray-200 text-gray-600"
                            }`}>
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </span>
                          </div>
                          <p className={`text-[10px] mb-1.5 truncate ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            <span className="hidden sm:inline">{report.reporter?.email} &middot; </span>
                            Target: {report.targetType || "N/A"} &middot; {new Date(report.createdAt).toLocaleDateString()}
                          </p>
                          <p className={`text-xs line-clamp-3 sm:line-clamp-none ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            {report.reason}
                          </p>
                        </div>
                        {report.status === "pending" && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleUpdateReportStatus(report._id, "reviewed")}
                              className="px-2 py-1 rounded-md text-[10px] font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
                            >
                              <FontAwesomeIcon icon={faCheck} className="sm:mr-1" />
                              <span className="hidden sm:inline">Review</span>
                            </button>
                            <button
                              onClick={() => handleUpdateReportStatus(report._id, "dismissed")}
                              className="px-2 py-1 rounded-md text-[10px] font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                            >
                              <FontAwesomeIcon icon={faBan} className="sm:mr-1" />
                              <span className="hidden sm:inline">Dismiss</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navbar Tab */}
          {activeTab === "navbar" && (
            <div className="space-y-4">
              <div className={cardClass}>
                <h2 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Branding</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className={labelClass}>Logo Icon</label>
                    <input
                      className={inputClass}
                      value={navbarForm.logoIcon || ""}
                      onChange={(e) => setNavbarForm({ ...navbarForm, logoIcon: e.target.value })}
                      maxLength={2}
                      placeholder="H"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Site Name Prefix</label>
                    <input
                      className={inputClass}
                      value={navbarForm.siteNamePrefix || ""}
                      onChange={(e) => setNavbarForm({ ...navbarForm, siteNamePrefix: e.target.value })}
                      placeholder="Hexa"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Site Name Accent</label>
                    <input
                      className={inputClass}
                      value={navbarForm.siteNameAccent || ""}
                      onChange={(e) => setNavbarForm({ ...navbarForm, siteNameAccent: e.target.value })}
                      placeholder="Blog"
                    />
                  </div>
                </div>
              </div>

              <div className={cardClass}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Navigation Links</h2>
                  <button
                    onClick={() => setNavbarForm({ ...navbarForm, navLinks: [...(navbarForm.navLinks || []), { name: "", path: "/" }] })}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(navbarForm.navLinks || []).map((link, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        className={inputClass}
                        value={link.name}
                        onChange={(e) => {
                          const updated = [...navbarForm.navLinks];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setNavbarForm({ ...navbarForm, navLinks: updated });
                        }}
                        placeholder="Link Name"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          className={inputClass}
                          value={link.path}
                          onChange={(e) => {
                            const updated = [...navbarForm.navLinks];
                            updated[idx] = { ...updated[idx], path: e.target.value };
                            setNavbarForm({ ...navbarForm, navLinks: updated });
                          }}
                          placeholder="/path"
                        />
                        <button
                          onClick={() => {
                            const updated = navbarForm.navLinks.filter((_, i) => i !== idx);
                            setNavbarForm({ ...navbarForm, navLinks: updated });
                          }}
                          className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSave("navbar", navbarForm)}
                disabled={saving}
                className="w-full py-2.5 rounded-md text-sm font-semibold text-white bg-brand-primary hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={saving ? faSpinner : faSave} className={saving ? "animate-spin" : ""} />
                Save Navbar
              </button>
            </div>
          )}

          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              <div className={cardClass}>
                <h2 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Hero Content</h2>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Title</label>
                    <input
                      className={inputClass}
                      value={heroForm.title || ""}
                      onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                      placeholder="Discover Stories That Inspire"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Subtitle</label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={2}
                      value={heroForm.subtitle || ""}
                      onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      placeholder="Your go-to platform..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>CTA Text</label>
                      <input
                        className={inputClass}
                        value={heroForm.ctaText || ""}
                        onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                        placeholder="Start Reading"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>CTA Link</label>
                      <input
                        className={inputClass}
                        value={heroForm.ctaLink || ""}
                        onChange={(e) => setHeroForm({ ...heroForm, ctaLink: e.target.value })}
                        placeholder="/"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Background Image URL</label>
                    <input
                      className={inputClass}
                      value={heroForm.backgroundImage || ""}
                      onChange={(e) => setHeroForm({ ...heroForm, backgroundImage: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                    {heroForm.backgroundImage && (
                      <div className="mt-2 rounded-md overflow-hidden h-28">
                        <img src={heroForm.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSave("hero", heroForm)}
                disabled={saving}
                className="w-full py-2.5 rounded-md text-sm font-semibold text-white bg-brand-primary hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={saving ? faSpinner : faSave} className={saving ? "animate-spin" : ""} />
                Save Hero
              </button>
            </div>
          )}

          {/* Footer Tab */}
          {activeTab === "footer" && (
            <div className="space-y-4">
              {/* Brand Info */}
              <div className={cardClass}>
                <h2 className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Brand Info</h2>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Brand Name</label>
                    <input
                      className={inputClass}
                      value={footerForm.brandName || ""}
                      onChange={(e) => setFooterForm({ ...footerForm, brandName: e.target.value })}
                      placeholder="HexaBlog"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={2}
                      value={footerForm.brandDescription || ""}
                      onChange={(e) => setFooterForm({ ...footerForm, brandDescription: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Copyright Text</label>
                    <input
                      className={inputClass}
                      value={footerForm.copyrightText || ""}
                      onChange={(e) => setFooterForm({ ...footerForm, copyrightText: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className={cardClass}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Contact Info</h2>
                  <button
                    onClick={() => setFooterForm({ ...footerForm, contactInfo: [...(footerForm.contactInfo || []), { icon: "faEnvelope", text: "", type: "email" }] })}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(footerForm.contactInfo || []).map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <select
                        className={inputClass}
                        value={item.type}
                        onChange={(e) => {
                          const updated = [...footerForm.contactInfo];
                          const typeIconMap = { email: "faEnvelope", phone: "faPhone", location: "faLocationDot" };
                          updated[idx] = { ...updated[idx], type: e.target.value, icon: typeIconMap[e.target.value] || "faEnvelope" };
                          setFooterForm({ ...footerForm, contactInfo: updated });
                        }}
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="location">Location</option>
                      </select>
                      <div className="flex items-center gap-2">
                        <input
                          className={inputClass}
                          value={item.text}
                          onChange={(e) => {
                            const updated = [...footerForm.contactInfo];
                            updated[idx] = { ...updated[idx], text: e.target.value };
                            setFooterForm({ ...footerForm, contactInfo: updated });
                          }}
                          placeholder="Contact detail..."
                        />
                        <button
                          onClick={() => {
                            const updated = footerForm.contactInfo.filter((_, i) => i !== idx);
                            setFooterForm({ ...footerForm, contactInfo: updated });
                          }}
                          className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Link Columns */}
              <div className={cardClass}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Footer Link Columns</h2>
                  <button
                    onClick={() => setFooterForm({ ...footerForm, footerLinks: [...(footerForm.footerLinks || []), { title: "New Column", links: [{ name: "", path: "/" }] }] })}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add Column
                  </button>
                </div>
                <div className="space-y-4">
                  {(footerForm.footerLinks || []).map((column, colIdx) => (
                    <div key={colIdx} className={`p-3 rounded-md ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          className={inputClass}
                          value={column.title}
                          onChange={(e) => {
                            const updated = [...footerForm.footerLinks];
                            updated[colIdx] = { ...updated[colIdx], title: e.target.value };
                            setFooterForm({ ...footerForm, footerLinks: updated });
                          }}
                          placeholder="Column Title"
                        />
                        <button
                          onClick={() => {
                            const updated = footerForm.footerLinks.filter((_, i) => i !== colIdx);
                            setFooterForm({ ...footerForm, footerLinks: updated });
                          }}
                          className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-1.5 sm:pl-2">
                        {(column.links || []).map((link, linkIdx) => (
                          <div key={linkIdx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
                            <input
                              className={`${inputClass} text-xs`}
                              value={link.name}
                              onChange={(e) => {
                                const updated = [...footerForm.footerLinks];
                                const updatedLinks = [...updated[colIdx].links];
                                updatedLinks[linkIdx] = { ...updatedLinks[linkIdx], name: e.target.value };
                                updated[colIdx] = { ...updated[colIdx], links: updatedLinks };
                                setFooterForm({ ...footerForm, footerLinks: updated });
                              }}
                              placeholder="Link Name"
                            />
                            <div className="flex items-center gap-1.5">
                              <input
                                className={`${inputClass} text-xs`}
                                value={link.path}
                                onChange={(e) => {
                                  const updated = [...footerForm.footerLinks];
                                  const updatedLinks = [...updated[colIdx].links];
                                  updatedLinks[linkIdx] = { ...updatedLinks[linkIdx], path: e.target.value };
                                  updated[colIdx] = { ...updated[colIdx], links: updatedLinks };
                                  setFooterForm({ ...footerForm, footerLinks: updated });
                                }}
                                placeholder="/path"
                              />
                              <button
                                onClick={() => {
                                  const updated = [...footerForm.footerLinks];
                                  updated[colIdx] = { ...updated[colIdx], links: updated[colIdx].links.filter((_, i) => i !== linkIdx) };
                                  setFooterForm({ ...footerForm, footerLinks: updated });
                                }}
                                className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors"
                              >
                                <FontAwesomeIcon icon={faTrash} className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const updated = [...footerForm.footerLinks];
                            updated[colIdx] = { ...updated[colIdx], links: [...updated[colIdx].links, { name: "", path: "/" }] };
                            setFooterForm({ ...footerForm, footerLinks: updated });
                          }}
                          className={`text-xs font-semibold mt-1 ${isDark ? "text-brand-tertiary" : "text-brand-primary"} hover:underline`}
                        >
                          + Add Link
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className={cardClass}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Social Links</h2>
                  <button
                    onClick={() => setFooterForm({ ...footerForm, socialLinks: [...(footerForm.socialLinks || []), { icon: "fa-github", link: "https://" }] })}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(footerForm.socialLinks || []).map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <select
                        className={inputClass}
                        value={item.icon}
                        onChange={(e) => {
                          const updated = [...footerForm.socialLinks];
                          updated[idx] = { ...updated[idx], icon: e.target.value };
                          setFooterForm({ ...footerForm, socialLinks: updated });
                        }}
                      >
                        <option value="fa-facebook">Facebook</option>
                        <option value="fa-twitter">Twitter</option>
                        <option value="fa-github">GitHub</option>
                        <option value="fa-linkedin">LinkedIn</option>
                        <option value="fa-instagram">Instagram</option>
                        <option value="fa-youtube">YouTube</option>
                        <option value="fa-tiktok">TikTok</option>
                        <option value="fa-discord">Discord</option>
                      </select>
                      <div className="flex items-center gap-2">
                        <input
                          className={inputClass}
                          value={item.link}
                          onChange={(e) => {
                            const updated = [...footerForm.socialLinks];
                            updated[idx] = { ...updated[idx], link: e.target.value };
                            setFooterForm({ ...footerForm, socialLinks: updated });
                          }}
                          placeholder="https://..."
                        />
                        <button
                          onClick={() => {
                            const updated = footerForm.socialLinks.filter((_, i) => i !== idx);
                            setFooterForm({ ...footerForm, socialLinks: updated });
                          }}
                          className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSave("footer", footerForm)}
                disabled={saving}
                className="w-full py-2.5 rounded-md text-sm font-semibold text-white bg-brand-primary hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={saving ? faSpinner : faSave} className={saving ? "animate-spin" : ""} />
                Save Footer
              </button>
            </div>
          )}

        </div>
      </div>

      <ConfirmModal
        isOpen={!!banTarget}
        onClose={() => setBanTarget(null)}
        onConfirm={async () => {
          setBanLoading(true);
          try {
            await handleBanToggle(banTarget);
            setBanTarget(null);
          } finally {
            setBanLoading(false);
          }
        }}
        title={banTarget?.isBanned ? `Unban ${banTarget?.name}?` : `Ban ${banTarget?.name}?`}
        message={
          banTarget?.isBanned
            ? `This will restore ${banTarget?.name}'s ability to create blogs, comment, and like posts.`
            : `This will prevent ${banTarget?.name} from creating blogs, commenting, and liking posts.`
        }
        confirmText={banTarget?.isBanned ? "Unban" : "Ban"}
        confirmColor={banTarget?.isBanned ? "brand" : "red"}
        loading={banLoading}
      />
    </div>
  );
};

export default Admin;
