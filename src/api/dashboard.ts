import { api } from './client';
import type { AxiosError } from 'axios';

interface KPI {
    label: string;
    value: number;
    trending: 'UP' | 'DOWN';
    porcent: number;
}

interface Timeline {
    month: string;
    feedbacksIdentified: number;
    feedbacksAnonymous: number;
}

interface Stats {
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
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}

export async function getDashboardData(orgId: string) {
    const [stats, invites] = await Promise.all([
        getStats(orgId),
        getNotAcceptedInvites(orgId),
    ]);

    return { stats, invites };
}
