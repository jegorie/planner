import { cn, getCapitalizedString } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import styles from "./styles.module.css";
import { RepeatPeriods, type Task } from "@/entities/task/types";
import { SwitchCardChild } from "@/shared/ui/switch-card";
import { Separator } from "@/shared/ui/separator";

type Props = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    schedule: Task["schedule"];
    setSchedule: (value: Task["schedule"]) => void;
};

type BasicRepeatPeriods = Exclude<RepeatPeriods, RepeatPeriods.CUSTOM>;

type RepeatButtonProps = {
    handleRepeat: (value: BasicRepeatPeriods) => void;
    currentRepeat?: RepeatPeriods;
    repeatPeriod: BasicRepeatPeriods;
};

const RepeatButton = (props: RepeatButtonProps) => {
    const { handleRepeat, currentRepeat, repeatPeriod } = props;

    return (
        <Button variant="ghost" onClick={() => handleRepeat(repeatPeriod)}>
            <div className="flex justify-between flex-1">
                {getCapitalizedString(RepeatPeriods[repeatPeriod])}
                {currentRepeat === repeatPeriod && <CheckIcon />}
            </div>
        </Button>
    );
};

export const EditRepeatTime: React.FC<Props> = (props) => {
    const { isOpen, setIsOpen, schedule, setSchedule } = props;
    const currentRepeat = schedule?.repeat?.type;

    const handleRepeat = (
        type: Exclude<RepeatPeriods, RepeatPeriods.CUSTOM>,
    ) => {
        setSchedule({
            date: schedule?.date || new Date().toISOString(),
            repeat: { type },
        });
        setIsOpen(false);
    };

    return (
        <SwitchCardChild
            height={250}
            width={256}
            isOpen={isOpen}
            className={cn("bg-popover p-2 flex flex-col")}
            index={1}
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
            <RepeatButton
                repeatPeriod={RepeatPeriods.DAILY}
                currentRepeat={currentRepeat}
                handleRepeat={handleRepeat}
            />
            <RepeatButton
                repeatPeriod={RepeatPeriods.WEEKLY}
                currentRepeat={currentRepeat}
                handleRepeat={handleRepeat}
            />
            <RepeatButton
                repeatPeriod={RepeatPeriods.MONTHLY}
                currentRepeat={currentRepeat}
                handleRepeat={handleRepeat}
            />
            <RepeatButton
                repeatPeriod={RepeatPeriods.YEARLY}
                currentRepeat={currentRepeat}
                handleRepeat={handleRepeat}
            />
            <Separator className="my-1" />
            <RepeatButton
                repeatPeriod={RepeatPeriods.NONE}
                handleRepeat={handleRepeat}
            />
            <Button variant="ghost" className="justify-between" disabled>
                <div className="flex-1 flex justify-between items-center">
                    Custom
                    <ChevronRightIcon />
                </div>
            </Button>
        </SwitchCardChild>
    );
};
