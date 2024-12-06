import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80vh;
  width: 100%;
`;

export const GroupsContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f1f1f1;
  padding: 10px;
`;

export const ChatContainer = styled.div`
  width: 70%;
  padding: 10px;
  background-color: #d2d2d2;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 6px 10px 6px;
  padding: 16px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 80vh;
  width: 100%;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
`;

export const Input = styled.input`
    width: 100%;
    height: 40px;
    padding-left:10px;
    background-color: #fff;
    border-radius: 5px;
`