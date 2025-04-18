import type { Priority } from "@/entities/todo/types";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import type { FC } from "react";
import { PriorityIcon } from "./priority-icon";

type Props = {
    currentPriority: Priority;
    priority: Priority;
    onChange: (priority: Priority) => void;
};

export const PriorityCheckbox: FC<Props> = (props) => {
    const { priority, currentPriority, onChange } = props;

    const selected = currentPriority === priority;

    return (
        <Button
            variant="ghost"
            className={cn(
                "flex justify-start space-x-2 rounded p-2 transition-colors hover:shadow w-full",
                {
                    "bg-accent dark:bg-accent/50 shadow": selected,
                },
            )}
            onClick={() => onChange(priority)}
        >
            <PriorityIcon priority={priority} />
            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                High
            </div>
        </Button>
    );
};
