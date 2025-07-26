import { useState } from 'react';
import SectionWrapper from './section-wrapper';

export default function PriceSection() {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
        {
            name: 'Gratuito',
            price: { monthly: 'R$0', yearly: 'R$0' },
            features: [
                'Até 5 usuários',
                'Feedbacks ilimitados',
                'Cadastro de equipe',
                'Suporte por e-mail',
            ],
            cta: 'Comece grátis',
        },
        {
            name: 'Profissional',
            price: { monthly: 'R$29', yearly: 'R$39' },
            features: [
                'Até 50 usuários',
                'Feedbacks ilimitados',
                'Organize sua equipe facilmente',
                'Suporte prioritário',
            ],
            cta: 'Assinar agora',
            highlight: true,
        },
        {
            name: 'Ilimitado',
            price: { monthly: 'R$99', yearly: 'R$200' },
            features: [
                'Usuários ilimitados',
                'Feedbacks ilimitados',
                'Controle total da equipe',
                'Suporte dedicado',
            ],
            cta: 'Assinar ilimitado',
        },
    ];

    return (
        <SectionWrapper
            badge="Planos"
            title="Planos para todas as equipes"
            id="plans"
        >
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-center">
                Construa uma cultura de feedback contínuo com o plano ideal.
            </p>

            <div className="mt-6 flex justify-center gap-4">
                <button
                    onClick={() => setBilling('monthly')}
                    className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                        billing === 'monthly'
                            ? 'bg-[#191654] text-white'
                            : 'bg-gray-200 text-gray-800'
                    }`}
                >
                    Mensal
                </button>
                <button
                    onClick={() => setBilling('yearly')}
                    className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                        billing === 'yearly'
                            ? 'bg-[#191654] text-white'
                            : 'bg-gray-200 text-gray-800'
                    }`}
                >
                    Anual (-20%)
                </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-14 max-w-3xl lg:max-w-5xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`rounded-2xl border shadow-sm p-6 flex flex-col ${
                            plan.highlight
                                ? 'border-[#191654] md:scale-110'
                                : 'border-gray-200'
                        }`}
                    >
                        <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wide text-center">
                            {plan.name}
                        </h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900 text-center">
                            {plan.price[billing]}
                            {plan.name !== 'Enterprise' && (
                                <span className="text-base font-medium text-gray-500">
                                    {billing === 'monthly' ? '/mês' : '/ano'}
                                </span>
                            )}
                        </p>

                        <ul className="mt-4 space-y-2 text-left text-gray-700 text-sm flex-1">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">
                                        ✓
                                    </span>
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`mt-6 w-full py-2 rounded-xl font-medium cursor-pointer ${
                                plan.highlight
                                    ? 'bg-[#191654] text-white hover:bg-[#191654]/90'
                                    : 'bg-[#191654]/90 text-white hover:bg-[#191654]/80'
                            }`}
                        >
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
