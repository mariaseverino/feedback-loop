import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from './ui/select';

export function SelectDemo({
    items,
    placeholder,
    className,
}: {
    items: { label: string; value: string }[];
    placeholder: string;
    className?: string;
}) {
    return (
        <Select>
            <SelectTrigger className={`${className}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    {items.map(({ label, value }) => (
                        <SelectItem value={value}>{label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
