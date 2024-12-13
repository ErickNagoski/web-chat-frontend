import Header from "../../components/Header/Header";
import { ContentContainer, MainContainer } from "./styles";
import GroupsComponet from "../../components/GroupsComponent";
import Chat from "../../components/Chat";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UsersListComponent from "../../components/UsersList";
import ErrorBoundary from "../../utils/ErrorBoundary";
import { Button, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function Home(): JSX.Element {
  const { auth } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket>();

  const handleConnect = () => {
    const connection = io("http://localhost:3000", {});
    setSocket(connection);
  };

  useEffect(() => {
    if (!auth.id) {
      navigate("/");
    }
    if (!socket && auth.id) {
      handleConnect();
    }
  }, []);

  if (socket) {
    return (
      <MainContainer>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <Header />
          <ContentContainer>
            <GroupsComponet socket={socket} />
            <Chat socket={socket} />
            <UsersListComponent socket={socket} />
          </ContentContainer>
        </ErrorBoundary>
      </MainContainer>
    );
  }

  return (
    <Grid2 container>
      <Header />
      <Grid2 padding={2}>
        <Typography variant="h5">
          Você não está conectado ao nosso servidor!
        </Typography>
        <Button variant="contained" onClick={handleConnect}>
          Conectar Agora
        </Button>
      </Grid2>
    </Grid2>
  );
}

export default Home;
