import { taskAtoms } from "@/entities/task/model/taskAtom";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { atom, useAtom, useStore } from "jotai";
import { NewTaskButton } from "@/entities/task/ui/new-task-button";
import { useState } from "react";
import { TaskCard } from "@/widgets/task-card/task-card";
import { EditTask } from "@/widgets/edit-task/edit-task";
import type { Task } from "@/entities/task/types";
import { AnimatePresence } from "motion/react";
import { api } from "@/shared/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_auth/_withSidebar/")({
    component: App,
});

function App() {
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [tasks, setTasks] = useAtom(taskAtoms);
    const store = useStore();
    const serverdata = useQuery({
        queryKey: ["tasks"],
        queryFn: () => {
            return api.get("tasks").json();
        },
    });

    const handleSubmit = (data: Task) => {
        setTasks((prev) => [...prev, atom(data)]);
        setIsEditTaskOpen(false);
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((item) => store.get(item).id !== id));
    };

    if (serverdata.isLoading) {
        return "loading";
    }

    return (
        <div className="flex-auto flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-xl font-bold">Task</div>
                </div>
            </header>
            <main className="flex flex-col items-center gap-5 px-5 relative flex-auto pb-32">
                <NewTaskButton onClick={() => setIsEditTaskOpen(true)} />
                {tasks.map((atom) => (
                    <AnimatePresence key={atom.toString()}>
                        <TaskCard
                            atom={atom}
                            key={atom.toString()}
                            onDeleteClick={deleteTask}
                        />
                    </AnimatePresence>
                ))}
            </main>
            <EditTask
                open={isEditTaskOpen}
                onOpenChange={setIsEditTaskOpen}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
