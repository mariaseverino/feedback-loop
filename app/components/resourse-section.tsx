import { useState } from 'react';
import enviar_feedback from '../assets/enviar-feedback.png';
import feedbacks_recebidos from '../assets/feedbacks-recebidos.png';
import SectionWrapper from './section-wrapper';

export default function ResourseSection() {
    const [isOpen, setIsOpen] = useState(false);
    const [imgOpen, setImgOpen] = useState<number>(0);

    const resourses = [
        {
            img: enviar_feedback,
            alt: 'Tela de convite para adicionar membros à equipe',
            title: 'Convide sua equipe',
            description:
                'Adicione membros à sua equipe e comece a construir uma cultura de feedback colaborativa.',
        },
        {
            img: enviar_feedback,
            alt: 'Tela de envio de feedback com opções anônima e identificada',
            title: 'Envie feedbacks',
            description:
                'Dê retornos de forma anônima ou identificada com praticidade e segurança.',
        },
        {
            img: feedbacks_recebidos,
            alt: 'Tela com lista de feedbacks recebidos pelo usuário',
            title: 'Acompanhe os feedbacks recebidos',
            description:
                'Veja de forma clara e organizada tudo o que foi compartilhado com você.',
        },
        {
            img: feedbacks_recebidos,
            alt: 'Tela com histórico de feedbacks enviados pelo usuário',
            title: 'Acesse seus feedbacks enviados',
            description:
                'Tenha controle sobre tudo o que você já enviou e acompanhe o impacto das suas contribuições.',
        },
    ];

    function handleOpenImg(index: number) {
        setIsOpen(true);
        setImgOpen(index);
    }
    return (
        <SectionWrapper
            badge="Veja na prática"
            title="Como a plataforma funciona por dentro."
            id="resourses"
        >
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {resourses.map((resourse, index) => (
                    <div
                        className="cursor-pointer shadow-lg rounded-lg overflow-hidden"
                        onClick={() => handleOpenImg(index)}
                    >
                        <div className="h-70 w-full overflow-hidden">
                            <img
                                src={resourse.img}
                                alt={resourse.alt}
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold">
                                {resourse.title}
                            </h2>
                            <p className="text-gray-600 text-sm">
                                {resourse.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div
                        className="h-screen w-screen bg-black absolute opacity-75 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="flex items-center justify-center">
                        <img
                            src={resourses[imgOpen].img}
                            alt={resourses[imgOpen].alt}
                            className="max-w-full max-h-[90vh] rounded shadow-lg relative z-50"
                        />
                    </div>
                </div>
            )}
        </SectionWrapper>
    );
}
