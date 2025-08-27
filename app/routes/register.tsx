import { useState } from 'react';

import type { Route } from './+types/register';
import { PersonalDataStep } from '~/components/personal-data-step';
import { ResumeStep } from '~/components/resume-step';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'FeedbackLoop' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export interface RegistrationData {
    personalData: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        organizationName: string;
        plan: 'free' | 'basic' | 'premium';
    };
    organizationData: {
        organizationName: string;
        plan: 'free' | 'basic' | 'premium';
    };
    paymentData: {
        cardName: string;
        cardNumber: string;
        expiryDate: string;
        cvv: string;
    };
}

export default function Register() {
    const [currentStep, setCurrentStep] = useState(1);
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        personalData: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            organizationName: '',
            plan: 'free',
        },
        organizationData: {
            organizationName: '',
            plan: 'free',
        },
        paymentData: {
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
    });

    const updatePersonalData = (
        data: Partial<RegistrationData['personalData']>
    ) => {
        setRegistrationData((prev) => ({
            ...prev,
            personalData: { ...prev.personalData, ...data },
        }));
    };

    const updateOrganizationData = (
        data: Partial<RegistrationData['organizationData']>
    ) => {
        setRegistrationData((prev) => ({
            ...prev,
            organizationData: { ...prev.organizationData, ...data },
        }));
    };

    const updatePaymentData = (
        data: Partial<RegistrationData['paymentData']>
    ) => {
        setRegistrationData((prev) => ({
            ...prev,
            paymentData: { ...prev.paymentData, ...data },
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
                    <PersonalDataStep
                        data={registrationData.personalData}
                        onUpdate={updatePersonalData}
                        onNext={nextStep}
                    />
                )}

                {currentStep === 2 && (
                    <ResumeStep
                        registrationData={registrationData}
                        paymentData={registrationData.paymentData}
                        onUpdate={updatePaymentData}
                        onPrev={prevStep}
                        onComplete={handleComplete}
                    />
                )}
            </div>
        </div>
        // </div>
    );
}
