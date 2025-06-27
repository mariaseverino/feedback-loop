import { ChevronDown } from 'lucide-react';

interface Category {
    value: string;
    label: string;
    icon: string;
}

interface Squad {
    value: string;
    label: string;
}

interface SelectWithLabelProps {
    options: string[] | Category[] | Squad[];
    title: string;
    placeholder: string;
    id: string;
    value?: string;
}

export default function SelectWithLabel({
    options,
    title,
    placeholder,
    id,
    value = '',
}: SelectWithLabelProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="text-(--headline) text-sm font-medium"
            >
                {title}
            </label>
            <div className="relative">
                <select
                    name={id}
                    id={id}
                    defaultValue={value}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-(--background) py-1.5 pr-8 pl-3 text-base text-(--paragraph) sm:text-sm/6 mt-1 relative border-2 border-(--border-color) focus:border-[#8470ff] outline-0"
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((item, index) => (
                        <option
                            value={typeof item === 'string' ? item : item.value}
                            key={index}
                        >
                            {typeof item === 'object' &&
                                'icon' in item &&
                                item.icon + ' '}
                            {typeof item === 'string' ? item : item.label}
                        </option>
                    ))}
                </select>
                <span>
                    <ChevronDown className="absolute top-3 right-2 text-(--paragraph) size-5" />
                </span>
            </div>
        </div>
    );
}
