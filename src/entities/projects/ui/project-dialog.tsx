import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import { ProjectForm } from "./project-form";
import { useProjectsSync } from "../hooks/use-projects-sync";
import type { Project } from "../types";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    project?: Project;
};

export const ProjectDialog: React.FC<Props> = (props) => {
    const { isOpen, onClose, project } = props;
    const { createProject, updateProject, isCreating, isUpdating } =
        useProjectsSync();

    const handleSubmit = (data: { title: string }) => {
        if (project) {
            updateProject(
                { ...project, title: data.title },
                {
                    onSuccess: () => {
                        toast.success("Проект обновлен");
                        onClose();
                    },
                    onError: () => {
                        toast.error("Ошибка при обновлении проекта");
                    },
                },
            );
        } else {
            createProject(data, {
                onSuccess: () => {
                    toast.success("Проект создан");
                    onClose();
                },
                onError: () => {
                    toast.error("Ошибка при создании проекта");
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {project ? "Редактировать проект" : "Создать проект"}
                    </DialogTitle>
                </DialogHeader>
                <ProjectForm
                    project={project}
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    isLoading={isCreating || isUpdating}
                />
            </DialogContent>
        </Dialog>
    );
};

