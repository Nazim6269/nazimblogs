import styled from "styled-components";

const Container = styled.div`
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  // Media query for the "sm" breakpoint
  @media (min-width: 640px) {
    padding: 2rem 5rem;
  }
`;

export default Container;
