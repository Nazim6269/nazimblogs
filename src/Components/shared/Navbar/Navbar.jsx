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
          <input type="search" name="" id="" placeholder="Search" />

          <a href="/">login</a>
          <img src="" alt="" />
          <span>saad hassan</span>
        </div>
      </div>
      <div className={styled.line}></div>
    </>
  );
};

export default Navbar;
