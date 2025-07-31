import {
    Inbox,
    LogOut,
    MessageSquare,
    Moon,
    Send,
    Settings,
    Sun,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { NavLink } from 'react-router';

export default function Sidebar() {
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
        <aside className="w-60 bg-[#eceaff] h-screen fixed text-[#45454b]">
            <div className="p-5 flex flex-col justify-between h-full">
                <div>
                    <div className="mb-10 text-xl font-bold mt-2 ml-2">
                        FeedbackLoop
                    </div>
                    <nav className="flex flex-col gap-4">
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex gap-2 p-2 ${
                                    isActive
                                        ? 'bg-(--color-primary) rounded-full text-[#f5f4ff]'
                                        : ''
                                }`
                            }
                        >
                            <Inbox />
                            <span>Feedback Recebido</span>
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex gap-2 p-2 ${
                                    isActive
                                        ? 'bg-(--color-primary) rounded-full'
                                        : ''
                                }`
                            }
                        >
                            <MessageSquare />
                            <span>Feedback Enviados</span>
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex gap-2 p-2 ${
                                    isActive
                                        ? 'bg-(--color-primary) rounded-full'
                                        : ''
                                }`
                            }
                        >
                            <Send />
                            <span>Enviar Feedback</span>
                        </NavLink>
                    </nav>
                </div>
                <div>
                    <div className="flex gap-2 mb-5 p-2">
                        <LogOut />
                        <span>Sair</span>
                    </div>
                    <button
                        onClick={handleTheme}
                        className="rounded-full bg-(--color-primary) text-[#f5f4ff] shadow-md hover:scale-105 transition-transform cursor-pointer ml-2 p-2"
                        aria-label="Alternar tema"
                    >
                        {theme === 'dark' ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
}

interface NavItemProps {
    icon: ReactNode;
    title: string;
}

function NavItem({ icon, title }: NavItemProps) {
    return (
        <NavLink
            to="/"
            className={({ isActive }) =>
                `flex gap-2 mb-2 p-2 ${
                    isActive ? 'bg-(--color-primary) rounded-full' : ''
                }`
            }
        >
            {icon}
            <span>{title}</span>
        </NavLink>
    );
}
