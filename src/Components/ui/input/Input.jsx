import styled from "styled-components";

const Input = styled.input`
  outline: none;
  border: 1px solid#353545;
  border-radius: 6px;
  background-color: #030317;
  padding: 18px 6px;
  width: 100%;

  &:focus {
    border: 1px solid #6366f1;
  }
`;

export default Input;
