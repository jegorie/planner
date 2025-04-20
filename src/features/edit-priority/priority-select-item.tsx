import { cn } from "@/shared/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { PriorityIcon } from "./priority-icon";
import type { Priority } from "@/entities/task/types";
import { titleMap } from "./utils/titleMap";

type Props = {
    priority: Priority;
} & React.ComponentProps<typeof SelectPrimitive.Item>;

export const PrioritySelectItem = ({
    className,
    children,
    priority,
    ...props
}: Props) => {
    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className={cn(
                "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-4 rounded-sm py-1.5 px-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 min-w-28",
                className,
            )}
            {...props}
        >
            <PriorityIcon priority={priority} />
            <SelectPrimitive.ItemText>
                {titleMap[priority]}
            </SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
};
