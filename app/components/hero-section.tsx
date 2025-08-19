import { commitSession, getSession } from '~/hooks/auth';
import NavBar from './navbar';
import { Form, redirect } from 'react-router';

export default function HeroSection() {
    return (
        <section className="h-screen p-2">
            <div className="bg-gradient-to-br from-[#965DE9] to-[#6458ee] rounded-3xl h-full flex flex-col">
                <NavBar />
                <div className="flex flex-1 items-center max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="">
                        <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-10 text-white drop-shadow-md font-mono">
                            Fortaleça sua equipe com{' '}
                            <strong className="italic">FeedbackLoop</strong>.
                        </h1>
                        <p className="mt-6 text-xl text-white drop-shadow-sm md:w-2xl font-sans">
                            Construa uma cultura de confiança, escuta e
                            crescimento com feedbacks anônimos ou identificados.
                        </p>
                        {/* <a
                            href="/register"
                            className="mt-8 inline-block bg-white text-(--color-primary) font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
                        >
                            Começar agora
                        </a> */}
                        <Form method="post">
                            <button className="mt-8 rounded-xl bg-white px-6 py-4 text-sm sm:text-lg font-bold text-(--color-primary) hover:bg-white/90 transition-all duration-200 items-center inline-block shadow-md">
                                Começar agora
                                <span className="ml-2">→</span>
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}
