import { Button } from "@/shared/ui/button";
import { PlusIcon } from "lucide-react";
import type { FC } from "react";

type Props = {
    onClick: () => void;
};

export const NewTaskButton: FC<Props> = (props) => {
    const { onClick } = props;

    return (
        <Button
            className="absolute bottom-8 right-8"
            variant="default"
            size="icon"
            onClick={onClick}
        >
            <PlusIcon />
        </Button>
    );
};
