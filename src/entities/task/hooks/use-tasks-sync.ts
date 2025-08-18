import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useStore, atom } from "jotai";
import { useEffect } from "react";
import { taskAtoms } from "../model/task-atom";
import { api } from "@/shared/lib/api";
import type { Task } from "../types";

type Props = {
    projectId?: string;
};

export const useTasksSync = (props: Props) => {
    const { projectId } = props;
    const queryClient = useQueryClient();
    const [tasks, setTasks] = useAtom(taskAtoms);
    const store = useStore();

    // Запрос для получения задач
    const tasksQuery = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: () =>
            api
                .get<Task[]>("tasks", {
                    searchParams: { projectId: projectId || "" },
                })
                .json(),
        enabled: !!projectId,
    });

    // Мутации для CRUD операций
    const createTaskMutation = useMutation({
        mutationFn: (task: Omit<Task, "id">) =>
            api.post("tasks", { json: task }).json<Task>(),
        onSuccess: (newTask) => {
            // Обновляем локальный store
            setTasks((prev) => [...prev, atom(newTask)]);
            // Инвалидируем кэш
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: (task: Task) =>
            api.put(`tasks/${task.id}`, { json: task }).json<Task>(),
        onSuccess: () => {
            // Не обновляем store здесь, так как данные уже обновлены через атомы
            // Только инвалидируем кэш для консистентности
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (taskId: string) => api.delete(`tasks/${taskId}`),
        onSuccess: (_, deletedTaskId) => {
            // Удаляем из локального store
            setTasks((prev) =>
                prev.filter((taskAtom) => {
                    const task = store.get(taskAtom);
                    return task.id !== deletedTaskId;
                }),
            );
            // Инвалидируем кэш
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    // Синхронизация: загружаем данные в store при получении с сервера
    useEffect(() => {
        if (tasksQuery.data) {
            setTasks(tasksQuery.data.map((task) => atom(task)));
        }
    }, [tasksQuery.data, setTasks]);

    return {
        // Данные и состояние
        tasks,
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

