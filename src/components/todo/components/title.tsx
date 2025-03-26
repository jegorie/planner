import { useAtom, type PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { useCallback, useEffect, useMemo, useRef } from "react";
import type { Task } from "../types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type Props = {
    atom: PrimitiveAtom<Task>;
    isOpen: boolean;
};

export const Title: React.FC<Props> = (props) => {
    const { atom, isOpen } = props;
    const [title, setTitle] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("title"));
        }, [atom]),
    );

    const ref = useRef<HTMLTextAreaElement>(null);
    const outerRef = useRef<HTMLLabelElement>(null);

    // Функция для динамической регулировки высоты
    const resizeTextarea = useCallback(() => {
        if (ref.current) {
            ref.current.style.height = "24px"; // Устанавливаем новую высоту
            ref.current.style.height = `${ref.current.scrollHeight}px`; // Устанавливаем новую высоту
        }
    }, []);

    return (
        <div className={cn("flex-auto relative flex")}>
            <motion.label
                htmlFor="item"
                initial={{
                    height: 24,
                }}
                animate={{
                    height: isOpen ? ref.current?.scrollHeight : 24,
                }}
                className={cn(
                    "flex-auto overflow-hidden block relative whitespace-pre-wrap",
                    {
                        "font-medium": isOpen,
                        "whitespace-nowrap text-ellipsis w-0": !isOpen,
                    },
                )}
                ref={outerRef}
            >
                {title}
            </motion.label>
            <textarea
                id="item"
                ref={ref}
                className="absolute left-0 top-0 right-0 text-transparent caret-primary resize-none focus:outline-none"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    resizeTextarea();
                }}
            />
        </div>
    );
};
