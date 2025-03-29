import type { Task } from "./types";
import { ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/shared/lib/utils";
import type { PrimitiveAtom } from "jotai";
import { Title } from "./components/title";
import { Desc } from "./components/desc";
import { Checked } from "./components/checked";
import { Labels } from "./components/labels";
import { Toolbar } from "./components/toolbar/toolbar";
import { Button } from "@/shared/ui/button";

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
            <Labels atom={atom} />
            <AnimatePresence>
                {isOpen && <Toolbar atom={atom} isOpen={isOpen} />}
            </AnimatePresence>
        </div>
    );
};
