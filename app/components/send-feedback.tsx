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
            value: 'positivo',
            label: 'Feedback Positivo',
            icon: '👏',
            color: 'text-green-600',
        },
        {
            value: 'construtivo',
            label: 'Feedback Construtivo',
            icon: '💡',
            color: 'text-yellow-600',
        },
        {
            value: 'geral',
            label: 'Feedback Geral',
            icon: '💬',
            color: 'text-blue-600',
        },
    ];

    const squads = [
        { value: 'atlas', label: 'Atlas Squad' },
        { value: 'nimbus', label: 'Nimbus Squad' },
        { value: 'aurora', label: 'Aurora Squad' },
        { value: 'odin', label: 'Odin Squad' },
        { value: 'zeus', label: 'Zeus Squad' },
        { value: 'phoenix', label: 'Phoenix Squad' },
        { value: 'kratos', label: 'Kratos Squad' },
        { value: 'argo', label: 'Argo Squad' },
        { value: 'lyra', label: 'Lyra Squad' },
        { value: 'sirius', label: 'Sirius Squad' },
        { value: 'gaia', label: 'Gaia Squad' },
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
                <h1 className="text-2xl font-semibold text-(--headline) mb-2">
                    Envie um feedback!
                </h1>
                <p className="text-(--paragraph)">
                    Compartilhe um elogio ou uma dica amiga. O poder tá nas suas
                    mãos 😉
                </p>
            </div>
            <form className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                    <SelectWithLabel
                        options={squads}
                        id="sendFeedbackTo"
                        title="Squads da empresa"
                        placeholder="Selecione um squad"
                        value="gaia"
                    />
                    <SelectWithLabel
                        options={teamMembers}
                        id="sendFeedbackTo"
                        title="Enviar para"
                        placeholder="Selecione um membro"
                    />
                </div>

                <SelectWithLabel
                    options={categories}
                    id="feedbackCategory"
                    title="Tipo de feedback"
                    placeholder="Selecione a categoria de feedback"
                />

                <div className="flex flex-col">
                    <label
                        htmlFor="feedback"
                        className="text-(--headline) text-sm font-medium"
                    >
                        Seu feedback
                    </label>
                    <textarea
                        name="feedback"
                        id="feedback"
                        placeholder="Escreva seu feedback aqui..."
                        className="block w-full rounded-md px-3 py-1.5 text-base text-(--headline) outline-0 border-2 border-(--border-color) focus:border-[#8470ff] placeholder:text-(--paragraph) sm:text-sm/6 my-1 h-20"
                        maxLength={500}
                        value={formData.message}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                message: e.target.value,
                            })
                        }
                    />
                    <p className="text-xs text-(--paragraph)">
                        {formData.message.length}/500 characters
                    </p>
                </div>

                <div className="bg-[#fef4e1] border-2 border-[#f9970c] p-4 rounded-md flex justify-between items-center">
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
                    <AlertCircle className="text-[#f9970c]" />
                </div>

                <button className="bg-[#8470ff] w-full flex items-center justify-center font-medium text-white p-3 rounded-md gap-2 transition-transform duration-150 hover:scale-105">
                    <Send />
                    Enviar feedback
                </button>
            </form>
        </div>
    );
}
