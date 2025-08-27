import { useState } from 'react';
import { Eye, EyeOff, MessagesSquare } from 'lucide-react';
import type { Route } from './+types/reset-password';
import { useForm } from 'react-hook-form';
import { resetPasswordFormSchema, type ResetPasswordData } from '~/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'FeedbackLoop' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordData>({
        resolver: zodResolver(resetPasswordFormSchema),
    });

    function handleResetPasswordForm(data: ResetPasswordData) {
        console.log('reset realizado:', data);
        alert('reset realizado');
    }
    return (
        <div className="flex min-h-screen flex-col justify-center items-center bg-[#F2F5FA]">
            <div
                data-slot="card"
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm max-w-96"
            >
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
                    <h2 className="text-2xl font-semibold text-foreground">
                        Mude sua senha
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Crie uma nova senha para poder acessar a plataforma
                    </p>
                </div>
                <div
                    data-slot="card-content"
                    className="px-6 flex flex-col gap-4"
                >
                    <form
                        onSubmit={handleSubmit(handleResetPasswordForm)}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="flex text-sm leading-none font-medium"
                                >
                                    Senha
                                    <span
                                        className="text-red-500 px-1"
                                        title="Campo obrigatório"
                                    >
                                        *
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
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
                                        {showPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                    Mínimo 8 caracteres, 1 maiúscula, 1 número e
                                    1 caractere especial
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className="flex text-sm leading-none font-medium"
                                >
                                    Confirmar Senha
                                    <span
                                        className="text-red-500 px-1"
                                        title="Campo obrigatório"
                                    >
                                        *
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        {...register('confirmPassword')}
                                        className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                        // required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-3">
                            <a
                                href="/login"
                                className="flex-1 bg-transparent text-(--color-primary) h-9 rounded-md border border-(--color-primary) cursor-pointer flex items-center justify-center"
                            >
                                Cancelar
                            </a>
                            <button
                                type="submit"
                                className="flex-1 bg-(--color-primary) text-white h-9 rounded-md cursor-pointer"
                            >
                                Resetar senha
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
