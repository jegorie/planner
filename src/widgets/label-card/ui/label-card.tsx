import type { AvailableColors, Label } from "@/entities/label/types";
import { DeleteTaskDropDownItem } from "@/features/delete-task/ui/delete-task-dropdown-item";
import { EditLabelDropDownItem } from "@/features/edit-label/ui/edit-label-dropdown-item";
import { cn } from "@/shared/lib/utils";
import { ExtraMenuButton } from "@/shared/ui/extra-menu-button";
import { useAtomValue, type PrimitiveAtom } from "jotai";
import { TagIcon } from "lucide-react";
import type { FC } from "react";

type Props = {
    atom: PrimitiveAtom<Label>;
    tasksLength?: number;
    onDeleteClick: (titleName: string) => void;
    onEditClick: (labelAtom: PrimitiveAtom<Label>) => void;
};

const colorsMap: Record<AvailableColors, string> = {
    NONE: "text-primary",
    ORANGE: "text-orange-500",
};

export const LabelCard: FC<Props> = (props) => {
    const { atom, tasksLength = 0, onDeleteClick, onEditClick } = props;
    const label = useAtomValue(atom);

    const handleDelete = () => {
        onDeleteClick(label.id);
    };

    const handleEdit = () => {
        onEditClick(atom);
    };

    return (
        <div className="max-w-sm w-full p-1 flex justify-between">
            <div className={cn("flex items-center")}>
                <div className="size-9 flex items-center justify-center">
                    <TagIcon className={cn("size-4", colorsMap[label.color])} />
                </div>
                {label.title}
            </div>
            <div className="flex gap-2 items-center">
                <div className="text-sm text-primary/50">
                    Tasks: {tasksLength}
                </div>
                <ExtraMenuButton>
                    <DeleteTaskDropDownItem onClick={handleDelete} />
                    <EditLabelDropDownItem onClick={handleEdit} />
                </ExtraMenuButton>
            </div>
        </div>
    );
};
