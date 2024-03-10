//external imports

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//internal imports
import { socialIcons } from "../../data";
import style from "./social.module.css";

library.add(fab);

const Social = () => {
  return (
    <div className={style.icon}>
      {socialIcons.map((item) => (
        <div key={item.id}>
          <FontAwesomeIcon icon={["fab", item.icon]} />
        </div>
      ))}
    </div>
  );
};

export default Social;
