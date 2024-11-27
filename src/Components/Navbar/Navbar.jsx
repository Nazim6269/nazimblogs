import { faHamburger, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center px-20 py-5 text-lg">
        {/* Left Panel */}
        <div>
          <Link to={"/"}>
            <img
              src="/blog.webp"
              alt="header logo"
              className="h-20 select-none"
            />
          </Link>
        </div>

        {/* Right Panel */}
        <div className="hidden xsm:flex items-center gap-4">
          <Link to={"/create-blog"}>
            <button className="px-6 py-2 bg-indigo-600 text-white text-sm rounded capitalize hidden md:block">
              write
            </button>
          </Link>

          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-white text-md hidden sm:block"
            />
            <span className="text-white capitalize hidden sm:block">
              Search
            </span>
          </div>

          <Link to={"/login"} className="text-white capitalize hidden sm:block">
            login
          </Link>

          <span className="bg-gray-600 w-12 h-12 rounded-full hidden justify-center items-center text-white xsm:flex ">
            N
          </span>

          <Link
            to={"/profile"}
            className="text-white capitalize text-sm xsm:text-lg "
          >
            <span>Nazim Uddin</span>
          </Link>
        </div>
        <div className="flex flex-col gap-1 xsm:hidden">
          <div className="bg-slate-50 h-[1px] w-5"></div>
          <div className="bg-slate-50 h-[1px] w-5"></div>
          <div className="bg-slate-50 h-[1px] w-5"></div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="bg-gray-300 h-[1px] w-full"></div>
    </>
  );
};

export default Navbar;
