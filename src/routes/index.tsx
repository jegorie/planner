import { taskAtoms } from "@/entities/task/model/taskAtom";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";
import { NewTaskButton } from "@/entities/task/ui/new-task-button";
import { useState } from "react";
import { TaskCard } from "@/widgets/task-card/task-card";
import { EditTask } from "@/widgets/edit-task/edit-task";
import type { Task } from "@/entities/task/types";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    const [openEditTask, setOpenEditTask] = useState(false);
    const [tasks, setTasks] = useAtom(taskAtoms);

    const handleSubmit = (data: Task) => {
        setTasks((prev) => [...prev, atom(data)]);
        setOpenEditTask(false);
    };

    return (
        <div className="flex-auto flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-xl font-bold">Task</div>
                </div>
            </header>
            <main className="flex flex-col items-center gap-4 px-5 relative flex-auto">
                <NewTaskButton onClick={() => setOpenEditTask(true)} />
                {tasks.map((atom) => (
                    <TaskCard atom={atom} key={atom.toString()} />
                ))}
            </main>
            <EditTask
                open={openEditTask}
                onOpenChange={setOpenEditTask}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
