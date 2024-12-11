import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
  background-color: #2c2f33;
  overflow: hidden;
`;
