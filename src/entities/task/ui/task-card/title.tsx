import { useRef } from "react";
import { cn } from "@/shared/lib/utils";
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

export const Title: React.FC<Props> = (props) => {
    const quillRef = useRef<Quill>(null);
    const { value, isOpen, onChange } = props;

    const debouncedOnChange = useDebouncedCallback(onChange, 1000);

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
            })}
        >
            <Editor
                ref={quillRef}
                defaultValue={new Delta().insert(value)}
                onTextChange={() => {
                    if (quillRef.current) {
                        const title = quillRef.current?.getText(
                            0,
                            quillRef.current.getLength(),
                        );
                        debouncedOnChange(title);
                    }
                }}
                quillOptions={{ theme: "bubble", modules: { toolbar: false } }}
            />
        </motion.div>
    );
};
