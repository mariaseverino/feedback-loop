export default function CallToAction() {
    return (
        <section className="pt-20 bg-white">
            <div className="bg-gradient-to-br from-[#965DE9] to-[#6458ee] p-2 rounded-3xl mx-4 sm:mx-8">
                <div className="flex flex-col items-center text-white min-h-[20rem] justify-center bg-white/10 rounded-3xl px-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 drop-shadow-md">
                        Construa uma cultura de feedback na sua equipe
                    </h2>
                    <p className="text-base sm:text-lg text-white mb-8 max-w-xl drop-shadow-md">
                        Comece grátis e veja como a troca de feedbacks pode
                        transformar seu ambiente de trabalho.
                    </p>
                    <a
                        href="/dashboard"
                        className="rounded-xl bg-white px-6 py-4 text-sm sm:text-lg font-bold text-(--color-primary) hover:bg-white/90 transition-all duration-200 flex items-center gap-2 shadow-md"
                    >
                        Assinar agora
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
