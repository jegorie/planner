import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";
import { TrashIcon } from "lucide-react";
import type { FC } from "react";

type Props = {
    onClick: () => void;
};

export const DeleteTaskDropDownItem: FC<Props> = (props) => {
    const { onClick } = props;

    return (
        <DropdownMenuItem
            className="text-red-500 focus:text-red-500 focus:bg-red-50 transition-colors"
            onClick={onClick}
        >
            <TrashIcon className="text-red-500" />
            Delete
        </DropdownMenuItem>
    );
};
