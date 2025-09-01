import { useState } from 'react';
import { Eye, EyeOff, MessagesSquare } from 'lucide-react';
import { loginFormSchema, type LoginData } from 'src/types/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from 'src/hooks/useAuth';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/login')({
    component: Login,
    head: () => ({
        meta: [
            {
                title: 'Login | FeedbackLoop',
            },
        ],
    }),
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            return redirect({ to: '/dashboard' });
        }
    },
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { mutate: login, errorMessage, isPending } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(loginFormSchema),
    });

    function handleLoginForm(data: LoginData) {
        login(data);
    }

    function handleSendEmail() {}

    return (
        <div className="flex min-h-screen flex-col justify-center items-center bg-[#F2F5FA]">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm min-w-96">
                <div className="flex flex-col items-center space-y-4">
                    <MessagesSquare
                        size={48}
                        className="text-(--color-primary)"
                    />
                    <h1 className="text-2xl font-semibold tracking-tight text-(--color-primary)">
                        FeedbackLoop
                    </h1>
                </div>
                <div className="grid auto-rows-min text-center gap-1.5 px-6">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Faça login
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Entre com suas credenciais para acessar sua conta
                    </p>
                </div>
                {/* <div className="grid auto-rows-min items-start gap-1.5 px-6 "> */}{' '}
                {/* depois */}
                {/* <div
                        data-slot="card-description"
                        className="text-muted-foreground text-sm"
                    >
                        Entre com sua conta do Github ou Google
                    </div> */}
                {/* </div> */}
                <div className="px-6 flex flex-col gap-4">
                    {/* depois */}
                    <>
                        {/* <div className="grid grid-cols-2 gap-6">
                        <button
                            data-slot="button"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3"
                        >
                            <svg viewBox="0 0 438.549 438.549">
                                <path
                                    fill="currentColor"
                                    d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                                ></path>
                            </svg>
                            GitHub
                        </button>
                        <button
                            data-slot="button"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3"
                        >
                            <svg role="img" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                ></path>
                            </svg>
                            Google
                        </button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card text-muted-foreground px-2">
                                Ou continue com
                            </span>
                        </div>
                    </div> */}
                    </>

                    <form
                        onSubmit={handleSubmit(handleLoginForm)}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-3">
                            <label
                                data-slot="label"
                                className="flex items-center gap-2 text-sm leading-none font-medium select-none"
                                htmlFor="email-create-account"
                            >
                                Email
                            </label>
                            <input
                                data-slot="input"
                                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                id="email"
                                type="text"
                                placeholder="m@email.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-destructive text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <label
                                    data-slot="label"
                                    className="flex items-center gap-2 text-sm leading-none font-medium select-none"
                                    htmlFor="password-create-account"
                                >
                                    Senha
                                </label>
                                <div className="text-sm">
                                    <button
                                        onClick={handleSendEmail}
                                        className="font-semibold text-(--color-primary) cursor-pointer"
                                    >
                                        Esqueceu a senha?
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {!showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-destructive text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                            {errorMessage && (
                                <p className="text-destructive text-sm">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                        <button
                            data-slot="button"
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-(--color-primary) text-white shadow-xs hover:bg-(--color-primary)/90 h-9 px-4 py-2 w-full mt-2"
                        >
                            {isPending ? 'Entrando' : 'Entrar'}
                        </button>
                    </form>
                    <p className="text-center text-sm/6 text-gray-400">
                        Não tem conta ainda?
                        <a
                            href="/register"
                            className="font-semibold text-(--color-primary) ml-1"
                        >
                            Comece por aqui
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
