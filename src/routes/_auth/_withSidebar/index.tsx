import { taskAtoms } from "@/entities/task/model/task-atom";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { atom, useAtom, useSetAtom, useStore } from "jotai";
import { NewTaskButton } from "@/entities/task/ui/new-task-button";
import { useEffect, useState } from "react";
import { TaskCard } from "@/widgets/task-card/task-card";
import { EditTask } from "@/widgets/edit-task/edit-task";
import type { Task } from "@/entities/task/types";
import { AnimatePresence } from "motion/react";
import { api } from "@/shared/lib/api";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { FadeCard } from "@/shared/ui/animations/fade-card";

export const Route = createFileRoute("/_auth/_withSidebar/")({
    component: App,
});

const useTasksQuery = () =>
    useQuery({
        queryKey: ["tasks"],
        queryFn: () => {
            return api.get<Task[]>("tasks").json();
        },
    });

const useInit = () => {
    const setTasks = useSetAtom(taskAtoms);
    const { data } = useTasksQuery();

    useEffect(() => {
        if (data) {
            setTasks(data.map((item) => atom(item)));
        }
    }, [data, setTasks]);
};

function App() {
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [tasks, setTasks] = useAtom(taskAtoms);
    const store = useStore();
    const { isLoading } = useTasksQuery();
    useInit();

    const handleSubmit = (data: Task) => {
        setTasks((prev) => [...prev, atom(data)]);
        setIsEditTaskOpen(false);
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((item) => store.get(item).id !== id));
    };

    if (isLoading) {
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
            <main className="flex flex-col items-center gap-5 px-5 relative flex-auto pb-32 h-[2000px]">
                <TasksFilter />
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

const TasksFilter = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={cn(
                "sticky top-2 mx-auto border bg-primary-foreground/50 p-4 transition-all duration-300 z-10 min-h-9",
                {
                    ["bg-primary-foreground/50 backdrop-blur p-4 rounded-lg w-full max-w-4xl shadow-xl"]:
                        isOpen,
                },
                {
                    ["bg-primary-foreground/10 backdrop-blur-xs px-3 py-1 rounded-2xl w-full max-w-xs shadow-xs hover:bg-primary-foreground"]:
                        !isOpen,
                },
            )}
            onClick={() => setIsOpen((prev) => !prev)}
        >
            <FadeCard triggerKey={isOpen.toString()} duration={0.15}>
                {isOpen ? (
                    <div className="flex gap-2 items-center">
                        <Button size={"sm"} variant={"outline"}>
                            Sort Order
                        </Button>
                        <Button size={"sm"} variant={"outline"}>
                            Sort Order
                        </Button>
                        <Button size={"sm"} variant={"outline"}>
                            Sort Order
                        </Button>
                    </div>
                ) : (
                    <div className="">ASC</div>
                )}
            </FadeCard>
        </div>
    );
};
