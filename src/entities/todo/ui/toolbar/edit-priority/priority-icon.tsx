import { Priority } from "@/entities/todo/types";
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
                "stroke-red-500": priority === Priority.high,
                "stroke-orange-500": priority === Priority.medium,
                "stroke-blue-500": priority === Priority.low,
                "stroke-primary": priority === Priority.none,
            })}
        />
    );
};
