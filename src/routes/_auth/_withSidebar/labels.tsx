import { labelAtoms } from "@/entities/label/atoms/allLabelsAtom";
import type { Label } from "@/entities/label/types";
import { Button } from "@/shared/ui/button";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { EditLabel } from "@/widgets/edit-label/ui/edit-label";
import { LabelCard } from "@/widgets/label-card/ui/label-card";
import { createFileRoute } from "@tanstack/react-router";
import { atom, useAtom, useStore, type PrimitiveAtom } from "jotai";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_auth/_withSidebar/labels")({
    component: RouteComponent,
});

function RouteComponent() {
    const [isEditLabelOpen, setIsEditLabelOpen] = useState(false);
    const [editableLabel, setEditableLabel] =
        useState<PrimitiveAtom<Label> | null>(null);
    const [labels, setLabels] = useAtom(labelAtoms);
    const store = useStore();

    const deleteLabel = (labelTitle: string) => {
        setLabels((prev) =>
            prev.filter((item) => store.get(item).title !== labelTitle),
        );
    };

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
            store.set(editableLabel, data);
            setEditableLabel(null);
        } else {
            setLabels((prev) => [...prev, atom(data)]);
        }
        setIsEditLabelOpen(false);
    };

    return (
        <div className="flex-auto flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-xl font-bold">Labels</div>
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
