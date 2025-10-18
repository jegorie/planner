import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { LabelCard } from "@/entities/label/ui/label-card";
import { useLabelsSync } from "../hooks/use-labels-sync";

type Props = {
    labels: string[];
    className?: string;
    projectId: string;
};

export const FilteredLabelCards: React.FC<Props> = (props) => {
    const { labels, className, projectId } = props;
    const { labels: availableLabels } = useLabelsSync({ projectId });

    const filteredLabels =
        labels &&
        availableLabels?.filter((availableLabel) => {
            return labels.includes(availableLabel.id);
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
                            return <LabelCard key={label.id} {...label} />;
                        })}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
