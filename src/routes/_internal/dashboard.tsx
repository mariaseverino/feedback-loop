import { Send, TrendingDown, TrendingUp } from 'lucide-react';
import {
    createFileRoute,
    Link,
    redirect,
    useNavigate,
} from '@tanstack/react-router';
import { Can } from '~/hooks/permissions';
import { ChartBarStacked } from '~/components/chart-bar-stacked';
import { useQuery } from '@tanstack/react-query';
import {
    getDashboardData,
    getNotAcceptedInvites,
    getStats,
    type KPI,
    type NotAcceptedInvites,
    type Timeline,
} from '~/api/dashboard';
import { useAuth } from '~/contexts/authContext';

import empty from '../../assets/Empty-bro.svg';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import type { Stats } from 'fs';
import type { Invite } from '~/api/team';

export const Route = createFileRoute('/_internal/dashboard')({
    component: Dashboard,
    head: () => ({
        meta: [
            {
                title: 'Dashboard | FeedbackLoop',
            },
        ],
    }),
    beforeLoad: ({ context }) => {
        console.log({ dshboard: context });
        if (
            context.auth.currentUser &&
            !Can(context.auth.currentUser.role, 'view_dashboard')
        ) {
            throw redirect({ to: '/feedback' });
        }
    },
});

export default function Dashboard() {
    const { currentUser, logout } = useAuth();

    const navigate = useNavigate();

    const {
        data: stats = { feedbackKpis: [], feedbackTimeline: [] },
        isError,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['stats', currentUser?.organizationId],
        queryFn: () => getStats(currentUser?.organizationId!),
    });

    if (isError) {
        const axiosError = error as AxiosError<{ message?: string }>;
        console.log(axiosError.status);
        if (axiosError.response?.status === 401) {
            logout();
            navigate({ to: '/login' });
        }
    }

    const { data: invites = [] } = useQuery({
        queryKey: ['not_accepted_invites', currentUser?.organizationId],
        queryFn: () => getNotAcceptedInvites(currentUser?.organizationId!),
    });

    if (isLoading) {
        console.log('loading');
    }

    if (error) {
        console.log('teste', error);
        logout();
        navigate({ to: '/login' });
    }

    return (
        <div className="flex flex-col px-6 py-14 gap-5 grow">
            <div>
                <h1 className="text-4xl font-bold pb-6">Dashboard</h1>
                <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-2">
                    {stats.feedbackKpis.map(
                        ({ label, value, trending, porcent }) => (
                            <Card
                                key={value}
                                label={label}
                                value={value}
                                trending={trending}
                                porcent={porcent}
                            />
                        )
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 grow">
                <ChartBarStacked
                    className="lg:col-span-3"
                    chartData={stats.feedbackTimeline}
                />

                <PendentMembers
                    className="lg:col-span-2"
                    notAcceptedInvites={invites}
                />
            </div>
        </div>
    );
}

export function PendentMembers({
    className,
    notAcceptedInvites,
}: {
    className?: string;
    notAcceptedInvites: NotAcceptedInvites[];
}) {
    if (!notAcceptedInvites) return null;

    const rowsPerPage = 12;

    const currentMembers = notAcceptedInvites.slice(0, rowsPerPage);

    return (
        <div className={`${className} border-0 rounded-3xl flex`}>
            <div className="bg-white rounded-3xl flex flex-col shadow-sm pb-2 grow">
                <div className="flex justify-between px-6 py-5">
                    <h2 className="leading-none font-semibold text-gray-800">
                        Membros Pendentes
                    </h2>
                </div>

                <div className="text-sm text-left px-6 overflow-y-auto">
                    <ul>
                        {currentMembers.map(({ email, id, token }) => (
                            <div
                                className="flex justify-between border-b items-center py-3 last:border-b-0"
                                key={id}
                            >
                                <div className="text-(--color-muted-text)">
                                    {email}
                                </div>

                                <button className="inline-flex gap-1 items-center text-(--color-primary) hover:underline cursor-pointer font-medium bg-(--color-primary-ligth) px-2 py-1 rounded-lg">
                                    <Send size={14} />
                                    Reenviar convite
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Card({
    label,
    value,
    trending,
    porcent,
}: {
    label: string;
    value: number | string;
    trending: 'UP' | 'DOWN' | 'N/A';
    porcent: number;
}) {
    return (
        <div className="bg-white p-6 rounded-2xl flex flex-col gap-4 shadow">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <div className="text-sm text-(--color-muted-text)">
                        {label}
                    </div>
                    <div className="text-3xl font-bold text-(--color-text)">
                        {value}
                    </div>
                </div>

                <TrendingLabel trending={trending} porcent={porcent} />
            </div>

            <TrendingMessage trending={trending} />
        </div>
    );
}

function TrendingMessage({ trending }: { trending: 'UP' | 'DOWN' | 'N/A' }) {
    if (trending === 'UP')
        return (
            <div className="mt-2">
                <div className="flex items-center gap-2 font-medium text-green-600">
                    Tendência de alta <TrendingUp size={16} />
                </div>
                <p className="text-xs text-(--color-muted-text)">
                    Comparado ao último mês
                </p>
            </div>
        );
    if (trending === 'DOWN')
        return (
            <div className="mt-2">
                <div className="flex items-center gap-2 font-medium text-red-600">
                    Tendência de queda <TrendingDown size={16} />
                </div>
                <p className="text-xs text-(--color-muted-text)">
                    Comparado ao último mês
                </p>
            </div>
        );
    // return <Minus className="text-gray-400" />; // N/A → neutro
}

function TrendingLabel({
    trending,
    porcent,
}: {
    trending: 'UP' | 'DOWN' | 'N/A';
    porcent: number;
}) {
    if (trending === 'UP') {
        return (
            <div className="flex gap-1.5 rounded-2xl items-center bg-[#C2FC92] text-green-60 py-1.5 px-2">
                <TrendingUp size={16} />

                <span className="font-medium text-sm">
                    {porcent === null ? 'Novo' : `${porcent}%`}
                </span>
            </div>
        );
    }

    if (trending === 'DOWN') {
        return (
            <div className="flex gap-1.5 rounded-2xl items-center bg-[#FBA9A9] text-red-60 py-1.5 px-2">
                <TrendingUp size={16} />

                <span className="font-medium text-sm">
                    {porcent === null ? 'Novo' : `${porcent}%`}
                </span>
            </div>
        );
    }

    return (
        <div className="flex gap-1.5 rounded-2xl items-center bg-[#959595] text-white py-1.5 px-2">
            <span className="font-medium text-sm">
                {porcent === null ? 'Novo' : `${porcent}%`}
            </span>
        </div>
    );
}

function EmptyDashboard() {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-md">
                <img
                    src={empty}
                    alt="Página não encontrada"
                    className="w-full"
                />
            </div>

            <h2 className="mt-6 text-2xl sm:text-3xl font-semibold text-gray-700">
                Nenhum feedback registrado ainda
            </h2>

            <p className="mt-4 text-gray-500 max-w-md">
                Você ainda não possui feedbacks ou membros cadastrados.
            </p>

            <Link
                to="/team"
                className="mt-8 rounded-xl bg-(--color-primary) px-8 py-4 text-base sm:text-lg font-bold text-white hover:scale-105 transition-transform duration-200 shadow-md"
            >
                Adicionar membro →
            </Link>
        </div>
    );
}
