import styled from "styled-components";

const Container = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 640px) {
    padding: 1rem 0.75rem;
  }

  @media (min-width: 1024px) {
    padding: 1.25rem 1.5rem;
  }
`;

export default Container;
