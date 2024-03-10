import Social from "../Social/Social";
import style from "./footer.module.css";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div>
        <img src="/logo.svg" alt="" className={style.image} />
      </div>
      <Social />
    </div>
  );
};

export default Footer;
