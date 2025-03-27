import { Editor } from "@/components/editor";
import { TaskItem } from "@/components/todo/task";
import { taskAtom } from "@/components/todo/taskAtom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useRef, useState } from "react";

import Quill, { type Range, type Delta as DeltaType } from "quill";

const Delta = Quill.import("delta");

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    const [taskAtoms] = useAtom(taskAtom);

    const [range, setRange] = useState<Range>();
    const [lastChange, setLastChange] = useState<DeltaType>();
    const quillRef = useRef<Quill>(null);

    //return (
    //    <div>
    //        <Editor
    //            ref={quillRef}
    //            defaultValue={new Delta().insert("title")}
    //            onTextChange={(delta, ...rest) => {
    //                if (quillRef.current) {
    //                    console.log(
    //                        quillRef.current?.getText(
    //                            0,
    //                            quillRef.current.getLength(),
    //                        ),
    //                    );
    //                }
    //                setLastChange(delta);
    //            }}
    //            onSelectionChange={setRange}
    //            quillOptions={{ theme: "bubble" }}
    //        />
    //    </div>
    //);

    return (
        <div>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-xl font-bold">ToDo</div>
                </div>
            </header>
            <main className="flex flex-col items-center gap-4 px-5">
                {taskAtoms.map((atom) => (
                    <TaskItem atom={atom} key={atom.toString()} />
                ))}
            </main>
        </div>
    );
}
