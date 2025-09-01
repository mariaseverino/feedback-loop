import { createFileRoute } from '@tanstack/react-router';
import notFoundImg from '../assets/404-error.svg';

export const Route = createFileRoute('/not-found-component')({
    component: NotFoundComponent,
});

export function NotFoundComponent() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#F2F5FA] text-center px-4">
            <div className="max-w-md">
                <img
                    src={notFoundImg}
                    alt="Página não encontrada"
                    className="w-full"
                />
            </div>

            <h2 className="mt-6 text-2xl sm:text-3xl font-semibold text-gray-700">
                Ops! Página não encontrada
            </h2>

            <p className="mt-4 text-gray-500 max-w-md">
                Parece que você se perdeu... A página que você procura não
                existe ou foi movida.
            </p>

            <button
                onClick={() => (window.location.href = '/dashboard')}
                className="mt-8 rounded-xl bg-(--color-primary) px-8 py-4 text-base sm:text-lg font-bold text-white hover:scale-105 transition-transform duration-200 shadow-md"
            >
                Voltar para a página inicial →
            </button>
        </div>
    );
}
