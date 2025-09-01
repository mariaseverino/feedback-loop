import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/client';

export async function fetchCurrentUser(cookie: string): Promise<User> {
    const response = await api.get<User>('/auth/me', {
        headers: {
            Cookie: cookie,
        },
    });
    console.log(response.data);
    return response.data;
}

// export function useCurrentUser() {
//     return useQuery({
//         queryKey: ['currentUser'],
//         queryFn: fetchCurrentUser,
//     });
// }
export interface User {
    id: string | number;
    name: string;
    email: string;
    role: 'tenant' | 'admin' | 'member';
    organization: string;
}
