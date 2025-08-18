import { SidebarTrigger } from "@/shared/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { NewTaskButton } from "@/entities/task/ui/new-task-button";
import { useMemo, useState } from "react";
import { TaskCard } from "@/widgets/task-card/task-card";
import { EditTask } from "@/widgets/edit-task/edit-task";
import type { Task } from "@/entities/task/types";
import { AnimatePresence } from "motion/react";
import { TasksFilter } from "@/features/task-filter/ui/task-filter";
import { useTasksSync } from "@/entities/task/hooks/use-tasks-sync";
import { useTaskAutoSave } from "@/entities/task/hooks/use-task-auto-save";
import { z } from "zod/v4";
import { useCurrentProjectsSync } from "@/entities/projects/hooks/use-current-project-sync";
import { useProjectsSync } from "@/entities/projects/hooks/use-projects-sync";
import { useStore } from "jotai";

export const Route = createFileRoute("/_auth/_withSidebar/")({
    component: App,
    validateSearch: z.object({
        projectId: z.string().optional(), // можно сузить до uuid() и т.п.
    }),
});

function App() {
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const { currentProjectId } = useCurrentProjectsSync();
    const store = useStore();
    const { projects } = useProjectsSync();
    const currentProject = useMemo(() => {
        return projects
            .map((projectAtom) => store.get(projectAtom))
            .find((project) => {
                return project.id === currentProjectId;
            });
    }, [projects, currentProjectId, store.get]);

    const {
        tasks,
        isLoading,
        createTask,
        deleteTask: deleteTaskMutation,
    } = useTasksSync({ projectId: currentProjectId });

    // Автоматическое сохранение изменений
    const { isPending: isSyncing } = useTaskAutoSave();

    const handleSubmit = (data: Omit<Task, "id">) => {
        createTask(data);
        setIsEditTaskOpen(false);
    };

    const deleteTask = (id: string) => {
        deleteTaskMutation(id);
    };

    if (isLoading) {
        return "loading";
    }

    return (
        <div className="flex-auto flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-xl font-bold">
                        {currentProject?.title}
                    </div>
                    {isSyncing && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            Syncing...
                        </div>
                    )}
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
