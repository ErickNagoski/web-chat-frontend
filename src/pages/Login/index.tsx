import { FormEvent, useState } from 'react';
import { Container, Form, Input, Button, Title, ErrorMessage } from './styles';
import api from '../../services/api';
import { useDispatch } from 'react-redux';
import { setAuthentication } from '../../redux/auth';
import { useNavigate } from 'react-router';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!nickname || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setError('');

        const token = await api.post('/auth/login', { nickname, password })
            .then(res => {
                return res.data.access_token
            })
            .catch(error => console.log(error))

        const profile = await api.post('/auth/profile', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.data) {
                return ({ ...response.data, token })
            }
        })

        dispatch(setAuthentication(profile))
        navigate("/home");

    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Login</Title>
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
                <Button type="submit">Entrar</Button>
            </Form>
        </Container>
    );
};

export default Login;
