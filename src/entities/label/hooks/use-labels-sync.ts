import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import type { Label, UpdateLabel } from "../types";

type Props = {
    projectId?: string;
};

export const useLabelsSync = (props: Props) => {
    const { projectId } = props;
    const queryClient = useQueryClient();

    // Запрос для получения задач
    const labelsQuery = useQuery({
        queryKey: ["labels", projectId],
        queryFn: () => api.get<Label[]>(`projects/${projectId}/labels`).json(),
        enabled: !!projectId,
        staleTime: 60000,
    });

    // Мутации для CRUD операций
    const createLabelMutation = useMutation({
        mutationFn: (label: Omit<Label, "id">) =>
            api
                .post(`projects/${projectId}/labels`, { json: label })
                .json<Label>(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
        },
    });

    const updateLabelMutation = useMutation({
        mutationFn: (label: Pick<Label, "id"> & UpdateLabel) =>
            api
                .patch(`projects/${projectId}/labels/${label.id}`, {
                    json: label,
                })
                .json<Label>(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
        },
    });

    const deleteLabelMutation = useMutation({
        mutationFn: (labelId: string) =>
            api.delete(`projects/${projectId}/labels/${labelId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labels"] });
        },
    });

    return {
        // Данные и состояние
        labels: labelsQuery.data,
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
