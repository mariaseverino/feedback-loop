import { Send, TrendingDown, TrendingUp } from 'lucide-react';
import { ChartBarLabel } from '~/components/chart-bar-label';
import { ChartPieDonutText } from '~/components/chart-pie-donut-text';
import type { Route } from './+types/dashboard';
import { getSession } from '~/hooks/auth';
import type { User } from '~/hooks/useUser';
import { Can } from '~/hooks/permissions';
import { redirect } from 'react-router';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'FeedbackLoop' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export async function loader({ request }: { request: Request }) {
    const session = await getSession(request.headers.get('Cookie'));
    const currentUser = (session.get('currentUser') as User) ?? null;

    if (currentUser && Can(currentUser.role, 'view_dashboard')) {
        return redirect('/feedback');
    }
    return;
}

export default function Dashboard() {
    const cards = [
        {
            label: 'Feedbacks Enviados',
            value: '1.254',
            trending: 'UP',
            porcent: 20,
        },
        {
            label: 'Colaboradores Participantes',
            value: '67',
            trending: 'DOWN',
            porcent: 31,
        },
        {
            label: 'Média por Pessoa',
            value: '18,7',
            trending: 'DOWN',
            porcent: 12,
        },
        {
            label: 'Taxa de Engajamento',
            value: '78%',
            trending: 'UP',
            porcent: 9,
        },
    ];
    return (
        <div className="flex flex-col px-6 lg:px-11 pt-14 gap-5 pb-5">
            <div>
                <h1 className="text-4xl font-bold pb-6">Dashboard</h1>
                <div className="grid lg:grid-cols-4 gap-5 lg:gap-7">
                    {cards.map(({ label, value, trending, porcent }) => (
                        <Card
                            key={value}
                            label={label}
                            value={value}
                            trending={trending}
                            porcent={porcent}
                        />
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                <ChartBarLabel className="lg:col-span-2" />
                <ChartPieDonutText />
            </div>
            <div>
                <PendentMembers />
            </div>
        </div>
    );
}

function PendentMembers() {
    const teamMembers = [
        {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            role: 'Senior Developer',
            department: 'Engineering',
            status: 'ativo',
            joinDate: '2023-01-15',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 2,
            name: 'Michael Chen',
            email: 'michael.chen@company.com',
            role: 'Product Manager',
            department: 'Product',
            status: 'ativo',
            joinDate: '2023-03-20',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            email: 'emily.rodriguez@company.com',
            role: 'UX Designer',
            department: 'Design',
            status: 'ativo',
            joinDate: '2023-02-10',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 4,
            name: 'David Kim',
            email: 'david.kim@company.com',
            role: 'Marketing Specialist',
            department: 'Marketing',
            status: 'pendente',
            joinDate: '2022-11-05',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 5,
            name: 'Lisa Thompson',
            email: 'lisa.thompson@company.com',
            role: 'HR Manager',
            department: 'Human Resources',
            status: 'ativo',
            joinDate: '2022-08-12',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 6,
            name: 'Lisa Thompson',
            email: 'lisa.thompson@company.com',
            role: 'HR Manager',
            department: 'Human Resources',
            status: 'ativo',
            joinDate: '2022-08-12',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 7,
            name: 'Lisa Thompson',
            email: 'lisa.thompson@company.com',
            role: 'HR Manager',
            department: 'Human Resources',
            status: 'ativo',
            joinDate: '2022-08-12',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 8,
            name: 'Lisa Thompson',
            email: 'lisa.thompson@company.com',
            role: 'HR Manager',
            department: 'Human Resources',
            status: 'ativo',
            joinDate: '2022-08-12',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 9,
            name: 'Lisa Thompson',
            email: 'lisa.thompson@company.com',
            role: 'HR Manager',
            department: 'Human Resources',
            status: 'ativo',
            joinDate: '2022-08-12',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 10,
            name: 'Lisa Thompson',
            email: 'lisa.thompson@company.com',
            role: 'HR Manager',
            department: 'Human Resources',
            status: 'ativo',
            joinDate: '2022-08-12',
            avatar: '/placeholder.svg?height=40&width=40',
        },
    ];

    const rowsPerPage = 5;

    const currentMembers = teamMembers.slice(0, rowsPerPage);

    return (
        <div>
            <div className="bg-white rounded-3xl flex flex-col justify-between shadow-sm">
                <div className="flex justify-between px-6 py-5">
                    <h2 className="leading-none font-semibold text-gray-800">
                        Membros Pendentes
                    </h2>
                    {currentMembers.length >= rowsPerPage && (
                        <div className="text-sm text-(--color-primary) hover:underline cursor-pointer font-medium">
                            Ver mais
                        </div>
                    )}
                </div>

                <table className="min-w-full text-sm text-left">
                    <thead className="text-[#1E293B] uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-3">Membro</th>
                            <th className="px-6 py-3 hidden lg:table-cell">
                                Email
                            </th>
                            <th className="px-6 py-3  hidden md:table-cell">
                                Função
                            </th>

                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--color-background)">
                        {currentMembers.map(({ name, role, email, id }) => (
                            <tr key={id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-(--color-muted-text)">
                                    {name}
                                </td>
                                <td className="px-6 py-4 text-(--color-muted-text) hidden lg:table-cell">
                                    {email}
                                </td>
                                <td className="px-6 py-4 text-(--color-muted-text) hidden md:table-cell">
                                    {role}
                                </td>

                                <td className="px-6 py-4">
                                    <button className="inline-flex gap-1 items-center text-(--color-primary) hover:underline cursor-pointer font-medium bg-(--color-primary-ligth) px-2 py-1 rounded-lg">
                                        <Send size={14} />
                                        Reenviar convite
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
    value: string;
    trending: string;
    porcent: number;
}) {
    const isUp = trending === 'UP';

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
                <div
                    className={`flex gap-1.5 rounded-2xl items-center ${
                        isUp ? 'bg-[#C2FC92] text-green-60' : 'bg-[#FBA9A9]'
                    } py-1.5 px-2`}
                >
                    {isUp ? (
                        <>
                            <TrendingUp size={16} />
                        </>
                    ) : (
                        <>
                            <TrendingDown size={16} />
                        </>
                    )}
                    <span className="font-medium text-sm">{porcent} %</span>
                </div>
            </div>

            <div className="mt-2">
                <div
                    className={`flex items-center gap-2 font-medium ${
                        isUp ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {isUp ? (
                        <>
                            Tendência de alta este mês <TrendingUp size={16} />
                        </>
                    ) : (
                        <>
                            Tendência de queda este mês{' '}
                            <TrendingDown size={16} />
                        </>
                    )}
                </div>
                <p className="text-xs text-(--color-muted-text)">
                    Comparado aos últimos 6 meses
                </p>
            </div>
        </div>
    );
}
