import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils";
import type { AvailableColors, Label } from "@/entities/label/types";

const colorsMap: Record<AvailableColors, string> = {
    none: "bg-primary-foreground",
    orange: "bg-orange-100 border-orange-500 text-orange-900 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-900",
};

export const LabelCard: React.FC<Label> = (props) => {
    const { title, color } = props;

    return (
        <motion.div
            transition={{ duration: 0.1 }}
            initial={{
                width: 0,
                opacity: 0,
                paddingLeft: 0,
                paddingRight: 0,
            }}
            animate={{
                width: "auto",
                opacity: 1,
                paddingLeft: 8,
                paddingRight: 8,
            }}
            exit={{
                width: 0,
                opacity: 0,
                paddingLeft: 0,
                paddingRight: 0,
            }}
            className={cn(
                "text-xs border rounded py-1 px-2 shrink-0 overflow-hidden text-nowrap",
                colorsMap[color],
            )}
        >
            {title}
        </motion.div>
    );
};
