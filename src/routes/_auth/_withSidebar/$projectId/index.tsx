import { SidebarTrigger } from "@/shared/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TaskCard } from "@/widgets/task-card/task-card";
import { EditTask } from "@/widgets/edit-task/edit-task";
import type { Task, UpdateTask } from "@/entities/task/types";
import { AnimatePresence } from "motion/react";
import { TasksFilter } from "@/features/task-filter/ui/task-filter";
import { useProjectsSync } from "@/entities/projects/hooks/use-projects-sync";
import { useStore } from "jotai";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/shared/ui/breadcrumb";
import { useLabelsSync } from "@/entities/label/hooks/use-labels-sync";
import { useTasksSync } from "@/entities/task/hooks/use-tasks-sync";

export const Route = createFileRoute("/_auth/_withSidebar/$projectId/")({
    component: ProjectRoute,
});

function ProjectRoute() {
    const { projectId } = Route.useParams();
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const store = useStore();
    const { projects } = useProjectsSync();

    const currentProject = useMemo(() => {
        return projects
            .map((projectAtom) => store.get(projectAtom))
            .find((project) => project.id === projectId);
    }, [projects, projectId, store.get]);

    const { tasks, isLoading, deleteTask, createTask, updateTask, isUpdating } =
        useTasksSync({ projectId });
    useLabelsSync({
        projectId,
    });

    const handleSubmit = (data: Omit<Task, "id">) => {
        const dataToSend: UpdateTask = data;
        if (tasks && tasks.length > 0) {
            dataToSend.afterTaskId = tasks[tasks.length - 1].id;
        }
        createTask(dataToSend);
        setIsEditTaskOpen(false);
    };

    const handleDeleteTask = (id: string) => {
        deleteTask(id);
    };

    const handleChangeTask = (value: Pick<Task, "id"> & UpdateTask) => {
        updateTask(value);
    };

    if (isLoading) {
        return "loading";
    }

    if (!currentProject) {
        return (
            <div className="flex-auto flex flex-col">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="text-xl font-bold">...</div>
                    </div>
                </header>
                <main className="flex flex-col items-center gap-5 px-5 relative flex-auto pb-32 pt-32 text-xl">
                    Project not found :(
                </main>
            </div>
        );
    }

    return (
        <div className="flex-auto flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {currentProject.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    {isUpdating && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            Syncing...
                        </div>
                    )}
                </div>
            </header>
            <main className="flex flex-col items-center gap-5 px-5 relative flex-auto pb-32">
                <TasksFilter
                    onNewTaskClick={() => setIsEditTaskOpen(true)}
                    projectId={projectId}
                />
                {tasks?.map((task) => (
                    <AnimatePresence key={task.id}>
                        <TaskCard
                            task={task}
                            key={task.id}
                            onChange={handleChangeTask}
                            onDeleteClick={handleDeleteTask}
                            projectId={projectId}
                        />
                    </AnimatePresence>
                ))}
            </main>
            <EditTask
                open={isEditTaskOpen}
                onOpenChange={setIsEditTaskOpen}
                onSubmit={handleSubmit}
                projectId={projectId}
            />
        </div>
    );
}
