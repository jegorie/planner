import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
    CalendarDaysIcon,
    ChevronRightIcon,
    ClockIcon,
    RepeatIcon,
    StarIcon,
    XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { format, addDays, addWeeks } from "date-fns";

import styles from "./styles.module.css";
import { cn, formatSmartDate } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";
import { RepeatPeriods, type Task } from "@/entities/task/types";
import { EditCalendar } from "./edit-calendar";
import { SwitchCardParent } from "@/shared/ui/switch-card";
import { EditRepeatTime } from "./edit-repeat-time";

type Props = {
    schedule: Task["schedule"];
    setSchedule: (value: Task["schedule"]) => void;
};

export const EditSchedule: React.FC<Props> = (props) => {
    const { schedule, setSchedule } = props;
    const [open, setOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isRepeatTimeOpen, setIsRepeatTimeOpen] = useState(false);
    const hideMainMenu = isDatePickerOpen || isRepeatTimeOpen;

    const handleSelect = (selected: Date | undefined) => {
        if (selected === undefined) {
            setSchedule(undefined);
            return;
        }
        setSchedule({ ...schedule, date: selected.toISOString() });
        setOpen(false);
    };

    useEffect(() => {
        if (!open) {
            setIsDatePickerOpen(false);
            setIsRepeatTimeOpen(false);
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
                    <SwitchCardParent
                        width={256}
                        isOpen={hideMainMenu}
                        className={cn("border-0 rounded p-2 bg-popover", {
                            "rounded-md": hideMainMenu,
                        })}
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
                                setIsDatePickerOpen(true);
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
                                        {format(schedule.date, "dd MMM")}
                                    </span>
                                )}
                                <ChevronRightIcon />
                            </div>
                        </Button>
                        <Separator className="my-1" />
                        <Button
                            variant="ghost"
                            className="justify-between font-normal px-3"
                            onClick={() => setIsRepeatTimeOpen(true)}
                        >
                            <div className="flex gap-2 items-center">
                                <RepeatIcon
                                    className={cn(
                                        "text-muted-foreground",
                                        styles.calendarIconNextWeek,
                                    )}
                                />
                                Repeat
                            </div>
                            <div className="flex gap-2 items-center">
                                {schedule?.repeat?.type && (
                                    <span className="text-primary/50">
                                        {RepeatPeriods[schedule.repeat.type]}
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
                            <ClockIcon
                                className={cn(
                                    "text-muted-foreground",
                                    styles.calendarIconNextWeek,
                                )}
                            />
                            Time
                        </Button>
                    </SwitchCardParent>
                    <EditCalendar
                        schedule={schedule}
                        setSchedule={setSchedule}
                        isOpen={isDatePickerOpen}
                        setIsOpen={setIsDatePickerOpen}
                    />
                    <EditRepeatTime
                        schedule={schedule}
                        setSchedule={setSchedule}
                        isOpen={isRepeatTimeOpen}
                        setIsOpen={setIsRepeatTimeOpen}
                    />
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
