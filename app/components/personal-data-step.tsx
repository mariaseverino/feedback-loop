'use client';

import type React from 'react';

import { useState } from 'react';

import { Eye, EyeOff, MessagesSquare } from 'lucide-react';

interface PersonalDataStepProps {
    data: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        organizationName: string;
        plan: 'free' | 'basic' | 'premium';
    };
    onUpdate: (data: Partial<PersonalDataStepProps['data']>) => void;
    onNext: () => void;
}

export function PersonalDataStep({
    data,
    onUpdate,
    onNext,
}: PersonalDataStepProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

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

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!data.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!data.email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!validateEmail(data.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (!data.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (!validatePassword(data.password)) {
            newErrors.password =
                'Senha deve ter 8+ caracteres, 1 maiúscula, 1 número e 1 caractere especial';
        }

        if (!data.confirmPassword) {
            newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
        } else if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }

        if (!data.organizationName.trim()) {
            newErrors.organizationName = 'Nome da organização é obrigatório';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onNext();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                            value={data.name}
                            onChange={(e) => onUpdate({ name: e.target.value })}
                            // className={errors.name ? 'border-destructive' : ''}
                            className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                            // required
                        />
                        {errors.name && (
                            <p className="text-destructive text-sm mt-1">
                                {errors.name}
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
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                onUpdate({ email: e.target.value })
                            }
                            placeholder="m@email.com"
                            // className={errors.email ? 'border-destructive' : ''}
                            className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                            // required
                        />
                        {errors.email && (
                            <p className="text-destructive text-sm mt-1">
                                {errors.email}
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
                                value={data.password}
                                onChange={(e) =>
                                    onUpdate({ password: e.target.value })
                                }
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
                                {errors.password}
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
                                value={data.confirmPassword}
                                onChange={(e) =>
                                    onUpdate({
                                        confirmPassword: e.target.value,
                                    })
                                }
                                // className={
                                //     errors.confirmPassword
                                //         ? 'border-destructive pr-10'
                                //         : 'pr-10'
                                // }
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
                                {errors.confirmPassword}
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
                    value={data.organizationName}
                    onChange={(e) =>
                        onUpdate({ organizationName: e.target.value })
                    }
                    placeholder="Ex: Tech Solutions Inc."
                    className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                />
                {errors.organizationName && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.organizationName}
                    </p>
                )}
            </div>

            <div>
                <label className="text-base font-medium">
                    Plano de Assinatura
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`cursor-pointer transition-all hover:shadow-md rounded-md ${
                                data.plan === plan.id
                                    ? 'ring ring-(--color-primary)'
                                    : 'border'
                            }`}
                            onClick={() => onUpdate({ plan: plan.id })}
                        >
                            <div className="text-center flex flex-col justify-between h-full py-2 ">
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
                            {/* <div>
                                <ul className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center text-sm"
                                        >
                                            <Check className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                        </div>
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
