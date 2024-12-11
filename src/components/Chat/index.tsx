import { Avatar, Typography } from "@mui/material";
import { Bubble, MessageContainer } from "../Message/Messages.style";
import { ChatContainer, Input } from "./chat.styles";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../redux/session";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";

type MessageProps = {
    content: string;
    user: string;
}

const Chat = ({ socket }: { socket: Socket }) => {
    const dispatch = useDispatch();
    const { session, auth } = useSelector((state: RootState) => state)

    const [messages, setMessages] = useState<MessageProps[]>([]);

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                if (socket.id) {
                    dispatch(setSession(socket.id))
                    socket.emit('join',{room:'general',nickname:auth.nickname})
                }
            });

            // Ouvir mensagens
            socket.on("message", (data) => {
                setMessages(old => [...old, data])
            });
        }
    }, [socket])



    function sendMessage(message: string): void {
        socket?.emit('message', { to: session.room, message, sender: auth.nickname, chat: session.room, isChannel: session.room != 'general' })
        // setMessages(old => [...old, content])
    }

    return (<ChatContainer>
        <Typography variant="h3">{session.room}</Typography>
        {messages.map((msg, i) => {
            const myMessage = msg.user == auth.nickname;
            return (
                <MessageContainer key={i} myMessage={myMessage}>
                    {!myMessage && (<Avatar >
                        {msg.user.substring(0, 1).toUpperCase()}
                    </Avatar>)}
                    <Bubble isFirst={true} isLast={false} user={myMessage} showAvatar={true}>
                        {msg.content}
                    </Bubble>
                    {myMessage && (<Avatar >
                        {msg.user.substring(0, 1).toUpperCase()}
                    </Avatar>)}
                </MessageContainer>)
        })}
        <Input onBlur={(event) => sendMessage(event.target.value)} />
    </ChatContainer>)

}

export default Chat;