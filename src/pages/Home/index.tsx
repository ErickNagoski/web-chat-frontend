import { Avatar } from "@mui/material";
import Header from "../../components/Header/Header";
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

function Home(): JSX.Element {
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
          <Input />
        </ChatContainer>
      </ContentContainer>
      <Footer />
    </MainContainer>
  );
}

export default Home;
