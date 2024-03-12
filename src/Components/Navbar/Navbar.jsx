import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      <div className={styled.navbar}>
        <div className={styled.leftPanel}>
          <Link to={"/"}>
            <img src="/logo.svg" alt="header logo" />
          </Link>
        </div>
        <div className={styled.rightPanel}>
          <Link to={"/create-blog"}>
            {" "}
            <button>write</button>
          </Link>
          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faSearch} className="text-white text-md " />
            <span>Search</span>
          </div>

          <Link to={"/login"}>login</Link>
          <span className="bg-orange-600 w-12 h-12 rounded-full flex justify-center items-center">
            S
          </span>
          <Link to={"/profile"}>
            <span>saad hassan</span>
          </Link>
        </div>
      </div>
      <div className={styled.line}></div>
    </>
  );
};

export default Navbar;
