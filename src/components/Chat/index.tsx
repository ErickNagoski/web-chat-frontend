import { Avatar, Button, Tooltip } from "@mui/material";
import { Bubble, MessageContainer } from "../Message/Messages.style";
import {
  ChatContainer,
  ChatContent,
  ChatHeader,
  ChatTitle,
  Input,
  MessageHour,
  MessageText,
  SendButton,
  TextinputContainer,
} from "./chat.styles";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setRoom, setSession } from "../../redux/session";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../../redux/store";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { format } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

type MessageProps = {
  content: string;
  user: string;
  date: string;
};

type MessageHistoryProps = {
  _id: string;
  room: string;
  userId: string;
  nickName: string;
  content: string;
  createdAt: Date;
};

const Chat = ({ socket }: { socket: Socket }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { session, auth } = useSelector((state: RootState) => state);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<MessageProps[]>([]);

  const HandleLeaveRoom = () => {
    socket.emit("leaveRoom", session.room);
    dispatch(setRoom("geral"));
  };

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        if (socket.id) {
          socket.emit("activeUser", { id: socket.id, nickname: auth.nickname });
          dispatch(setSession(socket.id));
          socket.emit("join", { room: "geral", nickname: auth.nickname });
        }
      });

      socket.on("disconnect", () => {
        dispatch(setSession(""));
      });

      // Ouvir mensagens
      socket.on("message", (data) => {
        setMessages((old) => [...old, data]);
      });
    }
  }, [socket]);

  function sendMessage(message: string): void {
    if (message.trim().length > 0) {
      socket?.emit("message", {
        to: session.room,
        message,
        sender: auth.nickname,
        chat: session.room,
        isChannel: session.room != "geral",
        userId: auth.id,
      });
    }
  }

  useEffect(() => {
    setMessages([]);
    queryClient.invalidateQueries({ queryKey: ["history"] });
  }, [session.room]);

  async function getHistory() {
    const response = await api.get<MessageHistoryProps[]>(
      `/messages/history/${session.room}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    return response.data;
  }

  const {
    data: history,
    error,
    isPending,
  } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  useEffect(() => {
    if (history && history?.length > 0) {
      const msgs = history?.map((item) => {
        return {
          content: item.content,
          user: item.nickName,
          date: item.createdAt,
        };
      });
      setMessages(msgs);
    }
  }, [history]);

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>{session.room}</ChatTitle>
        {session.room != "geral" && (
          <Tooltip title="Sair da sala">
            <Button variant="outlined" color="error" onClick={HandleLeaveRoom}>
              <LogoutIcon />
            </Button>
          </Tooltip>
        )}
      </ChatHeader>
      <ChatContent>
        {messages.map((msg, i) => {
          const myMessage = msg.user == auth.nickname;
          return (
            <MessageContainer key={i} myMessage={myMessage}>
              {!myMessage && (
                <Avatar>
                  {msg.user ? (
                    msg.user.substring(0, 1).toUpperCase()
                  ) : (
                    <SmartToyIcon />
                  )}
                </Avatar>
              )}
              <Bubble
                isFirst={true}
                isLast={false}
                user={myMessage}
                showAvatar={true}
              >
                <MessageText>{msg.content}</MessageText>
                <MessageHour>{format(new Date(msg.date), "HH:mm")}</MessageHour>
              </Bubble>
              {myMessage && (
                <Avatar>{msg.user.substring(0, 1).toUpperCase()}</Avatar>
              )}
            </MessageContainer>
          );
        })}
      </ChatContent>

      <TextinputContainer>
        <Input
          autoFocus
          placeholder="Digite sua mensagem..."
          ref={inputRef}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && event.currentTarget.value.trim()) {
              sendMessage(event.currentTarget.value);
              event.currentTarget.value = "";
            }
          }}
        />
        <SendButton
          onClick={() => {
            if (inputRef.current?.value.trim()) {
              sendMessage(inputRef.current.value.trim());
              inputRef.current.value = "";
            }
          }}
        >
          <SendIcon />
        </SendButton>
      </TextinputContainer>
    </ChatContainer>
  );
};

export default Chat;
