import { DoorOpen, MessagesSquare, Moon, Sun } from 'lucide-react';

interface HeaderProps {
    theme: string;
    handleTheme: () => void;
}

export default function Header({ theme, handleTheme }: HeaderProps) {
    return (
        <header className="bg-(--card-color) fixed w-screen">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex items-center gap-4 text-[#8470ff]">
                    <MessagesSquare className="size-8" />
                    <span className="font-bold text-xl md:block hidden">
                        FeedbackLoop
                    </span>
                </div>

                <div className="flex items-center gap-3 md:gap-5">
                    <button
                        onClick={handleTheme}
                        className="rounded-full bg-[#8470ff] text-white shadow-md hover:scale-105 transition-transform cursor-pointer p-2"
                        aria-label="Alternar tema"
                    >
                        {theme === 'dark' ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>
                    <button className="flex gap-1 items-center text-(--paragraph) cursor-pointer">
                        <span className="text-base font-medium hidden md:block">
                            Logout
                        </span>
                        <DoorOpen className="size-6 " />
                    </button>
                </div>
            </nav>
        </header>
    );
}
