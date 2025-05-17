import { useAtomValue, useStore } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { labelAtoms } from "@/entities/label/atoms/allLabelsAtom";
import { cn } from "@/shared/lib/utils";
import { useMemo } from "react";
import { LabelCard } from "@/entities/label/ui/label-card";

type Props = {
    labels: string[];
    className?: string;
};

export const FilteredLabelCards: React.FC<Props> = (props) => {
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
        <AnimatePresence initial={false}>
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
                    <AnimatePresence initial={false}>
                        {filteredLabels.map((label) => {
                            return <LabelCard key={label.title} {...label} />;
                        })}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
