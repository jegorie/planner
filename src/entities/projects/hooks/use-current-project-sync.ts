import { useCallback } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route as TasksRoute } from "@/routes/_auth/_withSidebar/index";

export const useCurrentProjectsSync = () => {
    const { projectId: currentProjectId } = useSearch({ from: TasksRoute.id });
    const navigate = useNavigate();

    const changeCurrentProjectId = useCallback(
        (projectId: string) => {
            navigate({
                from: "/",
                search: (prev) => ({
                    ...prev,
                    ...(projectId ? { projectId } : {}),
                }),
                replace: true,
            });
        },
        [navigate],
    );

    return {
        currentProjectId,
        changeCurrentProjectId,
    };
};
