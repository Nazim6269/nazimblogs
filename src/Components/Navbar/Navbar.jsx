import { faMoon, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme"; // Your custom hook to manage theme

const Navbar = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <div
        className={`${
          theme === "dark"
            ? "flex justify-between items-center px-8 xsm:px-12 sm:px-20 py-5 text-lg bg-gray-900 text-white"
            : "flex justify-between items-center px-8 xsm:px-12 sm:px-20 py-5 text-lg bg-white text-black"
        }`}
      >
        {/* Left Panel */}
        <div>
          <Link to={"/"}>
            <img
              src="/blog.webp"
              alt="header logo"
              className="h-14 xsm:h-20 select-none"
            />
          </Link>
        </div>

        {/* Theme Switch */}
        <div onClick={toggleTheme} className="cursor-pointer">
          {theme === "dark" ? (
            <FontAwesomeIcon icon={faSun} className="text-yellow-400" />
          ) : (
            <FontAwesomeIcon icon={faMoon} className="text-gray-800" />
          )}
        </div>

        {/* Right Panel */}
        <div className="hidden xsm:flex items-center gap-4">
          <Link to={"/create-blog"}>
            <button className="px-6 py-2 bg-indigo-600 text-white text-sm rounded capitalize hidden md:block">
              Write
            </button>
          </Link>

          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faSearch}
              className={`text-md ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            />
            <span
              className={`capitalize ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Search
            </span>
          </div>

          <Link
            to={"/login"}
            className={`capitalize hidden sm:block ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Login
          </Link>

          <span className="bg-gray-600 w-12 h-12 rounded-full hidden justify-center items-center text-white xsm:flex ">
            N
          </span>

          <Link
            to={"/profile"}
            className={`text-sm xsm:text-lg ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            <span>Nazim Uddin</span>
          </Link>
        </div>

        {/* Hamburger Menu (for smaller screens) */}
        <div className="flex flex-col gap-1 xsm:hidden">
          <div
            className={`h-[1px] w-5 ${
              theme === "dark" ? "bg-slate-50 " : "bg-black"
            }`}
          ></div>
          <div
            className={`h-[1px] w-5 ${
              theme === "dark" ? "bg-slate-50 " : "bg-black"
            }`}
          ></div>
          <div
            className={`h-[1px] w-5 ${
              theme === "dark" ? "bg-slate-50 " : "bg-black"
            }`}
          ></div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="bg-gray-300 h-[1px] w-full"></div>
    </>
  );
};

export default Navbar;
