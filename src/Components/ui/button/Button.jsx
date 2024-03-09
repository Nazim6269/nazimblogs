import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 14px;
  width: 100%;
  background-color: rgb(82, 53, 244);
  border: none;
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  margin: 17px 0 0 0;

  &:hover {
    background-color: rgb(72, 46, 218);
  }
`;

const Button = ({ text }) => {
  return <StyledButton>{text}</StyledButton>;
};

//declaring porp types
Button.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Button;
