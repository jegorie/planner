import { Priority } from "@/entities/task/types";
import { cn } from "@/shared/lib/utils";
import { FadeCard } from "@/shared/ui/animations/fade-card";
import { useAtom } from "jotai";
import { useState, useMemo, useCallback } from "react";
import {
    selectedLabelsAtom,
    selectedPriorityAtom,
    selectedDateAtom,
    sortByAtom,
    sortOrderAtom,
    type SortBy,
} from "../model/filter-atoms";
import { FilterSelect, type FilterOption } from "./filter-select";
import { FilterDatePicker } from "./filter-date-picker";
import { Input } from "@/shared/ui/input";
import { ListFilterPlusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useLabelsSync } from "@/entities/label/hooks/use-labels-sync";

type Props = {
    onNewTaskClick: () => void;
    projectId: string;
};

export const TasksFilter: React.FC<Props> = (props) => {
    const { onNewTaskClick, projectId } = props;
    const [isOpen, setIsOpen] = useState(false);

    // Filter atoms
    const [selectedLabels, setSelectedLabels] = useAtom(selectedLabelsAtom);
    const [selectedPriority, setSelectedPriority] =
        useAtom(selectedPriorityAtom);
    const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
    const [sortBy, setSortBy] = useAtom(sortByAtom);
    const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);

    // Labels data
    const { labels: labelValues } = useLabelsSync({ projectId });

    // Helper for single label selection (legacy UI support)
    const selectedLabel =
        selectedLabels.length === 1 ? selectedLabels[0] : "all";
    const setSelectedLabel = useCallback(
        (value: string) => {
            if (value === "all") {
                setSelectedLabels([]);
            } else {
                setSelectedLabels([value]);
            }
        },
        [setSelectedLabels],
    );

    // Filter configurations for rendering
    const filterConfigs = useMemo(() => {
        const labelOptions: FilterOption[] = [
            { value: "all", label: "All labels" },
            ...(labelValues?.map((label) => ({
                value: label.id,
                label: label.title,
            })) ?? []),
        ];

        const priorityOptions: FilterOption[] = [
            { value: "all", label: "All priorities" },
            { value: Priority.HIGH.toString(), label: "High" },
            { value: Priority.MEDIUM.toString(), label: "Medium" },
            { value: Priority.LOW.toString(), label: "Low" },
            { value: Priority.NONE.toString(), label: "None" },
        ];

        const sortByOptions: FilterOption[] = [
            { value: "custom", label: "Custom" },
            { value: "title", label: "Title" },
            { value: "priority", label: "Priority" },
            { value: "createdAt", label: "Created" },
            { value: "date", label: "Date" },
        ];

        const sortOrderOptions: FilterOption[] = [
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
        ];

        return [
            {
                label: "Label",
                value: selectedLabel,
                onValueChange: setSelectedLabel,
                options: labelOptions,
                placeholder: "All labels",
            },
            {
                label: "Priority",
                value: selectedPriority.toString(),
                onValueChange: (value: string) =>
                    setSelectedPriority(
                        value === "all" ? "all" : (value as Priority),
                    ),
                options: priorityOptions,
                placeholder: "All priorities",
            },
            {
                label: "Sort by",
                value: sortBy,
                onValueChange: (value: string) => setSortBy(value as SortBy),
                options: sortByOptions,
            },
            {
                label: "Order",
                value: sortOrder,
                onValueChange: (value: string) =>
                    setSortOrder(value as "asc" | "desc"),
                options: sortOrderOptions,
            },
        ];
    }, [
        labelValues,
        selectedLabel,
        selectedPriority,
        sortBy,
        sortOrder,
        setSelectedLabel,
        setSelectedPriority,
        setSortBy,
        setSortOrder,
    ]);

    return (
        <div
            className={cn(
                "sticky top-2 mx-auto duration-300 z-10 w-full flex transition-all",
                {
                    ["max-w-4xl"]: isOpen,
                },
                {
                    ["max-w-sm"]: !isOpen,
                },
            )}
        >
            <div
                className={cn(
                    "border bg-primary-foreground/50 transition-all duration-300 overflow-hidden",
                    {
                        ["bg-primary-foreground/50 backdrop-blur rounded-lg w-full max-w-4xl shadow-xl"]:
                            isOpen,
                    },
                    {
                        ["bg-primary-foreground/10 backdrop-blur-xs rounded-4xl w-full max-w-sm shadow-xs hover:bg-primary-foreground"]:
                            !isOpen,
                    },
                )}
                onClick={() => isOpen && setIsOpen(false)}
            >
                <FadeCard triggerKey={isOpen.toString()} duration={0.3}>
                    {isOpen ? (
                        <div className="flex items-center py-4 px-4 flex-wrap gap-10">
                            <div className="flex items-center flex-wrap gap-3 flex-7/12">
                                {filterConfigs.slice(0, 2).map((config) => (
                                    <FilterSelect
                                        key={config.label}
                                        label={config.label}
                                        value={config.value}
                                        onValueChange={config.onValueChange}
                                        options={config.options}
                                        placeholder={config.placeholder}
                                    />
                                ))}
                                <FilterDatePicker
                                    label="Date"
                                    value={selectedDate}
                                    onValueChange={setSelectedDate}
                                    placeholder="All dates"
                                />
                            </div>
                            <div className="flex items-center flex-wrap gap-3 flex-4/12">
                                {filterConfigs.slice(2).map((config) => (
                                    <FilterSelect
                                        key={config.label}
                                        label={config.label}
                                        value={config.value}
                                        onValueChange={config.onValueChange}
                                        options={config.options}
                                        placeholder={config.placeholder}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Input
                            className="rounded-4xl shadow-none overflow-hidden border-none"
                            placeholder="Search by title"
                        />
                    )}
                </FadeCard>
            </div>
            <div
                className={cn(
                    "flex gap-2 w-[80px] transition-all duration-300",
                    isOpen ? "opacity-0 w-0 ml-0" : "ml-2",
                )}
            >
                <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full bg-primary-foreground/50 backdrop-blur"
                    onClick={() => setIsOpen(true)}
                >
                    <ListFilterPlusIcon />
                </Button>
                <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full bg-primary-foreground/50 backdrop-blur"
                    onClick={onNewTaskClick}
                >
                    <PlusIcon />
                </Button>
            </div>
        </div>
    );
};
