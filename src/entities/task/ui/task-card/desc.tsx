import { useAtom, type PrimitiveAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo, useRef } from "react";
import type { Task } from "../../types";
import { motion } from "motion/react";
import Quill from "quill";
import { Editor } from "@/shared/ui/editor";

const Delta = Quill.import("delta");

type Props = {
    atom: PrimitiveAtom<Task>;
    isOpen: boolean;
};

export const Desc: React.FC<Props> = (props) => {
    const quillRef = useRef<Quill>(null);
    const { atom, isOpen } = props;
    const [desc, setDesc] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("desc"));
        }, [atom]),
    );

    return (
        <motion.div
            className="ml-7 mr-7 overflow-hidden flex-auto"
            initial={{
                height: 0,
                opacity: 0,
                marginTop: 0,
                marginBottom: 0,
            }}
            animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
                marginTop: isOpen ? 8 : 0,
                marginBottom: isOpen ? 8 : 0,
            }}
            exit={{
                height: 0,
                opacity: 0,
                marginTop: 0,
                marginBottom: 0,
            }}
        >
            <Editor
                ref={quillRef}
                defaultValue={new Delta().insert(desc || "")}
                onTextChange={() => {
                    if (quillRef.current) {
                        const newDesc = quillRef.current?.getText(
                            0,
                            quillRef.current.getLength(),
                        );
                        console.log('📝 Desc changed:', { oldDesc: desc, newDesc });
                        setDesc(newDesc);
                    }
                }}
                quillOptions={{ theme: "bubble", modules: { toolbar: false } }}
            />
        </motion.div>
    );
};
