import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { AuthProvider } from './contexts/authContext';
import { getSession } from './hooks/auth';
import notFoundImg from '../app/assets/404-error.svg';

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export async function loader({ request }: { request: Request }) {
    const session = await getSession(request.headers.get('Cookie'));
    const user = session.get('user') ?? null;

    return { user };
}

export default function App() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <AuthProvider user={user}>
            <Outlet />
        </AuthProvider>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details =
            error.status === 404
                ? 'The requested page could not be found.'
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <>
            {message === '404' ? (
                <NotFoundError />
            ) : (
                <main className="pt-16 p-4 container mx-auto">
                    <h1>{message}</h1>
                    <p>{details}</p>
                    {stack && (
                        <pre className="w-full p-4 overflow-x-auto">
                            <code>{stack}</code>
                        </pre>
                    )}
                </main>
            )}
        </>
    );
}

export function NotFoundError() {
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
