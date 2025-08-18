import { useCallback, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route as TasksRoute } from "@/routes/_auth/_withSidebar/index";

type Props = {
    defaultProjectId?: string;
};

export const useCurrentProjectsSync = (props?: Props) => {
    const { defaultProjectId } = props || {};
    const { projectId: currentProjectId } = useSearch({ from: TasksRoute.id });
    const navigate = useNavigate();

    const changeCurrentProjectId = useCallback(
        (projectId: string) => {
            navigate({
                from: "/",
                search: (prev) => {
                    const next = { ...prev };
                    if (!projectId) {
                        delete next.projectId;
                    } else {
                        next.projectId = projectId;
                    }
                    return next;
                },
                replace: true,
            });
        },
        [navigate],
    );

    useEffect(() => {
        if (!currentProjectId && defaultProjectId) {
            changeCurrentProjectId(defaultProjectId);
        }
    }, [currentProjectId, defaultProjectId, changeCurrentProjectId]);

    return {
        currentProjectId,
        changeCurrentProjectId,
    };
};
