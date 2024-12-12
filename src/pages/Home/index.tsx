import Header from "../../components/Header/Header";
import { ContentContainer, MainContainer } from "./styles";
import GroupsComponet from "../../components/GroupsComponent";
import Chat from "../../components/Chat";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UsersListComponent from "../../components/UsersList";

function Home(): JSX.Element {
  const { session, auth } = useSelector((state: RootState) => state);

  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (!socket && auth.id) {
      const connection = io("http://localhost:3000",{});
      setSocket(connection);
    }
  }, []);

  return (
    <MainContainer>
      <Header />
      <ContentContainer>
        <GroupsComponet socket={socket} />
        <Chat socket={socket} />
      <UsersListComponent socket={socket}/>
      </ContentContainer>
      
      {/* <Footer /> */}
    </MainContainer>
  );
}

export default Home;
