import { useAtomValue, useStore } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { taskAtoms } from "../model/task-atom";
import { useAutoSync } from "./use-auto-sync";
import type { Task } from "../types";

export const useTaskAutoSave = () => {
    const tasks = useAtomValue(taskAtoms);
    const store = useStore();
    const { scheduleSync, syncNow, isPending } = useAutoSync({
        debounceMs: 1000,
    });

    // Храним предыдущие состояния задач для сравнения
    const previousTasksRef = useRef<Map<string, Task>>(new Map());
    const intervalRef = useRef<number | null>(null);
    const isInitializedRef = useRef(false);

    const checkAndSyncTasks = useCallback(() => {
        // Получаем текущие задачи из атомов
        const currentTasks = new Map<string, Task>();

        tasks.forEach((taskAtom) => {
            const task = store.get(taskAtom);
            currentTasks.set(task.id, task);
        });

        // Проверяем изменения только если уже инициализированы
        if (isInitializedRef.current) {
            currentTasks.forEach((currentTask, taskId) => {
                const previousTask = previousTasksRef.current.get(taskId);

                // Если задача изменилась, планируем синхронизацию
                if (!previousTask || !isTaskEqual(previousTask, currentTask)) {
                    console.log("📝 Task changed:", {
                        taskId,
                        previousTitle: previousTask?.title,
                        currentTitle: currentTask.title,
                        previousDesc: previousTask?.desc,
                        currentDesc: currentTask.desc,
                        isEqual: previousTask
                            ? isTaskEqual(previousTask, currentTask)
                            : false,
                    });
                    scheduleSync(currentTask);
                }
            });
        } else if (currentTasks.size > 0) {
            // Первая загрузка - просто помечаем как инициализированные
            console.log("🚀 Initial tasks loaded, skipping sync:", currentTasks.size);
            isInitializedRef.current = true;
        }

        // Обновляем референс для следующего сравнения
        previousTasksRef.current = currentTasks;
    }, [tasks, store, scheduleSync]);

    // Проверяем изменения периодически (как fallback)
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            checkAndSyncTasks();
        }, 200); // Проверяем каждые 200мс

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [checkAndSyncTasks]);

    // Также проверяем при изменении списка задач
    useEffect(() => {
        console.log("🔍 Tasks list changed, checking for updates");
        checkAndSyncTasks();
    }, [checkAndSyncTasks]);

    return {
        syncNow,
        isPending,
    };
};

// Функция для глубокого сравнения задач
function isTaskEqual(task1: Task, task2: Task): boolean {
    if (task1.id !== task2.id) return false;
    if (task1.title?.trim() !== task2.title?.trim()) return false;
    if (task1.desc?.trim() !== task2.desc?.trim()) return false;
    if (task1.checked !== task2.checked) return false;
    if (task1.priority !== task2.priority) return false;

    // Сравниваем массивы labels
    if (task1.labels.length !== task2.labels.length) return false;
    const sortedLabels1 = [...task1.labels].sort();
    const sortedLabels2 = [...task2.labels].sort();
    if (!sortedLabels1.every((label, index) => label === sortedLabels2[index]))
        return false;

    // Сравниваем массивы subTasksIds
    if (task1.subTasksIds.length !== task2.subTasksIds.length) return false;
    if (
        !task1.subTasksIds.every((id, index) => id === task2.subTasksIds[index])
    )
        return false;

    // Сравниваем schedule (если есть)
    if (task1.schedule !== task2.schedule) {
        if (!task1.schedule || !task2.schedule) return false;
        // Здесь можно добавить более детальное сравнение расписания
        if (JSON.stringify(task1.schedule) !== JSON.stringify(task2.schedule))
            return false;
    }

    return true;
}
