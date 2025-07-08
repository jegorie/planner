import { cn } from "@/shared/lib/utils";
import { MotionConfig, motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";
import useMeasure from "react-use-measure";

const DURATION = 0.5;

type Props = {
    children?: ReactNode | null;
    triggerKey: string;
    className?: string;
};

export const FadeCard: React.FC<Props> = (props) => {
    const { children, triggerKey, className } = props;
    const [ref, { height }] = useMeasure();

    return (
        <MotionConfig transition={{ duration: DURATION }}>
            <motion.div
                animate={{
                    height: height || "auto",
                    transition: { delay: DURATION / 2 },
                }}
                className="overflow-hidden relative"
            >
                <AnimatePresence initial={false}>
                    <motion.div
                        key={triggerKey}
                        initial={{
                            opacity: 0,
                            filter: "blur(4px)",
                        }}
                        animate={{
                            opacity: 1,
                            filter: "blur(0px)",
                            transition: {
                                duration: DURATION / 2,
                                delay: DURATION / 2,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            filter: "blur(4px)",
                            transition: { duration: DURATION / 2 },
                        }}
                    >
                        <div
                            ref={ref}
                            className={cn(className, {
                                "absolute left-0 right-0": height,
                                relative: !height,
                            })}
                        >
                            {children}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </MotionConfig>
    );
};
