import { Button, Tooltip, Typography } from "@mui/material";
import {
  ChatContainer,
  ChatContent,
  ChatHeader,
  ChatTitle,
  Input,
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import MessageComponent from "../Message/MessageComponent";

export type MessageProps = {
  id: string;
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
  createdAt: string;
};

const Chat = ({ socket }: { socket: Socket }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { session, auth } = useSelector((state: RootState) => state);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<MessageProps[]>([]);

  const HandleLeaveRoom = () => {
    socket.emit("leaveRoom", { room: session.room, nickname: auth.nickname });
    dispatch(setRoom("geral"));
  };

  const handleDeleteMessage = async (id: string) => {
    await api
      .delete(`/messages/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(() => {
        const filter = messages.filter((msg) => msg.id != id);
        setMessages(filter);
      });
  };

  const handleEditMessage = async (msgData: MessageProps) => {
    await api
      .patch(`/messages/${msgData.id}`, msgData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then(() => {
        setMessages((old: MessageProps[]) =>
          old.map((message) =>
            message.id === msgData.id ? { ...message, ...msgData } : message
          )
        );
      });
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

  const { data: history, isPending } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (history && history?.length > 0) {
      const msgs: MessageProps[] = history?.map((item) => {
        return {
          id: item._id,
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
        {!session.session && (
          <Typography color="error">Você está desconectado!</Typography>
        )}
        {session.room != "geral" && (
          <Tooltip title="Sair da sala">
            <Button variant="outlined" color="error" onClick={HandleLeaveRoom}>
              <LogoutIcon />
            </Button>
          </Tooltip>
        )}
      </ChatHeader>
      <ChatContent>
        {isPending && <p>Carregando histórico...</p>}
        {messages.map((msg) => (
          <MessageComponent
            key={msg.id}
            message={msg}
            nickname={auth.nickname}
            handleDelete={handleDeleteMessage}
            handleEdit={handleEditMessage}
          />
        ))}
      </ChatContent>

      <TextinputContainer>
        <Input
          autoFocus
          placeholder="Digite sua mensagem..."
          ref={inputRef}
          disabled={!session.session}
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
