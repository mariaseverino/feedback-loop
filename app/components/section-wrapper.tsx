import type { ReactNode } from 'react';

interface SectionWrapperProps {
    badge: string;
    title: string;
    id?: string;
    children: ReactNode;
}

export default function SectionWrapper({
    badge,
    title,
    id,
    children,
}: SectionWrapperProps) {
    return (
        <section className="pt-14 md:pt-20 px-4 w-full" id={id}>
            <div className="max-w-3xl lg:max-w-7xl mx-auto">
                <span className="text-gray-500 text-xs md:text-sm uppercase tracking-wide font-mono">
                    {badge}
                </span>

                <h2 className="text-[#21242a] text-xl md:text-3xl font-bold tracking-tight sm:text-4xl my-6 text-center">
                    {title}
                </h2>

                {children}
            </div>
        </section>
    );
}
