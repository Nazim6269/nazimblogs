import PropTypes from "prop-types";
import Input from "../ui/input/Input";
import Label from "../ui/label/Label";
import { useTheme } from "../../hooks/useTheme";

const InputGroup = ({ name, label }) => {
  const [theme] = useTheme();
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input theme={theme} />
    </div>
  );
};

//declaring proptypes
InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  theme: PropTypes.string,
};
export default InputGroup;
