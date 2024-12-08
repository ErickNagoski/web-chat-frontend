import { Avatar } from "@mui/material";
import Header from "../../components/Header/Header";
import { io } from "socket.io-client";
import {
  ChatContainer,
  ContentContainer,
  GroupsContainer,
  Input,
  MainContainer,
} from "./styles";
import { Footer } from "../../components/FooterNavigation/Footer";
import {
  Bubble,
  MessageContainer,
} from "../../components/Message/Messages.style";
import { setSession } from "../../redux/session";
import { useDispatch } from "react-redux";

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    if (socket.id) {
      dispatch(setSession(socket.id))
    }

    // Enviar mensagem
    socket.emit("message", "Hello from client");

    // Ouvir mensagens
    socket.on("message", (data) => {
      console.log(`Message from server: ${data}`);
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  return (
    <MainContainer>
      <Header />
      <ContentContainer>
        <GroupsContainer>
          <Avatar />
          aaaaaaaaa
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </GroupsContainer>
        <ChatContainer>
          <MessageContainer user="erick">
            <Bubble isFirst={true} isLast={false} user={true} showAvatar={true}>
              Message
            </Bubble>
            <Avatar />
          </MessageContainer>
          <MessageContainer user={null}>
            <Avatar />
            <Bubble isFirst={false} isLast={true} user={false} showAvatar={false}>
              Message
            </Bubble>
          </MessageContainer>
          <Input onBlur={(event) => socket.emit("message", event.target.value)} />
        </ChatContainer>
      </ContentContainer>
      <Footer />
    </MainContainer>
  );
}

export default Home;
