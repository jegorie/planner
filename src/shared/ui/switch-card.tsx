import type { FC, ReactNode } from "react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

type SwitchCardParentProps = {
    isOpen: boolean;
    children: ReactNode;
    className: string;
    width: number;
};

export const SwitchCardParent: FC<SwitchCardParentProps> = (props) => {
    const { isOpen, children, className, width } = props;

    return (
        <div
            className={cn(
                "flex flex-col transition-all origin-center bg-popover easy-in-out delay-100 shrink-0",
                {
                    "scale-95 delay-0 opacity-50": isOpen,
                },
                className,
            )}
            style={{ width }}
        >
            {children}
        </div>
    );
};

type SwitchCardChildProps = {
    className: string;
    isOpen: boolean;
    children: ReactNode;
    width: number;
    height: number;
    index: number;
};

export const SwitchCardChild: FC<SwitchCardChildProps> = (props) => {
    const { children, className, isOpen, width, height, index } = props;

    const translateXOpen = `-${(index + 1) * 100}%`;
    const translateXClosed = `-${index * 100}%`;

    return (
        <motion.div
            transition={{
                delay: isOpen ? 0.1 : 0,
                type: "tween",
                duration: 0.15,
            }}
            initial={{
                height,
                translateX: 0,
            }}
            animate={{
                height: isOpen ? "auto" : height,
                translateX: isOpen ? translateXOpen : translateXClosed,
            }}
            exit={{
                height,
                translateX: 0,
            }}
            className={cn("easy-in-out shrink-0", className)}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};
