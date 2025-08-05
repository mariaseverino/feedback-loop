import { Outlet } from 'react-router';
// import Sidebar from '~/components/sidebar';
import { useState } from 'react';
import {
    BarChart3,
    Bell,
    CreditCard,
    HelpCircle,
    LayoutDashboard,
    MessagesSquare,
    PanelLeft,
    Users,
    Users2,
} from 'lucide-react';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar />
            <main className="md:pl-20 lg:pl-64 min-h-screen bg-[#f5f4ff]">
                <Outlet />
            </main>
        </>
    );
}

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {/* Botão toggle para mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-50"
                onClick={() => setIsOpen(true)}
            >
                <PanelLeft size={20} className="text-(--color-muted-text)" />
            </button>

            {/* Overlay para fechar */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`w-64 md:w-20 lg:w-64 h-screen flex flex-col justify-between bg-white shadow-sm fixed font-medium z-50 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
                {/* Topo - Logo */}
                <div className="p-6 text-(--color-primary) flex gap-2 border-b border-(--color-background)">
                    <MessagesSquare className="size-7" />
                    <h1 className="text-xl font-bold inline-block md:hidden lg:inline-block">
                        Dashboard RH
                    </h1>
                </div>
                {/* <MessagesSquare className="size-8" />
            <div className="hidden md:block">
                <h1 className="font-bold text-xl">Dashboard RH</h1>
                <p className="text-sm text-(--color-primary)/70">Admin User</p>
            </div> */}

                {/* Navegação Principal */}
                <nav className="flex-1 px-4 space-y-2 text-sm py-4 flex flex-col items-start md:items-center lg:items-start">
                    <NavItem
                        href="dashboard"
                        icon={
                            <LayoutDashboard className="size-5 md:size-6 lg:size-5" />
                        }
                        label="Visão Geral"
                    />
                    <NavItem
                        href=""
                        icon={
                            <BarChart3 className="size-5 md:size-6 lg:size-5" />
                        }
                        label="Relatórios"
                    />
                    <NavItem
                        href="equipe"
                        icon={<Users className="size-5 md:size-6 lg:size-5" />}
                        label="Equipe"
                    />
                    <NavItem
                        href=""
                        icon={<Users2 className="size-5 md:size-6 lg:size-5" />}
                        label="Squads"
                    />
                </nav>

                {/* Rodapé */}
                <div className="pb-2">
                    <div className="px-4 py-4 space-y-4 text-sm border-y border-(--color-background) flex flex-col items-start md:items-center lg:items-start">
                        <NavItem
                            href=""
                            icon={
                                <Bell className="size-5 md:size-6 lg:size-5" />
                            }
                            label="Notificações"
                        />
                        <NavItem
                            href=""
                            icon={
                                <CreditCard className="size-5 md:size-6 lg:size-5" />
                            }
                            label="Plano & Pagamentos"
                        />
                        <NavItem
                            href=""
                            icon={
                                <HelpCircle className="size-5 md:size-6 lg:size-5" />
                            }
                            label="Ajuda"
                        />
                    </div>
                    {/* Usuário */}
                    <div className="flex items-center gap-3 py-4 px-4  justify-start md:justify-center lg:justify-start">
                        <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                            MS
                        </div>
                        <div className="flex flex-col md:hidden lg:flex">
                            <span className="font-medium">Maria Severino</span>
                            <span className="text-xs text-gray-500">
                                maria@email.com
                            </span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

function NavItem({
    icon,
    label,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    href: string;
}) {
    return (
        <a
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-(--color-muted-text) hover:bg-(--color-primary-ligth) transition"
        >
            {icon}
            <span className="inline-block md:hidden lg:inline-block">
                {label}
            </span>
        </a>
    );
}
