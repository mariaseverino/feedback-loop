import { useState } from 'react';
import type { Route } from './+types/feedback-page';
import { Inbox, MessageSquare, Send } from 'lucide-react';
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
            to: 'You',
            message:
                'Great job on the project presentation! Your attention to detail really showed.',
            category: 'positive',
            isAnonymous: false,
            timestamp: new Date('2024-06-20T10:30:00'),
            type: 'received',
        },
        {
            id: '2',
            from: 'Anonymous',
            to: 'You',
            message:
                'Consider being more concise in meetings. Your points are valuable but could be delivered more efficiently.',
            category: 'constructive',
            isAnonymous: true,
            timestamp: new Date('2024-06-19T14:15:00'),
            type: 'received',
        },
        {
            id: '3',
            from: 'You',
            to: 'Bob Smith',
            message:
                'Your collaboration skills have really improved this quarter. Keep up the great work!',
            category: 'positive',
            isAnonymous: false,
            timestamp: new Date('2024-06-18T16:45:00'),
            type: 'sent',
        },
    ];

    const [tab, setTab] = useState('send');

    return (
        <div className="relative">
            <Header />
            <div className="pt-25">
                <div className="h-full max-w-2xl mx-auto rounded-md border border-gray-200 shadow-md mb-5">
                    <div className="grid grid-cols-3 ">
                        {tabs.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    className={`flex gap-2 items-center justify-center text-base py-4 cursor-pointer ${
                                        tab === item.id
                                            ? 'border-b-2 border-[#8470ff] text-[#8470ff] font-bold bg-[#8470ff]/20'
                                            : 'text-gray-500 border-b-2 border-gray-200 hover:bg-[#eceaff]/50'
                                    }`}
                                    onClick={() => setTab(item.id)}
                                    key={index}
                                >
                                    <Icon className="size-5" />
                                    <label>{item.label}</label>
                                </button>
                            );
                        })}
                    </div>

                    <div className="py-10 px-20">
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
        </div>
    );
}
