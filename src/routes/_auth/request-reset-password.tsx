import { MessagesSquare } from 'lucide-react';
import {
    forgetPasswordFormSchema,
    type ForgetPasswordFormData,
} from 'src/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/request-reset-password')({
    component: RequestResetPassword,
});

export default function RequestResetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgetPasswordFormData>({
        resolver: zodResolver(forgetPasswordFormSchema),
    });

    function handleLoginForm(data: ForgetPasswordFormData) {
        console.log('email enviado:', data);
        alert('email enviado');
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
                        Esqueceu a senha?
                    </h2>

                    <p className="text-muted-foreground mt-2">
                        Entre com seu email para resetar sua senha
                    </p>
                </div>
                <div
                    data-slot="card-content"
                    className="px-6 flex flex-col gap-4"
                >
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
                                type="email"
                                placeholder="m@email.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-destructive text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
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
