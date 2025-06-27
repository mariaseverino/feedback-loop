import { LogOut, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
    theme: string;
    handleTheme: () => void;
}

export default function Header({ theme, handleTheme }: HeaderProps) {
    // const [theme, setTheme] = useState('dark');

    // function handleTheme() {
    //     setTheme((prevTheme) => {
    //         const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
    //         localStorage.setItem('theme', newTheme);
    //         return newTheme;
    //     });
    // }

    // useEffect(() => {
    //     function getThemeFromStorage() {
    //         const storedTheme = localStorage.getItem('theme');
    //         if (storedTheme) {
    //             setTheme(storedTheme);
    //         }
    //     }

    //     getThemeFromStorage();
    // }, []);

    return (
        <header className="bg-(--card-color) fixed w-screen">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                        />
                    </a>
                </div>

                <div className="flex items-center gap-5">
                    <button
                        onClick={handleTheme}
                        className="rounded-full bg-[#8470ff] text-(--headline) shadow-md hover:scale-105 transition-transform cursor-pointer p-2"
                        aria-label="Alternar tema"
                    >
                        {theme === 'dark' ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>
                    <div className="flex gap-1 items-center text-gray-600">
                        <label className="text-base font-medium">Sair</label>
                        <LogOut className="size-4.5" />
                    </div>
                </div>
            </nav>
        </header>
    );
}
