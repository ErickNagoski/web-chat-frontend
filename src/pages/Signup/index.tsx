// Importações necessárias
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router';
import { FormWrapper, Title, Label, ErrorMessage, Container, Input, Button } from './signup.style';

// Interface para o formulário
interface FormValues {
  nickname: string;
  email: string;
  password: string;
}

// Componente principal
const SignupScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Cadastro</Title>
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
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default SignupScreen;