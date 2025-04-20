import type { Priority } from "@/entities/task/types";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import type { FC } from "react";
import { PriorityIcon } from "./priority-icon";
import { titleMap } from "./utils/titleMap";

type Props = {
    currentPriority: Priority;
    priority: Priority;
    onChange: (priority: Priority) => void;
};

export const PriorityItem: FC<Props> = (props) => {
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
                {titleMap[priority]}
            </div>
        </Button>
    );
};
