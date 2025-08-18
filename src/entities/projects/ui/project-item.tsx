import { useState } from "react";
import { useAtom } from "jotai";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";
import { toast } from "sonner";
import { useProjectsSync } from "../hooks/use-projects-sync";
import { ProjectDialog } from "./project-dialog";
import type { PrimitiveAtom } from "jotai";
import type { Project } from "../types";

type Props = {
    projectAtom: PrimitiveAtom<Project>;
    isActive?: boolean;
    onSelect: (projectId: string) => void;
};

export const ProjectItem: React.FC<Props> = (props) => {
    const { projectAtom, isActive = false, onSelect } = props;
    const [project] = useAtom(projectAtom);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { deleteProject, isDeleting } = useProjectsSync();

    const handleDelete = () => {
        deleteProject(project.id, {
            onSuccess: () => {
                toast.success("Проект удален");
                setIsDeleteDialogOpen(false);
            },
            onError: () => {
                toast.error("Ошибка при удалении проекта");
            },
        });
    };

    return (
        <>
            <SidebarMenuItem>
                <div className="flex items-center justify-between">
                    <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => onSelect(project.id)}
                        className="flex-1"
                    >
                        {project.title}
                    </SidebarMenuButton>
                    {!project.isInbox && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="group-hover/project:opacity-100 transition-opacity"
                                >
                                    <MoreHorizontal className="h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => setIsEditDialogOpen(true)}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </SidebarMenuItem>

            {!project.isInbox && (
                <>
                    <ProjectDialog
                        isOpen={isEditDialogOpen}
                        onClose={() => setIsEditDialogOpen(false)}
                        project={project}
                    />

                    <AlertDialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                    >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete project?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Вы уверены, что хотите удалить проект "
                            {project.title}"? Это действие нельзя отменить.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            Удалить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </>
    );
};

