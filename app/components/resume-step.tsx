import type React from 'react';

import { CreditCard, SeparatorHorizontal, User } from 'lucide-react';
import { useState } from 'react';

interface PaymentStepProps {
    registrationData: {
        personalData: {
            name: string;
            email: string;
            organizationName: string;
            plan: 'free' | 'basic' | 'premium';
        };
        organizationData: {
            organizationName: string;
            plan: 'free' | 'basic' | 'premium';
        };
    };
    paymentData: {
        cardName: string;
        cardNumber: string;
        expiryDate: string;
        cvv: string;
    };
    onUpdate: (data: Partial<PaymentStepProps['paymentData']>) => void;
    onPrev: () => void;
    onComplete: () => void;
}

const planPrices = {
    free: 'R$ 0',
    basic: 'R$ 29',
    premium: 'R$ 99',
};

const planNames = {
    free: 'Gratuito',
    basic: 'Básico',
    premium: 'Premium',
};

export function ResumeStep({
    registrationData,
    paymentData,
    onUpdate,
    onPrev,
    onComplete,
}: PaymentStepProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const formatcardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handlecardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatcardNumber(e.target.value);
        onUpdate({ cardNumber: formatted });
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiryDate(e.target.value);
        onUpdate({ expiryDate: formatted });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        // Skip payment validation for free plan
        if (registrationData.organizationData.plan !== 'free') {
            if (!paymentData.cardName.trim()) {
                newErrors.cardName = 'Nome no cartão é obrigatório';
            }

            if (!paymentData.cardNumber.replace(/\s/g, '')) {
                newErrors.cardNumber = 'Número do cartão é obrigatório';
            } else if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
                newErrors.cardNumber = 'Número do cartão inválido';
            }

            if (!paymentData.expiryDate) {
                newErrors.expiryDate = 'Data de validade é obrigatória';
            } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
                newErrors.expiryDate = 'Data de validade inválida (MM/AA)';
            }

            if (!paymentData.cvv) {
                newErrors.cvv = 'CVV é obrigatório';
            } else if (paymentData.cvv.length < 3) {
                newErrors.cvv = 'CVV inválido';
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onComplete();
        }
    };

    const isFreePlan = registrationData.personalData.plan === 'free';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                    Resumo
                </h2>
                <p className="text-muted-foreground mt-2">
                    Revise suas informações e finalize sua conta
                </p>
            </div>

            <div className="border border-muted-foreground rounded-xl p-5 space-y-7">
                <div>
                    <div className="flex items-center gap-2 font-bold">
                        <User className="h-5 w-5" />
                        Resumo da Conta
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Nome:</span>
                        <span className="font-medium">
                            {registrationData.personalData.name}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">E-mail:</span>
                        <span className="font-medium">
                            {registrationData.personalData.email}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                            Organização:
                        </span>
                        <span className="font-medium">
                            {registrationData.personalData.organizationName}
                        </span>
                    </div>
                    <div className="w-full h-0.25 bg-muted-foreground"></div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                            Plano Selecionado:
                        </span>
                        <div className="text-right">
                            <div className="font-medium">
                                {planNames[registrationData.personalData.plan]}
                            </div>
                            <div className="text-lg font-bold text-(--color-primary)">
                                {planPrices[registrationData.personalData.plan]}
                                {!isFreePlan && (
                                    <span className="text-sm font-normal">
                                        /mês
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Section */}
            {/* {!isFreePlan && (
                <div>
                    <div>
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Informações de Pagamento
                        </div>
                        <p>
                            Seus dados de pagamento são protegidos e
                            criptografados
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="cardName">Nome no Cartão</label>
                            <input
                                id="cardName"
                                type="text"
                                value={paymentData.cardName}
                                onChange={(e) =>
                                    onUpdate({ cardName: e.target.value })
                                }
                                placeholder="Nome como aparece no cartão"
                                className={
                                    errors.cardName ? 'border-destructive' : ''
                                }
                            />
                            {errors.cardName && (
                                <p className="text-destructive text-sm mt-1">
                                    {errors.cardName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cardNumber">Número do Cartão</label>
                            <input
                                id="cardNumber"
                                type="text"
                                value={paymentData.cardNumber}
                                onChange={handlecardNumberChange}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                className={
                                    errors.cardNumber
                                        ? 'border-destructive'
                                        : ''
                                }
                            />
                            {errors.cardNumber && (
                                <p className="text-destructive text-sm mt-1">
                                    {errors.cardNumber}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiryDate">
                                    Data de Validade
                                </label>
                                <input
                                    id="expiryDate"
                                    type="text"
                                    value={paymentData.expiryDate}
                                    onChange={handleExpiryDateChange}
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    className={
                                        errors.expiryDate
                                            ? 'border-destructive'
                                            : ''
                                    }
                                />
                                {errors.expiryDate && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.expiryDate}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    id="cvv"
                                    type="text"
                                    value={paymentData.cvv}
                                    onChange={(e) =>
                                        onUpdate({
                                            cvv: e.target.value.replace(
                                                /\D/g,
                                                ''
                                            ),
                                        })
                                    }
                                    placeholder="123"
                                    maxLength={4}
                                    className={
                                        errors.cvv ? 'border-destructive' : ''
                                    }
                                />
                                {errors.cvv && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.cvv}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

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
                    {isFreePlan ? 'Criar Conta' : 'Efetuar Pagamento'}
                </button>
            </div>
            <p className="text-center text-sm/6 text-muted-foreground w-3/5 m-auto">
                Ao {isFreePlan ? 'Criar Conta' : 'Efetuar Pagamento'}, você
                concorda com nossos
                <a
                    href="#"
                    className="font-semibold text-(--color-primary) mx-1"
                >
                    Termos de Serviço
                </a>
                e
                <a
                    href="#"
                    className="font-semibold text-(--color-primary) ml-1"
                >
                    Política de Privacidade
                </a>
                .
            </p>
        </form>
    );
}
