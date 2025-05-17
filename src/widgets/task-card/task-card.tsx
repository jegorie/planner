import { Checked } from "@/entities/task/ui/task-card/checked";
import type { Task } from "@/entities/task/types";
import {
    AlarmClockIcon,
    CalendarDaysIcon,
    ChevronUpIcon,
    PaperclipIcon,
    PinIcon,
    PlusIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { useAtom, useAtomValue, type PrimitiveAtom } from "jotai";
import { Title } from "@/entities/task/ui/task-card/title";
import { Desc } from "@/entities/task/ui/task-card/desc";
import { Toolbar } from "@/entities/task/ui/task-card/toolbar/toolbar";
import { Button } from "@/shared/ui/button";
import { EditLabels } from "@/features/edit-labels/edit-labels";
import { EditPriority } from "@/features/edit-priority";
import { focusAtom } from "jotai-optics";
import { DeleteTaskDropDownItem } from "@/features/delete-task/ui/delete-task-dropdown-item";
import { ExtraMenuButton } from "@/shared/ui/extra-menu-button";
import { FilteredLabelCards } from "@/entities/label/ui/filtered-label-cards";

type Props = {
    atom: PrimitiveAtom<Task>;
    onDeleteClick: (id: string) => void;
};

export const TaskCard: React.FC<Props> = (props) => {
    const { atom, onDeleteClick } = props;
    const [isOpen, setIsOpen] = useState(false);
    const task = useAtomValue(atom);
    const [currentPriority, setCurrentPriority] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("priority"));
        }, [atom]),
    );
    const [labels, setLabels] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("labels"));
        }, [atom]),
    );

    const handleDelete = () => {
        onDeleteClick(task.id);
    };

    return (
        <div
            className={cn("max-w-4xl w-full rounded-lg transition-all", {
                "p-3 border shadow bg-primary-foreground": isOpen,
            })}
            onClick={() => {
                !isOpen && setIsOpen(true);
            }}
        >
            <div className="flex items-start justify-between">
                <Checked atom={atom} />
                <AnimatePresence initial={false}>
                    {!isOpen && (
                        <motion.div
                            initial={{
                                width: 0,
                                opacity: 0,
                                marginRight: 0,
                            }}
                            animate={{
                                width: !isOpen ? "auto" : 0,
                                opacity: !isOpen ? 1 : 0,
                                marginRight: !isOpen ? 8 : 0,
                            }}
                            exit={{
                                width: 0,
                                opacity: 0,
                                marginRight: 0,
                            }}
                            className="overflow-hidden shrink-0"
                        >
                            <div className="px-2 py-1 text-xs border rounded text-nowrap">
                                today 19:00
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Title atom={atom} isOpen={isOpen} />
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "-my-1.5 -mr-1.5 ml-1.5 opacity-0 transition-opacity self-start",
                        {
                            "opacity-100": isOpen,
                        },
                    )}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                >
                    <ChevronUpIcon />
                </Button>
            </div>
            <AnimatePresence>
                {isOpen && <Desc atom={atom} isOpen={isOpen} />}
            </AnimatePresence>
            <FilteredLabelCards labels={labels} className="mt-1 ml-7" />
            <AnimatePresence>
                {isOpen && (
                    <Toolbar isOpen={isOpen}>
                        <Button variant="ghost" disabled>
                            <CalendarDaysIcon />
                            Schedule
                        </Button>
                        <div>
                            <Button variant="ghost" size="icon" disabled>
                                <PlusIcon />
                            </Button>
                            <Button variant="ghost" size="icon" disabled>
                                <PaperclipIcon />
                            </Button>
                            <EditLabels labels={labels} setLabels={setLabels} />
                            <EditPriority
                                currentPriority={currentPriority}
                                setCurrentPriority={setCurrentPriority}
                            />
                            <Button variant="ghost" size="icon" disabled>
                                <AlarmClockIcon />
                            </Button>
                            <Button variant="ghost" size="icon" disabled>
                                <PinIcon />
                            </Button>
                            <ExtraMenuButton>
                                <DeleteTaskDropDownItem
                                    onClick={handleDelete}
                                />
                            </ExtraMenuButton>
                        </div>
                    </Toolbar>
                )}
            </AnimatePresence>
        </div>
    );
};
