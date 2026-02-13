import {
  faMoon,
  faSearch,
  faSun,
  faChevronDown,
  faUser,
  faGear,
  faPenNib,
  faSignOutAlt,
  faBars,
  faClose,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import { useSiteConfig } from "../../contexts/SiteConfigContext";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchCategoryCounts } from "../../helper/blogApi";
import NotificationBell from "../NotificationBell/NotificationBell";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { siteConfig } = useSiteConfig();
  const isDark = theme === "dark";
  const { siteNamePrefix, siteNameAccent, logoIcon, navLinks } = siteConfig.navbar;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [categoryCounts, setCategoryCounts] = useState({});

  // Fetch category counts
  useEffect(() => {
    fetchCategoryCounts()
      .then((data) => setCategoryCounts(data))
      .catch(() => setCategoryCounts({}));
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync debounced search to URL
  useEffect(() => {
    if (debouncedSearch !== null) {
      if (debouncedSearch.trim()) {
        setSearchParams({ search: debouncedSearch.trim() });
        // If not on home page, maybe redirect?
        // For now just update params. If BlogCards is on home, it will pick it up.
      } else {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        setSearchParams(newParams);
      }
    }
  }, [debouncedSearch]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? "py-1.5" : "py-2.5"}`}>
      <nav
        className={`
          max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
          rounded-md transition-all duration-500
          ${(isScrolled || isMobileMenuOpen)
            ? (isDark ? "bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-md" : "bg-white/80 backdrop-blur-xl border border-black/5 shadow-md")
            : "bg-transparent"
          }
        `}
      >
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-brand-primary rounded-md flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:rotate-12 transition-transform duration-300">
              {logoIcon}
            </div>
            <span
              className={`text-xl font-bold tracking-tight transition-all duration-500 hidden sm:block ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              {siteNamePrefix}<span className="text-brand-secondary">{siteNameAccent}</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const count = categoryCounts[link.name];
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `
                    flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200
                    ${isActive
                      ? (isDark ? "text-brand-tertiary bg-purple-500/10" : "text-brand-primary bg-purple-50")
                      : (isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")
                    }
                  `}
                >
                  {link.name}
                  {count != null && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${isDark ? "bg-white/10 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
                      {count}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search - Icon only on mobile/small desktop */}
            <div className="hidden md:flex items-center relative group">
              <FontAwesomeIcon icon={faSearch} className={`absolute left-3 transition-colors ${isDark ? "text-gray-500 group-focus-within:text-brand-tertiary" : "text-gray-400 group-focus-within:text-brand-secondary"}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  pl-10 pr-4 py-2 rounded-md text-sm w-32 md:w-40 lg:w-48 focus:w-64 transition-all duration-300 outline-none
                  ${isDark
                    ? "bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-purple-500/50"
                    : "bg-gray-100 border-transparent text-gray-900 focus:bg-white focus:border-purple-500/30 shadow-sm"}
                `}
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`
                w-10 h-10 rounded-md flex items-center justify-center transition-all duration-300
                ${isDark ? "bg-white/5 text-yellow-400 hover:bg-white/10" : "bg-gray-100 text-brand-primary hover:bg-gray-200"}
              `}
            >
              {isDark ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
            </button>

            {/* Notification Bell */}
            {user && <NotificationBell />}

            {/* Auth States */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Avatar button: toggles mobile menu on small screens, dropdown on md+ */}
                <button
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                      setIsDropdownOpen(false);
                    } else {
                      setIsDropdownOpen(!isDropdownOpen);
                    }
                  }}
                  className={`
                    flex items-center gap-2 p-1 md:pr-3 rounded-md transition-all duration-300
                    ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}
                  `}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-md object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-md bg-brand-primary flex items-center justify-center text-white font-bold shadow-md">
                      {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-[10px] hidden md:block transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  />
                </button>

                {/* Dropdown Menu - desktop only */}
                {isDropdownOpen && (
                  <div
                    className={`
                      absolute right-0 mt-3 w-56 rounded-md shadow-md border p-2 hidden md:block
                      animate-in fade-in zoom-in duration-200
                      ${isDark ? "bg-[#0f172a] border-white/10" : "bg-white border-gray-100"}
                    `}
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 mb-2">
                      <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{user.name}</p>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} truncate`}>{user.email}</p>
                    </div>

                    <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                      <FontAwesomeIcon icon={faUser} className="w-4 text-brand-secondary" />
                      <span>My Profile</span>
                    </Link>

                    <Link to="/create-blog" onClick={() => setIsDropdownOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                      <FontAwesomeIcon icon={faPenNib} className="w-4 text-blue-500" />
                      <span>Write a Post</span>
                    </Link>

                    <Link to="/reading-list" onClick={() => setIsDropdownOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                      <FontAwesomeIcon icon={faBookmark} className="w-4 text-yellow-500" />
                      <span>Reading List</span>
                    </Link>

                    <Link to="/settings" onClick={() => setIsDropdownOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                      <FontAwesomeIcon icon={faGear} className="w-4 text-gray-400" />
                      <span>Settings</span>
                    </Link>

                    {user?.isAdmin && (
                      <Link to="/admin" onClick={() => setIsDropdownOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                        <FontAwesomeIcon icon={faGear} className="w-4 text-orange-500" />
                        <span>Admin Panel</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-red-500 hover:bg-red-500/5 transition-colors mt-2 border-t border-gray-100 dark:border-white/5 pt-3"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`hidden sm:block px-4 py-2 text-sm font-semibold transition-colors ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold text-white bg-brand-primary hover:bg-purple-700 transition-colors whitespace-nowrap"
                >
                  Join {siteNamePrefix}
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-10 h-10 rounded-md flex items-center justify-center transition-colors ${isDark ? "bg-white/5 text-white" : "bg-gray-100 text-gray-900"}`}
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faClose : faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${isDark ? "border-white/5" : "border-gray-100"} transition-all animate-in slide-in-from-top duration-300 max-h-[calc(100vh-5rem)] overflow-y-auto`}>
            <div className="flex flex-col gap-2">
              {/* Mobile Search */}
              <div className="px-4 mb-2">
                <div className="relative group">
                  <FontAwesomeIcon icon={faSearch} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`
                      w-full pl-10 pr-4 py-2.5 rounded-md text-sm outline-none transition-all duration-300
                      ${isDark
                        ? "bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-purple-500/50"
                        : "bg-gray-100 border border-transparent text-gray-900 focus:bg-white focus:border-purple-500/30 shadow-sm"}
                    `}
                  />
                </div>
              </div>

              {navLinks.map((link) => {
                const count = categoryCounts[link.name];
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `
                        flex items-center justify-between px-4 py-3 rounded-md text-base font-semibold transition-all
                        ${isActive
                        ? (isDark ? "text-brand-tertiary bg-purple-500/10" : "text-brand-primary bg-purple-50")
                        : (isDark ? "text-gray-400" : "text-gray-600")
                      }
                      `}
                  >
                    {link.name}
                    {count != null && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isDark ? "bg-white/10 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
                        {count}
                      </span>
                    )}
                  </NavLink>
                );
              })}
              {/* Mobile User Section */}
              {user ? (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-col gap-1">
                  <div className="px-4 py-2 mb-2 flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.name} className="w-10 h-10 rounded-md object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-brand-primary flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div>
                      <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{user.name}</p>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{user.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-md text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    <FontAwesomeIcon icon={faUser} className="w-5 text-brand-secondary" />
                    <span>My Profile</span>
                  </Link>
                  <Link to="/create-blog" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-md text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    <FontAwesomeIcon icon={faPenNib} className="w-5 text-blue-500" />
                    <span>Write a Post</span>
                  </Link>
                  <Link to="/reading-list" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-md text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    <FontAwesomeIcon icon={faBookmark} className="w-5 text-yellow-500" />
                    <span>Reading List</span>
                  </Link>
                  <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-md text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    <FontAwesomeIcon icon={faGear} className="w-5 text-gray-400" />
                    <span>Settings</span>
                  </Link>
                  {user?.isAdmin && (
                    <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-md text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      <FontAwesomeIcon icon={faGear} className="w-5 text-orange-500" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-md text-base text-red-500"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-col gap-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-3 rounded-md font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Sign In</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-md font-bold text-white bg-brand-primary hover:bg-purple-700 text-center mx-2">Join {siteNamePrefix}</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
