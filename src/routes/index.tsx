import { TaskItem } from "@/entities/todo/task";
import { taskAtom } from "@/entities/todo/taskAtom";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    const [taskAtoms] = useAtom(taskAtom);

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
