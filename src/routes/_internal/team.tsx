import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
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
    type LucideProps,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    getNotAcceptedInvites,
    type NotAcceptedInvites,
} from '~/api/dashboard';
import { getMembers, sendInvite, type Member } from '~/api/team';
import {
    Folder,
    MembersTable,
    NotAcceptedInvitesTable,
} from '~/components/folder';
import { SelectDemo } from '~/components/select-demo';
import { useAuth, type IUser } from '~/contexts/authContext';
import { Can } from '~/hooks/permissions';
import { PendentMembers } from './dashboard';
import { fi } from 'zod/v4/locales';

export const Route = createFileRoute('/_internal/team')({
    component: Team,
    head: () => ({
        meta: [
            {
                title: 'Equipe | FeedbackLoop',
            },
        ],
    }),
    beforeLoad: ({ context }) => {
        if (!context.auth.currentUser) {
            throw redirect({ to: '/login' });
        }
        if (
            context.auth.currentUser &&
            !Can(context.auth.currentUser.role, 'view_team')
        ) {
            throw redirect({ to: '/feedback' });
        }
    },
});

export default function Team() {
    const navigate = useNavigate();

    const { currentUser, logout } = useAuth();

    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const [filteredInvites, setFilteredInvites] = useState<
        NotAcceptedInvites[]
    >([]);
    const [search, setSearch] = useState('');

    const {
        data: members = [],
        error,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ['members', currentUser?.organizationId],
        queryFn: () => getMembers(currentUser?.organizationId!),
    });

    const { data: invites = [] } = useQuery({
        queryKey: ['not_accepted_invites', currentUser?.organizationId],
        queryFn: () => getNotAcceptedInvites(currentUser?.organizationId!),
        enabled: !!currentUser?.organizationId, // evita rodar sem ID
    });

    if (isSuccess) {
        console.log('aeeeeee');
        // setFilteredMembers(members);
        // setFilteredInvites(invites);
    }

    if (isLoading) {
        console.log('loading');
    }

    if (error) {
        console.log('teste', error);
        logout();
        navigate({ to: '/login' });
    }

    // setFilteredMembers(members);
    // setFilteredInvites(invites);

    const rowsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(members.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    const currentMembers = members.slice(start, start + rowsPerPage);

    const filter = [
        { value: 'active', label: 'Ativos' },
        { value: 'inactive', label: 'Inativos' },
        { value: 'pending', label: 'Pendentes' },
        { value: 'admin', label: 'Admins' },
        { value: 'member', label: 'Membros' },
        { value: 'all', label: 'Todos' },
    ];

    const [tab, setTab] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOnClouseModal(newItem: boolean) {
        if (newItem) {
            setTab(1);
        }
        setIsModalOpen(false);
    }

    useEffect(() => {
        if (search.length >= 3) {
            if (tab === 0) {
                setFilteredMembers(
                    members.filter(
                        (member) =>
                            member.name.includes(search) ||
                            member.email.includes(search)
                    )
                );
            } else if (tab === 1) {
                setFilteredInvites(
                    invites.filter((invite) => invite.email.includes(search))
                );
            }
        } else {
            setFilteredMembers(members);
            setFilteredInvites(invites);
        }
    }, [search, members, invites, tab]);

    return (
        <>
            <div className="flex flex-col px-6 py-14 gap-6 grow ">
                <div>
                    <h1 className="text-4xl font-bold">Equipe</h1>
                    {/* <p className="text-muted-foreground text-base mt-1">
                        Gerencie a sua equipe.
                    </p> */}
                </div>

                <Folder
                    itemsLength={
                        tab == 0
                            ? filteredMembers.length
                            : filteredInvites.length
                    }
                    tabs={['Membros', 'Convites Enviados']}
                    tab={tab}
                    setTab={setTab}
                    filter={filter}
                    handleOpenModal={() => setIsModalOpen(true)}
                    search={search}
                    setSearch={setSearch}
                >
                    {tab == 0 ? (
                        <MembersTable currentMembers={filteredMembers} />
                    ) : (
                        <NotAcceptedInvitesTable
                            notAcceptedInvites={filteredInvites}
                        />
                    )}
                    {/* <MembersTable currentMembers={currentMembers} /> */}
                </Folder>
            </div>
            {isModalOpen && (
                <InviteMemberModal
                    onClose={handleOnClouseModal}
                    currentUser={currentUser!}
                />
            )}
        </>
    );
}

interface InviteMemberModalProps {
    onClose: (newItem: boolean) => void;
    currentUser: IUser;
}

function InviteMemberModal({ onClose, currentUser }: InviteMemberModalProps) {
    const [email, setEmail] = useState('');
    const [invited, setInvited] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleNewEmail() {
        if (!invited.includes(email.trim())) {
            setInvited((prev) => [...prev, email.trim()]);
        }
        setEmail('');
    }

    const queryClient = useQueryClient();

    const { mutateAsync: sendInviteFn } = useMutation({
        mutationFn: sendInvite,
        onSuccess(_, variables) {
            console.log('sucesso');
            queryClient.setQueryData(
                ['not_accepted_invites', currentUser.organizationId],
                (data: any) => {
                    console.log({ data: data });
                    return [
                        ...data,
                        {
                            id: crypto.randomUUID(),
                            email: variables.email,
                            role: 'member',
                            createdAt: new Date().toISOString(),
                        },
                    ];
                }
            );
        },
        onError(error) {
            alert('deu errro');
            console.log(error);
        },
    });

    async function handleSendInvite() {
        setIsLoading(true);

        invited.forEach(async (email) => {
            console.log({ inited: email });
            await sendInviteFn({
                email: email,
            });
        });

        onClose(true);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="h-screen w-screen bg-black absolute opacity-75 cursor-pointer"
                onClick={() => onClose(false)}
            ></div>

            <div className="flex items-center justify-center">
                <div className="max-w-full max-h-[90vh] w-[400px] relative z-50 bg-white p-6 rounded-3xl flex flex-col gap-6 shadow-lg">
                    {/* Botão de fechar */}
                    <button
                        className="absolute top-2 right-2 text-muted-foreground hover:bg-(--color-primary)/20 cursor-pointer rounded-full transition flex items-center justify-center"
                        aria-label="Fechar modal"
                        onClick={() => onClose(false)}
                    >
                        <X className="m-2" />
                    </button>

                    {/* Cabeçalho */}
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold">
                            Convidar novo membro
                        </h2>
                        {/* <p className="text-sm text-muted-foreground">
                            Envie um convite para alguém fazer parte da sua
                            equipe.
                        </p> */}
                    </div>

                    {/* Campo de email */}
                    <div className="flex gap-2 h-10">
                        {/* <label
                            htmlFor="email"
                            className="text-sm font-medium mb-2"
                        >
                            Email
                        </label> */}
                        <input
                            id="email"
                            type="email"
                            placeholder="nome@email.com"
                            className="outline-none text-sm w-full shadow-xs border border-gray-200 rounded-md px-3 py-2 text-gray-600 h-full m-0 grow"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // onKeyDown={handleKeyDown}
                        />
                        {/* <p className="text-xs text-muted-foreground">
                            Pressione Enter para adicionar
                        </p> */}
                        <button
                            className="bg-(--color-primary) text-white hover:bg-(--color-primary)/90 cursor-pointer flex items-center rounded-sm font-medium transition-all duration-200 shadow-sm justify-center gap-2 px-3"
                            onClick={handleNewEmail}
                        >
                            <Plus className="size-5" />
                            <span>Adicionar</span>
                        </button>
                    </div>

                    {/* Lista de convidados */}
                    {invited.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <p className="text-base font-medium">
                                Membros convidados
                            </p>
                            <ul className="text-sm text-muted-foreground divide-y divide-gray-200">
                                {invited.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex justify-between items-center py-2"
                                    >
                                        {item}
                                        <button
                                            // onClick={() => handleRemoveEmail(e)}
                                            className="text-sm text-red-500 hover:text-red-700"
                                            // disabled={isLoading}
                                        >
                                            <Trash size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Botão de envio */}
                    <div>
                        <button
                            // type="submit"
                            onClick={handleSendInvite}
                            className={`w-full text-white font-medium rounded-md px-4 py-2 transition cursor-pointer ${
                                invited.length === 0 || isLoading
                                    ? 'bg-(--color-primary)/80 cursor-not-allowed'
                                    : 'bg-(--color-primary) hover:bg-(--color-primary)/90'
                            }`}
                            disabled={invited.length === 0 || isLoading}
                        >
                            {isLoading && (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}
                            {isLoading ? 'Enviando...' : 'Enviar convite'}
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
    const menuRef = useRef<HTMLDivElement>(null);
    const isOpen = openId === id;

    // Fecha o menu ao clicar fora
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
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
