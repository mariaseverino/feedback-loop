import { ChevronDown } from 'lucide-react';
import SectionWrapper from './section-wrapper';

export default function FaqSection() {
    const questions = [
        {
            title: 'O que é?',
            description:
                'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis. Mé faiz elementum girarzis, nisi eros vermeio. Suco de cevadiss deixa as pessoas mais interessantis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.',
        },
        {
            title: 'Pra quem é?',
            description:
                'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis. Mé faiz elementum girarzis, nisi eros vermeio. Suco de cevadiss deixa as pessoas mais interessantis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.',
        },
        {
            title: 'Como funciona?',
            description:
                'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis. Mé faiz elementum girarzis, nisi eros vermeio. Suco de cevadiss deixa as pessoas mais interessantis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.',
        },
    ];

    return (
        <SectionWrapper
            badge="FAQ"
            title="Perguntas e respostas mais frequentes"
            id="faq"
        >
            <div className="max-w-3xl lg:max-w-5xl mx-auto flex flex-col gap-2 mt-10">
                {questions.map(({ title, description }) => (
                    <Accordion
                        key={title}
                        title={title}
                        description={description}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}

interface AccordionProps {
    title: string;
    description: string;
}

function Accordion({ title, description }: AccordionProps) {
    return (
        <details className="border-b group border-gray-300 first:border-t">
            <summary className="flex items-center justify-between cursor-pointer select-none px-4 py-3 font-semibold hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary">
                <span>{title}</span>
                <ChevronDown className="text-gray-400 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-4 py-3 text-gray-600 text-justify">
                {description}
            </p>
        </details>
    );
}
