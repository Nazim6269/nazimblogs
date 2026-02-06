//external imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//internal imports
import { Link } from "react-router-dom";
import { socialIcons } from "../../data";
import { useTheme } from "../../hooks/useTheme";

library.add(fab);

const Social = ({ links }) => {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const icons = links || socialIcons;

  return (
    <div
      className={`flex justify-center items-center text-2xl gap-4 ${iconColor}`}
    >
      {icons.map((item, idx) => (
        <Link
          to={`${item.link}`}
          key={item.id || idx}
          className={`transition-colors duration-300 hover:text-violet-400`}
        >
          <FontAwesomeIcon icon={["fab", item.icon]} />
        </Link>
      ))}
    </div>
  );
};

export default Social;
