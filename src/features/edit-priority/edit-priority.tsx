import { Button } from "@/shared/ui/button";
import { useCallback, useState, type FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/shared/ui/drawer";
import { PriorityIcon } from "./priority-icon";
import { PriorityItem } from "./priority-item";
import { Priority } from "@/entities/task/types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
} from "@/shared/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { PrioritySelectItem } from "./priority-select-item";

type Props = {
    currentPriority: Priority;
    setCurrentPriority: (priority: Priority) => void;
};

export const EditPriority: React.FC<Props> = (props) => {
    const { currentPriority, setCurrentPriority } = props;
    const [open, setOpen] = useState(false);

    const isMobile = useIsMobile();

    const handlePrioritySelect = useCallback(
        (priority: string | Priority) => {
            setCurrentPriority(+priority);
            setOpen(false);
        },
        [setCurrentPriority],
    );

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <PriorityIcon priority={currentPriority} />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[80dvh]">
                    <DrawerHeader className="hidden">
                        <DrawerTitle>Priority</DrawerTitle>
                        <DrawerDescription>Choose priority</DrawerDescription>
                    </DrawerHeader>
                    <div className="mt-4 border-t text-base p-2 flex flex-col gap-1">
                        <PriorityItem
                            priority={Priority.high}
                            currentPriority={currentPriority}
                            onChange={handlePrioritySelect}
                        />
                        <PriorityItem
                            priority={Priority.medium}
                            currentPriority={currentPriority}
                            onChange={handlePrioritySelect}
                        />
                        <PriorityItem
                            priority={Priority.low}
                            currentPriority={currentPriority}
                            onChange={handlePrioritySelect}
                        />
                        <PriorityItem
                            priority={Priority.none}
                            currentPriority={currentPriority}
                            onChange={handlePrioritySelect}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Select
            value={currentPriority.toString()}
            onValueChange={handlePrioritySelect}
        >
            <SelectTrigger asChild>
                <Button variant="ghost" size="icon">
                    <PriorityIcon priority={currentPriority} />
                </Button>
            </SelectTrigger>
            <SelectContent align="center" className="w-52">
                <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <PrioritySelectItem
                        value={Priority.high.toString()}
                        priority={Priority.high}
                    />
                    <PrioritySelectItem
                        value={Priority.medium.toString()}
                        priority={Priority.medium}
                    />
                    <PrioritySelectItem
                        value={Priority.low.toString()}
                        priority={Priority.low}
                    />
                    <PrioritySelectItem
                        value={Priority.none.toString()}
                        priority={Priority.none}
                    />
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
