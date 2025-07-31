import React, { useEffect, useState } from 'react';
import type { Route } from './+types/feedback-page';
import { Inbox, MessageSquare, Send, type LucideProps } from 'lucide-react';
import SendFeedback from '~/components/send-feedback';
import FeedbackList from '~/components/feedback-list';
import Header from '~/components/header';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export default function FeedbackPage() {
    const tabs = [
        { id: 'send', label: 'Enviar Feedback', icon: Send },
        {
            id: 'received',
            label: 'Feedbacks Recebidos',
            icon: Inbox,
            // count: receivedFeedback.length,
        },
        {
            id: 'sent',
            label: 'Feedbacks Enviados',
            icon: MessageSquare,
            // count: sentFeedback.length,
        },
    ];

    const mockFeedback = [
        {
            id: '1',
            from: 'Alice Johnson',
            to: 'Você',
            message:
                'Excelente trabalho na apresentação do projeto! Sua atenção aos detalhes ficou evidente.',
            category: 'positivo',
            isAnonymous: false,
            timestamp: new Date('2024-06-20T10:30:00'),
            type: 'recebido',
        },
        {
            id: '2',
            from: 'Anônimo',
            to: 'Você',
            message:
                'Seria interessante revisar os prazos antes de enviar a próxima versão.',
            category: 'construtivo',
            isAnonymous: true,
            timestamp: new Date('2024-06-21T14:45:00'),
            type: 'recebido',
        },
        {
            id: '3',
            from: 'Você',
            to: 'Carlos Mendes',
            message:
                'Gostei muito da sua postura na reunião. Passou segurança e domínio do assunto.',
            category: 'positivo',
            isAnonymous: false,
            timestamp: new Date('2024-06-22T09:20:00'),
            type: 'enviado',
        },
        {
            id: '4',
            from: 'Você',
            to: 'Equipe Atlas',
            message:
                'A comunicação poderia ser mais clara nas atualizações do projeto.',
            category: 'construtivo',
            isAnonymous: true,
            timestamp: new Date('2024-06-23T16:10:00'),
            type: 'enviado',
        },
        // {
        //     id: '5',
        //     from: 'Bruna Lima',
        //     to: 'Você',
        //     message:
        //         'Obrigado por ajudar com o deploy, foi essencial para entregarmos no prazo!',
        //     category: 'positivo',
        //     isAnonymous: false,
        //     timestamp: new Date('2024-06-24T11:05:00'),
        //     type: 'recebido',
        // },
    ];

    const [tab, setTab] = useState('send');
    const [theme, setTheme] = useState('dark');

    function handleTheme() {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }

    useEffect(() => {
        function getThemeFromStorage() {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                setTheme(storedTheme);
            }
        }

        getThemeFromStorage();
    }, []);

    return (
        <div
            className={`relative min-h-screen bg-(--background) pb-5 ${theme}`}
        >
            <Header theme={theme} handleTheme={handleTheme} />
            <div className="md:pt-25 pt-16 pb-5">
                <div className="h-full max-w-2xl mx-auto rounded-md md:border border-(--border-color) shadow-md">
                    <NagivationTab
                        tabs={tabs}
                        tab={tab}
                        handleChangeTab={setTab}
                        className="md:grid grid-cols-3 hidden"
                    />

                    <div className="py-10 md:px-20 px-5">
                        {tab === 'send' && <SendFeedback />}
                        {tab === 'received' && (
                            <FeedbackList
                                title="Seus feedbacks recebidos"
                                feedbacks={mockFeedback}
                                isReceivedFeedback={true}
                            />
                        )}
                        {tab === 'sent' && (
                            <FeedbackList
                                title="Feedbacks enviados"
                                feedbacks={mockFeedback}
                                isReceivedFeedback={false}
                            />
                        )}
                    </div>
                </div>
            </div>

            <NagivationTab
                tabs={tabs}
                tab={tab}
                handleChangeTab={setTab}
                className="grid grid-cols-3 w-full fixed bottom-0 md:hidden"
                type="mobile"
            />
        </div>
    );
}

interface NagivationTabProps {
    tabs: {
        id: string;
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>;
    }[];

    tab: string;
    handleChangeTab: (id: string) => void;
    className?: string;
    type?: 'default' | 'mobile';
}
export function NagivationTab({
    tabs,
    tab,
    handleChangeTab,
    className,
    type = 'default',
}: NagivationTabProps) {
    return (
        <div className={`bg-(--background) ${className}`}>
            {tabs.map((item, index) => {
                const Icon = item.icon;
                return (
                    <button
                        className={`flex flex-col md:flex-row gap-1 md:gap-2 items-center justify-center py-2 md:py-4 cursor-pointer text-sm md:text-base md:border-t-0 ${
                            tab === item.id
                                ? 'border-t-2 md:border-b-2 border-(--color-primary) text-(--color-primary) font-bold bg-(--color-primary)/20'
                                : 'text-(--paragraph) border-t-2 md:border-b-2 border-(--border-color) hover:bg-(--color-primary)/5'
                        }`}
                        onClick={() => handleChangeTab(item.id)}
                        key={index}
                    >
                        <Icon className="size-5" />
                        <span>
                            {type === 'mobile'
                                ? item.label
                                      .split(' ')
                                      .filter(
                                          (word) =>
                                              !word
                                                  .toLowerCase()
                                                  .startsWith('feedback')
                                      )
                                      .join(' ')
                                : item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
