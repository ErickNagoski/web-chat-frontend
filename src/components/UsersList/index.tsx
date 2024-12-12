import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ActiveUsersContainer, UserItem, UsersList } from "./UsersList.style";
import { Avatar, Typography } from "@mui/material";

type ActiveUser = {
    nickname: string;
}

const UsersListComponent = ({ socket }: { socket: Socket }) => {
    const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);


    useEffect(() => {
        if (socket) {
            socket.on('users', (users: ActiveUser[]) => {
                if (users.length > 0) {

                    console.log(users)
                    setActiveUsers(users)
                }
            })
        }
    }, [socket])

    if (activeUsers.length > 0) {
        return (
            <ActiveUsersContainer>
                <Typography variant="h6" mb={2}>Usuários Ativos</Typography>
                <UsersList>
                    {activeUsers.map(user => (
                        <UserItem>
                            <Avatar sx={{ marginRight: 2 }}>{user.nickname.substring(0, 1).toUpperCase()}</Avatar>
                            {user.nickname}
                        </UserItem>))}
                </UsersList>
            </ActiveUsersContainer>
        )
    } else {
        return <div></div>
    }


}

export default UsersListComponent;