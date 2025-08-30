import type { User } from '~/hooks/useUser';
import { api } from './client';
import type { AxiosError } from 'axios';

export async function fetchCurrentUser(cookie: string): Promise<User> {
    try {
        const response = await api.get<User>('/auth/me', {
            headers: {
                Cookie: cookie,
            },
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}
