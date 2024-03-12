import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      <div className={styled.navbar}>
        <div className={styled.leftPanel}>
          <img src="/logo.svg" alt="header logo" />
        </div>
        <div className={styled.rightPanel}>
          <button>write</button>
          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faSearch} className="text-white text-md " />
            <span>Search</span>
          </div>

          <a href="/">login</a>
          <span className="bg-orange-600 w-12 h-12 rounded-full flex justify-center items-center">
            S
          </span>
          <span>saad hassan</span>
        </div>
      </div>
      <div className={styled.line}></div>
    </>
  );
};

export default Navbar;
