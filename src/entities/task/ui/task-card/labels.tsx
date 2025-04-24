import { useAtomValue, useStore } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { labelAtoms } from "@/entities/label/atoms/allLabelsAtom";
import { cn } from "@/shared/lib/utils";
import type { Label as TLabel } from "@/entities/label/types";
import { useMemo } from "react";

const Label: React.FC<TLabel> = (props) => {
    const { title } = props;

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
            className="text-xs border rounded py-1 px-2 bg-primary-foreground shrink-0 overflow-hidden text-nowrap"
        >
            {title}
        </motion.div>
    );
};

type Props = {
    labels: string[];
    className?: string;
};

export const Labels: React.FC<Props> = (props) => {
    const { labels, className } = props;
    const store = useStore();
    const availableLabelAtoms = useAtomValue(labelAtoms);
    const availableLabels = useMemo(
        () => availableLabelAtoms.map((item) => store.get(item)),
        [store.get, availableLabelAtoms],
    );

    const filteredLabels =
        labels &&
        availableLabels.filter((availableLabel) => {
            return labels.includes(availableLabel.title);
        });

    return (
        <AnimatePresence>
            {!!filteredLabels?.length && (
                <motion.div
                    initial={{
                        height: 0,
                        width: 0,
                        opacity: 0,
                    }}
                    animate={{
                        height: "auto",
                        width: "auto",
                        opacity: 1,
                    }}
                    exit={{
                        height: 0,
                        width: 0,
                        opacity: 0,
                    }}
                    className={cn("flex gap-1", className)}
                >
                    <AnimatePresence>
                        {filteredLabels.map((label) => {
                            return <Label key={label.title} {...label} />;
                        })}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
