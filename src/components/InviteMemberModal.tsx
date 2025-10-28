import React, { useState } from 'react';

interface InviteMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInvite: (emails: string[]) => Promise<void> | void; // <- pode ser async
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
    isOpen,
    onClose,
    onInvite,
}) => {
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddEmail = () => {
        const trimmed = email.trim();
        if (!trimmed || emails.includes(trimmed)) return;
        setEmails((prev) => [...prev, trimmed]);
        setEmail('');
    };

    const handleRemoveEmail = (target: string) => {
        setEmails((prev) => prev.filter((e) => e !== target));
    };

    const handleSubmit = async () => {
        if (emails.length === 0) return;

        setIsLoading(true);
        try {
            await onInvite(emails);
            setEmails([]);
            onClose();
        } catch (error) {
            console.error('Erro ao enviar convites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Convidar novo membro
                </h2>

                <div className="flex gap-2 mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite o e-mail..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleAddEmail}
                        className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
                        disabled={!email || isLoading}
                    >
                        Adicionar
                    </button>
                </div>

                {emails.length > 0 ? (
                    <ul className="mb-4 border border-gray-200 rounded-lg divide-y divide-gray-200">
                        {emails.map((e) => (
                            <li
                                key={e}
                                className="flex justify-between items-center px-3 py-2 text-gray-700"
                            >
                                <span>{e}</span>
                                <button
                                    onClick={() => handleRemoveEmail(e)}
                                    className="text-sm text-red-500 hover:text-red-700"
                                    disabled={isLoading}
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 mb-4">
                        Nenhum e-mail adicionado ainda.
                    </p>
                )}

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={emails.length === 0 || isLoading}
                        className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 transition ${
                            emails.length === 0 || isLoading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isLoading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {isLoading ? 'Enviando...' : 'Enviar convites'}
                    </button>
                </div>

                {isLoading && (
                    <p className="text-sm text-gray-500 mt-3 text-center">
                        Enviando convites...
                    </p>
                )}
            </div>
        </div>
    );
};
