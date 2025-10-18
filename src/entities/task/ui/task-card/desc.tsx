import { useRef } from "react";
import { motion } from "motion/react";
import Quill from "quill";
import { Editor } from "@/shared/ui/editor";
import { useDebouncedCallback } from "use-debounce";

const Delta = Quill.import("delta");

type Props = {
    value: string;
    onChange: (value: string) => void;
    isOpen: boolean;
};

export const Desc: React.FC<Props> = (props) => {
    const quillRef = useRef<Quill>(null);
    const { value, isOpen, onChange } = props;

    const debouncedOnChange = useDebouncedCallback(onChange, 1000);

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
                defaultValue={new Delta().insert(value || "")}
                onTextChange={() => {
                    if (quillRef.current) {
                        const desc = quillRef.current?.getText(
                            0,
                            quillRef.current.getLength(),
                        );
                        debouncedOnChange(desc);
                    }
                }}
                quillOptions={{ theme: "bubble", modules: { toolbar: false } }}
            />
        </motion.div>
    );
};
