import { atom } from "jotai";
import type { Priority } from "@/entities/task/types";

export type SortBy = "title" | "priority" | "createdAt" | "schedule" | "custom";
export type SortOrder = "asc" | "desc";

export type TaskFilters = {
    labels: string[]; // Array of label IDs ("all" means no filter)
    priority: Priority | "all";
    date: Date | "all";
    sortBy: SortBy;
    sortOrder: SortOrder;
};

// Individual filter atoms
export const selectedLabelsAtom = atom<string[]>([]);
export const selectedPriorityAtom = atom<Priority | "all">("all");
export const selectedDateAtom = atom<Date | "all">("all");
export const sortByAtom = atom<SortBy>("title");
export const sortOrderAtom = atom<SortOrder>("asc");

// Computed atom for all filters
export const taskFiltersAtom = atom<TaskFilters>((get) => ({
    labels: get(selectedLabelsAtom),
    priority: get(selectedPriorityAtom),
    date: get(selectedDateAtom),
    sortBy: get(sortByAtom),
    sortOrder: get(sortOrderAtom),
}));

// Helper atoms for UI
export const isFilterActiveAtom = atom<boolean>((get) => {
    const filters = get(taskFiltersAtom);
    return (
        filters.labels.length > 0 ||
        filters.priority !== "all" ||
        filters.date !== "all" ||
        filters.sortBy !== "title" ||
        filters.sortOrder !== "asc"
    );
});

// Reset all filters
export const resetFiltersAtom = atom(null, (_, set) => {
    set(selectedLabelsAtom, []);
    set(selectedPriorityAtom, "all");
    set(selectedDateAtom, "all");
    set(sortByAtom, "title");
    set(sortOrderAtom, "asc");
});
