import { useCallback, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import type { Task } from "../types";

interface UseAutoSyncProps {
    debounceMs?: number;
}

export const useAutoSync = ({ debounceMs = 1000 }: UseAutoSyncProps = {}) => {
    const queryClient = useQueryClient();
    const timeoutRef = useRef<number | null>(null);
    const pendingUpdatesRef = useRef(new Map<string, Task>());

    const updateTaskMutation = useMutation({
        mutationFn: (tasks: Task[]) => {
            // Отправляем batch обновления
            return Promise.all(
                tasks.map((task) =>
                    api.put(`tasks/${task.id}`, { json: task }).json<Task>(),
                ),
            );
        },
        onSuccess: () => {
            // После успешного обновления очищаем pending updates
            pendingUpdatesRef.current.clear();
            // Обновляем кэш
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const scheduleSync = useCallback(
        (task: Task) => {
            console.log("⏰ Scheduling sync for task:", {
                id: task.id,
                title: task.title,
            });

            // Добавляем/обновляем задачу в pending updates
            pendingUpdatesRef.current.set(task.id, task);
            console.log(
                "📋 Pending updates count:",
                pendingUpdatesRef.current.size,
            );

            // Очищаем предыдущий таймаут
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Устанавливаем новый таймаут для синхронизации
            timeoutRef.current = setTimeout(() => {
                const tasksToSync = Array.from(
                    pendingUpdatesRef.current.values(),
                );
                console.log("🚀 Syncing tasks to backend:", tasksToSync.length);
                if (tasksToSync.length > 0) {
                    updateTaskMutation.mutate(tasksToSync);
                }
            }, debounceMs);
        },
        [debounceMs, updateTaskMutation],
    );

    const syncNow = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const tasksToSync = Array.from(pendingUpdatesRef.current.values());
        if (tasksToSync.length > 0) {
            updateTaskMutation.mutate(tasksToSync);
        }
    }, [updateTaskMutation]);

    // Очистка при размонтировании компонента
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {
        scheduleSync,
        syncNow,
        isPending: updateTaskMutation.isPending,
        hasPendingUpdates: pendingUpdatesRef.current.size > 0,
    };
};

