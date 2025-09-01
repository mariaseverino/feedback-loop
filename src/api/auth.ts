import type { LoginData } from 'src/types/auth';
import { api } from './client';
import type { User } from 'src/hooks/useUser';
import type { AxiosError } from 'axios';

export type UserAuthenticated = {
    id: string | number;
    name: string;
    email: string;
    role: 'tenant' | 'admin' | 'member';
    organization: string;
};

export async function authenticateWithPassword(data: LoginData) {
    try {
        const response = await api.post<UserAuthenticated>('/auth', data, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}
