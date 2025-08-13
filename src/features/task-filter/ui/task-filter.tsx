import { labelAtoms } from "@/entities/label/atoms/all-labels-atom";
import { Priority } from "@/entities/task/types";
import { cn, getCapitalizedString } from "@/shared/lib/utils";
import { FadeCard } from "@/shared/ui/animations/fade-card";
import { useAtom, useAtomValue, useStore } from "jotai";
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

export const TasksFilter = () => {
    const store = useStore();
    const [isOpen, setIsOpen] = useState(false);

    // Filter atoms
    const [selectedLabels, setSelectedLabels] = useAtom(selectedLabelsAtom);
    const [selectedPriority, setSelectedPriority] =
        useAtom(selectedPriorityAtom);
    const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
    const [sortBy, setSortBy] = useAtom(sortByAtom);
    const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);

    // Labels data
    const labelAtomsArray = useAtomValue(labelAtoms);
    const labelValues = useMemo(() => {
        return labelAtomsArray.map((atom) => store.get(atom));
    }, [labelAtomsArray, store.get]);

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

    const coundSortingEl =
        +(selectedLabel !== "all") +
        +(selectedPriority !== "all") +
        +(selectedDate !== "all");

    // Filter configurations for rendering
    const filterConfigs = useMemo(() => {
        const labelOptions: FilterOption[] = [
            { value: "all", label: "All labels" },
            ...labelValues.map((label) => ({
                value: label.id,
                label: label.title,
            })),
        ];

        const priorityOptions: FilterOption[] = [
            { value: "all", label: "All priorities" },
            { value: Priority.high.toString(), label: "High" },
            { value: Priority.medium.toString(), label: "Medium" },
            { value: Priority.low.toString(), label: "Low" },
            { value: Priority.none.toString(), label: "None" },
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
                        value === "all" ? "all" : (+value as Priority),
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
                "sticky top-2 mx-auto border bg-primary-foreground/50 transition-all duration-300 z-10",
                {
                    ["bg-primary-foreground/50 backdrop-blur rounded-lg w-full max-w-4xl shadow-xl"]:
                        isOpen,
                },
                {
                    ["bg-primary-foreground/10 backdrop-blur-xs px-3 py-1 rounded-2xl w-full max-w-sm shadow-xs hover:bg-primary-foreground"]:
                        !isOpen,
                },
            )}
            onClick={() => setIsOpen((prev) => !prev)}
        >
            <FadeCard triggerKey={isOpen.toString()} duration={0.15}>
                {isOpen ? (
                    <div className="flex items-center py-4 px-4 flex-wrap gap-10">
                        <div className="flex items-center flex-wrap gap-3 flex-7/12">
                            {filterConfigs.slice(0, 2).map((config, index) => (
                                <FilterSelect
                                    key={index}
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
                            {filterConfigs.slice(2).map((config, index) => (
                                <FilterSelect
                                    key={index}
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
                    <div className="flex gap-4 justify-center">
                        <div>
                            <span className="text-sm text-primary/50">
                                Sorting:
                            </span>{" "}
                            <span className="font-medium">
                                {coundSortingEl}
                            </span>
                        </div>
                        <div>
                            <span className="text-sm text-primary/50">
                                Sort by:
                            </span>{" "}
                            <span className="font-medium">
                                {getCapitalizedString(sortBy)}
                            </span>
                        </div>
                        {sortBy !== "custom" && (
                            <div>
                                <span className="text-sm text-primary/50">
                                    Order:
                                </span>{" "}
                                <span className="font-medium">
                                    {getCapitalizedString(sortOrder)}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </FadeCard>
        </div>
    );
};
