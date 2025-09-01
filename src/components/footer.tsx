import { ArrowUp } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#eceaff] via-[#c5bfff] to-[#a3bfff] text-sm mt-14">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Logo e descrição */}
                <div>
                    <span className="text-2xl font-bold text-[#4b4b4b]">
                        FeedbackLoop
                    </span>
                    <p className="mt-4 text-[#4b4b4b] leading-relaxed max-w-xs">
                        Plataforma simples para fomentar uma cultura de feedback
                        constante e transparente.
                    </p>
                </div>

                <div className="flex flex-col gap-3 md:items-start text-[#4b4b4b]">
                    <a
                        href="#terms"
                        className="hover:text-[#4b4b4b]/90 transition-colors"
                    >
                        Termos
                    </a>
                    <a
                        href="#privacy"
                        className="hover:text-[#4b4b4b]/90 transition-colors"
                    >
                        Privacidade
                    </a>
                    <a
                        href="mailto:suporte@feedbackloop.com"
                        className="hover:text-[#4b4b4b]/90 transition-colors"
                    >
                        Contato
                    </a>
                </div>

                <div className="flex md:justify-end">
                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                        className="group flex items-center gap-2 border border-[#4b4b4b] hover:border-white text-[#4b4b4b] hover:text-white justify-center transition-all size-12 rounded-full cursor-pointer bg-white/10 backdrop-blur"
                        aria-label="Voltar para o topo"
                    >
                        <ArrowUp
                            size={18}
                            className="group-hover:translate-y-[-2px] transition-transform"
                        />
                    </button>
                </div>
            </div>

            <div className="border-t border-white/10 mt-10 py-6 text-center text-sm text-[#4b4b4b]">
                © {new Date().getFullYear()} FeedbackLoop. Todos os direitos
                reservados.
            </div>
        </footer>
    );
}
