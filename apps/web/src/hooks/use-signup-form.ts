import { useMutation } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../lib/api/auth';
import { ApiError } from '../lib/api-client';

export function useSignupForm() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate('/login', { state: { justSignedUp: true } });
    },
  });

  const error =
    mutation.error instanceof ApiError ? mutation.error : undefined;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({ firstname, lastname, email, password });
  }

  return {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    agreedToTerms,
    setAgreedToTerms,
    isPending: mutation.isPending,
    error,
    handleSubmit,
  };
}
