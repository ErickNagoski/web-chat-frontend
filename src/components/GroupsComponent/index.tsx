import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import {
  GroupsContainer,
  RoomButton,
  RoomItem,
  RoomsList,
  UserContainer,
} from "./GroupsComponent.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Socket } from "socket.io-client";
import { setRoom } from "../../redux/session";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { logout } from "../../redux/auth";
import { useNavigate } from "react-router";

type RoomProps = {
  _id: string;
  nome: string;
  created_at: string;
};

const GroupsComponet = ({ socket }: { socket: Socket }) => {
  const { auth, session } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [newRoomModal, setNewRoomModal] = useState(false);
  const roomNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleNewRoom = () => {
    setNewRoomModal(!newRoomModal);
  };

  async function getRooms() {
    const response = await api.get<RoomProps[]>("rooms", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  }

  const {
    data: rooms,
    error,
    isPending,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const handleJoinChat = (chatName: string) => {
    if (session.room != chatName) {
      if (session.room != "geral") {
        socket?.emit("leaveRoom", {
          room: session.room,
          nickname: auth.nickname,
        });
      }
      dispatch(setRoom(chatName));
      socket?.emit("joinRoom", { room: chatName, nickname: auth.nickname });
    } else {
      window.alert("Você já está conectado");
    }
  };

  const createNewRoom = () => {
    if (roomNameRef.current) {
      const roomName = roomNameRef.current.value.trim();
      api
        .post(
          `rooms`,
          {
            nome: roomName,
            cridor: auth.nickname,
            created_at: new Date().toISOString(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        )
        .then(() => {
          setNewRoomModal(false);
          queryClient.invalidateQueries({ queryKey: ["rooms"] });
          socket.emit("newServer", roomName);
        });
    }
  };

  const handleLogout = () => {
    socket.disconnect();
    dispatch(logout());
    navigate("/");
  };

  useEffect(()=>{
    if(socket){
      socket.on('newServer',()=>{
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      })
    }
  },[socket])

  return (
    <GroupsContainer>
      <UserContainer>
        <Avatar />
        <Typography>{auth.nickname}</Typography>
        <Button
          onClick={handleLogout}
          endIcon={<PowerSettingsNewIcon fontSize="small" />}
          color="error"
          size="small"
          sx={{ textTransform: "lowercase", alignItems: "center" }}
        >
          Sair da Sessão
        </Button>
      </UserContainer>
      <Button
        variant="contained"
        endIcon={<AddIcon fontSize="small" />}
        color="success"
        size="small"
        onClick={handleNewRoom}
      >
        Criar Sala
      </Button>
      <Typography variant="h5" textAlign="center" color="#f4f5f6">
        Salas
      </Typography>
      {isPending && <p>Carregando salas...</p>}
      {error && (
        <Typography color="error">Não foi possível buscar as salas</Typography>
      )}
      <RoomsList>
        {rooms?.map((item) => (
          <RoomItem key={item._id}>
            <RoomButton
              onClick={() => {
                handleJoinChat(item.nome);
              }}
              online={session.room == item.nome}
            >
              <Avatar sx={{ marginRight: 2 }}>
                <GroupsIcon />
              </Avatar>
              {item.nome}
            </RoomButton>
          </RoomItem>
        ))}
      </RoomsList>
      <Dialog open={newRoomModal} onClose={handleNewRoom}>
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle>Nova sala de conversa</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Informe o nome da sala que você deseja criar
            </DialogContentText>
            <TextField
              id="nome"
              placeholder="Nome"
              type="nome"
              fullWidth
              variant="outlined"
              inputRef={roomNameRef}
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleNewRoom}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={createNewRoom}>
              Criar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </GroupsContainer>
  );
};

export default GroupsComponet;
