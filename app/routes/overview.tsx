import { ChartLineDots } from '~/components/chart-line-dots';
import type { Route } from './+types/overview';
import {
    Activity,
    Users,
    BarChart3,
    TrendingUp,
    TrendingDown,
    Send,
} from 'lucide-react';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'FeedbackLoop' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export default function Overview() {
    return (
        <div className="p-6 min-h-screen bg-[#f5f6fa] flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
                Painel de Administração
            </h2>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card
                    icon={<Activity size={20} />}
                    label="Feedbacks Enviados"
                    value="1.254"
                    trending="UP"
                />
                <Card
                    icon={<Users size={20} />}
                    label="Colaboradores Participantes"
                    value="67"
                    trending="DOWN"
                />
                <Card
                    icon={<BarChart3 size={20} />}
                    label="Média por Pessoa"
                    value="18,7"
                    trending="DOWN"
                />
                <Card
                    icon={<Users size={20} />}
                    label="Taxa de Engajamento"
                    value="78%"
                    trending="UP"
                />
            </section>

            {/* Gráfico de atividade */}

            <div className="grid grid-cols-3 gap-5 flex-1">
                <ChartLineDots isUp={true} className="col-span-2" />
                <PendentMembers />
            </div>

            {/* Participação por Squad */}
            {/* <section className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-lg font-semibold mb-4">
                    Engajamento por Squad
                </h3>
                <ul className="text-sm space-y-2">
                    <li className="flex justify-between">
                        <span>Produto</span>
                        <span className="font-medium">89%</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Marketing</span>
                        <span className="font-medium">73%</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Financeiro</span>
                        <span className="font-medium">41%</span>
                    </li>
                </ul>
            </section> */}

            {/* Ações recomendadas */}
            {/* <section className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Ações sugeridas</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                    <li>10 colaboradores ainda não enviaram feedback</li>
                    <li>
                        Time de Operações está com engajamento abaixo de 30%
                    </li>
                </ul>
            </section> */}
        </div>
    );
}

function Card({
    icon,
    label,
    value,
    trending,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    trending: 'UP' | 'DOWN';
}) {
    const isUp = trending === 'UP';

    return (
        <div className="bg-white p-6 rounded-2xl flex flex-col gap-4 border border-gray-200">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <div className="text-sm text-(--color-muted-text)">
                        {label}
                    </div>
                    <div className="text-3xl font-bold text-(--color-text)">
                        {value}
                    </div>
                </div>
                <div className="p-2 text-(--color-muted-text)">{icon}</div>
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

    const rowsPerPage = 7;

    const currentMembers = teamMembers.slice(0, rowsPerPage);

    return (
        <div>
            <h2 className="font-medium text-gray-800 text-xl mb-5">
                Membros Pendentes
            </h2>

            <div className="bg-white rounded-xl shadow border border-gray-200 flex flex-col justify-between">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#F1F5F9] text-[#1E293B] uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-4 py-3">Membro</th>
                            <th className="px-4 py-3 hidden md:table-cell">
                                Função
                            </th>

                            <th className="px-4 py-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 last:border-b border-gray-200">
                        {currentMembers.map(({ name, role, email, id }) => (
                            <tr key={id} className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {name}
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                            {email}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-700 hidden md:table-cell">
                                    {role}
                                </td>
                                <td className="px-4 py-4 ">
                                    <div className="flex gap-1 items-center text-sm text-indigo-600 hover:underline">
                                        <Send size={14} />
                                        Reenviar convite
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {currentMembers.length >= rowsPerPage && (
                    <div className="p-4 border-t text-sm text-indigo-600 text-center hover:underline cursor-pointer">
                        Ver mais
                    </div>
                )}
            </div>
        </div>
    );
}
