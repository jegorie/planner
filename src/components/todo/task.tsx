import type { Task } from "@/types/task";
import { Checkbox } from "../ui/checkbox";
import { Tag } from "./tag";
import { Button } from "../ui/button";
import {
    AlarmClockIcon,
    CalendarDaysIcon,
    ChevronUpIcon,
    EllipsisVerticalIcon,
    FlagIcon,
    PaperclipIcon,
    PinIcon,
    PlusIcon,
    TagIcon,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { PrimitiveAtom } from "jotai";
import { Title } from "./components/title";
import { Desc } from "./components/desc";
import { Checked } from "./components/checked";

type Props = {
    atom: PrimitiveAtom<Task>;
};

export const TaskItem: React.FC<Props> = (props) => {
    const { atom } = props;
    const [isOpen, setIsOpen] = useState(false);

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
                <AnimatePresence>
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
                        "-my-1.5 ml-1.5 opacity-0 transition-opacity self-start",
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
            <div className="flex ml-7 gap-1 mt-1">
                <Tag title="School" />
                <Tag title="Work" />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="flex ml-3 justify-between mt-2 overflow-hidden"
                        initial={{
                            height: 0,
                            opacity: 0,
                            marginTop: 0,
                            marginBottom: 0,
                        }}
                        animate={{
                            height: isOpen ? "auto" : 0,
                            opacity: isOpen ? 1 : 0,
                            marginTop: isOpen ? 8 : 0,
                            marginBottom: isOpen ? 8 : 0,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            marginTop: 0,
                            marginBottom: 0,
                        }}
                    >
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
                            <Button variant="ghost" size="icon" disabled>
                                <TagIcon />
                            </Button>
                            <Button variant="ghost" size="icon" disabled>
                                <FlagIcon />
                            </Button>
                            <Button variant="ghost" size="icon" disabled>
                                <AlarmClockIcon />
                            </Button>
                            <Button variant="ghost" size="icon" disabled>
                                <PinIcon />
                            </Button>
                            <Button variant="ghost" size="icon" disabled>
                                <EllipsisVerticalIcon />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
