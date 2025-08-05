import { MessagesSquare } from 'lucide-react';

export default function NavBar() {
    return (
        <nav className="w-full pt-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo ou Nome */}
                <div className="flex items-center gap-4 text-white">
                    <MessagesSquare className="size-8" />
                    <span className="font-bold text-xl md:block hidden">
                        FeedbackLoop
                    </span>
                </div>

                {/* Links de navegação */}
                <div className="hidden md:flex space-x-8">
                    <a
                        href="#features"
                        className="text-white hover:text-white/90 transition font-medium font-sans"
                    >
                        Funcionalidade
                    </a>
                    <a
                        href="#resourses"
                        className="text-white hover:text-white/90 transition font-medium font-sans"
                    >
                        Recursos
                    </a>
                    <a
                        href="#plans"
                        className="text-white hover:text-white/90 transition font-medium font-sans"
                    >
                        Planos
                    </a>
                    {/* <a
                        href="#testimonials"
                        className="text-white hover:text-white/90 transition font-medium font-sans"
                    >
                        Depoimentos
                    </a> */}
                    <a
                        href="#faq"
                        className="text-white hover:text-white/90 transition font-medium font-sans"
                    >
                        FAQ
                    </a>
                </div>

                {/* Ações (login / CTA) */}
                <div className="hidden md:flex items-center space-x-4">
                    <a
                        href="/dashboard"
                        className="px-4 py-2 font-bold text-white hover:bg-white/10 transition-all duration-200 hover:rounded-xl"
                    >
                        Entrar
                    </a>
                    {/* <a
                        href="/register"
                        className="bg-white text-(--color-primary) px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition"
                    >
                        Criar conta
                    </a> */}
                    <a
                        href="/dashboard"
                        className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-(--color-primary) hover:bg-white/90 transition-all duration-200 shadow-md"
                    >
                        Criar conta
                    </a>
                </div>
            </div>
        </nav>
    );
}
