import PropTypes from "prop-types";
import Input from "../ui/input/Input";
import Label from "../ui/label/Label";

const InputGroup = ({ name, label }) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input />
    </div>
  );
};

//declaring proptyles
InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default InputGroup;
