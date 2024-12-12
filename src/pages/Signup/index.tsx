// Importações necessárias
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormWrapper, Title, Label, ErrorMessage, Container, Input, Button, Form } from './signup.style';
import api from '../../services/api';
import { useNavigate } from 'react-router';

// Interface para o formulário
interface FormValues {
  nickname: string;
  email: string;
  password: string;
}

// Componente principal
const SignupScreen: React.FC = () => {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    api.post('/auth/register', data).then(() => {
      setRegistered(true)
    })
  };

  return (
    <Container>
      <FormWrapper>
        <Title>{registered ? 'Cadastrado!' : 'Cadastro'}</Title>
        {registered ? <Button type="button" onClick={() => navigate("/")}>Fazer login</Button>
          : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                {...register('nickname', { required: 'Nickname é obrigatório' })}
              />
              {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}

              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email inválido',
                  },
                })}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'A senha deve ter pelo menos 6 caracteres',
                  },
                })}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

              <Button type="submit">Cadastrar</Button>
            </Form>)}
      </FormWrapper>
    </Container >
  );
};

export default SignupScreen;