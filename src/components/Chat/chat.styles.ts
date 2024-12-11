import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-top: 1px solid #ccc;
  background-color: #484b52;
  color: white;
  outline: none;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;
export const ChatContainer = styled.div`
  /* width: 70%;
  height: 100%;
  background-color: #d2d2d2;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 6px 10px 6px; */
  width: 800px;
  background-color: #2f3136;
  padding: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15%;
  padding: 5px 10px 5px 10px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;
export const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #36393f;
  color: white;

  @media (max-width: 768px) {
    flex: none;
  }
`;

export const ChatTitle = styled.p`
  font-size: 32px;
  margin: 0px;
  padding: 0px;
  font-weight: 600;
  color: #fff;
  text-transform: capitalize;
`;
