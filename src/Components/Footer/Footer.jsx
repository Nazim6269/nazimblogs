import Social from "../Social/Social";
import { useTheme } from "../../hooks/useTheme"; // Assuming the hook is in the same location

const Footer = () => {
  const [theme] = useTheme(); // Get current theme

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      } flex flex-col justify-between items-center py-4 px-24 msm:flex msm:flex-row`}
    >
      <div>
        <img
          src="/blog.webp"
          alt="footer logo"
          className="hidden xsm:block h-20 select-none"
        />
      </div>
      <Social />
    </div>
  );
};

export default Footer;
