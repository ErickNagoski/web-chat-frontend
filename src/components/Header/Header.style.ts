import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: #484b52;
  color:#fff;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;
