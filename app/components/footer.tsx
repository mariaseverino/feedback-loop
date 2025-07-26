import { ArrowUp } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] text-gray-400 text-sm mt-14">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Logo e descrição */}
                <div>
                    <span className="text-2xl font-bold text-white">
                        FeedbackLoop
                    </span>
                    <p className="mt-4 text-gray-300 leading-relaxed max-w-xs">
                        Plataforma simples para fomentar uma cultura de feedback
                        constante e transparente.
                    </p>
                </div>

                <div className="flex flex-col gap-3 md:items-start">
                    <a
                        href="#terms"
                        className="hover:text-white transition-colors"
                    >
                        Termos
                    </a>
                    <a
                        href="#privacy"
                        className="hover:text-white transition-colors"
                    >
                        Privacidade
                    </a>
                    <a
                        href="mailto:suporte@feedbackloop.com"
                        className="hover:text-white transition-colors"
                    >
                        Contato
                    </a>
                </div>

                <div className="flex md:justify-end">
                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                        className="group flex items-center gap-2 border border-gray-600 hover:border-white text-gray-400 hover:text-white justify-center transition-all size-12 rounded-full cursor-pointer"
                        aria-label="Voltar para o topo"
                    >
                        <ArrowUp
                            size={18}
                            className="group-hover:translate-y-[-2px] transition-transform"
                        />
                    </button>
                </div>
            </div>

            <div className="border-t border-white/10 mt-10 py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} FeedbackLoop. Todos os direitos
                reservados.
            </div>
        </footer>
    );
}
