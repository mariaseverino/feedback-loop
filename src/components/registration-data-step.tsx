import { useState } from 'react';
import { Eye, EyeOff, MessagesSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema, type RegistrationData } from 'src/types/auth';

interface PersonalDataStepProps {
    onSave: (data: RegistrationData) => void;
    onNext: () => void;
}

export function RegistrationDataStep({
    onSave,
    onNext,
}: PersonalDataStepProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const plans = [
        {
            id: 'free' as const,
            name: 'Gratuito',
            price: 'R$ 0',
            period: '/mês',
            description: 'Perfeito para começar',
            features: [
                'Até 100 feedbacks por mês',
                'Relatórios básicos',
                'Suporte por email',
            ],
        },
        {
            id: 'basic' as const,
            name: 'Básico',
            price: 'R$ 29',
            period: '/mês',
            description: 'Para pequenas equipes',
            features: [
                'Até 1.000 feedbacks por mês',
                'Relatórios avançados',
                'Integração com Slack',
                'Suporte prioritário',
            ],
        },
        {
            id: 'premium' as const,
            name: 'Premium',
            price: 'R$ 99',
            period: '/mês',
            description: 'Para empresas em crescimento',
            features: [
                'Feedbacks ilimitados',
                'Analytics avançados',
                'API personalizada',
                'Suporte 24/7',
                'Gerente de conta dedicado',
            ],
        },
    ];

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegistrationData>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: { plan: 'free' },
    });

    const selectedPlan = watch('plan');

    function handleRegisterForm(data: RegistrationData) {
        console.log(data);
        onSave(data);
        onNext();
    }

    return (
        <form onSubmit={handleSubmit(handleRegisterForm)} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
                <MessagesSquare size={48} className="text-(--color-primary)" />
                <h1 className="text-2xl font-semibold tracking-tight text-(--color-primary)">
                    FeedbackLoop
                </h1>
            </div>
            <div className="grid auto-rows-min text-center gap-1.5 px-6">
                <h2 className="text-2xl font-semibold text-foreground">
                    Criar Conta
                </h2>
                <p className="text-muted-foreground mt-2">
                    Configure sua conta para começar a usar a plataforma
                </p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="flex text-sm leading-none font-medium"
                        >
                            Nome Completo
                            <span
                                className="text-red-500 px-1"
                                title="Campo obrigatório"
                            >
                                *
                            </span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register('name')}
                            className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        />
                        {errors.name && (
                            <p className="text-destructive text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="flex text-sm leading-none font-medium"
                        >
                            E-mail
                            <span
                                className="text-red-500 px-1"
                                title="Campo obrigatório"
                            >
                                *
                            </span>
                        </label>
                        <input
                            id="email"
                            type="text"
                            {...register('email')}
                            placeholder="m@email.com"
                            className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        />
                        {errors.email && (
                            <p className="text-destructive text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
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
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                // required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
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
                    <p className="text-xs text-muted-foreground                                          col-span-2">
                        Mínimo 8 caracteres, 1 maiúscula, 1 número e 1 caractere
                        especial
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="organizationName"
                    className="flex text-sm leading-none font-medium"
                >
                    Nome da Organização/Empresa
                    <span
                        className="text-red-500 px-1"
                        title="Campo obrigatório"
                    >
                        *
                    </span>
                </label>
                <input
                    id="organizationName"
                    type="text"
                    {...register('organizationName')}
                    placeholder="Ex: Tech Solutions Inc."
                    className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                />
                {errors.organizationName && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.organizationName.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-base font-medium">
                    Plano de Assinatura
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {plans.map((plan) => (
                        <label
                            key={plan.id}
                            className={`cursor-pointer transition-all hover:shadow-md rounded-md relative block border p-4 ${
                                selectedPlan === plan.id
                                    ? 'ring-2 ring-(--color-primary)'
                                    : ''
                            }`}
                        >
                            <input
                                type="radio"
                                value={plan.id}
                                {...register('plan')}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="text-center flex flex-col justify-between h-full py-2">
                                <div className="text-lg">{plan.name}</div>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-2xl font-bold text-(--color-primary)">
                                        {plan.price}
                                    </span>
                                    <span className="text-muted-foreground text-sm">
                                        {plan.period}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {plan.description}
                                </p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-(--color-primary) text-white h-9 rounded-md"
            >
                Próxima Etapa
            </button>
            <p className="text-center text-sm/6 text-gray-400">
                Já tem uma conta?
                <a
                    href="/login"
                    className="font-semibold text-(--color-primary) hover:text-indigo-300 ml-1"
                >
                    Faça login
                </a>
            </p>
        </form>
    );
}
