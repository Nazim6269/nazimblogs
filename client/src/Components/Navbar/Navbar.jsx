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
  faClose
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import { useDebounce } from "../../hooks/useDebounce";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const isDark = theme === "dark";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchTerm, 500);

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

  const navLinks = [
    { name: "Explore", path: "/" },
    { name: "Tutorials", path: "/tutorials" },
    { name: "Design", path: "/design" },
    { name: "Community", path: "/community" },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
      <nav
        className={`
          max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
          rounded-2xl transition-all duration-500
          ${isScrolled
            ? (isDark ? "bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-2xl" : "bg-white/80 backdrop-blur-xl border border-black/5 shadow-xl")
            : "bg-transparent"
          }
        `}
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
              H
            </div>
            <span
              className={`text-2xl font-bold tracking-tight transition-all duration-500 ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              Hexa<span className="text-purple-500">Blog</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${isActive
                    ? (isDark ? "text-purple-400 bg-purple-500/10" : "text-purple-600 bg-purple-50")
                    : (isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")
                  }
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search - Icon only on mobile/small desktop */}
            <div className="hidden lg:flex items-center relative group">
              <FontAwesomeIcon icon={faSearch} className={`absolute left-3 transition-colors ${isDark ? "text-gray-500 group-focus-within:text-purple-400" : "text-gray-400 group-focus-within:text-purple-500"}`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  pl-10 pr-4 py-2 rounded-xl text-sm w-48 focus:w-64 transition-all duration-300 outline-none
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
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${isDark ? "bg-white/5 text-yellow-400 hover:bg-white/10" : "bg-gray-100 text-purple-600 hover:bg-gray-200"}
              `}
            >
              {isDark ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
            </button>

            {/* Auth States */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`
                    flex items-center gap-2 p-1 pr-3 rounded-xl transition-all duration-300
                    ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}
                  `}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-lg object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                      {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-[10px] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className={`
                      absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl border p-2
                      animate-in fade-in zoom-in duration-200
                      ${isDark ? "bg-[#0f172a] border-white/10" : "bg-white border-gray-100"}
                    `}
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 mb-2">
                      <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{user.name}</p>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} truncate`}>{user.email}</p>
                    </div>

                    <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                      <FontAwesomeIcon icon={faUser} className="w-4 text-purple-500" />
                      <span>My Profile</span>
                    </Link>

                    <Link to="/create-blog" onClick={() => setIsDropdownOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                      <FontAwesomeIcon icon={faPenNib} className="w-4 text-blue-500" />
                      <span>Write a Post</span>
                    </Link>

                    <Link to="/settings" onClick={() => setIsDropdownOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                      <FontAwesomeIcon icon={faGear} className="w-4 text-gray-400" />
                      <span>Settings</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-500/5 transition-colors mt-2 border-t border-gray-100 dark:border-white/5 pt-3"
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
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Join Hexa
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDark ? "bg-white/5 text-white" : "bg-gray-100 text-gray-900"}`}
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faClose : faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${isDark ? "border-white/5" : "border-gray-100"} transition-all animate-in slide-in-from-top duration-300`}>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                      px-4 py-3 rounded-xl text-base font-semibold transition-all
                      ${isActive
                      ? (isDark ? "text-purple-400 bg-purple-500/10" : "text-purple-600 bg-purple-50")
                      : (isDark ? "text-gray-400" : "text-gray-600")
                    }
                    `}
                >
                  {link.name}
                </NavLink>
              ))}
              {!user && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-col gap-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Sign In</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 text-center">Join Hexa</Link>
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
