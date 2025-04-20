import { useAtom, type PrimitiveAtom } from "jotai";
import type { Task } from "../../types";
import { useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { AnimatePresence, motion } from "motion/react";
import { labelAtoms } from "@/entities/label/atoms/allLabelsAtom";

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
    atom: PrimitiveAtom<Task>;
};

export const Labels: React.FC<Props> = (props) => {
    const { atom } = props;
    const [availableLabels] = useAtom(labelAtoms);
    const [labels] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("labels"));
        }, [atom]),
    );

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
                    className="flex ml-7 gap-1 mt-1"
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
