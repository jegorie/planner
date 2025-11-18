import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useProjectsSync } from "@/entities/projects/hooks/use-projects-sync";
import { useStore } from "jotai";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/_withSidebar/")({
    component: App,
});

function App() {
    const navigate = useNavigate();
    const store = useStore();
    const { projects, isLoading } = useProjectsSync();

    useEffect(() => {
        if (!isLoading && projects.length > 0) {
            const inboxProject = projects
                .map((projectAtom) => store.get(projectAtom))
                .find((project) => project.isInbox);

            if (inboxProject) {
                navigate({
                    to: "/$projectId",
                    params: { projectId: inboxProject.id },
                });
            }
        }
    }, [projects, isLoading, navigate, store]);

    if (isLoading) {
        return "loading";
    }

    return (
        <div className="flex-auto flex flex-col">
            <div className="flex items-center justify-center h-full">
                <div>Redirecting to inbox...</div>
            </div>
        </div>
    );
}
