import { Priority } from "@/entities/task/types";
import { cn } from "@/shared/lib/utils";
import { FlagIcon } from "lucide-react";
import type { FC } from "react";

type Props = {
    className?: string;
    priority: Priority;
};

export const PriorityIcon: FC<Props> = (props) => {
    const { className, priority } = props;

    return (
        <FlagIcon
            className={cn(className || "", {
                "stroke-red-500": priority === Priority.HIGH,
                "stroke-orange-500": priority === Priority.MEDIUM,
                "stroke-blue-500": priority === Priority.LOW,
                "stroke-primary": priority === Priority.NONE,
            })}
        />
    );
};
