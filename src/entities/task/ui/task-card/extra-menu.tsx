import { Button } from "@/shared/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import type { ReactNode } from "@tanstack/react-router";
import { EllipsisVerticalIcon } from "lucide-react";
import type { FC } from "react";

type Props = {
    children: ReactNode;
};

export const ExtraMenu: FC<Props> = (props) => {
    const { children } = props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <EllipsisVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>{children}</DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
