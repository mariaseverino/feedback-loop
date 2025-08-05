import {
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Plus,
    Search,
    Send,
    Trash,
    UserPlus,
    X,
} from 'lucide-react';
import type { Route } from './+types/team';
import { useEffect, useRef, useState } from 'react';
import { SelectDemo } from '~/components/select-demo';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'FeedbackLoop' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export default function Team() {
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
    const rowsPerPage = 9;
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

    const columms = [
        { value: 'name', label: 'Name' },
        { value: 'role', label: 'Role' },
        { value: 'email', label: 'Email' },
        { value: 'department', label: 'Deparment' },
        { value: 'status', label: 'Status' },
        { value: 'joinDate', label: 'Join Date' },
    ];
    const interval = [
        { value: '7', label: 'Últimos 7 dias' },
        { value: '15', label: 'Últimos 15 dias' },
        { value: '30', label: 'Últimos 30 dias' },
        { value: '90', label: 'Últimos 90 dias' },
        { value: 'custom', label: 'Intervalo personalizado' },
    ];

    const filter = [
        { value: 'active', label: 'Ativos' },
        { value: 'inactive', label: 'Inativos' },
        { value: 'pending', label: 'Pendentes' },
        { value: 'admin', label: 'Admins' },
        { value: 'member', label: 'Membros' },
        { value: 'all', label: 'Todos' },
    ];

    const [isOpen, setIsOpen] = useState(false);
    // const [imgOpen, setImgOpen] = useState<number>(0);

    function handleOpenImg() {
        setIsOpen(true);
        // setImgOpen(index);
    }

    return (
        <>
            <div className="flex flex-col px-6 lg:px-11 pt-14 gap-5 pb-5">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                        Membros
                    </h1>
                    <p className="text-muted-foreground text-base mt-1">
                        Gerencie a sua equipe.
                    </p>
                </div>

                <div className="rounded-3xl flex flex-col bg-white/60 shadow-sm">
                    <div className="flex flex-col lg:flex-row justify-between items-center pb-5 pt-5 gap-3">
                        <div className="grid grid-cols-3 lg:flex lg:gap-5  rounded-tl-3xl w-full lg:w-auto px-4 gap-2.5">
                            <SelectDemo
                                items={columms}
                                placeholder="Colunas"
                                className="w-full lg:w-[180px]"
                            />
                            <SelectDemo
                                items={interval}
                                placeholder="Ultimos 30 dias"
                                className="w-full lg:w-[180px]"
                            />
                            <SelectDemo
                                items={filter}
                                placeholder="Filtro"
                                className="w-full lg:w-[180px]"
                            />

                            <div className="lg:flex gap-2 items-center border rounded-md px-2 w-full max-w-[300px] shadow-xs text-sm hidden">
                                <Search className="text-muted-foreground size-4.5 " />
                                <input
                                    type="text"
                                    placeholder="Buscar membro..."
                                    className="outline-0 text-muted-foreground"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-auto px-4 flex gap-2.5">
                            <div className="flex gap-2 items-center border rounded-md px-2 flex-1 shadow-xs text-sm lg:hidden">
                                <Search className="text-muted-foreground size-4.5 " />
                                <input
                                    type="text"
                                    placeholder="Buscar membro..."
                                    className="outline-0 text-muted-foreground"
                                />
                            </div>
                            <button
                                className="bg-(--color-primary) text-white px-4 md:px-6 py-2 hover:bg-(--color-primary)/90  cursor-pointer flex gap-1 items-center rounded-md font-medium transition-all duration-200 shadow-sm"
                                onClick={handleOpenImg}
                            >
                                <Plus
                                    size={20}
                                    className="hidden md:inline-block"
                                />
                                <span className="hidden md:inline-block">
                                    Convidar Membro
                                </span>
                                <UserPlus className="md:hidden inline-block" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl flex flex-col justify-between pt-2">
                        <table className="min-w-full text-sm text-left border-b border-(--color-background)">
                            <thead className="text-[#1E293B] uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-6 py-3">Membro</th>
                                    <th className="px-6 py-3 hidden lg:table-cell">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 hidden md:table-cell">
                                        Função
                                    </th>
                                    <th className="px-6 py-3 hidden md:table-cell">
                                        Squad
                                    </th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 hidden mlg:table-cell">
                                        Entrou em
                                    </th>

                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-(--color-background)">
                                {currentMembers.map(
                                    ({
                                        name,
                                        role,
                                        email,
                                        id,
                                        department,
                                        status,
                                        joinDate,
                                    }) => (
                                        <tr
                                            key={id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 text-(--color-muted-text)">
                                                {name}
                                            </td>
                                            <td className="px-6 py-4 text-(--color-muted-text) hidden lg:table-cell">
                                                {email}
                                            </td>
                                            <td className="px-6 py-4 text-(--color-muted-text) hidden md:table-cell">
                                                {role}
                                            </td>
                                            <td className="px-6 py-4 text-(--color-muted-text) hidden md:table-cell">
                                                {department}
                                            </td>

                                            <th className="px-6 py-3">
                                                <span
                                                    title={`${
                                                        status === 'ativo'
                                                            ? 'Membro já aceitou o convite'
                                                            : 'Membro ainda não aceitou o convite'
                                                    }`}
                                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                                                        status === 'ativo'
                                                            ? 'bg-green-100 text-green-800'
                                                            : status ===
                                                              'inativo'
                                                            ? 'bg-gray-100 text-gray-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                                >
                                                    {status}
                                                </span>
                                            </th>
                                            <td className="px-6 py-4 text-(--color-muted-text) hidden lg:table-cell">
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
                        <div className="flex items-center py-3 gap-2 px-4 justify-end">
                            <p className="text-sm text-(--color-muted-text)">
                                {start + 1}–
                                {Math.min(
                                    start + rowsPerPage,
                                    teamMembers.length
                                )}{' '}
                                de {teamMembers.length}
                            </p>

                            <div className="space-x-2">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                    className={`px-2 py-1 ${
                                        currentPage === 1
                                            ? 'text-gray-400'
                                            : 'text-(--color-primary) hover:bg-(--color-primary)/20 cursor-pointer rounded-full'
                                    }`}
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className={`px-2 py-1 ${
                                        currentPage === totalPages
                                            ? 'text-gray-400'
                                            : 'text-(--color-primary) hover:bg-(--color-primary)/20 cursor-pointer rounded-full'
                                    }`}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <InviteMemberModal setIsOpen={setIsOpen} />}
        </>
    );
}

function InviteMemberModal({
    setIsOpen,
}: {
    setIsOpen: (value: boolean) => void;
}) {
    const [email, setEmail] = useState('');
    const [invited, setInvited] = useState<string[]>([]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && email.trim() !== '') {
            e.preventDefault();

            if (!invited.includes(email.trim())) {
                setInvited((prev) => [...prev, email.trim()]);
            }

            setEmail('');
        }
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="h-screen w-screen bg-black absolute opacity-75 cursor-pointer"
                onClick={() => setIsOpen(false)}
            ></div>

            <div className="flex items-center justify-center">
                <div className="max-w-full max-h-[90vh] w-[400px] relative z-50 bg-white p-6 rounded-3xl flex flex-col gap-6 shadow-lg">
                    {/* Botão de fechar */}
                    <button
                        className="absolute top-2 right-2 text-muted-foreground hover:bg-(--color-primary)/20 cursor-pointer rounded-full transition flex items-center justify-center"
                        aria-label="Fechar modal"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="m-2" />
                    </button>

                    {/* Cabeçalho */}
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold">
                            Convide um membro
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Envie um convite para alguém fazer parte da sua
                            equipe.
                        </p>
                    </div>

                    {/* Campo de email */}
                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="nome@email.com"
                            className="outline-none text-sm w-full shadow-xs border border-muted rounded-md px-3 py-2 text-muted-foreground focus:ring-2 focus:ring-offset-1 focus:ring-(--color-primary)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <p className="text-xs text-muted-foreground">
                            Pressione Enter para adicionar
                        </p>
                    </div>

                    {/* Lista de convidados */}
                    {invited.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium">
                                Membros convidados
                            </p>
                            <ul className="text-sm text-muted-foreground space-y-1.5">
                                {invited.map((item, i) => (
                                    <li
                                        key={i}
                                        className="rounded-full bg-(--color-primary)/20 px-2 p-0.5 inline-block"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Botão de envio */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-(--color-primary) text-white font-medium rounded-md px-4 py-2 transition hover:bg-(--color-primary)/90 cursor-pointer"
                        >
                            Enviar convite
                        </button>
                    </div>
                </div>
            </div>
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
        <div className="relative inline-block" ref={menuRef}>
            <button
                onClick={() => setOpenId(isOpen ? null : id)}
                className="p-1 rounded hover:bg-gray-200"
            >
                <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {isOpen && (
                <div className="absolute right-2.5 z-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
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
