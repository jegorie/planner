import { useQuery } from "@tanstack/react-query";
import { useAtom, atom } from "jotai";
import { useEffect } from "react";
import { projectAtoms } from "../atoms/projects-atoms";
import { api } from "@/shared/lib/api";
import type { Project } from "../types";

export const useProjectsSync = () => {
    const [projects, setProjects] = useAtom(projectAtoms);

    // Запрос для получения проектов
    const projectsQuery = useQuery({
        queryKey: ["projects"],
        queryFn: () => api.get<Project[]>("projects").json(),
    });

    // Синхронизация: загружаем данные в store при получении с сервера
    useEffect(() => {
        if (projectsQuery.data) {
            setProjects(projectsQuery.data.map((project) => atom(project)));
        }
    }, [projectsQuery.data, setProjects]);

    return {
        // Данные и состояние
        projects,
        isLoading: projectsQuery.isLoading,
        error: projectsQuery.error,

        // Рефеч данных
        refetch: projectsQuery.refetch,
    };
};

