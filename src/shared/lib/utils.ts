import { clsx, type ClassValue } from "clsx";
import { format, getYear, isToday, isTomorrow, type DateArg } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatSmartDate(date: DateArg<Date>): string {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";

    const isSameYear = getYear(date) === getYear(new Date());
    const base = format(date, "dd MMM");

    return isSameYear ? base : `${base} ${format(date, "yy")}`; // 17 May 26
}

export const getCapitalizedString = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);
