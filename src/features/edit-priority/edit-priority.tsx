import { Button } from "@/shared/ui/button";
import { useCallback, useState } from "react";
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
                            priority={Priority.HIGH}
                            currentPriority={currentPriority}
                            onChange={handlePrioritySelect}
                        />
                        <PriorityItem
                            priority={Priority.MEDIUM}
                            currentPriority={currentPriority}
                            onChange={handlePrioritySelect}
                        />
                        <PriorityItem
                            priority={Priority.LOW}
                            currentPriority={currentPriority}
                            onChange={handlePrioritySelect}
                        />
                        <PriorityItem
                            priority={Priority.NONE}
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
                        value={Priority.HIGH.toString()}
                        priority={Priority.HIGH}
                    />
                    <PrioritySelectItem
                        value={Priority.MEDIUM.toString()}
                        priority={Priority.MEDIUM}
                    />
                    <PrioritySelectItem
                        value={Priority.LOW.toString()}
                        priority={Priority.LOW}
                    />
                    <PrioritySelectItem
                        value={Priority.NONE.toString()}
                        priority={Priority.NONE}
                    />
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
