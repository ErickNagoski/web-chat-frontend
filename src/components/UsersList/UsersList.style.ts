import styled from "styled-components";

export const ActiveUsersContainer = styled.div`
 width: 300px;
  max-width: 30%;
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

export const UsersList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;

export const UserItem = styled.li`
  margin-bottom: 8px;
  width: 100%;
  display:flex;
  align-items: center;

  font-size: large;
  color:#fff;


  &:last-child {
    margin-bottom: 0;
  }
`;