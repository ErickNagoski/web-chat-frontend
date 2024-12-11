import { Avatar, Button, Typography } from "@mui/material";
import { Bubble, MessageContainer } from "../Message/Messages.style";
import { ChatContainer, ChatContent, ChatHeader, ChatTitle, Input } from "./chat.styles";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../redux/session";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import LogoutIcon from "@mui/icons-material/Logout";

type MessageProps = {
  content: string;
  user: string;
};

const Chat = ({ socket }: { socket: Socket }) => {
  const dispatch = useDispatch();
  const { session, auth } = useSelector((state: RootState) => state);

  const [messages, setMessages] = useState<MessageProps[]>([]);

  const HandleLeaveRoom = () => {
    socket.emit("leaveRoom", session.room);
  };

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        if (socket.id) {
          dispatch(setSession(socket.id));
          socket.emit("join", { room: "general", nickname: auth.nickname });
        }
      });

      // Ouvir mensagens
      socket.on("message", (data) => {
        setMessages((old) => [...old, data]);
      });

      socket.on("users", (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  function sendMessage(message: string): void {
    socket?.emit("message", {
      to: session.room,
      message,
      sender: auth.nickname,
      chat: session.room,
      isChannel: session.room != "general",
    });
    // setMessages(old => [...old, content])
  }

  useEffect(() => {
    setMessages([]);
  }, [session.room]);

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>{session.room}</ChatTitle>
        <Button variant="outlined" color="error" onClick={HandleLeaveRoom}>
          <LogoutIcon />
        </Button>
      </ChatHeader>
      <ChatContent>
        {messages.map((msg, i) => {
          const myMessage = msg.user == auth.nickname;
          return (
            <MessageContainer key={i} myMessage={myMessage}>
              {!myMessage && (
                <Avatar>{msg.user.substring(0, 1).toUpperCase()}</Avatar>
              )}
              <Bubble
                isFirst={true}
                isLast={false}
                user={myMessage}
                showAvatar={true}
              >
                {msg.content}
              </Bubble>
              {myMessage && (
                <Avatar>{msg.user.substring(0, 1).toUpperCase()}</Avatar>
              )}
            </MessageContainer>
          );
        })}
      </ChatContent>
      <Input onBlur={(event) => sendMessage(event.target.value)} />
    </ChatContainer>
  );
};

export default Chat;
