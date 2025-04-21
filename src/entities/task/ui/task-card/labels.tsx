import { useAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { labelAtoms } from "@/entities/label/atoms/allLabelsAtom";
import { cn } from "@/shared/lib/utils";

type LabelProps = {
    title: string;
    color: string;
};

const Label: React.FC<LabelProps> = (props) => {
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
    const [availableLabels] = useAtom(labelAtoms);

    const filteredLabels =
        labels &&
        availableLabels.filter(
            (availableLabel) =>
                labels.findIndex((label) => label === availableLabel.title) >=
                0,
        );

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
                        {filteredLabels.map((label) => (
                            <Label {...label} key={label.title} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
