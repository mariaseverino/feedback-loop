interface ProgressIndicatorProps {
    currentStep: number;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
    const steps = [
        { number: 1, title: 'Dados Pessoais' },
        { number: 2, title: 'Organização' },
        { number: 3, title: 'Resumo' },
    ];

    return (
        <div className="flex items-center justify-between">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors text-white ${
                                step.number <= currentStep
                                    ? 'bg-(--color-primary)'
                                    : 'bg-muted-foreground'
                            }`}
                        >
                            {step.number}
                        </div>
                        <span className="text-xs mt-2 text-center font-medium text-muted-foreground">
                            {step.title}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`flex-1 h-0.5 mx-4 transition-colors ${
                                step.number < currentStep
                                    ? 'bg-primary'
                                    : 'bg-muted'
                            }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
