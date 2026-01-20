import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";
import Input from "../ui/input/Input";
import Label from "../ui/label/Label";

const InputGroup = ({ name, label, className, ...props }) => {
  const { theme } = useTheme();
  return (
    <div>
      <Label htmlFor={name} className={`text-gray-900`}>
        {label}
      </Label>
      <Input
        theme={theme}
        name={name}
        id={name}
        {...props}
        className={`w-full rounded-lg px-4 transition-all duration-300 ${theme === "dark"
          ? "bg-gray-500 text-white placeholder-gray-400"
          : "bg-gray-100 text-gray-900 placeholder-gray-500"
          } ${className || "h-10"}`} // default height 48px
      />
    </div>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string, // for custom height or extra styles
  theme: PropTypes.string,
};

export default InputGroup;
