import { useAtom, type PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo, useRef } from "react";
import type { Task } from "../../types";
import { cn } from "@/shared/lib/utils";
import { motion } from "motion/react";
import Quill from "quill";
import { Editor } from "@/shared/ui/editor";

const Delta = Quill.import("delta");

type Props = {
    atom: PrimitiveAtom<Task>;
    isOpen: boolean;
};

export const Title: React.FC<Props> = (props) => {
    const quillRef = useRef<Quill>(null);
    const { atom, isOpen } = props;
    const [title, setTitle] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("title"));
        }, [atom]),
    );

    return (
        <motion.div
            initial={{
                height: 24,
            }}
            animate={{
                height: isOpen ? "auto" : 24,
            }}
            className={cn("flex-auto overflow-hidden font-medium", {
                "pointer-events-none font-normal": !isOpen,
                //"[&_p]:whitespace-nowrap [&_p]:text-ellipsis [&_p]:overflow-hidden w-0":
                //    !isOpen,
            })}
        >
            <Editor
                ref={quillRef}
                defaultValue={new Delta().insert(title)}
                onTextChange={() => {
                    if (quillRef.current) {
                        const newTitle = quillRef.current?.getText(
                            0,
                            quillRef.current.getLength(),
                        );
                        console.log('📝 Title changed:', { oldTitle: title, newTitle });
                        setTitle(newTitle);
                    }
                }}
                quillOptions={{ theme: "bubble", modules: { toolbar: false } }}
            />
        </motion.div>
    );
};
