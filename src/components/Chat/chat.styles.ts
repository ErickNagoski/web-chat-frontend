import styled from "styled-components";

export const Input = styled.input`
  width: 90%;
  padding: 10px;
  border-radius:5px;
  border: 1px solid #ccc;
  background-color: #484b52;
  color: white;
  outline: none;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const TextinputContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const SendButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #4287f5;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2a6bdb;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background-color: #ccc;
    border: 1px solid #ccc;
    cursor: not-allowed;
  }
`;

export const ChatContainer = styled.div`
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
