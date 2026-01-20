import styled from "styled-components";

const Input = styled.input`
  outline: none;
  border: 1px solid
    ${(props) => (props.theme === "dark" ? "#6366f1" : "#d1d5db")};
  border-radius: 6px;
  background-color: ${(props) =>
    props.theme === "dark" ? "#030317" : "#ffffff"};
  padding: 18px 6px;
  width: 100%;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#1f2937")};

  &:focus {
    border: 1px solid
      ${(props) => (props.theme === "dark" ? "#ffffff" : "#4f46e5")};
  }
`;

export default Input;
