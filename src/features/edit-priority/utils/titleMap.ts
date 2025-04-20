import type { Priority } from "@/entities/task/types";

export const titleMap: Record<Priority, string> = {
    1: "High",
    2: "Medium",
    3: "Low",
    4: "None",
};