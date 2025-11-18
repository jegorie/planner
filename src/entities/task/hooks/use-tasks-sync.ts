import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import type { Task, UpdateTask } from "../types";

type Props = {
    projectId?: string;
};

export const useTasksSync = (props: Props) => {
    const { projectId } = props;
    const queryClient = useQueryClient();

    // Запрос для получения задач
    const tasksQuery = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: () =>
            api
                .get<Task[]>(`projects/${projectId}/tasks?sortBy=position`)
                .json(),
        enabled: !!projectId,
        staleTime: 60000,
    });

    // Мутации для CRUD операций
    const createTaskMutation = useMutation({
        mutationFn: (task: Omit<Task, "id">) =>
            api
                .post(`projects/${projectId}/tasks`, { json: task })
                .json<Task>(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: (task: Pick<Task, "id"> & UpdateTask) =>
            api
                .patch(`projects/${projectId}/tasks/${task.id}`, { json: task })
                .json<Task>(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (taskId: string) =>
            api.delete(`projects/${projectId}/tasks/${taskId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    return {
        tasks: tasksQuery.data,
        isLoading: tasksQuery.isLoading,
        error: tasksQuery.error,

        // Операции
        createTask: createTaskMutation.mutate,
        updateTask: updateTaskMutation.mutate,
        deleteTask: deleteTaskMutation.mutate,

        // Состояния мутаций
        isCreating: createTaskMutation.isPending,
        isUpdating: updateTaskMutation.isPending,
        isDeleting: deleteTaskMutation.isPending,

        // Рефеч данных
        refetch: tasksQuery.refetch,
    };
};
