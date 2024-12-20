import styled from "styled-components";

export const GroupsContainer = styled.div`
  width: 300px;
  max-width: 30%;
  background-color: #2f3136;
  padding: 10px;
  color: white;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
`;

export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
export const RoomButton = styled.button<{ online: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border: none;
  width: 100%;
  background-color: transparent;
  white-space: nowrap;
  color: ${(props) => {
    return props.online ? "#4caf50" : "#ffffff";
  }};
  text-decoration: ${(props) => {
    return props.online ? "underline" : "none";
  }};
  text-transform: capitalize;
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2c2f33;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const RoomsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction:row;
    overflow-x:auto  }
`;

export const RoomItem = styled.li`
  margin-bottom: 8px;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;
