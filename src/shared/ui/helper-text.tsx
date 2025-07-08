import { AnimatePresence, motion } from "motion/react";
import { cn } from "../lib/utils";

type Props = {
    title?: string | null;
    error?: boolean;
};

export const HelperText: React.FC<Props> = (props) => {
    const { title, error } = props;
    return (
        <div
            className={cn("text-sm min-h-5", {
                "text-destructive": error,
            })}
        >
            <AnimatePresence>
                {title && (
                    <motion.span
                        initial={{
                            opacity: 0,
                        }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        {title}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
};
