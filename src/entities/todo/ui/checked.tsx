import { Checkbox } from "@/shared/ui/checkbox";
import { useAtom, type PrimitiveAtom } from "jotai";
import type { Task } from "../types";
import { useMemo } from "react";
import { focusAtom } from "jotai-optics";

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
    return (
        <Checkbox
            className="mr-2 mt-0.5"
            checked={checked}
            onClick={(event) => {
                event.stopPropagation();
            }}
            onCheckedChange={(value) => {
                setChecked(!!value);
            }}
        />
    );
};
