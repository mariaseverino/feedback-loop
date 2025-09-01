import { useMutation } from '@tanstack/react-query';
import type { LoginData } from 'src/types/auth';
import { authenticateWithPassword, type UserAuthenticated } from 'src/api/auth';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '~/contexts/authContext';

export function useLogin() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { saveAuthenticatedUser } = useAuth();

    const mutation = useMutation<
        UserAuthenticated,
        AxiosError<{ message?: string }>,
        LoginData
    >({
        mutationFn: authenticateWithPassword,
        onSuccess: (data) => {
            saveAuthenticatedUser(data);
            navigate({
                to: '/dashboard',
            });
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
