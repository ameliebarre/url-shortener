import { useMutation } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../lib/api/auth';
import { ApiError } from '../lib/api-client';

export function useLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ token, refreshToken }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/');
    },
  });

  const error =
    mutation.error instanceof ApiError ? mutation.error : undefined;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({ email, password });
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isPending: mutation.isPending,
    error,
    handleSubmit,
  };
}
