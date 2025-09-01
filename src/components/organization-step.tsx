'use client';

import type React from 'react';

import { useState } from 'react';

import { Check } from 'lucide-react';

interface OrganizationStepProps {
    data: {
        organizationName: string;
        plan: 'free' | 'basic' | 'premium';
    };
    onUpdate: (data: Partial<OrganizationStepProps['data']>) => void;
    onNext: () => void;
    onPrev: () => void;
}

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

export function OrganizationStep({
    data,
    onUpdate,
    onNext,
    onPrev,
}: OrganizationStepProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

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
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                    Dados da Organização
                </h2>
                <p className="text-muted-foreground mt-2">
                    Configure sua organização e escolha o plano ideal
                </p>
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
                    // className={
                    //     errors.organizationName ? 'border-destructive' : ''
                    // }
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
                                    <span className="text-2xl font-bold text-primary">
                                        {plan.price}
                                    </span>
                                    <span className="text-muted-foreground text-sm">
                                        {plan.period}
                                    </span>
                                </div>
                                <p>{plan.description}</p>
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

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="flex-1 bg-transparent text-(--color-primary) h-9 rounded-md border border-(--color-primary) cursor-pointer"
                >
                    Voltar
                </button>
                <button
                    type="submit"
                    className="flex-1 bg-(--color-primary) text-white h-9 rounded-md cursor-pointer"
                >
                    Próxima Etapa
                </button>
            </div>
        </form>
    );
}
