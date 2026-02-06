import styled from "styled-components";

const Container = styled.div`
  padding: 2rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    padding: 2rem 1rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`;

export default Container;
