import type { Label } from "@/entities/label/types";
import { Button } from "@/shared/ui/button";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { EditLabel } from "@/widgets/edit-label/ui/edit-label";
import { LabelCard } from "@/widgets/label-card/ui/label-card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore, type PrimitiveAtom } from "jotai";
import { PlusIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { useProjectsSync } from "@/entities/projects/hooks/use-projects-sync";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { useLabelsSync } from "@/entities/label/hooks/use-labels-sync";

export const Route = createFileRoute("/_auth/_withSidebar/$projectId/labels")({
    component: RouteComponent,
});

function RouteComponent() {
    const { projectId } = Route.useParams();
    const [isEditLabelOpen, setIsEditLabelOpen] = useState(false);
    const [editableLabel, setEditableLabel] =
        useState<PrimitiveAtom<Label> | null>(null);
    const { labels, deleteLabel, createLabel, updateLabel } = useLabelsSync({
        projectId,
    });
    const store = useStore();
    const { projects } = useProjectsSync();

    const currentProject = useMemo(() => {
        return projects
            .map((projectAtom) => store.get(projectAtom))
            .find((project) => project.id === projectId);
    }, [projects, projectId, store]);

    const handleOnOpenChange = (value: boolean) => {
        if (!value) {
            setEditableLabel(null);
        }
        setIsEditLabelOpen(value);
    };

    const editLabel = (label: PrimitiveAtom<Label>) => {
        setIsEditLabelOpen(true);
        setEditableLabel(label);
    };

    const handleSubmit = (data: Label) => {
        if (editableLabel) {
            updateLabel(data);
            setEditableLabel(null);
        } else {
            createLabel(data);
        }
        setIsEditLabelOpen(false);
    };

    return (
        <div className="flex-auto flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        to="/$projectId"
                                        params={{ projectId }}
                                    >
                                        <span className="max-w-[150px] truncate">
                                            {currentProject?.title || "Project"}
                                        </span>
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Labels</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="flex flex-col items-center px-5 relative flex-auto">
                {labels.map((atom) => (
                    <LabelCard
                        key={atom.toString()}
                        atom={atom}
                        onDeleteClick={deleteLabel}
                        onEditClick={editLabel}
                    />
                ))}
                <Button
                    className="f-full mt-4"
                    onClick={() => {
                        setIsEditLabelOpen(true);
                    }}
                >
                    <PlusIcon />
                    Add new label
                </Button>
            </main>
            <EditLabel
                open={isEditLabelOpen}
                onOpenChange={handleOnOpenChange}
                onSubmit={handleSubmit}
                defaultValues={editableLabel && store.get(editableLabel)}
            />
        </div>
    );
}
