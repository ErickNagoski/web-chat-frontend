import { Avatar, Button } from "@mui/material"
import { GroupsContainer } from "./GroupsComponent.style"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Socket } from "socket.io-client"
import { setRoom } from "../../redux/session"

const GroupsComponet = ({ socket }: { socket: Socket }) => {
    const { auth } = useSelector((state: RootState) => state)
    const dispatch = useDispatch()

    const handleJoinChat = (chatName: string) => {
        dispatch(setRoom(chatName))
        socket?.emit('joinRoom', { room: chatName, nickname: auth.nickname })
    }

    return (<GroupsContainer>
        <Avatar />
        {auth.nickname}
        <Button onClick={() => { handleJoinChat('server') }}>server</Button>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
    </GroupsContainer>)
}

export default GroupsComponet;