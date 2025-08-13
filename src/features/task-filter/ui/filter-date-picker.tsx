import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type FilterDatePickerProps = {
    label: string;
    value: Date | "all";
    onValueChange: (value: Date | "all") => void;
    placeholder?: string;
};

export const FilterDatePicker = ({
    label,
    value,
    onValueChange,
    placeholder = "All dates",
}: FilterDatePickerProps) => {
    return (
        <div className="flex-1">
            <span className="text-sm font-medium text-primary/50">{label}</span>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-primary-foreground flex-auto w-full justify-start text-left font-normal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value !== "all"
                            ? format(value, "dd MMM yyyy")
                            : placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="p-3">
                        <Button
                            variant="ghost"
                            className="w-full justify-start mb-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                onValueChange("all");
                            }}
                        >
                            All dates
                        </Button>
                        <Calendar
                            mode="single"
                            selected={value !== "all" ? value : undefined}
                            onSelect={(date) => {
                                if (date) {
                                    onValueChange(date);
                                } else {
                                    onValueChange("all");
                                }
                            }}
                            disabled={{ before: new Date() }}
                            initialFocus
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

