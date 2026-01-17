import { faMoon, faSearch, faSun, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const isDark = theme === "dark";
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`
      backdrop-blur-lg border-b transition-all duration-500
      ${isDark
            ? "bg-[#050816]/70 border-white/10 text-white"
            : "bg-white/70 border-black/10 text-gray-900"
          }
    `}
      >
        <div className="flex justify-between items-center px-8 xsm:px-12 sm:px-20 py-4">
          {/* Logo */}
          <Link to="/">
            <p
              className={`text-4xl font-bold bg-clip-text text-transparent transition-all duration-500 ${isDark
                  ? "bg-linear-to-r from-blue-400 via-purple-500 to-pink-500"
                  : "bg-linear-to-r from-purple-400 to-indigo-500"
                }`}
            >
              HexaBlog
            </p>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 text-sm opacity-90">
            {["Featured", "Tutorial", "Design", "Freelance"].map((item) => (
              <span
                key={item}
                className={`${isDark ? "text-gray-400 " : "text-gray-600"
                  } cursor-pointer hover:text-purple-400 transition-all font-semibold text-lg`}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Right Panel */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition"
            >
              {isDark ? (
                <FontAwesomeIcon icon={faSun} className="text-yellow-400" />
              ) : (
                <FontAwesomeIcon icon={faMoon} className="text-indigo-600" />
              )}
            </button>

            {/* Search */}
            <div
              className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-300 ${isDark
                  ? "bg-gray-800/80 text-gray-200"
                  : "bg-gray-300/30 text-gray-900"
                }`}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className={`transition-opacity duration-300 ${isDark
                    ? "text-gray-400 opacity-70"
                    : "text-gray-500 opacity-70"
                  }`}
              />
              <input
                type="text"
                placeholder="Search blog..."
                className={`bg-transparent outline-none text-sm  w-full placeholder-transition transition-colors duration-300 ${isDark
                    ? "placeholder-gray-400 text-gray-200"
                    : "placeholder-gray-500 text-gray-900"
                  }`}
              />
            </div>

            {/* Write Button */}
            {user && (
              <Link to="/create-blog">
                <button
                  className="hidden md:block px-5 py-2 rounded-lg text-sm font-medium text-white 
              bg-linear-to-r from-blue-500 to-purple-500 
              hover:scale-105 transition-transform shadow-md"
                >
                  Write
                </button>
              </Link>
            )}

            {user ? (
              <>
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-lg">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                {/* Profile Link */}
                <Link
                  to="/profile"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"
                    } hidden sm:block hover:text-purple-400 font-semibold`}
                >
                  {user.name && user.name.split(" ")[0]}
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className={`${isDark ? "text-gray-400" : "text-gray-600"
                    } hidden sm:block hover:text-red-400 font-semibold ml-2`}
                  title="Logout"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"
                    } hidden sm:block hover:text-purple-400 font-semibold`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden md:block px-5 py-2 rounded-lg text-sm font-medium text-white 
              bg-linear-to-r from-purple-500 to-indigo-500 
              hover:scale-105 transition-transform shadow-md"
                >
                  Join
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <div
              onClick={() => setShowModal(true)}
              className="md:hidden flex flex-col gap-[3px] cursor-pointer"
            >
              <span
                className={`w-5 h-0.5 rounded ${isDark ? "bg-white" : "bg-black"
                  }`}
              ></span>
              <span
                className={`w-5 h-0.5 rounded ${isDark ? "bg-white" : "bg-black"
                  }`}
              ></span>
              <span
                className={`w-5 h-0.5 rounded ${isDark ? "bg-white" : "bg-black"
                  }`}
              ></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom glow line */}
      <div className="h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </header>
  );
};

export default Navbar;
