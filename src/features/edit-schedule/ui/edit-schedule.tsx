import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
    CalendarDaysIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    RepeatIcon,
    StarIcon,
    XIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { format, addDays, addWeeks } from "date-fns";
import { motion } from "motion/react";

import styles from "./edit-schedule.module.css";
import { cn, formatSmartDate } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";
import { Calendar } from "@/shared/ui/calendar";
import { useAtom, type PrimitiveAtom } from "jotai";
import type { Task } from "@/entities/task/types";
import { focusAtom } from "jotai-optics";

type Props = {
    atom: PrimitiveAtom<Task>;
};

export const EditSchedule: React.FC<Props> = (props) => {
    const { atom } = props;
    const [schedule, setSchedule] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("schedule"));
        }, [atom]),
    );
    const [open, setOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleSelect = (selected: Date | undefined) => {
        if (selected === undefined) {
            setSchedule(undefined);
            return;
        }
        setSchedule((prev) => ({ ...prev, date: selected.toISOString() }));
        setOpen(false);
    };

    useEffect(() => {
        if (!open) {
            setIsDatePickerOpen(false);
        }
    }, [open]);

    return (
        <div className="group relative">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="ghost">
                        <CalendarDaysIcon />
                        {schedule?.date
                            ? formatSmartDate(schedule.date)
                            : "Schedule"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className={
                        "w-64 p-0 bg-black origin-center overflow-hidden flex"
                    }
                    align="start"
                >
                    <div
                        className={cn(
                            "flex flex-col border-0 transition-all rounded p-2 origin-center bg-popover easy-in-out delay-100 w-64 shrink-0",
                            {
                                "scale-95 rounded-md delay-0 opacity-50":
                                    isDatePickerOpen,
                            },
                        )}
                    >
                        <Button
                            variant="ghost"
                            onClick={() => handleSelect(new Date())}
                            className="justify-start font-normal"
                        >
                            <StarIcon className="text-muted-foreground" />
                            Today ({format(new Date(), "dd MMM")})
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => handleSelect(addDays(new Date(), 1))}
                            className="justify-start font-normal"
                        >
                            <CalendarDaysIcon
                                className={cn(
                                    "text-muted-foreground",
                                    styles.calendarIconTomorrow,
                                )}
                            />
                            Tomorrow ({format(addDays(new Date(), 1), "dd MMM")}
                            )
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() =>
                                handleSelect(addWeeks(new Date(), 1))
                            }
                            className="justify-start font-normal"
                        >
                            <CalendarDaysIcon
                                className={cn(
                                    "text-muted-foreground",
                                    styles.calendarIconNextWeek,
                                )}
                            />
                            Next week (
                            {format(addWeeks(new Date(), 1), "dd MMM")})
                        </Button>
                        <Button
                            variant="ghost"
                            className="justify-between font-normal px-3"
                            onClick={() => {
                                setIsDatePickerOpen((prev) => !prev);
                            }}
                        >
                            <div className="flex gap-2 items-center">
                                <CalendarDaysIcon
                                    className={cn("text-muted-foreground")}
                                />
                                Choose a date
                            </div>
                            <div className="flex gap-2 items-center">
                                {schedule?.date && (
                                    <span className="text-primary/50">
                                        {" "}
                                        {format(schedule.date, "dd MMM")}
                                    </span>
                                )}
                                <ChevronRightIcon />
                            </div>
                        </Button>
                        <Separator className="my-1" />
                        <Button
                            variant="ghost"
                            onClick={() =>
                                handleSelect(addWeeks(new Date(), 1))
                            }
                            className="justify-start font-normal"
                        >
                            <RepeatIcon
                                className={cn(
                                    "text-muted-foreground",
                                    styles.calendarIconNextWeek,
                                )}
                            />
                            Repeat
                        </Button>
                        <Separator className="my-1" />
                    </div>
                    <motion.div
                        transition={{
                            delay: isDatePickerOpen ? 0.1 : 0,
                            type: "tween",
                            duration: 0.15,
                        }}
                        initial={{
                            height: 214,
                            translateX: 0,
                        }}
                        animate={{
                            height: isDatePickerOpen ? "auto" : 214,
                            translateX: isDatePickerOpen ? "-100%" : 0,
                        }}
                        exit={{
                            height: 214,
                            translateX: 0,
                        }}
                        className={cn(
                            "bg-popover w-64 easy-in-out p-2 flex flex-col shrink-0",
                        )}
                    >
                        <Button
                            variant="ghost"
                            className="justify-start font-normal f-full"
                            onClick={() => {
                                setIsDatePickerOpen(false);
                            }}
                        >
                            <ChevronLeftIcon
                                className={cn(
                                    "text-muted-foreground",
                                    styles.calendarIconNextWeek,
                                )}
                            />
                            Back
                        </Button>
                        <Separator className="my-1" />
                        <Calendar
                            disabled={{ before: new Date() }}
                            mode="single"
                            selected={
                                schedule?.date
                                    ? new Date(schedule.date)
                                    : undefined
                            }
                            onSelect={(day) => {
                                if (day === undefined) {
                                    setSchedule(undefined);
                                    return;
                                }
                                setSchedule((prev) => ({
                                    ...prev,
                                    date: day.toISOString(),
                                }));
                                setIsDatePickerOpen(false);
                            }}
                            className="px-0 mx-auto"
                        />
                    </motion.div>
                </PopoverContent>
            </Popover>
            {schedule && (
                <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => {
                        setSchedule(undefined);
                    }}
                >
                    <XIcon />
                </Button>
            )}
        </div>
    );
};
