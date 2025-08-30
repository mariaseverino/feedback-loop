import { useMutation } from '@tanstack/react-query';
import type { LoginData } from '~/types/auth';
import { useNavigate } from 'react-router';
import { authenticateWithPassword, type UserAuthenticated } from '~/api/auth';
import type { AxiosError } from 'axios';
import { useState } from 'react';

export function useLogin() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation<
        UserAuthenticated,
        AxiosError<{ message?: string }>,
        LoginData
    >({
        mutationFn: authenticateWithPassword,
        onSuccess: () => {
            navigate('/dashboard');
        },
        onError: (error) => {
            setErrorMessage(
                error.response?.status === 400
                    ? 'Ops! Parece que o email ou a senha estão errados.'
                    : 'Ops! Algo deu errado. Estamos trabalhando para corrigir isso. Tente novamente mais tarde.'
            );
        },
    });

    return {
        ...mutation,
        errorMessage,
    };
}
