import { User } from 'lucide-react';
import type { RegistrationData } from '~/types/auth';

interface PaymentStepProps {
    registrationData: RegistrationData;
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
    onPrev,
    onComplete,
}: PaymentStepProps) {
    function handleSubmit() {
        onComplete();
    }

    const isFreePlan = registrationData.plan === 'free';

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
                            {registrationData.name}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">E-mail:</span>
                        <span className="font-medium">
                            {registrationData.email}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                            Organização:
                        </span>
                        <span className="font-medium">
                            {registrationData.organizationName}
                        </span>
                    </div>
                    <div className="w-full h-0.25 bg-muted-foreground"></div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                            Plano Selecionado:
                        </span>
                        <div className="text-right">
                            <div className="font-medium">
                                {planNames[registrationData.plan]}
                            </div>
                            <div className="text-lg font-bold text-(--color-primary)">
                                {planPrices[registrationData.plan]}
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
