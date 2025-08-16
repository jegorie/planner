import { Checkbox } from "@/shared/ui/checkbox";
import { useAtom, type PrimitiveAtom } from "jotai";
import { Priority, type Task } from "../../types";
import { useMemo } from "react";
import { focusAtom } from "jotai-optics";
import { cn } from "@/shared/lib/utils";

type Props = {
    atom: PrimitiveAtom<Task>;
};

export const Checked: React.FC<Props> = (props) => {
    const { atom } = props;
    const [checked, setChecked] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("checked"));
        }, [atom]),
    );
    const [currentPriority] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("priority"));
        }, [atom]),
    );

    return (
        <Checkbox
            checked={checked}
            onClick={(event) => {
                event.stopPropagation();
            }}
            onCheckedChange={(value) => {
                setChecked(!!value);
            }}
            className={cn("mr-2 mt-0.5", {
                "border-red-500 bg-red-50 dark:bg-red-950":
                    !checked && currentPriority === Priority.HIGH,
                "border-orange-500 bg-orange-50 dark:bg-orange-950":
                    !checked && currentPriority === Priority.MEDIUM,
                "border-blue-500 bg-blue-50 dark:bg-blue-950":
                    !checked && currentPriority === Priority.LOW,
            })}
        />
    );
};
