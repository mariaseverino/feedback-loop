import { useState } from 'react';

import type { Route } from './+types/register';
import { ResumeStep } from '~/components/resume-step';
import type { RegistrationData } from '~/types/auth';
import { RegistrationDataStep } from '~/components/registration-data-step';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'FeedbackLoop' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export default function Register() {
    const [currentStep, setCurrentStep] = useState(1);
    const [registrationData, setRegistrationData] =
        useState<RegistrationData>();

    const saveRegistrationData = (data: RegistrationData) => {
        setRegistrationData((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        console.log('Registration completed:', registrationData);
        // Here you would typically send the data to your backend
        alert('Conta criada com sucesso!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#F2F5FA]">
            <div className="bg-card rounded-lg shadow-lg p-8 max-w-2xl">
                {currentStep === 1 && (
                    <RegistrationDataStep
                        onSave={saveRegistrationData}
                        onNext={nextStep}
                    />
                )}

                {currentStep === 2 && (
                    <ResumeStep
                        registrationData={registrationData!}
                        onPrev={prevStep}
                        onComplete={handleComplete}
                    />
                )}
            </div>
        </div>
    );
}
