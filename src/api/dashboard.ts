import { api } from './client';
import type { AxiosError } from 'axios';

export interface KPI {
    label: string;
    value: number;
    trending: 'UP' | 'DOWN';
    porcent: number;
}

export interface Timeline {
    month: string;
    feedbacksIdentified: number;
    feedbacksAnonymous: number;
}

export interface Stats {
    feedbackKpis: KPI[];
    feedbackTimeline: Timeline[];
}

export interface NotAcceptedInvites {
    id: string;
    email: string;
    tenantId: string;
    role: string;
    token: string;
    accepted: boolean;
    createdAt: string;
}

export async function getStats(organizationId: string): Promise<Stats> {
    try {
        const response = await api.get<Stats>(
            `/organization/${organizationId}/stats`,
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}

export async function getNotAcceptedInvites(
    organizationId: string
): Promise<NotAcceptedInvites[]> {
    try {
        const response = await api.get<NotAcceptedInvites[]>(
            `/invites/${organizationId}/not-accepted`,
            { withCredentials: true }
        );
        console.log(response.data);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        // console.log({ message: error.response?.data });
        throw error;
    }
}

export async function getDashboardData(orgId: string) {
    const [stats, invites] = await Promise.all([
        getStats(orgId),
        getNotAcceptedInvites(orgId),
    ]);

    console.log(stats, invites);

    return { stats, invites };
}
