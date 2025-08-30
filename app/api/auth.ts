import type { LoginData } from '~/types/auth';
import { api } from './client';
import type { User } from '~/hooks/useUser';
import type { AxiosError } from 'axios';

export type UserAuthenticated = {
    token: string;
    user: User;
};

export async function authenticateWithPassword(data: LoginData) {
    try {
        const response = await api.post('/auth', data, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}
