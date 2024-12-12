import { FormEvent, useEffect, useState } from "react";
import {
  Container,
  Form,
  Input,
  Title,
  ErrorMessage,
  LoginImage,
} from "./styles";
import api from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../../redux/auth";
import { useNavigate } from "react-router";
import loginImage from "../../assets/login.svg";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { RootState } from "../../redux/store";

const Login = () => {
  const { auth } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!nickname || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setError("");

    const token = await api
      .post("/auth/login", { nickname, password })
      .then((res) => {
        return res.data.access_token;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          switch (error.code) {
            case "400":
              setError("Verifique os dados enviados");
              break;
            case "401":
              setError("Usuário ou senha incorreta");
              break;
            case "500":
              setError("Problemas com a requisição");
              break;
            case "502":
              setError("Serviço indisponível, tente novamente mais tarde");
          }
        } else {
          console.log(error);
        }
      });

    const profile = await api
      .post(
        "/auth/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          return { ...response.data, token };
        }
      });

    dispatch(setAuthentication(profile));
    navigate("/home");
  };

  useEffect(()=>{
      if(auth.id){
        navigate('home')
      }
  },[])

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Web Chat</Title>
        <LoginImage src={loginImage} />
        <Typography>Login</Typography>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Entrar
        </Button>
        <Button type={"button"} variant="text">
          Criar meu cadastro
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
