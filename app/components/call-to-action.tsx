export default function CallToAction() {
    return (
        <section className="pt-20 bg-white">
            <div className="bg-gradient-to-r from-[#191654] to-[#41bba6] p-2 rounded-3xl mx-4 sm:mx-8">
                <div className="flex flex-col items-center text-white min-h-[20rem] justify-center bg-white/10 rounded-3xl px-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Construa uma cultura de feedback na sua equipe
                    </h2>
                    <p className="text-base sm:text-lg text-white mb-8 max-w-xl">
                        Comece grátis e veja como a troca de feedbacks pode
                        transformar seu ambiente de trabalho.
                    </p>
                    <a
                        href="/signup"
                        className="rounded-xl bg-white px-6 py-4 text-sm sm:text-lg font-bold text-[#191654] hover:bg-white/90 transition-all duration-200 flex items-center gap-2"
                    >
                        Assinar agora
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
