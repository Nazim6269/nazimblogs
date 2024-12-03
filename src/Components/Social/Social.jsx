//external imports

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//internal imports
import { Link } from "react-router-dom";
import { socialIcons } from "../../data";

library.add(fab);

const Social = () => {
  return (
    <div className="flex justify-center items-center text-2xl gap-2 ">
      {socialIcons.map((item) => (
        <Link to={`${item.link}`} key={item.id} className="hover:text-gray-500">
          <FontAwesomeIcon icon={["fab", item.icon]} />
        </Link>
      ))}
    </div>
  );
};

export default Social;
