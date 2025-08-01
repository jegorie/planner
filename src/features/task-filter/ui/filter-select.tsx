import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";

export type FilterOption = {
    value: string;
    label: string;
};

type FilterSelectProps = {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: FilterOption[];
    placeholder?: string;
};

export const FilterSelect = ({
    label,
    value,
    onValueChange,
    options,
    placeholder,
}: FilterSelectProps) => {
    return (
        <div className="flex items-center gap-2 flex-auto">
            <span className="text-sm font-medium">{label}:</span>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger
                    size="sm"
                    className="bg-primary-foreground flex-auto sm:max-w-[200px]"
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="w-[200px]">
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
