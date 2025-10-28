import type { AxiosError } from 'axios';
import { api } from './client';

export interface Member {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    role: string;
}

export interface Invite {
    // tenantId: string;
    email: string;
    // role: string;
}

export async function getMembers(organizationId: string): Promise<Member[]> {
    try {
        const response = await api.get<Member[]>(
            `members/5bffe1c6-be3c-43c0-a8e2-cb65b45cc810`,
            {
                withCredentials: true,
            }
        );

        // console.log(response.data);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        // console.log(error.response?.status);
        throw error.response?.status;
    }
}

export async function sendInvite(data: Invite) {
    try {
        const response = await api.post<Invite>('organization/invite', data, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}

export async function removeMember(memberId: string) {
    console.log('HHHHHHHH');
    console.log(api.defaults.baseURL);
    try {
        const response = await api.delete(
            `/organization/member/remove/${memberId}`,
            {
                withCredentials: true,
            }
        );
        console.log(response);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        console.log('erro', error);
        throw error;
    }
}
