import {
    createFileRoute,
    Link,
    Outlet,
    redirect,
    useNavigate,
} from '@tanstack/react-router';
import { DoorOpen, MessagesSquare, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '~/contexts/authContext';
import { Can } from '~/hooks/permissions';

export const Route = createFileRoute('/_internal')({
    component: InternalLayout,
    beforeLoad: ({ context }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({ to: '/login' });
        }
    },
    notFoundComponent: () => {
        throw redirect({ to: '/not-found-component' });
    },
});

export function InternalLayout() {
    const { currentUser } = useAuth();

    return (
        <>
            <NavBar />
            <main
                className={`lg:px-44 min-h-screen bg-[#F2F5FA] ${
                    currentUser && Can(currentUser.role, 'view_navbar')
                        ? 'pt-28'
                        : 'pt-16'
                }`}
            >
                <Outlet />
            </main>
        </>
    );
}

export function NavBar() {
    const [theme, setTheme] = useState('dark');
    const { currentUser, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const initials = currentUser?.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    function handleTheme() {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }

    function handleLogout() {
        logout();
        navigate({ to: '/login' });
    }

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate({ to: '/login' });
    //     }
    // }, [isAuthenticated, navigate]);

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
        <header className="bg-white fixed w-screen shadow-sm z-50">
            <div className="container mx-auto px-6 pt-5 flex flex-col">
                <div className="flex justify-between items-center pb-5">
                    <div className="flex items-center gap-4 text-(--color-primary)">
                        <MessagesSquare className="size-8" />
                        <span className="font-bold text-xl md:block hidden">
                            {currentUser?.organization}
                        </span>
                    </div>
                    <div className="flex gap-3 md:gap-4 items-center">
                        {/* <button
                            onClick={handleTheme}
                            className="rounded-full bg-(--color-primary) text-white shadow-md hover:scale-105 transition-transform cursor-pointer p-2.5 md:p-3"
                            aria-label="Alternar tema"
                        >
                            {theme === 'dark' ? (
                                <Sun size={22} />
                            ) : (
                                <Moon size={22} />
                            )}
                        </button> */}
                        <div className="flex items-center p-2.5 md:py-1.5 md:px-2.5 bg-[#F2F5FA] rounded-full justify-between md:w-64">
                            <div className="md:flex gap-2 items-center hidden">
                                <div className="bg-indigo-100 text-indigo-600 rounded-full w-9 h-9 flex items-center justify-center font-semibold">
                                    {initials}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {currentUser?.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {currentUser?.email}
                                    </span>
                                </div>
                            </div>
                            <button
                                className="cursor-pointer text-(--color-muted-text)"
                                onClick={handleLogout}
                            >
                                <DoorOpen />
                            </button>
                        </div>
                    </div>
                </div>
                {currentUser && Can(currentUser.role, 'view_navbar') && (
                    <nav className="flex">
                        <Link
                            to="/dashboard"
                            className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/team"
                            className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
                        >
                            Equipe
                        </Link>
                        <Link
                            to="/feedback"
                            className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
                        >
                            Feedbacks
                        </Link>
                        {currentUser &&
                            Can(currentUser.role, 'view_billing') && (
                                <Link
                                    to="/billing"
                                    className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
                                >
                                    Plano & Pagamentos
                                </Link>
                            )}
                        <Link
                            to="/help"
                            className="px-3 py-2 inline-block transition [&.active]:border-b-2 border-(--color-primary) [&.active]:text-(--color-primary) [&.active]:font-medium text-(--color-muted-text) hover:bg-(--color-primary-ligth)/20 hover:rounded-t-md"
                        >
                            Ajuda
                        </Link>{' '}
                        {/* <NavItem
                            to="dashboard"
                            label="Visão Geral"
                            active={location.pathname === '/dashboard'}
                        />
                        <NavItem
                            to="equipe"
                            label="Equipe"
                            active={location.pathname === '/equipe'}
                        />
                        <NavItem
                            to="feedback"
                            label="Feedbacks"
                            active={location.pathname === '/feedback'}
                        />
                        {currentUser &&
                            Can(currentUser.role, 'view_billing') && (
                                <NavItem
                                    to="plano-&-pagamento"
                                    label="Plano & Pagamentos"
                                    active={
                                        location.pathname ===
                                        '/plano-&-pagamento'
                                    }
                                />
                            )}
                        <NavItem
                            to="/ajuda"
                            label="Ajuda"
                            active={location.pathname === '/ajuda'}
                        /> */}
                    </nav>
                )}
            </div>
        </header>
    );
}
