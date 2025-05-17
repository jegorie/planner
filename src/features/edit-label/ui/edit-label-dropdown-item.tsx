import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";
import { PencilIcon } from "lucide-react";
import type { FC } from "react";

type Props = {
    onClick: () => void;
};

export const EditLabelDropDownItem: FC<Props> = (props) => {
    const { onClick } = props;

    return (
        <DropdownMenuItem className="transition-colors" onClick={onClick}>
            <PencilIcon />
            Edit
        </DropdownMenuItem>
    );
};
