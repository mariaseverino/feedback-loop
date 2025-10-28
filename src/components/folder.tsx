import {
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    Send,
    Trash,
    X,
} from 'lucide-react';
import { SelectDemo } from './select-demo';
import { useEffect, useState, type ReactNode } from 'react';
import { removeMember, type Member } from '~/api/team';
import type { NotAcceptedInvites } from '~/api/dashboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '~/contexts/authContext';

type FolderItems = Member[] | string[];

interface FolderProps {
    itemsLength: number;
    tabs: string[];
    tab: number;
    setTab: (index: number) => void;
    filter?: { value: string; label: string }[];
    children: ReactNode;
    handleOpenModal: () => void;
    search?: string;
    setSearch?: (value: string) => void;
}

export function Folder({
    itemsLength,
    tabs,
    tab,
    setTab,
    filter,
    children,
    handleOpenModal,
    search = '',
    setSearch,
}: FolderProps) {
    const rowsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(itemsLength / rowsPerPage);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="rounded-4xl flex flex-col grow">
            <FolderHeader
                tabs={tabs}
                tab={tab}
                handleOpenModal={handleOpenModal}
                filter={filter}
                handleChangeTab={setTab}
                search={search}
                setSearch={setSearch}
            />

            <div className="bg-white rounded-3xl rounded-tl-none flex flex-col justify-between p-3 grow">
                <div className="bg-[#F2F5FA] rounded-t-3xl grow flex">
                    <div className="bg-white/60 grow">{children}</div>
                </div>
                {/* Paginação com setas */}
                <Pagination
                    rowsPerPage={rowsPerPage}
                    itemsLeangth={itemsLength}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                />
            </div>
        </div>
    );
}

interface NagivationTabProps {
    tab: number;

    tabs: string[];
    handleChangeTab: (index: number) => void;
    className?: string;
}

export function NagivationTab({
    tab,
    tabs,
    handleChangeTab,
    className,
}: NagivationTabProps) {
    useEffect(() => {
        console.log({ NagivationTab: tab });
    }, [tab]);
    return (
        <ul className={`col-span-2 flex bg-white ${className}`}>
            {tabs.map((item, index) => (
                <li
                    className={`w-full h-full bg-[#F2F5FA] ${item === tabs[tab] ? 'rounded-b-4xl' : 'rounded-bl-4xl first:rounded-br-4xl first:rounded-bl-none'}`}
                >
                    <button
                        className={`${item === tabs[tab] ? 'bg-white' : 'bg-white/60'} rounded-t-4xl w-full h-full flex items-center justify-center`}
                        onClick={() => handleChangeTab(index)}
                    >
                        {item}
                    </button>
                </li>
            ))}
        </ul>
    );
}

interface FolderHeaderProps {
    tabs: string[];
    tab: number;
    handleChangeTab: (index: number) => void;
    filter?: { value: string; label: string }[];
    handleOpenModal: () => void;
    search?: string;
    setSearch?: (value: string) => void;
}

export function FolderHeader({
    tabs,
    tab,
    handleChangeTab,
    handleOpenModal,
    search = '',
    setSearch,
}: FolderHeaderProps) {
    return (
        <div className="w-full grid grid-cols-5 justify-between">
            <NagivationTab
                tab={tab}
                tabs={tabs}
                handleChangeTab={handleChangeTab}
            />

            <div
                className={`h-full bg-white col-span-3 ${tab === 0 ? 'bg-white/60' : 'bg-white'}`}
            >
                <div className="bg-[#F2F5FA] h-full w-full rounded-bl-4xl flex gap-4 items-center pb-3 pl-3 ">
                    <button
                        className="bg-(--color-primary) text-white hover:bg-(--color-primary)/90 cursor-pointer flex items-center rounded-sm rounded-bl-3xl rounded-tr-3xl h-11 w-full font-medium transition-all duration-200 shadow-sm justify-center gap-2 px-3"
                        onClick={handleOpenModal}
                    >
                        <Plus className="size-5" />
                        <span>Convidar</span>
                    </button>
                    <div className="flex w-full gap-4">
                        <div className="lg:flex gap-2 items-center border rounded-md px-2 w-full shadow-xs text-sm hidden h-11 relative">
                            <Search className="text-muted-foreground size-4.5 " />
                            <input
                                type="text"
                                placeholder="Buscar membro..."
                                className="outline-0 text-muted-foreground"
                                value={search}
                                onChange={(e) => setSearch!(e.target.value)}
                            />
                            {search.length >= 3 && (
                                <button
                                    className="absolute bg-muted-foreground rounded-full right-2 flex items-center p-0.5 text-white hover:bg-muted-foreground/60"
                                    onClick={() => setSearch!('')}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MembersTable({ currentMembers }: { currentMembers: Member[] }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [removeMemberId, setRemoveMemberId] = useState<string>();

    function handleRemoveModal(memberId: string) {
        setOpenDeleteModal(true);
        setRemoveMemberId(memberId);
    }

    return (
        <>
            <table className="min-w-full text-sm text-left border-b border-(--color-background) rounded-3xl">
                <thead className="text-[#1E293B] uppercase text-xs font-semibold">
                    <tr>
                        <th className="px-6 py-3">Membro</th>
                        <th className="px-6 py-3 hidden lg:table-cell">
                            Email
                        </th>
                        <th className="px-6 py-3 hidden md:table-cell">
                            Função
                        </th>

                        <th className="px-6 py-3">Entrou em</th>

                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-(--color-background)">
                    {currentMembers.map(
                        ({ name, role, email, id, createdAt }) => (
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

                                <td className="px-6 py-4 text-(--color-muted-text)">
                                    {new Date(createdAt).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleRemoveModal(id)}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 cursor-pointer hover:text-red-400"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            {openDeleteModal && removeMemberId && (
                <DeleteMemberModal
                    onClose={setOpenDeleteModal}
                    memberId={removeMemberId}
                />
            )}
        </>
    );
}

interface InviteMemberModalProps {
    onClose: (newItem: boolean) => void;
    memberId: string;
}

function DeleteMemberModal({ onClose, memberId }: InviteMemberModalProps) {
    const { currentUser } = useAuth();

    const queryClient = useQueryClient();

    const { mutateAsync: removeMemberFn } = useMutation({
        mutationFn: removeMember,
        onSuccess(_, variables) {
            console.log(variables);
            queryClient.setQueryData(
                ['members', currentUser!.organizationId],
                (data: any) => {
                    return data.filter(
                        (member: any) => member.id !== variables
                    );
                }
            );
        },
        onError(error) {
            alert('deu errro');
            console.log(error);
        },
    });

    function handleRemoveMember() {
        removeMemberFn(memberId);
        onClose(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="h-screen w-screen bg-black absolute opacity-75 cursor-pointer"
                onClick={() => onClose(false)}
            ></div>

            <div className="flex items-center justify-center">
                <div className="max-w-full max-h-[90vh] w-[400px] relative z-50 bg-white p-6 rounded-3xl flex flex-col gap-6 shadow-lg">
                    <div className="space-y-1 flex flex-col items-center gap-2">
                        <AlertTriangle className="text-red-600 size-10" />
                        <h2 className="text-xl font-semibold">
                            Remover Membro
                        </h2>
                        <p className="text-base text-muted-foreground text-center">
                            Voce esta prestes de remover um membro da sua
                            equipe!
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-5 h-10 text-white">
                        <button
                            className="bg-blue-500 text-center rounded-sm font-medium transition-all duration-200 shadow-sm hover:bg-blue-500/70"
                            onClick={() => onClose(false)}
                            aria-label="Cancelar remocao do membro"
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-red-600 text-center rounded-sm font-medium transition-all duration-200 shadow-sm hover:bg-red-600/70"
                            aria-label="Remover membro"
                            onClick={handleRemoveMember}
                        >
                            Sim. Remova
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Pagination({
    itemsLeangth,
    rowsPerPage,
    handlePrevious,
    handleNext,
}: {
    itemsLeangth: number;
    rowsPerPage: number;
    handlePrevious: () => void;
    handleNext: () => void;
}) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(itemsLeangth / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;

    return (
        <div className="flex items-center py-3 gap-2 px-4 justify-end">
            <p className="text-sm text-(--color-muted-text)">
                {start + 1}–{Math.min(start + rowsPerPage, itemsLeangth)} de{' '}
                {itemsLeangth}
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
    );
}

export function NotAcceptedInvitesTable({
    notAcceptedInvites,
}: {
    notAcceptedInvites: NotAcceptedInvites[];
}) {
    return (
        <table className="min-w-full text-sm text-left border-b border-(--color-background) rounded-3xl">
            <thead className="text-[#1E293B] uppercase text-xs font-semibold">
                <tr>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3 hidden lg:table-cell">Função</th>

                    <th className="px-6 py-3">Convite enviado em</th>

                    {/* <th className="px-6 py-3"></th> */}
                </tr>
            </thead>
            <tbody className="divide-y divide-(--color-background)">
                {notAcceptedInvites.map(({ role, email, id, createdAt }) => (
                    <tr key={id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-(--color-muted-text)">
                            {email}
                        </td>
                        <td className="px-6 py-4 text-(--color-muted-text) hidden lg:table-cell">
                            {role}
                        </td>
                        <td className="px-6 py-4 text-(--color-muted-text) hidden md:table-cell">
                            {new Date(createdAt).toLocaleDateString()}
                        </td>

                        {/* <td className="px-6 py-4 text-(--color-muted-text)">
                            {createdAt}
                        </td> */}

                        {/* <td className="px-6 py-4">
                            <button
                                onClick={() => {
                                    console.log(`Remover membro`);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-blue-600 cursor-pointer hover:text-blue-400"
                            >
                                <Send size={16} />
                            </button>
                        </td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
