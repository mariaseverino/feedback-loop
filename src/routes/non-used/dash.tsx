import { useEffect, useRef, useState } from 'react';
import {
    DoorOpen,
    MessagesSquare,
    Moon,
    MoreVertical,
    Send,
    Sun,
    Trash,
} from 'lucide-react';
import type { Route } from './+types/dash';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Dashboard' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export default function Dashboard() {
    const cards = [
        {
            name: 'Total de membros',
            value: 5,
        },
        {
            name: 'Convites aceitos',
            value: 5,
        },
        {
            name: 'Convites pendentes',
            value: 5,
        },
    ];

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

    const [openId, setOpenId] = useState<number | null>(null);
    const rowsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(teamMembers.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    const currentMembers = teamMembers.slice(start, start + rowsPerPage);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const [theme, setTheme] = useState('dark');

    function handleTheme() {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }

    useEffect(() => {
        function getThemeFromStorage() {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                setTheme(storedTheme);
            }
        }

        getThemeFromStorage();
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f6fa]">
            {/* <header className="bg-[#eceaff] w-screen z-50">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex items-center gap-4 text-(--color-primary)">
                        <MessagesSquare className="size-8" />
                        <div className="hidden md:block">
                            <h1 className="font-bold text-xl">Dashboard RH</h1>
                            <p className="text-sm text-(--color-primary)/70">
                                Admin User
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-5">
                        <button
                            onClick={handleTheme}
                            className="rounded-full bg-(--color-primary) text-white shadow-md hover:scale-105 transition-transform cursor-pointer p-2"
                            aria-label="Alternar tema"
                        >
                            {theme === 'dark' ? (
                                <Sun size={20} />
                            ) : (
                                <Moon size={20} />
                            )}
                        </button>
                        <button className="flex gap-1 items-center text-(--color-text) cursor-pointer">
                            <span className="text-base font-medium hidden md:block">
                                Logout
                            </span>
                            <DoorOpen className="size-6" />
                        </button>
                    </div>
                </nav>
            </header> */}

            <section className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {cards.map(({ name, value }) => (
                        <div
                            key={name}
                            className="rounded-xl border border-gray-200 bg-white shadow p-6 text-center"
                        >
                            <p className="text-gray-600 text-sm">{name}</p>
                            <p className="text-3xl font-bold text-(--color-primary) mt-2">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Header + CTA */}
                <div className="flex justify-between items-center mt-8 mb-6">
                    <h2 className="text-2xl font-semibold text-(--color-primary)">
                        Gerencie a Equipe
                    </h2>
                    <button className="bg-[#43C6AC] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#3DBBA4] transition">
                        + Convidar Membro
                    </button>
                </div>

                {/* Tabela */}
                <div className=" bg-white rounded-xl shadow border border-gray-200">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#F1F5F9] text-[#1E293B] uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-3">Membro</th>
                                <th className="px-6 py-3 hidden md:table-cell">
                                    Função
                                </th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 hidden md:table-cell">
                                    Entrou em
                                </th>
                                <th className="px-6 py-3">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 last:border-b border-gray-200">
                            {currentMembers.map(
                                ({ name, role, status, joinDate, id }) => (
                                    <tr key={id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{name}</td>
                                        <td className="px-6 py-4 text-gray-700 hidden md:table-cell">
                                            {role}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                                                    status === 'ativo'
                                                        ? 'bg-green-100 text-green-800'
                                                        : status === 'inativo'
                                                        ? 'bg-gray-100 text-gray-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                            >
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-70 hidden md:table-cell">
                                            {joinDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <MemberActions
                                                status={status}
                                                name={name}
                                                id={id}
                                                openId={openId}
                                                setOpenId={setOpenId}
                                            />
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>

                    {/* Paginação com setas */}
                    <div className="flex flex-col items-center justify-between py-3 gap-2">
                        <p className="text-sm text-gray-600">
                            Exibindo {start + 1}–
                            {Math.min(start + rowsPerPage, teamMembers.length)}{' '}
                            de {teamMembers.length}
                        </p>

                        <div className="space-x-2">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 text-sm border rounded ${
                                    currentPage === 1
                                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                                        : 'text-blue-600 border-blue-300 hover:bg-blue-50'
                                }`}
                            >
                                Anterior
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 text-sm border rounded ${
                                    currentPage === totalPages
                                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                                        : 'text-blue-600 border-blue-300 hover:bg-blue-50'
                                }`}
                            >
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

interface MemberActionsProps {
    status: string;
    name: string;
    id: number | null;
    openId: number | null;
    setOpenId: (value: number | null) => void;
}

export function MemberActions({
    status,
    name,
    id,
    openId,
    setOpenId,
}: MemberActionsProps) {
    const menuRef = useRef(null);
    const isOpen = openId === id;

    // Fecha o menu ao clicar fora
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenId(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [setOpenId]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpenId(isOpen ? null : id)}
                className="p-1 rounded hover:bg-gray-200"
            >
                <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {isOpen && (
                <div className="absolute right-6 lg:right-23 z-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <span className="gap-2 px-4 py-2 border-b border-gray-200 w-full flex font-bold">
                        Ações
                    </span>
                    <ul className="text-sm text-gray-700 py-1">
                        {status === 'pendente' && (
                            <li>
                                <button
                                    onClick={() => {
                                        console.log(
                                            `Reenviar convite para ${name}`
                                        );
                                        setOpenId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                >
                                    <Send size={16} className="text-blue-600" />
                                    Reenviar convite
                                </button>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={() => {
                                    console.log(`Remover membro ${name}`);
                                    setOpenId(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                            >
                                <Trash size={16} />
                                Remover membro
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
