import { Button } from "@/shared/ui/button";
import type { Task } from "../../../../types";
import { useAtom, type PrimitiveAtom } from "jotai";
import { useCallback, useMemo, useState, type FC } from "react";
import { focusAtom } from "jotai-optics";
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
import { PriorityCheckbox } from "./priority-checkbox";
import { Priority } from "@/entities/task/types";

type Props = {
    atom: PrimitiveAtom<Task>;
};

export const EditPriority: React.FC<Props> = (props) => {
    const { atom } = props;
    const [open, setOpen] = useState(false);
    const [currentPriority, setCurrentPriority] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("priority"));
        }, [atom]),
    );

    const isMobile = useIsMobile();

    const handlePrioritySelect = useCallback(
        (priority: Priority) => {
            setCurrentPriority(priority);
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
                    <div className="mt-4 border-t text-base">
                        <EditPriorityContent
                            currentPriority={currentPriority}
                            onChange={handlePrioritySelect}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <PriorityIcon priority={currentPriority} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <EditPriorityContent
                    currentPriority={currentPriority}
                    onChange={handlePrioritySelect}
                />
            </PopoverContent>
        </Popover>
    );
};

type ContentProps = {
    currentPriority: Priority;
    onChange: (priority: Priority) => void;
};

const EditPriorityContent: FC<ContentProps> = (props) => {
    const { onChange, ...rest } = props;

    const checkboxProps = {
        ...rest,
        onChange,
    };

    return (
        <div className="p-2 flex flex-col gap-1">
            <PriorityCheckbox priority={Priority.high} {...checkboxProps} />
            <PriorityCheckbox priority={Priority.medium} {...checkboxProps} />
            <PriorityCheckbox priority={Priority.low} {...checkboxProps} />
            <PriorityCheckbox priority={Priority.none} {...checkboxProps} />
        </div>
    );
};
