import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { ChevronLeftIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useAtom, type PrimitiveAtom } from "jotai";
import { useMemo } from "react";
import { focusAtom } from "jotai-optics";
import type { Task } from "@/entities/task/types";
import { SwitchCardChild } from "@/shared/ui/switch-card";
import { Separator } from "@/shared/ui/separator";

type Props = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    atom: PrimitiveAtom<Task>;
};

export const EditCalendar: React.FC<Props> = (props) => {
    const { isOpen, setIsOpen, atom } = props;
    const [schedule, setSchedule] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("schedule"));
        }, [atom]),
    );

    return (
        <SwitchCardChild
            height={250}
            width={256}
            isOpen={isOpen}
            className={cn("bg-popover p-2 flex flex-col")}
            index={0}
        >
            <Button
                variant="ghost"
                className="justify-start font-normal f-full"
                onClick={() => {
                    setIsOpen(false);
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
                selected={schedule?.date ? new Date(schedule.date) : undefined}
                onSelect={(day) => {
                    if (day === undefined) {
                        setSchedule(undefined);
                        return;
                    }
                    setSchedule((prev) => ({
                        ...prev,
                        date: day.toISOString(),
                    }));
                    setIsOpen(false);
                }}
                className="px-0 mx-auto"
            />
        </SwitchCardChild>
    );
};
