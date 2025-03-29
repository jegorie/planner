import Quill, {
    type Range,
    type Delta,
    type EmitterSource,
    type QuillOptions,
} from "quill";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";

type Props = {
    readOnly?: boolean;
    defaultValue: Delta;
    onTextChange?: (
        delta: Delta,
        oldContent: Delta,
        source: EmitterSource,
    ) => void;
    onSelectionChange?: (
        range: Range,
        oldRange: Range,
        source: EmitterSource,
    ) => void;
    quillOptions: QuillOptions;
};

// Editor is an uncontrolled React component
export const Editor = forwardRef<Quill, Props>((props, ref) => {
    const {
        readOnly,
        defaultValue,
        onTextChange,
        onSelectionChange,
        quillOptions,
    } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
        onTextChangeRef.current = onTextChange;
        onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
        if (ref.current instanceof Quill) {
            ref.current?.enable(!readOnly);
        }
    }, [ref, readOnly]);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );
        const quill = new Quill(editorContainer, {
            theme: "bubble",
            ...quillOptions,
        });

        ref.current = quill;

        if (defaultValueRef.current) {
            quill.setContents(defaultValueRef.current);
        }

        quill.on(Quill.events.TEXT_CHANGE, (...args) => {
            onTextChangeRef.current?.(...args);
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
            onSelectionChangeRef.current?.(...args);
        });

        return () => {
            ref.current = null;
            container.innerHTML = "";
        };
    }, [ref]);

    return <div ref={containerRef} />;
});

Editor.displayName = "Editor";
