import { Clock, MessageSquare, Shield, User } from 'lucide-react';

interface Feedback {
    id: string;
    from: string;
    to: string;
    message: string;
    category: string;
    isAnonymous: boolean;
    timestamp: Date;
    type: string;
}
interface FeedbackListProps {
    title: string;
    feedbacks: Feedback[];
    isReceivedFeedback: boolean;
}
export default function FeedbackList({
    title,
    feedbacks,
    isReceivedFeedback,
}: FeedbackListProps) {
    return (
        <div>
            <h1 className="text-2xl mb-8 font-medium text-(--headline)">
                {title}
            </h1>

            <div className="flex flex-col gap-8">
                {feedbacks.map((feedback, index) => (
                    <FeedbackCard
                        feedback={feedback}
                        isReceivedFeedback={isReceivedFeedback}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}

interface FeedbackProps {
    feedback: Feedback;
    isReceivedFeedback: boolean;
}

function FeedbackCard({ feedback, isReceivedFeedback }: FeedbackProps) {
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'positive':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'constructive':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'general':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'positive':
                return '👏';
            case 'constructive':
                return '💡';
            case 'general':
                return '💬';
            default:
                return '💬';
        }
    };
    return (
        <div>
            <div className="flex justify-between mb-4">
                <div className="flex gap-2 text-(--headline)">
                    {feedback.isAnonymous && isReceivedFeedback ? (
                        <Shield className="size-5" />
                    ) : (
                        <User className="size-5" />
                    )}

                    <label className="font-bold">
                        {isReceivedFeedback ? 'De:' : 'Para:'} {feedback.from}
                    </label>
                    <div
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                            feedback.category
                        )}`}
                    >
                        {getCategoryIcon(feedback.category)} {feedback.category}
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <Clock className="size-3.5 text-(--paragraph)" />
                    <label className="text-(--paragraph) text-sm">
                        22/05/2013
                    </label>
                </div>
            </div>
            <div className="flex rounded-md border-l-5 border-[#8470ff]/50 p-4 gap-3 text-(--paragraph) bg-(--card-color)/50">
                <div>
                    <MessageSquare className="size-5 mt-1" />
                </div>
                {feedback.message}
            </div>
        </div>
    );
}
