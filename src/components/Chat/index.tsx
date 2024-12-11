import { Avatar, Button, Grid2, Tooltip, Typography } from "@mui/material";
import { Bubble, MessageContainer, } from "../Message/Messages.style";
import { ChatContainer, ChatContent, ChatHeader, ChatTitle, Input, SendButton, TextinputContainer } from "./chat.styles";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setRoom, setSession } from "../../redux/session";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../../redux/store";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';

type MessageProps = {
    content: string;
    user: string;
};

const Chat = ({ socket }: { socket: Socket }) => {
    const dispatch = useDispatch();
    const { session, auth } = useSelector((state: RootState) => state);
    const inputRef = useRef();

    const [messages, setMessages] = useState<MessageProps[]>([]);

    const HandleLeaveRoom = () => {
        socket.emit("leaveRoom", session.room);
        dispatch(setRoom('geral'))
    };

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                if (socket.id) {
                    dispatch(setSession(socket.id));
                    socket.emit("join", { room: "geral", nickname: auth.nickname });
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
        if (message.trim().length > 0) {

            socket?.emit("message", {
                to: session.room,
                message,
                sender: auth.nickname,
                chat: session.room,
                isChannel: session.room != "geral",
            });
        }
    }

    useEffect(() => {
        setMessages([]);
    }, [session.room]);

    return (
        <ChatContainer>
            <ChatHeader>
                <ChatTitle>{session.room}</ChatTitle>
                <Tooltip title='Sair da sala'>
                    <Button variant="outlined" color="error" onClick={HandleLeaveRoom}>
                        <LogoutIcon />
                    </Button>
                </Tooltip>

            </ChatHeader>
            <ChatContent>
                {messages.map((msg, i) => {
                    const myMessage = msg.user == auth.nickname;
                    return (
                        <MessageContainer key={i} myMessage={myMessage}>
                            {!myMessage && (
                                <Avatar>{msg.user ? msg.user.substring(0, 1).toUpperCase() : <SmartToyIcon />}</Avatar>
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

            <TextinputContainer>
                <Input
                    placeholder="Digite sua mensagem..."
                    ref={inputRef}
                    onKeyDown={(event: any) => {
                        if (event.key === "Enter" && event.target.value.trim()) {
                            sendMessage(event.target.value);
                            event.target.value = "";
                        }
                    }} />
                <SendButton onClick={() => sendMessage(inputRef.current.value.trim())}>
                    <SendIcon />
                </SendButton>
            </TextinputContainer>
        </ChatContainer>
    );
};

export default Chat;
