import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useStore, atom } from "jotai";
import { useEffect } from "react";
import { projectAtoms } from "../atoms/projects-atoms";
import { api } from "@/shared/lib/api";
import type { Project } from "../types";

export const useProjectsSync = () => {
    const queryClient = useQueryClient();
    const [projects, setProjects] = useAtom(projectAtoms);
    const store = useStore();

    // Запрос для получения проектов
    const projectsQuery = useQuery({
        queryKey: ["projects"],
        queryFn: () => api.get<Project[]>("projects").json(),
        staleTime: 60000,
    });

    // Мутации для CRUD операций
    const createProjectMutation = useMutation({
        mutationFn: (project: Omit<Project, "id" | "isInbox">) =>
            api.post("projects", { json: project }).json<Project>(),
        onSuccess: (newProject) => {
            setProjects((prev) => [...prev, atom(newProject)]);
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    const updateProjectMutation = useMutation({
        mutationFn: (project: Project) =>
            api
                .patch(`projects/${project.id}`, { json: project })
                .json<Project>(),
        onSuccess: (updatedProject) => {
            setProjects((prev) =>
                prev.map((projectAtom) => {
                    const currentProject = store.get(projectAtom);
                    return currentProject.id === updatedProject.id
                        ? atom(updatedProject)
                        : projectAtom;
                }),
            );
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    const deleteProjectMutation = useMutation({
        mutationFn: (projectId: string) => api.delete(`projects/${projectId}`),
        onSuccess: (_, deletedProjectId) => {
            setProjects((prev) =>
                prev.filter((projectAtom) => {
                    const project = store.get(projectAtom);
                    return project.id !== deletedProjectId;
                }),
            );
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    // Синхронизация: загружаем данные в store при получении с сервера
    useEffect(() => {
        if (projectsQuery.data && !projects.length) {
            setProjects(projectsQuery.data.map((project) => atom(project)));
        }
    }, [projectsQuery.data, setProjects, projects]);

    return {
        // Данные и состояние
        projects,
        isLoading: projectsQuery.isLoading,
        error: projectsQuery.error,

        // Операции
        createProject: createProjectMutation.mutate,
        updateProject: updateProjectMutation.mutate,
        deleteProject: deleteProjectMutation.mutate,

        // Состояния мутаций
        isCreating: createProjectMutation.isPending,
        isUpdating: updateProjectMutation.isPending,
        isDeleting: deleteProjectMutation.isPending,

        // Рефеч данных
        refetch: projectsQuery.refetch,
    };
};
