import { AlertCircle, Send } from 'lucide-react';
import SelectWithLabel from './select-with-label';
import { useState } from 'react';
//FeedbackPage
export default function SendFeedback() {
    const teamMembers = [
        'Alice Johnson',
        'Bob Smith',
        'Carol Davis',
        'David Wilson',
        'Emma Brown',
    ];

    const categories = [
        {
            value: 'positive',
            label: 'Positive Feedback',
            icon: '👏',
            color: 'text-green-600',
        },
        {
            value: 'constructive',
            label: 'Constructive Feedback',
            icon: '💡',
            color: 'text-yellow-600',
        },
        {
            value: 'general',
            label: 'General Feedback',
            icon: '💬',
            color: 'text-blue-600',
        },
    ];

    const [formData, setFormData] = useState({
        to: '',
        category: '',
        message: '',
        anonymous: false,
    });

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Envie um feedback!
                </h1>
                <p className="text-gray-600">
                    Compartilhe um elogio ou uma dica amiga. O poder tá nas suas
                    mãos 😉
                </p>
            </div>
            <form className="flex flex-col gap-5">
                <SelectWithLabel
                    options={teamMembers}
                    id="sendFeedbackTo"
                    title="Enviar para"
                    placeholder="Selecione um membro"
                />
                <SelectWithLabel
                    options={categories}
                    id="feedbackCategory"
                    title="Tipo de feedback"
                    placeholder="Selecione a categoria de feedback"
                />

                <div className="text-[#45454b] flex flex-col">
                    <label
                        htmlFor="feedback"
                        className="text-[#45454b] text-sm font-medium"
                    >
                        Seu feedback
                    </label>
                    <textarea
                        name="feedback"
                        id="feedback"
                        placeholder="Escreva seu feedback de maneira educada e repeitosa..."
                        className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 my-1 h-20"
                        maxLength={500}
                        value={formData.message}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                message: e.target.value,
                            })
                        }
                    />
                    <p className="text-xs text-gray-500">
                        {formData.message.length}/500 characters
                    </p>
                </div>

                <div className="bg-orange-100 border border-orange-300 p-4 rounded-md flex justify-between items-center">
                    <div className="flex gap-2">
                        <input
                            type="checkbox"
                            name="sendAnonymously"
                            id="sendAnonymously"
                            className="h-4 w-4 rounded border-gray-300 text-[#8470ff] focus:ring-[#8470ff] transition mt-1"
                        />
                        <div className="flex flex-col">
                            <label
                                htmlFor="sendAnonymously"
                                className="text-gray-700 cursor-pointer font-medium"
                            >
                                Enviar anonimamente
                            </label>
                            <p className="text-sm text-gray-600">
                                Se marcada, o destinatário não saberá quem
                                enviou.
                            </p>
                        </div>
                    </div>
                    <AlertCircle className="text-orange-500" />
                </div>

                <button className="bg-[#8470ff] w-full flex items-center justify-center font-medium text-white p-3 rounded-md gap-2 transition-transform duration-150 hover:scale-105">
                    <Send />
                    Enviar feedback
                </button>
            </form>
        </div>
    );
}
