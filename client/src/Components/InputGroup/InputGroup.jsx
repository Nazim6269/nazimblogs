import { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Input from "../ui/input/Input";
import Label from "../ui/label/Label";

const InputGroup = ({ name, label, className, togglePassword, type, ...props }) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const inputType = togglePassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <Label htmlFor={name} className="text-gray-900">
        {label}
      </Label>
      <div className="relative">
        <Input
          theme={theme}
          name={name}
          id={name}
          type={inputType}
          {...props}
          className={`w-full rounded-md px-4 transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-500 text-white placeholder-gray-400"
              : "bg-gray-100 text-gray-900 placeholder-gray-500"
          } ${togglePassword ? "pr-10" : ""} ${className || "h-10"}`}
        />
        {togglePassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm transition-colors ${
              theme === "dark"
                ? "text-gray-300 hover:text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
    </div>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  togglePassword: PropTypes.bool,
  type: PropTypes.string,
};

export default InputGroup;
