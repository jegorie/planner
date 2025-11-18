import { Checked } from "@/entities/task/ui/task-card/checked";
import type { Task, UpdateTask } from "@/entities/task/types";
import {
    AlarmClockIcon,
    ChevronUpIcon,
    PaperclipIcon,
    PinIcon,
    PlusIcon,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn, formatSmartDate } from "@/shared/lib/utils";
import { Title } from "@/entities/task/ui/task-card/title";
import { Desc } from "@/entities/task/ui/task-card/desc";
import { Toolbar } from "@/entities/task/ui/task-card/toolbar/toolbar";
import { Button } from "@/shared/ui/button";
import { EditLabels } from "@/features/edit-labels/edit-labels";
import { EditPriority } from "@/features/edit-priority";
import { DeleteTaskDropDownItem } from "@/features/delete-task/ui/delete-task-dropdown-item";
import { ExtraMenuButton } from "@/shared/ui/extra-menu-button";
import { FilteredLabelCards } from "@/entities/label/ui/filtered-label-cards";
import { EditSchedule } from "@/features/edit-schedule/ui/edit-schedule";

type Props = {
    task: Task;
    onDeleteClick: (id: string) => void;
    onChange: (task: Pick<Task, "id"> & UpdateTask) => void;
    projectId: string;
};

export const TaskCard: React.FC<Props> = (props) => {
    const { task, onDeleteClick, onChange, projectId } = props;
    const [isOpen, setIsOpen] = useState(false);
    const currentPriority = task.priority;
    const labelIds = task.labelIds;
    const date = task.schedule?.date;

    const handleDelete = () => {
        onDeleteClick(task.id);
    };

    const handleChange =
        <Key extends keyof Task>(key: Key) =>
        (value: Task[Key]) => {
            onChange({ id: task.id, [key]: value });
        };

    return (
        <div
            className={cn(
                "max-w-4xl w-full rounded-lg transition-all p-1 shadow-none border border-transparent",
                {
                    "p-3 shadow-xl bg-primary-foreground border border-primary/5":
                        isOpen,
                    "cursor-pointer hover:bg-primary-foreground hover:border active:bg-primary-foreground active:border":
                        !isOpen,
                },
            )}
            onClick={() => {
                !isOpen && setIsOpen(true);
            }}
        >
            <div className="flex items-start justify-between">
                <Checked
                    checked={task.checked}
                    onChange={handleChange("checked")}
                    currentPriority={currentPriority}
                />
                <AnimatePresence initial={false}>
                    {!isOpen && date && (
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
                                {formatSmartDate(date)}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Title
                    value={task.title}
                    onChange={handleChange("title")}
                    isOpen={isOpen}
                />
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
                {isOpen && (
                    <Desc
                        isOpen={isOpen}
                        value={task.desc}
                        onChange={handleChange("desc")}
                    />
                )}
            </AnimatePresence>
            <FilteredLabelCards
                labels={labelIds}
                projectId={projectId}
                className="mt-1 ml-7"
            />
            <AnimatePresence>
                {isOpen && (
                    <Toolbar isOpen={isOpen}>
                        <EditSchedule
                            schedule={task.schedule}
                            setSchedule={handleChange("schedule")}
                        />
                        <div className="flex justify-between sm:justify-start">
                            <div>
                                <Button variant="ghost" size="icon" disabled>
                                    <PlusIcon />
                                </Button>
                                <Button variant="ghost" size="icon" disabled>
                                    <PaperclipIcon />
                                </Button>
                                <EditLabels
                                    labels={labelIds}
                                    setLabels={handleChange("labelIds")}
                                    projectId={projectId}
                                />
                                <EditPriority
                                    value={currentPriority}
                                    onChange={handleChange("priority")}
                                />
                                <Button variant="ghost" size="icon" disabled>
                                    <AlarmClockIcon />
                                </Button>
                                <Button variant="ghost" size="icon" disabled>
                                    <PinIcon />
                                </Button>
                            </div>
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
