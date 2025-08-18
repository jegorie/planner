import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelperText } from "@/shared/ui/helper-text";
import { z } from "zod";
import type { Project } from "../types";

const ProjectSchema = z.object({
    title: z.string().min(1, "Название проекта обязательно"),
});

type ProjectFormData = z.infer<typeof ProjectSchema>;

type Props = {
    project?: Project;
    onSubmit: (data: ProjectFormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export const ProjectForm: React.FC<Props> = (props) => {
    const { project, onSubmit, onCancel, isLoading = false } = props;
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({
        defaultValues: {
            title: project?.title || "",
        },
        resolver: zodResolver(ProjectSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    return (
        <form
            className="grid gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid gap-1">
                <label htmlFor="title">Название проекта</label>
                <Input 
                    id="title" 
                    type="text" 
                    placeholder="Введите название проекта..."
                    {...register("title")} 
                />
                <HelperText title={errors.title?.message} error />
            </div>
            
            <div className="flex gap-2 justify-end mt-4">
                <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Отмена
                </Button>
                <Button 
                    type="submit" 
                    disabled={isLoading}
                >
                    {project ? "Сохранить" : "Создать"}
                </Button>
            </div>
        </form>
    );
};