import NavBar from './navbar';

export default function HeroSection() {
    return (
        <section className="h-screen p-2">
            <div className="bg-gradient-to-r bg-linear-to-r from-[#191654] to-[#41bba6] rounded-3xl h-full flex flex-col">
                <NavBar />
                <div className="flex flex-1 items-center max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="">
                        <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-10 text-white/90 font-mono">
                            Fortaleça sua equipe com{' '}
                            <strong className="italic">FeedbackLoop</strong>.
                        </h1>
                        <p className="mt-6 text-xl text-[#e8eae5] md:w-2xl font-sans">
                            Construa uma cultura de confiança, escuta e
                            crescimento com feedbacks anônimos ou identificados.
                        </p>
                        {/* <a
                            href="/register"
                            className="mt-8 inline-block bg-white text-[#191654] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
                        >
                            Começar agora
                        </a> */}
                        <a
                            href="/signup"
                            className="mt-8 rounded-xl bg-white px-6 py-4 text-sm sm:text-lg font-bold text-[#191654] hover:bg-white/90 transition-all duration-200 items-center inline-block"
                        >
                            Começar agora
                            <span className="ml-2">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
