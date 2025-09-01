import { Shield, Users } from 'lucide-react';
import SectionWrapper from './section-wrapper';

export default function FeatureSection() {
    const features = [
        {
            icon: <Shield className="h-6 w-6 text-(--color-primary)" />,
            title: 'Feedback Anônimo',
            subtitle: 'Segurança para quem compartilha',
            description:
                'Permita que colaboradores opinem livremente com total anonimato, promovendo transparência e confiança.',
        },
        {
            icon: <Users className="h-6 w-6 text-(--color-primary)" />,
            title: 'Feedback Identificado',
            subtitle: 'Conexões mais abertas e construtivas',
            description:
                'Estimule o diálogo direto entre colegas e gestores, fortalecendo relações e incentivando o crescimento profissional.',
        },
    ];
    return (
        <>
            <SectionWrapper
                badge="Funcionalidade"
                title="Do anônimo ao direto: escolha o tipo de feedback ideal"
                id="features"
            >
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    {features.map(({ icon, title, subtitle, description }) => (
                        <div
                            key={title}
                            className="p-5 transform hover:scale-[1.02] transition-transform shadow-lg rounded-lg"
                        >
                            <div className="w-12 h-12 bg-[#eceaff] rounded-lg flex items-center justify-center mb-4">
                                {icon}
                            </div>
                            <h3 className="text-lg font-semibold text-(--color-text)">
                                {title}
                            </h3>
                            <p className="text-sm text-(--color-muted-text) mb-2">
                                {subtitle}
                            </p>
                            <p className="text-(--color-muted-text) text-sm">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </>
    );
}
