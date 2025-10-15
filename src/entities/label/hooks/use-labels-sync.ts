import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useStore, atom } from "jotai";
import { useEffect } from "react";
import { api } from "@/shared/lib/api";
import { labelAtoms } from "../atoms/all-labels-atom";
import type { Label } from "../types";

type Props = {
    projectId?: string;
};

export const useLabelsSync = (props: Props) => {
    const { projectId } = props;
    const queryClient = useQueryClient();
    const [labels, setLabels] = useAtom(labelAtoms);
    const store = useStore();

    // Запрос для получения задач
    const labelsQuery = useQuery({
        queryKey: ["labels", projectId],
        queryFn: () => api.get<Label[]>(`projects/${projectId}/labels`).json(),
        enabled: !!projectId,
    });

    // Мутации для CRUD операций
    const createLabelMutation = useMutation({
        mutationFn: (label: Omit<Label, "id">) =>
            api.post("labels", { json: label }).json<Label>(),
        onSuccess: (newLabel) => {
            // Обновляем локальный store
            setLabels((prev) => [...prev, atom(newLabel)]);
            // Инвалидируем кэш
            queryClient.invalidateQueries({ queryKey: ["labels"] });
        },
    });

    const updateLabelMutation = useMutation({
        mutationFn: (label: Label) =>
            api.put(`labels/${label.id}`, { json: label }).json<Label>(),
        onSuccess: () => {
            // Не обновляем store здесь, так как данные уже обновлены через атомы
            // Только инвалидируем кэш для консистентности
            queryClient.invalidateQueries({ queryKey: ["labels"] });
        },
    });

    const deleteLabelMutation = useMutation({
        mutationFn: (labelId: string) => api.delete(`labels/${labelId}`),
        onSuccess: (_, deletedLabelId) => {
            // Удаляем из локального store
            setLabels((prev) =>
                prev.filter((labelAtom) => {
                    const label = store.get(labelAtom);
                    return label.id !== deletedLabelId;
                }),
            );
            // Инвалидируем кэш
            queryClient.invalidateQueries({ queryKey: ["labels"] });
        },
    });

    // Синхронизация: загружаем данные в store при получении с сервера
    useEffect(() => {
        if (labelsQuery.data) {
            setLabels(labelsQuery.data.map((label) => atom(label)));
        }
    }, [labelsQuery.data, setLabels]);

    return {
        // Данные и состояние
        labels,
        isLoading: labelsQuery.isLoading,
        error: labelsQuery.error,

        // Операции
        createLabel: createLabelMutation.mutate,
        updateLabel: updateLabelMutation.mutate,
        deleteLabel: deleteLabelMutation.mutate,

        // Состояния мутаций
        isCreating: createLabelMutation.isPending,
        isUpdating: updateLabelMutation.isPending,
        isDeleting: deleteLabelMutation.isPending,

        // Рефеч данных
        refetch: labelsQuery.refetch,
    };
};
