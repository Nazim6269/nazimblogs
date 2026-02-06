import { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useSiteConfig } from "../../contexts/SiteConfigContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faSave, faSpinner, faBan, faCheck, faUsers, faNewspaper, faEnvelope, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { fetchDashboardStats, banUser as banUserApi, unbanUser as unbanUserApi, fetchAdminMessages, markMessageRead as markMessageReadApi } from "../../helper/adminApi";
import toast from "react-hot-toast";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Admin = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { siteConfig, refreshConfig } = useSiteConfig();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [saving, setSaving] = useState(false);

  // Dashboard state
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [banTarget, setBanTarget] = useState(null);
  const [banLoading, setBanLoading] = useState(false);

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
  }, [activeTab]);

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

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "users", label: "Users" },
    { id: "messages", label: "Messages" },
    { id: "navbar", label: "Navbar" },
    { id: "hero", label: "Hero" },
    { id: "footer", label: "Footer" },
  ];

  const inputClass = `w-full px-4 py-2.5 rounded-md text-sm outline-none transition-all duration-300 ${
    isDark
      ? "bg-white/5 border border-white/10 text-white focus:border-purple-500/50"
      : "bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500/30"
  }`;

  const labelClass = `block text-sm font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`;

  const cardClass = `p-6 rounded-md ${isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-sm"}`;

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4">
      <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
        Admin Panel
      </h1>
      <p className={`text-sm mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Manage users, view stats, and configure your site.
      </p>

      {/* Tabs */}
      <div className={`flex flex-wrap gap-1 mb-8 p-1 rounded-md ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-brand-primary text-white shadow-md"
                : isDark
                  ? "text-gray-400 hover:text-white hover:bg-white/5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {loadingStats ? (
            <div className="flex justify-center py-12">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-2xl text-brand-primary" />
            </div>
          ) : stats ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={cardClass}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-brand-primary/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUsers} className="text-brand-primary" />
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Total Users</p>
                      <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{stats.totalUsers}</p>
                    </div>
                  </div>
                </div>
                <div className={cardClass}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-brand-primary/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faNewspaper} className="text-brand-primary" />
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Total Blogs</p>
                      <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{stats.totalBlogs}</p>
                    </div>
                  </div>
                </div>
                <div className={cardClass}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-brand-primary/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faChartBar} className="text-brand-primary" />
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Avg Blogs/User</p>
                      <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                        {stats.totalUsers > 0 ? (stats.totalBlogs / stats.totalUsers).toFixed(1) : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Blog Counts Table */}
              <div className={cardClass}>
                <h2 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Users & Blog Counts</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                        <th className={`text-left py-2.5 px-3 font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Name</th>
                        <th className={`text-left py-2.5 px-3 font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Email</th>
                        <th className={`text-center py-2.5 px-3 font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Blogs</th>
                        <th className={`text-center py-2.5 px-3 font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.users.map((u) => (
                        <tr key={u._id} className={`border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                          <td className={`py-2.5 px-3 ${isDark ? "text-gray-200" : "text-gray-900"}`}>{u.name}</td>
                          <td className={`py-2.5 px-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{u.email}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                              {u.blogCount}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {u.isAdmin ? (
                              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">Admin</span>
                            ) : u.isBanned ? (
                              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">Banned</span>
                            ) : (
                              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>
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

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className={cardClass}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>User Management</h2>
            {loadingStats ? (
              <div className="flex justify-center py-8">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-brand-primary" />
              </div>
            ) : stats ? (
              <div className="space-y-3">
                {stats.users.map((u) => (
                  <div key={u._id} className={`flex items-center justify-between p-3 rounded-md ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                    <div className="min-w-0">
                      <p className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>{u.name}</p>
                      <p className={`text-xs truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>{u.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        u.isAdmin ? "bg-purple-100 text-purple-700" :
                        u.isBanned ? "bg-red-100 text-red-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {u.isAdmin ? "Admin" : u.isBanned ? "Banned" : "Active"}
                      </span>
                      {!u.isAdmin && (
                        <button
                          onClick={() => setBanTarget(u)}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                            u.isBanned
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-red-600 text-white hover:bg-red-700"
                          }`}
                        >
                          <FontAwesomeIcon icon={u.isBanned ? faCheck : faBan} className="mr-1" />
                          {u.isBanned ? "Unban" : "Ban"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === "messages" && (
        <div className="space-y-6">
          <div className={cardClass}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>User Messages</h2>
            {loadingMessages ? (
              <div className="flex justify-center py-8">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-brand-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12">
                <FontAwesomeIcon icon={faEnvelope} className={`text-3xl mb-3 ${isDark ? "text-gray-600" : "text-gray-300"}`} />
                <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>No messages yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-4 rounded-md border transition-colors ${
                      msg.read
                        ? isDark ? "border-gray-700/50 bg-gray-800/20" : "border-gray-100 bg-gray-50"
                        : isDark ? "border-purple-500/30 bg-purple-900/10" : "border-purple-200 bg-purple-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                            {msg.from?.name || "Unknown User"}
                          </p>
                          {!msg.read && (
                            <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0"></span>
                          )}
                        </div>
                        <p className={`text-xs mb-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                          {msg.from?.email} &middot; {new Date(msg.createdAt).toLocaleDateString()}
                        </p>
                        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          {msg.text}
                        </p>
                      </div>
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkRead(msg._id)}
                          className="shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navbar Tab */}
      {activeTab === "navbar" && (
        <div className="space-y-6">
          <div className={cardClass}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Branding</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Navigation Links</h2>
              <button
                onClick={() => setNavbarForm({ ...navbarForm, navLinks: [...(navbarForm.navLinks || []), { name: "", path: "/" }] })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add Link
              </button>
            </div>
            <div className="space-y-3">
              {(navbarForm.navLinks || []).map((link, idx) => (
                <div key={idx} className="flex items-center gap-3">
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
                    className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSave("navbar", navbarForm)}
            disabled={saving}
            className="w-full py-3 rounded-md font-bold text-white bg-brand-primary hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={saving ? faSpinner : faSave} className={saving ? "animate-spin" : ""} />
            Save Navbar Settings
          </button>
        </div>
      )}

      {/* Hero Tab */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          <div className={cardClass}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Hero Content</h2>
            <div className="space-y-4">
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
                  rows={3}
                  value={heroForm.subtitle || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                  placeholder="Your go-to platform..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>CTA Button Text</label>
                  <input
                    className={inputClass}
                    value={heroForm.ctaText || ""}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                    placeholder="Start Reading"
                  />
                </div>
                <div>
                  <label className={labelClass}>CTA Button Link</label>
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
                  placeholder="https://example.com/image.jpg (leave empty for gradient)"
                />
                {heroForm.backgroundImage && (
                  <div className="mt-3 rounded-md overflow-hidden h-32">
                    <img src={heroForm.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSave("hero", heroForm)}
            disabled={saving}
            className="w-full py-3 rounded-md font-bold text-white bg-brand-primary hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={saving ? faSpinner : faSave} className={saving ? "animate-spin" : ""} />
            Save Hero Settings
          </button>
        </div>
      )}

      {/* Footer Tab */}
      {activeTab === "footer" && (
        <div className="space-y-6">
          {/* Brand Info */}
          <div className={cardClass}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Brand Info</h2>
            <div className="space-y-4">
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
                <label className={labelClass}>Brand Description</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
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
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Contact Info</h2>
              <button
                onClick={() => setFooterForm({ ...footerForm, contactInfo: [...(footerForm.contactInfo || []), { icon: "faEnvelope", text: "", type: "email" }] })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {(footerForm.contactInfo || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
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
                    className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Link Columns */}
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Footer Link Columns</h2>
              <button
                onClick={() => setFooterForm({ ...footerForm, footerLinks: [...(footerForm.footerLinks || []), { title: "New Column", links: [{ name: "", path: "/" }] }] })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add Column
              </button>
            </div>
            <div className="space-y-6">
              {(footerForm.footerLinks || []).map((column, colIdx) => (
                <div key={colIdx} className={`p-4 rounded-md ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                  <div className="flex items-center gap-3 mb-3">
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
                      className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2 pl-2">
                    {(column.links || []).map((link, linkIdx) => (
                      <div key={linkIdx} className="flex items-center gap-2">
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
                          <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                        </button>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Social Links</h2>
              <button
                onClick={() => setFooterForm({ ...footerForm, socialLinks: [...(footerForm.socialLinks || []), { icon: "fa-github", link: "https://" }] })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-brand-primary text-white hover:bg-purple-700 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {(footerForm.socialLinks || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
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
                    className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSave("footer", footerForm)}
            disabled={saving}
            className="w-full py-3 rounded-md font-bold text-white bg-brand-primary hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={saving ? faSpinner : faSave} className={saving ? "animate-spin" : ""} />
            Save Footer Settings
          </button>
        </div>
      )}
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
