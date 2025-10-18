import { Checkbox } from "@/shared/ui/checkbox";
import { Priority } from "../../types";
import { cn } from "@/shared/lib/utils";

type Props = {
    checked: boolean;
    onChange: (value: boolean) => void;
    currentPriority: Priority;
};

export const Checked: React.FC<Props> = (props) => {
    const { checked, onChange, currentPriority } = props;

    return (
        <Checkbox
            checked={checked}
            onClick={(event) => {
                event.stopPropagation();
            }}
            onCheckedChange={(value) => {
                onChange(!!value);
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
